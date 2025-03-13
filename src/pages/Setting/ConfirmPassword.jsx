import React, { useEffect, useState } from "react";
import Typing from "../../assets/bro.png";
import Cube from "../../assets/cube.png";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { resetPassword } from "../../Api_Requests/Api_Requests";
import { useNavigate } from "react-router-dom";
export default function ConfirmPassword() {
  const [loading,setLoading]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode:"onSubmit",
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });
  const navigate=useNavigate()
useEffect(()=>{
  const resetToken=localStorage.getItem('resetToken')
  if(!resetToken){
    navigate('/login')
  }
},[])
  const onSubmit = async (payload) => {
    console.log(payload);
    try {
      setLoading(true)
      const token = localStorage.getItem("resetToken");
      payload.token = token;
      await resetPassword(payload);
      toast.success("Password Changed Successfully!")
      localStorage.removeItem('resetToken')
      navigate("/login");
    } catch (error) {
      setLoading(false)
      if (error?.status == 400) {
        toast.error(error?.response?.data?.error);
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
              <h2 className="text-xl font-bold mb-2">Change Password</h2>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4 items-center"
            >
              <div className="w-full max-w-[400px]">
    <input
      type="password"
      placeholder="New password"
      {...register("password", {
        required: "New Password is required!",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters long!",
        },
      })}
      className="w-full p-3 rounded border border-gray-600 bg-black text-white focus:outline-none"
    />
    {errors?.password && (
      <span className="text-red-500 text-sm">{errors?.password?.message}</span>
    )}
  </div>
              <div className="w-full max-w-[400px]">
    <input
      type="password"
      placeholder="Confirm password"
      {...register("confirmpassword", {
        required: "Confirm Password field is required",
        validate: (value) =>
          value === watch("password") || "Passwords don't match!",
      })}
      className="w-full p-3 rounded border border-gray-600 bg-black text-white focus:outline-none"
    />
    {errors?.confirmpassword && (
      <span className="text-red-500 text-sm">{errors?.confirmpassword?.message}</span>
    )}
  </div>
              
              <button
                type="submit"
                className="w-full p-3 rounded bg-gradient-to-l from-[#DE0588] to-[#460BCB] text-white font-bold max-w-[400px]"
              >
                {loading?"Please Wait...":"Reset Password"}
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
