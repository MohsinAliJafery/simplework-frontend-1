import { Link } from "react-router-dom";

export default function JobDetailstwo() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-900 px-[4%]  ">
      <h1 className="text-3xl text-white font-bold mb-4 pt-5">Job Details</h1>
      <div className="bg-[#FFFFFF33] w-[100%] p-6 rounded-2xl ">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl text-white font-bold">Job Details</h1>
          <h3 className="text-white text-lg font-semibold">02 hrs ago</h3>
        </div>
        <div className="flex flex-row">
          <div className="w-65% text-white flex flex-col gap-y-3">
            <h1 className="text-xl font-semibold ">UI/UX Designer</h1>
            <h3>App Designer</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Risus pellentesque
              interdum aliquam ut facilisis tellus magna non. Eget ut ac. arcu
              metus tempor ac maecenas facilisis. Pretium ut cursus arcu sed
              donec facilisi justo convallis at. Volutpat urna vel. Sit
              tristique nullam semper semper non eget feugiat. Cum rhoncus et
              turpis in aliquam aliquet volutpat. vulputate sed diam ipsum.
              Posuere viverra eu felis ullamcorper bibendum suscipit purus.
            </p>
          </div>
          <div className="border-white border-l-4 w-[35%] text-white p-3 flex flex-col gap-y-3">
            <div>
              <h1 className="text-xl font-semibold">Full Time</h1>
              <p className="text-sm">Time</p>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Senior Designer</h1>
              <p className="text-sm">Experience Level</p>
            </div>
            <div>
              <h1 className="text-xl font-semibold">200 $</h1>
              <p className="text-sm">Experience Level</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF33] w-[100%] p-6 rounded-2xl text-white flex flex-col gap-y-5 mt-5">
        <h1 className="text-2xl font-bold">Terms</h1>
        <h3 className="text-xl font-semibold">How do you want to be paid?</h3>

        <div className="flex flex-row gap-x-3 items-center">
          <input type="radio" id="milestone" className="hidden" />
          <label
            htmlFor="milestone"
            className="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </label>
          <h3>Single Payment</h3>
        </div>
        <div className="flex flex-row gap-x-3 items-center">
          <input type="radio" id="milestone" className="hidden" />
          <label
            htmlFor="milestone"
            className="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </label>
          <h3>Milestone</h3>
        </div>
        <div>
          <div className="flex flex-col md:flex-row gap-x-5 items-center">
            <div className="flex flex-col gap-y-3 w-1/2 font-semibold">
              <label htmlFor="">Due Date</label>
              <input
                type="text"
                className=" w-[100%] bg-transparent border-white border rounded-xl h-[55px]"
              />
            </div>
            <div className="flex flex-col gap-y-3 w-1/2 font-semibold">
              <label htmlFor="">Price</label>
              <input
                type="text"
                className=" w-[100%] bg-transparent border-white border rounded-xl h-[55px]"
              />
            </div>
          </div>
          <div className="font-semibold mt-5 flex flex-col gap-y-4">
            <label htmlFor=""> Description</label>
            <textarea
              name=""
              id=""
              className="w-[100%] bg-transparent border-white border rounded-xl h-[120px] p-4"
            ></textarea>
          </div>
          <button className="rounded-xl border-white border p-3 mt-5">
            <span className="text-xl">+</span> Add Milestone
          </button>
        </div>
      </div>
      <div className="bg-[#FFFFFF33] w-[100%] p-6 rounded-2xl text-white mt-5 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">Cover Letter</h1>
        <div className="flex flex-col gap-y-3">
          <label className="" htmlFor="">
            Cover Letter
          </label>
          <textarea
            name=""
            id=""
            className="w-[100%] bg-transparent border-white border rounded-xl h-[100px]"
          ></textarea>
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="" htmlFor="">
            Attachments
          </label>
          <div
            name=""
            id=""
            className="w-[100%] bg-transparent border-white border rounded-xl h-[100px]"
          >
            <h1 className="text-xl text-center mt-8">
              Drag and Drop or <span className="text-pink-500 ">Upload</span>{" "}
              project files here
            </h1>
          </div>
        </div>
      </div>
      <Link to={"/postajob"}>
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-5 text-xl mt-7 mb-7 w-[300px]">
          Submit Request
        </button>
      </Link>
    </div>
  );
}
