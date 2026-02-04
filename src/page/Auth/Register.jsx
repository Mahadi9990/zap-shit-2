import React from "react";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">User Name</label>
          <input type="password" className="input" placeholder="Your name" />
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </div>
    </div>
  );
};

export default Register;
