import Image from "next/image";
import React, { useEffect, useState } from "react";
import button from "../../assets/radio-button.svg";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Race from "@/components/Race";
import { useRouter } from "next/router";

const index = () => {
  const data = useSelector((state: RootState) => state.data.value);
  console.log(data);
  const [selector, setSelector] = useState('one');
  const router = useRouter();
  
  useEffect(() => {
    if (data === null) {
      router.push('/testing');
    }
  }, [data, router]);

  return (
    <div className="h-screen md:h-[90vh] flex flex-col md:mt-5">
      <main className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
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
              <div className={`p-3 cursor-pointer  ${selector === 'one' ? 'bg-[#1A1B1C] text-white hover:bg-black' : 'bg-[#F3F3F4]'}  flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t`} onClick={() => setSelector('one')}>
                <p className="text-base font-semibold">White</p>
                <h4 className="text-base font-semibold mb-1">RACE</h4>
              </div>
              <div className={`p-3 cursor-pointer  ${selector === 'two' ? 'bg-[#1A1B1C] text-white hover:bg-black' : 'bg-[#F3F3F4]'} flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t`} onClick={() => setSelector('two')}>
                <p className="text-base font-semibold">50-59</p>
                <h4 className="text-base font-semibold mb-1">AGE</h4>
              </div>
              <div className={`p-3 cursor-pointer  ${selector === 'three' ? 'bg-[#1A1B1C] text-white hover:bg-black' : 'bg-[#F3F3F4]'} flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t`} onClick={() => setSelector('three')}>
                <p className="text-base font-semibold">MALE</p>
                <h4 className="text-base font-semibold mb-1">SEX</h4>
              </div>
            </div>
            { selector === 'one' && <Race />}
            { selector === 'two' && <Race />}
            { selector === 'three' && <Race />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default index;
