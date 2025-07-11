// lib/notificationService.js
import api from "./api";

/**
 * Sends the Expo Push Token to your backend server.
 * @param {string} token - The Expo Push Token.
 */
export const registerPushToken = async (token) => {
  try {
    const response = await api.post("/user/register-push-token", {
      expoPushToken: token,
    });
    console.log("Push token sent to server successfully:", response.data);
    return response.data;
  } catch (error) {
    // The global API interceptor will handle logging this error and showing the modal.
    // We still throw the error so the calling function knows the request failed.
    throw error;
  }
};
