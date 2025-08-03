import React, { use, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addToCart } from "../../redux/features/CartSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import formatRupiah from "../../utils/FormatRupiah";
import { FaShippingFast } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { UserContext } from "../../contexts/userContext";
import Swal from "sweetalert2";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getDataProduct = async () => {
    try {
      const response = await getDoc(doc(db, "products", params.id));
      const res = response.data();
      setProduct({ ...res, id: params.id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncreaseQuantity = () => {
    if (product.stock && quantity < product.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda harus login terlebih dahulu!",
      }).then(() => {
        navigate("/auth/login");
      });
      return;
    }
    dispatch(addToCart({ ...product, quantity }));
    Swal.fire(
      "Berhasil",
      "Produk berhasil ditambahkan ke keranjang!",
      "success"
    );
  };

  const handleBuyNow = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda harus login terlebih dahulu!",
      }).then(() => {
        navigate("/auth/login");
      });
      return;
    }
    dispatch(addToCart({ ...product, quantity }));
    navigate("/checkout", { replace: true });
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 p-6 md:p-8">
        {/* Kolom Kiri: Gambar Produk */}
        <div className="w-full lg:w-2/5 flex flex-col items-center">
          <div className="w-full h-80 md:h-96 lg:h-[450px] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md flex items-center justify-center">
            <img
              src={
                product.imgUrl ||
                "https://placehold.co/400x400/CCCCCC/333333?text=Gambar+Produk"
              }
              alt={product.name || "Produk"}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          {/* Thumbnail Gambar */}
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {product.additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all duration-200"
                  onClick={() =>
                    setProduct((prev) => ({ ...prev, imgUrl: img }))
                  }
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-3/5 space-y-6">
          {/* Nama Produk */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {product.name || "Nama Produk Tidak Tersedia"}
          </h1>

          {/* <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            {product.rating && (
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{product.rating}</span>
                <span className="mx-2">|</span>
              </div>
            )}
            {product.reviews && (
              <span className="hover:underline cursor-pointer">
                {product.reviews} Penilaian
              </span>
            )}
            {product.sold && (
              <>
                <span className="mx-2">|</span>
                <span>{product.sold} Terjual</span>
              </>
            )}
          </div> */}

          {/* Harga */}
          <div className="flex items-baseline gap-3">
            <span className="text-red-600 dark:text-red-400 text-3xl md:text-5xl font-bold">
              {formatRupiah(product.price)}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

          {/* Opsi Kuantitas */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Kuantitas:
            </span>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={handleDecreaseQuantity}
                className="p-2 w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (
                    !isNaN(val) &&
                    val >= 1 &&
                    (product.stock ? val <= product.stock : true)
                  ) {
                    setQuantity(val);
                  }
                }}
                className="w-16 text-center bg-transparent border-x border-gray-300 dark:border-gray-600 focus:outline-none text-lg"
                min="1"
                max={product.stock}
              />
              <button
                onClick={handleIncreaseQuantity}
                className="p-2 w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
              >
                +
              </button>
            </div>
            {product.stock && (
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Stok Tersedia: {product.stock}
              </span>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn btn-primary text-lg py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Tambahkan ke Keranjang
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 btn btn-outline btn-secondary text-lg py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Beli Sekarang
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

          {/* Deskripsi Produk */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Deskripsi Produk
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {product.description || "Deskripsi produk tidak tersedia."}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

          {/* Informasi Pengiriman  */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FaShippingFast className="text-green-500" /> Pengiriman
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Estimasi tiba: 3-5 hari kerja.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Biaya pengiriman: {formatRupiah(15000)} (bisa berubah tergantung
              lokasi).
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
        </div>
      </div>
    </div>
  );
}
