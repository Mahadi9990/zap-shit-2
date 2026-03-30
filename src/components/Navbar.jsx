import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useData from "../allHooks/useData";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const { user, singOutUser } = useData();
  const navigate = useNavigate();

  const handleSingOutUser = () => {
    singOutUser().then((res) => {
      console.log(res, "Log out successfully");
      navigate("/login");
    });
  };

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="about">About</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
    
      {user ? 
        <>
          <li>
            <NavLink to="/sendAPercel">Send-A-Percel</NavLink>
          </li>
          <li>
            <NavLink to="/beARider">Be-A-Rider</NavLink>
          </li>
          <li>
            <NavLink to="/dashBoard/allParcel">DashBoard</NavLink>
          </li>
        </>
       : 
        ""
      }
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="">
            <Logo/>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <button onClick={toggleTheme} className="btn btn-sm btn-outline">
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {user ? (
            <a onClick={handleSingOutUser} className="btn btn-success">
              SingOut
            </a>
          ) : (
            <Link to={"/login"} className="btn btn-success">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
