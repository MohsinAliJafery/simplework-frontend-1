import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import GradientBtn from "../../components/Buttons/GradientBtn";
import { useNavigate } from "react-router-dom";

const ContactUsInstructions = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full items-center justify-center flex">
      <div className="flex flex-col font-poppins items-center justify-center w-[97%] bg-[#FFFFFF33] p-20 rounded-xl text-white">
        <div className="flex flex-col w-full">
          <div className="text-3xl uppercase font-bold">Support</div>
          <div className=" text-sm">Hello! How can we Help you?</div>
        </div>
        <div className="w-full flex items-start">
          <div className="flex flex-col gap-y-4 py-4">
            {[
              "How do I reset my password?",
              "How can I sell in SIMPLEWORKWEBSIT?",
              "How do I create or edit a Gig?",
              "How do I cancel an Order?",
              "How do I withdraw my earnings?",
            ].map((dt) => (
              <div className="flex justify-between items-center gap-x-3 border-2 border-white bg-[#FFFFFF40] px-4 py-3 rounded-xl w-[500px]">
                <div className="">{dt}</div>
                <FaAngleRight />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="text-sm font-poppins font-thin my-3 px-3">
            If you have any more questions, feel free to contact us!
          </div>
          <div className="flex justify-start px-3 items-center w-[350px]">
            <GradientBtn
              title={"Contact Us"}
              onClick={() => {
                navigate("/seller/contact-us/form");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsInstructions;
