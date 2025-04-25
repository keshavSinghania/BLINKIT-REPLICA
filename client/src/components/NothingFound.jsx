import React from 'react'
import logo from "../../src/assets/not-found-cat.png"
const NothingFound = ({ text }) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center h-[73vh] w-[85vw]'>
                <img src={logo} alt="not found" />
                {text ? text : ""}
            </div>
        </>
    )
}

export default NothingFound