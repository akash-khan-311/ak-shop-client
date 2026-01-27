"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect } from "react";
import data from "./categoryData";
import Image from "next/image";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { useGetAllCategoriesForUserQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/category";

const Categories = () => {
  const sliderRef = useRef(null);

  const { data } = useGetAllCategoriesForUserQuery(undefined);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);
  const categories = data?.data || [];
  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.init();
    }
  }, []);

  return (
    <section className="overflow-hidden pt-17.5  dark:bg-dark-2">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <div className="swiper categories-carousel common-carousel">
          {/* <!-- section title --> */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-dark dark:text-gray-5 mb-1.5">
                <Tag size={20} className="text-pink " />
                Categories
              </span>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark dark:text-white">
                Browse by Category
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handlePrev} className="swiper-button-prev">
                <ChevronLeft />
              </button>

              <button onClick={handleNext} className="swiper-button-next">
                <ChevronRight />
              </button>
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
                slidesPerView: 6,
              },
            }}
          >
            {categories.map((category: TCategory) => (
              <SwiperSlide key={category._id}>
                <SingleItem item={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;
