import React from "react";
// import "./StepsBtn.css";

const StepsBtn = ({ currentStep }) => {
  const stages = ["/coming.png", "/running.png", "/done.png"];
  const StepsData = [
    "Overview",
    "Pricing",
    "Description",
    "Requirement",
    "Gallery",
    "Publish",
  ];

  // Define a function to determine the image source based on the current step
  const getImageSource = (index) => {
    if (index === 0) {
      if (currentStep === 1) return stages[1];
      else if (currentStep > 1) return stages[2];
      else return stages[0];
    }
    if (index === 1) {
      if (currentStep === 2) return stages[1];
      else if (currentStep > 2) return stages[2];
      else return stages[0];
    }
    if (index === 2) {
      if (currentStep === 3) return stages[1];
      else if (currentStep > 3) return stages[2];
      else return stages[0];
    }
    if (index === 3) {
      if (currentStep === 4) return stages[1];
      else if (currentStep > 4) return stages[2];
      else return stages[0];
    }
    if (index === 4) {
      if (currentStep === 5) return stages[1];
      else if (currentStep > 5) return stages[2];
      else return stages[0];
    }
    if (index === 5) {
      if (currentStep === 6) return stages[1];
      else if (currentStep > 6) return stages[2];
      else return stages[0];
    }
  };

  return (
    <div className="flex my-4 mb-20">
      {/* steps array */}
      {StepsData.map((dt, i) => (
        <div className="flex items-center gap-x-3 pr-3">
          <div key={i} className="flex flex-col justify-start relative">
            <img src={getImageSource(i)} className="w-8" />
            <div className="flex flex-col w-full font-poppins absolute -bottom-[50px] left-0">
              <div className="text-sm font-[300] whitespace-nowrap">
                Step {i + 1}
              </div>
              <div className="font-semibold">{dt}</div>
            </div>
          </div>
          {i < 5 && (
            <div className="w-[120px] h-[3px] bg-[#FFFFFFB2] rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepsBtn;
