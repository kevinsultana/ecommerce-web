import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

export default function Macbook() {
  const [selectedCategory, setSelectedCategory] = useState("laptop");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

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
          <h1 className="text-7xl font-bold">Mac</h1>
          <p className="text-lg font-semibold">
            If you can dream <br />
            it,
            <br /> Mac can do it
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/heroImg/macHero.png"
            alt="mac"
            className="w-auto h-auto rounded-2xl"
          />
        </div>
      </section>

      {/* explore the product */}
      <section className="py-2 md:py-6 px-4 lg:px-20 space-y-6 bg-gray-100 dark:bg-gray-800 pb-8">
        <h1 className="text-4xl font-bold">Explore the lineup</h1>
        <div className="flex items-center space-x-2 bg-white w-fit p-1 rounded-full ">
          <button
            onClick={() => setSelectedCategory("laptop")}
            className={`
            px-6 py-2 text-lg font-semibold rounded-full transition-colors duration-300 hover:cursor-pointer
            ${
              selectedCategory === "laptop"
                ? "bg-black text-white dark:bg-black dark:text-white "
                : "text-black hover:text-black  dark:hover:text-black"
            }
          `}
          >
            Laptop
          </button>
          <button
            onClick={() => setSelectedCategory("desktop pc")}
            className={`
            px-6 py-2 text-lg font-semibold rounded-full transition-colors duration-300 hover:cursor-pointer
            ${
              selectedCategory === "desktop pc"
                ? "bg-black text-white dark:bg-black dark:text-white "
                : "text-black hover:text-black  dark:hover:text-black"
            }
          `}
          >
            Desktop
          </button>
        </div>

        <div>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="card w-full shadow-xl dark:bg-gray-700"
                >
                  <figure>
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="w-full "
                    />
                  </figure>
                  <div className="card-body space-y-2">
                    <h2 className="card-title">{product.name.slice(0, 30)}</h2>
                    <p>{product.description.slice(0, 150)}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
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
