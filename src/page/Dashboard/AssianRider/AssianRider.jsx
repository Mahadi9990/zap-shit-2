import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxious from "../../../allHooks/useAxious";
import { FaEdit } from "react-icons/fa";

const AssianRider = () => {
  const axiousSecure = useAxious();
  const molelRef = useRef();
  const [selectedParcel, setselectedParcel] = useState(null);

  const { data: parcels = [] ,refetch : parcelRefetch } = useQuery({
    queryKey: ["parcels", "panding-pickup"],
    queryFn: async () => {
      const res = await axiousSecure.get(
        `/parcel?deliveryStatus=pnading-pickup`,
      );
      return res.data;
    },
  });

  const handleAssianRider = (item) => {
    setselectedParcel(item);
    molelRef.current.showModal();
  };
  
  const { data: availableRiders = [] } = useQuery({
    queryKey: ["singleRiders", selectedParcel?.district, "available"],
    enabled: !!selectedParcel?.district,
    queryFn: async () => {
      const res = await axiousSecure.get(
        `/riders?status=Approval&district=${selectedParcel?.district}&workStatus=available`,
      );
      return res.data;
    },
  });
  const handleAssianRiderSelected = (item) => {
    console.log(item)
    const riderInfo = {
      riderId: item._id,
      riderEmail: item.riderEmail,
      riderName: item.riderName,
    };
    axiousSecure.patch(`/parcel/${selectedParcel._id}/role`, riderInfo).then(res=>{
      if(res.data.modifiedCount > 0){
        molelRef.current.close()
        parcelRefetch()
      }
    });
  };

  return (
    <div>
      <h1>Assina riders : {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>parcel Id</th>
              <th>CoustomerEmail</th>
              <th>TrackingId</th>
              <th>PaymentId</th>
              <th>ResiveDistrict</th>
              <th>ResiveRegion</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((item, index) => (
              <tr key={index}>
                <th>{item._id}</th>
                <th>{item.senderEmail}</th>
                <td>{item.trackingId}</td>
                <td>{item.paymentId}</td>
                <td>{item.district}</td>
                <td>{item.region}</td>
                <td>{item.createdAt}</td>
                <td>
                  <button
                    onClick={() => handleAssianRider(item)}
                    className="p-4 btn-active text-black bg-amber-300 rounded-md hover:bg-green-500"
                  >
                    Assian Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog ref={molelRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <table>
              <thead>
                <tr>
                  <th>RiderEmail</th>
                  <th>PhoneNumber</th>
                  <th>RiderName</th>
                  <th>District</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {availableRiders.map((item, index) => (
                  <tr key={index}>
                    <th>{item.riderEmail}</th>
                    <th>{item.phoneNumber}</th>
                    <th>{item.riderName}</th>
                    <td>{item.district}</td>
                    <td>
                      <button
                        onClick={() => handleAssianRiderSelected(item)}
                        className="p-4 btn-active text-black bg-amber-300 rounded-md hover:bg-green-500"
                      >
                        Assian Rider
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary"
              onClick={() => molelRef.current.close()}
            >
              close
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AssianRider;
