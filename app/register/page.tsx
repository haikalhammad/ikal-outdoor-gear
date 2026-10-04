"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!name.trim()) return toast.error("Nama wajib diisi");
    if (!email.trim()) return toast.error("Email wajib diisi");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Format email tidak valid");
    if (password.length < 6)
      return toast.error("Password minimal 6 karakter");
    if (password !== confirmPassword)
      return toast.error("Password tidak cocok");

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Gagal mendaftar");
        setLoading(false);
        return;
      }

      toast.success("Registrasi berhasil! Login otomatis...");

      // Auto-login setelah register
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        toast.error("Registrasi berhasil, tapi login gagal. Coba login manual.");
        router.push("/login");
        return;
      }

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
      <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        <div className="mb-8 text-center">
          <div className="text-4xl">⛰️</div>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            Daftar Akun Baru
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gratis & cepat — langsung bisa sewa
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col text-sm">
            <span className="mb-1.5 font-medium text-gray-700">
              Nama Lengkap
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Budi Santoso"
              className="rounded-lg border border-gray-300 bg-white/60 px-3 py-2.5 text-sm backdrop-blur-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1.5 font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              className="rounded-lg border border-gray-300 bg-white/60 px-3 py-2.5 text-sm backdrop-blur-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1.5 font-medium text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="rounded-lg border border-gray-300 bg-white/60 px-3 py-2.5 text-sm backdrop-blur-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1.5 font-medium text-gray-700">
              Konfirmasi Password
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password"
              className="rounded-lg border border-gray-300 bg-white/60 px-3 py-2.5 text-sm backdrop-blur-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-green-700 hover:underline"
          >
            Login di sini
          </Link>
        </p>
      </div>
    </section>
  );
}