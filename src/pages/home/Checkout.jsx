import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatRupiah from "../../utils/FormatRupiah";
import Swal from "sweetalert2";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router";
import { deleteCart } from "../../redux/features/CartSlice";
import { UserContext } from "../../contexts/userContext";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart);
  const { userData } = useContext(UserContext);
  const [alamatLengkap, setAlamatLengkap] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [noHp, setNoHp] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pesanan = {
    item: cartItems,
    total: cartItems.reduce(
      (total, item) => total + 15000 + item.quantity * item.price,
      0
    ),
    alamatLengkap,
    namaLengkap,
    noHp,
    pesan,
    userId: userData.id,
    userData: userData,
    status: "pending",
    createdAt: new Date(),
  };

  const handleCheckout = async () => {
    if (!alamatLengkap || !namaLengkap || !noHp) {
      return Swal.fire({
        icon: "warning",
        title: "Lengkapi semua data!",
        text: "Mohon isi semua form pengiriman dan pesan.",
      });
    }

    try {
      setLoading(true);

      const batch = writeBatch(db);

      for (const item of cartItems) {
        const productRef = doc(db, "products", item.id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          throw new Error(`Produk dengan ID ${item.id} tidak ditemukan.`);
        }

        const currentStock = productSnap.data().stock;

        if (currentStock < item.quantity) {
          throw new Error(`Stok ${item.name} tidak mencukupi.`);
        }

        batch.update(productRef, {
          stock: currentStock - item.quantity,
        });
      }

      await addDoc(collection(db, "pesanan"), {
        ...pesanan,
      });

      await batch.commit();

      Swal.fire({
        icon: "success",
        title: "Pesanan berhasil dibuat!",
        text: "Kami akan segera memproses pesananmu.",
      }).then(() => {
        dispatch(deleteCart());
        navigate("/", { replace: true });
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.message || "Terjadi kesalahan saat memproses pesanan.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, []);

  const handleClickAlamat = () => {
    if (!userData.alamat || !userData.userName || !userData.noHp) {
      navigate("/profile/edit");
      return;
    }
    setAlamatLengkap(userData.alamat);
    setNamaLengkap(userData.userName);
    setNoHp(userData.noHp);
  };

  return (
    <div className="space-y-4 pb-10 p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      <h1 className="text-2xl md:text-3xl font-bold my-4 text-center">
        Checkout Produk
      </h1>
      <div className="max-w-4xl mx-auto rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 p-6 md:p-10 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Alamat Pengiriman</h2>
            <button
              onClick={handleClickAlamat}
              className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              {!userData.alamat || !userData.userName || !userData.noHp
                ? "Buat alaman baru "
                : "Gunakan Alamat Saya"}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Alamat lengkap</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan alamat disini"
              value={alamatLengkap}
              onChange={(e) => setAlamatLengkap(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nama Penerima</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan Nama anda disini"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nomer Telepon</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan Nomer disini"
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Detail Produk</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Img
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Harga satuan
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <img
                        src={item.imgUrl}
                        alt=""
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {formatRupiah(item.price)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {formatRupiah(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto">
              <label className="text-sm font-medium">Pesan</label>
              <input
                type="text"
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:bg-gray-700 dark:text-white"
                placeholder="Pesan untuk seller"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
              />
            </div>
            <div className="space-y-2 mt-4 sm:mt-0">
              <div className="flex justify-between items-center text-sm md:text-base">
                <h3 className="w-32">Ongkos kirim</h3>
                <h3 className="font-semibold">{formatRupiah(15000)}</h3>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4"></div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-lg sm:text-2xl font-bold">
            <h3 className="w-full sm:w-auto">
              Total Pesanan (
              {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
              produk)
            </h3>
            <h3 className="mt-2 sm:mt-0 text-blue-600 dark:text-blue-400">
              {formatRupiah(
                15000 +
                  cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
              )}
            </h3>
          </div>
          <div className="flex justify-end pt-6">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Buat Pesanan"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
