import React from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Contoh Card Produk */}
        <div
          onClick={() => navigate("/product/1")}
          className="relative block overflow-hidden rounded-lg shadow-xl bg-white dark:bg-gray-800 cursor-pointer"
        >
          <figure>
            <img
              src="https://via.placeholder.com/300"
              alt="Produk"
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
          </figure>
          <div className="relative z-10 p-6 flex flex-col justify-end">
            <h2 className="text-2xl font-bold mb-2 text-white">Nama Produk</h2>
            <p className="text-white">Deskripsi singkat produk yang menarik.</p>
            <div className="flex justify-end mt-4">
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
        <div className="relative block overflow-hidden rounded-lg shadow-xl bg-white dark:bg-gray-800">
          <figure>
            <img
              src="https://via.placeholder.com/300"
              alt="Produk"
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
          </figure>
          <div className="relative z-10 p-6 flex flex-col justify-end">
            <h2 className="text-2xl font-bold mb-2 text-white">Nama Produk</h2>
            <p className="text-white">Deskripsi singkat produk yang menarik.</p>
            <div className="flex justify-end mt-4">
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
        <div className="relative block overflow-hidden rounded-lg shadow-xl bg-white dark:bg-gray-800">
          <figure>
            <img
              src="https://via.placeholder.com/300"
              alt="Produk"
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
          </figure>
          <div className="relative z-10 p-6 flex flex-col justify-end">
            <h2 className="text-2xl font-bold mb-2 text-white">Nama Produk</h2>
            <p className="text-white">Deskripsi singkat produk yang menarik.</p>
            <div className="flex justify-end mt-4">
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
