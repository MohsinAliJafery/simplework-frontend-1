import { Link, useParams } from "react-router-dom";
import { getJobDetails, applyForJob } from "../Api_Requests/Api_Requests";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { formatJobTimeline , getRelativeTime} from "../utils";
import axios from "axios";

export default function JobDetails() {
  const [currentJob, SetCurrentJob] = useState(null);
  console.log("currentJobcurrentJob", currentJob?.createdAt)
  const [loading, setLoading] = useState(true);
  const { jobId } = useParams();
  const [selectedOption, setSelectedOption] = useState("single");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(""); 
  const [coverLetter, setCoverLetter] = useState("");
  const [milestoneData, setMilestoneData] = useState({
    dueDate: "",
    price: "",
    description: "",
  });

  const { _id: userId } = JSON.parse(localStorage.getItem("user"));

  const fetchJobDetails = async () => {
    try {
      const response = await getJobDetails(jobId);
      setLoading(false);
      if (response.status === 200) {
        SetCurrentJob(response.data.job);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFileName(file.name);
    }
  };

  const handleMilestoneChange = (e) => {
    const { name, value } = e.target;
    setMilestoneData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const requestBody = {
      userId: userId,
      paymentOption: selectedOption,
      coverLetter,
      categoryName: currentJob?.category?.category_name,
      jobDescription: currentJob?.description,
      salaryMin: currentJob?.salary?.min,
      salaryMax: currentJob?.salary?.max,
      experienceLevel: currentJob?.experience_level,
      // isImmediate: currentJob?.is_immediate === "Immediate" ? true : false,
    };

    if (selectedOption === "milestone") {
      requestBody.milestoneDueDate = milestoneData.dueDate;
      requestBody.milestonePrice = milestoneData.price;
      requestBody.milestoneDescription = milestoneData.description;
    }

    try {
      const response = await applyForJob(jobId, requestBody);
      if (response.status === 200) {
        alert("Job application submitted successfully!");
      } else {
        alert("Failed to submit application. Try again.");
      }
    } catch (error) {
      console.error("Error submitting job request:", error.response?.data || error.message);
      alert("An error occurred while submitting the application.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-900 px-[4%]">
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-black">
          <Loader />
        </div>
      ) : !currentJob && !loading ? (
        <div className="text-center p-6 border-md border-red-900 rounded-lg shadow-xl max-w-md w-full mx-auto">
          <h1 className="text-4xl text-red-900 mb-4">Error</h1>
          <p className="text-lg mb-4">
            Error fetching Job Details, Try after some time!
          </p>
        </div>
      ) : (
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-3xl text-white font-bold mb-4 pt-5">Job Details</h1>
          <div className="bg-[#FFFFFF33] w-full p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h1 className="text-xl ml-5 text-white font-bold">Job Details</h1>
              <h3 className="text-white text-lg font-semibold">
              {getRelativeTime(currentJob?.createdAt)}
              </h3>

            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 text-white p-6 rounded-lg">
                <h1 className="text-2xl font-semibold capitalize">{currentJob?.title}</h1>
                <h3 className="text-lg text-gray-300">{currentJob?.category?.category_name}</h3>
                <p className="mt-4 text-sm leading-relaxed break-all overflow-wrap break-word">{currentJob?.description}</p>
              </div>

              <div className="w-full md:w-[25%] border-l-4 border-white pl-6 text-white flex flex-col gap-4">
                <div>
                  <h1 className="text-lg font-semibold whitespace-nowrap">
                    {currentJob?.job_timeline === "false"
                      ? "Immediate"
                      : formatJobTimeline(currentJob.job_timeline)}
                  </h1>
                  <p className="text-sm text-gray-300">Time</p>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{currentJob?.experience_level}</h1>
                  <p className="text-sm text-gray-300">Experience Level</p>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">${currentJob?.salary?.min}-${currentJob?.salary?.max}</h1>
                  <p className="text-sm text-gray-300">Experience Level</p>
                </div>
              </div>
            </div>
          </div>


          <div className="bg-[#FFFFFF33] w-full p-6 rounded-2xl text-white mt-5">
            <h1 className="text-2xl font-bold">Terms</h1>
            <h3 className="text-xl font-semibold mb-4">How do you want to be paid?</h3>
            <div className="flex flex-col sm:flex-row gap-x-3 items-start mb-3">
              <label htmlFor="single" className="mt-1">
                <input
                  type="radio"
                  id="single"
                  value="single"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  checked={selectedOption === "single"}
                  className="w-4 h-4 cursor-pointer accent-[#DE0588]"
                />
              </label>
              <h3>Single Payment</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-3 items-start mb-3">
              <label htmlFor="milestone" className="mt-1">
                <input
                  type="radio"
                  id="milestone"
                  value="milestone"
                  checked={selectedOption === "milestone"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-4 h-4 cursor-pointer accent-[#DE0588]"
                />
              </label>
              <h3>Milestone</h3>
            </div>
            {selectedOption === "milestone" && (
              <div className="fade-in">
                <div className="flex flex-col md:flex-row gap-x-5 items-center">
                  <div className="flex flex-col gap-y-3 w-1/2 font-semibold">
                    <label htmlFor="">Due Date</label>
                    <input
                      type="text"
                      name="dueDate"
                      value={milestoneData.dueDate}
                      onChange={handleMilestoneChange}
                      className="w-[100%] bg-transparent border-white border rounded-xl h-[55px]"
                    />
                  </div>
                  <div className="flex flex-col gap-y-3 w-1/2 font-semibold">
                    <label htmlFor="">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={milestoneData.price}
                      onChange={handleMilestoneChange}
                      className="w-[100%] bg-transparent border-white border rounded-xl h-[55px]"
                    />
                  </div>
                </div>
                <div className="font-semibold mt-5 flex flex-col gap-y-4">
                  <label htmlFor="">Description</label>
                  <textarea
                    name="description"
                    value={milestoneData.description}
                    onChange={handleMilestoneChange}
                    className="w-[100%] bg-transparent border-white border rounded-xl h-[120px] p-4 resize-none"
                  ></textarea>
                </div>
                <button className="rounded-xl border-white border p-3 mt-5">
                  <span className="text-xl">+</span> Add Milestone
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#FFFFFF33] w-full p-6 rounded-2xl text-white mt-5">
            <h1 className="text-2xl font-bold">Cover Letter</h1>
            <div className="flex flex-col gap-y-3 mt-3">
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full bg-transparent border-white border rounded-xl h-24 p-2 resize-none"
              ></textarea>
            </div>
            <div className="flex flex-col gap-y-3 mt-3">
              <label htmlFor="attachments">Attachments</label>
              <div
                id="attachments"
                className="w-full bg-transparent border-white border rounded-xl h-24 flex items-center justify-center"
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                />
                <label htmlFor="fileUpload" className="cursor-pointer text-xl text-center">
                  Drag and Drop or <span className="text-pink-500">Upload</span> project files here
                </label>
              </div>
              {fileName && (
                <div className="mt-3 text-white font-semibold">
                  <p>Uploaded File: {fileName}</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 text-xl mt-7 mb-7 w-full sm:w-72"
          >
            Submit Request
          </button>
        </div>
      )}
    </div>
  );
}
