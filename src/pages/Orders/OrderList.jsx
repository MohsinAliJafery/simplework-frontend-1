import React, { useState, useEffect } from "react";
import axios from "axios";
import SideMenu from "../../components/SideMenu/SideMenu";
import OrderTable from "../../components/tables/OrderTable";

const OrderList = () => {
  const [currentStatus, setCurrentStatus] = useState(2);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { _id }= JSON.parse(localStorage.getItem('user'))

  const isSeller = location.pathname.includes("/seller/orders");
  const isUser = location.pathname.includes("/user/orders");

  const fetchOrders = async () => {
    try {
      const userId = _id; 
      const response = await axios.get(`http://localhost:5000/api/orders`, {
        params: {
          userId,
          isSeller,
          isUser,
        },
      });
      setOrders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const statusCounts = {
    1: orders.filter((order) => order.status === "Active").length,
    2: orders.filter((order) => order.status === "Pending").length,
    3: orders.filter((order) => order.status === "Delivered").length,
    4: orders.filter((order) => order.status === "Completed").length,
    5: orders.filter((order) => order.status === "Cancelled").length,
  };

  const filteredOrders = orders.filter((order) => {
    if (currentStatus === 1) return order.status === "Active";
    if (currentStatus === 2) return order.status === "Pending";
    if (currentStatus === 3) return order.status === "Delivered";
    if (currentStatus === 4) return order.status === "Completed";
    if (currentStatus === 5) return order.status === "Cancelled";
    return false;
  });

  return (
    <div className="px-5 flex w-full text-white">
      <SideMenu />
      <div className="flex flex-col h-fit py-5 px-5 w-full text-white font-poppins text-2xl font-semibold rounded-[20px] overflow-hidden">
        <div className="font-bold text-xl my-3 mb-6">Orders</div>
        <div className="flex items-center gap-x-7 font-semibold mb-8 ml-4 flex-wrap gap-y-4">
          {["ACTIVE", "PENDING", "DELIVERED", "COMPLETED", "CANCELLED"].map(
            (status, index) => (
              <div
                key={index}
                className={`py-3 cursor-pointer transition-all ease-in-out duration-700 ${
                  currentStatus === index + 1
                    ? "border-b-2 border-b-white"
                    : "border-b-2 border-b-transparent"
                }`}
                onClick={() => setCurrentStatus(index + 1)}
              >
                {status} ({statusCounts[index + 1] || 0})
              </div>
            )
          )}
        </div>
        <div className="flex flex-col h-fit py-5 px-5 w-full bg-[#FFFFFF33] rounded-[20px] overflow-auto">
          <div className="border-b-[1px] border-b-white pb-3 font-poppins px-2 uppercase">
            {["Active", "Pending", "Delivered", "Completed", "Cancelled"][
              currentStatus - 1
            ]}{" "}
            Orders
          </div>
          <div className="flex flex-col h-fit w-full bg-transparent rounded-[20px] overflow-x-auto">
            {loading ? (
              <div className="text-center py-5">Loading orders...</div>
            ) : (
              <OrderTable data={filteredOrders} isSeller={isSeller} isUser={isUser} onStatusChange={fetchOrders} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
