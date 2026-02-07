import React from 'react';
import useData from '../allHooks/useData';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({children}) {
const {loading,user} =useData()
const location =useLocation()
if(loading){
    <span>Loading....</span>
}
if(!user){
    return <Navigate to="/login" state={ location.pathname } />
}
    return children
}

export default PrivateRoute;