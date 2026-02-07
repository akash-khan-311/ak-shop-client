"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef } from "react";
import testimonialsData from "./testimonialsData";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";
import { Users } from "lucide-react";
import Container from "@/components/ui/Container";

const Testimonials = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <section className="overflow-hidden py-16.5 dark:bg-dark-2">
      <Container>
        <div className="">
          <div className="swiper testimonial-carousel common-carousel p-5">
            {/* <!-- section title --> */}
            <div className="mb-10 flex items-center justify-between">
              <div>
                <span className="flex items-center gap-2.5 font-medium text-dark dark:text-gray-4 mb-1.5">
                  <Users size={20} className="text-pink" />
                  Testimonials
                </span>
                <h2 className="font-semibold text-xl xl:text-heading-5 text-dark dark:text-white">
                  User Feedbacks
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div
                  onClick={handlePrev}
                  className="swiper-button-prev dark:bg-dark-2"
                >
                  <ChevronLeft className="text-dark hover:text-white dark:text-white" />
                </div>

                <div
                  onClick={handleNext}
                  className="swiper-button-next dark:bg-dark-2"
                >
                  <ChevronRight className="text-dark hover:text-white dark:text-white" />
                </div>
              </div>
            </div>

            <Swiper
              ref={sliderRef}
              slidesPerView={3}
              spaceBetween={20}
              breakpoints={{
                // when window width is >= 640px
                0: {
                  slidesPerView: 1,
                },
                1000: {
                  slidesPerView: 2,
                  // spaceBetween: 4,
                },
                // when window width is >= 768px
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {testimonialsData.map((item, key) => (
                <SwiperSlide key={key}>
                  <SingleItem testimonial={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
