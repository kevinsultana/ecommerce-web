import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email is required",
      });
      return;
    }
    if (!password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password is required",
      });
      return;
    }
    setLoadingBtn(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", response.user.uid), {
        userName: userName,
        email: response.user.email,
        role: "user",
        photoProfile: "",
      });
      setLoadingBtn(false);
      Swal.fire("Register Success!");
      navigate("/", { replace: true });
    } catch (error) {
      setLoadingBtn(false);
      let message = "Register Failed";
      if (error.code === "auth/email-already-in-use") {
        message = "Email already in use";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email";
      } else if (error.code === "auth/weak-password") {
        message = "Weak password";
      }
      Swal.fire(message);
    }
  };

  const handleToLogin = () => {
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="card w-full max-w-sm shadow-xl bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300">
        <div className="card-body">
          <h2 className="card-title text-center text-3xl font-bold mb-6">
            Register
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div>
              <label className="label">
                <span className="label-text text-black dark:text-gray-300">
                  User Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Masukkan email Anda"
                className="input input-bordered w-full  text-black bg-slate-200 dark:bg-gray-700 dark:text-white"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-black dark:text-gray-300">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="input input-bordered w-full  text-black bg-slate-200 dark:bg-gray-700 dark:text-white"
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
                className="input input-bordered w-full  text-black bg-slate-200 dark:bg-gray-700 dark:text-white"
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
                "Register"
              )}
            </button>
          </form>

          <p className="text-center mt-4 text-sm dark:text-gray-300">
            Alredy Have Account?{" "}
            <button
              onClick={handleToLogin}
              className="link link-hover text-blue-500 dark:text-blue-400"
            >
              Login Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
