import React, { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router";
import { auth } from "../../firebase/firebase";

export default function UserProfile() {
  const { user, userRole, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigate("/", { replace: true });
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-lg text-red-500">Anda tidak login.</p>
        <button
          onClick={() => navigate("/auth/login")}
          className="btn btn-primary"
        >
          Login Here
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="card w-full max-w-lg shadow-xl bg-slate-100 dark:bg-gray-700 text-gray-900 dark:text-white">
        <div className="card-body items-center text-center">
          <CgProfile className="h-24 w-24 mb-4 text-primary" />
          <h2 className="card-title text-3xl font-bold mb-2">
            Profil Pengguna
          </h2>
          <p className="text-lg mb-2">
            Email: <span className="font-semibold">{user.email}</span>
          </p>
          <p className="text-lg mb-4">
            Role:
            <span className="font-semibold capitalize">
              {userRole || "User"}
            </span>
          </p>
          <div className="card-actions">
            <Link
              to="/profile/edit"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-8 transition-all duration-300"
            >
              Edit Profil
            </Link>
            <Link
              to="/purchase"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-8 transition-all duration-300"
            >
              Pesanan Saya
            </Link>
            {userRole === "admin" && (
              <Link
                to="/seller"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-8 transition-all duration-300"
              >
                Go to Seller Centre
              </Link>
            )}
            <button
              onClick={handleLogOut}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-8 transition-all duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
