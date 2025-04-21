import React from 'react'
import { BsCart3 } from "react-icons/bs";

export const Mycart = () => {
  return (
    <div className='bg-[#15803d] hover:bg-[#238015] w-[100px] h-[6vh] flex justify-center items-center rounded-sm text-white' >
        <BsCart3 /> My Cart
    </div>
  )
}
