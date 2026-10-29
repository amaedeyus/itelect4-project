import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { registerUser } from "../api/client";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({ name, email, password });

      setSuccess("Registration successful. Redirecting to login...");
      navigate("/login");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-2xl font-bold">Create an Account</h1>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <label className="grid gap-1">
            Full Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border p-3 dark:border-gray-600 dark:bg-gray-700"
            />
          </label>

          <label className="grid gap-1">
            Email
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border p-3 dark:border-gray-600 dark:bg-gray-700"
            />
          </label>

          <label className="grid gap-1">
            Password
            <input
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded border p-3 dark:border-gray-600 dark:bg-gray-700"
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-600">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;