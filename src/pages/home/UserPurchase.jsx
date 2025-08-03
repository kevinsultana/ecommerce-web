import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import formatRupiah from "../../utils/FormatRupiah";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { UserContext } from "../../contexts/userContext";
import Swal from "sweetalert2";

const statusTabs = [
  { label: "Semua", value: "semua" },
  { label: "Sedang Dikemas", value: "pending" },
  { label: "Dikirim", value: "terkirim" },
  { label: "Selesai", value: "selesai" },
];

export default function UserPurchase() {
  const [selectedStatus, setSelectedStatus] = useState("semua");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const getDataOrder = async () => {
    try {
      const q = query(
        collection(db, "pesanan"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setOrders(list);
    } catch (error) {
      console.error("Gagal mengambil pesanan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    getDataOrder();
  }, [user]);

  const filteredOrders =
    selectedStatus === "semua"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const handleUpdateStatusOrder = async (orderId) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Anda akan menyelesaikan pesanan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Selesaikan!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const orderRef = doc(db, "pesanan", orderId);
          await updateDoc(orderRef, { status: "selesai" });
          getDataOrder();
        } catch (error) {
          console.error("Gagal menyelesaikan pesanan:", error);
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "terkirim":
        return "bg-blue-100 text-blue-800";
      case "selesai":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedStatus(tab.value)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm border font-medium transition-all duration-200",
              selectedStatus === tab.value
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Order List */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <span className="loading loading-spinner"></span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada pesanan ditemukan.
        </p>
      ) : (
        <div className="space-y-5">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Tanggal:{" "}
                    {order?.createdAt?.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <div
                    className={clsx(
                      "inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium",
                      getStatusColor(order.status)
                    )}
                  >
                    {order.status}
                  </div>
                </div>
                <p className="font-bold text-blue-600 text-lg">
                  {formatRupiah(order.total)}
                </p>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                {order.item?.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatRupiah(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {order.status === "terkirim" && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleUpdateStatusOrder(order.id)}
                    className="px-4 py-2 text-sm font-semibold rounded bg-green-600 hover:bg-green-700 text-white"
                  >
                    Selesaikan Pesanan
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
