import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  editCartProduct,
} from "../../redux/features/CartSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
        Swal.fire("Dihapus!", "Produk Anda telah dihapus.", "success");
      }
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(editCartProduct({ id, quantity: newQuantity }));
  };

  const totalHarga = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Keranjang Belanja Anda
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-600 dark:text-gray-300">
          Keranjang Anda kosong. Yuk, mulai belanja!
          <br />
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary mt-4"
          >
            Lanjut Belanja
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Daftar Produk di Keranjang */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card card-side bg-base-100 shadow-xl dark:bg-gray-800 items-center"
              >
                <figure className="w-32 h-32 flex-shrink-0">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="object-cover w-full h-full rounded-l-lg"
                  />
                </figure>
                <div className="card-body p-4 flex-grow">
                  <h2 className="card-title text-xl text-gray-800 dark:text-white">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-circle"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-circle"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <span className="text-lg font-semibold ml-4">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button
                      className="btn btn-sm btn-error"
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
          <div className="w-full lg:w-1/3 card bg-base-100 shadow-xl dark:bg-gray-800 p-6 self-start sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Ringkasan Pesanan
            </h2>
            <div className="flex justify-between text-lg mb-2">
              <span className="dark:text-gray-300">Subtotal:</span>
              <span className="font-semibold dark:text-white">
                ${totalHarga.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-lg mb-4">
              <span className="dark:text-gray-300">Ongkos Kirim:</span>
              <span className="font-semibold dark:text-white">$5.00</span>{" "}
              {/* Contoh ongkir */}
            </div>
            <div className="divider my-2"></div>
            <div className="flex justify-between text-xl font-bold mb-6 text-primary">
              <span>Total:</span>
              <span>${(totalHarga + 5).toFixed(2)}</span>
            </div>
            <button className="btn btn-primary w-full">
              Lanjutkan ke Pembayaran
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
