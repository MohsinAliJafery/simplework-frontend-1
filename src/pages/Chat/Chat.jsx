import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPaperclip, FaRegSmile } from "react-icons/fa";
import chatAvatar from "../../assets/Images/chatAvatar.svg";
import chatMsg from "../../assets/Images/chatMsg.svg";
import chatStar from "../../assets/Images/chatStar.svg";
import audioCall from "../../assets/Images/audioCallChat.svg";
import deleteChat from "../../assets/Images/deleteChat.svg";
import videoCall from "../../assets/Images/videoCallChat.svg";
import settingsChat from "../../assets/Images/settingsChat.svg";
import micChat from "../../assets/Images/micChat.svg";
import GigModal from "../../components/Chat/GigModal";
import { GetLoggedInUser } from "../../Api_Requests/Api_Requests";
import { useFirebase } from "@/context/useFirebase";
import AudioMessage from "@/components/Audio/AudioMessage";
import ChatProfileSection from "@/components/Chat-Profile-Section/ChatProfileSection";
import VoiceMessageRecorder from "@/components/VoiceMessage/VoiceMessage";
import { Input } from "@/components/ui/input";

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export default function Chat() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRecordingMode, setIsRecordingMode] = useState(false);
  const {
    currentUser,
    users,
    selectedUser,
    messages,
    fetchAndSetCurrentUser,
    setSelectedUser,
    sendMessage,
    sendVoiceMessage,
  } = useFirebase();

  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = useCallback(
    debounce((query) => {
      if (query.trim() === "") {
        setFilteredUsers(users);
      } else {
        setFilteredUsers(
          users.filter((user) =>
            user.username.toLowerCase().includes(query.toLowerCase())
          )
        );
      }
    }, 300), // 300ms debounce delay
    []
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  // Fetch current user on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const {
          data: { userData },
        } = await GetLoggedInUser();
        if (userData) {
          fetchAndSetCurrentUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!selectedUser && users.length > 0) {
      setSelectedUser(users[0]);
    }
  }, [users]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (await sendMessage(messageText)) {
      setMessageText("");
    }
  };

  const handleVoiceRecorded = async (audioBlob) => {
    if (await sendVoiceMessage(audioBlob)) {
      setIsRecordingMode(false);
    }
  };

  const toggleRecordingMode = () => {
    setIsRecordingMode(!isRecordingMode);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";

    const date = timestamp.toDate();
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div
      className="flex h-full p-4 text-white pt-[2rem]"
      style={{ height: `calc(100vh - 175px)` }}
    >
      {/* Sidebar */}
      <div
        className="w-[22%] bg-transparent p-4 rounded-lg mt-0 pt-0"
        style={{ height: `calc(100vh - 175px)` }}
      >
        {/* Header (Non-Scrolling Part) */}
        <div className="flex-col justify-between items-start">
          <div className="text-3xl font-semibold mb-4 flex gap-2">
            <span>Messages</span>
          </div>
          <div className="w-[93%] mb-3">
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Message List (Only this should scroll) */}
        <div
          className="space-y-4 cursor-pointer overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 235px)" }}
        >
          {(searchTerm ? filteredUsers : users).map((user) => (
            <div
              key={user.id} // Use a unique key if possible
              className="flex items-center justify-between p-3 bg-transparent rounded-lg"
            >
              <div
                className="flex items-center space-x-3"
                onClick={() => setSelectedUser(user)}
              >
                <img src={chatAvatar} alt="avatar" className="rounded-full" />
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-400">
                    {user?.lastMessage?.text ?? "no message"}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-400 flex flex-col gap-2">
                <span>
                  {formatMessageTime(user?.lastMessage?.createdAt ?? "")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div
        className="flex flex-col flex-1 mx-0 bg-transparent rounded-2xl p-10 pt-0 "
        style={{ height: `calc(100vh - 120px)` }}
      >
        <div className="lg:flex lg:justify-between border border-gray-700 rounded-2xl pb-4 px-4 pt-4 mb-8">
          <div>
            <div className="flex items-center space-x-3 ">
              <img src={chatAvatar} alt="avatar" className="rounded-full" />
              <div className="flex flex-col">
                <p className="font-bold text-xl">{selectedUser?.username}</p>
                <span className="text-sm text-green-400">Active Now</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-6 items-center">
            <img src={deleteChat} alt="delete"></img>
            <img src={audioCall} alt="audio"></img>
            <img src={videoCall} alt="video"></img>
            <img src={settingsChat} alt="settings"></img>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === currentUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {msg.type === "voice" ? (
                <AudioMessage
                  url={msg.voiceUrl}
                  time={
                    msg.createdAt?.toDate().toLocaleTimeString() || "Sending..."
                  }
                />
              ) : (
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.senderId === currentUser._id
                      ? "bg-purple-600"
                      : "bg-gray-800"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs text-gray-400 block mt-1">
                    {msg.createdAt?.toDate().toLocaleTimeString() ||
                      "Sending..."}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <button
            type="button"
            className="p-3 px-4 border bg-[#DE0588] border-[#DE0588] rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            Create an Offer
          </button>
        </div>
        <div className="flex items-center justify-end space-x-4 mt-4 bg-gray-900 p-3 rounded-lg">
          {isRecordingMode ? (
            <VoiceMessageRecorder onVoiceRecorded={handleVoiceRecorded} />
          ) : (
            <>
              <input
                type="text"
                className="flex-1 bg-transparent text-white p-2 outline-none"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message"
              />
              <FaRegSmile className="text-white cursor-pointer" size={20} />
              <FaPaperclip className="text-white cursor-pointer" />
              <img
                src={micChat}
                alt="mic"
                className="cursor-pointer"
                onClick={toggleRecordingMode}
              />
              <button
                className="bg-pink-600 p-2 px-4 rounded-lg text-white"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </>
          )}

          <GigModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </div>

      {/* Profile Section */}
      <ChatProfileSection />
    </div>
  );
}
