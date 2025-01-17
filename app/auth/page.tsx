"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const AuthPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  // Handle password submission
  const handleLogin = async () => {
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Send password to the API for validation
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        login(); // Update authentication state
        router.push("/"); // Redirect to the dashboard page
      } else {
        setError(data.message || "Invalid password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error during authentication:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Password Authentication
        </h1>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Authenticating..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;