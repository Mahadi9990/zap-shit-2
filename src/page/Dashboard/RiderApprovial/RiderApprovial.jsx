import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxious from "../../../allHooks/useAxious";
import { FaEdit } from "react-icons/fa";
import { FaMagnifyingGlass, FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const RiderApprovial = () => {
  const sequareAxious = useAxious();
  const { data: allRiders = [], refetch } = useQuery({
    queryKey: ["rider", "panding"],
    queryFn: async () => {
      const res = await sequareAxious.get(`/riders`);
      return res.data;
    },
  });
  const handleApproverl = async (item, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status} this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (result.isConfirmed) {
      try {
        const updataInfo = {
          status: status,
          email : item.riderEmail
        };
        const res = await sequareAxious.patch(
          `/riders/${item._id}`,
          updataInfo,
        );

        if (res.data.modifiedCount > 0) {
          refetch();

          Swal.fire({
            title: `${status}`,
            text: `Rider ${status} successfully`,
            icon: "success",
          });
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      }
    }
  };
  const handleDeleteRider = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Deleted",
    });

    if (result.isConfirmed) {
      try {

        const res = await sequareAxious.delete(
          `/riders/${id}`
          
        );

        if (res.data.deletedCount > 0) {
            Swal.fire({
                title: `Deleted`,
                text: `Rider Deleted successfully`,
                icon: "success",
            });
            refetch();
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      }
    }
  };


  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>status</th>
              <th>Actions</th>
              <th>Id</th>
              <th>RiderEmail</th>
              <th>phoneNumber</th>
              <th>District</th>
              <th>Region</th>
              <th>createdAt</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allRiders &&
              allRiders.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.status}</td>
                  <td>
                    <button
                      onClick={() => handleApproverl(item, "Approval")}
                      className="p-4 rounded-md hover:bg-red-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleApproverl(item, "Rejected")}
                      className="p-4 rounded-md hover:bg-red-500 m-3"
                    >
                      <FaMagnifyingGlass />
                    </button>
                    <button 
                    onClick={() => handleDeleteRider(item._id)}
                    className="p-4 rounded-md hover:bg-red-500">
                      <FaRegTrashCan />
                    </button>
                  </td>
                  <th>{item._id}</th>
                  <td>{item.riderEmail}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.region}</td>
                  <td>{item.district}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderApprovial;
