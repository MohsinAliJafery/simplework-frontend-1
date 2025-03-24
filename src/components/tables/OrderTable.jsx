import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
  Button,
  TableHead,
  Menu,
  MenuItem,
} from "@mui/material";
import moment from "moment";
import TooltipBtn from "../Buttons/TooltipBtn";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { acceptOrder } from "@/Api_Requests/Api_Requests";
import { BASE_URL, BASE_URL_LOCAL } from "../../utils/Config";
const OrderTable = ({ data, onStatusChange, isSeller, isUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handlePendingClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { _id: userId } = JSON.parse(localStorage.getItem("user"));

  const handleStatusChange = async (newStatus) => {
    if (selectedOrder) {
      if (newStatus === "Completed") {
        try {
          const response = await acceptOrder(selectedOrder);

          if (response.data.success) {
            toast.success(`Order status updated to ${newStatus}`);
            onStatusChange();
          } else {
            toast.error("Failed to update order status");
          }
        } catch (error) {
          toast.error(` ${error.response?.data?.message || error.message}`);
        }
        handleClose();
        return;
      } else {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/orders/change-status`,
            {
              orderId: selectedOrder,
              newStatus,
              userId,
            }
          );

          if (response.data.success) {
            toast.success(`Order status updated to ${newStatus}`);
            onStatusChange();
          } else {
            toast.error("Failed to update order status");
          }
        } catch (error) {
          toast.error(` ${error.response?.data?.message || error.message}`);
        }
        handleClose();
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <TableContainer
        style={{
          overflow: "hidden",
          backgroundColor: "transparent",
          minWidth: "800px",
        }}
      >
        <ToastContainer />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <div className="font-poppins text-white font-bold">Buyer</div>
              </TableCell>
              <TableCell>
                <div className="font-poppins text-white font-bold">Gig</div>
              </TableCell>
              <TableCell>
                <div className="font-poppins text-white font-bold">Due On</div>
              </TableCell>
              <TableCell>
                <div className="font-poppins text-white font-bold">Total</div>
              </TableCell>
              <TableCell>
                <div className="font-poppins text-white font-bold">Notes</div>
              </TableCell>
              <TableCell>
                <div className="font-poppins text-white font-bold">Status</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              const packageDetails = item.package
                ? JSON.parse(item.package)
                : {};
              const price = packageDetails.price || 0;
              const delivery = packageDetails.delivery || "4-7 Days";
              const maxDays = parseInt(delivery.split("-")[1]) || "";
              const dueDate = moment()
                .add(maxDays, "days")
                .format("DD MMM, YYYY");

              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-x-2">
                      <Avatar
                        src={item?.buyerId?.profileImage}
                        alt="Avatar"
                        sx={{ width: 48, height: 48 }}
                      />
                      <div className="text-white font-poppins font-bold">
                        {item?.buyerId?.username}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-3 w-[220px]">
                      <img
                        src={item?.gigImage}
                        alt="Gig"
                        style={{
                          width: "100px",
                          height: "60px",
                          borderRadius: "8px",
                        }}
                      />
                      <div className="flex flex-col gap-y-2">
                        <div className="font-bold text-white truncate max-w-[200px]">
                          {item?.serviceId?.title}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {item?.serviceId?.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                    {dueDate}
                  </TableCell>
                  <TableCell style={{ color: "#e91e63", fontWeight: "bold" }}>
                    ${price}
                  </TableCell>
                  <TableCell align="center">
                    <TooltipBtn />
                  </TableCell>
                  <TableCell>
                    {item.status === "Pending" ? (
                      <>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#f3e5f5",
                            color: "#6a1b9a",
                            borderRadius: "20px",
                            padding: "5px 20px",
                            fontWeight: "bold",
                          }}
                          onClick={(event) =>
                            handlePendingClick(event, item._id)
                          }
                        >
                          Pending
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          {!isUser ? (
                            <MenuItem
                              onClick={() => handleStatusChange("Active")}
                            >
                              Active
                            </MenuItem>
                          ) : null}
                          <MenuItem
                            onClick={() => handleStatusChange("Cancelled")}
                          >
                            Cancel
                          </MenuItem>
                        </Menu>
                      </>
                    ) : item.status === "Active" ? (
                      <>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#1E88E5",
                            color: "#FFFFFF",
                            borderRadius: "20px",
                            padding: "5px 20px",
                            fontWeight: "bold",
                          }}
                          onClick={(event) =>
                            handlePendingClick(event, item._id)
                          }
                        >
                          Active
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          {!isUser ? (
                            <MenuItem
                              onClick={() => handleStatusChange("Delivered")}
                            >
                              Delivered
                            </MenuItem>
                          ) : null}
                          <MenuItem
                            onClick={() => handleStatusChange("Cancelled")}
                          >
                            Cancel
                          </MenuItem>
                        </Menu>
                      </>
                    ) : item.status === "Delivered" ? (
                      <>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            borderRadius: "20px",
                            padding: "5px 20px",
                            fontWeight: "bold",
                          }}
                          onClick={(event) =>
                            handlePendingClick(event, item._id)
                          }
                          disabled={isSeller}
                        >
                          Delivered
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem
                            onClick={() => handleStatusChange("Completed")}
                          >
                            Completed
                          </MenuItem>
                        </Menu>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor:
                            item.status === "Completed"
                              ? "#2E7D32"
                              : item.status === "Cancelled"
                              ? "#F44336"
                              : "#F44336",
                          color: "#fff",
                          borderRadius: "20px",
                          padding: "5px 20px",
                          fontWeight: "bold",
                        }}
                        disabled={isSeller}
                      >
                        {item.status}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderTable;
