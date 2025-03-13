import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import DOMPurify from "dompurify";
import colorPicker from "../../assets/icons/color_picker.png";
import {
  AddNewServiceApiStep1,
  getCategories,
  getSubCategories,
} from "../../Api_Requests/Api_Requests";
import toast from "react-hot-toast";
import { setId } from "../../store/Slices/gigslice";
import { useDispatch, useSelector } from "react-redux";
import allGigSlice, { setStepData } from "../../store/Slices/allGigSlice";

const Overview = ({ setActiveStep }) => {
  const colorRef = useRef();
  const descriptionRef = useRef(null);
  const [text, setText] = useState("");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [length, setLength] = useState(0);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [colorActive, setColorActive] = useState(false);
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();
  const maxLength = 500;
  const defaultStep1Data = {
    title: "",
    category: "",
    subCategory: "",
    description: "",
    serviceTags: "",
  };
  const step1Data = useSelector((state) => state?.allGigs?.step1) || defaultStep1Data;

  useEffect(() => {
    if (descriptionRef.current && step1Data?.description) {
      descriptionRef.current.innerHTML = step1Data.description;
      setContent(step1Data.description);
      setLength(descriptionRef.current.innerText.length);

      if (step1Data.textFormatting) {
        const { color, bold, italic, underline } = step1Data.textFormatting;

        if (color) {
          setColorActive(true);
          descriptionRef.current.style.color = color;
          if (colorRef.current) {
            colorRef.current.value = color;
          }
        }

        setBold(bold);
        setItalic(italic);
        setUnderline(underline);
      }
    }
  }, [step1Data]);

  const handleInput = (e) => {
    const editableDiv = e.target;
    const currentHTML = editableDiv.innerHTML;
    const plainText = editableDiv.innerText;

    if (plainText.length > maxLength) {
      editableDiv.innerHTML = content;
      setErrorMessage(`Maximum characters limit reached.`);
      return;
    } else if (plainText.length < maxLength) {
      setErrorMessage("");
    }

    setContent(currentHTML);
    setLength(plainText.length);
    setValue("description", plainText, { shouldValidate: true });
    trigger("description");
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (command === "bold") {
      setBold(!bold);
    } else if (command === "italic") {
      setItalic(!italic);
    } else if (command === "underline") {
      setUnderline(!underline);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      subCategory: "",
      metaData: {
        appTool: [],
        designTool: [],
        device: [],
      },
      serviceTags: "",
      description: "",
    },
  });

  useEffect(() => {
    if (touched) {
      trigger("serviceTags");
    }
  }, [keywords, trigger, touched]);

  const title = watch("serviceTags");

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await getSubCategories(categoryId);
      if (response.status === 200) {
        setSubcategories(response.data.subcategories.subcategories);
      }
    } catch (error) {
      console.error("Failed to fetch subcategories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (step1Data?.category && categories.length > 0) {
      const selectedCategory = categories.find(
        (cat) => cat.category === step1Data.category
      );
      if (selectedCategory) {
        fetchSubcategories(selectedCategory._id);
      }
    }
  }, [step1Data, categories]);

  useEffect(() => {
    if (step1Data !== defaultStep1Data) {
      reset(step1Data);
    }
  }, [step1Data, reset]);

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && inputValue.trim() !== "") {
      e.preventDefault();
      const newKeyword = inputValue.trim();
      if (keywords.length >= 5) {
        toast.error("Only 5 keywords are allowed!");
        return;
      }

      if (keywords.some((keyword) => keyword.toLowerCase() === newKeyword.toLowerCase())) {
        toast.error("Keyword already exists!");
        return;
      }

      const updatedKeywords = [...keywords, newKeyword];
      setKeywords(updatedKeywords);
      setValue("serviceTags", updatedKeywords.join(","));
      setInputValue("");
    }
  };

  const removeKeyword = (index) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(updatedKeywords);
    setValue("serviceTags", updatedKeywords.join(","));
  };

  const onSubmit = async (payload) => {
    payload.serviceTags = getValues("serviceTags")?.split(",")?.map((tag) => tag.trim());

    // Store the HTML content of the description
    payload.description = descriptionRef.current.innerHTML;

    // Store the text formatting state
    payload.textFormatting = {
        color: descriptionRef.current.style.color,
        bold,
        italic,
        underline,
    };

    try {
        setLoading(true);
        const response = await AddNewServiceApiStep1(payload);
        if (response.status === 200) {
            const gigId = response.data.data._id;
            setLoading(false);
            dispatch(setId({ id: gigId }));
            dispatch(setStepData({ step: 'step1', data: payload })); // Save the payload with HTML content
            setActiveStep((prev) => prev + 1);
            toast.success("Details Submitted Successfully!");
        } else {
            throw new Error("Something went wrong!");
        }
    } catch (error) {
        if (error.status === 400) {
            const formattedMessage = error.response.data.message.replace(/"/g, "");
            const capitalizedMessage = formattedMessage.charAt(0).toUpperCase() + formattedMessage.slice(1);
            toast.error(capitalizedMessage);
        }
        setLoading(false);
    }
};

  const metadataCategories = [
    {
      title: "App Type",
      subtitle: "Select The Types Of Applications You Specialize In.",
      options: ["Business", "Books", "Events", "Education", "Games"],
      field: "appTool",
    },
    {
      title: "Design Tool",
      subtitle: "Select The Design Tools You Deliver In Your Gig Or Extras.",
      options: ["Marvel", "Figma", "Adobe XD", "Fluid", "Zeplin"],
      field: "designTool",
    },
    {
      title: "Device",
      subtitle: "What Mobile Do You Design For?",
      options: ["Events", "Education", "Business", "Books", "Games"],
      field: "device",
    },
  ];

  useEffect(() => {
    if (step1Data?.serviceTags && step1Data.serviceTags.length) {
      const tagsString = Array.isArray(step1Data.serviceTags)
        ? step1Data.serviceTags.join(",")
        : step1Data.serviceTags;
      const tagsArray = typeof tagsString === "string" && tagsString !== ""
        ? tagsString.split(",")
        : [];
      setKeywords(tagsArray);
      setInputValue("");
      setValue("serviceTags", tagsString);
    }
  }, [step1Data, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-24 flex flex-col text-white mt-10"
    >
      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-3xl font-semibold">Gig Title</h2>
        <span className="text-lg font-normal text-white/50">
          As your Gig storefront, your title is the most important place to
          include keywords that buyers would likely use to search for a service
          like yours
        </span>
        <textarea
          {...register("title", { required: "Gig Title is required." })}
          className="w-full p-4 bg-transparent border-2 border-white/50 text-white rounded-3xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
          rows="5"
          maxLength="100"
          placeholder="Gig Title..."
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-3xl font-semibold">Category</h2>
        <span className="text-lg font-normal text-white/50">
          Choose the Category and Sub-Category most suitable for your Gig
        </span>
        <div className="flex gap-8 mt-3 flex-wrap">
          <div className="flex flex-col min-w-72">
            <Controller
              name="category"
              control={control}
              defaultValue={step1Data?.category || ""}
              rules={{ required: "Category is required." }}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    const selectedCategoryId =
                      e.target.options[e.target.selectedIndex].dataset.id;
                    field.onChange(e.target.value);
                    clearErrors("category");
                    fetchSubcategories(selectedCategoryId);
                  }}
                  className="w-full p-4 bg-transparent border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none border-white/50"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.category} data-id={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.category && (
              <span className="text-red-500 mt-1">{errors.category.message}</span>
            )}
          </div>
          <div className="flex flex-col min-w-72">
            <Controller
              name="subcategory"
              control={control}
              defaultValue={step1Data?.subCategory || ""}
              rules={{ required: "Subcategory is required." }}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    clearErrors("subcategory");
                  }}
                  className="w-full p-4 bg-transparent border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none border-white/50"
                >
                  <option value="" disabled>
                    Select Sub Category
                  </option>
                  {subcategories.map((subcat, index) => (
                    <option key={index} value={subcat.name}>
                      {subcat.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.subCategory && (
              <span className="text-red-500 mt-1">{errors.subCategory.message}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-3xl font-semibold">Gig Metadata</h2>
        <div className="mt-3 flex flex-wrap justify-between gap-4">
          {metadataCategories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-lg border-2 border-white/50 flex-1 min-w-60"
            >
              <h3 className="text-lg font-semibold mb-2 text-white/80">
                {category.title}
              </h3>
              <p className="text-sm mb-4 text-white/50">{category.subtitle}</p>
              <div className="grid grid-cols-2 gap-2">
                {category.options.map((option) => (
                  <Controller
                    key={option}
                    name={`metaData.${category.field}`}
                    control={control}
                    render={({ field }) => (
                      <label className="inline-flex items-center relative">
                        <input
                          type="checkbox"
                          value={option}
                          onChange={(e) => {
                            const valueArray = field.value || [];
                            field.onChange(
                              e.target.checked
                                ? [...valueArray, option]
                                : valueArray.filter((val) => val !== option)
                            );
                          }}
                          checked={field.value?.includes(option) || false}
                          className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-[#7F00FF] cursor-pointer"
                        />
                        <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                          ✓
                        </span>
                        <span className="ml-2">{option}</span>
                      </label>
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 my-5">
        <div className="font-semibold text-3xl">Description</div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-normal text-white/50">
            Briefly Describe your Gig
          </span>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => execCommand("bold")}
              className={`p-2 w-10 aspect-square text-xl font-bold ${bold ? "bg-white/10 rounded-md" : ""}`}
            >
              B
            </button>
            <button
              type="button"
              onClick={() => execCommand("italic")}
              className={`p-2 w-10 aspect-square text-xl italic font-serif ${italic ? "bg-white/10 rounded-md" : ""}`}
            >
              I
            </button>
            <button
              type="button"
              onClick={() => {
                if (colorActive) {
                  setColorActive(false);
                  colorRef.current.value = "";
                } else {
                  setColorActive(true);
                  colorRef.current.click();
                }
              }}
              className={`flex justify-center items-center w-10 aspect-square ${colorActive ? "bg-white/10 rounded-md" : ""}`}
            >
              <img src={colorPicker} height={25} width={25} alt="color picker" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("underline")}
              className={`p-2 w-10 aspect-square text-xl underline ${underline ? "bg-white/10 rounded-md" : ""}`}
            >
              U
            </button>
           <input
  type="color"
  className="invisible w-0"
  ref={colorRef}
  onChange={(e) => {
    const chosenColor = e.target.value;
    const selection = window.getSelection();
    // Check if any text is selected
    if (selection && selection.toString() !== "") {
      // Apply color only to the selected text
      document.execCommand("foreColor", false, chosenColor);
    } else {
      // No selection: update the entire contentEditable element's color
      const editableDiv = document.querySelector("[contentEditable]");
      if (editableDiv) {
        editableDiv.style.color = chosenColor;
      }
    }
    // Update your form state if needed
    const editableDiv = document.querySelector("[contentEditable]");
    if (editableDiv) {
      setValue("description", editableDiv.innerText, { shouldValidate: true });
      trigger("description");
    }
  }}
/>

<button
  type="button"
  onClick={() => {
    const editableDiv = document.querySelector("[contentEditable]");
    if (editableDiv) {
      const selection = window.getSelection();
      if (selection && selection.toString() !== "") {
        // Reset color for selected text
        document.execCommand("foreColor", false, "#fff");
      } else {
        // Reset color for the entire content
        editableDiv.style.color = "#fff";
      }
      // Update the form state
      const plainText = editableDiv.innerText;
      setContent(plainText);
      setLength(plainText.length);
      setValue("description", plainText, { shouldValidate: true });
      trigger("description");
    }
  }}
  className="p-2 w-12 aspect-square bg-red-500 text-xs text-white rounded-md hover:bg-red-600"
>
  Reset
</button>
          </div>
        </div>
        <div className="relative w-full">
          <Controller
            name="description"
            control={control}
            defaultValue={step1Data?.description || ""}
            rules={{
              required: "Description is required.",
              validate: (value) => value.trim() !== "" || "Description is required.",
            }}
            render={({ field: { onChange, value, ref } }) => (
              <div
                contentEditable
                ref={(el) => {
                  descriptionRef.current = el;
                  if (typeof ref === "function") {
                    ref(el);
                  } else if (ref) {
                    ref.current = el;
                  }
                }}
                onInput={(e) => {
                  const text = e.target.innerText;
                  handleInput(e);
                  onChange(text);
                }}
                className="w-full p-4 bg-transparent border-2 mb-1 border-white/50 text-white rounded-3xl focus:ring-2 focus:ring-purple-500 focus:outline-none min-h-[100px]"
                placeholder="Gig Description ..."
                style={{ whiteSpace: "pre-wrap" }}
              ></div>
            )}
          />
          {errorMessage && <span className="absolute text-red-500 -bottom-7">{errorMessage}</span>}
          {errors.description && (
            <span className="text-red-500 ml-1">{errors.description.message}</span>
          )}
          <div className={`absolute right-4 text-white text-[.7rem] transition-all ${errors.description ? "bottom-8" : "bottom-5"}`}>
            {length}/{maxLength}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-3xl font-semibold">Keywords</h2>
        <div className="w-full p-4 bg-transparent border-2 border-white/50 text-white rounded-xl focus-within:ring-2 focus-within:ring-purple-500 flex flex-wrap items-center gap-2 min-h-[50px]">
          {keywords.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="ml-2 text-white font-bold"
              >
                ×
              </button>
            </span>
          ))}
          <input
            className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
            placeholder={keywords.length === 0 ? "Enter up to 5 keywords" : ""}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (!touched) setTouched(true);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <input type="hidden" value={keywords.join(",")} />
        {errors.serviceTags && (
          <span className="text-red-500">{errors.serviceTags.message}</span>
        )}
      </div>

      <div className="my-3">
        <button
          type="submit"
          className="p-4 max-w-96 bg-gradient-to-l capitalize from-[#DE0588] to-[#460BCB] font-normal text-xl w-full rounded-md"
        >
          {loading ? "Please wait!" : "Continue"}
        </button>
      </div>
    </form>
  );
};

export default Overview;
