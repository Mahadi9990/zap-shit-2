import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router-dom";

const Coverage = () => {
  const position = [23.8103, 90.4125];
  const serviceCenterData = useLoaderData();
  const mapRef = useRef(null)
  const handleSubmit =(e)=>{
    e.preventDefault()
    const location = e.target.location.value

    const district =serviceCenterData.find(r=> r.district.toLowerCase().includes(location.toLowerCase()))
    if(district){
      const corrd = [district.latitude ,district.longitude]
      mapRef.current.flyTo(corrd,12)
    }
  }
  return (
    <div>
      <h1>Coverage</h1>
      <div className="my-6">
        <form onSubmit={handleSubmit}>
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
            <input name="location" type="search" className="grow" placeholder="Search" />
          </label>
            <button  className="btn btn-primary">Serach</button>
        </form>
      </div>
      <div className=" border-2 h-[800px]">
        <MapContainer
          className="h-[800px]"
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenterData.map((item) => (
            <Marker position={[item.latitude, item.longitude]}>
              <Popup>
                <strong>{item.district}</strong> <br />
                Service area: <h1>{item.covered_area}</h1>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
