import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../utils/fetchProducts';

function Products() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit , setLimits] = useState(12);
  const [search, setSearch] = useState("");

  //function to get data of products from database
  const getProductsData = async ()=>{
    const finalData = await fetchProducts(page,limit,search);
    console.log("final",finalData)
  }
  getProductsData()

  return (
    <div>Products</div>
  )
}

export default Products