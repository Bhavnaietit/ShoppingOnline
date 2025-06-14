import React from 'react'
import {assets} from '../assets/assets'
import { toast } from 'react-toastify';
const Navbar = ({ token, setToken }) => {
  console.log(token)
  return (
      <div className='flex items-center py-2 px-[4%] justify-between'>
          <img src={assets.logo} className='w-[max(10%,140px)]'></img>
       <button className='bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full cursor-pointer' onClick={() => {
        setToken('');
        toast.success('you are logout!')
      }}>logout</button>
    </div> 
  )
}

export default Navbar