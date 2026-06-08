import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxious from "../../../allHooks/useAxious";
import { MdAdminPanelSettings } from "react-icons/md";
import { FiShieldOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { MdElectricBike } from "react-icons/md";
import Swal from "sweetalert2";
const UserManegment = () => {
  const axiousSecure = useAxious();
  const [inputSearch, setinputSearch] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", inputSearch],
    queryFn: async () => {
      const res = await axiousSecure.get(`/users?searchText=${inputSearch}`);
      console.log(res.data);
      return res.data;
    },
  });
  const handleAdminApprovial = (data, text) => {
    Swal.fire({
      title: "Are you sure?",
      text: `To make this user ${text}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Make him ${text}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateData = {
          role: text,
        };

        const res = await axiousSecure.patch(`/users/${data._id}`, updateData);

        if (res.data.modifiedCount > 0) {
          refetch();

          Swal.fire({
            title: "Success!",
            text: `User role changed to ${text}`,
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      <h1>users : {users.length}</h1>
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        
        <input onChange={e=>setinputSearch(e.target.value)} type="search" className="grow" placeholder="Search" />
      </label>
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Actions</th>
                <th>role</th>
                <th>email</th>
                <th>createdAt</th>
                <th>photoURL</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users &&
                users.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      {item.role === "admin" ? (
                        <button
                          onClick={() => handleAdminApprovial(item, "user")}
                          className=" pointer-coarse: p-4 text-2xl rounded-md hover:bg-red-500"
                        >
                          <FiShieldOff />
                        </button>
                      ) : item.role === "rider" ? (
                        <button className="bg-transparent btn-disabled p-4 text-2xl rounded-md hover:bg-blue-500">
                          <MdElectricBike />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAdminApprovial(item, "admin")}
                          className=" pointer-coarse: p-4 text-2xl rounded-md hover:bg-green-500"
                        >
                          <FaUserShield />
                        </button>
                      )}
                    </td>
                    <td>{item?.role}</td>
                    <td>{item.email}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <img
                        className="h-[30px] w-[30px] rounded-full object-cover"
                        src={item.photoURL || "https://via.placeholder.com/30"}
                        alt={item.name || "User"}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManegment;
