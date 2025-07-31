import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../../redux/features/CartSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import formatRupiah from "../../utils/FormatRupiah";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const getDataProduct = async () => {
    try {
      const response = await getDoc(doc(db, "products", params.id));
      const res = response.data();
      setProduct({ ...res, id: params.id });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
      <div className="w-full lg:w-1/2">
        <img
          src={product.imgUrl ? product.imgUrl : ""}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="w-full h-full lg:w-1/2 card bg-gray-100 shadow-xl dark:bg-gray-800 p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          {product.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          {product.description}
        </p>
        <div className="flex items-center mb-4">
          <span className="text-primary text-3xl font-bold mr-4">
            {formatRupiah(product.price)}
          </span>
          <span className="badge badge-info text-white">
            Stok: {product.stock}
          </span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              dispatch(addToCart({ ...product, quantity: 1 }));
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
