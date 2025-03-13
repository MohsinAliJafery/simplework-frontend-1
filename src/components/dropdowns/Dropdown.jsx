import React from "react";

function Dropdown({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-4 w-48 z-10">
      <ul className="text-black">
        <li className="py-1 hover:bg-gray-200 cursor-pointer">Option 1</li>
        <li className="py-1 hover:bg-gray-200 cursor-pointer">Option 2</li>
        <li className="py-1 hover:bg-gray-200 cursor-pointer">Option 3</li>
      </ul>
    </div>
  );
}

export default Dropdown;
