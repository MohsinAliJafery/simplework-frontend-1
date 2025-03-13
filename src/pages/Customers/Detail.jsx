import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCircle, FaStar } from "react-icons/fa6";
import { IoChatbubblesOutline } from "react-icons/io5";
import GradientBtn from "../../components/Buttons/GradientBtn";

const Detail = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[96%] text-white flex flex-col px-3   bg-[#FFFFFF33] rounded-2xl">
        <div className="w-[95%] flex justify-between items-center px-8 py-8">
          <div className="flex gap-x-5 items-center">
            <img src="/customerimg.png" className="w-[232px]" alt="" />
            <div className="font-poppins">
              <div className="font-bold text-xl">Ali khan</div>
              <div className="text-sm font-thin">@alikhan3344</div>
              <div className="text-[1rem] font-semibold flex mb-2 mt-1 gap-x-2">
                <FaStar className="text-[#FFE500] text-xl" /> 4.5{" "}
                <span className="text-sm font-thin"> (23)</span>
              </div>
              <div className="flex items-center gap-x-2 my-3">
                <IoChatbubblesOutline className="text-xl" />
                <div className="">English, German, Spanish</div>
              </div>
              <div className="flex items-center gap-x-2 my-3">
                <FaPhoneAlt className="text-xl" />
                <div className="">Contact Info</div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="bg-white text-black w-[300px] flex flex-col gap-y-6 py-5 px-3 rounded-xl">
              <div className="flex items-center gap-x-2 px-8">
                <img src="/customerimg.png" className="w-[60px]" alt="" />
                <div className="">
                  <div className="">Ali Khan</div>
                  <div className="flex gap-x-1 items-center text-[.7rem] font-normal">
                    Online <FaCircle className="text-[#0CA12D] text-[.5rem]" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <GradientBtn title={"Contact Me"} onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-[95%] h-[2px] bg-white rounded-full"></div>
        </div>
        <div className="flex justify-center items-center">
          <div className="font-poppins py-4 flex flex-col gap-y-2 w-[95%]">
            <div className="font-bold text-xl">About</div>
            <div className="text-[1rem] font-thin">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col">
          <div className="flex justify-between w-[95%] font-poppins py-4">
            <div className="text-xl font-bold">23 Reviews</div>
            <div className="flex items-center gap-x-2">
              <div className="flex gap-x-1">
                <FaStar className="text-[#FFE500] text-xl" />
                <FaStar className="text-[#FFE500] text-xl" />
                <FaStar className="text-[#FFE500] text-xl" />
                <FaStar className="text-[#FFE500] text-xl" />
                <FaStar className="text-[gray] text-xl" />
              </div>{" "}
              <span className="text-sm font-thin"> (4.5)</span>
            </div>
          </div>
          <div className="flex items-start w-[95%] py-3 mb-10">
            <div className="flex flex-col space-y-2">
              {/* 5 Stars */}
              <div className="flex items-center w-[300px]">
                <div className="w-20 font-poppins whitespace-nowrap font-normal">
                  5 Stars
                </div>
                <div className="w-full bg-gray-200 rounded h-2 ml-4 mr-4">
                  <div
                    className="bg-[#DE0588] h-2 rounded"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <span className="text-sm font-thin">(1)</span>
              </div>

              {/* 4 Stars */}
              <div className="flex items-center w-[300px]">
                <div className="w-20 font-poppins whitespace-nowrap font-normal">
                  4 Stars
                </div>
                <div className="w-full bg-gray-200 rounded h-2 ml-4 mr-4">
                  <div
                    className="bg-[#DE0588] h-2 rounded"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <span className="text-sm font-thin">(1)</span>
              </div>

              {/* 3 Stars */}
              <div className="flex items-center w-[300px]">
                <div className="w-20 font-poppins whitespace-nowrap font-normal">
                  3 Stars
                </div>
                <div className="w-full bg-gray-200 rounded h-2 ml-4 mr-4">
                  <div
                    className="bg-[#DE0588] h-2 rounded"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <span className="text-sm font-thin">(1)</span>
              </div>

              {/* 0 Stars */}
              <div className="flex items-center w-[300px]">
                <div className="w-20 font-poppins whitespace-nowrap font-normal">
                  0 Stars
                </div>
                <div className="w-full bg-gray-200 rounded h-2 ml-4 mr-4">
                  <div
                    className="bg-[#DE0588] h-2 rounded"
                    style={{ width: "10%" }}
                  ></div>
                </div>
                <span className="text-sm font-thin">(1)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-[95%] h-[2px] bg-white rounded-full"></div>
        </div>
        <div className="w-full flex items-center justify-center py-3 px-3">
          <div className="w-[95%] flex flex-col gap-x-8 gap-y-8 py-8">
            <div className="flex justify-between items-center">
              <div className="flex gap-x-5 items-start w-[380px] py-2 px-2">
                <img src="/customerimg.png" className="w-[80px]" alt="" />
                <div className="font-poppins">
                  <div className="font-bold text-xl">Ali khan</div>
                  <div className="text-sm font-normal">Pakistan</div>
                  <div className="flex gap-x-2 my-2">
                    <div className="text-[1rem] font-semibold flex mb-2 mt-1 gap-x-1 border-r-2 border-r-white pr-4">
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                    </div>
                    <div className="text-[1rem] font-thin ml-3">1 week ago</div>
                  </div>
                  <div className="text-sm font-normal font-poppins">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </div>
              <div className="flex gap-x-5 items-start w-[380px] py-2 px-2">
                <img src="/customerimg.png" className="w-[80px]" alt="" />
                <div className="font-poppins">
                  <div className="font-bold text-xl">Ali khan</div>
                  <div className="text-sm font-normal">Pakistan</div>
                  <div className="flex gap-x-2 my-2">
                    <div className="text-[1rem] font-semibold flex mb-2 mt-1 gap-x-1 border-r-2 border-r-white pr-4">
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                    </div>
                    <div className="text-[1rem] font-thin ml-3">1 week ago</div>
                  </div>
                  <div className="text-sm font-normal font-poppins">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-x-5 items-start w-[380px] py-2 px-2">
                <img src="/customerimg.png" className="w-[80px]" alt="" />
                <div className="font-poppins">
                  <div className="font-bold text-xl">Ali khan</div>
                  <div className="text-sm font-normal">Pakistan</div>
                  <div className="flex gap-x-2 my-2">
                    <div className="text-[1rem] font-semibold flex mb-2 mt-1 gap-x-1 border-r-2 border-r-white pr-4">
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                    </div>
                    <div className="text-[1rem] font-thin ml-3">1 week ago</div>
                  </div>
                  <div className="text-sm font-normal font-poppins">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </div>
              <div className="flex gap-x-5 items-start w-[380px] py-2 px-2">
                <img src="/customerimg.png" className="w-[80px]" alt="" />
                <div className="font-poppins">
                  <div className="font-bold text-xl">Ali khan</div>
                  <div className="text-sm font-normal">Pakistan</div>
                  <div className="flex gap-x-2 my-2">
                    <div className="text-[1rem] font-semibold flex mb-2 mt-1 gap-x-1 border-r-2 border-r-white pr-4">
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                      <FaStar className="text-[#FFE500] text-[1rem]" />
                    </div>
                    <div className="text-[1rem] font-thin ml-3">1 week ago</div>
                  </div>
                  <div className="text-sm font-normal font-poppins">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center my-6 mb-10">
          <div className="w-[300px]">
            <GradientBtn title={"View More"} onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
