import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import SelectComp from "../../pages/CreateNewGig/SelectComp";
import { AddNewServiceApiStep2 } from "../../Api_Requests/Api_Requests";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setStepData } from "../../store/Slices/allGigSlice";
import defaultStep2Data from "constants";

const Pricing = ({ setActiveStep }) => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    basic: {
      name: false,
      description: false,
      deliveryTime: false,
    },
    standard: {
      name: false,
      description: false,
      deliveryTime: false,
    },
    premium: {
      name: false,
      description: false,
      deliveryTime: false,
    }
  },
  );

  const { gigId } = useSelector((state) => state?.gig);
  const dispatch = useDispatch()

  const step2Data = useSelector((state) => state?.allGigs?.step2) || defaultStep2Data

  const [packages, setPackages] = useState({
    basic: {
      name: "",
      description: "",
      deliveryTime: "",
      revisions: 0,
      screens: 0,
      designasset: 0,
      price: 5,
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
      revisions: 0,
      screens: 0,
      designasset: 0,
      price: 10,
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
      revisions: 0,
      screens: 0,
      designasset: 0,
      price: 20,
      features: {
        responsiveDesign: false,
        wireframe: false,
        prototype: false,
        sourceFile: false,
      },
    },
  });

  useEffect(() => {
    if (step2Data) {
      setPackages({
        basic: {
          ...packages.basic,
          name: step2Data?.basic?.packageName,
          description: step2Data?.basic?.packageDetails,
          deliveryTime: step2Data?.basic?.delivery,
        },
        standard: {
          ...packages.standard,
          name: step2Data?.standard?.packageName,
          description: step2Data?.standard?.packageDetails,
          deliveryTime: step2Data?.standard?.delivery,
        },
        premium: {
          ...packages.premium,
          name: step2Data?.premium?.packageName,
          description: step2Data?.premium?.packageDetails,
          deliveryTime: step2Data?.premium?.delivery,
        },
      });
    }
  }, [step2Data]);

  const handleInputChange = (e, packageType) => {
    setPackages({
      ...packages,
      [packageType]: {
        ...packages[packageType],
        [e.target.name]: e.target.value,
      },
    });
  
  };

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = ['name', 'description', 'deliveryTime'];
    const packageTypes = ['basic', 'standard', 'premium'];

    const newErrors = { ...errors };

    packageTypes.forEach((type) => {
      newErrors[type] = { ...newErrors[type] };
      fields.forEach((field) => {
        newErrors[type][field] = !packages?.[type]?.[field];
      });
    });

    setErrors(newErrors);
   
    const payload = {
      basic: {
        packageName: packages.basic.name,
        packageDetails: packages.basic.description,
        delivery: packages.basic.deliveryTime,
        totalScreen: packages.basic.screens,
        prototype: packages.basic.features.prototype,
        revisions: packages.basic.revisions,
        price: packages.basic.price,
      },
      standard: {
        packageName: packages.standard.name,
        packageDetails: packages.standard.description,
        delivery: packages.standard.deliveryTime,
        totalScreen: packages.standard.screens,
        prototype: packages.standard.features.prototype,
        revisions: packages.standard.revisions,
        price: packages.standard.price,
      },
      premium: {
        packageName: packages.premium.name,
        packageDetails: packages.premium.description,
        delivery: packages.premium.deliveryTime,
        totalScreen: packages.premium.screens,
        prototype: packages.premium.features.prototype,
        revisions: packages.premium.revisions,
        price: packages.premium.price,
      },
    };
    try {
      setLoading(true);
      if (!gigId) {
        throw new Error("Something went wrong!");
      }

      const response = await AddNewServiceApiStep2(payload, gigId);
      if (response.status === 200) {
        toast.success("Details Submitted Successfully!");
        setLoading(false);
        dispatch(setStepData({ step: "step2", data: payload }));
        setActiveStep((prev) => prev + 1);
      } else {
        console.error("Failed to submit gig");
      }
    } catch (error) {
      setLoading(false);

      if (error.response?.status === 400) {

        const errorMessages = [...new Set(error.response?.data?.errors)];

        if (Array.isArray(errorMessages) && errorMessages.length > 0) {
          const cleanedMessages = errorMessages.map((msg) =>
            msg.replace(/( is required\.| are required\.)/i, "")
          );

          const formattedMessage =
            cleanedMessages.length === 1
              ? `${cleanedMessages[0]} is required.`
              : `${cleanedMessages.slice(0, -1).join(", ")} and ${cleanedMessages[cleanedMessages.length - 1]
              } are required.`;

          toast.error(formattedMessage);
        } else {
          toast.error(
            error.response?.data?.message || "Validation error occurred."
          );
        }
      } else if (error.response?.status === 409) {
        toast.error(
          error.response?.data?.message || "This entry already exists."
        );
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };
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
    <form onSubmit={handleSubmit} className="">
      <div className=" w-full flex flex-col  justify-center items-center text-white">

        <div className="flex-col w-[80%] mt-7">
          <div className="font-semibold text-3xl">Advertisement</div>
          <div className="font-normal text-[1rem]">Package</div>
        </div>
        <div className="flex relative w-[95%]  ml-[12rem] mt-7">
          <div className="flex bg-[#FFFFFF33] h-full w-fit">
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
                name="name"
                defaultValue={step2Data?.basic?.packageName || ''}
                id=""
                onChange={(e) => {
                  handleInputChange(e, "basic");
                }}
                className={`p-2 border-[2px] h-[90px] w-full bg-transparent ${errors?.basic?.name ? "border-red-500" : "border-white"
                  }`}
                placeholder="Your Package name"
              />
              <input
                type="text"
                name="description"
                value={packages?.basic?.description || ""}

                id=""
                onChange={(e) => {
                  handleInputChange(e, "basic");
                }}
                className={`text-[1rem] font-normal flex-wrap flex p-2 border-[2px] ${errors.basic.description ? 'border-red-500' : 'border-white'} h-[90px] justify-start items-center bg-transparent w-full`}
                placeholder="Describe the details you offering ..."
              />
              <div className="w-full h-[90px] flex flex-col justify-center items-center">
                <select
                  id=""
                  name="deliveryTime"
                  value={packages.basic.deliveryTime || ""}
                  onChange={(e) => {
                    handleInputChange(e, "basic");
                  }}
                  className={`text-[1rem] font-normal flex-wrap flex p-2 border-[2px] ${
                    errors.basic?.deliveryTime ? 'border-red-500' : 'border-white'
                  } h-full justify-start items-center bg-transparent w-full hover:bg-white hover:text-black transition-all`}
                                  // defaultValue={"1-3 Days"}
                >
                  <option className="text-black" value="">
                    Select Delivery Time
                  </option>
                  <option className="text-black" value="1-3 Days">
                    1-3 Days
                  </option>
                  <option className="text-black" value="4-7 Days">
                    4-7 Days
                  </option>
                  <option className="text-black" value="8-14 Days">
                    8-14 Days
                  </option>
                  <option className="text-black" value="15+ Days">
                    15+ Days
                  </option>
                </select>
              </div>
              <input
                type="number"
                name="screens"
                min={0}
                id=""
                onChange={(e) => {
                  handleInputChange(e, "basic");
                }}
                value={packages.basic.screens}
            className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full "
              />
              <div className="w-full h-[90px] flex flex-col justify-center items-center">
                <select
                  name="designasset"
                  value={packages.basic.designasset || ""}
                  onChange={(e) => {
                    handleInputChange(e, "basic");
                  }}
                  id=""
                  className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-full justify-start items-center bg-transparent w-full hover:bg-white hover:text-black transition-all"
                // defaultValue={"1-3 Days"}
                >
                  <option className="text-black" value={0}>
                    No. of Assets
                  </option>
                  <option className="text-black" value={1}>
                    1
                  </option>
                  <option className="text-black" value={2}>
                    2
                  </option>
                  <option className="text-black" value={3}>
                    3
                  </option>
                  <option className="text-black" value={4}>
                    4
                  </option>
                  <option className="text-black" value={5}>
                    5
                  </option>
                  <option className="text-black" value={7}>
                    7
                  </option>
                  <option className="text-black" value={10}>
                    10
                  </option>
                </select>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("basic", "responsiveDesign");
                    }}
                    // onChange={() => toggleSelection(category.category, option)}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("basic", "wireframe");
                    }}
                    // onChange={() => toggleSelection(category.category, option)}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("basic", "prototype");
                    }}
                    // onChange={() => toggleSelection(category.category, option)}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>{" "}
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("basic", "sourceFile");
                    }}
                    // onChange={() => toggleSelection(category.category, option)}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="w-full h-[90px] flex flex-col justify-center items-center">
                <select
                  name="revisions"
                  value={packages.basic.revisions || ""}
                  onChange={(e) => {
                    handleInputChange(e, "basic");
                  }}
                  id=""
                  className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-full justify-start items-center bg-transparent w-full hover:bg-white hover:text-black transition-all"
                // defaultValue={"1-3 Days"}
                >
                  <option className="text-black" value="">
                    No. of Revisions
                  </option>
                  <option className="text-black" value="1">
                    1
                  </option>
                  <option className="text-black" value="3">
                    3
                  </option>
                  <option className="text-black" value="5">
                    5
                  </option>
                  <option className="text-black" value="7">
                    7
                  </option>
                  <option className="text-black" value="10">
                    10
                  </option>
                </select>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex border-white h-[90px] justify-start items-center">
                <input
                  type="number"
                  name="price"
                  value={packages.basic.price}
                  id=""
                  onChange={(e) => {
                    handleInputChange(e, "basic");
                  }}
                  min={5}
                  className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
                />
              </div>
            </div>
            <div className="w-[250px] font-poppins">
              <div className="text-xl font-semibold border-[1px] border-white py-5 text-center bg-[#FFFFFF80]">
                STANDARD
              </div>
              <input
                required
                defaultValue={step2Data?.standard?.packageName || ''}

                type="text"
                name="name"
                id=""
                onChange={(e) => {
                  handleInputChange(e, "standard");
                }}
                className={`p-2 border-[2px] h-[90px] w-full bg-transparent ${errors?.standard?.name ? "border-red-500" : "border-white"
                  }`}
                placeholder="Your Package name"
              />
              <input
                type="text"
                name="description"
                value={packages.standard.description || ""}

                id=""
                onChange={(e) => {
                  handleInputChange(e, "standard");
                }}
                className={`p-2 border-[2px] h-[90px] w-full bg-transparent ${errors?.standard?.description ? "border-red-500" : "border-white"
                  }`} placeholder="Describe the details you offering ..."
              />
              <div className="w-full h-[90px] flex flex-col justify-center items-center">
                <select
                  name="deliveryTime"
                  value={packages.standard.deliveryTime || ""}
                  onChange={(e) => {
                    handleInputChange(e, "standard");
                  }}
                  id=""
                  className={`text-[1rem] font-normal flex-wrap flex p-2 border-[2px] ${
                    errors?.standard?.deliveryTime ? 'border-red-500' : 'border-white'
                  } h-full justify-start items-center bg-transparent w-full hover:bg-white hover:text-black transition-all`}                // defaultValue={"1-3 Days"}
                >
                  <option className="text-black" value="">
                    Select Delivery Time
                  </option>
                  <option className="text-black" value="1-3 Days">
                    1-3 Days
                  </option>
                  <option className="text-black" value="4-7 Days">
                    4-7 Days
                  </option>
                  <option className="text-black" value="8-14 Days">
                    8-14 Days
                  </option>
                  <option className="text-black" value="15+ Days">
                    15+ Days
                  </option>
                </select>
              </div>

              <input
                type="number"
                name="screens"
                id=""
                value={packages.standard.screens}
                onChange={(e) => {
                  handleInputChange(e, "standard");
                }}
                min={0}
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
              />
              <div className="w-full h-[90px] flex flex-col justify-center items-center">
                <select
                  name="designasset"
                  value={packages.standard.designasset || ""}
                  onChange={(e) => {
                    handleInputChange(e, "standard");
                  }}
                  id=""
                  className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-full justify-start items-center bg-transparent w-full hover:bg-white hover:text-black transition-all"
                // defaultValue={"1-3 Days"}
                >
                  <option className="text-black" value={0}>
                    No. of Assets
                  </option>
                  <option className="text-black" value={1}>
                    1
                  </option>
                  <option className="text-black" value={2}>
                    2
                  </option>
                  <option className="text-black" value={3}>
                    3
                  </option>
                  <option className="text-black" value={4}>
                    4
                  </option>
                  <option className="text-black" value={5}>
                    5
                  </option>
                  <option className="text-black" value={7}>
                    7
                  </option>
                  <option className="text-black" value={10}>
                    10
                  </option>
                </select>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("standard", "responsiveDesign");
                    }}
                    // onChange={() => toggleSelection(category.category, option)}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("standard", "wireframe");
                    }}
                    // onChange={() => toggleSelection(category.category, option)}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("standard", "prototype");
                    }}
                    // onChange={() => toggleSelection(category.category, option)}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("standard", "sourceFile");
                    }}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="w-full h-[90px] flex flex-col justify-center items-center">
                <select
                  name="revisions"
                  value={packages.standard.revisions || ""}
                  onChange={(e) => {
                    handleInputChange(e, "standard");
                  }}
                  id=""
                  className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-full justify-start items-center bg-transparent w-full hover:bg-white hover:text-black transition-all"
                // defaultValue={"1-3 Days"}
                >
                  <option className="text-black" value="">
                    No. of Revisions
                  </option>
                  <option className="text-black" value="1">
                    1
                  </option>
                  <option className="text-black" value="3">
                    3
                  </option>
                  <option className="text-black" value="5">
                    5
                  </option>
                  <option className="text-black" value="7">
                    7
                  </option>
                  <option className="text-black" value="10">
                    10
                  </option>
                </select>
              </div>

              <div className="text-[1rem] font-normal flex-wrap flex border-white h-[90px] justify-start items-center">
                <input
                  type="number"
                  name="price"
                  value={packages.standard.price}
                  id=""
                  onChange={(e) => {
                    handleInputChange(e, "standard");
                  }}
                  min={10}
                  className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
                />
              </div>
            </div>
            <div className="w-[250px] font-poppins">
              <div className="text-xl font-semibold border-[1px] border-white py-5 text-center bg-[#FFFFFF80]">
                PREMIUM
              </div>
              <input
                defaultValue={step2Data?.premium?.packageName || ''}

                type="text"
                name="name"

                // value={packages.premium.name || ""}
                onChange={(e) => {
                  handleInputChange(e, "premium");
                }}
                id=""
                className={`p-2 border-[2px] h-[90px] w-full bg-transparent ${errors.premium?.name ? "border-red-500" : "border-white"
                  }`}
                placeholder="Your Package name"
              />
              <input
                type="text"
                name="description"
                value={packages.premium.description || ""}
                onChange={(e) => {
                  handleInputChange(e, "premium");
                }}
                id=""
                className={`p-2 border-[2px] h-[90px] w-full bg-transparent ${errors?.premium?.description ? "border-red-500" : "border-white"
                  }`}
                placeholder="Describe the details you offering ..."
              />
              <div className="w-full h-[90px] flex flex-col justify-center items-center">
                <select
                  name="deliveryTime"
                  value={packages.premium.deliveryTime || ""}
                  onChange={(e) => {
                    handleInputChange(e, "premium");
                  }}
                  id=""
                  className={`text-[1rem] font-normal flex-wrap flex p-2 border-[2px] ${
                    errors?.premium?.deliveryTime ? 'border-red-500' : 'border-white'
                  } h-full justify-start items-center bg-transparent w-full hover:bg-white hover:text-black transition-all`}                // defaultValue={"1-3 Days"}
                >
                  <option className="text-black" value="">
                    Select Delivery Time
                  </option>
                  <option className="text-black" value="1-3 Days">
                    1-3 Days
                  </option>
                  <option className="text-black" value="4-7 Days">
                    4-7 Days
                  </option>
                  <option className="text-black" value="8-14 Days">
                    8-14 Days
                  </option>
                  <option className="text-black" value="15+ Days">
                    15+ Days
                  </option>
                </select>
              </div>
              <input
                type="number"
                name="screens"
                min={0}
                onChange={(e) => {
                  handleInputChange(e, "premium");
                }}
                value={packages.premium.screens}
                className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
              />
              <div className="w-full h-[90px] flex flex-col justify-center items-center">
                <select
                  name="designasset"
                  value={packages.premium.designasset || ""}
                  onChange={(e) => {
                    handleInputChange(e, "premium");
                  }}
                  id=""
                  className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-full justify-start items-center bg-transparent w-full hover:bg-white hover:text-black transition-all"
                // defaultValue={"1-3 Days"}
                >
                  <option className="text-black" value={0}>
                    No. of Assets
                  </option>
                  <option className="text-black" value={1}>
                    1
                  </option>
                  <option className="text-black" value={2}>
                    2
                  </option>
                  <option className="text-black" value={3}>
                    3
                  </option>
                  <option className="text-black" value={4}>
                    4
                  </option>
                  <option className="text-black" value={5}>
                    5
                  </option>
                  <option className="text-black" value={7}>
                    7
                  </option>
                  <option className="text-black" value={10}>
                    10
                  </option>
                </select>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("premium", "responsiveDesign");
                    }}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("premium", "wireframe");
                    }}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("premium", "prototype");
                    }}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-center items-center">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleFeatureChange("premium", "sourceFile");
                    }}
                    className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF]"
                  />
                  <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                    ✓
                  </span>
                </label>
              </div>
              <div className="w-full h-[90px] flex flex-col justify-center items-center">
                <select
                  name="revisions"
                  value={packages.premium.revisions || ""}
                  onChange={(e) => {
                    handleInputChange(e, "premium");
                  }}
                  id=""
                  className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-full justify-start items-center bg-transparent w-full hover:bg-white hover:text-black transition-all"
                // defaultValue={"1-3 Days"}
                >
                  <option className="text-black" value="">
                    No. of Revisions
                  </option>
                  <option className="text-black" value="1">
                    1
                  </option>
                  <option className="text-black" value="3">
                    3
                  </option>
                  <option className="text-black" value="5">
                    5
                  </option>
                  <option className="text-black" value="7">
                    7
                  </option>
                  <option className="text-black" value="10">
                    10
                  </option>
                </select>
              </div>

              <div className="text-[1rem] font-normal flex-wrap flex border-white h-[90px] justify-start items-center">
                <input
                  type="number"
                  name="price"
                  onChange={(e) => {
                    handleInputChange(e, "premium");
                  }}
                  id=""
                  value={packages.premium.price}
                  min={20}
                  className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[90px] justify-start items-center bg-transparent w-full"
                />
              </div>
            </div>
          </div>

          <div className="max-w-[300px] ml-16 -mt-4 ">
          <div className="bg-[#FFFFFF4A] sticky top-[15rem] mt-5 w-full min-h-[45vh] mr-5 rounded-lg">
              <div className="flex">
                {Object.keys(packages).map((plan) => (
                  <button
                    type="button"
                    key={plan}
                    className={`w-1/3 hover:bg-white/60 px-4 py-3 
          ${selectedPlan === plan
                        ? "bg-white/60 border-b-2 border-b-white/60"
                        : "bg-slate-200/20"
                      } 
          ${plan === "basic" ? "rounded-tl-lg " : ""} 
          ${plan === "premium" ? "rounded-tr-lg" : ""}`}
                    onClick={() => handlePlanClick(plan)}
                  >
                    <span className="text-white text-sm font-bold">
                      {plan.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>

              {/* Package details section */}
              <div className=" flex flex-col gap-y-3 py-3 px-3 text-white">
                <h1 className="text-xl font-bold">
                  ${packages[selectedPlan]?.price}{" "}
                  {/* Dynamically display price */}
                </h1>
                <h3 className="text-lg font-semibold break-words">
                  {packages[selectedPlan]?.name}{" "}
                  {/* Show package name dynamically */}
                </h3>
                <ul className="flex flex-col gap-y-3">
                  <li>
                  <strong>Delivery time: </strong>{" "}
                    {packages[selectedPlan]?.deliveryTime || "N/A"}
                  </li>
                  <li>
                    <strong>Revisions:</strong>{" "}
                    {packages[selectedPlan]?.revisions}
                  </li>
                  <li>
                    <strong>Screens:</strong> {packages[selectedPlan]?.screens}
                  </li>
                  <li className="break-words">
                    <strong>description:</strong>{" "}
                    {packages[selectedPlan]?.description}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] py-8 px-3 flex gap-4">
          <div className="w-[300px]">
            <button
              onClick={() => setActiveStep((prev) => prev - 1)}
              className="p-4 max-w-96 capitalize border border-white/50 font-normal text-xl w-full rounded-md"
            >
              previous
            </button>
          </div>
          <div className="w-[300px]">
            <button
              onClick={handleSubmit}
              className="p-4 max-w-96 bg-gradient-to-l capitalize from-[#DE0588] to-[#460BCB] font-normal text-xl w-full rounded-md"
            >
              {loading ? "Please wait!" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Pricing;
