import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxious from "../../allHooks/useAxious";
import useData from "../../allHooks/useData";

const SendAPersel = () => {
  const { user } = useData();
  const navigate = useNavigate();
  const sequareAxious = useAxious();
  const districtData = useLoaderData();
  const regions = districtData.map((i) => i.region);
  const { register, handleSubmit, control } = useForm();
  const uniqueRegion = [...new Set(regions)];
  const selectedRegion = useWatch({ control, name: "region" });
  const selectedResiveRegion = useWatch({ control, name: "ResiveRegion" });
  const getDistrictsByRegion = (oneRegions) => {
    const allResions = districtData.filter(
      (item) => item.region === oneRegions,
    );
    const allDistricts = allResions.map((item) => item.district);
    return allDistricts;
  };
  const handleFormSubmit = (data) => {
    console.log(data);
    const docoument = data.parcelType === "document";
    const sameDistrict = data.district === data.ResiveDistrict;
    const parcelWeight = Number(data.parcelWeight || 0);
    let cost = 0;
    if (docoument) {
      cost = sameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = sameDistrict ? 110 : 130;
      } else {
        const minCharge = sameDistrict ? 110 : 130;
        const totalWeight = parcelWeight - 3;
        const addCharge = sameDistrict
          ? totalWeight * 40
          : totalWeight * 40 + 40;
        cost = minCharge + addCharge;
      }
    }
    data.cost = cost;
    Swal.fire({
      title: "Are you sure?",
      text: `You will be aggre with this ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send",
    }).then((result) => {
      if (result.isConfirmed) {
        sequareAxious.post("/parcel", data).then((res) => {
          console.log(res.data);
          navigate("/dashBoard/allParcel");
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
          <label className="label">
            <input
              {...register("parcelType")}
              type="radio"
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              {...register("parcelType")}
              type="radio"
              value="non-document"
              className="radio"
            />
            non-Document
          </label>
        </div>
        <div className="grid sm:grid-cols-2 items-center gap-4">
          <fieldset className="fieldset ">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Parcel name"
              {...register("parcel_name")}
            />
          </fieldset>
          <fieldset className="fieldset ">
            <label className="label">Parcel weight</label>
            <input
              type="number"
              className="input w-full"
              placeholder="parcel weight"
              {...register("parcelWeight")}
            />
          </fieldset>
        </div>
        <div className="">
          <div className="grid sm:grid-cols-2 items-center gap-4">
            <div className="">
              <h1>Sender Details</h1>
              <fieldset className="fieldset ">
                <label className="label">Parcel weight</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="SenderEmail"
                  defaultValue={user.email}
                  {...register("senderEmail")}
                />
                <label className="label">SenderEmail</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="parcel weight"
                />
                <label className="label">Parcel weight</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="parcel weight"
                />
                <label className="label">Parcel weight</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="parcel weight"
                />
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
            <div className="">
              <h1>Reciver Details</h1>
              <fieldset className="fieldset ">
                <label className="label">Parcel weight</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="parcel weight"
                />
                <label className="label">Parcel weight</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="parcel weight"
                />
                <label className="label">Parcel weight</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="parcel weight"
                />
                <label className="label">Parcel weight</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="parcel weight"
                />
                <fieldset className="fieldset">
                  <legend className="fieldset-legend  ">
                    select Resive Region
                  </legend>
                  <select
                    defaultValue=""
                    className="select w-full"
                    {...register("ResiveRegion")}
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
                    select Resive Districts
                  </legend>
                  <select
                    defaultValue=""
                    className="select w-full"
                    {...register("ResiveDistrict")}
                  >
                    <option disabled={true}>Peck a district</option>
                    {getDistrictsByRegion(selectedResiveRegion).map(
                      (district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ),
                    )}
                  </select>
                </fieldset>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          className="btn btn-primary w-full"
          value="Send Parcel"
          type="submit"
        />
      </form>
    </div>
  );
};

export default SendAPersel;
