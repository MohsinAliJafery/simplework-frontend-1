import React, { useState } from "react";
import GradientBtn from "../../components/Buttons/GradientBtn";

const ContactForm = () => {
  const [text, setText] = useState("");
  const maxLength = 100;
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="flex justify-center items-center overflow-y-auto">
      <div className="bg-[#FFFFFF33] rounded-2xl  text-white w-[97%]  items-center flex flex-col justify-start gap-y-8 py-8 overflow-y-auto h-[85vh]">
        <div className="flex flex-col w-[75%]">
          <div className="text-3xl uppercase font-bold">CONTACT US</div>
          <div className=" text-sm">Let Us Know How can we Help you?</div>
        </div>
        <div className="flex justify-center flex-col w-[75%] font-poppins text-sm px-3 gap-y-1">
          <div className="">Full Name</div>
          <input
            type="text"
            className="w-[100%] border-2 border-white bg-transparent px-4 py-3 rounded-xl outline-none"
          />
        </div>
        <div className="flex justify-center flex-col w-[75%] font-poppins text-sm px-3 gap-y-1">
          <div className="">Email</div>
          <input
            type="email"
            className="w-[100%] border-2 border-white bg-transparent px-4 py-3 rounded-xl outline-none"
          />
        </div>
        <div className="flex justify-center flex-col w-[75%] font-poppins text-sm px-3 gap-y-1">
          <div className="">Subject</div>
          <input
            type="email"
            className="w-[100%] border-2 border-white bg-transparent px-4 py-3 rounded-xl outline-none"
          />
        </div>
        <div className="flex justify-center flex-col w-[75%] font-poppins text-sm px-3 gap-y-1 relative">
          <div className="">Description </div>
          <textarea
            className="w-full bg-transparent text-white border-white border-[1px] rounded-2xl p-4 h-[30vh] text-[.8rem] font-poppins outline-none mt-2 resize-none"
            placeholder="Lorem Ipsum ..."
            minLength={100}
            maxLength={maxLength}
            value={text}
            onChange={handleChange}
          />
          {/* Character counter in the bottom-right corner */}
          <div className="absolute bottom-4 right-8 text-white font-poppins font-bold text-[.7rem]">
            {text.length}/{maxLength}
          </div>
        </div>
        <div className="w-[75%] px-5 pb-10">
          <div className="max-w-[300px]">
            <GradientBtn title={"Continue"} onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
