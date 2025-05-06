import React, { useState } from 'react'
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';


 const App = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className='min-h-[80vh]'>
      <Outlet ></Outlet>
    </div>
    <Footer></Footer>
    </>
  )
}

export default App;
