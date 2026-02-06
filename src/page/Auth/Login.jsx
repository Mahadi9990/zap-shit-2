import React from "react";
import { useForm } from "react-hook-form";
import useData from "../../allHooks/useData";
import Google from "../../components/Google";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const {singInUser} = useData()
  const submiteForm = (data) => {
    singInUser(data.email,data.password).then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
              character, plus a minimum length 8
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <Google/>
      </div>
    </div>
  );
};

export default Login;
