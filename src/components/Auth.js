import React from 'react';
import { Navigate ,Outlet} from 'react-router-dom';

export const AuthRoute = () =>{
  const token = localStorage.getItem('userToken');
  console.log(token)
  return(
    <>
      {
        token?
        <Outlet/>
        :
        <Navigate to="/"/>
      }
    </>
  )
}

