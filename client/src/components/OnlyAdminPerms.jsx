import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin';

const OnlyAdminPerms = ({children})=> {
    const userRole = useSelector(action=>action.user.role);
  return (
    <>
    {
        isAdmin(userRole) ? children : <p className='text-red-700 text-lg'>Access to this page is restricted to admin only.</p>
    }
    </>
  )
}

export default OnlyAdminPerms