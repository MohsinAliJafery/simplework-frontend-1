import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

export default function SubmittedOrder() {
  const { gig, selectedPlan, loading, error, requirements } = useSelector(
    (state) => state.singlegig
  );
  const navigate = useNavigate();
  const { _id } = JSON.parse(localStorage.getItem("user"));
  const handleOrder = async () => {
    try {
      const formData = new FormData();
      formData.append("buyerId", _id);
      formData.append("serviceId", gig?._id);
      formData.append("title", gig?.title);
      formData.append("details", gig?.description);
      formData.append("category", gig?.category);
      formData.append("subcategory", gig?.subcategory);
      formData.append("deliveryTime", gig?.pricing?.[selectedPlan]?.delivery);
      formData.append("package", JSON.stringify(gig?.pricing?.[selectedPlan]));
      formData.append("termsAndConditions", true);
      formData.append("paymentStatus", false);
      formData.append("paymentIntentId", null);
      formData.append("gigImage", gig?.servicesImages[0].imgUrl);

      if (requirements) {
        formData.append("file", requirements);
      }

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.post(
        "http://localhost:5000/api/orders/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Order created successfully!");
        const orderId = response.data.data._id;
        navigate(`/payorder?orderId=${orderId}`);
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("An error occurred while creating the order.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-900 flex flex-col px-[4%]  p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      {/* Progress Stepper */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border-pink-600 border-4">
            <FontAwesomeIcon
              className="text-pink-600 font-bold"
              icon={faCheck}
            />
          </div>
          <span>step 01</span>
          <span className="mt-2 text-lg">Submit Requirements</span>
        </div>
        <div className="w-[100px] h-1 bg-gray-400 mb-10"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border-pink-600 border-4">
            <FontAwesomeIcon className="text-pink-600" icon={faCircle} />
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

      {/* Upload Section */}
      <div className="bg-[#ffffff67]   rounded-lg flex flex-col gap-y-8  text-white items-center justify-center w-[600px] p-5">
        <div className="flex flex-row justify-between gap-x-[420px] ">
          <h1 className="text-2xl font-semibold">{selectedPlan}</h1>
          <h1 className="text-2xl font-semibold">
            {gig?.pricing?.[selectedPlan]?.price || "No plan selected"}
          </h1>
        </div>
        <p className="text-xl text-start">{gig?.category}</p>
        {/* <div className="flex flex-row justify-start items-start gap-x-3">
          <p>Gig Quantity</p>
          <div className="flex flex-row justify-start gap-x-3">
            <button className="bg-white px-3 rounded-xl text-xl font-bold text-black">
              -
            </button>
            <span>01</span>
            <button className="bg-white px-3 rounded-xl text-xl font-bold text-black">
              +
            </button>
          </div>
        </div> */}
      </div>
      <div className="bg-[#ffffff67]   rounded-lg mt-10 text-white flex flex-col  w-[600px] p-5">
        <div className="flex flex-row justify-start gap-x-6 items-center mr-30%">
          <h1 className="text-xl font-bold">Included</h1>
          <p className="text-sm">Single Order</p>
        </div>
        <h1 className="text-xl font-bold mt-10">{selectedPlan} Package</h1>
        <ul class="mt-4">
          <li>
            {gig?.pricing?.[selectedPlan]?.packageDetails || "No plan selected"}
          </li>
          <li>
            {gig?.pricing?.[selectedPlan]?.packageName || "No plan selected"}
          </li>
        </ul>
        <h1 className="text-xl font-bold mt-10">
          {gig?.pricing?.[selectedPlan]?.delivery || "No plan selected"}
        </h1>
        <h1 className="text-xl font-bold mt-10">
          {" "}
          revisions
          {gig?.pricing?.[selectedPlan]?.revisions || "No plan selected"}
        </h1>
      </div>

      {/* Continue Button */}
      {/* <Link
        to={"/payorder"}
        className="bg-gradient-to-r text-center from-pink-500 to-purple-500 w-[350px] text-white text-lg font-semibold mt-8 px-8 py-3 rounded-full"
      >
        Continue
      </Link> */}
      <button
        onClick={handleOrder}
        className="bg-gradient-to-r text-center from-pink-500 to-purple-500 w-[350px] text-white text-lg font-semibold mt-8 px-8 py-3 rounded-full"
      >
        order
      </button>
    </div>
  );
}
