import { Link, NavLink, useNavigate } from "react-router-dom";
import Typing from "../assets/bro.png";
import Cube from "../assets/cube.png";
import { forgetPasswordStepOne, LoginApi } from "../Api_Requests/Api_Requests";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/Slices/userSlice";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await LoginApi({ email, password });
      if (response.status === 200) {
        const userData = response.data.userData;
        dispatch(updateUser(userData));
        setIsLoading(false);
        toast.success("Logged-In Successfully!");
        localStorage.setItem("user", JSON.stringify(response.data.userData));
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setIsLoading(false);
        toast.error("Invalid email or password.");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.response?.data?.error);
    }
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            <h2 className="text-xl font-bold mb-2">LOGIN</h2>
            <p className="mb-6">login to your account</p>
          </div>

          <form className="flex flex-col gap-y-4 items-center">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded border border-gray-600 bg-black text-white focus:outline-none max-w-[400px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded border border-gray-600 bg-black text-white focus:outline-none max-w-[400px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mb-6 text-left max-w-[400px] w-full">
              <Link to="/forgot-password">
                <button type="button" className="text-red-500">
                  Forgot Password?
                </button>
              </Link>
            </div>
            <button
              // type="submit"
              className="w-full p-3 rounded bg-gradient-to-l from-[#DE0588] to-[#460BCB] text-white font-bold max-w-[400px]"
              onClick={onSubmit}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center">
            Dont have an account?{" "}
            <Link to={"/signup"} className="text-pink-500 ">
              Sign up
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
