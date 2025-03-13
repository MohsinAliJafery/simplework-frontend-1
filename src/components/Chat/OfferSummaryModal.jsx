import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

const OfferSummaryModal = ({ isOpen, onClose, setOfferSummaryOpen,setPaymentModalOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[30]">
      <div className="bg-gradient-to-r from-[#17132E] to-[#251D45] rounded-2xl w-[400px] shadow-lg">
        {/* Header with Price */}
        <div className="bg-[#6D6D6D] opacity-60 p-4 rounded-t-lg flex justify-between items-center">
          <p className="text-white text-sm font-medium leading-tight">
            Lorem ipsum dolor sit amet consectetur. Accumsan id velit commodo id.
          </p>
          <p className="text-white font-bold text-lg">$200</p>
        </div>

        {/* Offer Description */}
        <div className="p-6">
        <p className="text-white text-sm mt-3 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Accumsan id velit commodo id bibendum et quis nisl.
        </p>

        {/* Offer Includes */}
        <h3 className="text-white font-semibold mt-4">Your Offer Includes</h3>
        <div className="grid grid-cols-2 gap-y-3 mt-3">
          <p className="text-white flex items-center gap-2 text-sm">
          <AiOutlineCheck size={20}/>  02 Revisions
          </p>
          <p className="text-white flex items-center gap-2 text-sm">
          <AiOutlineCheck size={20}/> 06 Days Delivery
          </p>
          <p className="text-white flex items-center gap-2 text-sm">
          <AiOutlineCheck size={20}/>  02 Screens
          </p>
          <p className="text-white flex items-center gap-2 text-sm">
          <AiOutlineCheck size={20}/> Responsive Design
          </p>
          <p className="text-white flex items-center gap-2 text-sm"><AiOutlineCheck size={20}/> Prototype</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            className="flex-1 text-white border border-white rounded-lg py-2 text-center font-medium hover:bg-white hover:text-black transition"
            onClick={()=>{
              setOfferSummaryOpen(false);
              setPaymentModalOpen(false);
              onClose()
            }
            }
          >
            View Order
          </button>
          <button className="flex-1 bg-[#6D6D6D] text-gray-400 rounded-lg py-2 text-center cursor-not-allowed">
            Pending...
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default OfferSummaryModal;
