import React from "react";
import Image from "next/image";
import { Rocket, RotateCcw, Shield, MessageCircleMore } from "lucide-react";

const featureData = [
  {
    icon: Rocket,
    title: "Free Shipping",
    description: "For all orders $200",
  },
  {
    icon: RotateCcw,
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    icon: Shield,
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    icon: MessageCircleMore,
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
        {featureData.map((item, key) => {
          const Icon = item.icon;
          return (
            <div className="flex items-center gap-4" key={key}>
              <Icon size={40} className="text-pink dark:text-white" />

              <div>
                <h3 className="font-medium text-lg text-dark dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm dark:text-gray-5">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroFeature;
