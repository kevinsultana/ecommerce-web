import React, { useState } from "react";
import Swal from "sweetalert2";
import { auth, googleProvider } from "../../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and Password is required",
      });
      setLoadingBtn(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Login Success!");
      setLoadingBtn(false);
      navigate("/", { replace: true });
    } catch (error) {
      setLoadingBtn(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password",
      });
    }
  };

  const handleRegister = () => {
    navigate("/auth/register", { replace: true });
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoadingBtn(true);
      await signInWithPopup(auth, googleProvider);
      Swal.fire("Login Success with Google!");
      setLoadingBtn(false);
      navigate("/", { replace: true });
    } catch (error) {
      setLoadingBtn(false);
      console.error(error);
      Swal.fire("Error Signing in with Google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="card w-full max-w-sm shadow-xl bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300">
        <div className="card-body">
          <h2 className="card-title text-center text-3xl font-bold mb-6">
            Login
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <label className="label">
                <span className="label-text text-black dark:text-gray-300">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="input input-bordered w-full text-black bg-slate-200 dark:bg-gray-700 dark:text-white"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-black dark:text-gray-300">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Masukkan password Anda"
                className="input input-bordered w-full text-black bg-slate-200 dark:bg-gray-700 dark:text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={loadingBtn}
            >
              {loadingBtn ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="divider divider-neutral dark:divider-warning text-gray-500 dark:text-gray-400">
            OR
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-error flex items-center gap-2 hover:bg-red-500 hover:text-white"
            disabled={loadingBtn}
          >
            <FaGoogle />
            Login with Google
          </button>
          <p className="text-center mt-4 text-sm dark:text-gray-300">
            Don't have an account?{" "}
            <button
              onClick={handleRegister}
              className="link link-hover text-blue-500 dark:text-blue-400"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
