import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { transactionCancelled } from "../../Api_Requests/Api_Requests";

export default function Cancel() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const transactionId = searchParams.get("transactionId");
  const [isLoading, setIsLoading] = useState(false);

  const handleCancellation = async () => {
    try {
      setIsLoading(true);
      const response = await transactionCancelled({
        transactionId: transactionId,
        orderId: orderId,
      });

      console.log(response);
      if (response.data.success) {
        console.log(response);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setIsLoading(false);
      toast.error("An error occurred while creating the order.");
    }
  };

  useEffect(() => {
    handleCancellation();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-900 flex flex-col px-[4%]  p-10 text-white">
      {isLoading ? (
        <h1 className="text-3xl font-bold mb-8 text-white">Loading</h1>
      ) : (
        <h1 className="text-3xl font-bold mb-8 text-red-600">
          Transaction Unsuccessfull
        </h1>
      )}
    </div>
  );
}
