import React, { useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const carouselItems = [
  {
    id: 1,
    title: "Apple Intelligence",
    subtitle: "Personal, private, powerful",
    imageUrl:
      "https://www.apple.com/assets-www/en_WW/ipad/feature_card/xsmall/fc_apple_intelligence_bc50e7bbf_2x.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Productivity",
    subtitle: "Your workplace can be any place",
    imageUrl:
      "https://www.apple.com/assets-www/en_WW/ipad/feature_card/large/fc_productivity_f46450eb3_2x.jpg",
    bgColor: "bg-gray-500",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Creativity",
    subtitle: "Take your inner artist out and about.",
    imageUrl:
      "https://www.apple.com/assets-www/en_WW/ipad/feature_card/xlarge/fc_creativity_b7786b04b_2x.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Learning",
    subtitle: "Your classroom can be anywhere.",
    imageUrl:
      "https://www.apple.com/assets-www/en_WW/ipad/feature_card/xlarge/fc_learning_8e45b8fea_2x.jpg",
    bgColor: "bg-gray-100",
    textColor: "text-black",
  },
  {
    id: 5,
    title: "Entertainment",
    subtitle: "Kick back. Tune in. Game on.",
    imageUrl:
      "https://www.apple.com/assets-www/en_WW/ipad/feature_card/xlarge/fc_entertainment_c3006a20d_2x.jpg",
    bgColor: "bg-sky-100",
    textColor: "text-black",
  },
  {
    id: 6,
    title: "Apple Pencil",
    subtitle: "Dream it up. Jot it down.",
    imageUrl:
      "https://www.apple.com/assets-www/en_WW/ipad/feature_card/xlarge/fc_pencil_e218106bc_2x.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 7,
    title: "Customize your iPhone",
    subtitle: "Make it you. Through and through.",
    imageUrl:
      "https://www.apple.com/assets-www/en_WW/ipad/feature_card/xlarge/fc_ipados_3c271ef7d.jpg",
    bgColor: "bg-black",
    textColor: "text-white",
  },
];

export default function IpadProductCarosel() {
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
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Get to know iPad.
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
