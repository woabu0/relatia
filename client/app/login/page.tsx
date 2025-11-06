"use client";

import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState({ 
    email: "", 
    password: "" 
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
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
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      
      // Show success message
      alert("Login successful! Welcome back.");
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
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
            <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
            <p className="text-blue-100 text-center mt-2">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot your password?
              </button>
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
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to our platform?</span>
              </div>
            </div>

            {/* Register Link */}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              Create New Account
            </button>
          </form>
        </div>

        {/* Features List */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Secure Login</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Mail className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Easy Access</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Quick Setup</p>
          </div>
        </div>
      </div>
    </div>
  );
}