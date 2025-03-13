import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import ProductTable from "../../components/tables/ProductTable";
import GradientBtn from "../../components/Buttons/GradientBtn";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  return (
    <div className="px-5 flex w-full">
      <SideMenu />
      <div
        className="flex flex-col fade-in"
        style={{ width: "calc(100% - 250px)" }}
      >
        <div className="flex justify-between h-fit py-5 px-5 w-[100%] text-white font-poppins text-2xl font-semibold rounded-[20px] overflow-hidden items-center flex-wrap gap-y-3">
          <div className="">Products</div>
          <div className="w-[220px]">
            <GradientBtn
              title={"Create New Gig"}
              onClick={() => navigate("/seller/publish-gig")}
            />
          </div>
        </div>
        <div className="flex flex-col h-fit py-5 px-5 w-[100%] bg-[#FFFFFF33] rounded-[20px] overflow-hidden">
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default Products;
