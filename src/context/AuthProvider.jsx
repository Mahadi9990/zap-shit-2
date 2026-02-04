import React from 'react';
import { AuthContext } from './AuthContext';

function AuthProvider(props) {
    const userInfo ={

    }
    return (
        <AuthContext value={userInfo}>
            {props}
        </AuthContext>
    );
}

export default AuthProvider;

