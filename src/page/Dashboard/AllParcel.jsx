import { useQuery } from "@tanstack/react-query";
import React from "react";
import useData from "../../allHooks/useData";
import useAxious from "../../allHooks/useAxious";
import { FaEdit } from "react-icons/fa";
import { FaMagnifyingGlass, FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function AllParcel() {
  const { user } = useData();
  const axious = useAxious();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcel", user?.email],
    queryFn: async () => {
      const res = await axious.get(`/parcel?email=${user.email}`);
      return res.data;
    },
  });
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axious.delete(`/parcel/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>SenderEmail</th>
              <th>Payment status</th>
              <th>createdAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels &&
              parcels.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <th>{item._id}</th>
                  <td>{item.senderEmail}</td>
                  <td>
                    {item.payment_status === "paid" ? (
                      <span className="text-green-400">Paid</span>
                    ) : (
                      <Link to={`/dashBoard/payment/${item._id}`}>
                        <button className="btn btn-success">Pay</button>
                      </Link>
                    )}
                  </td>
                  <td>{item.createdAt}</td>
                  <td>
                    <button className="p-4 rounded-md hover:bg-red-500">
                      <FaEdit />
                    </button>
                    <button className="p-4 rounded-md hover:bg-red-500 m-3">
                      <FaMagnifyingGlass />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-4 rounded-md hover:bg-red-500"
                    >
                      <FaRegTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
