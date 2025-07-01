// stores/friendshipStore.js
import { create } from "zustand";
import api from "@/lib/api";

export const useFriendshipStore = create((set, get) => ({
  // --- State ---
  friends: [],
  isLoadingFriends: false,
  friendsError: null,
  friendRequests: { sent: [], received: [] },
  isLoadingRequests: false,
  requestsError: null,
  isSendingRequest: false,
  sendRequestError: null,
  isHandlingRequest: false,
  handleRequestError: null,

  // --- Actions ---

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

  fetchFriendRequests: async () => {
    console.log(
      "================================================================",
    );
    console.log("API Call: GET /friendship/request");
    console.log(
      "================================================================",
    );
    set({ isLoadingRequests: true, requestsError: null });
    try {
      const response = await api.get("/friendship/request");
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({
          friendRequests: response.data.data || { sent: [], received: [] },
          isLoadingRequests: false,
        });
      } else {
        throw new Error(
          response.data.message || "Failed to fetch friendship requests.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        requestsError: errorMessage,
        isLoadingRequests: false,
        friendRequests: { sent: [], received: [] },
      });
      throw error;
    }
  },

  sendFriendRequest: async (userIds) => {
    console.log(
      "================================================================",
    );
    console.log("API Call: POST /friendship/request");
    console.log(
      "================================================================",
    );
    set({ isSendingRequest: true, sendRequestError: null });
    const requestBody = { user_ids: userIds };
    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post("/friendship/request", requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isSendingRequest: false });
        get().fetchFriendRequests();
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

  handleFriendRequest: async (requestId, action) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: PATCH /friendship/request/${requestId}`);
    console.log(
      "================================================================",
    );
    set({ isHandlingRequest: true, handleRequestError: null });
    const requestBody = { action };
    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.patch(
        `/friendship/request/${requestId}`,
        requestBody,
      );
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isHandlingRequest: false });
        get()._removeReceivedRequest(requestId);
        if (action === "accept") {
          get().fetchAllFriends();
        }
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Failed to handle friendship request.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        handleRequestError: errorMessage,
        isHandlingRequest: false,
      });
      throw error;
    }
  },

  _removeReceivedRequest: (requestId) => {
    set((state) => ({
      friendRequests: {
        ...state.friendRequests,
        received: state.friendRequests.received.filter(
          (req) => req.id !== requestId,
        ),
      },
    }));
  },
}));
