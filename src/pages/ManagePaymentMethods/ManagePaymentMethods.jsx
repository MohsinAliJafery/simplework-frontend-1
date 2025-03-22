import React, { useEffect, useState } from "react";
import Paypal from "../../assets/paymethods/paypal.png";
import Pioneer from "../../assets/paymethods/pioneer.png";
import Stripe from "../../assets/paymethods/Stripe.png";
import { useNavigate } from "react-router-dom";
import GradientBtn from "../../components/Buttons/GradientBtn";
import {
  fetchWallet,
  paypalConnect,
  stripeConnect,
} from "../../Api_Requests/Api_Requests";
import { useSearchParams } from "react-router-dom";
import {
  withdrawViaPaypal,
  withdrawViaStripe,
} from "../../Api_Requests/Api_Requests";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";
const ManagePaymentMethods = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [CurrentPayment, setCurrentPayment] = useState("");
  const [userWalletData, setUserWalletData] = useState("");
  const [loading, setLoading] = useState(false);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const selectedStyle = "bg-[#DE0588]";
  useEffect(() => {
    if (code && state) {
      if (state === `${userData?._id}_paypal`) {
        handlePaypalCallback(code);
      } else if (state === `${userData?._id}_stripe`) {
        handleStripeCallback(code, state);
      }
    } else {
      fetchWalletDate();
    }
  }, []);

  const handlePaypalCallback = async (code) => {
    try {
      setLoading(true);

      const response = await paypalConnect({ code });
      if (response.data.success) {
        toast.success("PayPal Connected Successfully");
        setUserWalletData(response.data.wallet);
      } else {
        toast.error("Failed to connect PayPal");
      }
    } catch (error) {
      toast.error("Error Connecting PayPal!");
      console.error("Error connecting PayPal:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleStripeCallback = async (code, state) => {
    console.log("Fetching wallet data...");
    try {
      setLoading(true);
      const response = await stripeConnect({ code, state });

      const data = response.data;
      if (data.wallet) {
        toast.success("Stripe Connected Successfully");
        setUserWalletData(data.wallet);
      }
    } catch (error) {
      toast.error("Error Connecting Stripe!");

      console.error("Error connecting Stripe:", error);
    } finally {
      setLoading(false);
    }
  };

  //To be Removed
  const PAYPAL_CLIENT_ID =
    "AVcluyEqETDUoa8VfAdXISKoHFkLs6I6ocyqRZ-1GGoOBxKA8PNwubFvaMSRNOPnwuMT2Gr3Ke3lzERg";
  const REDIRECT_URI =
    "https://8518-119-73-99-41.ngrok-free.app/seller/earnings/manage_payment_methods";
  const USER_ID = userData?._id;
  const connectPayPal = () => {
    const url = `https://www.sandbox.paypal.com/connect?flowEntry=static&client_id=${PAYPAL_CLIENT_ID}&scope=openid%20email%20profile&redirect_uri=${REDIRECT_URI}&state=${USER_ID}_paypal`;
    window.location.href = url;
  };

  const handleStripeConnect = async () => {
    const STRIPE_CLIENT_ID = "ca_RgeUKWzypJ4Fo1eoB2ksdtLAK396UMXA";
    const USER_ID = userData?._id;
    const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${STRIPE_CLIENT_ID}&scope=read_write&state=${USER_ID}_stripe`;
    window.location.href = stripeAuthUrl;
  };

  const withdrawMoneyViaPaypal = async () => {
    const response = await withdrawViaPaypal();

    if (response.data.success) {
      alert("Money is Withdrawn into paypal");
    }
  };
  const withdrawMoneyViaStripe = async () => {
    const response = await withdrawViaStripe();

    if (response.data.success) {
      alert("Money is Withdrawn into paypal");
    }
  };

  const fetchWalletDate = async () => {
    try {
      const response = await fetchWallet();

      console.log(response.data);
      setUserWalletData(response.data);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("An error occurred while creating the order.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col p-8">
      <div className="w-full h-fit flex justify-center items-center flex-col">
        <div className="text-white uppercase font-poppins text-xl font-normal w-[97%] max-w-[1200px] mb-10">
          Manage payment method
        </div>
        <div className="text-white uppercase font-poppins text-3xl font-semibold w-[97%] max-w-[1200px] mb-5">
          Withdraw Balance
        </div>
        <div className="text-white uppercase font-alegreya text-3xl font-semibold w-[97%] max-w-[1200px]">
          {userWalletData.balance}
          <span className="text-white uppercase font-poppins text-[.9rem] font-[300] w-[97%] max-w-[1200px] my-5">
            &nbsp;Balance
          </span>
        </div>
        <div className="text-white uppercase font-alegreya text-3xl font-semibold w-[97%] max-w-[1200px]">
          {userWalletData.pendingBalance}
          <span className="text-white uppercase font-poppins text-[.9rem] font-[300] w-[97%] max-w-[1200px] my-5">
            &nbsp;Pending Balance
          </span>
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
          </div>
        </div>
        <div className="underline mt-4 cursor-pointer">
          Manage Payment Methods
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-center flex-col">
        <div className="w-[97%] max-w-[1200px] p-4">
          <div className="max-w-[300px]">
            <GradientBtn
              title={
                CurrentPayment === "stripe"
                  ? userWalletData.stripeAccountId
                    ? "Withdraw via Stripe"
                    : "Connect Stripe"
                  : CurrentPayment === "paypal"
                  ? userWalletData.paypalEmail
                    ? "Withdraw via PayPal"
                    : "Connect PayPal"
                  : "Select Payment Method"
              }
              onClick={() => {
                if (CurrentPayment === "stripe") {
                  if (userWalletData.stripeAccountId) {
                    withdrawMoneyViaStripe();
                  } else {
                    handleStripeConnect();
                  }
                } else if (CurrentPayment === "paypal") {
                  if (userWalletData.paypalEmail) {
                    withdrawMoneyViaPaypal();
                  } else {
                    connectPayPal();
                  }
                } else {
                  alert("Please select a payment method.");
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePaymentMethods;
