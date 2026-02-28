import Image from "next/image";
import { Inter } from "next/font/google";
import button1 from '../assets/button-home.png'
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
      <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[420px] h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>
      <div id="main-heading" className='relative z-10 text-center'>
        <h1 className='text-[60px] text-[#1A1B1C] lg:text-[100px] font-inter font-normal tracking-tighter leading-none' style={{opacity: 1, translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)'}}>
          Sophisticated 
          <br />
          <span className='block text-[#1A1B1C]' style={{translate: 'none', rotate: 'none', scale: 'none'}}>skincare</span>
        </h1>
      </div>
      <p className='z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]'>Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.</p>
      <div className='z-10 mt-4 lg:hidden'>
        <Link href='/testing'>
        <button className='relative flex items-center gap-4 hover:scale-105 duration-300'>
          <span className='text-[12px] font-bold cursor-pointer'>ENTER EXPERIENCE</span>
          {/* <div className='w-[24px] h-[24px] border border-solid border-black rotate-45 cursor-pointer'></div> */}
          <Image src={button1} height={24} width={24} alt='experience-button'/>
        </button>
        </Link>
      </div>
      </div>
    </div>
  );
}
