import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

 export const LoadingPage= ({message})=> {
    return (
        <div className='fixed inset-0 bg-[#c5c1c173] bg-opacity-50 z-50 flex justify-center items-center w-full h-full'>

            <div className='flex flex-col items-center justify-center text-black font-semibold text-2xl '>
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#FFC107"
                    ariaLabel="loading"
                    visible={true}
                />
                {message}
            </div>
        </div>
    )
}

export default LoadingPage