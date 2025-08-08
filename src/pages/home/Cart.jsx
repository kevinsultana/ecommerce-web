import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  editCartProduct,
} from "../../redux/features/CartSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import formatRupiah from "../../utils/FormatRupiah";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Produk ini akan dihapus dari keranjang!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
        Swal.fire("Dihapus!", "Produk Anda telah dihapus.", "success");
      }
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    const quantity = Number(newQuantity);
    const totalProduct = cartItems.find((item) => item.id === id)?.stock || 0;
    if (quantity > totalProduct) return;
    if (isNaN(quantity) || quantity < 1) return;
    dispatch(editCartProduct({ id, quantity }));
  };

  const totalHarga = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Keranjang Belanja Anda
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-600 dark:text-gray-300">
          Keranjang Anda kosong. Yuk, mulai belanja!
          <br />
          <button
            onClick={() => navigate("/store")}
            className="mt-4 px-6 py-3 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Lanjut Belanja
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Daftar Produk di Keranjang */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col sm:flex-row items-center"
              >
                <div
                  className="w-full h-40 sm:w-40 sm:h-40 flex-shrink-0 cursor-pointer p-4"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={item.imgUrl || ""}
                    alt={item.name}
                    className="object-contain w-full h-full rounded-lg"
                  />
                </div>
                <div className="p-4 flex-grow w-full">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {formatRupiah(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="font-bold text-lg">{item.quantity}</span>
                    <button
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <span className="text-sm sm:text-lg font-semibold ml-4 text-gray-800 dark:text-white">
                      Total: {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
                      onClick={() => handleRemove(item.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ringkasan Pesanan */}
          <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 self-start lg:sticky lg:top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Ringkasan Pesanan
            </h2>
            <div className="flex justify-between text-lg mb-2">
              <span className="dark:text-gray-300">
                Subtotal ({totalQty} item):
              </span>
              <span className="font-semibold dark:text-white">
                {formatRupiah(totalHarga)}
              </span>
            </div>
            <div className="flex justify-between text-lg mb-4">
              <span className="dark:text-gray-300">Ongkos Kirim:</span>
              <span className="font-semibold dark:text-white">
                {formatRupiah(15000)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
            <div className="flex justify-between text-xl font-bold mb-6 text-blue-600 dark:text-blue-400">
              <span>Total:</span>
              <span>{formatRupiah(totalHarga + 15000)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full px-6 py-3 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Lanjutkan ke Pembayaran
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
