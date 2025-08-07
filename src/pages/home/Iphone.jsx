import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router";
import formatRupiah from "../../utils/FormatRupiah";
import IphoneProductCarosel from "../../components/IphoneProductCarosel";

export default function Iphone() {
  const [selectedCategory, setSelectedCategory] = useState("smartphone");
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductByCategory();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      {/* hero */}
      <section className="py-2 md:py-6 px-4 lg:px-30 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-7xl font-bold">iPhone</h1>
          <p className="text-lg font-semibold">Designed to be loved.</p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/heroImg/iphoneHero.png"
            alt="iphone"
            className="w-auto h-auto rounded-2xl"
          />
        </div>
      </section>

      {/* product details */}
      <IphoneProductCarosel />

      {/* explore the product */}
      <section className="py-2 md:py-6 px-4 lg:px-20 space-y-6 bg-gray-100 dark:bg-gray-800 pb-8">
        <h1 className="text-4xl font-bold">Explore the lineup</h1>
        <div className="flex items-center space-x-2 bg-white w-fit p-1 rounded-full ">
          <button
            onClick={() => setSelectedCategory("smartphone")}
            className={`
            px-6 py-2 text-lg font-semibold rounded-full transition-colors duration-300 hover:cursor-pointer
            ${
              selectedCategory === "smartphone"
                ? "bg-black text-white dark:bg-black dark:text-white "
                : "text-black hover:text-black  dark:hover:text-black"
            }
          `}
          >
            Smartphone
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
