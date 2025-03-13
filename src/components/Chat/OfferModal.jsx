import React, { useState } from "react";
import gigImage from "../../assets/Images/gigImage.svg";
import OfferSummaryModal from "./OfferSummaryModal";

const OfferModal = ({ isOpen, onClose, setPaymentModalOpen }) => {
const [isOfferSummaryOpen, setOfferSummaryOpen] = useState(false);
if (!isOpen && !isOfferSummaryOpen) return null;
  const [selectedIncludes, setSelectedIncludes] = useState({
    screens: true,
    assets: false,
    responsive: false,
    prototype: true,
  });

  const toggleInclude = (key) => {
    setSelectedIncludes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isOpen) return null;

  return (
    <>
    {!isOfferSummaryOpen && isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-[10]">
      <div className="bg-[#1A1A1A] p-8 rounded-3xl w-[650px] pb-8 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">CREATE AN OFFER</h2>
          <button onClick={onClose} className="text-white text-3xl">
            &times;
          </button>
        </div>

        {/* Offer Info */}
        <p className="text-white mt-2 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Accumsan id velit commodo id
          bibendum et quis nisl.
        </p>

        {/* Image & Description */}
        <div className="flex items-start mt-4 space-x-4">
          <img
            src={gigImage}
            alt="Gig Thumbnail"
            className="w-30 h-24 rounded-lg object-cover"
          />
          <textarea
            className="w-full h-24 bg-transparent text-white p-3 rounded-lg text-sm border-2 border-gray-600"
            placeholder="Description ..."
            maxLength={1200}
          />
        </div>

        {/* Payment Offer Section */}
        <h3 className="text-white font-semibold mt-6">Set up a Payment Offer</h3>
        <p className="text-gray-400 text-sm">
          Define the terms of your offer and what it includes.
        </p>

        {/* Dropdowns for Revisions, Delivery, Expiry, and Price */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="lg:flex lg:flex-col gap-2">
            <label className="text-white text-sm">Revisions 
            <span className="text-gray-400"> (Optional) </span>
            </label>
            <select className="bg-transparent text-white p-3 rounded-lg w-full border-2 border-gray-600">
              <option>01</option>
              <option>02</option>
              <option>03</option>
            </select>
          </div>
          <div className="lg:flex lg:flex-col gap-2">
            <label className="text-white text-sm">Delivery</label>
            <select className="bg-transparent text-white p-3 rounded-lg w-full border-2 border-gray-600">
              <option>02 Days</option>
              <option>05 Days</option>
              <option>07 Days</option>
            </select>
          </div>
          <div className="lg:flex lg:flex-col gap-2">
            <label className="text-white text-sm">Offer Expires 
               <span className="text-gray-400"> (Optional) </span>
                </label>
            <select className="bg-transparent text-white p-3 rounded-lg w-full border-2 border-gray-600">
              <option>00</option>
              <option>01</option>
              <option>02</option>
            </select>
          </div>
          <div className="lg:flex lg:flex-col gap-2">
            <label className="text-white text-sm">Price</label>
            <input
              type="text"
              className="bg-transparent text-white p-3 rounded-lg w-full border-2 border-gray-600 py-[0.65rem]"
              placeholder="$ 00.00"
            />
          </div>
        </div>

        {/* Offer Includes Section */}
        <h3 className="text-white font-semibold mt-6">Offer Includes</h3>
        <div className="mt-3 space-y-6">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
            <input type="checkbox" checked={selectedIncludes.screens} className="accent-white w-5 h-5 rounded-lg cursor-pointer" readOnly 
             onClick={() => toggleInclude("screens")}/>
            <span>Number of Screens</span>
            </div>
            <div>
            <select className="w-[10rem] ml-auto bg-gray-800 text-white p-2 rounded-lg border-2 border-gray-600 ">
              <option>01</option>
              <option>02</option>
              <option>03</option>
            </select>
            </div>
          </div>
           <div className="flex justify-between">
            <div className="flex gap-2 items-center">
            <input type="checkbox" checked={selectedIncludes.assets} className="accent-white w-5 h-5 rounded-lg cursor-pointer" readOnly 
             onClick={() => toggleInclude("assets")}/>
              <span>Custom Assets Design</span>
            </div>
            <div>
            <select className="w-[10rem] ml-auto bg-gray-800 text-white p-2 rounded-lg border-2 border-gray-600">
              <option>01</option>
              <option>02</option>
              <option>03</option>
            </select>
            </div>
          </div>
          <div className="space-y-8">
          <label
            className="flex items-center space-x-3 text-white cursor-pointer"
            onClick={() => toggleInclude("responsive")}
          >
            <input type="checkbox" checked={selectedIncludes.responsive} className="accent-white w-5 h-5 rounded-lg cursor-pointer" readOnly />
            <span>Responsive Design</span>
          </label>
          <label
            className="flex items-center space-x-3 text-white cursor-pointer"
            onClick={() => toggleInclude("prototype")}
          >
            <input type="checkbox" checked={selectedIncludes.prototype} className="accent-white w-5 h-5 rounded-lg items-center cursor-pointer" readOnly />
            <span>Prototype</span>
          </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
              className="w-[40%] bg-gradient-to-r from-sec to-main mt-6 p-3 text-white rounded-sm font-semibold"
              onClick={() => {
                // onClose(); // Close OfferModal
                setOfferSummaryOpen(true); // Open OfferSummaryModal
              }}
            >
              Send Offer
            </button>
      </div>
    </div>
    )}
    <OfferSummaryModal isOpen={isOfferSummaryOpen} setOfferSummaryOpen={setOfferSummaryOpen} onClose={onClose}  setPaymentModalOpen={setPaymentModalOpen}/>
    </>
  );
};

export default OfferModal;
