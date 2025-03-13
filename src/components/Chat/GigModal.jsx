import React, { useState } from "react";
import gigImage from "../../assets/Images/gigImage.svg";
import PaymentModal from "./PaymentModal";

const GigModal = ({ isOpen, onClose }) => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  if (!isOpen && !isPaymentModalOpen) return null; // Ensure one modal is open at a time

  const gigs = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur. Accumsan id velit commodo id bibendum et quis nisl.",
      image: gigImage,
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur. Accumsan id velit commodo id bibendum et quis nisl.",
      image: gigImage,
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur. Accumsan id velit commodo id bibendum et quis nisl.",
      image: gigImage,
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur. Accumsan id velit commodo id bibendum et quis nisl.",
      image: gigImage,
    },
  ];

  return (
    <>
      {!isPaymentModalOpen && isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="bg-[#1A1A1A] p-6 rounded-3xl w-[600px] pb-10">
            <div className="flex justify-between items-center pr-2">
              <h2 className="text-lg font-bold text-white">SELECT A GIG</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-white text-4xl"
              >
                &times;
              </button>
            </div>

            {/* Gig List */}
            <div className="mt-4 space-y-4 p-3">
              {gigs.map((gig) => (
                <div
                  key={gig.id}
                  className="flex items-center bg-gray-600 p-3 rounded-lg space-x-4 cursor-pointer hover:bg-gray-700"
                  onClick={() => {
                    onClose(); // Close GigModal
                    setPaymentModalOpen(true); // Open PaymentModal
                  }}
                >
                  <img
                    src={gig.image}
                    alt="Gig Thumbnail"
                    className="w-24 h-20 rounded-lg"
                  />
                  <p className="text-white text-sm">{gig.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        setPaymentModalOpen={setPaymentModalOpen}
      />
    </>
  );
};

export default GigModal;
