import React, { useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { FaStar } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Gigs from "./Gigs";
import Review from "./Review";

const Profile = () => {
  const [CurrentStatus, setCurrentStatus] = useState(1);
  return (
    <div className="px-5 flex w-full">
      <SideMenu />
      <div className="flex  overflow-y-auto h-[86vh] w-full">
        <div className="flex flex-col gap-y-2 ">
          <div className="bg-[#FFFFFF33] h-fit  rounded-2xl p-5 w-[300px]">
            <div className="flex flex-col text-white justify-center items-center">
              <img src="/customerimg.png" alt="" className="w-[100px] mb-5" />
              <div className="pb-1">Ali Khan</div>
              <div className="text-sm font-thin pb-1">@alikhan3344</div>
              <div className="text-[1rem] font-semibold flex mb-2 mt-1 gap-x-2 ">
                <FaStar className="text-[#FFE500] text-xl" /> 4.5{" "}
                <span className="text-sm font-thin"> (23)</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 py-4 text-sm text-white">
              <div className="flex justify-between items-center font-poppins">
                <div className="">From</div>
                <div className="">Canada</div>
              </div>
              <div className="flex justify-between items-center font-poppins">
                <div className="">On SIMPLEWORK Since</div>
                <div className="">2020</div>
              </div>
              <div className="flex justify-between items-center font-poppins">
                <div className="">Last Delivery</div>
                <div className="">02 Days Ago</div>
              </div>
              <div className="flex justify-between items-center font-poppins">
                <div className="">Response Rate</div>
                <div className="">01 Hour</div>
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF33] h-fit  rounded-2xl pt-5 px-5 w-[300px]">
            <div className="flex justify-between text-white font-poppins">
              <div className="">Description</div>
              <FaEdit />
            </div>
            <div className="text-[.7rem] font-poppins text-white my-4">
              Lorem ipsum dolor sit amet consectetur. Amet Molestie augue amet
              sed facilisi purus Augue commodo in. Viverra convallis nisi
              malesuada tempor fermentum venenatis tristique id amet hendrerit.
              Tempor commodo amet neque sem urna arcu. Malesuada ullamcorper est
              Lorem ullamcorper tristique et. Morbi aliquet fringilla vulputate
              vulputate magnis. Elementum arcu ultrices sed facilisis porta.
              Pellentesque enim non dolor sagittis tortor amet.
            </div>
          </div>
          <div className="bg-[#FFFFFF33] h-fit  rounded-2xl pt-5 px-5 w-[300px]">
            <div className="flex justify-between text-white font-poppins items-center">
              <div className="">Language</div>
              <div className="text-[#DE0588] text-sm">Add New</div>
            </div>
            <div className="flex flex-col gap-y-3 py-4 text-sm text-white">
              <div className="flex justify-start items-center font-poppins gap-x-1">
                <div className="">English </div> -{" "}
                <div className="text-[.7rem]">Superior</div>
              </div>
              <div className="flex justify-start items-center font-poppins gap-x-1">
                <div className="">German </div> -{" "}
                <div className="text-[.7rem]">Intermediate</div>
              </div>
              <div className="flex justify-start items-center font-poppins gap-x-1">
                <div className="">Urdu </div> -{" "}
                <div className="text-[.7rem]">Superior</div>
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF33] h-fit  rounded-2xl pt-5 px-5 w-[300px]">
            <div className="flex justify-between text-white font-poppins items-center">
              <div className="">Contacts</div>
              <div className="text-[#DE0588] text-sm">Add New</div>
            </div>
            <div className="flex flex-col gap-y-3 py-4 text-sm text-white">
              <div className="flex justify-start items-center font-poppins gap-x-1">
                <div className="text-sm">Alikhan55***6@gmail.com </div>
              </div>

              <div className="flex justify-start items-center font-poppins gap-x-1">
                <div className="text-sm">+101 99884**90 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-x-7 font-poppins font-semibold mb-8 ml-4">
            <div
              className={`py-3 cursor-pointer transition-all ease-in-out duration-700 ${
                CurrentStatus === 1
                  ? " border-b-2 border-b-white text-white uppercase font-poppins text-xl"
                  : " border-b-2 border-b-transparent text-gray-300 font-poppins"
              }`}
              onClick={() => {
                setCurrentStatus(1);
              }}
            >
              Gigs <span className="text-red-600 text-sm">(05)</span>
            </div>
            <div
              className={`py-3 cursor-pointer transition-all ease-in-out duration-700  font-poppins ${
                CurrentStatus === 2
                  ? " border-b-2 border-b-white text-white uppercase text-xl"
                  : " border-b-2 border-b-transparent text-gray-300"
              }`}
              onClick={() => {
                setCurrentStatus(2);
              }}
            >
              Reviews <span className="text-red-600 text-sm">(45)</span>
            </div>
          </div>
          {CurrentStatus === 1 ? (
            <div className="text-white px-4">
              <Gigs />
            </div>
          ) : (
            CurrentStatus === 2 && (
              <div className="text-white px-4">
                <Review />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
