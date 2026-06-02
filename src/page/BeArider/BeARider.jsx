import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxious from "../../allHooks/useAxious";
import useData from "../../allHooks/useData";

const BeARider = () => {
  const { user } = useData();
  // const navigate = useNavigate();
  const sequareAxious = useAxious();
  const [towRiderError, settowRiderError] = useState(null);
  const districtData = useLoaderData();
  const regions = districtData.map((i) => i.region);
  const { register, handleSubmit, control } = useForm();
  const uniqueRegion = [...new Set(regions)];
  const selectedRegion = useWatch({ control, name: "region" });
  const getDistrictsByRegion = (oneRegions) => {
    const allResions = districtData.filter(
      (item) => item.region === oneRegions,
    );
    const allDistricts = allResions.map((item) => item.district);
    return allDistricts;
  };
  const handleFormSubmit = (data) => {
    console.log(data);
    
    Swal.fire({
      title: "Are you sure?",
      text: `You will be aggre to rider`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send",
    }).then((result) => {
      if (result.isConfirmed) {
        sequareAxious.post(`/riders`, data).then((res) => {
          console.log(res.data);
          if(res.data.message === 'rider alreay on database'){
            settowRiderError(res.data.message)
          }
          // navigate("/dashBoard/riderApprovial");
          Swal.fire({
            title: `${res.data.insertedId}`,
            text: "Your file has been Send.",
            icon: "success",
          });
        });
      }
    });
  };
  return (
    <div>
      <h1>Send parcel</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
        <div className="">
          <div className="grid sm:grid-cols-2 items-center gap-4">
            <div className="">
              <h1>Rider Details</h1>
              <fieldset className="fieldset ">
                <label className="label">RiderEmail</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="SenderEmail"
                  defaultValue={user.email}
                  {...register("riderEmail")}
                />
                <fieldset>
                  <label className="label">Phone number</label>

                  <input
                    type="text"
                    placeholder="Phone number"
                    className="input w-full"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                    })}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend  ">select region</legend>
                  <select
                    defaultValue=""
                    className="select w-full"
                    {...register("region")}
                  >
                    <option>Peak a region</option>
                    {uniqueRegion.map((i, index) => (
                      <option value={i} key={index}>
                        {i}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend  ">
                    select Districts
                  </legend>
                  <select
                    defaultValue=""
                    className="select w-full"
                    {...register("district")}
                  >
                    <option disabled={true}>Peck a district</option>
                    {getDistrictsByRegion(selectedRegion).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          className="btn btn-primary w-full"
          value="BeARider"
          type="submit"
        />
        {towRiderError ? <h1>{towRiderError}</h1> :""}
      </form>
    </div>
  );
};

export default BeARider;
