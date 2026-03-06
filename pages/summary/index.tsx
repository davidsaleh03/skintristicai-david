import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { setSelectedGender } from '@/redux/genderSlice';
import { setSelectedRace } from '@/redux/raceSlice';
import { setSelectedAge } from '@/redux/ageSlice';
import button from '../../assets/button-simple.svg'
import Age from "@/components/Age";
import Gender from "@/components/Gender";
import Race from "@/components/Race";
import Link from "next/link";

const index = () => {
  const allData = useSelector((state: RootState) => state.data.value);
  console.log(allData);
  const [selector, setSelector] = useState("one");
  const router = useRouter();
  const selectedRace = useSelector((state: RootState) => state.race.selectedRace);
  const selectedGender = useSelector((state: RootState) => state.gender.selectedGender);
  const selectedAge = useSelector((state: RootState) => state.age.selectedAge);
  const dispatch = useDispatch();

  function capitalizeWord(word: any) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

  useEffect(() => {
    if (allData === null) {
      router.push("/testing");
    }
  }, [allData, router]);

  useEffect(() => {
        if (allData?.data?.gender) {
          const sorted = Object.entries(allData.data.gender)
            .sort((a, b) => Number(b[1]) - Number(a[1]));
      
          if (sorted.length > 0) {
            const [firstLabel, firstValue] = sorted[0];
      
            dispatch(setSelectedGender(firstLabel));
          }
        }
        if (allData?.data?.race) {
    const sorted = Object.entries(allData.data.race)
      .sort((a, b) => Number(b[1]) - Number(a[1]));

    if (sorted.length > 0) {
      const [firstLabel, firstValue] = sorted[0];

      dispatch(setSelectedRace(firstLabel));
    }
  }
  if (allData?.data?.age) {
                  const sorted = Object.entries(allData.data.age)
                    .sort((a, b) => Number(b[1]) - Number(a[1]));
              
                  if (sorted.length > 0) {
                    const [firstLabel, firstValue] = sorted[0];
              
                    dispatch(setSelectedAge(firstLabel));
                  }
                }
      }, [allData]);

if (!allData) {
  return null;
}
  return (
    <div className="h-screen md:h-[90vh] flex flex-col md:mt-5">
        <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
          <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
            <h2 className="text-base md:text-base font-semibold mb-1 leading-[24px]">
              A.I. ANALYSIS
            </h2>
            <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
              DEMOGRAPHICS
            </h3>
            <h4 className="text-sm mt-2 leading-[24px]">
              PREDICTED RACE & AGE
            </h4>
          </div>
          <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
            <div className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%]">
              <div
                className={`p-3 cursor-pointer  ${selector === "one" ? "bg-[#1A1B1C] text-white hover:bg-black" : "bg-[#F3F3F4]"}  flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t border-black`}
                onClick={() => setSelector("one")}
              >
                <p className="text-base font-semibold">{selectedRace && capitalizeWord(selectedRace)}</p>
                <h4 className="text-base font-semibold mb-1">RACE</h4>
              </div>
              <div
                className={`p-3 cursor-pointer  ${selector === "two" ? "bg-[#1A1B1C] text-white hover:bg-black" : "bg-[#F3F3F4]"} flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t border-black`}
                onClick={() => setSelector("two")}
              >
                <p className="text-base font-semibold">{selectedAge && capitalizeWord(selectedAge)}</p>
                <h4 className="text-base font-semibold mb-1">AGE</h4>
              </div>
              <div
                className={`p-3 cursor-pointer  ${selector === "three" ? "bg-[#1A1B1C] text-white hover:bg-black" : "bg-[#F3F3F4]"} flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t border-black`}
                onClick={() => setSelector("three")}
              >
                <p className="text-base font-semibold">{selectedGender && capitalizeWord(selectedGender)}</p>
                <h4 className="text-base font-semibold mb-1">SEX</h4>
              </div>
            </div>
            {selector === "one" && <Race allData={allData}/>}
            {selector === "three" && <Gender allData={allData}/>}
            {selector === "two" && <Age allData={allData}/>}
          </div>
        </div>
        <div className='pt-4 md:pt-[37px] pb-6 px-4 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16'>
            <div className='flex justify-between items-center max-w-full mx-auto px-4 md:px-0'>
                <Link href='/select'>
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
                <Link href='/'>
                <div className='transform hover:scale-110 transition duration-300 ease-in-out'>
                    <Image src={button} alt='button'/>
                </div>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default index;
