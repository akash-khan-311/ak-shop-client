"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";
import Container from "@/components/ui/Container";

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
      className="hero-carousel dark:bg-dark-2 bg-white border min-h-[670px] h-[670px] relative"
    >
      <SwiperSlide className="h-full">
        <div className="h-full flex items-center justify-center">
          <Container>
            <div className="w-full flex items-center justify-between flex-col-reverse sm:flex-row">
              {/* Left content */}
              <div className="py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
                <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                  <span className="block font-semibold text-heading-3 sm:text-heading-1 text-pink">
                    30%
                  </span>
                  <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px] dark:text-white">
                    Sale
                    <br />
                    Off
                  </span>
                </div>

                <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3 dark:text-white">
                  True Wireless Noise Cancelling Headphone
                </h1>

                <p className="dark:text-gray-5 max-w-[520px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  at ipsum at risus euismod lobortis in
                </p>

                <a
                  href="#"
                  className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 hover:bg-pink mt-10"
                >
                  Shop Now
                </a>
              </div>

              {/* Right image */}
              <div className="flex justify-center">
                <Image
                  src="/images/hero/hero-01.png"
                  alt="headphone"
                  width={351}
                  height={358}
                  priority
                />
              </div>
            </div>
          </Container>
        </div>
      </SwiperSlide>
      <SwiperSlide className="h-full">
        <div className="h-full flex items-center justify-center">
          <Container>
            <div className="w-full flex items-center justify-between flex-col-reverse sm:flex-row">
              {/* Left content */}
              <div className="py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
                <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                  <span className="block font-semibold text-heading-3 sm:text-heading-1 text-pink">
                    30%
                  </span>
                  <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px] dark:text-white">
                    Sale
                    <br />
                    Off
                  </span>
                </div>

                <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3 dark:text-white">
                  True Wireless Noise Cancelling Headphone
                </h1>

                <p className="dark:text-gray-5 max-w-[520px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  at ipsum at risus euismod lobortis in
                </p>

                <a
                  href="#"
                  className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 hover:bg-pink mt-10"
                >
                  Shop Now
                </a>
              </div>

              {/* Right image */}
              <div className="flex justify-center">
                <Image
                  src="/images/hero/hero-01.png"
                  alt="headphone"
                  width={351}
                  height={358}
                  priority
                />
              </div>
            </div>
          </Container>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
