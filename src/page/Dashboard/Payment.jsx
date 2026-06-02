import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import useAxious from "../../allHooks/useAxious";

const Payment = () => {
  const { paymentId } = useParams();
  const axious = useAxious();
  const { data: parcel = {} } = useQuery({
    queryKey: ["singlePayment", paymentId],
    queryFn: async () => {
      const res = await axious.get(`/parcel/${paymentId}`);
      return res.data;
    },
  });
  const handleClick = async () => {
    const paymentInfo = {
      parcel_name: parcel.parcel_name,
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
      parcel_Id: parcel._id,
    };
    const res = await axious.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };
  return ( 
    <div>
      <p>
        parcel name : {parcel.parcel_name} cost : {parcel.cost}
      </p>
      <button onClick={handleClick} className="btn btn-primary">
        Pay
      </button>
    </div>
  );
};

export default Payment;
