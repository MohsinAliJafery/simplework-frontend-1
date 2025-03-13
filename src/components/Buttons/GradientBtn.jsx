import React from "react";
import { ClipLoader } from "react-spinners";

const GradientBtn = ({ title, onClick, isLoading }) => {
  return (
    <button
      className="px-4 py-3 font-poppins text-white w-[100%] font-normal text-[1rem] rounded-lg flex items-center justify-center"
      style={{
        background: "linear-gradient(270deg, #DE0588 0%, #460BCB 100%)",
      }}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ClipLoader color="#fff" height={8} width={2} margin={-2} size={24} radius={2} />
        </div>
      ) : (
        title
      )}
    </button>
  );
};

export default GradientBtn;
