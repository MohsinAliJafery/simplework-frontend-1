import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addrequirements } from "../store/Slices/singlegigslice";


export default function OrderDetails() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const dispatch = useDispatch()
  const { gig } = useSelector((state) => state.singlegig);
 

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      dispatch(addrequirements(file)); 
    }
  };


    const handlePlanClick = (plan) => {
      dispatch(updateSelectedPlan(plan)); 
    };
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-900 flex flex-col px-[4%]  p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      {/* Progress Stepper */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border-pink-600 border-4">
            <FontAwesomeIcon className="text-pink-600" icon={faCircle} />
          </div>
          <span>step 01</span>
          <span className="mt-2 text-lg">Submit Requirements</span>
        </div>
        <div className="w-[100px] h-1 bg-gray-400 mb-10"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400">
            <span className="text-sm text-gray-400">02</span>
          </div>
          <span>step 02</span>
          <span className="mt-2 text-lg">Order Details</span>
        </div>
        <div className="w-[100px] h-1 mb-10 bg-gray-400"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400">
            <span className="text-sm text-gray-400">03</span>
          </div>
          <span>step 03</span>
          <span className="mt-2 text-lg">Pay</span>
        </div>
      </div>

      <p className="text-2xl font-bold mb-4">{gig?.category}</p>
      <p className="mb-8">Upload The Requirements Seller Need From You.</p>

      {/* Upload Section */}
      <div className="bg-gray-800 w-64 h-64 rounded-lg flex flex-col items-center justify-center">
        <FontAwesomeIcon
          icon={faCloudUploadAlt}
          size="3x"
          className="text-white"
        />
        <p className="text-center mt-4 text-sm">
          Drag & Drop Here or Click the Upload Button to Browse
        </p>
        <label className="mt-4">
          <input type="file" onChange={handleFileUpload} className="hidden" />
          <span className="cursor-pointer bg-white text-pink-500 px-4 py-2 rounded-full">
            {uploadedFile ? uploadedFile?.name : "Upload"}
          </span>
        </label>
      </div>

      {/* Continue Button */}
      <Link
        to={"/submittedorder"}
        className="bg-gradient-to-r text-center from-pink-500 to-purple-500 w-[350px] text-white text-lg font-semibold mt-8 px-8 py-3 rounded-full"
      >
        Continue
      </Link>
    </div>
  );
}
