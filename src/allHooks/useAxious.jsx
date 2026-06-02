import axios from "axios";
import React, { useEffect } from "react";
import useData from "./useData";
import { useNavigate } from "react-router-dom";

const axious = axios.create({
  baseURL: "http://localhost:3000",
  //   timeout: 1000,
  //   headers: {'X-Custom-Header': 'foobar'}
});
const useAxious = () => {
  const { user, singOutUser } = useData();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = axious.interceptors.request.use((config) => {
      // Do something before request is sent
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
    const responseInterceptor = axious.interceptors.response.use(
      (config) => {
        // Do something before request is sent
        return config;
      },
      (error) => {
        const statusCode = error.response.status;
        if (statusCode === 401 || statusCode === 403) {
          singOutUser().then(() => navigate("/login"));
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axious.interceptors.request.eject(requestInterceptor);

      axious.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, singOutUser]);
  return axious;
};

export default useAxious;
