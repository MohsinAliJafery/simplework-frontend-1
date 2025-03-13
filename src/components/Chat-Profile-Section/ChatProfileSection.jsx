import React from "react";
import gigChat from "../../assets/Images/gigChat.svg";
import { useFirebase } from "@/context/useFirebase";

const adminFirebaseUid = "67aa3de2327788caeb170964";

const profileDetails = [
  { label: "From", value: "Russia" },
  { label: "On SIMPLEWORK since", value: "Jan 2020" },
  { label: "English", value: "Fluent" },
  { label: "Spanish", value: "Conversational" },
  { label: "German", value: "Conversational" },
  { label: "Response Rate", value: "100%" },
  { label: "Ratings", value: "4.5" },
  { label: "Completed Orders", value: "34" },
  { label: "Active Orders", value: "3" },
];

const ChatProfileSection = () => {
  const { users, selectedUser, setSelectedUser } = useFirebase();

  const chatWithSupport = () => {
    const adminUser = users.find((user) => user.uid === adminFirebaseUid);
    setSelectedUser(adminUser);
  };

  return (
    <div className="w-1/4 p-6 rounded-lg text-white pt-0">
      <h2 className="text-2xl font-semibold mb-4">
        About {selectedUser?.username}
      </h2>
      <div className="space-y-2 text-sm">
        {profileDetails.map(({ label, value }, index) => (
          <p key={index} className="flex justify-between pr-6">
            <span className="text-gray-300">{label}</span>
            <span className="font-semibold">{value}</span>
          </p>
        ))}
      </div>
      <button
        className="mt-6 px-6 bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-full font-normal"
        onClick={chatWithSupport}
      >
        Support
      </button>
      <img src={gigChat} alt="gig" className="mt-4 w-[90%]" />
    </div>
  );
};

export default ChatProfileSection;
