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
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-center p-8 mb-8 bg-gray-100 rounded-lg dark:bg-gray-700 text-gray-800 dark:text-white">
        <div className="text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Selamat Datang di Toko Kami!</h1>
            <p className="py-6">
              Temukan berbagai produk menarik dengan harga terbaik. Selamat
              berbelanja!
            </p>
            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Lihat Produk
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Produk Unggulan
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-10">
        {products.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer hover:scale-105 transition duration-300 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <div className="w-full h-48 overflow-hidden border rounded-md border-gray-300 dark:border-gray-900">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-full h-full object-contain rounded-lg shadow-md"
              />
            </div>
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <div className="py-2"></div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                {formatRupiah(item.price)}
              </span>
              <span className="text-sm text-gray-500">terjual</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
