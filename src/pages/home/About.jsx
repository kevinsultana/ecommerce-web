// src/pages/home/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      <div className="max-w-4xl mx-auto rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 p-6 md:p-10 space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Tentang Kami
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
          Selamat datang di E-commerce Web App! Kami berkomitmen untuk
          menyediakan pengalaman belanja online terbaik dengan berbagai pilihan
          produk berkualitas dan harga terjangkau.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-indigo-600 pb-2">
            Misi Kami
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Misi kami adalah menjadi platform e-commerce terdepan yang dapat
            diandalkan oleh semua orang. Kami berusaha untuk selalu menghadirkan
            produk-produk unggulan, memberikan pelayanan pelanggan yang
            responsif, dan memastikan setiap pesanan sampai di tangan Anda
            dengan aman dan cepat.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-indigo-600 pb-2">
            Kenapa Memilih Kami?
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Produk Berkualitas:
              </span>{" "}
              Kami hanya menjual produk-produk pilihan yang telah melalui proses
              seleksi ketat.
            </li>
            <li>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Harga Terbaik:
              </span>{" "}
              Nikmati harga kompetitif dan penawaran menarik setiap hari.
            </li>
            <li>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Pelayanan Prima:
              </span>{" "}
              Tim dukungan pelanggan kami siap membantu Anda kapan saja.
            </li>
            <li>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Pengiriman Cepat & Aman:
              </span>{" "}
              Kami bekerja sama dengan mitra logistik terpercaya untuk
              pengiriman yang cepat.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
