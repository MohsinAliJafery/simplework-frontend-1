import React, { useEffect, useState } from "react";
import Typing from "../../assets/bro.png";
import { useNavigate } from "react-router-dom";
import Cube from "../..//assets/cube.png";
import toast from "react-hot-toast";
import { set, useForm } from "react-hook-form";
import { forgetPasswordStepTwo } from "../../Api_Requests/Api_Requests";
export default function Otp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  useEffect(() => {
    const resetToken = localStorage.getItem("resetToken");
    if (!resetToken) {
      navigate("/login");
    }
  }, []);
  const onSubmit = async (payload) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("resetToken");
      payload.token = token;
      await forgetPasswordStepTwo(payload);
      setTimeout(()=>{
      setLoading(false)
      navigate("/confirm-password");
      },1000)
      
    } catch (error) {
      setLoading(false)
      if (error?.status == 400) {
        toast.error(error.response?.data?.message);
        console.log(error);
      } else {
        toast.error("Some Went Wrong!");
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="bg-black flex items-center justify-center h-screen w-screen">
        <div className="bg-black text-white flex w-[100%] h-[100%] overflow-hidden">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 p-10 mb-20">
            <div
              className="flex items-center mb-10 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src={Cube}
                alt="Logo"
                width="50"
                height="50"
                className="mr-3"
              />
              <span className="text-2xl font-bold">SIMPLEWORK</span>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">OTP Verification </h2>
              <p className="mb-6">
                Enter the OTP sent to your email address to verify your account{" "}
              </p>
            </div>

            <form
              className="flex flex-col gap-y-4 items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="Number"
                placeholder="otp"
                min={0}
                {...register("Otp", {
                  required: "Otp is required!",
                  minLength: {
                    value: 4,
                    message: "The Otp contains 4 numbers!",
                  },
                })}
                className="w-full p-3 rounded border border-gray-600 bg-black text-white focus:outline-none max-w-[400px]"
              />
              {
                errors.Otp && (
                  <span className="text-red-500">{errors.Otp.message}</span>
                )
                // :<span className="min-h-5"></span>
              }

              <button
                type="submit"
                className="w-full p-3 rounded bg-gradient-to-l from-[#DE0588] to-[#460BCB] text-white font-bold max-w-[400px]"
              >
                {loading?"Verifying...":"Continue"}
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex w-[50%] items-center justify-center rounded-l-[12%] bg-pink-600">
            <div className="top-0 right-0 bottom-0 left-0"></div>
            <div className="relative z-10">
              <img
                src={Typing}
                alt="Illustration"
                width="300"
                height="300"
                className="mb-6"
              />
              <h2 className="text-3xl font-bold text-center">
                Hire or Get Hired
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
