import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import large from "../../assets/diamond-large.svg";
import medium from "../../assets/diamond-medium.svg";
import small from "../../assets/diamond-small.svg";
import pic from "../../assets/take-pic-2.svg";
import camera from '../../assets/camera.svg'
import { useDispatch } from "react-redux";
import { setData } from "@/redux/dataSlice";
import { useRouter } from "next/router";
import { GoDotFill } from "react-icons/go";

const index = () => {

 const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setLoading(false);
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);


  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    setCapturedImage(canvas.toDataURL("image/png"));
  };


  const uploadImage = async () => {
    if (!capturedImage) return;
    try {
      const res = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: capturedImage }),
        }
      );

      const data = await res.json();

      dispatch(setData(data));
      router.push("/select");
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };


  useEffect(() => {
    gsap.set(".diamondLarge", { rotation: 180 });
    gsap.set(".diamondMedium", { rotation: 185 });
    gsap.set(".diamondSmall", { rotation: 0 });

    gsap.to(".diamondLarge", {
      rotation: "+=360",
      duration: 50,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(".diamondMedium", {
      rotation: "+=360",
      duration: 75,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(".diamondSmall", {
      rotation: "+=360",
      duration: 85,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(".cameraIcon", {
  scale: 1.2,
  duration: 0.5,
  ease: "power1.inOut",
  yoyo: true,
  repeat: -1
});
  }, [loading]);

  return (
    <div className="h-[90vh] w-screen">
      {
        loading
        ?
         <>
      <div className='absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-11'>
        <div className='w-[270px] h-[270px] md:w-[482px] md:h-[482px]'></div>
        <Image
          src={large}
          alt="Diamond background"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="diamondLarge absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             w-[480px] h-[480px] md:w-[762px] md:h-[762px] 
              rotate-180"
        />
        <Image
          src={medium}
          alt="Diamond background"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="diamondMedium absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] rotate-185"
        />
        <Image
          src={small}
          alt="Diamond background"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="diamondSmall absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px]"
        />
        <div className='absolute bg-white p-4 space-y-0'>

                <div className='flex flex-col items-center justify-center space-x-4 py-8'>
                  <Image src={camera} width={150} height={150} alt="camera" className='cameraIcon mb-4'/>
            <p className='text-base font-semibold leading-6 tracking-tight'>SETTING UP CAMERA...</p>
                </div>

        </div>
      </div>
      </>
      :

      <div className="relative h-[92vh] w-screen overflow-hidden bg-gray-900">
        {capturedImage === null ? (
          <div className="absolute inset-0 z-10">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
              <div className="absolute right-8 top-1/2 ...">
                <Image
                  src={pic}
                  className="w-16 h-16 cursor-pointer"
                  loading="lazy"
                  width={250}
                  height={250}
                  alt="camera"
                  onClick={capturePhoto}
                />
              </div>
            <div className="absolute bottom-30 sm:bottom-40 left-0 right-0 text-center z-20">
              <p className="text-sm mb-2 font-normal leading-6 text-[#FCFCFC]">
                TO GET BETTER RESULTS MAKE SURE TO HAVE
              </p>
              <div className="flex justify-center space-x-8 text-xs leading-6 text-[#FCFCFC]">
                <p>◇ NEUTRAL EXPRESSION</p>
                <p>◇ FRONTAL POSE</p>
                <p>◇ ADEQUATE LIGHTING</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 z-10 flex flex-col items-center">
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute text-sm leading-6 uppercase text-[#FCFCFC] top-40">
              GREAT SHOT!
            </div>
            <div className="absolute bottom-40 sm:bottom-16 left-0 right-0 flex flex-col items-center z-20">
              <h2 className="text-lg font-semibold mb-5 md:mb-7 text-[#FCFCFC] drop-shadow-md">
                Preview
              </h2>
              <div className="flex justify-center space-x-6">
                <button
                  className="px-4 py-1 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm"
                  onClick={() => setCapturedImage(null)}
                >
                  Retake
                </button>
                <button
                  className="px-6 py-2 bg-[#1A1B1C] text-[#FCFCFC] cursor-pointer hover:bg-gray-800 shadow-md text-sm"
                  onClick={uploadImage}
                >
                  Use This Photo
                </button>
              </div>
            </div>
          </div>
          
        )}
        <div className="absolute md:bottom-8 bottom-60 left-8 z-20">
          <Link href="/result">
            <div>
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#FCFCFC] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden text-[#FCFCFC]">
                  BACK
                </span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#FCFCFC] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block text-[#FCFCFC] group-hover:scale-[0.92] ease duration-300">
                  ▶
                </span>
                <span className="text-sm font-semibold hidden sm:block ml-6 text-[#FCFCFC]">
                  BACK
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      }
    </div>
  );
};

export default index;
