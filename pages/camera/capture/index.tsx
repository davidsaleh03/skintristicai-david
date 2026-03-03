import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import pic from '../../../assets/take-pic-2.svg'
import { useDispatch } from "react-redux";
import { setData } from "@/redux/dataSlice";

const index = () => {
const [capturedImage, setCapturedImage] = useState<string | null>(null);
const [loading, setLoading] = useState(true)
const videoRef = useRef<HTMLVideoElement>(null);
const dispatch = useDispatch();

  useEffect(() => {
  if (capturedImage === null) {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setLoading(false)
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startCamera();
  }
}, [capturedImage]);

  const capturePhoto = () => {
  if (!videoRef.current) return;

  const video = videoRef.current;
  const canvas = document.createElement("canvas");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL("image/png");
  setCapturedImage(imageData);
  console.log("Captured image:", imageData);
};



const uploadImage = async () => {
  if (!capturedImage) return;

  try {
    const res = await fetch(
      "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: capturedImage, 
        }),
      }
    );

    const data = await res.json();
    console.log("API response:", data);

    dispatch(setData(data));
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

  return (
    <div className="h-[90vh] w-screen">
      <div className="relative h-[92vh] w-screen overflow-hidden bg-gray-900">
        {
          capturedImage === null
          ?
        <div className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {
            !loading 
            &&
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex items-center space-x-3">
            <div className="font-semibold text-sm tracking-tight leading-[14px] text-[#FCFCFC] hidden sm:block"></div>
            <div className="transform hover:scale-105 ease-in-out duration-300">
              <Image
                src={pic}
                className="w-16 h-16 cursor-pointer"
                loading="lazy"
                width={250}
                height={250}
                data-nimg="1"
                decoding="async"
                alt="camera"
                onClick={capturePhoto}
              />
            </div>
          </div>
          }
          <div className='absolute bottom-30 sm:bottom-40 left-0 right-0 text-center z-20'>
            <p className='text-sm mb-2 font-normal leading-6 text-[#FCFCFC]'>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
            <div className='flex justify-center space-x-8 text-xs leading-6 text-[#FCFCFC]'>
                <p>◇ NEUTRAL EXPRESSION</p>
                <p>◇ FRONTAL POSE</p>
                <p>◇ ADEQUATE LIGHTING</p>
            </div>
          </div>
        </div>
        :
        <div className='absolute inset-0 z-10 flex flex-col items-center'>
          <img src={capturedImage} alt="Captured selfie" className='absolute inset-0 w-full h-full object-cover'/>
          <div className='absolute text-sm leading-6 uppercase text-[#FCFCFC] top-40'>GREAT SHOT!</div>
          <div className='absolute bottom-40 sm:bottom-16 left-0 right-0 flex flex-col items-center z-20'>
            <h2 className='text-lg font-semibold mb-5 md:mb-7 text-[#FCFCFC] drop-shadow-md'>Preview</h2>
            <div className='flex justify-center space-x-6'>
              <button className='px-4 py-1 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm' onClick={() => setCapturedImage(null)}>Retake</button>
              <button className='px-6 py-2 bg-[#1A1B1C] text-[#FCFCFC] cursor-pointer hover:bg-gray-800 shadow-md text-sm' onClick={uploadImage}>Use This Photo</button>
            </div>
          </div>
        </div>
        }
        <div className='absolute md:bottom-8 bottom-60 left-8 z-20'>
            <Link href='/result'>
            <div>
                <div className='relative w-12 h-12 flex items-center justify-center border border-[#FCFCFC] rotate-45 scale-[1] sm:hidden'>
                    <span className='rotate-[-45deg] text-xs font-semibold sm:hidden text-[#FCFCFC]'>BACK</span>
                </div>
                <div className='group hidden sm:flex flex-row relative justify-center items-center'>
                    <div className=' w-12 h-12 hidden sm:flex justify-center border border-[#FCFCFC] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300'></div>
                    <span className='absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block text-[#FCFCFC] group-hover:scale-[0.92] ease duration-300'>▶</span>
                    <span className='text-sm font-semibold hidden sm:block ml-6 text-[#FCFCFC]'>BACK</span>
                </div>
            </div>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default index;
