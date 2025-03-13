import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import DragNDrop from "../Inputs/DragNDrop";
import { AddNewServiceApiStep4 } from "../../Api_Requests/Api_Requests";
import { addGig } from "../../store/Slices/gigslice";
import { resetGigData } from "../../store/Slices/allGigSlice";

const Gallery = ({ setActiveStep }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const gigId = useSelector((state) => state?.gig?.gigId);
  const dispatch = useDispatch();

  const [visibleInputs, setVisibleInputs] = useState([1]);
  const onSubmit = async (data) => {
    try {
      if (!data[`file${visibleInputs[0]}`]) {
        toast.error("At least one image is required");
        return;
      }
      if (!gigId) {
        throw new Error("No gig Id");
      }

      const formData = new FormData();
      visibleInputs?.forEach((num) => {
        if (data[`file${num}`]) {
          formData.append("servicesImages", data[`file${num}`]);
        }
      });

      setLoading(true);
      const response = await AddNewServiceApiStep4(formData, gigId);
      setLoading(false);

      if (response.status === 200) {
        dispatch(addGig({ gig: response?.data?.data }));
        toast.success("Gig ceated successfully");
        dispatch(resetGigData());

        setActiveStep((prev) => prev + 1);
      } else {
        throw new Error("Request Error");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const addMoreInputs = () => {
    const newInputNumber = visibleInputs[visibleInputs.length - 1] + 1;
    setVisibleInputs([...visibleInputs, newInputNumber]);
  };

  const removeInput = (num) => {
    if (visibleInputs.length > 1) {
      setVisibleInputs(visibleInputs.filter((inputNum) => inputNum !== num));
    }
  };
  const imageExtensionRegex = /\.(jpe?g|png|gif|bmp|webp|svg)$/i;

  const handleFileChange = (input, onChange, setError, fieldName) => {
    let files = [];
    // Determine if input is an event (with target.files) or an array/object
    if (input && input.target && input.target.files) {
      files = Array.from(input.target.files);
    } else if (Array.isArray(input)) {
      files = input;
    } else if (input) {
      files = [input];
    }

    // Filter files by checking MIME type first; if missing, fallback to extension
    const validFiles = files.filter((file) => {
      if (file.type) {
        return file.type.startsWith("image/");
      }
      return imageExtensionRegex.test(file.name);
    });

    if (validFiles.length === 0) {
      // No valid image files found; set an error.
      toast.error("Only image files are allowed.");
      setSelectedFile(null);
      // Clear the file input if possible
      if (input && input.target) input.target.value = null;
    } else {
      // Clear any previous errors and pass only the first valid file (an object)
      setError(fieldName, null);
      onChange(validFiles[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="w-full flex flex-col text-white justify-center items-center px-4 sm:px-6"
    >
      <div className="flex flex-col w-full md:w-[80%] mt-7">
        <div className="font-semibold text-2xl md:text-3xl text-center md:text-left">
          Showcase Your Services In A Gig Gallery
        </div>
        <div className="text-sm md:text-base font-thin w-full md:w-[70%] mb-1 text-center md:text-left"></div>

        {/* File Upload Inputs */}
        <div className="relative w-full md:w-[90%] self-center py-4 flex flex-wrap gap-2 sm:gap-6 justify-center text-black/60 font-semibold">
          {visibleInputs.map((num) => (
            <div key={num} className="relative">
              <Controller
                name={`file${num}`}
                control={control}
                rules={{
                  // Validate that the provided file is an image.
                  validate: (file) => {
                    if (file) {
                      if (file.type) {
                        return (
                          file.type.startsWith("image/") ||
                          "Only image files are allowed."
                        );
                      }
                      return (
                        imageExtensionRegex.test(file.name) ||
                        "Only image files are allowed."
                      );
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange, ...field }, fieldState }) => (
                  <DragNDrop
                    {...field}
                    error={
                      fieldState.error?.message || errors[`file${num}`]?.message
                    }
                    setError={setError}
                    id={`file${num}`}
                    accept="image/*"
                    // Use the custom handler to process file input
                    onChange={(input) =>
                      handleFileChange(input, onChange, setError, `file${num}`)
                    }
                    imageFile={true}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                )}
              />
              {/* X Button to Remove Input */}
              {visibleInputs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInput(num)}
                  className="absolute top-0 right-0 text-red-500 text-lg font-bold -mt-2 -mr-2 bg-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>

        {/* "Add More" Button */}
        <button
          type="button"
          onClick={addMoreInputs}
          className="mt-2 px-4 py-2 bg-white/10 w-[24%] self-center text-white text-md rounded-md hover:bg-white/20"
        >
          + Add More
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full md:w-[80%] py-8 px-3 flex flex-wrap gap-4 justify-center">
        <div className="w-full sm:w-[300px]">
          <button
            type="button"
            onClick={() => setActiveStep((prev) => prev - 1)}
            className="p-4 max-w-96 capitalize border border-white/50 font-normal text-sm md:text-xl w-full rounded-md hover:bg-white/10"
          >
            Previous
          </button>
        </div>
        <div className="w-full sm:w-[300px]">
          <button
            type="submit"
            className="p-4 max-w-96 bg-gradient-to-l capitalize from-[#DE0588] to-[#460BCB] font-normal text-sm md:text-xl w-full rounded-md hover:opacity-90"
          >
            {loading ? "Uploading..." : "Continue"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Gallery;
