import React from "react";
import { Link } from "react-router-dom";

function Advertisement() {
  return (
    <div>
      <div className="flex flex-col md:flex-row from-blue-700 to-blue-900 text-white p-5 md:p-8 rounded-lg shadow-md">
        <div className="flex flex-col gap-0 w-full md:w-2/5">
          {/* Repeat for each card */}
          <div className="bg-blue-800 p-5 shadow border border-white/30 h-32 flex justify-between items-center  cursor-pointer hover:bg-blue-900">
            <h2 className="text-lg font-semibold tracking-wide">
              Push Gig to the top of Listing
            </h2>
            <h2 className="text-lg bg-white rounded-md text-pricepurple font-semibold tracking-wide px-4 py-1">
              €234
            </h2>
          </div>
          <div className="bg-blue-800 p-5 shadow border border-white/30 h-32 flex justify-between items-center cursor-pointer hover:bg-blue-900">
            <h2 className="text-lg font-semibold tracking-wide">
              Advertise on Front page
            </h2>
            <h2 className="text-lg bg-white rounded-md text-pricepurple font-semibold tracking-wide px-4 py-1">
              €234
            </h2>
          </div>
          <div className="bg-blue-800 p-5 shadow border border-white/30 h-32 flex justify-between items-center items-center cursor-pointer hover:bg-blue-900">
            <h2 className="text-lg font-semibold tracking-wide">
              Recommend on Front page
            </h2>
            <h2 className="text-lg bg-white rounded-md text-pricepurple font-semibold tracking-wide px-4 py-1">
              €234
            </h2>
          </div>
          <div className="bg-blue-800 p-5 shadow border border-white/30 h-32 flex justify-between items-center cursor-pointer hover:bg-blue-900">
            <h2 className="text-lg font-semibold tracking-wide">
              Mark gig in the search listing
            </h2>
            <h2 className="text-lg bg-white rounded-md text-pricepurple font-semibold tracking-wide px-4 py-1">
              €234
            </h2>
          </div>
          <div className="bg-blue-800 p-5 shadow border border-white/30 h-32 flex justify-between items-center cursor-pointer hover:bg-blue-900">
            <h2 className="text-lg font-semibold tracking-wide">
              Push Gig to the top of Listing
            </h2>
            <h2 className="text-lg bg-white rounded-md text-pricepurple font-semibold tracking-wide px-4 py-1">
              €234
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-evenly w-3/4 md:w-2/3 mt-4 md:mt-0 md:ml-8">
          <div className="bg-blue-800 p-5 rounded-lg shadow cursor-pointer hover:bg-blue-900">
            <img
              src="/gigimg.png"
              alt="GIF placeholder"
              className="rounded-lg"
              style={{ height: "450px", width: "800px" }}
            />
            <div className="bg-blue-800 flex justify-evenly items-center p-7 mt-4 cursor-pointer hover:bg-blue-900">
              <p className="text-sm  text-left w-1/2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sed porttitor erat. Cras eu posuere quam. Ut venenatis turpis
                sit amet bibendum ornare. Donec varius non sapien in consequat
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sed porttitor erat. Cras eu posuere quam. Ut venenatis turpis
                sit amet bibendum ornare. Donec varius non sapien in
                consequat...
              </p>
              <h2 className="text-lg bg-white rounded-md text-pricepurple font-semibold tracking-wide px-4 py-1 whitespace-nowrap">
                Total: €234
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 flex justify-center">
        <Link to="/seller/products">
          <button className="p-4 text-white bg-gradient-to-l capitalize from-[#DE0588] to-[#460BCB] font-normal text-xl w-full rounded-md">
            Finish 
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Advertisement;
