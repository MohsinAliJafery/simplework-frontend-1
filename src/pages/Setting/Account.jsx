import React, { useEffect, useState } from "react";
import GradientBtn from "../../components/Buttons/GradientBtn";
import toast from "react-hot-toast";
import { updateProfile } from "../../Api_Requests/Api_Requests";
import { updateUser } from "../../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/GetCroppedImg";
import { useSearchParams, useNavigate } from "react-router-dom";


const Account = ({ formData, setFormData, isLoading, setIsLoading }) => {
  const dispatch = useDispatch();
  const [isEmailVisible, setIsEmailVisible] = useState(true);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        username: prevData.username || userData.username || "",
        email: prevData.email || userData.email || "",
        profileImage: prevData.profileImage || userData.profileImage || null,
        imagePreview: prevData.imagePreview || userData.profileImage || null,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        setSelectedImage(imageURL);
        setIsCropModalOpen(true);
        localStorage.setItem("selectedImage", imageURL);

      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async () => {
    try {
      const { blob, url } = await getCroppedImg(selectedImage, croppedAreaPixels, zoom);
      console.log("croppedImage instanceof Blob", blob instanceof Blob);
      console.log("url",url);
      
      if (blob instanceof Blob) {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: blob,
          imagePreview: url, 
        }));
        setIsCropModalOpen(false);
      } else {
        throw new Error("Cropped image is not a Blob.");
      }
    } catch (err) {
      console.error("Error cropping the image:", err);
    }
  };
  

  const handleEmailVisible = () => {
    setIsEmailVisible(!isEmailVisible);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!formData.username || !formData.email) {
      toast.error("Changes can't be saved");
      return;
    }
    // setIsEmailVisible(false);
    const updatedFormData = new FormData();
    updatedFormData.append("username", formData.username);
    updatedFormData.append("email", formData.email);
    if (formData.profileImage && typeof formData.profileImage !== "string") {
      updatedFormData.append("profileImage", formData.profileImage);
    }
    try {
      const response = await updateProfile(userData?._id, updatedFormData);
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Profile updated successfully");
        setIsEmailVisible(true);
        const updatedUserData = {
          ...userData,
          username: response.data.user.username,
          email: response.data.user.email,
          profileImage: response.data.user.profileImage,
        };
        dispatch(updateUser(updatedUserData));
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const isOpen = localStorage.getItem("cropModal") === "true";
    const savedImage = localStorage.getItem("selectedImage"); 
    if (isOpen && savedImage) {
      setSelectedImage(savedImage);
    }
    setIsCropModalOpen(isOpen);
  }, []);
  

const openModal = () => {
  setIsCropModalOpen(true);
  localStorage.setItem("cropModal", "true");
};

const closeModal = () => {
  setIsCropModalOpen(false);
  localStorage.removeItem("cropModal");
  localStorage.removeItem("selectedImage"); 
};


  return (
    <div className="bg-[#FFFFFF33] text-white w-full rounded-2xl items-center flex flex-col justify-center gap-y-8 py-8">
      <form
        className="flex flex-col w-[90%] gap-y-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="PUT"
      >
        {/* Full Name Field */}
        <div className="flex justify-center flex-col w-full font-poppins text-sm px-3 gap-y-1">
          <label htmlFor="username">Full Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            className="w-full border-2 border-white bg-transparent px-4 py-3 rounded-xl outline-none"
          />
        </div>

        {/* Email Field */}
        <div className="flex justify-center flex-col w-full font-poppins text-sm px-3 gap-y-1 relative">
          <label htmlFor="email">Email</label>
          <input
            type={isEmailVisible ? "password" : "email"} 
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full border-2 border-white bg-transparent px-4 py-3 rounded-xl outline-none"
          />
          <button
            type="button"
            onClick={handleEmailVisible}
            className="absolute right-5 top-10"
          >
            {isEmailVisible ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
          </button>
        </div>

        {/* Image Upload Field */}
        <div className="flex justify-center flex-col w-full font-poppins text-sm px-3 gap-y-1">
          <label htmlFor="image-upload">Upload Image</label>
          <input
            id="image-upload"
            name="profileImage"
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleChange(e);
              openModal(); 
            }}            
            className="w-full border-2 border-white bg-transparent px-4 py-3 rounded-xl outline-none cursor-pointer"
          />
          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="Profile Preview"
              className="mt-3 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full my-5 px-5">
          <div className="max-w-[300px]">
            <GradientBtn isLoading={isLoading} title={"Save Changes"} type="submit" />
          </div>
        </div>
      </form>

      {isCropModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg p-5 w-[90%] max-w-lg"
            style={{
              background: 'linear-gradient(45deg, rgba(21,12,21,1) 35%, rgb(84, 12, 57) 100%)',
            }}          
          >
            <div className="crop-container relative w-full h-64">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
            <div className="flex justify-end gap-0 mt-4">
              <button
                className="hover:border hover:rounded-md px-4 hover:border-white hover:bg-white hover:bg-opacity-10 text-white text-xl"
                onClick={closeModal} // <-- Close modal on Cancel
              >
                Cancel
              </button>
              <button
                className="text-[#d50000] p-3 px-6 hover:rounded-md bg-transparent hover:bg-[#690101] hover:text-white hover:border-[#36061b] text-xl"
                onClick={() => {
                  handleSaveCroppedImage();
                  closeModal(); // <-- Close modal after saving
                }}              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
