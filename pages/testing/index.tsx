import React, { useEffect, useRef, useState } from "react";
import large from "../../assets/diamond-large.svg";
import medium from "../../assets/diamond-medium.svg";
import small from "../../assets/diamond-small.svg";
import Image from "next/image";
import { gsap } from "gsap";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";


const index = () => {
    const [step, setStep] = useState('one');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
  gsap.set("#diamondLarge", { rotation: 180 });
  gsap.set("#diamondMedium", { rotation: 185 });
  gsap.set("#diamondSmall", { rotation: 0 });

  gsap.to("#diamondLarge", { rotation: "+=360", duration: 50, repeat: -1, ease: "linear" });
  gsap.to("#diamondMedium", { rotation: "+=360", duration: 75, repeat: -1, ease: "linear" });
  gsap.to("#diamondSmall", { rotation: "+=360", duration: 85, repeat: -1, ease: "linear" });

}, []);

useEffect(() => {
gsap.to(".dot", {
  y: -10,
  duration: 0.4,
  stagger: {
    each: 0.15,
    repeat: -1,
    yoyo: true
  },
  ease: "power1.inOut"
});
},[loading])

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 'one' && name.trim()) {
        setStep('two');
        return
    }
    if (step === 'two' && name.trim()) {
        setLoading(true);
        try {
            const res = await fetch(
                "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, location }),
                }
            )
            const data = await res.json();
            console.log(data);
            console.log("SUCESSFULLY ADDED:", name, "from", location);
            localStorage.setItem("userData", JSON.stringify({ name, location }));
        } finally {
            setLoading(false)
            setStep('three')
        }
    }

}
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-16 left-9 text-left">
        <p className="font-semibold text-xs">TO START ANALYSIS</p>
      </div>
      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        {
            step === 'three'
            ?
            <div className='flex flex-col items-center gap-4 z-10'>
                <p className='text-2xl font-normal text-[#1A1B1C] tracking-wide'>Thank you!</p>
                <p className='text-lg text-gray-600'>Proceed for the next step</p>
            </div>
            :
        (
            loading
            ?
            <div className='relative z-10'>
                <p className='text-lg text-gray-500 mb-2'>Processing Submission</p>
                <div className='flex items-center justify-center space-x-4 py-8'>
                    <GoDotFill className='dot' />
                    <GoDotFill className='dot'/>
                    <GoDotFill className='dot'/>
                </div>
            </div>
            :
            <>
        <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
          CLICK TO TYPE
        </p>
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="flex flex-col items-center"></div>
          <input
            className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
            placeholder={step === 'one' ? "Introduce Yourself" : "Enter Your Location"}
            value={step === 'one' ? name : location}
            onChange={(e) => (step === 'one' ? setName(e.target.value) : setLocation(e.target.value))}
            type="text"
            autoComplete="off"
            disabled={loading}
          />
          <button type="submit" className="sr-only">
            Submit
          </button>
        </form>
        </>
  )}
        <Image
          src={large}
          alt="Diamond background"
          id='diamondLarge'
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             w-[480px] h-[480px] md:w-[762px] md:h-[762px] 
              rotate-180"
        />
        <Image
          src={medium}
          alt="Diamond background"
          id='diamondMedium'
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] rotate-185"
        />
        <Image
          src={small}
          alt="Diamond background"
          id='diamondSmall'
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px]"
        />
      </div>
      <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
        <Link href='/' className='inset-0'>
        <div>
            <div className='relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden'>
                <span className='rotate-[-45deg] text-xs font-semibold sm:hidden'>BACK</span>
            </div>
            <div className='group hidden sm:flex flex-row relative justify-center items-center'>
                <div className='w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300'></div>
                <span className='absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300'>▶</span>
                <span className='text-sm font-semibold hidden sm:block ml-6 '>BACK</span>
            </div>
        </div>
        </Link>
        {
            step === 'three'
            &&
            <Link href='/result' className='inline-block'>
                <div>
                    <div className='w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden'>
                        <span className='rotate-[-45deg] text-xs font-semibold sm:hidden'>PROCEED</span>
                    </div>
                    <div className='group hidden sm:flex flex-row relative justify-center items-center'>
                        <span className='text-sm font-semibold hidden sm:block mr-5'>PROCEED</span>
                        <div className='w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300'></div>
                        <span className='absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300'>▶</span>
                    </div>
                </div>
            </Link>
        }
      </div>
    </div>
  );
};

export default index;
