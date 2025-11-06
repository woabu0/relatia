"use client";

import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Lock, Briefcase } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "client",
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.post("/register", form);
      alert("Registration successful! Please login to continue.");
      router.push("/login");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h1 className="text-2xl font-bold text-center">Create Account</h1>
            <p className="text-blue-100 text-center mt-2">
              Join us today and get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <option value="client">Client</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 text-center">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Features List */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Easy to use</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Secure</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Briefcase className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Flexible roles</p>
          </div>
        </div>
      </div>
    </div>
  );
}