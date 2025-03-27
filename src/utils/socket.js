import { io } from "socket.io-client";
import { BASE_URL } from "./Config";
console.log("BASE_URL", BASE_URL);
let socket;
try {
  console.log("Connecting to socket");
  socket = io(BASE_URL, {
    withCredentials: true,
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });
  socket.on("connected", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log("Socket connection error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });
} catch (err) {
  console.log("Error in socket connection", err);
}

export default socket;
