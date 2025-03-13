import React, { useState } from "react";
import Paypal from "../../assets/paymethods/paypal.png";
import Pioneer from "../../assets/paymethods/pioneer.png";
import Stripe from "../../assets/paymethods/Stripe.png";
import { useNavigate } from "react-router-dom";
import GradientBtn from "../../components/Buttons/GradientBtn";

const ManagePaymentMethods = () => {
  const navigate = useNavigate();
  const [CurrentPayment, setCurrentPayment] = useState("");

  const selectedStyle = "bg-[#DE0588]"; // Style for selected payment method

  return (
    <div className="flex flex-col p-8">
      <div className="w-full h-fit flex justify-center items-center flex-col">
        <div className="text-white uppercase font-poppins text-xl font-normal w-[97%] max-w-[1200px] mb-10">
          Manage payment method
        </div>
        <div className="text-white uppercase font-poppins text-3xl font-semibold w-[97%] max-w-[1200px] mb-5">
          Withdraw Balance
        </div>
        <div className="text-white uppercase font-alegreya text-3xl font-semibold w-[97%] max-w-[1200px]">
          $ 2.800k
        </div>
        <div className="text-white uppercase font-poppins text-[.9rem] font-[300] w-[97%] max-w-[1200px] my-5">
          To begin withdrawal process, please select your preferred payment
          method.
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-center flex-col">
        <div className="max-w-[1200px] w-[97%] flex flex-col gap-y-6 pt-6">
          {/* Paypal */}
          <div className="flex flex-col">
            <div
              className={`py-4 rounded-2xl flex flex-row gap-x-5 text-white items-center justify-center w-[400px] font-poppins cursor-pointer ${
                CurrentPayment === "paypal" ? selectedStyle : "bg-[#FFFFFF33]"
              }`}
              onClick={() => {
                setCurrentPayment("paypal");
              }}
            >
              <div className="w-[30%] flex justify-center items-center">
                <img src={Paypal} alt="" />
              </div>
              <div className="w-[70%] flex justify-start items-center">
                <h3>Paypal Account</h3>
              </div>
            </div>
            <div
              className={`text-sm text-white px-3 py-2 ${
                CurrentPayment === "paypal" ? "flex" : "hidden"
              }`}
            >
              The withdraw Tax for this account is $ 24.90
            </div>
          </div>
          {/* Pioneer */}
          <div className="flex flex-col">
            <div
              className={`py-4 rounded-2xl flex flex-row gap-x-5 text-white items-center justify-center w-[400px] font-poppins cursor-pointer ${
                CurrentPayment === "pioneer" ? selectedStyle : "bg-[#FFFFFF33]"
              }`}
              onClick={() => {
                setCurrentPayment("pioneer");
              }}
            >
              <div className="w-[30%] flex justify-center items-center">
                <img src={Pioneer} alt="" />
              </div>

              <div className="w-[70%] flex justify-start items-center">
                <h3>Pioneer Account</h3>
              </div>
            </div>
            <div
              className={`text-sm text-white px-3 py-2 ${
                CurrentPayment === "pioneer" ? "flex" : "hidden"
              }`}
            >
              The withdraw Tax for this account is $ 24.90
            </div>
          </div>
          {/* Stripe */}
          <div className="flex flex-col">
            <div
              className={`py-4 rounded-2xl flex flex-row gap-x-5 text-white items-center justify-center w-[400px] font-poppins cursor-pointer ${
                CurrentPayment === "stripe" ? selectedStyle : "bg-[#FFFFFF33]"
              }`}
              onClick={() => {
                setCurrentPayment("stripe");
              }}
            >
              <div className="w-[30%] flex justify-center items-center">
                <img src={Stripe} alt="" />
              </div>
              <div className="w-[70%] flex justify-start items-center">
                <h3>Stripe Account</h3>
              </div>
            </div>
            <div
              className={`text-sm text-white px-3 py-2 ${
                CurrentPayment === "stripe" ? "flex" : "hidden"
              }`}
            >
              The withdraw Tax for this account is $ 24.90
            </div>
          </div>
        </div>
        <div
          className="underline mt-4 cursor-pointer"
          onClick={() => {
            // navigate("/seller/earnings/manage_payment_methods");
          }}
        >
          Manage Payment Methods
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-center flex-col">
        <div className="w-[97%] max-w-[1200px]">
          <div
            className="underline  cursor-pointer text-white"
            onClick={() => {
              //   navigate("/seller/earnings/manage_payment_methods");
            }}
          >
            Manage Payment Methods
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-center flex-col">
        <div className="w-[97%] max-w-[1200px] p-4">
          <div className="max-w-[300px]">
            <GradientBtn title={"Withdraw"} onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePaymentMethods;
