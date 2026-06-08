import React from "react";
import useData from "../../../allHooks/useData";
import { useQuery } from "@tanstack/react-query";
import useAxious from "../../../allHooks/useAxious";

const PaymentHistory = () => {
  const { user } = useData();
  const axious = useAxious();
  const { data: payments = [] } = useQuery({
    queryKey: ["pamyents", user?.email],
    queryFn: async () => {
      const res = await axious.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>length :{payments.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>CoustomerEmail</th>
              <th>Amount</th>
              <th>TrackingId</th>
              <th>PaymentId</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((item, index) => (
              <tr key={index}>
                <th>{item.coustomerEmail}</th>
                <td>{item.amount}</td>
                <td>{item.trackingId}</td>
                <td>{item.paymentId}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
