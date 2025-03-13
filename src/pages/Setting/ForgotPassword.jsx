import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typing from "../../assets/bro.png";
import Cube from "../../assets/cube.png";
import { useForm } from "react-hook-form";
import { forgetPasswordStepOne } from "../../Api_Requests/Api_Requests";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading,setLoading]=useState(false)

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   navigate(`/otp-verify`);
  // };
  const navigate=useNavigate()

  const {register,handleSubmit}=useForm({
    mode: 'onSubmit',
    defaultValues:{
      email:"",
    }
  })
  
  const onSubmit =  async (payload) => {
    try {
      setLoading(true)
      const response=await forgetPasswordStepOne(payload)
      setLoading(false)
      const resetToken=response?.data?.token
      toast.success("OTP sent successfully!")
      localStorage.setItem('resetToken',resetToken)
      navigate('/otp-verify')
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
  }

  return (

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
            <h2 className="text-xl font-bold mb-2">Forgot Password</h2>
            <p className="mb-6">
              Enter your email to receive password reset instructions.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 items-center"
          >
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className="w-full p-3 rounded border border-gray-600 bg-black text-white focus:outline-none max-w-[400px]"
            />

            <button
              type="submit"
              className="w-full p-3 rounded bg-gradient-to-l from-[#DE0588] to-[#460BCB] text-white font-bold max-w-[400px]"
            >
              {loading?"Please Wait...":"Continue"}
            </button>
          </form>

          <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base md:text-lg">
            Remember your password?{" "}
            <Link
              to={"/login"}
              className="text-pink-500 font-semibold hover:underline sm:text-base md:text-lg"
            >
              Sign in
            </Link>
          </p>
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
    );
}
