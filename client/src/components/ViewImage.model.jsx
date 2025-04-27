import React from 'react';
import { ImCross } from "react-icons/im";

const ViewImageModel = ({url,name,setCloseModel}) => {
  console.log(url,name,"ata")
  return (
    <>
      {/* Background Overlay */}
      <div className='fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-[#bebebea4] flex items-center justify-center z-50'>
        
        {/* Image Container */}
        <div className='bg-white p-4 rounded shadow-lg flex flex-col items-center justify-center'>
          <nav className=' flex items-center pb-2 justify-between w-[90%] h-[10%]'>
            <p>{name||"N/A"}</p>
            <div className='hover:text-lg cursor-pointer' onClick={()=>setCloseModel(null)}><ImCross /></div>
          </nav>
          {/* Centered Image */}
          <img 
            src={url} 
            alt="sub category" 
            className='max-w-[40vw] max-h-[80vh] object-contain rounded bg-[#bebebea4] pt-2'
          />
          
        </div>

      </div>
    </>
  );
};

export default ViewImageModel;
