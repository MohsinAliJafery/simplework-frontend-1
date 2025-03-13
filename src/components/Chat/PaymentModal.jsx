import React,{useState} from "react";
import singlePayment from "../../assets/Images/singlePayment.svg";
import milestonePayment from "../../assets/Images/mileStonePayment.svg";
import OfferModal from "./OfferModal";
const PaymentModal = ({ isOpen, onClose,setPaymentModalOpen }) => {
    const [isOfferModalOpen, setOfferModalOpen] = useState(false);
    if (!isOpen && !isOfferModalOpen) return null;
    return (
      <>
        {!isOfferModalOpen && isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-[10]">
            <div className="bg-[#1A1A1A] p-6 rounded-3xl w-[500px] pb-10">
              <div className="flex justify-between items-center pr-2">
                <h2 className="text-lg font-bold text-white">CHOOSE HOW YOU WANT TO GET PAID</h2>
                <button onClick={onClose} className="text-white text-3xl">
                  &times;
                </button>
              </div>
  
              <div className="mt-6 space-y-4">
                <div
                  className="flex items-center bg-gray-700 p-4 rounded-xl space-x-4 cursor-pointer hover:bg-gray-600 transition"
                  onClick={() => {
                    setOfferModalOpen(true);
                    // onClose();
                  }}
                >
                  <img src={singlePayment} alt="single payment" />
                  <div>
                    <p className="text-white font-semibold">Single Payment</p>
                    <p className="text-gray-400 text-sm">Get paid in full after each order is completed.</p>
                  </div>
                </div>
  
                <div className="flex items-center bg-gray-700 p-4 rounded-xl space-x-4 cursor-pointer hover:bg-gray-600 transition">
                  <img src={milestonePayment} alt="milestone" />
                  <div>
                    <p className="text-white font-semibold">Milestones</p>
                    <p className="text-gray-400 text-sm">Work in gradual steps and get paid for each completed milestone.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
       {isOfferModalOpen &&
       <OfferModal isOpen={isOfferModalOpen} onClose={() => setOfferModalOpen(false)} setPaymentModalOpen={setPaymentModalOpen} />
       }
        
      </>
    );
  };

export default PaymentModal;
