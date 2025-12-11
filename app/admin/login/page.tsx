"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-lightest via-brand-light to-brand-medium flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-darkest font-playfair mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600">Enter your credentials to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-brand-darkest mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none transition-all"
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-brand-darkest mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none transition-all"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white py-3 rounded-lg font-semibold hover:bg-brand-darkest transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-brand-medium hover:text-brand-dark text-sm font-semibold"
          >
            ← Back to Website
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> Set <code className="bg-blue-100 px-1 rounded">ADMIN_USERNAME</code> and{" "}
            <code className="bg-blue-100 px-1 rounded">ADMIN_PASSWORD</code> in your environment variables.
          </p>
        </div>
      </div>
    </div>
  );
}

