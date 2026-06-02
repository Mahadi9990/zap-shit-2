import React from "react";
import useData from "./useData";
import { useQuery } from "@tanstack/react-query";
import useAxious from "./useAxious";

const useRole = () => {
  const { user } = useData();
  const axiousSecure = useAxious();
  const { isLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiousSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
  });
  return {
    role,
    isLoading,
  };
};

export default useRole;
