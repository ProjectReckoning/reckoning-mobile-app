// stores/pocketStore.js
import { create } from "zustand";
import api from "@/lib/api";

// --- Helper Objects ---
const colorClassToHex = {
  "bg-orange-wondr": "#FF7A00",
  "bg-yellow-wondr": "#FFC700",
  "bg-lime-wondr": "#A8E05F",
  "bg-tosca-wondr": "#58ABA1",
  "bg-purple-wondr": "#8A2BE2",
  "bg-pink-wondr": "#FF69B4",
};

const hexToColorClass = {
  "#FF7A00": "bg-orange-wondr",
  "#FFC700": "bg-yellow-wondr",
  "#A8E05F": "bg-lime-wondr",
  "#58ABA1": "bg-tosca-wondr",
  "#8A2BE2": "bg-purple-wondr",
  "#FF69B4": "bg-pink-wondr",
};

const typeToDisplayType = {
  saving: "Saving",
  spending: "Spending",
  business: "Business",
};

// Maps UI display types back to API-friendly values
const typeMapping = {
  Spending: "spending",
  Saving: "saving",
  "Business Fund": "business",
};

export const usePocketStore = create((set, get) => ({
  // --- State ---
  pocketSubject: null,
  setPocketSubject: (subject) => set({ pocketSubject: subject }),
  pocketType: null,
  setPocketType: (type) => set({ pocketType: type }),
  goalTitle: null,
  setGoalTitle: (title) => set({ goalTitle: title }),
  pocketName: "",
  setPocketName: (name) => set({ pocketName: name }),
  pocketBalanceTarget: null,
  setPocketBalanceTarget: (balance) =>
    set({
      pocketBalanceTarget:
        typeof balance === "string"
          ? parseInt(balance.replace(/\D/g, ""), 10) || 0
          : balance,
    }),
  targetDuration: { startDate: undefined, endDate: undefined },
  setTargetDuration: (duration) => set({ targetDuration: duration }),
  deadline: undefined,
  setDeadline: (date) => set({ deadline: date }),
  selectedFriends: [],
  setSelectedFriends: (friends) => set({ selectedFriends: friends }),
  pocketColor: null,
  setPocketColor: (color) => set({ pocketColor: color }),
  pocketIcon: "pocket",
  setPocketIcon: (icon) => set({ pocketIcon: icon }),
  isCreating: false,
  createError: null,
  isUpdating: false,
  updateError: null,
  currentPocket: null,
  isLoading: false,
  error: null,
  transactionHistory: [],
  businessHistorySummary: null,
  isHistoryLoading: false,
  historyError: null,
  allPockets: [],
  isAllPocketsLoading: false,
  allPocketsError: null,
  pocketMembers: [],
  isMembersLoading: false,
  membersError: null,
  isMemberActionLoading: false,
  memberActionError: null,

  // --- Actions ---

  resetPocketData: () => {
    set({
      pocketSubject: null,
      pocketType: null,
      goalTitle: null,
      pocketName: "",
      pocketBalanceTarget: null,
      targetDuration: { startDate: undefined, endDate: undefined },
      deadline: undefined,
      selectedFriends: [],
      pocketColor: null,
      pocketIcon: "pocket",
      createError: null,
      updateError: null,
    });
  },

  setPocketForEditing: (pocket) => {
    set({
      pocketName: pocket.name,
      pocketBalanceTarget: parseInt(pocket.target_nominal, 10),
      deadline: new Date(pocket.deadline),
      pocketColor: hexToColorClass[pocket.color_hex?.toUpperCase()],
      pocketIcon: pocket.icon_name,
      pocketType: pocket.type,
    });
  },

  updatePocketTarget: async (pocketId, targetData) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: PATCH /pocket/${pocketId} (Update Target)`);
    console.log(
      "================================================================",
    );
    set({ isUpdating: true, updateError: null });

    const requestBody = {
      target_nominal: targetData.targetAmount,
      deadline: targetData.deadline,
    };

    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.patch(`/pocket/${pocketId}`, requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));

      if (response.data && response.data.ok) {
        set({ isUpdating: false });
        get().fetchAllPockets();
        get().fetchPocketById(pocketId);
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to update pocket target.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ updateError: errorMessage, isUpdating: false });
      throw error;
    }
  },

  changePocketType: async (pocketId, newType) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: PATCH /pocket/${pocketId} (Change Type)`);
    console.log(
      "================================================================",
    );
    set({ isUpdating: true, updateError: null });

    const requestBody = {
      type: newType, // e.g., "saving"
    };

    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.patch(`/pocket/${pocketId}`, requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));

      if (response.data && response.data.ok) {
        set({ isUpdating: false });
        await get().fetchPocketById(pocketId);
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to change pocket type.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ updateError: errorMessage, isUpdating: false });
      throw error;
    }
  },

  fetchAllPockets: async () => {
    console.log(
      "================================================================",
    );
    console.log("API Call: GET /pocket");
    console.log(
      "================================================================",
    );
    set({ isAllPocketsLoading: true, allPocketsError: null });
    try {
      const response = await api.get("/pocket");
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        const pocketsWithColors = response.data.data.map((pocket) => ({
          ...pocket,
          color:
            hexToColorClass[pocket.color_hex?.toUpperCase()] || "bg-gray-200",
          type: typeToDisplayType[pocket.type] || pocket.type,
        }));
        set({ allPockets: pocketsWithColors, isAllPocketsLoading: false });
      } else {
        throw new Error(response.data.message || "Failed to fetch pockets.");
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        allPocketsError: errorMessage,
        isAllPocketsLoading: false,
        allPockets: [],
      });
      throw error;
    }
  },

  fetchPocketById: async (id) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: GET /pocket/${id}`);
    console.log(
      "================================================================",
    );
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/pocket/${id}`);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        const pocket = response.data.data;
        const pocketWithData = {
          ...pocket,
          members: [
            { ...pocket.owner, PocketMember: pocket.owner.PocketMember },
            ...pocket.members,
          ],
          color:
            hexToColorClass[pocket.color_hex?.toUpperCase()] || pocket.color,
          type: typeToDisplayType[pocket.type] || pocket.type,
        };
        set({ currentPocket: pocketWithData, isLoading: false });
      } else {
        throw new Error(
          response.data.message || "Failed to fetch pocket data.",
        );
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ error: errorMessage, isLoading: false, currentPocket: null });
      throw error;
    }
  },

  createPocket: async () => {
    console.log(
      "================================================================",
    );
    console.log("API Call: POST /pocket");
    console.log(
      "================================================================",
    );
    set({ isCreating: true, createError: null });
    const {
      pocketName,
      pocketType,
      pocketBalanceTarget,
      deadline,
      pocketColor,
      pocketIcon,
      selectedFriends,
    } = get();

    const membersWithRoles = selectedFriends.map((friend) => ({
      user_id: friend.id,
      role: "viewer",
    }));

    // Use the typeMapping to convert the display name to the API value
    const apiPocketType = typeMapping[pocketType] || pocketType?.toLowerCase();

    const requestBody = {
      name: pocketName,
      type: apiPocketType,
      color_hex: colorClassToHex[pocketColor] || "#58ABA1",
      icon_name: pocketIcon,
      members: membersWithRoles,
    };

    // Conditionally add target and deadline
    if (pocketType === "Saving" || pocketType === "Business Fund") {
      requestBody.target_nominal = pocketBalanceTarget;
      requestBody.deadline = deadline ? new Date(deadline).toISOString() : null;
    }

    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post("/pocket", requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isCreating: false });
        get().fetchAllPockets();
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to create pocket.");
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ createError: errorMessage, isCreating: false });
      throw error;
    }
  },

  updatePocket: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: PATCH /pocket/${pocketId}`);
    console.log(
      "================================================================",
    );
    set({ isUpdating: true, updateError: null });
    const {
      pocketName,
      pocketBalanceTarget,
      deadline,
      pocketColor,
      pocketIcon,
    } = get();

    const requestBody = {
      name: pocketName,
      target_nominal: pocketBalanceTarget,
      deadline: deadline,
      color_hex: colorClassToHex[pocketColor] || "#58ABA1",
      icon_name: pocketIcon,
    };

    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.patch(`/pocket/${pocketId}`, requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isUpdating: false });
        get().fetchAllPockets();
        get().fetchPocketById(pocketId);
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to update pocket.");
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ updateError: errorMessage, isUpdating: false });
      throw error;
    }
  },

  deletePocket: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: DELETE /pocket/${pocketId}`);
    console.log(
      "================================================================",
    );
    set({ isAllPocketsLoading: true, allPocketsError: null });
    try {
      const response = await api.delete(`/pocket/${pocketId}`);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set((state) => ({
          allPockets: state.allPockets.filter((p) => p.pocket_id !== pocketId),
          isAllPocketsLoading: false,
        }));
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to delete pocket.");
      }
    } catch (error) {
      const errorMessage =
        error.message || "An unexpected error occurred while deleting.";
      console.error("API Error:", errorMessage);
      set({
        allPocketsError: errorMessage,
        isAllPocketsLoading: false,
      });
      throw error;
    }
  },

  fetchTransactionHistory: async (pocketId, monthString) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: GET /pocket/${pocketId}/history`);
    console.log(
      "================================================================",
    );
    set({ isHistoryLoading: true, historyError: null });
    const { currentPocket } = get();

    try {
      console.log("Request Params:", { month: monthString });
      const response = await api.get(`/pocket/${pocketId}/history`, {
        params: { month: monthString },
      });
      console.log("Response Received:", JSON.stringify(response.data, null, 2));

      if (response.data && response.data.ok) {
        if (
          currentPocket?.type === "Business" &&
          typeof response.data.data === "object" &&
          response.data.data.transaksi
        ) {
          const { transaksi, ...summary } = response.data.data;
          set({
            transactionHistory: transaksi || [],
            businessHistorySummary: summary,
            isHistoryLoading: false,
          });
        } else {
          set({
            transactionHistory: Array.isArray(response.data.data)
              ? response.data.data
              : [],
            businessHistorySummary: null,
            isHistoryLoading: false,
          });
        }
      } else {
        throw new Error(
          response.data.message || "Failed to fetch transaction history.",
        );
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        historyError: errorMessage,
        isHistoryLoading: false,
        transactionHistory: [],
        businessHistorySummary: null,
      });
      throw error;
    }
  },

  // --- Member Management Actions ---
  fetchPocketMembers: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: GET /pocket/${pocketId}/members`);
    console.log(
      "================================================================",
    );
    set({ isMembersLoading: true, membersError: null });
    try {
      const response = await api.get(`/pocket/${pocketId}/members`);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({
          pocketMembers: response.data.data || [],
          isMembersLoading: false,
        });
      } else {
        throw new Error(
          response.data.message || "Failed to fetch pocket members.",
        );
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        membersError: errorMessage,
        isMembersLoading: false,
        pocketMembers: [],
      });
      throw error;
    }
  },

  invitePocketMembers: async (pocketId, friends) => {
    console.log(
      "================================================================",
    );
    console.log("API Call: POST /pocket/invite");
    console.log(
      "================================================================",
    );
    set({ isMemberActionLoading: true, memberActionError: null });
    const membersToInvite = friends.map((friend) => ({
      user_id: friend.id,
      role: "viewer", // Role is set to viewer as instructed
    }));

    // --- CHANGE: The key is now "pocketId" as per the new API spec ---
    const requestBody = {
      pocketId: parseInt(pocketId, 10),
      members: membersToInvite,
    };

    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post("/pocket/invite", requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isMemberActionLoading: false });
        get().fetchPocketMembers(pocketId);
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to invite members.");
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ memberActionError: errorMessage, isMemberActionLoading: false });
      throw error;
    }
  },

  respondToPocketInvite: async (inviteId, responseAction) => {
    console.log(
      "================================================================",
    );
    console.log("API Call: POST /pocket/respond-invite");
    console.log(
      "================================================================",
    );
    set({ isMemberActionLoading: true, memberActionError: null });
    const requestBody = { inviteId: inviteId, response: responseAction };
    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post("/pocket/respond-invite", requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isMemberActionLoading: false });
        if (responseAction === "accepted") {
          get().fetchAllPockets();
        }
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Failed to respond to invite.",
        );
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ memberActionError: errorMessage, isMemberActionLoading: false });
      throw error;
    }
  },

  removePocketMembers: async (pocketId, memberUserIds) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: POST /pocket/${pocketId}/members/kick`);
    console.log(
      "================================================================",
    );
    set({ isMemberActionLoading: true, memberActionError: null });
    const requestBody = { members: memberUserIds };
    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post(
        `/pocket/${pocketId}/members/kick`,
        requestBody,
      );
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        await get().fetchPocketById(pocketId);
        set({ isMemberActionLoading: false });
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to remove members.");
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ memberActionError: errorMessage, isMemberActionLoading: false });
      throw error;
    }
  },

  updateMemberRole: async (pocketId, userId, role) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: PATCH /pocket/${pocketId}/members/role`);
    console.log(
      "================================================================",
    );
    set({ isMemberActionLoading: true, memberActionError: null });
    const requestBody = { user_id: userId, role: role };
    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.patch(
        `/pocket/${pocketId}/members/role`,
        requestBody,
      );
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        await get().fetchPocketById(pocketId);
        set({ isMemberActionLoading: false });
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Failed to update member role.",
        );
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ memberActionError: errorMessage, isMemberActionLoading: false });
      throw error;
    }
  },

  changePocketOwner: async (pocketId, newOwnerId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: PATCH /pocket/${pocketId}/members/change-owner`);
    console.log(
      "================================================================",
    );
    set({ isMemberActionLoading: true, memberActionError: null });
    const requestBody = { new_owner_id: newOwnerId };
    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.patch(
        `/pocket/${pocketId}/members/change-owner`,
        requestBody,
      );
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        await get().fetchPocketById(pocketId);
        set({ isMemberActionLoading: false });
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to change owner.");
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ memberActionError: errorMessage, isMemberActionLoading: false });
      throw error;
    }
  },

  leavePocket: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: DELETE /pocket/${pocketId}/leave`);
    console.log(
      "================================================================",
    );
    set({ isMemberActionLoading: true, memberActionError: null });
    try {
      const response = await api.delete(`/pocket/${pocketId}/leave`);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isMemberActionLoading: false });
        get().fetchAllPockets();
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to leave pocket.");
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ memberActionError: errorMessage, isMemberActionLoading: false });
      throw error;
    }
  },
}));
