import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import CustomerCard from "../../components/Cards/CustomerCard";

const Customers = () => {
  return (
    <div className="px-5 flex w-full">
      <SideMenu />
      <div className="text-white">
        <div className="flex flex-col w-full px-4 pt-4">
          <div className="font-poppins font-bold text-xl my-3 mb-6">
            <div className="uppercase">
              Customers <span className="text-sm font-thin">(20)</span>
            </div>
            <div className="flex justify-center items-center gap-x-4 gap-y-4 py-5 flex-wrap">
              <CustomerCard />
              <CustomerCard />
              <CustomerCard />
              <CustomerCard />
              <CustomerCard />
              <CustomerCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
