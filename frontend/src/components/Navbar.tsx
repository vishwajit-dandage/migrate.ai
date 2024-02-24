import Image from 'next/image'
import React from 'react'
import { FiAlignRight } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className='flex items-center justify-between w-full shadow-sm p-4'>
        {/* <Image src="/public/logoai" height={20} width={20} alt='img'/> */}
        <div className=' text-blue-400 font-serif'>migrate.ai</div>
        <FiAlignRight />
    </div>
  )
}

export default Navbar