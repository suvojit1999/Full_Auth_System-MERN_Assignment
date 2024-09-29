import React, { useContext } from 'react'
import { userContext } from '../_context/userContext'
import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie';

const Navbar = () => {
    const {user, setUser, handelLogout} = useContext(userContext)
    const navigate = useNavigate(null)

    const handelLogin = () => {
        navigate('/signin')
    }
    const handelSignup = () => {
        navigate('/signup')
    }


    
  return (
    <div className='w-full'>
      {
        user ?
        <div className='w-full flex justify-end items-center  px-3 py-4'>
            <button className='px-4 py-1  bg-green-600 rounded-md text-white text-lg font-bold box-border' onClick={handelLogout}>Logout</button>
        </div>
        :
        <div className='w-full flex justify-end items-center px-3 py-4 gap-2'>
            <button className='px-4 py-1  bg-green-600 rounded-md text-white text-lg font-bold box-border' onClick={handelLogin}>Login</button>
            <button className='px-3 py-1  border-2 border-green-600 text-lg rounded-md text-green-600 font-bold box-border ' onClick={handelSignup}>Signup</button>
        </div>
      }
    </div>
  )
}

export default Navbar




