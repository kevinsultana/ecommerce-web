import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../../redux/features/CartSlice";

export default function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const product = {
    id: params.id,
    name: `Produk ID ${params.id}`,
    description:
      "Ini adalah deskripsi lengkap dari produk ini. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 199.99,
    imageUrl: "",
    stock: 10,
  };

  return (
    <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
      <div className="w-full lg:w-1/2">
        <img
          src={
            product.imageUrl
              ? product.imageUrl
              : "https://via.placeholder.com/400"
          }
          alt={product.name}
          className="w-full rounded-lg shadow-md"
        />
      </div>
      <div className="w-full lg:w-1/2 card bg-base-100 shadow-xl dark:bg-gray-800 p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          {product.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          {product.description}
        </p>
        <div className="flex items-center mb-4">
          <span className="text-primary text-3xl font-bold mr-4">
            ${product.price.toFixed(2)}
          </span>
          <span className="badge badge-info text-white">
            Stok: {product.stock}
          </span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              dispatch(addToCart(product));
            }}
            className="btn btn-primary flex-1"
          >
            Tambahkan ke Keranjang
          </button>
          <button className="btn btn-outline btn-secondary flex-1">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
