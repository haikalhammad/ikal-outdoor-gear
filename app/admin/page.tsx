export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if ((session.user as { role?: string }).role !== "admin") {
    redirect("/");
  }

  const stats = [
    { label: "Total Produk", value: "10", icon: "📦", color: "bg-blue-500" },
    { label: "Total Order", value: "0", icon: "🛒", color: "bg-green-500" },
    { label: "Customer", value: "2", icon: "👥", color: "bg-purple-500" },
    { label: "Pendapatan", value: "Rp0", icon: "💰", color: "bg-amber-500" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ⚙️ Admin Panel
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Selamat datang, <strong>{session.user.name}</strong>!
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60"
          >
            <div className="flex items-center gap-3">
              <div
                className={
                  "flex h-12 w-12 items-center justify-center rounded-lg text-2xl " +
                  stat.color
                }
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/products"
          className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/60"
        >
          <div className="mb-3 text-3xl">📦</div>
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 dark:text-white">
            Kelola Produk
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tambah, edit, atau hapus produk dari katalog
          </p>
        </Link>

        <Link
          href="/admin/orders"
          className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/60"
        >
          <div className="mb-3 text-3xl">🛒</div>
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 dark:text-white">
            Kelola Order
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Lihat dan update status pesanan customer
          </p>
        </Link>

        <Link
          href="/admin/customers"
          className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/60"
        >
          <div className="mb-3 text-3xl">👥</div>
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 dark:text-white">
            Kelola Customer
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Lihat daftar user terdaftar
          </p>
        </Link>
      </div>
    </section>
  );
}