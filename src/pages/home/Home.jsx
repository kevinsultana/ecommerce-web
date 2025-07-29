import React from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigate("/auth/login", { replace: true });
    });
  };
  return (
    <div className="min-h-screen p-4">
      <div className="hero bg-base-200 rounded-lg p-8 mb-8 dark:bg-gray-700">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Selamat Datang di Toko Kami!</h1>
            <p className="py-6">
              Temukan berbagai produk menarik dengan harga terbaik. Selamat
              berbelanja!
            </p>
            <button className="btn btn-primary">Lihat Produk</button>
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
          className="card bg-base-100 shadow-xl image-full dark:bg-gray-800"
        >
          <figure>
            <img src="https://via.placeholder.com/300" alt="Produk" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Nama Produk</h2>
            <p>Deskripsi singkat produk yang menarik.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Beli Sekarang</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl image-full dark:bg-gray-800">
          <figure>
            <img src="https://via.placeholder.com/300" alt="Produk" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Nama Produk</h2>
            <p>Deskripsi singkat produk yang menarik.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Beli Sekarang</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl image-full dark:bg-gray-800">
          <figure>
            <img src="https://via.placeholder.com/300" alt="Produk" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Nama Produk</h2>
            <p>Deskripsi singkat produk yang menarik.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Beli Sekarang</button>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleLogOut} className="btn btn-error mt-8">
        Log Out
      </button>
    </div>
  );
}
