import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import formatRupiah from "../../utils/FormatRupiah";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { UserContext } from "../../contexts/userContext";

const statusTabs = [
  { label: "Semua", value: "semua" },
  { label: "Sedang Dikemas", value: "pending" },
  { label: "Dikirim", value: "dikirim" },
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

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedStatus(tab.value)}
            className={clsx(
              "px-4 py-2 rounded-full border",
              selectedStatus === tab.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada pesanan.</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm font-medium">
                    Tanggal:{" "}
                    {order?.createdAt?.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm capitalize">Status: {order.status}</p>
                </div>
                <p className="font-bold text-blue-600">
                  {formatRupiah(order.total)}
                </p>
              </div>
              <ul className="text-sm text-gray-600">
                {order.item?.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} —{" "}
                    {formatRupiah(item.price * item.quantity)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
