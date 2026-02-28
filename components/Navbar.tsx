import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Intro from '../assets/location.png'

const Navbar = () => {
  return (
    <div className='flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-[1000]'>
        <div className='flex flex-row pt-1 scale-75 justify-center items-center'>
            <Link href='/' className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C] z-1000'>
            SKINSTRIC
            </Link>
            <Image src={Intro} loading='lazy' width={61} height={17} alt='intro-image' decoding="async" data-nimg="1" className="w-[61px] h-[17px]"/>
        </div>
        <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold  transition-colors text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]'>ENTER CODE</div>
    </div>
  )
}

export default Navbar