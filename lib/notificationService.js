import api from "./api";

/**
 * Sends the Expo Push Token to your backend server.
 * @param {string} token - The Expo Push Token.
 */
export const registerPushToken = async (token) => {
  try {
    // IMPORTANT: Replace '/users/push-token' with your actual backend endpoint
    const response = await api.post("/user/register-push-token", {
      expoPushToken: token,
    });
    console.log("Push token sent to server successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending push token to server:", error);
    // You might want to handle this error, e.g., by retrying later
    throw error;
  }
};
