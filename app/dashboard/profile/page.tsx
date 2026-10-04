"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setImage(session.user.image ?? "");
    }
  }, [session]);

  /* ========== Upload foto ========== */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal 2MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Gagal upload foto");
        return;
      }

      setImage(data.url);
      toast.success("Foto berhasil diupload!");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  /* ========== Simpan profil ========== */
  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama tidak boleh kosong");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Gagal update profil");
        return;
      }
      toast.success("Profil berhasil diperbarui!");
      await updateSession();
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  /* ========== Ubah password ========== */
  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Password saat ini wajib diisi");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password baru minimal 6 karakter");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Gagal update password");
        return;
      }
      toast.success("Password berhasil diubah!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-gray-500">Memuat...</p>
      </section>
    );
  }

  const initials = name?.[0]?.toUpperCase() ?? "U";

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-green-700">
          Dashboard
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-700">Edit Profil</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Profil</h1>
        <p className="mt-1 text-sm text-gray-500">
          Perbarui informasi akun dan password
        </p>
      </div>

      <div className="space-y-6">
        {/* ========== INFORMASI AKUN ========== */}
        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-xl backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          <div className="relative border-b border-white/40 px-6 py-5">
            <h2 className="flex items-center gap-3 text-lg font-bold text-gray-900">
              {/* SVG user icon */}
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-700 text-white shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              Informasi Akun
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Data ini dipakai untuk identifikasi pesananmu
            </p>
          </div>

          <form onSubmit={handleSubmitProfile} className="relative p-6">
            {/* ========== AVATAR UPLOAD ========== */}
            <div className="mb-8 flex flex-col items-center">
              <div className="group relative">
                {/* Avatar */}
                <div className="relative h-28 w-28 overflow-hidden rounded-full bg-gradient-to-br from-green-500 to-green-700 shadow-xl ring-4 ring-white">
                  {image ? (
                    <Image
                      src={image}
                      alt="Avatar"
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">
                      {initials}
                    </div>
                  )}
                </div>

                {/* Tombol + untuk upload */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg ring-4 ring-white transition-all hover:scale-110 hover:bg-green-700 disabled:bg-gray-400"
                  aria-label="Upload foto profil"
                >
                  {uploading ? (
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity="0.25"
                      />
                      <path
                        d="M22 12a10 10 0 0 1-10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Klik <strong>+</strong> untuk upload foto (max 2MB)
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex flex-col text-sm">
                <span className="mb-1.5 font-medium text-gray-700">
                  Nama Lengkap
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm shadow-inner backdrop-blur-md transition-all focus:border-green-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  required
                />
              </label>

              <label className="flex flex-col text-sm">
                <span className="mb-1.5 font-medium text-gray-700">Email</span>
                <input
                  type="email"
                  value={session.user.email ?? ""}
                  disabled
                  className="cursor-not-allowed rounded-xl border border-white/40 bg-gray-100/60 px-4 py-2.5 text-sm text-gray-500 backdrop-blur-md"
                />
                <span className="mt-1 text-xs text-gray-400">
                  Email tidak dapat diubah
                </span>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Link
                href="/dashboard"
                className="rounded-xl border border-white/60 bg-white/50 px-5 py-2.5 text-sm font-medium text-gray-700 backdrop-blur-md transition-colors hover:bg-white/80"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={loading || uploading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-green-600 to-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-600/40 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>

        {/* ========== UBAH PASSWORD ========== */}
        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-xl backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          <div className="relative border-b border-white/40 px-6 py-5">
            <h2 className="flex items-center gap-3 text-lg font-bold text-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              Ubah Password
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Gunakan password yang kuat &amp; unik
            </p>
          </div>

          <form onSubmit={handleSubmitPassword} className="relative p-6">
            <div className="space-y-4">
              <label className="flex flex-col text-sm">
                <span className="mb-1.5 font-medium text-gray-700">
                  Password Saat Ini
                </span>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm shadow-inner backdrop-blur-md transition-all focus:border-amber-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col text-sm">
                  <span className="mb-1.5 font-medium text-gray-700">
                    Password Baru
                  </span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm shadow-inner backdrop-blur-md transition-all focus:border-amber-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
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
                    placeholder="Ulangi password baru"
                    className="rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm shadow-inner backdrop-blur-md transition-all focus:border-amber-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/40 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {loading ? "Memproses..." : "Ubah Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}