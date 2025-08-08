import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/userContext";

export default function ContactUs() {
  const { userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message ||
      !formData.phoneNumber
    ) {
      Swal.fire(
        "Lengkapi Semua Data!",
        "Mohon isi semua kolom yang diperlukan.",
        "warning"
      );
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "contactUsMessages"), {
        ...formData,
        createdAt: new Date(),
      });
      Swal.fire("Berhasil!", "Pesan Anda telah terkirim.", "success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phoneNumber: "",
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengirim pesan.", "error");
    } finally {
      setLoading(false);
    }
  };

  const hanldeUseUserData = () => {
    setFormData({
      name: userData.userName,
      email: userData.email,
      phoneNumber: userData.noHp,
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      <div className="max-w-4xl mx-auto rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 p-6 md:p-10 space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Hubungi Kami
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
          Punya pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi
          kami melalui formulir di bawah ini. <br />
          <button
            onClick={hanldeUseUserData}
            className="text-blue-500 cursor-pointer"
          >
            Gunakan Data Saya
          </button>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nama Anda"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Whatsapp No.
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="081234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subjek
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Subjek pesan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pesan
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-sm text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tulis pesan Anda di sini..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" /> Kirim Pesan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
