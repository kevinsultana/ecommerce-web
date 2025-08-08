import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { FaUserCircle } from "react-icons/fa";
import CloudinaryUploadBtn from "../../components/CloudinaryUploadBtn";

export default function EditProfile() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    userName: "",
    noHp: "",
    alamat: "",
    photoProfile: "",
  });

  useEffect(() => {
    if (userData) {
      setProfileData({
        userName: userData.userName || "",
        noHp: userData.noHp || "",
        alamat: userData.alamat || "",
        photoProfile: userData.photoProfile || "/img/userPlaceholder.png",
      });
    } else {
      navigate("/", { replace: true });
    }
  }, [userData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSetPhotoUrl = (url) => {
    setProfileData((prevData) => ({ ...prevData, photoProfile: url }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!userData) {
        throw new Error("User data is not available.");
      }

      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, {
        userName: profileData.userName,
        noHp: profileData.noHp,
        alamat: profileData.alamat,
        photoProfile: profileData.photoProfile,
      });

      setUserData({
        ...userData,
        userName: profileData.userName,
        noHp: profileData.noHp,
        alamat: profileData.alamat,
        photoProfile: profileData.photoProfile,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Profil Anda berhasil diperbarui.",
      }).then(() => {
        navigate("/profile");
      });
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat memperbarui profil.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Edit Profil
      </h1>
      <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-10">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              {profileData.photoProfile &&
              profileData.photoProfile !== "/img/userPlaceholder.png" ? (
                <img
                  src={profileData.photoProfile}
                  alt="Profil"
                  className="w-full h-full object-cover rounded-full border-4 border-gray-200 dark:border-gray-600"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <div className="mt-2">
              <CloudinaryUploadBtn setImgUrl={handleSetPhotoUrl} />
            </div>
          </div>

          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium mb-1"
            >
              Nama Pengguna
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={profileData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="noHp" className="block text-sm font-medium mb-1">
              Nomor HP
            </label>
            <input
              type="text"
              id="noHp"
              name="noHp"
              value={profileData.noHp}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="alamat" className="block text-sm font-medium mb-1">
              Alamat
            </label>
            <textarea
              id="alamat"
              name="alamat"
              value={profileData.alamat}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-2 rounded-md font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                "Simpan Perubahan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
