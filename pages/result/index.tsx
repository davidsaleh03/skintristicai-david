import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import large from "../../assets/diamond-large.svg";
import medium from "../../assets/diamond-medium.svg";
import small from "../../assets/diamond-small.svg";
import camera from "../../assets/camera.svg";
import gallery from "../../assets/gallery-icon.svg";
import vector1 from "../../assets/vector1.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { setData } from "@/redux/dataSlice";
import { useDispatch } from "react-redux";
import { GoDotFill } from "react-icons/go";

const index = () => {
  const [allow, setAllow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async (image: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: image,
          }),
        },
      );

      const data = await res.json();
      console.log("API response:", data);
      dispatch(setData(data));
      router.push("/select");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      setSelectedImage(base64);
      uploadImage(base64);
    };

    reader.readAsDataURL(file);
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
  }, [loading]);

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
  return (
    <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
      <div className="absolute top-2 left-9 md:left-8 text-left">
        <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
      </div>
      {loading
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
            <p className='text-base font-semibold leading-6 tracking-tight'>PREPARING YOUR ANALYSIS...</p>
            <div>
                <div className='flex items-center justify-center space-x-4 py-8'>
                     <GoDotFill className='dot' />
                    <GoDotFill className='dot'/>
                    <GoDotFill className='dot'/>
                </div>
            </div>
        </div>
      </div>
      <div className='absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100'>
        <h1 className='text-xs md:text-sm font-normal mb-1'>Preview</h1>
        <div className='w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden'>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            )}
        </div>
      </div>
      </>
      :
        <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
        <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
          <Image
            src={large}
            alt="Diamond background"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="diamondLarge absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-205"
          />
          <Image
            src={medium}
            alt="Diamond background"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="diamondMedium absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-195"
          />
          <Image
            src={small}
            alt="Diamond background"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="diamondSmall absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image
              src={camera}
              alt="camera"
              loading="lazy"
              decoding="async"
              data-nimg="1"
              onClick={() => setAllow(true)}
              className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-110 duration-700 ease-in-out cursor-pointer"
            />
            <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
              <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                ALLOW A.I.
                <br />
                TO SCAN YOUR FACE
              </p>
              <Image
                src={vector1}
                alt="Scan Line"
                loading="lazy"
                decoding="async"
                data-nimg="1"
                className="absolute hidden md:block md:right-[143px] md:top-[20px]"
              />
            </div>
          </div>
        </div>
        <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100 z-10">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
          <Image
            src={large}
            alt="Diamond background"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="diamondLarge absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] rotate-205"
          />
          <Image
            src={medium}
            alt="Diamond background"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="diamondMedium absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] rotate-195"
          />
          <Image
            src={small}
            alt="Diamond background"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="diamondSmall absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px]"
          />
          <div
            className={`fixed inset-0 flex flex-col items-center justify-center ${allow ? "z-[-1] pointer-events-none opacity-50" : "z-10 opacity-100"}`}
          >
            <Image
              src={gallery}
              alt="gallery"
              loading="lazy"
              decoding="async"
              data-nimg="1"
              className="absolute z-0 w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-110 duration-700 ease-in-out cursor-pointer"
              onClick={handleGalleryClick}
            />
            <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px] z-[10]">
              <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                ALLOW A.I.
                <br />
                TO ACCESS GALLERY
              </p>
              <Image
                src={vector1}
                alt="Scan Line"
                loading="lazy"
                decoding="async"
                data-nimg="1"
                className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
          <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>}
      <input
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        type="file"
      />
      <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
        <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
          <Link href="/testing" className="relative" aria-label="Back">
            <div>
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                  BACK
                </span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                  ▶
                </span>
                <span className="text-sm font-semibold hidden sm:block ml-6 ">
                  BACK
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {allow && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
          <div className="bg-[#1A1B1C] w-[352px] rounded-md overflow-hidden">
            <h2 className="text-white text-base font-semibold p-4">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </h2>

            <div className="flex border-t border-white/30">
              <button
                onClick={() => setAllow(false)}
                className="flex-1 py-3 text-white/70 hover:text-white"
              >
                DENY
              </button>

              <button
                onClick={() => router.push("/camera")}
                className="flex-1 py-3 font-semibold text-white hover:text-gray-300"
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
