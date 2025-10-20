import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";

export default function Message() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getDocs(collection(db, "contactUsMessages"));
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
    } catch (error) {
      console.error("Gagal mengambil data pesan:", error);
      if (error.code === "permission-denied") {
        Swal.fire(
          "Akses Ditolak",
          "Anda tidak memiliki izin untuk melihat pesan.",
          "error"
        );
      } else {
        Swal.fire("Gagal", "Terjadi kesalahan saat mengambil data.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formattedPhoneNumber = (number) => {
    const cleanNumber = number.slice(1, number.length);
    return `+62${cleanNumber}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Daftar Semua Pesan
      </h1>

      {loading && (
        <div className="text-center py-8">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      )}

      {!loading && data.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Tidak ada pesan
        </p>
      )}

      {!loading &&
        data.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 dark:border-gray-700 p-4 mb-4 space-y-2 rounded-lg bg-white dark:bg-gray-800"
          >
            <h1 className="font-semibold text-gray-800 dark:text-white">
              Dari: {item.name} ({item.email})
            </h1>
            <h1 className="text-gray-700 dark:text-gray-300">
              No. Whatsapp: {item.phoneNumber}
            </h1>
            <h1 className="text-gray-700 dark:text-gray-300">
              Subject: {item.subject}
            </h1>
            <h2 className="text-gray-700 dark:text-gray-300">
              Pesan: {item.message}
            </h2>
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/${formattedPhoneNumber(item.phoneNumber)}`,
                  "_blank"
                )
              }
              className="btn btn-primary"
            >
              Kirim Whatsapp
            </button>
          </div>
        ))}
    </div>
  );
}
