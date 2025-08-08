import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";

export default function Message() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await getDocs(collection(db, "contactUsMessages"));
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
    } catch (error) {
      console.log("Gagal mengambil data order:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat mengambil data.", "error");
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
      <h1 className="text-2xl font-bold mb-6 text-center">
        Daftar Semua pesan
      </h1>
      {loading && <p>Loading...</p>}
      {data.length === 0 && <p>Tidak ada pesan</p>}
      {data.map((item, index) => {
        return (
          <div key={index}>
            <div className="border border-gray-300 p-4 mb-4 space-y-2">
              <h1>
                Dari : {item.name} ({item.email})
              </h1>
              <h1> No. Whatsapp : {item.phoneNumber}</h1>
              <h1> Subject : {item.subject}</h1>
              <h2> Pesan : {item.message}</h2>
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${formattedPhoneNumber(item.phoneNumber)}`
                  )
                }
                className="btn btn-primary"
              >
                Kirim Whatsapp
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
