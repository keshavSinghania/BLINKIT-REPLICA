import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom"
const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const search = new URLSearchParams(location?.search).get("q")?.trim()
  const searchHandler = (e) => {
    const searchValue = e.target.value;
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
  }
  return (
    <>
      <div className='home flex justify-center items-center w-[60vw] rounded-md h-[6vh] border-1 border-gray-200 gap-1 shadow-md'>
        <IoSearch className='m-2' size={20} />
        <input onChange={searchHandler}   autoFocus type="text" placeholder='Search for atta daal and more...' className='w-[58vw] outline-none' />
      </div>
    </>
  )
}

export default Search