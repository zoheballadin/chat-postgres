import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AccountContext } from './AccountContext';

const useAuth = () =>{
    const {currentUser} = useContext(AccountContext);
    return currentUser && currentUser.loggedIn
}

export const PrivateRoute = () => {
    const isAuth = useAuth()
  return isAuth ? <Outlet/> : <Navigate to="/login"/>
}
