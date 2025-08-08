import React, { useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const carouselItems = [
  {
    id: 1,
    title: "Health",
    subtitle: "Knows you by heart.",
    imageUrl:
      "https://www.apple.com/v/watch/br/images/overview/consider/feature_health__b2yo83wkzoaa_large.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Fitness",
    subtitle: "Every move counts.",
    imageUrl:
      "https://www.apple.com/v/watch/br/images/overview/consider/feature_fitness__b5owsglf0ieu_large.jpg",
    bgColor: "bg-gray-800",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Connectivity",
    subtitle: "The right call for staying in touch.",
    imageUrl:
      "https://www.apple.com/v/watch/br/images/overview/consider/feature_connectivity__cwtqydvy2laq_large.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Safety",
    subtitle: "Good help is easy to find.",
    imageUrl:
      "https://www.apple.com/v/watch/br/images/overview/consider/feature_safety__gln97xcew2em_large.jpg",
    bgColor: "bg-gray-100",
    textColor: "text-black",
  },
  {
    id: 5,
    title: "Apple Watch + iPhone",
    subtitle: "Dynamic duo.",
    imageUrl:
      "https://www.apple.com/v/watch/br/images/overview/consider/feature_watch_and_iphone__fiq5g9njy5qy_large.jpg",
    bgColor: "bg-sky-100",
    textColor: "text-black",
  },
  {
    id: 6,
    title: "Apple Watch Ultra 2",
    subtitle: "The ultimate sports and adventure watch.",
    imageUrl:
      "https://www.apple.com/v/watch/br/images/overview/consider/feature_adventure__d4xvmn7guk02_large.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 7,
    title: "Apple Watch For Your Kids",
    subtitle: "Independence for them. Peace of minde for you.",
    imageUrl:
      "https://www.apple.com/v/watch/br/images/overview/consider/feature_family_setup__dclbe9jpbiie_large.jpg",
    bgColor: "bg-neutral-100",
    textColor: "text-black",
  },
];

export default function IwatchProductCarosel() {
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
          Get to know iWatch.
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
