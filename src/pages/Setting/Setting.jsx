import React, { useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import Account from "./Account";
import Security from "./Security";

const Setting = () => {
  const [CurrentStatus, setCurrentStatus] = useState(1);
  const [isLoading, setIsLoading]=useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profileImage: null,
    imagePreview: null,
    currentPassword:"",
    newPassword:"",
    confirmPassword: "",
  });

  return (
    <div className="px-5 flex w-full">
      <SideMenu />
      <div className="flex flex-col w-full">
        <div className="text-white font-poppins text-3xl font-semibold px-4 py-6 uppercase">
          Settings
        </div>
        <div className="flex items-center gap-x-7 font-poppins font-semibold mb-8 ml-4">
          <div
            className={`py-3 cursor-pointer transition-all ease-in-out duration-700 ${
              CurrentStatus === 1
                ? " border-b-2 border-b-white text-white uppercase font-poppins text-xl"
                : " border-b-2 border-b-transparent text-gray-500 font-poppins"
            }`}
            onClick={() => setCurrentStatus(1)}
          >
            Account
          </div>
          <div
            className={`py-3 cursor-pointer transition-all ease-in-out duration-700 font-poppins ${
              CurrentStatus === 2
                ? " border-b-2 border-b-white text-white uppercase text-xl"
                : " border-b-2 border-b-transparent text-gray-500"
            }`}
            onClick={() => setCurrentStatus(2)}
          >
            Security
          </div>
        </div>
        {CurrentStatus === 1 ? (
          <Account isLoading={isLoading} setIsLoading={setIsLoading} formData={formData} setFormData={setFormData} />
        ) : (
          <Security isLoading={isLoading} setIsLoading={setIsLoading}  formData={formData} setFormData={setFormData} />
        )}
      </div>
    </div>
  );
};

export default Setting;
