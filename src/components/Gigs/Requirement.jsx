import { useFieldArray, useForm } from "react-hook-form";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AddNewServiceApiStep3 } from "../../Api_Requests/Api_Requests";
import { useEffect, useState } from "react";
import { setStepData } from "../../store/Slices/allGigSlice";
const Requirement = ({ setActiveStep }) => {
  const gigId = useSelector((state) => state?.gig?.gigId);
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch()

  const step3Data = useSelector((state) => state?.allGigs?.step3) || { questions: [{ value: "" }], faqs: [{ value: "" }] };

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { questions: [{value:""}], faqs:[{value:""}]},
  });

  const { fields: questionfield, append: questionappend, remove: questionremove } = useFieldArray({
    control,
    name: "questions",
  });

  const { fields: faqs, append: faqsappend, remove: faqsremove } = useFieldArray({
    control,
    name: "faqs",
  });
  if (questionfield.length === 0) questionappend("");
  if (faqs.length === 0) faqsappend("");

  useEffect(() => {
    if (step3Data && step3Data?.questions) {
      reset({
        questions: step3Data?.questions,
        faqs: step3Data?.faqs,
      });
    }
  }, [step3Data, reset]);
  
  const onSubmit = async (payload) => {
    console.log(payload)
    const newpayload={questions:[],faqs:[]}

    payload.questions.forEach((question,index) => {
      newpayload.questions[index]=question.value
    });
    payload.faqs.forEach((faq,index) => {
      newpayload.faqs[index]=faq.value
    });

    try {
      setLoading(true)
      if(!gigId){
        throw new Error("gig id missing")
      }
      const response = await AddNewServiceApiStep3(newpayload, gigId);
      if (response.status === 200) {
        setLoading(false)
        toast.success("Details Submitted Successfully!");
        dispatch(setStepData({ step: 'step3', data: payload }));

        setActiveStep((prev) => prev + 1);
      } else {
        throw new Error("Something Went Wrong!");
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col text-white justify-center items-center px-4"
    >
      <div className="flex-col w-full sm:w-[90%] lg:w-[80%] mt-7">
        <div className="font-semibold text-2xl sm:text-3xl mt-4">Requirement</div>

        {/* Questions Section */}
        <div className="text-[0.875rem] sm:text-[1rem] font-normal w-full my-2">
          Write what you asked for your client.
        </div>
        {questionfield.map((field, index) => (
          <div className="flex mt-4" key={field.id}>
            <span className="text-lg sm:text-2xl font-semibold w-8 sm:w-10 p-2">
              {index + 1}.
            </span>
            <div className="relative flex-grow">
              <textarea
               defaultValue={ step3Data?.questions?.[0]?.value || "" }
                {...register (`questions.${index}.value`, { required: "This field is required" })}
                className={`w-full bg-transparent text-white border ${
                  errors.questions?.[index] ? "border-red-500" : "border-white"
                } rounded-2xl p-3 sm:p-4 text-[0.875rem] sm:text-[1rem] font-poppins outline-none resize-none`}
                placeholder="Write your question here..."
                rows={4}
                maxLength={100}
              />
              {index > 0 && (
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    color: "#fff",
                  }}
                  onClick={() => questionremove(index)}
                >
                  <CloseIcon />
                </IconButton>
              )}
              {errors.questions?.[index] && (
                <p className="text-red-500 text-sm mt-1">{errors.questions[index]?.value?.message}</p>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-center">
        <button
          type="button"
          onClick={() => questionappend({value:""})}
          className="p-3 max-w-60 bg-white capitalize text-[#DE0588] font-normal text-lg w-full rounded-md mt-4"
        >
          <AddIcon /> Add New Question
        </button>
        </div>

        {/* FAQs Section */}
        <div className="text-[0.875rem] sm:text-[1rem] font-normal w-full my-2">
          Specify FAQs
        </div>
        {faqs.map((field, index) => (
          <div className="flex mt-4" key={field.id}>
            <span className="text-lg sm:text-2xl font-semibold w-8 sm:w-10 p-2">
              {index + 1}.
            </span>
            <div className="relative flex-grow">
              <textarea
                {...register(`faqs.${index}.value`, { required: "This field is required" })}
                className={`w-full bg-transparent text-white border ${
                  errors.faqs?.[index] ? "border-red-500" : "border-white"
                } rounded-2xl p-3 sm:p-4 text-[0.875rem] sm:text-[1rem] font-poppins outline-none resize-none`}
                placeholder="Write your FAQ here..."
                rows={4}
                maxLength={100}
              />
              {index > 0 && (
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    color: "#fff",
                  }}
                  onClick={() => faqsremove(index)}
                >
                  <CloseIcon />
                </IconButton>
              )}
              {errors.faqs?.[index] && (
                <p className="text-red-500 text-sm mt-1">{errors.faqs[index]?.value?.message}</p>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-center">
        <button
          type="button"
          onClick={() => faqsappend({value:""})}
          className="p-3 max-w-60 bg-white capitalize text-[#DE0588] font-normal text-lg w-full rounded-md mt-4"
        >
          <AddIcon /> Add New FAQ
        </button>
        </div>
      </div>

      <div className="w-full sm:w-[90%] lg:w-[80%] py-8 px-3 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => setActiveStep((prev) => prev - 1)}
          className="p-3 sm:p-4 w-full sm:w-[300px] border border-white/50 text-sm sm:text-xl rounded-md"
        >
          Previous
        </button>
        <button
          type="submit"
          className="p-3 sm:p-4 w-full sm:w-[300px] bg-gradient-to-l from-[#DE0588] to-[#460BCB] text-sm sm:text-xl rounded-md"
        >
          {loading ? "Please wait!" : "Continue"}
        </button>
        <button
          type="button"
          onClick={() => setActiveStep((prev) => prev + 1)}
          className="p-3 sm:p-4 w-full sm:w-[300px] bg-gradient-to-l from-[#DE0588] to-[#460BCB] text-sm sm:text-xl rounded-md"
        >
          Skip
        </button>
      </div>
    </form>
  );
};

export default Requirement;
