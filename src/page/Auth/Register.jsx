import React from "react";
import { useForm } from "react-hook-form";
import useData from "../../allHooks/useData";
import Google from "../../components/Google";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUserData } =useData()
  const registerSubmit = (data) => {
    console.log(data);

    // ✅ correct arguments
    registerUserData(data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <h1>Register</h1>

      <div className="card-body">
        <form onSubmit={handleSubmit(registerSubmit)} className="fieldset">

          {/* User Name */}
          <label className="label">User Name</label>
          <input
            {...register("userName", { required: true })}
            type="text"
            className="input"
            placeholder="Your name"
            name="userName"
          />
          {errors.userName && (
            <p className="text-red-500 font-bold">User name is required</p>
          )}

          {/* Email */}
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input"
            placeholder="Email"
            name="email"
          />
          {errors.email && (
            <p className="text-red-500 font-bold">Email is required</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: true,
              pattern: passwordRegex,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-500 font-bold">Password is required</p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-500 font-bold">
              Must contain 1 uppercase, 1 lowercase, 1 number, 1 special character
              and be at least 8 characters
            </p>
          )}

          <button className="btn btn-neutral mt-4">Register</button>
        </form>
        <Google/>
      </div>
    </div>
  );
};

export default Register;
