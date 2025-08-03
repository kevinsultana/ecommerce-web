import React, { useEffect, useState } from "react";
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

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart);
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
  };
  // console.log(pesanan);
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

      const batch = writeBatch(db); // gunakan batch biar aman dan atomik

      // Loop dan kurangi stok produk
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

      // Simpan pesanan
      await addDoc(collection(db, "pesanan"), {
        ...pesanan,
        status: "pending",
        createdAt: new Date(),
      });

      // Commit semua update stok sekaligus
      await batch.commit();

      Swal.fire({
        icon: "success",
        title: "Pesanan berhasil dibuat!",
        text: "Kami akan segera memproses pesananmu.",
      }).then(() => {
        dispatch(deleteCart());
        navigate("/");
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

  return (
    <div className="space-y-4 pb-10">
      <h1 className="text-2xl font-bold my-4 text-center">Checkout Produk</h1>
      <div className="border p-4 rounded-2xl bg-gray-100 dark:bg-gray-700 space-y-4">
        <h2 className="text-lg font-bold">Alamat Pengiriman</h2>
        <div className="flex flex-col gap-4 ">
          <label>Alamat lengkap</label>
          <input
            type="text"
            className="input input-bordered w-full text-black bg-slate-200 dark:bg-gray-700 dark:text-white"
            placeholder="Masukkan alamat disini"
            value={alamatLengkap}
            onChange={(e) => setAlamatLengkap(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label>Nama Penerima</label>
          <input
            type="text"
            className="input input-bordered w-full text-black bg-slate-200 dark:bg-gray-700 dark:text-white"
            placeholder="Masukkan Nama anda disini"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label>Nomer Telepon</label>
          <input
            type="text"
            className="input input-bordered w-full text-black bg-slate-200 dark:bg-gray-700 dark:text-white"
            placeholder="Masukkan Nomer disini"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
          />
        </div>
      </div>
      <div className="border p-4 rounded-2xl bg-gray-100 dark:bg-gray-700 space-y-4">
        <h1 className="text-lg font-bold">Detail Produk</h1>
        <table className="table text-base border">
          <thead className="text-black dark:text-white capitalize border text-lg">
            <td>no</td>
            <td>Img</td>
            <td>Name</td>
            <td>harga satuan</td>
            <td>Jumlah</td>
            <td>Subtotal</td>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td className="border-b">{index + 1}</td>
                <td className="border-b">
                  <img src={item.imgUrl} alt="" className="w-16 h-16" />
                </td>
                <td className="border-b">{item.name}</td>
                <td className="border-b">{formatRupiah(item.price)}</td>
                <td className="border-b">{item.quantity}</td>
                <td className="border-b">
                  {formatRupiah(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between pr-50">
          <div className="flex gap-4 items-center">
            <label>Pesan</label>
            <input
              type="text"
              className="input input-bordered max-w-2xs text-black bg-slate-200 dark:bg-gray-700 dark:text-white"
              placeholder="Pesan untuk seller"
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
            />
          </div>
          <div className="space-y-6">
            <div className="flex gap-40 items-center">
              <h3>Ongkos kirim</h3>
              <h3>{formatRupiah(15000)}</h3>
            </div>
          </div>
        </div>
        <div className="flex gap-20 items-center text-2xl justify-end pr-40 border-t pt-2">
          <h3>
            Total Pesanan (
            {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
            produk)
          </h3>
          <h3>
            {formatRupiah(
              15000 +
                cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )
            )}
          </h3>
        </div>
        <div className="flex justify-end pr-40 pt-6">
          <button onClick={handleCheckout} className="btn btn-primary">
            {loading ? <span className="loading"></span> : "Buat Pesanan"}
          </button>
        </div>
      </div>
    </div>
  );
}
