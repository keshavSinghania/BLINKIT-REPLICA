import React from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import isAdmin from "../utils/isAdmin.js"
export const MyAccount = () => {
  const name = useSelector((state)=>state.user.name)
  const userRole = useSelector((state)=>state.user.role);
  const userIsAdmin = isAdmin(userRole);
  return (
    <div className=' bg-white w-[15vw] min-h-[100%] shadow flex items-center flex-col overflow-y-hidden '>
      {/* box content */}
      <div className='flex justify-center flex-col w-[90%] min-h-[10vh] border-b-2 border-gray-300'>
        <p className='font-bold'>My Account <span>{userIsAdmin? "(Admin)":""}</span></p>
        <div className='flex items-center gap-1'>
          <p>{name}</p>
          <Link to="profile"><FaExternalLinkAlt size={13} /></Link>
        </div>
      </div>
      <div className='w-[100%] p-[1vw] text-gray-700 gap-1'>
        {userIsAdmin ? (<Link to="category"><p className='hover:bg-amber-300 rounded p-1'>Category</p></Link>):""}
        {userIsAdmin ? (<Link to="sub-category"><p className='hover:bg-amber-300 rounded p-1'>Sub Category</p></Link>):""}
        {userIsAdmin ? (<Link to="upload-products"><p className='hover:bg-amber-300 rounded p-1'>Upload Produts</p></Link>):""}
        {userIsAdmin ? (<Link to="products"><p className='hover:bg-amber-300 rounded p-1'>Products</p></Link>):""}

        <Link to="myorders"><p className='hover:bg-amber-300 rounded p-1'>My Orders</p></Link>
        <Link to="address"><p className='hover:bg-amber-300 rounded p-1'>Saved Address</p></Link>
        <Link to="/logout"><p className='hover:bg-amber-300 rounded p-1'>Log Out</p></Link>
      </div>
    </div>
  )
}
