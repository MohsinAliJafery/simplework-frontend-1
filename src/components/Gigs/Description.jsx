import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import colorPicker from "../../assets/icons/color_picker.png";

const Description = ({ setActiveStep }) => {
  const colorRef = useRef();
  const [text, setText] = useState("");
  const maxLength = 100;
  const [length, setLength] = useState(0);

  const handleChange = (e) => {
    if (e.key === "Backspace") {
      if (length === 0) return;
      setLength((prev) => prev - 1);
    } else if (e.key.length === 1) {
      setLength((prev) => prev + 1);
    }
  };
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const renderFormattedContent = () => {
    let formattedContent = text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/_(.*?)_/g, "<i>$1</i>")
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(
        /<span style="color:(.*?)">(.*?)<\/span>/g,
        '<span style="color:$1">$2</span>'
      );
    return { __html: DOMPurify.sanitize(formattedContent) };
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="w-full flex flex-col text-white justify-center items-center">
      <div className="flex-col w-[80%] mt-7">
        <div className="font-semibold text-3xl">Description</div>
        <div className="flex justify-between items-center">
          <div className="text-xl font-normal w-[50%] mb-1">
            Briefly Describe your
          </div>
          <div className="flex items-center space-x-1">
            <button
              // onClick={() => {
              //   setBold((prev) => !prev);
              //   execCommand("bold");
              // }}
              className={`p-2 w-10 aspect-square text-xl font-bold ${
                bold && "bg-white/10 rounded-md"
              }`}
            >
              B
            </button>
            <button
              // onClick={() => {
              //   setItalic((prev) => !prev);
              //   execCommand("italic");
              // }}
              className={`p-2 w-10 aspect-square text-xl italic font-serif ${
                italic && "bg-white/10 rounded-md"
              }`}
            >
              I
            </button>
            <button className="flex justify-center items-center w-10 aspect-square">
              <img
                src={colorPicker}
                height={25}
                width={25}
                onClick={() => colorRef.current.click()}
                className=""
              />
            </button>
            <button
              // onClick={() => {
              //   setUnderline((prev) => !prev);
              //   execCommand("underline");
              // }}
              className={`p-2 w-10 aspect-square text-xl underline  ${
                underline && "bg-white/10 rounded-md"
              }`}
            >
              U
            </button>
            <input
              type="color"
              className="invisible w-0"
              id=""
              ref={colorRef}
              // hidden
              // onChange={(e) => execCommand("foreColor", e.target.value)}
            />
            {/* <button
              onClick={() => execCommand("foreColor", "red")}
              className="p-2 text-xl text-red-500"
            >
              RED
            </button>
            <button
              onClick={() => execCommand("foreColor", "blue")}
              className="p-2 text-xl text-blue-500"
            >
              BLUE
            </button> */}
          </div>
        </div>
        <div className="relative w-full" onKeyDown={handleChange}>
          <div
            id="description"
            className="w-full bg-transparent text-white border-white border-[1px] rounded-2xl p-4 text-xl h-48 overflow-auto font-poppins outline-none mt-2 resize-none"
            placeholder="Lorem Ipsum ..."
            contentEditable
            // onChange={handleChange}
            dangerouslySetInnerHTML={renderFormattedContent()}
          ></div>
          <div className="absolute bottom-4 right-4 text-white text-[.7rem]">
            {length}/{maxLength}
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

export default Description;
