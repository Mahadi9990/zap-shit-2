import React from 'react';
import { AuthContext } from './AuthContext';
import {auth} from '../firebase/firebase.config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();
function AuthProvider({children}) {

    const registerUserData = (email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const singInUser = (email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSingIn =()=>{
        return signInWithPopup(auth, provider)
    }
    const userInfo ={
        registerUserData,
        singInUser,
        googleSingIn
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
}

export default AuthProvider;

