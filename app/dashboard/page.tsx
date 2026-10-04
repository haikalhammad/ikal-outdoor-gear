export const dynamic = "force-dynamic";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const user = session.user as {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };

  const initials = user.name?.[0]?.toUpperCase() ?? "U";

  const stats = [
    {
      label: "Total Pesanan",
      value: "0",
      icon: "📦",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Sedang Disewa",
      value: "0",
      icon: "⏳",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      label: "Selesai",
      value: "0",
      icon: "✅",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      label: "Total Belanja",
      value: "Rp0",
      icon: "💰",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {/* ========== HERO HEADER ========== */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-900 to-emerald-950 p-8 text-white shadow-2xl sm:p-10">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />

        {/* Top shine */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/15 text-3xl font-bold ring-4 ring-white/20 backdrop-blur-md">
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="text-sm text-green-200/80">
              Selamat datang kembali,
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              {user.name ?? "User"}
            </h1>
            <p className="mt-1 text-sm text-green-100/70">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                {user.role === "admin" ? "Administrator" : "Customer"}
              </span>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md transition-colors hover:bg-white/30"
                >
                  ⚙️ Admin Panel
                </Link>
              )}
            </div>
          </div>

          {/* Edit button */}
          <Link
            href="/dashboard/profile"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-md transition-colors hover:bg-white/20"
          >
            ✏️ Edit Profil
          </Link>
        </div>
      </div>

      {/* ========== STATS ========== */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              className={
                "absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-10 transition-opacity group-hover:opacity-20 " +
                stat.gradient
              }
            />
            <div className="relative">
              <div
                className={
                  "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-lg text-white shadow-md " +
                  stat.gradient
                }
              >
                {stat.icon}
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ========== QUICK ACTIONS ========== */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/products"
          className="group flex items-center gap-4 rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
            🎒
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 group-hover:text-green-700">
              Lihat Produk
            </p>
            <p className="text-xs text-gray-500">
              Jelajahi perlengkapan
            </p>
          </div>
          <span className="text-gray-400 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/cara-sewa"
          className="group flex items-center gap-4 rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
            📖
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 group-hover:text-blue-700">
              Cara Sewa
            </p>
            <p className="text-xs text-gray-500">
              Panduan lengkap
            </p>
          </div>
          <span className="text-gray-400 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/kontak"
          className="group flex items-center gap-4 rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
            💬
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 group-hover:text-purple-700">
              Butuh Bantuan?
            </p>
            <p className="text-xs text-gray-500">
              Hubungi kami
            </p>
          </div>
          <span className="text-gray-400 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* ========== PESANAN ========== */}
      <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📦</span>
            <h2 className="text-lg font-bold text-gray-900">
              Pesanan Saya
            </h2>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            0 pesanan
          </span>
        </div>

        <div className="p-8">
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
              🛒
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              Belum Ada Pesanan
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Yuk mulai sewa perlengkapan mendaki pertamamu!
            </p>
            <Link
              href="/products"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-lg"
            >
              Lihat Produk
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}