// stores/friendshipStore.js
import { create } from "zustand";
import api from "@/lib/api";

export const useFriendshipStore = create((set, get) => ({
  // --- State ---
  friends: [],
  isLoadingFriends: false,
  friendsError: null,

  // State for the simplified "add friend" action
  isSendingRequest: false,
  sendRequestError: null,

  // --- Actions ---

  /**
   * Fetches the user's current list of friends.
   */
  fetchAllFriends: async () => {
    console.log(
      "================================================================",
    );
    console.log("API Call: GET /friendship");
    console.log(
      "================================================================",
    );
    set({ isLoadingFriends: true, friendsError: null });
    try {
      const response = await api.get("/friendship");
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({
          friends: response.data.data || [],
          isLoadingFriends: false,
        });
      } else {
        throw new Error(
          response.data.message || "Failed to fetch friendships.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        friendsError: errorMessage,
        isLoadingFriends: false,
        friends: [],
      });
      throw error;
    }
  },

  /**
   * Sends a request to add new friends via their phone numbers.
   * On success, it automatically re-fetches the main friends list.
   * @param {string[]} phoneNumbers - An array of phone numbers to add.
   */
  sendFriendRequest: async (phoneNumbers) => {
    console.log(
      "================================================================",
    );
    console.log("API Call: POST /friendship/request");
    console.log(
      "================================================================",
    );
    set({ isSendingRequest: true, sendRequestError: null });
    const requestBody = { phone_numbers: phoneNumbers };
    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post("/friendship/request", requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isSendingRequest: false });
        // --- On success, refresh the main friends list ---
        get().fetchAllFriends();
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Failed to send friendship request.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        sendRequestError: errorMessage,
        isSendingRequest: false,
      });
      throw error;
    }
  },

  // --- Obsolete functions for handling requests have been removed ---
}));
