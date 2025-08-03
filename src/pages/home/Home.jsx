import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import formatRupiah from "../../utils/FormatRupiah";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const querySnap = await getDocs(collection(db, "products"));
      const products = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300">
      {/* Hero Section */}
      <section className="text-center bg-indigo-50 dark:bg-gray-900 rounded-2xl p-10 mb-10 shadow">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Selamat Datang di Toko Kami!
        </h1>
        <p className="text-lg mb-6">
          Temukan berbagai produk menarik dengan harga terbaik. Selamat
          berbelanja!
        </p>
        <button
          onClick={() => {
            document
              .getElementById("produk-unggulan")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Lihat Produk
        </button>
      </section>

      {/* Produk Unggulan */}
      <section id="produk-unggulan">
        <h2 className="text-3xl font-bold mb-6 text-center">Produk Unggulan</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Belum ada produk tersedia.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="w-full h-48 overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-md font-semibold truncate">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">
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
      </section>
    </div>
  );
}
