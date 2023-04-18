import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AccountContext } from './AccountContext';



export const PrivateRoute = () => {

  let token = localStorage.getItem("token")
    
  return token ? <Outlet/> : <Navigate to="/login"/>
}
