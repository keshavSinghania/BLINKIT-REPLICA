import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../utils/fetchProducts';

function Products() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimits] = useState(14);
  const [search, setSearch] = useState("");

  //function to get data of products from database
  const getProductsData = async () => {
    const finalData = await fetchProducts(page, limit, search);
    setData(finalData.data);
  }


  useEffect(() => {
    getProductsData();
  }, [page])

  return (
    <div className='w-[85vw] h-[80vh]'>
      {/* Top Navbar */}
      <nav className='w-[85vw] h-[7vh] shadow flex items-center justify-between'>
        <p className="text-lg font-semibold">Products</p>
        <search className='border-yellow-300 border-2 rounded p-2 text-gray-600 hover:bg-amber-300 hover:text-black mr-[1vw]'>
          Search Products here
        </search>
      </nav>

      {/* DISPLAY PRODUCTS HERE */}
      <section className='w-[85vw] h-[calc(73vh-6vh)] bg-[#EDF6FF] '>
        <div className='grid grid-cols-7 p-2 '>
          {
            Object.values(data?.map((product, index) => (
              <div key={index} className='bg-[#ffffff] rounded-lg w-[11vw] h-[16.5vw] m-1 scale-[0.9]'>
                {/* IMAGE */}
                <div className="w-[65%] h-[65%] m-auto p-auto flex items-center mb-0 pb-0 justify-center">
                  <img src={product.image[0]} alt={product.name} />
                </div>
                {/* NAME AND UNIT */}
                <div className='w-[100%] h-[35%] p-2 overflow-hidden m-auto p-auto display items-center justify-center '>
                  <p className='text-sm'>{product.name}</p>
                  <p className="text-sm text-[#767676]">Unit : {product.unit}</p>
                </div>
              </div>
            )))
          }
        </div>
      </section>
      {/* NEXT PAGE PREV PAGE TOTAL PAGE COUNT  */}
      <footer className='w-[85vw] h-[5vh] shadow flex items-center justify-between p-5  '>
        <button
          onClick={() => {if(page!==1) setPage((prev) => prev - 1)}}
          className='bg:transparent text-black hover:bg-amber-300 p-1 border-1 border-amber-300 rounded'>
          Previous
        </button>
        <p>{page}/2</p>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className='bg:transparent text-black hover:bg-amber-300 p-1 border-1 border-amber-300 rounded'>
          Next
        </button>
      </footer>
    </div>
  )
}

export default Products