import Image from "next/image";
import { Inter } from "next/font/google";
import button1 from "../assets/button-home.png";
import Link from "next/link";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useEffect, useState } from "react";

gsap.registerPlugin(CustomEase);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    gsap.fromTo(
      "#main-title",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      },
    );
  }, []);

  useEffect(() => {
    if (hovered === 'left') {
      gsap.to("#main-heading", { x: 300 })
    }
    else if (hovered === 'right') {
      gsap.to("#main-heading", { x: -300 })
    }
    else {
      gsap.to("#main-heading", { x: 0 })
    }
  },[hovered])

  return (
    <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
      <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[420px] h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>
        <div id="main-heading" className="relative z-10 text-center">
          <h1
            id="main-title"
            className={`text-[60px] text-[#1A1B1C] lg:text-[100px] font-inter font-normal tracking-tighter leading-none opacity-0 transition-all duration-300 ease-in-out ${hovered === 'left' && 'text-right'} ${hovered === 'right' && 'text-left'}`}
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate(0px, 0px)",
            }}
          >
            Sophisticated
            <br />
            <span
              className="block text-[#1A1B1C]"
              style={{ translate: "none", rotate: "none", scale: "none" }}
            >
              skincare
            </span>
          </h1>
        </div>
        <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>
        <div className="z-10 mt-4 lg:hidden">
          <Link href="/testing">
            <button className="relative flex items-center gap-4 hover:scale-105 duration-300">
              <span className="text-[12px] font-bold cursor-pointer">
                ENTER EXPERIENCE
              </span>
              <Image
                src={button1}
                height={24}
                width={24}
                alt="experience-button"
              />
            </button>
          </Link>
        </div>
        <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>=1920px)]:left-[calc(-33vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
          <p>
            Skinstric developed an A.I. that creates a
            <br />
            highly-personalized routine tailored to
            <br />
            what your skin needs.
          </p>
        </div>
        <div
          id="left-section"
          className={`hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-500 ease-in-out ${hovered === 'right' ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>
            <button
              id="discover-button"
              className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 [@media(width>=1920px)]:translate-x-1/20 px-3 py-1"
              onMouseEnter={() => setHovered("left")}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 duration-300"></div>
              <span className="absolute left-[18px] top-[8px] scale-[0.9] rotate-180 group-hover:scale-105 duration-300">
                ▶
              </span>
              <span>DISCOVER A.I.</span>
            </button>
          </div>
        </div>
        <div id="right-section" className={`hidden lg:block fixed top-1/2 right-[calc(-53vw)] xl:right-[calc(-50vw)] -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-500 ease-in-out ${hovered === 'left' ? 'opacity-0' : 'opacity-100'}`}>
        <div className='relative w-full h-full'>
          <div className='w-full h-full border border-dotted border-[#A0A4AB] rotate-45 absolute inset-0'></div>
          <Link href='/testing'>
           <button id="take-test-button" className='group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 xl:-translate-x-1/6 [@media(width>=1920px)]:-translate-x-1/20 px-3 py-1' onMouseEnter={() => setHovered("right")} onMouseLeave={() => setHovered(null)}>
           <span>TAKE TEST</span>
           <div className='w-[30px] h-[30px] border border-solid border-black rotate-45 group-hover:scale-110 duration-300'></div>
           <span className='absolute left-[107px] top-[9px] scale-[0.9] cursor-pointer group-hover:scale-105 duration-300'>▶</span>
           </button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
