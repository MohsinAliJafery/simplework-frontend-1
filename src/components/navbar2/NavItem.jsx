import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TiArrowSortedDown } from "react-icons/ti";

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #381138;
  border-radius: 0px 0px 15px 15px;
  overflow: hidden;
  z-index: 100;
  width: 150px;
  display: ${({ isDropdownVisible }) => (isDropdownVisible ? "block" : "none")};
`;

const NavItemContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const NavItem = ({ nav }) => {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    if (nav.SubLinks && nav.SubLinks.length > 0) {
      setDropdownVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };
if(nav?.requiresLogin){
  return null
}
  return (
    <NavItemContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="font-poppins font-semibold text-gray-300 flex items-center"
        onClick={() => {
          if (!nav.SubLinks) {
            navigate(nav.Link);
          }
        }}
      >
        {nav.title}
        {nav.SubLinks && (
          <TiArrowSortedDown
            className="ml-2 text-xl text-white" // Add spacing and style for the arrow
          />
        )}
      </div>
      {nav.SubLinks && (
        <DropdownMenu
          className="animate-fade-in"
          isDropdownVisible={isDropdownVisible}
        >
          {nav.SubLinks.map((subLink, index) => (
            <div
              key={index}
              className="text-white cursor-pointer hover:bg-[#333] px-4 whitespace-nowrap py-2 text-sm font-poppins"
              onClick={() => navigate(subLink.Link)}
            >
              {subLink.title}
            </div>
          ))}
        </DropdownMenu>
      )}
    </NavItemContainer>)
  
};

export default NavItem;
