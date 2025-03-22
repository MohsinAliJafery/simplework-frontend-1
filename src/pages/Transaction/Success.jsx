import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import { transactionSuccess } from "../../Api_Requests/Api_Requests";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Success() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const transactionId = searchParams.get("transactionId");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Wallet Connected");

  const handleOrder = async () => {
    try {
      setIsLoading(true);
      const response = await transactionSuccess({
        transactionId: transactionId,
        orderId: orderId,
      });

      console.log(response);
      if (response.data.success) {
        toast.success("Order Created Successfully");
        setMessage(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setIsLoading(false);
      toast.error("An error occurred while creating the order.");
    }
  };

  useEffect(() => {
    if (transactionId && orderId) {
      handleOrder();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-900 flex flex-col px-[4%]  p-10 text-white">
      {isLoading ? (
        <h1 className="text-3xl font-bold mb-8 text-white">Loading</h1>
      ) : (
        <h1 className="text-3xl font-bold mb-8 text-green-500">{message}</h1>
      )}
    </div>
  );
}
