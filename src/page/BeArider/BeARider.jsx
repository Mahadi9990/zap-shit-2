import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxious from "../../allHooks/useAxious";
import useData from "../../allHooks/useData";

const BeARider = () => {
  const { user } = useData();
  // const navigate = useNavigate();
  const sequareAxious = useAxious();
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
        sequareAxious.post("/riders", data).then((res) => {
          if (res.data.message === "rider alreay on database") {
            Swal.fire({
              icon: "error",
              title: "Application Failed",
              text: res.data.message,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Application Submitted",
              text: "Your rider request has been sent successfully.",
            });
          }
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
                <fieldset className="btn-disabled">
                  <label className="label">RiderName</label>
                  <input
                    type="text"
                    className="input w-full "
                    placeholder="RiderName"
                    defaultValue={user.displayName}
                    {...register("riderName")}
                  />
                </fieldset>
                <fieldset className=" btn-disabled">
                  <label className="label">RiderEmail</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="SenderEmail"
                    defaultValue={user.email}
                    {...register("riderEmail")}
                  />
                </fieldset>
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
      </form>
    </div>
  );
};

export default BeARider;
