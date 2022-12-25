import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import { Outlet } from 'react-router-dom';

export default function MainLayout({userData,logOut}) {
  return (
   <>
   <NavBar userData={userData} logOut={logOut} />
   <Outlet></Outlet>
   </>
  )
}
