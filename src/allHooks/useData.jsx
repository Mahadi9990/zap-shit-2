

import { use } from "react";
import { AuthContext } from "../context/AuthContext";

const useData = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useData;