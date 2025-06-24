// hooks/usePushNotifications.js
import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { router } from "expo-router";
import { registerPushToken } from "@/lib/notificationService";

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

  /**
   * This useEffect hook is responsible ONLY for setting up and cleaning up
   * the notification listeners. It runs once when the hook is mounted.
   */
  useEffect(() => {
    // Listener for when a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("NOTIFICATION RECEIVED:", notification);
        // Here you could refresh data or update the UI if needed
      });

    // Listener for when a user taps on a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("NOTIFICATION TAPPED:", response);
        const data = response.notification.request.content.data;

        // Example: Navigate to a specific screen based on notification data
        // Your backend should send a `path` or `screen` key in the data payload.
        if (data && data.path) {
          router.push(data.path); // e.g., router.push('/pocket/123/transaction/Detail')
        }
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

  /**
   * This function handles the entire registration process.
   * It should be called explicitly, e.g., after a user logs in.
   */
  const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
      console.log("Push notifications are not supported on simulators.");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("User did not grant permission for push notifications.");
      return;
    }

    try {
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      if (!projectId) {
        throw new Error(
          "Project ID not found in app.json/app.config.js under extra.eas.projectId",
        );
      }

      const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
        .data;
      setExpoPushToken(token);

      // Send the token to your server
      await registerPushToken(token);

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return token;
    } catch (e) {
      console.error(
        "An error occurred during push notification registration:",
        e,
      );
      // The error will also be caught by the global API interceptor if it's a network error.
    }
  };

  return {
    expoPushToken,
    registerForPushNotificationsAsync,
  };
};
