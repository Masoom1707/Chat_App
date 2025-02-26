import { create } from "zustand";
import { axiosInstance } from "../axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const userChatStore = create((set, get) => ({
  message: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const user = await axiosInstance.get("/messages/users");
      set({ users: user.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getUserMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const userMessages = await axiosInstance.get(`/messages/${userId}`);
      set({ message: userMessages.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, message } = get();
    try {
      const messageRes = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ message: [...message, messageRes.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const {selectedUser} = get()
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
        const isMessageSentForSelectedUser = newMessage.senderId === selectedUser._id
        if(!isMessageSentForSelectedUser) return;
        
        set({message:[...get().message, newMessage]})
    })
  },

  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
