import React from "react";
import { useForm } from "react-hook-form";
import useData from "../../allHooks/useData";
import Google from "../../components/Google";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxious from "../../allHooks/useAxious";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiousSecure = useAxious();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUserData, updateProfileImage } = useData();
  const registerSubmit = (data) => {
    console.log(data.photo[0]);
    const photoDataUrl = data.photo[0];

    // ✅ correct arguments
    registerUserData(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", photoDataUrl);
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagedb}`,
            formData,
          )
          .then((res) => {
            const photoUrl = res.data.data.url;

            const userInfo = {
              displayName: data.userName,
              email: data.email,
              photoURL: photoUrl,
            };
            // set user on database

            axiousSecure.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log("user created on database");
              }
            });

            // set iamge on firebase
            const userFromFile = {
              displayName: data.userName,
              photoURL: photoUrl,
            };
            updateProfileImage(userFromFile).then(() =>
              console.log("image uploaded"),
            );
          });
        navigate(location.state?.from || "/", {
          replace: true,
        });
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
          {/* Image file */}
          <label className="label">User Name</label>
          <input
            {...register("photo", { required: true })}
            type="file"
            className="file-input"
            name="photo"
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
              Must contain 1 uppercase, 1 lowercase, 1 number, 1 special
              character and be at least 8 characters
            </p>
          )}

          <button className="btn btn-neutral mt-4">Register</button>
        </form>
        <Google />
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            state={location?.state}
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
