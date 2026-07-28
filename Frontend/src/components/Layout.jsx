import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButtonHeader from './BackButtonHeader';


function Layout() {
  const location = useLocation();
const homepage = (location.pathname !== '/' && location.pathname !== '/rideresults' && location.pathname !== '/ridedetails');
  return (
    <>
       
         <Navbar/>
          {homepage && <BackButtonHeader />}
          <ToastContainer/>
         <Outlet/>        
         <Footer/>
    </>
  )
}

export default Layout;
