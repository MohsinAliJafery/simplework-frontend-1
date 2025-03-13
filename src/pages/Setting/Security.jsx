import React, { useState } from "react";
import GradientBtn from "../../components/Buttons/GradientBtn";
import toast from "react-hot-toast";
import { updateProfile } from "../../Api_Requests/Api_Requests";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Security = ({ formData, setFormData, setIsLoading, isLoading }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match");
      return;
    }

    const updatedFormData = new FormData();
    updatedFormData.append("username", formData.username);
    updatedFormData.append("email", formData.email);
    updatedFormData.append("currentPassword", formData.currentPassword);
    updatedFormData.append("newPassword", formData.newPassword);

    if (formData.profileImage && typeof formData.profileImage !== "string") {
      updatedFormData.append("profileImage", formData.profileImage);
    }

    try {
      const response = await updateProfile(userData?._id, updatedFormData);
      if (response.status === 200) {
        setIsLoading(false)
        toast.success("Password updated successfully");
        const updatedUserData = {
          ...userData,
          username: response.data.user.username,
          email: response.data.user.email,
          profileImage: response.data.user.profileImage,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error(
          error.response.data.message ||
          "An error occurred. Please try again later"
        );
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-[#FFFFFF33] text-white w-full rounded-2xl items-center flex flex-col justify-center gap-y-8 py-8">
      <form
        className="flex flex-col w-[90%] gap-y-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="PUT"
      >
        {/* Current Password Field */}
        <div className="flex justify-center flex-col w-full font-poppins text-sm px-3 gap-y-1">
          <label htmlFor="currentPassword">Current Password</label>
          <div className="relative w-[100%]">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword || ""}
              onChange={handleInputChange}
              className="w-[100%] border-2 border-white bg-transparent px-4 py-3 rounded-xl outline-none"
              placeholder="Enter your current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-5 top-4"
            >
              {showCurrentPassword ?  <FaEye size={20} /> : <FaEyeSlash size={20} /> }
            </button>
          </div>
        </div>

        {/* New Password Field */}
        <div className="flex justify-center flex-col w-full font-poppins text-sm px-3 gap-y-1">
          <label htmlFor="newPassword">New Password</label>
          <div className="relative w-[100%]">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword || ""}
              onChange={handleInputChange}
              className="w-[100%] border-2 border-white bg-transparent px-4 py-3 rounded-xl outline-none"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-5 top-4"
            >
              {showNewPassword ?  <FaEye size={20}/> : <FaEyeSlash size={20} /> }
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex justify-center flex-col w-full font-poppins text-sm px-3 gap-y-1">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative w-[100%]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleInputChange}
              className="w-[100%] border-2 border-white bg-transparent px-4 py-3 rounded-xl outline-none"
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-5 top-4"
            >
              {showConfirmPassword ?   <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="w-full my-5 px-5">
          <div className="max-w-[300px]">
            <GradientBtn isLoading={isLoading} title={"Save Changes"} type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Security;
