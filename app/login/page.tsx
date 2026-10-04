"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email dan password wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Email atau password salah");
        setLoading(false);
        return;
      }

      toast.success("Login berhasil!");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan");
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-12">
      {/* Card glass */}
      <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur-xl">
        {/* Top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        <div className="mb-8 text-center">
          <div className="text-4xl">⛰️</div>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            Masuk ke Akun
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Login untuk melanjutkan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col text-sm">
            <span className="mb-1.5 font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              className="rounded-lg border border-gray-300 bg-white/60 px-3 py-2.5 text-sm backdrop-blur-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20"
              autoComplete="email"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1.5 font-medium text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg border border-gray-300 bg-white/60 px-3 py-2.5 text-sm backdrop-blur-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20"
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-medium text-green-700 hover:underline"
          >
            Daftar di sini
          </Link>
        </p>

        {/* Demo credentials */}
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50/60 p-3 text-xs text-gray-500 backdrop-blur-sm">
          <p className="font-semibold text-gray-700">🔑 Demo Login:</p>
          <p className="mt-1">
            Admin: <code className="text-green-700">admin@ikaloutdoor.id</code> / <code className="text-green-700">admin123</code>
          </p>
          <p>
            Customer: <code className="text-green-700">customer@example.com</code> / <code className="text-green-700">customer123</code>
          </p>
        </div>
      </div>
    </section>
  );
}