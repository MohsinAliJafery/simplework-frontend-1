import React, { useState } from "react";
import StepsBtn from "../../components/Buttons/StepsBtn";
import { BiSolidChevronDown } from "react-icons/bi";
import GradientBtn from "../../components/Buttons/GradientBtn";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import SelectComp from "./SelectComp";
import DragNDrop from "../../components/Inputs/DragNDrop";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaFacebookF, FaLinkedin } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";

const CreateNewGig = () => {
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

  const [text, setText] = useState("");
  const maxLength = 100;
  const [checked, setChecked] = useState([]);
  const [Tags, setTags] = useState("");
  const [NewTag, setNewTag] = useState("");
  const navigate = useNavigate();
  const maxTags = 5; // Maximum number of tags allowed
  const [currentStep, setCurrentStep] = useState(2);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-[#FFFFFF33] text-white w-[100%] flex flex-col justify-center items-center py-4 mx-6 font-poppins rounded-2xl">
        <div className="flex justify-start items-center w-[80%] my-4 mb-8 font-semibold text-xl">
          Create New Gig
        </div>
        <StepsBtn currentStep={currentStep} />
        {/* =========================== */}
        {/* steps */}
        {/* =========================== */}
        {currentStep === 1 ? (
          <>
            {/* step 1 */}
            <div className="flex-col w-[80%] mt-7">
              <div className="font-semibold text-xl">Gig Title</div>
              <div className="text-[.7rem] font-thin w-[50%] mb-1">
                As your Gig storefront, your title is the most important place
                to include keywords that buyers would likely use to search for a
                service like yours
              </div>
              <div className="relative w-full">
                {/* title of gig */}
                <textarea
                  className="w-full bg-transparent text-white border-white border-[1px] rounded-2xl p-2 h-[20vh] text-[1rem] font-poppins outline-none mt-2 resize-none"
                  placeholder="Lorem Ipsum ..."
                  minLength={100}
                  maxLength={maxLength}
                  value={text}
                  onChange={handleChange}
                />
                {/* Character counter in the bottom-right corner */}
                <div className="absolute bottom-2 right-2 text-white text-[.7rem]">
                  {text.length}/{maxLength}
                </div>
              </div>
            </div>
            {/* =========================== */}
            {/* cat and sub cat */}
            {/* =========================== */}
            <div className="flex-col w-[80%] mt-7">
              <div className="font-semibold text-xl">Category</div>
              <div className="text-[.7rem] font-thin w-[50%] mb-1">
                Choose the category and sub-category most suitable for your Gig.
              </div>
              <div className="w-full flex justify-between">
                <div
                  className={`relative text-center text-lg tracking-[1px] no-underline text-[#fff] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#f7f7f7] hover:text-[black] shadow-[inset_0_0_0_0_#fff] hover:shadow-[inset_0_-100px_0_0_#fff] active:scale-90 px-4 py-3 rounded-2xl font-[Quicksand] font-[700] text-[1rem] bg-transparent flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
                  //   onClick={handleClick}
                >
                  <div className="flex items-center">
                    <div className="w-[250px] outline-none font-[200] font-poppins text-[1.1rem] text-left placeholder:text-white bg-transparent whitespace-nowrap">
                      Select Category
                    </div>
                    <BiSolidChevronDown
                      className="text-[1.5rem] cursor-pointer"
                      //   aria-describedby={id}
                      variant="contained"
                    />
                  </div>
                </div>
                <div
                  className={`relative text-center text-lg tracking-[1px] no-underline text-[#fff] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#f7f7f7] hover:text-[black] shadow-[inset_0_0_0_0_#fff] hover:shadow-[inset_0_-100px_0_0_#fff] active:scale-90 px-4 py-3 rounded-2xl font-[Quicksand] font-[700] text-[1rem] bg-transparent flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
                  //   onClick={handleClick}
                >
                  <div className="flex items-center">
                    <div className="w-[250px] outline-none font-[200] font-poppins text-[1.1rem] text-left placeholder:text-white bg-transparent whitespace-nowrap">
                      Select Sub Category
                    </div>
                    <BiSolidChevronDown
                      className="text-[1.5rem] cursor-pointer"
                      //   aria-describedby={id}
                      variant="contained"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* =========================== */}
            {/* Meta Data */}
            {/* =========================== */}
            <div className="flex-col w-[80%] mt-7">
              <div className="font-semibold text-xl">Gig Metadata</div>
              <div className="flex justify-between py-5">
                <div className="flex flex-col w-[340px] p-6 border-2 border-white rounded-3xl">
                  <div className="flex items-start py-3 justify-between font-poppins">
                    <div className="text-xl font-semibold">App Type</div>
                    <div className="text-sm">03 / 03</div>
                  </div>
                  <div className="w-[270px] text-[.8rem] font-poppins">
                    Select the types of applications you specialize in.
                  </div>
                  <div className="flex flex-wrap justify-between">
                    {[
                      { title: "Business" },
                      { title: "Books" },
                      { title: "Events" },
                      { title: "Education" },
                      { title: "Games" },
                    ].map((dt) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={dt.title}
                            checked={checked.find((dt) => dt === dt.title)}
                            onChange={handleChangeCheckBox}
                            color="white" // You can change this to 'secondary', 'default', or custom color
                            sx={{ color: "white" }}
                          />
                        }
                        label={dt.title}
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                            fontSize: "1rem", // Adjust font size if needed
                            color: "white", // Ensure the label text is visible
                          },
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col w-[340px] p-6 border-2 border-white rounded-3xl">
                  <div className="flex items-start py-3 justify-between font-poppins">
                    <div className="text-xl font-semibold">Design Tool</div>
                    <div className="text-sm">03 / 03</div>
                  </div>
                  <div className="w-[270px] text-[.8rem] font-poppins">
                    Select the design tools you deliver in your Gig or Extras.
                  </div>
                  <div className="flex flex-wrap justify-between">
                    {[
                      { title: "Marvel" },
                      { title: "Figma" },
                      { title: "Adobe XD" },
                      { title: "Fluid" },
                      { title: "Zeplin" },
                    ].map((dt) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={dt.title}
                            checked={checked.find((dt) => dt === dt.title)}
                            onChange={handleChangeCheckBox}
                            color="white" // You can change this to 'secondary', 'default', or custom color
                            sx={{ color: "white" }}
                          />
                        }
                        label={dt.title}
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                            fontSize: "1rem", // Adjust font size if needed
                            color: "white", // Ensure the label text is visible
                          },
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col w-[340px] p-6 border-2 border-white rounded-3xl">
                  <div className="flex items-start py-3 justify-between font-poppins">
                    <div className="text-xl font-semibold">Device</div>
                    <div className="text-sm">03 / 03</div>
                  </div>
                  <div className="w-[270px] text-[.8rem] font-poppins">
                    What mobile do you design for?
                  </div>
                  <div className="flex flex-wrap justify-between">
                    {[
                      { title: "Events" },
                      { title: "Education" },
                      { title: "Business" },
                      { title: "Books" },
                      { title: "Games" },
                    ].map((dt) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={dt.title}
                            checked={checked.find((dt) => dt === dt.title)}
                            onChange={handleChangeCheckBox}
                            color="white" // You can change this to 'secondary', 'default', or custom color
                            sx={{ color: "white" }}
                          />
                        }
                        label={dt.title}
                            sx={{
                          "& .MuiFormControlLabel-label": {
                            fontFamily: '"Poppins", sans-serif', // Use Poppins font family
                            fontSize: "1rem", // Adjust font size if needed
                            color: "white", // Ensure the label text is visible
                          },
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col w-[80%] mt-7">
              <div className="font-semibold text-xl">Positive Keywordsss</div>
              <div className="text-[.7rem] font-thin w-[50%] mb-1">
                Enter search terms you feel your buyers will use when looking
                for your service.
              </div>
              <div className="relative w-full flex items-center gap-x-2 border-white border-[1px] rounded-2xl p-2 flex-wrap">
                {/* Displaying the tags */}
                {Tags &&
                  Tags.map((tg) => (
                    <div className="w-fit h-fit bg-transparent text-white bg-gray-500 border-white border-[1px] rounded-xl p-4 pt-6 pr-8 text-[1rem] font-poppins outline-none resize-none relative">
                      <div
                        className="flex justify-center items-center w-5 h-5 rounded-full bg-transparent text-white border-2 border-white absolute top-1 right-1 hover:bg-gradient-to-l hover:from-main hover:to-sec font-alegreya text-[.8rem] cursor-pointer transition-all ease-in-out duration-700"
                        id={tg}
                        onClick={(e) => {
                          setTags(Tags.filter((dt) => dt !== e.target.id));
                        }}
                      >
                        X
                      </div>
                      {tg}
                    </div>
                  ))}
                {Tags.length < maxTags && (
                  <input
                    type="text"
                    className="w-full max-w-[300px] h-fit bg-transparent text-white border-none rounded-2xl p-4 text-[1rem] font-poppins outline-none resize-none"
                    placeholder="Lorem Ipsum ..."
                    minLength={100}
                    maxLength={maxLength}
                    value={NewTag}
                    onChange={(e) => {
                      setNewTag(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && NewTag.trim() !== "") {
                        // Prevent default behavior
                        e.preventDefault();

                        // Only add the tag if we haven't exceeded the maximum number of tags
                        if (Tags.length < maxTags) {
                          // Add the new tag to the Tags state and reset the input field
                          setTags([...Tags, NewTag.trim()]);
                          setNewTag(""); // Clear the input field
                        }
                      }
                    }} // Detect "Enter" key press
                  />
                )}
                {/* Character counter in the bottom-right corner */}
                <div className="absolute bottom-3 right-3 text-white text-[.7rem]">
                  05 Tags Maximum
                </div>
              </div>
            </div>
            <div className="w-[80%] py-8 px-3">
              <div className="w-[300px]">
                <GradientBtn
                  title={"Continue"}
                  onClick={() => {
                    const gigInfo = {
                      title: text,
                      cat: "test cat",
                      subcat: "test sub cat",
                      servicetags: checked,
                    };
                    localStorage.setItem("gig-info", JSON.stringify(gigInfo));
                    navigate("/seller/create-new-gig/2");
                  }}
                />
              </div>
            </div>
          </>
        ) : currentStep === 2 ? (
          <>
            {/* step 2 */}
            <div className="flex-col w-[80%] mt-7">
              <div className="font-semibold text-xl">Advertisementiiiiiiiiii</div>
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
                    Responsive Desigkdsjbfhsdfhjdsfjh
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
                  {/* <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={packages["basic"].features.wireframe}
                          onChange={() =>
                            handleFeatureChange("basic", "wireframe")
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
                          checked={packages["basic"].features.prototype}
                          onChange={() =>
                            handleFeatureChange("basic", "prototype")
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
                  </div> */}
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
                          checked={
                            packages["standard"].features.responsiveDesign
                          }
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
                          checked={
                            packages["premium"].features.responsiveDesign
                          }
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
          </>
        ) : currentStep === 3 ? (
          <>
            {/* step 3 */}
            <div className="flex-col w-[80%] mt-7">
              <div className="font-semibold text-xl">Description</div>
              <div className="text-[1rem] font-normal w-[50%] mb-1">
                Briefly Describe your
              </div>
              <div className="relative w-full">
                <textarea
                  className="w-full bg-transparent text-white border-white border-[1px] rounded-2xl p-2 h-[30vh] text-[1rem] font-poppins outline-none mt-2 resize-none"
                  placeholder="Lorem Ipsum ..."
                  minLength={100}
                  maxLength={maxLength}
                  value={text}
                  onChange={handleChange}
                />
                {/* Character counter in the bottom-right corner */}
                <div className="absolute bottom-2 right-2 text-white text-[.7rem]">
                  {text.length}/{maxLength}
                </div>
              </div>
            </div>
            <div className="w-[80%] py-8 px-3">
              <div className="w-[300px]">
                <GradientBtn
                  title={"Continue"}
                  onClick={() => {
                    navigate("/seller/create-new-gig/4");
                  }}
                />
              </div>
            </div>
          </>
        ) : currentStep === 4 ? (
          <>
            {/* step 4 */}
            <div className="flex-col w-[80%] mt-7">
              <div className="font-semibold text-xl mt-4">Requirement</div>
              <div className="text-[1rem] font-normal w-[50%] my-1">
                Write what did you ask fro your client?
              </div>
              <div className="relative w-full">
                <textarea
                  className="w-full bg-transparent text-white border-white border-[1px] rounded-2xl p-2 h-[30vh] text-[1rem] font-poppins outline-none mt-2 resize-none"
                  placeholder="Lorem Ipsum ..."
                  minLength={100}
                  maxLength={maxLength}
                  value={text}
                  onChange={handleChange}
                />
                {/* Character counter in the bottom-right corner */}
                <div className="absolute bottom-2 right-2 text-white text-[.7rem]">
                  {text.length}/{maxLength}
                </div>
              </div>
            </div>
            <div className="w-[80%] py-8 px-3">
              <div className="w-[300px]">
                <GradientBtn
                  title={"Continue"}
                  onClick={() => {
                    navigate("/seller/create-new-gig/5");
                  }}
                />
              </div>
            </div>
          </>
        ) : currentStep === 5 ? (
          <>
            {/* step 5 */}
            <div className="flex-col w-[80%] mt-7">
              <div className="font-semibold text-xl">
                Showcase Your Services In A Gig Gallery
              </div>
              <div className="text-[.7rem] font-thin w-[50%] mb-1">
                Images (up to 02)
              </div>
              <div className="relative w-[90%] py-4 flex gap-x-3 justify-between">
                <DragNDrop />
                <DragNDrop />
                <DragNDrop />
              </div>
            </div>
            <div className="w-[80%] py-8 px-3">
              <div className="w-[300px]">
                <GradientBtn
                  title={"Continue"}
                  onClick={() => {
                    navigate("/seller/create-new-gig/6");
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          currentStep === 6 && (
            <>
              {/* step 6 */}
              <div className="flex-col w-[80%] mt-7 font-poppins">
                <div className="font-semibold text-xl">Gig Link</div>
                <div className="text-[1rem] font-normal w-[50%] mt-5">
                  https:www.fiver.com/user/sdf/ertfdsa/asdftygfds/asdfg
                </div>
                <div className="relative w-full flex gap-x-3 text-3xl my-5">
                  <FaXTwitter className="bg-black p-2 rounded-lg" />
                  <RiLinkedinFill className="bg-[#6563FF] p-2 rounded-lg" />
                  <FaFacebookF className="bg-[#1976D2] p-2 rounded-lg" />
                </div>
              </div>
              <div className="w-[80%] py-8 px-3 flex">
                <div className="w-[300px]">
                  <button
                    className="px-4 py-3 font-poppins text-white w-[90%] font-normal text-[1rem] rounded-lg bg-transparent border-[1px] border-white"
                    onClick={() => {}}
                  >
                    Previous
                  </button>
                </div>
                <div className="w-[300px]">
                  <GradientBtn
                    title={"Continue"}
                    onClick={() => {
                      navigate("/seller/products");
                    }}
                  />
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default CreateNewGig;
