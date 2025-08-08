import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase";
import formatRupiah from "../../utils/FormatRupiah";
import Swal from "sweetalert2";

const productData = [
  {
    id: 1,
    title: "AirPods 4",
    subtitle: "The next evolution of sound and comfort.",
    priceInfo:
      "Starting at $129 With Active Noise Cancellation $179 Available 9.20",
    imageUrl: "/heroImg/airpodHero.png",
    bgColor: "bg-gradient-to-tr from-[#1E293B] to-[#9CA3AF]",
    textColor: "text-white",
    buttons: [{ text: "Buy Now", style: "bg-gray-800 text-white" }],
  },
  {
    id: 2,
    title: "AirPods Pro 2",
    subtitle: "The next level of immersive sound.",
    priceInfo: "Starting from $249",
    imageUrl: "/heroImg/airpodProHero.png",
    bgColor: "bg-black",
    textColor: "text-white",
    buttons: [{ text: "Buy Now", style: "bg-blue-500 text-white" }],
    imageAlignment: "right",
  },
  {
    id: 3,
    title: "AirPods Max",
    subtitle: "High-Fidelity Audio.",
    priceInfo: "Starting from $549",
    imageUrl: "/heroImg/airpodMax.png",
    bgColor: "bg-white dark:bg-gray-800",
    textColor: "text-black dark:text-white",
    buttons: [
      {
        text: "Buy Now",
        style: "bg-gray-300 text-black dark:bg-gray-700 dark:text-white",
      },
    ],
  },
];

export default function Airpods() {
  const [selectedCategory, setSelectedCategory] = useState("airpods");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const getProductByCategory = async () => {
    setLoading(true);
    try {
      const response = await getDocs(
        query(
          collection(db, "products"),
          where("category", "==", selectedCategory)
        )
      );
      const res = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(res);
    } catch (error) {
      console.log(error);
      Swal.fire("Gagal", "Terjadi kesalahan saat mengambil data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductByCategory();
  }, [selectedCategory]);

  return (
    <div>
      {productData.map((product) => {
        const {
          title,
          subtitle,
          priceInfo,
          imageUrl,
          bgColor,
          textColor,
          buttons,
          isImageRight,
        } = product;
        return (
          <section
            className={`relative w-full h-[90vh] overflow-hidden flex items-center justify-center p-8 md:p-16 ${bgColor}`}
          >
            <div
              className={`container mx-auto relative z-10 flex flex-col-reverse md:flex-row justify-between items-center h-full ${textColor}`}
            >
              <div
                className={`md:flex-1 text-center md:text-left ${
                  isImageRight ? "md:pr-16" : "md:pl-16"
                }`}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{title}</h2>
                <p className="text-lg md:text-xl font-semibold max-w-xl mx-auto md:mx-0">
                  {subtitle}
                </p>
                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start mt-4 text-sm md:text-base">
                  <span className="mr-4">{priceInfo}</span>
                </div>
                <div className="flex justify-center md:justify-start space-x-4 mt-6">
                  {buttons.map((button, index) => (
                    <button
                      key={index}
                      className={`px-6 py-2 rounded-full font-medium transition-colors ${button.style}`}
                      onClick={() => navigate("/store")}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`md:flex-1 h-full flex items-center justify-center ${
                  isImageRight
                    ? "order-first md:order-last"
                    : "order-last md:order-first"
                }`}
              >
                <img
                  src={imageUrl}
                  alt={title}
                  className="max-h-[70%] max-w-full object-contain"
                />
              </div>
            </div>
          </section>
        );
      })}

      {/* explore the product */}
      <section className="py-2 md:py-6 px-4 lg:px-20 space-y-6 bg-gray-100 dark:bg-gray-800 pb-8">
        <h1 className="text-xl lg:text-4xl font-bold">Explore the lineup</h1>
        <div className="flex items-center space-x-2 bg-white w-fit p-1 rounded-full ">
          <button
            onClick={() => setSelectedCategory("airpods")}
            className={`
            px-6 py-2 text-sm lg:text-lg font-semibold rounded-full transition-colors duration-300 hover:cursor-pointer
                  ${
                    selectedCategory === "airpods"
                      ? "bg-black text-white dark:bg-black dark:text-white "
                      : "text-black hover:text-black  dark:hover:text-black"
                  }
                `}
          >
            AirPods
          </button>
          <button
            onClick={() => setSelectedCategory("tws")}
            className={`
            px-6 py-2 text-sm lg:text-lg font-semibold rounded-full transition-colors duration-300 hover:cursor-pointer
                  ${
                    selectedCategory === "tws"
                      ? "bg-black text-white dark:bg-black dark:text-white "
                      : "text-black hover:text-black  dark:hover:text-black"
                  }
                `}
          >
            Wireless Earphone
          </button>
        </div>

        <div>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="w-full h-auto sm:h-90 overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
                    <h3 className="text-sm sm:text-md font-semibold truncate">
                      {item.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm sm:text-base">
                        {formatRupiah(item.price)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Terjual: {item.sold ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
