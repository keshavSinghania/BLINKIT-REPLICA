import React, { useEffect, useRef, useState } from 'react';
import { fetchProductsByCategoryId } from '../utils/fetchProductsByCategoryId.js';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const ProductByCategoryId = ({ _id, name }) => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetchProductsByCategoryId(_id);
                setProductData(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [_id]);

    const handleScrollLeft = () => {
        containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const handleScrollRight = () => {
        containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <section className='relative'>
            {/* CATEGORY NAME */}
            <div className='flex items-center justify-between w-[98vw] font-bold text-lg p-2 m-4'>
                <p className='text-[#2b2b2b]'>{name}</p>
                <p className='text-green-600 cursor-pointer'>See All</p>
            </div>

            {/* CATEGORY PRODUCTS */}
            {loading ? (
                <div className='min-w-[100vw] h-[15vw] flex'>
                    {new Array(8).fill(null).map((_, index) => (
                        <div key={index} className="bg-white shadow rounded p-4 m-2 flex flex-col items-center justify-between gap-6 animate-pulse w-[12vw] h-[14vw]">
                            <div className='bg-blue-100 w-[90%] h-[30%] rounded'></div>
                            <div className='bg-blue-100 w-[45%] h-[10%] rounded'></div>
                            <div className='bg-blue-100 w-[90%] h-[10%] rounded'></div>
                            <div className='bg-blue-100 w-[30%] h-[10%] rounded'></div>
                            <div className='w-[90%] h-[10%] flex gap-2'>
                                <div className='w-[45%] bg-blue-100 rounded'></div>
                                <div className='w-[45%] bg-blue-100 rounded'></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='relative'>
                    {/* Scroll Buttons */}
                    <button
                        onClick={handleScrollLeft}
                        className='absolute left-2 top-[50%] transform -translate-y-1/2 z-10 w-[2.5vw] h-[2.5vw] bg-white shadow rounded-full flex items-center justify-center hover:bg-[#d7d7d7]'
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={handleScrollRight}
                        className='absolute right-2 top-[50%] transform -translate-y-1/2 z-10 w-[2.5vw] h-[2.5vw] bg-white shadow rounded-full flex items-center justify-center hover:bg-[#d7d7d7]'
                    >
                        <FaChevronRight />
                    </button>

                    {/* Products Container */}
                    <div className='min-w-[100vw] h-[22vw] flex no-scrollbar overflow-hidden relative' ref={containerRef}>

                        {productData.map((product, index) => (
                            <div
                                key={product._id || index}
                                onClick={() => navigate(`/product/${encodeURIComponent(product.name)}/${product._id}`)}
                                className="bg-white shadow hover:shadow-md rounded p-3 m-2 flex flex-col gap-1 min-w-[14vw] h-[20vw] cursor-pointer"
                            >
                                <img
                                    src={product.image[0]}
                                    alt={product.title}
                                    className="w-full h-[8vw] object-contain rounded"
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
            )}
        </section>
    );
};

export default ProductByCategoryId;
