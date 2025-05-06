import React, { useState, useRef, useEffect } from 'react';
import { fetchProductsBySearch } from '../utils/fetchProductsBySearch.js';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingPage from "../components/LoadingPage.jsx";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef();
  const [productData, setProductData] = useState([]);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  const location = useLocation();
  const search = new URLSearchParams(location?.search).get("q")?.trim();

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setPage(1); // reset page
      const data = await fetchProductsBySearch(search || "", 1, limit);
      setProductData(data?.data || []);
      setTotalResult(data?.totalCount || 0);
      setIsLoading(false);
    };
    fetchInitialData();
  }, [search, limit]);


  //infinite scrolling
  useEffect(() => {
    if (page === 1) return;

    const fetchMoreData = async () => {
      setIsLoading(true);
      const data = await fetchProductsBySearch(search || "", page, limit);
      setProductData((prevData) => [...prevData, ...data?.data]);
      setIsLoading(false);
    };
    fetchMoreData();
  }, [page]);


  return (
    <div>
      <nav><h3>Search Results: {totalResult}</h3></nav>

      {/* Products display */}
      {isLoading && page === 1 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
          {new Array(12).fill(null).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow rounded p-4 flex flex-col items-center justify-between gap-6 animate-pulse"
            >
              <div className="bg-blue-100 w-full h-24 rounded"></div>
              <div className="bg-blue-100 w-1/2 h-3 rounded"></div>
              <div className="bg-blue-100 w-full h-3 rounded"></div>
              <div className="bg-blue-100 w-1/3 h-3 rounded"></div>
              <div className="w-full flex gap-2">
                <div className="w-1/2 bg-blue-100 h-3 rounded"></div>
                <div className="w-1/2 bg-blue-100 h-3 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={productData.length}
          next={() => setPage(prevPage => prevPage + 1)}
          hasMore={productData.length < totalResult}
          loader={() => setIsLoading(true)}
        >
          <div className="p-4">
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              ref={containerRef}
            >
              {productData.map((product, index) => (
                <div
                  key={product._id || index}
                  className="bg-white shadow hover:shadow-md rounded p-3 flex flex-col gap-1 cursor-pointer"
                >
                  <img
                    src={product.image[0]}
                    alt={product.title}
                    className="w-full h-32 object-contain rounded"
                  />
                  <div className="flex items-center gap-2 text-[0.65rem] mt-1">
                    <span className="bg-gray-100 text-black px-2 py-0.5 rounded-full">10 min</span>
                    {product.discount && (
                      <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                        {product.discount}% discount
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium line-clamp-3">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.unit || '1 Unit'}</p>
                  <p className="text-black font-bold">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </p>
                  <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SearchPage;
