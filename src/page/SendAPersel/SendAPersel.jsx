import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";

const SendAPersel = () => {
  const districtData = useLoaderData();
  const regions = districtData.map((i) => i.region);
  const { register, handleSubmit, watch } = useForm();
  const uniqueRegion = [...new Set(regions)];
  const selectedRegion = watch("region");
  const selectedResiveRegion = watch("ResiveRegion");
  const getDistrictsByRegion = (oneRegions) => {
    const allResions = districtData.filter(
      (item) => item.region === oneRegions,
    );
    const allDistricts = allResions.map((item) => item.district);
    return allDistricts;
  };
  const handleFormSubmit = (data) => {
    console.log(data);
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
            />
          </fieldset>
          <fieldset className="fieldset ">
            <label className="label">Parcel weight</label>
            <input
              type="number"
              className="input w-full"
              placeholder="parcel weight"
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
                  <legend className="fieldset-legend  ">select region</legend>
                  <select
                    defaultValue="Peak a region"
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
                    defaultValue="Peck a district"
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
                  <legend className="fieldset-legend  ">select Resive Region</legend>
                  <select
                    defaultValue="Peak a region"
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
                    defaultValue="Peck a district"
                    className="select w-full"
                    {...register("ResiveDistrict")}
                  >
                    <option disabled={true}>Peck a district</option>
                    {getDistrictsByRegion(selectedResiveRegion).map((district) => (
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
          value="Send Parcel"
          type="submit"
        />
      </form>
    </div>
  );
};

export default SendAPersel;
