import React, { useState } from "react";
import Swal from "sweetalert2";
import { auth, googleProvider } from "../../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
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
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log(response);
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
      const oauthLogin = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(oauthLogin);
      const token = credential.accessToken;
      console.log(credential);
      // navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      Swal.fire("Error Signing in with Google");
    }
  };

  return (
    <div className="min-h-screen">
      <h1>Login</h1>
      <form className="flex flex-col gap-4 border border-gray-400 p-4 w-1/3">
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="input email here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="input password here"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>
          {loadingBtn ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <button onClick={handleRegister}>Register</button>
      <button
        onClick={handleGoogleSignIn}
        className="w-3/4 flex items-center justify-center gap-4 text-white bg-red-600 rounded-xl hover:bg-red-700 p-2 my-2 transition-all duration-300"
      >
        <FaGoogle />
        <p>Login with Google</p>
      </button>
    </div>
  );
}
