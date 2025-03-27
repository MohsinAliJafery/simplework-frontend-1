import React, { createContext, useEffect } from "react";
import socket from "../utils/socket"; // adjust path if needed

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    try {
      const userData1 = JSON.parse(localStorage.getItem("user"));
      const userId = userData1?._id;
      console.log("User ID:", userId);

      console.log("Connecting to socket...");

      if (userId) {
        socket.emit("setUserId", userId);
      }

      socket.on("connected", (data) => {
        console.log("User status updated:", data);
      });

      socket.on("disconnect", () => {
        console.log("Socket Disconnected");
      });

      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.log("Socket Error:", error);
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
