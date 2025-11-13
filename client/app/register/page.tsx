"use client";

import { useState } from "react";
import { apiService } from "../../lib/api";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  companyName: string;
  phone: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    companyName: "",
    phone: ""
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

    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
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
      await apiService.register(form);
      alert("Registration successful! Please login to continue.");
      router.push("/login");
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed";
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof RegisterForm, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-slate-900">
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-3xl sm:text-4xl font-semibold text-white">
          Create your Relatia account
        </h1>
        <p className="mt-2 text-center text-sm sm:text-base text-slate-400">
          Set up access for your team in just a few steps.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-300"
              >
                Name *
              </label>
              <input
                id="username"
                type="text"
                placeholder="Your full name"
                className={`w-full rounded-xl border bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.username ? "border-red-500 focus:ring-red-500" : "border-slate-600"
                }`}
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
              {errors.username && (
                <p className="text-sm text-red-400">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300"
              >
                Work email *
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className={`w-full rounded-xl border bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-slate-600"
                }`}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-slate-300"
              >
                Company *
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="Company or team name"
                className={`w-full rounded-xl border bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyName ? "border-red-500 focus:ring-red-500" : "border-slate-600"
                }`}
                value={form.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
              {errors.companyName && (
                <p className="text-sm text-red-400">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-300"
              >
                Phone *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Contact number"
                className={`w-full rounded-xl border bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? "border-red-500 focus:ring-red-500" : "border-slate-600"
                }`}
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="text-sm text-red-400">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              Password *
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                className={`w-full rounded-xl border bg-slate-800 px-4 py-3 pr-12 text-white placeholder:text-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-slate-600"
                }`}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-slate-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          {errors.submit && (
            <div className="rounded-xl border border-red-500/50 bg-red-500/20 px-4 py-3 text-center text-sm text-red-300">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating account...
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
