import { useState } from "react";
import { useNavigate } from "react-router";

import useAuthStore from "../store/authStore";

function LoginPage() {
  const [name, setName] = useState<string>("");

  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const handleLogin = (): void => {
    if (name.trim() === "") {
      return;
    }

    login(name.trim());
    navigate("/claims");
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Login
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Enter your name to access protected claims.
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="mt-5 w-full rounded border border-gray-300 p-3 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />

        <button
          onClick={handleLogin}
          className="mt-4 w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;