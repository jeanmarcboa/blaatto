"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// import img01 from "@/public/images/hero/femme-1.jpg";
// import img02 from "../..//images/hero/file-20210607-80132-1nnptvo.jpg";
// import img02 from "/images/hero/file-20210607-80132-1nnptvo.jpg";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div>
            <img
              src="/images/hero/femme-1.jpg"
              alt="headphone"
              style={{ width: "auto", height: "100%" }}
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className={
            "bg-[url('/images/hero/file-20210607-80132-1nnptvo.jpg')] bg-center bg-no-repeat h-[570px] bg-cover"
          }
        >
          {/* <div>
            <img
              src="/images/hero/file-20210607-80132-1nnptvo.jpg"
              alt="headphone"
              style={{ width: "auto", height: "100%" }}
            />
          </div> */}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
