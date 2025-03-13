import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from 'react'; // Don't forget to import useState

const Publish = ({ setActiveStep }) => {
  const personalGigs = useSelector((state) => state.gig.personalGigs);
  const lastGigId = personalGigs.length > 0 ? personalGigs[personalGigs.length - 1]._id : null;
  const gigUrl = lastGigId ? `https://simplework.online/aboutseller/${lastGigId}` : "#"; 

  const [text, setText] = useState("");
  const maxLength = 100;
  const [checked, setChecked] = useState([]);
  const [copied, setCopied] = useState(false); 

  const navigate = useNavigate();

  const handleCopy = () => {
    if (gigUrl !== "#") {
      navigator.clipboard.writeText(gigUrl)
        .then(() => {
          setCopied(true); 
          setTimeout(() => setCopied(false), 500);
        })
        .catch(err => {
          console.error("Failed to copy:", err);
        });
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setChecked([...checked, e.target.value]); // Corrected 'event' to 'e'
  };

  return (
    <div className="w-full flex flex-col text-white justify-center items-center">
      <div className="flex-col w-[80%] mt-7 font-poppins">
        <div className="font-semibold text-3xl">Gig Link</div>
        <div className="text-[1rem] font-normal w-[50%] mt-5">
          <span 
            className="text-xl text-blue-500 cursor-pointer underline"
            onClick={handleCopy}  // Handle click to copy the URL
          >
            {gigUrl !== "#" ? gigUrl : "Loading gig link..."}
          </span>
        </div>

        {/* Social Media Icons (commented out) */}
        {/* 
        <div className="relative w-full flex gap-x-3 text-3xl my-5">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="bg-black text-white p-2 rounded-lg cursor-pointer" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="bg-[#1976D2] text-white p-2 rounded-lg cursor-pointer" />
          </a>
        </div> 
        */}

        {/* Copy Status */}
        {copied && (
          <div className="text-[#DE0588] mt-2">
            Link Copied!
          </div>
        )}
      </div>

      <div className="w-[80%] py-8 px-3 flex gap-4">
        <div className="w-[300px]">
          <button
            onClick={() => setActiveStep((prev) => prev + 1)}
            className="p-4 max-w-96 bg-gradient-to-l capitalize from-[#DE0588] to-[#460BCB] font-normal text-xl w-full rounded-md"
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
