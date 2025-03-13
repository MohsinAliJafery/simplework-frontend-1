import React from "react";

const EarningTable = () => {
  const data = [
    {
      id: 1,
      date: "09/03/2024",
      from: "Jon",
      description: "Order clearing",
      order: "ORD123",
      activity: "Clearing",
      amount: "$100",
    },
    {
      id: 2,
      date: "09/04/2024",
      from: "Cersei",
      description: "Delivery",
      order: "ORD456",
      activity: "Shipped",
      amount: "$200",
    },
    {
      id: 3,
      date: "09/05/2024",
      from: "Jaime",
      description: "Processing",
      order: "ORD789",
      activity: "Processing",
      amount: "$150",
    },
    {
      id: 4,
      date: "09/06/2024",
      from: "Arya",
      description: "Order Complete",
      order: "ORD101",
      activity: "Completed",
      amount: "$50",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full table-auto border-collapse border-0 text-white"
        style={{
          borderCollapse: "separate",
          borderSpacing: "0px 12px", // Space between rows
        }}
      >
        <thead className="bg-transparent">
          <tr>
            <th className="p-2 pl-4 text-left text-[1rem] font-poppins font-[600]">
              Date
            </th>
            <th className="p-2 pl-4 text-left text-[1rem] font-poppins font-[600]">
              From
            </th>
            <th className="p-2 pl-4 text-left text-[1rem] font-poppins font-[600]">
              Description
            </th>
            <th className="p-2 pl-4 text-left text-[1rem] font-poppins font-[600]">
              Order
            </th>
            <th className="p-2 pl-4 text-left text-[1rem] font-poppins font-[600]">
              Activity
            </th>
            <th className="p-2 pl-4 text-left text-[1rem] font-poppins font-[600]">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="">
              <td className="p-2 bg-[#FFFFFF33] rounded-l-[17px] py-5 font-poppins text-left pl-5 font-[400] text-[.9rem]">
                {row.date}
              </td>
              <td className="p-2 bg-[#FFFFFF33] py-5 font-poppins text-left pl-5 font-[400] text-[.9rem]">
                {row.from}
              </td>
              <td className="p-2 bg-[#FFFFFF33] py-5 font-poppins text-left pl-5 font-[400] text-[.9rem]">
                {row.description}
              </td>
              <td className="p-2 bg-[#FFFFFF33] py-5 font-poppins text-left pl-5 font-[400] text-[.9rem]">
                {row.order}
              </td>
              <td className="p-2 bg-[#FFFFFF33] py-5 font-poppins text-left pl-5 font-[400] text-[.9rem]">
                {row.activity}
              </td>
              <td className="p-2 bg-[#FFFFFF33] rounded-r-[17px] py-5 font-poppins text-left pl-5 font-[400] text-[.9rem]">
                {row.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EarningTable;
