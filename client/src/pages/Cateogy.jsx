import React from 'react'
import UploadCategoryModel from '../components/UploadCategory.model'
import { useState } from 'react';

function Cateogy() {
  const [openModel, setOpenModel] = useState(true);
   
  return (
    <>
      <nav className='w-[85vw] h-[7vh] shadow flex items-center justify-between p-5 '>
          <p>Category</p>
          <button onClick={()=>setOpenModel(true)} className='border-yellow-300 border-2 rounded p-2 text-gray-600 hover:bg-amber-300 hover:text-black mr-[1vw]'>Add Category</button>
      </nav>
      <section>
        <UploadCategoryModel openModel={openModel} setOpenModel={setOpenModel}/>
      </section>
    </>
  )
}

export default Cateogy