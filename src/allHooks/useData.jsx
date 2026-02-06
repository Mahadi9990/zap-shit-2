// import { useContext } from 'react';
// import AuthProvider from '../context/AuthProvider';

// const useData = () => {
//     const authInfo =useContext(AuthProvider)
//     return authInfo;
// };

// export default useData;

import { use } from "react";
import { AuthContext } from "../context/AuthContext";

const useData = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useData;