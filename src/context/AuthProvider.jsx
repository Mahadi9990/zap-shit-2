import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
function AuthProvider({ children }) {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);
  const registerUserData = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const singInUserData = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };
  const updateProfileImage = (data) => {
    return updateProfile(auth.currentUser,data);
  };
  const singOutUser = () => {
    return signOut(auth);
  };
  useEffect(() => {
      const unScribe = onAuthStateChanged(auth,(currentUser) =>{
        setuser(currentUser)
        setloading(false);
      })
      return ()=> unScribe()
  }, []);
  const userInfo = {
    updateProfileImage,
    registerUserData,
    singInUserData,
    googleSignIn,
    singOutUser,
    user,
    loading,
    setloading,
    setuser
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
}

export default AuthProvider;
