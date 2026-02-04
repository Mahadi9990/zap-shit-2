import React from "react";
import Logo from "../components/Logo";
import { Outlet } from "react-router-dom";
import image from '../assets/authImage.png'

const AuthLayout = () => {
  return (
    <div className="">
      <Logo className='text-4xl font-bold' />
      <div className="flex justify-evenly items-center my-6">
        <div className="">
            <img src={image} alt="" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
