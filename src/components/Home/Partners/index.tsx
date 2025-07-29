"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect, useState } from "react";
import data from "./partnerData";
import Image from "next/image";

// Import services
import shopAPI from "@/app/api/shopServices";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";

const Categories = () => {
  const sliderRef = useRef(null);
  const [shopList, setShopList] = useState([]);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const fetchShopList = () => {
    shopAPI
      .shopList()
      .then((response) => setShopList(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchShopList();
    if (sliderRef.current) {
      sliderRef.current.swiper.init();
    }
  }, []);

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <div className="swiper categories-carousel common-carousel">
          {/* <!-- section title --> */}
          <div className="mb-10 flex items-center justify-center">
            <div>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                Nos partenaires
              </h2>
            </div>
          </div>

          <Swiper
            ref={sliderRef}
            slidesPerView={6}
            breakpoints={{
              // when window width is >= 640px
              0: {
                slidesPerView: 2,
              },
              1000: {
                slidesPerView: 4,
                // spaceBetween: 4,
              },
              // when window width is >= 768px
              1200: {
                slidesPerView: 7,
              },
            }}
          >
            {data.map((item, key) => (
              <SwiperSlide key={key}>
                <SingleItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;
