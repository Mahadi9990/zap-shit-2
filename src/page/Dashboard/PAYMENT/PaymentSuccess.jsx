import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxious from "../../../allHooks/useAxious";

const PaymentSuccess = () => {
  const [serchParams] = useSearchParams();
  const sessionId = serchParams.get("session_id");
  const [paymentInfo, setpaymentInfo] = useState(null);
  const axios = useAxious();
  useEffect(() => {
    if (sessionId) {
      axios.patch(`/payment-success?session_id=${sessionId}` ).then((res) => {
        setpaymentInfo({
          trackingId: res.data.trackingId,
          paymentId: res.data.paymentId,
        });
      });
    }
  }, [sessionId, axios,paymentInfo]);
  return (
    <div>
      <h1>Payment Success</h1>

      <h2>trackingId ID: {paymentInfo?.trackingId}</h2>

      <h2>paymentId ID: {paymentInfo?.paymentId}</h2>
    </div>
  );
};

export default PaymentSuccess;
