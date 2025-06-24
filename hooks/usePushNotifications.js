import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { router } from "expo-router";
import { registerPushToken } from "@/lib/notificationService"; // Using alias for lib

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // 1. Get the token
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        // 2. Send the token to your server
        registerPushToken(token).catch((error) => {
          // It failed to send to the server, you can handle this case
          console.log("Failed to register push token with server.");
        });
      }
    });

    // 3. Set up listeners for incoming notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("NOTIFICATION RECEIVED:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("NOTIFICATION TAPPED:", response);
        const { notification } = response;
        // Example: Navigate to a notification screen when tapped
        // You can pass data from the notification payload
        // e.g., router.push(`/notification/${notification.request.content.data.id}`);
      });

    // Cleanup listeners when the component unmounts
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    expoPushToken,
  };
};

// Helper function to get the token
async function registerForPushNotificationsAsync() {
  let token;

  if (!Device.isDevice) {
    console.log("Push notifications require a physical device.");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    // You can optionally show an alert to the user here
    console.log("User did not grant permission for push notifications.");
    return;
  }

  try {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    if (!projectId) {
      throw new Error('Project ID not found. Please run "eas build:configure"');
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  } catch (e) {
    console.error("Error getting push token:", e);
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
