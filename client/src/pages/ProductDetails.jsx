import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductsById } from '../utils/fetchProductById'
import LoadingPage from '../components/LoadingPage.jsx'
const ProductDetails = () => {
  const [loading, setLoading] = useState(true)
  const param = useParams()
  const _id = param._id
  const productName = param.productName
  const [productDetails, setProductDetails] = useState({})
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await fetchProductsById(_id)
        setProductDetails(response.data)
        console.log(response.data)
        setMainImage(response.data?.image[0])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [_id])

  return (
    <>
      {loading ? (
        <LoadingPage message="Loading product..." />
      ) : (
        <section className='w-full min-h-screen bg-[#EFF6FF] px-4'>
          <div className='max-w-8xl mx-auto flex flex-col md:flex-row bg-white overflow-hidden'>
            {/* Left section - Images */}
            <div className='w-full md:w-1/2 p-2 bg-[#EFF6FF] flex flex-col gap-6'>
              {/* Main Image */}
              <div className='w-full h-[600px] flex items-center justify-center bg-white rounded'>
                <img src={mainImage} alt="Main product" className='max-h-[90%] max-w-[90%] object-contain' />
              </div>

              {/* Thumbnails */}
              <div className='flex  gap-4 justify-center'>
                {productDetails?.image?.map((img, index) => (
                  <div key={index} className='flex flex-col items-center gap-1 cursor-pointer' onClick={() => setMainImage(img)}>
                    <div className='w-20 h-20 border rounded overflow-hidden flex items-center justify-center bg-white shadow-sm'>
                      <img src={img} alt={`thumb-${index}`} className='w-full h-full object-cover' />
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className='mb-4'>
                <h3 className='text-lg font-semibold'>Description</h3>
                <p className='text-gray-700'>{productDetails?.description}</p>
              </div>

              {/* Unit */}
              <div className='mb-4'>
                <h3 className='text-lg font-semibold'>Unit</h3>
                <p className='text-gray-700'>{productDetails?.unit}</p>
              </div>
            </div>

            {/* Right section - Product Details */}
            <div className='w-full md:w-1/2 p-2 bg-[#EFF6FF]'>

              {/* Delivery time */}
              <button className='bg-green-300 rounded-2xl p-1 m-4 ml-0'>10 Min</button>
              <h2 className='text-3xl font-bold text-[#313131] mb-4'>{productName}</h2>

              {/* Unit */}
              <div className='mb-4 flex gap-2 border-b-[#e6e6e6] border-b-1 pb-2'>
                <h3 className='text-lg font-semibold'>Unit</h3>
                <h3 className='text-gray-700 text-lg font-semibold'>{productDetails?.unit}</h3>
              </div>

              {/* Price */}
              <div>
                <div><h3 className='text-lg pb-1'>Price</h3></div>
                <div className='flex gap-4'>
                  <button className='flex gap-1 border-green-500 pb-2 pt-2 pl-5 pr-5 bg-green-100 rounded font-bold text-lg border-1 text-[#313131]'><h2> ₹ {(productDetails?.price * (1 - productDetails?.discount / 100)).toFixed(2)}</h2></button>
                  <div className='flex gap-1 rounded font-bold text-lg pt-2  text-[#313131]'><h2 className='line-through'> ₹ {productDetails?.price}</h2></div>
                  <div className='flex gap-1 rounded font-bold text-lg pt-2  text-[#313131]'><h2 className='text-green-600'>{productDetails?.discount}%</h2><h2 className='text-gray-500'>Discount</h2></div>
                </div>
              </div>

              {/* Add button */}
              <div>
                <button className='bg-[#16A34A] text-white font-bold pb-1.5 pt-1.5 pl-4 pr-4 rounded-lg m-4 ml-0 hover:bg-[#15803D]'>Add</button>
              </div>

              {/* why us */}
                      <div>
                        <h2 className='font-bold text-[#343434] text-lg'>Why shop from blinkit?</h2>
                      <div className="flex items-center gap-4 my-4">
                        <img src="/src/assets/productViewImg1.png" alt="superfast delivery" className="w-20 h-20" />
                        <div className="text-sm">
                        <div className="font-semibold">Superfast Delivery</div>
                        <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 my-4">
                        <img src="/src/assets/productViewImg2.png" alt="Best prices offers" className="w-20 h-20" />
                        <div className="text-sm">
                        <div className="font-semibold">Best Prices &amp; Offers</div>
                        <p>Best price destination with offers directly from the manufacturers.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 my-4">
                        <img src="/src/assets/productViewImg2.png" alt="Wide Assortment" className="w-20 h-20" />
                        <div className="text-sm">
                        <div className="font-semibold">Wide Assortment</div>
                        <p>Choose from 5000+ products across food, personal care, household &amp; other categories.</p>
                        </div>
                      </div>
                      </div>

                      {/* Description */}
              <div className='mb-4'>
                <h3 className='text-lg font-semibold'>Description</h3>
                <p className='text-gray-700'>{productDetails?.description}</p>
              </div>

              {/* Unit */}
              <div className='mb-4'>
                <h3 className='text-lg font-semibold'>Unit</h3>
                <p className='text-gray-700'>{productDetails?.unit}</p>
              </div>

              {/* Add other details here like price, brand, etc. if needed */}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetails
