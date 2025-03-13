import React, { useState } from "react";
import StepsBtn from "../../components/Buttons/StepsBtn";
import { BiSolidChevronDown } from "react-icons/bi";
import GradientBtn from "../../components/Buttons/GradientBtn";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import SelectComp from "./SelectComp";

const CreateNewGig2 = () => {
  const [text, setText] = useState("");
  const maxLength = 100;
  const [checked, setChecked] = useState([]);

  const [packages, setPackages] = useState({
    basic: {
      name: "",
      description: "",
      deliveryTime: "",
      revisions: "",
      screens: 0,
      designasset: "",
      price: 100,
      features: {
        responsiveDesign: false,
        wireframe: false,
        prototype: false,
        sourceFile: false,
      },
    },
    standard: {
      name: "",
      description: "",
      deliveryTime: "",
      revisions: "",
      screens: 0,
      designasset: "",
      price: 200,
      features: {
        responsiveDesign: false,
        wireframe: false,
        prototype: false,
        sourceFile: false,
      },
    },
    premium: {
      name: "",
      description: "",
      deliveryTime: "",
      revisions: "",
      screens: 0,
      designasset: "",
      price: 300,
      features: {
        responsiveDesign: false,
        wireframe: false,
        prototype: false,
        sourceFile: false,
      },
    },
  });

  // Handle input changes for package fields
  const handleInputChange = (e, packageType, field) => {
    setPackages({
      ...packages,
      [packageType]: {
        ...packages[packageType],
        [field]: e.target.value,
      },
    });
  };

  // Handle checkbox changes for features
  const handleFeatureChange = (packageType, feature) => {
    setPackages({
      ...packages,
      [packageType]: {
        ...packages[packageType],
        features: {
          ...packages[packageType].features,
          [feature]: !packages[packageType].features[feature],
        },
      },
    });
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleChangeCheckBox = (event) => {
    if (checked.find((dt) => dt === event.target.value)) {
      setChecked(checked.filter((dt) => dt !== event.target.value));
    } else {
      setChecked([...checked, event.target.value]);
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-[#FFFFFF33] text-white w-[100%] flex flex-col justify-center items-center py-4 mx-6 font-poppins rounded-2xl">
        <div className="flex justify-start items-center w-[80%] my-4 mb-8 font-semibold text-xl">
          Create New Gig
        </div>
        <StepsBtn />
        <div className="flex-col w-[80%] mt-7">
          <div className="font-semibold text-xl">Advertisement12</div>
          <div className="font-normal text-[1rem]">Package</div>
        </div>
        <div className="flex-col w-[80%] mt-7">
          <div className="flex bg-[#FFFFFF33] w-fit">
            <div className="w-[250px] font-poppins">
              <div className="h-[340px] border-[1px] border-white"></div>
              <div className="border-[1px] border-white py-3 px-2 text-center h-[90px] flex justify-center items-center">
                Number of Screens
              </div>
              <div className="border-[1px] border-white py-3 px-2 text-center h-[90px] flex justify-center items-center">
                Custom Asset Design
              </div>
              <div className="border-[1px] border-white py-3 px-2 text-center h-[90px] flex justify-center items-center">
                Responsive Design
              </div>
              <div className="border-[1px] border-white py-3 px-2 text-center h-[90px] flex justify-center items-center">
                Wireframe
              </div>
              <div className="border-[1px] border-white py-3 px-2 text-center h-[90px] flex justify-center items-center">
                Prototype
              </div>
              <div className="border-[1px] border-white py-3 px-2 text-center h-[90px] flex justify-center items-center">
                Source file
              </div>
              <div className="border-[1px] border-white py-3 px-2 text-center h-[90px] flex justify-center items-center">
                Revisions
              </div>
              <div className="border-[1px] border-white py-3 px-2 text-center h-[90px] flex justify-center items-center bg-[#FFFFFF80]">
                Price
              </div>
            </div>
            <div className="w-[250px] font-poppins">
              <div className="text-xl font-semibold border-[1px] border-white py-5 text-center bg-[#FFFFFF80]">
                BASIC
              </div>
              <input
                type="text"
                name=""
                id=""
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
                placeholder="Your Package name"
              />
              <input
                type="text"
                name=""
                id=""
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
                placeholder="Describe the details you offering ..."
              />
              <SelectComp
                Value={packages["basic"].deliveryTime}
                placeholder="Delivery Time"
              />

              <input
                type="number"
                name=""
                id=""
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
              />
              <SelectComp Value={packages["basic"].designasset} />
              {/* Responsive Design */}
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      // value={dt.title}
                      checked={packages["basic"].features.responsiveDesign}
                      onChange={() =>
                        handleFeatureChange("basic", "responsiveDesign")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              {/* Wireframe */}
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["basic"].features.wireframe}
                      onChange={() => handleFeatureChange("basic", "wireframe")}
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["basic"].features.prototype}
                      onChange={() => handleFeatureChange("basic", "prototype")}
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["basic"].features.sourceFile}
                      onChange={() =>
                        handleFeatureChange("basic", "sourceFile")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <SelectComp Value={packages["basic"].revisions} />
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center">
                $ 00
              </div>
            </div>
            <div className="w-[250px] font-poppins">
              <div className="text-xl font-semibold border-[1px] border-white py-5 text-center bg-[#FFFFFF80]">
                STANDARD
              </div>
              <input
                type="text"
                name=""
                id=""
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
                placeholder="Your Package name"
              />
              <input
                type="text"
                name=""
                id=""
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
                placeholder="Describe the details you offering ..."
              />
              <SelectComp
                Value={packages["standard"].deliveryTime}
                placeholder="Delivery Time"
              />

              <input
                type="number"
                name=""
                id=""
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
              />
              <SelectComp Value={packages["standard"].designasset} />
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["standard"].features.responsiveDesign}
                      onChange={() =>
                        handleFeatureChange("standard", "responsiveDesign")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["standard"].features.wireframe}
                      onChange={() =>
                        handleFeatureChange("standard", "wireframe")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["standard"].features.prototype}
                      onChange={() =>
                        handleFeatureChange("standard", "prototype")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["standard"].features.sourceFile}
                      onChange={() =>
                        handleFeatureChange("standard", "sourceFile")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <SelectComp Value={packages["standard"].revisions} />

              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center">
                $ 00
              </div>
            </div>
            <div className="w-[250px] font-poppins">
              <div className="text-xl font-semibold border-[1px] border-white py-5 text-center bg-[#FFFFFF80]">
                PREMIUM
              </div>
              <input
                type="text"
                name=""
                id=""
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
                placeholder="Your Package name"
              />
              <input
                type="text"
                name=""
                id=""
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
                placeholder="Describe the details you offering ..."
              />
              <SelectComp
                Value={packages["premium"].deliveryTime}
                placeholder="Delivery Time"
              />

              <input
                type="number"
                name=""
                id=""
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
              />
              <SelectComp Value={packages["premium"].designasset} />
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["premium"].features.responsiveDesign}
                      onChange={() =>
                        handleFeatureChange("premium", "responsiveDesign")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["premium"].features.wireframe}
                      onChange={() =>
                        handleFeatureChange("premium", "wireframe")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["premium"].features.prototype}
                      onChange={() =>
                        handleFeatureChange("premium", "prototype")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={packages["premium"].features.sourceFile}
                      onChange={() =>
                        handleFeatureChange("premium", "sourceFile")
                      }
                      color="white" // You can change this to 'secondary', 'default', or custom color
                      sx={{ color: "white" }}
                    />
                  }
                  // label={dt.title}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                      fontSize: "1rem", // Adjust font size if needed
                      color: "white", // Ensure the label text is visible
                    },
                  }}
                />
              </div>
              <SelectComp Value={packages["premium"].revisions} />
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center">
                $ 00
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] py-8 px-3">
          <div className="w-[300px]">
            <GradientBtn
              title={"Continue"}
              onClick={() => {
                navigate("/seller/create-new-gig/3");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewGig2;
