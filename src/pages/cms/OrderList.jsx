import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import formatRupiah from "../../utils/FormatRupiah";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function OrderList() {
  const [statusOrder, setStatusOrder] = useState("all");
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(orderList);

  const getOrderlistData = async () => {
    try {
      const res = await getDocs(collection(db, "pesanan"));
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrderList(data);
    } catch (error) {
      console.log("Gagal mengambil data order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderlistData();
  }, []);

  const filteredOrders =
    statusOrder === "all"
      ? orderList
      : orderList.filter((order) => order.status === statusOrder);

  const handleKirimPesanan = async (orderId) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Anda akan mengirim pesanan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Kirim!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const orderRef = doc(db, "pesanan", orderId);
          await updateDoc(orderRef, { status: "terkirim" });
          getOrderlistData();
        } catch (error) {
          console.error("Gagal mengirim pesanan:", error);
        }
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Daftar Semua Orderan
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium text-gray-700 dark:text-white">
          Filter Status:
        </label>
        <select
          value={statusOrder}
          onChange={(e) => setStatusOrder(e.target.value)}
          className="px-4 py-2 border rounded text-sm capitalize dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="all">Semua</option>
          <option value="pending">Pending</option>
          <option value="terkirim">Terkirim</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center my-10">
          <span className="loading loading-spinner"></span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada pesanan dengan status tersebut.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800">
                <img
                  src={
                    order?.userData?.photoProfile === ""
                      ? "/src/assets/img/userPlaceholder.png"
                      : order?.userData?.photoProfile
                  }
                  alt={order?.userData?.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {order?.userData?.userName || "Tanpa Nama"}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    Status: {order.status}
                  </p>
                </div>
                <div className="ml-auto text-blue-600 font-semibold text-sm">
                  Total: {formatRupiah(order.total)}
                </div>
              </div>

              <div className="divide-y">
                {order.item.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} pcs × {formatRupiah(item.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">
                      {formatRupiah(item.quantity * item.price)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Informasi Pengiriman
                </h2>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex">
                    <span className="w-40 font-medium">Nama Penerima</span>
                    <span>: {order.namaLengkap}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 font-medium">No. Telepon</span>
                    <span>: {order.noHp}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 font-medium">Alamat</span>
                    <span>: {order.alamatLengkap}</span>
                  </div>
                </div>
              </div>
              {order.status === "pending" && (
                <div className="flex items-center justify-end p-4">
                  <button
                    onClick={() => handleKirimPesanan(order.id)}
                    className="btn btn-primary"
                  >
                    Kirim
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
