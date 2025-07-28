import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
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
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}
