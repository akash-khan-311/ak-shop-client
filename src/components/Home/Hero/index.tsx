import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import Container from "@/components/ui/Container";

const Hero = () => {
  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4] dark:bg-dark">
      <HeroCarousel />
      <Container>
        <div className="flex justify-center flex-wrap gap-5">
          <div className="w-full mx-auto">
            <div className="relative z-1  bg-white overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />
            </div>
          </div>

          <div className=" w-full flex flex-col">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5 dark:bg-dark-2">
                <div className="flex justify-between items-center gap-14">
                  <div>
                    <h2 className="font-semibold text-dark dark:text-white text-xl md:text-2xl">
                      <a href="#"> iPhone 14 Plus & 14 Pro Max </a>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5 dark:text-gray-5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          $699
                        </span>
                        <span className="font-medium text-2xl text-dark-4 dark:text-gray-5 line-through">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/images/hero/hero-02.png"
                      alt="mobile image"
                      width={123}
                      height={161}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5 dark:bg-dark-2">
                <div className="flex justify-between items-center gap-14">
                  <div>
                    <h2 className="font-semibold text-dark dark:text-white text-xl md:text-2xl">
                      <a href="#"> Wireless Headphone </a>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5 dark:text-gray-5">
                        limited time offer
                      </p>
                      <span className="flex  items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          $699
                        </span>
                        <span className="font-medium text-2xl text-dark-4 line-through dark:text-gray-5">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/images/hero/hero-01.png"
                      alt="mobile image"
                      width={123}
                      height={161}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
