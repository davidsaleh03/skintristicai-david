import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import button from "../assets/radio-button.svg";
import { setSelectedGender } from '@/redux/genderSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";


interface AgeProps {
  allData: {
    data: {
      gender: Record<string, number>;
    };
  };
}

const Gender: React.FC<AgeProps> = ({ allData }) => {
    const [color, setColor] = useState(0)
     const [percentage, setPercentage] = useState(84);
              const radius = 49.15;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (percentage / 100) * circumference;
              const selectedGender = useSelector((state: RootState) => state.gender.selectedGender);
              const dispatch = useDispatch();
            
              function capitalizeWord(word: any) {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            
            function toPercentage(decimal: any) {
            return Math.round(decimal * 100)
            }

     useEffect(() => {
      if (allData?.data?.gender) {
        const sorted = Object.entries(allData.data.gender)
          .sort((a, b) => Number(b[1]) - Number(a[1]));
    
        if (sorted.length > 0) {
          const [firstLabel, firstValue] = sorted[0];
    
          dispatch(setSelectedGender(firstLabel));
          setPercentage(Math.round(Number(firstValue) * 100));
        }
      }
    }, [allData]);
  return (
              <>
                <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
                  <p className="hidden md:block md:absolute text-[40px] mb-2 left-7 top-4">
                    {capitalizeWord(selectedGender)}
                  </p>
                  <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "384px",
                        position: "relative",
                        transform: "scale(1)",
                        transformOrigin: "center center",
                      }}
                    >
                      <svg
                        className="CircularProgressbar text-[#1A1B1C]"
                        viewBox="0 0 100 100"
                        data-test-id="CircularProgressbar"
                      >
                        <path
                          className="CircularProgressbar-trail"
                          d="
      M 50,50
      m 0,-49.15
      a 49.15,49.15 0 1 1 0,98.3
      a 49.15,49.15 0 1 1 0,-98.3
    "
                          strokeWidth="1.7"
                          fillOpacity="0"
                          style={{
                            stroke: "rgba(207, 207, 207, 1)",
                            strokeLinecap: "butt",
                            strokeDasharray: "308.819px, 308.819px",
                            strokeDashoffset: "0px",
                          }}
                        ></path>
                        <path
                          className="CircularProgressbar-path"
                          d="
      M 50,50
      m 0,-49.15
      a 49.15,49.15 0 1 1 0,98.3
      a 49.15,49.15 0 1 1 0,-98.3
    "
                          strokeWidth="1.7"
                          fillOpacity="0"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          style={{
                            stroke: "rgb(26, 27, 28)",
                            transition: "stroke-dashoffset 0.8s ease",
                          }}
                        ></path>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-3xl md:text-[40px] font-normal">
                          {percentage}
                          <span className="absolute text-xl md:text-3xl">
                            %
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                    If A.I. estimate is wrong, select the correct one.
                  </p>
                </div>
                <div className="bg-gray-100 pt-4 pb-4 md:border-t">
                  <div className="space-y-0">
                    <div className="flex justify-between px-4">
                      <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                        AGE
                      </h4>
                      <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                        A.I. CONFIDENCE
                      </h4>
                    </div>
                    {
  Object.entries(allData.data.gender)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .map(([label, value], index) => {
      return (
        <div
          key={index}
          className={`flex items-center justify-between h-[48px] px-4 cursor-pointer ${color === index ? 'bg-[#1A1B1C] text-white hover:bg-black' : 'hover:bg-[#E1E1E2]'}`}
          onClick={() => {
            dispatch(setSelectedGender(label));
            setPercentage(Math.round(Number(value) * 100));
            setColor(index);
          }}
        >
          <div className="flex items-center gap-1">
            <Image
              src={button}
              width={12}
              height={12}
              className="w-[12px] h-[12px] mr-2"
              alt="button"
            />
            <span className="font-normal text-base leading-6 tracking-tight">
              {capitalizeWord(label)}
            </span>
          </div>

          <span className="font-normal text-base leading-6 tracking-tight">
            {toPercentage(Number(value).toFixed(2))}%
          </span>
        </div>
      );
    })
}
                  </div>
                </div>
              </>
  )
}

export default Gender