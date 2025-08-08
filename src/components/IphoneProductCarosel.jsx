import React, { useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const carouselItems = [
  {
    id: 1,
    title: "Apple Intelligence",
    subtitle: "AI-opening possibilities.",
    imageUrl:
      "https://www.apple.com/v/iphone/home/cc/images/overview/consider/apple_intelligence__gbh77cvflkia_xlarge_2x.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Cutting-Edge Cameras",
    subtitle: "Picture your best photos and videos.",
    imageUrl:
      "https://www.apple.com/v/iphone/home/cc/images/overview/consider/camera__exi2qfijti0y_xlarge_2x.jpg",
    bgColor: "bg-gray-500",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Chip and Battery Life",
    subtitle: "Fast that lasts.",
    imageUrl:
      "https://www.apple.com/v/iphone/home/cc/images/overview/consider/battery__2v7w6kmztvm2_xlarge_2x.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Innovation",
    subtitle: "Beautiful and durable, by design.",
    imageUrl:
      "https://www.apple.com/v/iphone/home/cc/images/overview/consider/innovation__os9bmmo3mjee_xlarge_2x.jpg",
    bgColor: "bg-gray-100",
    textColor: "text-black",
  },
  {
    id: 5,
    title: "Environmentally Friendly",
    subtitle: "Recycled materials.",
    imageUrl:
      "https://www.apple.com/v/iphone/home/cc/images/overview/consider/environment__e3v3gj88dl6q_xlarge_2x.jpg",
    bgColor: "bg-sky-100",
    textColor: "text-black",
  },
  {
    id: 6,
    title: "Privacy",
    subtitle: "Your data. Just where you want it.",
    imageUrl:
      "https://www.apple.com/v/iphone/home/cc/images/overview/consider/privacy__ckc0wa30o55y_xlarge_2x.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 7,
    title: "Customize your iPhone",
    subtitle: "Make it you. Through and through.",
    imageUrl:
      "https://www.apple.com/v/iphone/home/cc/images/overview/consider/personalize__dwg8srggrbo2_xlarge_2x.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 8,
    title: "Peace of mind",
    subtitle: "Helpfull feattures. On and off the grid.",
    imageUrl:
      "https://www.apple.com/v/iphone/home/cc/images/overview/consider/safety__bwp7rsowtjiu_xlarge_2x.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
];

export default function IphoneProductCarosel() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Get to know iPhone.
        </h2>

        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-hidden snap-x snap-mandatory"
        >
          {carouselItems.map((item) => (
            <div
              key={item.id}
              className={`flex-none w-[250px] md:w-[350px] rounded-2xl overflow-hidden snap-center
                ${item.bgColor} ${item.textColor}`}
            >
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold mb-2">{item.title}</p>
                  <h3 className="text-2xl font-bold">{item.subtitle}</h3>
                </div>
                <div className="">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2 justify-center mt-4">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <MdOutlineKeyboardArrowLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <MdOutlineKeyboardArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
