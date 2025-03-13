import React from 'react';
import { FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

const CustomButton = ({
  onClick,
  label,
  bgColor = '#6B4B91', 
  hoverColor = '#593978', 
  textColor = 'white',
  icon: Icon = FaHeart,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center text-[21px] mt-4 mx-auto w-[90%] max-w-[400px] ${bgColor} hover:${hoverColor} text-${textColor} font-semibold 
        px-8 py-4 rounded-md shadow-xl transition-transform transform hover:scale-105 sm:w-auto sm:px-10 sm:py-5`}
    >
      {Icon && (
        <span className="mr-3">
          <Icon />
        </span>
      )}
      {label}
    </button>
  );
};


export default CustomButton;
