import { AdminCurrentMonthStats } from "@/components/Charts/AdminCurrentMonthStats";
import SideMenu from "../../components/SideMenu/SideMenu";
import { SellerBuyerInfoChart } from "@/components/Charts/SellerBuyerInfoChart";
import React from "react";
import { RevenueChart } from "@/components/Charts/RevenueChart";
import UserManagement from "@/components/Table/UserManagement";
import AdsChart from "@/components/Charts/AdsChart";

const AdminDashboard = () => {
  return (
    <div className="px-5 flex w-full">
      <SideMenu />
      <div className="grid grid-cols-9 grid-rows-8 text-white gap-10 pt-7 pl-7 pb-28">
        <div className="col-span-3 row-span-2">
          <AdsChart />
        </div>
        <div className="col-span-3 row-span-2 col-start-4">
          <RevenueChart />
        </div>
        <div className="col-span-3 row-span-2 col-start-7">
          <SellerBuyerInfoChart />
        </div>
        <div className="col-span-9 row-span-2 row-start-3 mt-[-48px]">
          <AdminCurrentMonthStats />
        </div>
        <div className="col-span-9 row-span-4 row-start-5">
          <UserManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
