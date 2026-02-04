import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submiteForm = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>login</h1>
      <div className="card-body">
        <form className="fieldset" onSubmit={handleSubmit(submiteForm)}>
          <label className="label">Email</label>
          <input
            name="email"
            {...register("email",{required:true})}
            type="email"
            className="input"
            placeholder="Email"
            
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 font-bold"> email in required</p>
          )}
          <label className="label">Password</label>
          <input
            name="password"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 font-bold"> password in required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 font-bold">
              This one enforces 1 uppercase, 1 lowercase, 1 number, 1 special
              character, plus a minimum length (you can change it).
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
