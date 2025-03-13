import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Paypal from "../assets/paymethods/paypal.png";
import Pioneer from "../assets/paymethods/pioneer.png";
import Stripe from "../assets/paymethods/Stripe.png";

export default function PayOrder() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-900 flex flex-col px-[4%]  p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      {/* Progress Stepper */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-600 ">
            <FontAwesomeIcon className="text-white font-bold" icon={faCheck} />
          </div>
          <span>step 01</span>
          <span className="mt-2 text-lg">Submit Requirements</span>
        </div>
        <div className="w-[100px] h-1 bg-gray-400 mb-10"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-600 ">
            <FontAwesomeIcon className="text-white font-bold" icon={faCheck} />
          </div>
          <span>step 02</span>
          <span className="mt-2 text-lg">Order Details</span>
        </div>
        <div className="w-[100px] h-1 mb-10 bg-gray-400"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border-pink-600 border-4">
            <FontAwesomeIcon className="text-pink-600" icon={faCircle} />
          </div>
          <span>step 03</span>
          <span className="mt-2 text-lg">Pay</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold my-10">Payment Option</h1>

      {/* Upload Section */}
      <div className="bg-[#ffffff67] mb-8 py-6  rounded-lg flex flex-row gap-x-5   text-white items-center justify-center w-[400px] ">
        <img src={Paypal} alt="" />
        <h3>Paypal Account</h3>
      </div>
      <div className="bg-[#ffffff67]  mb-8 py-6  rounded-lg flex flex-row gap-x-5   text-white items-center justify-center w-[400px] ">
        <img src={Pioneer} alt="" />
        <h3>Pioneer Account</h3>
      </div>
      <div className="bg-[#ffffff67]   py-6  rounded-lg flex flex-row gap-x-5   text-white items-center justify-center w-[400px] ">
        <img src={Stripe} alt="" />
        <h3>Stripe Account</h3>
      </div>
    </div>
  );
}
