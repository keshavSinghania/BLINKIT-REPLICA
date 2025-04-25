import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

 const LoadingPage= ({message})=> {
    return (
        <div className='absolute top-0 left-0 bg-[#c5c1c173] bg-opacity-50 z-50 flex justify-center items-center w-[100vw] h-[100vh]'>
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