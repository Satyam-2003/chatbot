"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const createNewChat = async () => {
    try {
      if (!user) return null;

      const token = await getToken();
      await axios.post(
        "/api/chat/create",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchUsersChat = async () => {
    try {
      const token = await getToken();
      if (!token) return; // Prevents axios call with null token
      const { data } = await axios.get("/api/chat/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        let chatsList = data.data;

        if (chatsList.length === 0) {
          await createNewChat();
          const retry = await axios.get("/api/chat/get", {
            headers: { Authorization: `Bearer ${token}` },
          });
          chatsList = retry.data.data;
        }

        chatsList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        setChats(chatsList);
        setSelectedChat(chatsList[0]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) fetchUsersChat();
  }, [user]);

  const value = {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchUsersChat,
    createNewChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
