"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { toast } from "sonner";
import { getProductBySlug } from "../../data/products";
import { useCart } from "../../context/CartContext";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function diffDays(start: string, end: string) {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.max(1, Math.ceil((e - s) / (1000 * 60 * 60 * 24)));
}

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = getProductBySlug(params.slug);
  const { addToCart } = useCart();

  const today = formatDate(new Date());
  const threeDaysLater = formatDate(addDays(new Date(), 3));

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(threeDaysLater);

  if (!product) {
    notFound();
  }

  const days = diffDays(startDate, endDate);
  const total = product.pricePerDay * days;
  const isAvailable = product.stock > 0;
  const isValidRange = new Date(endDate) > new Date(startDate);
  const isPackage = product.category === "Paket Camp";

  const handleAddToCart = () => {
    if (!isValidRange) {
      toast.error("Tanggal selesai harus setelah tanggal mulai");
      return;
    }
    addToCart({ product, startDate, endDate, days });
    toast.success(
      `${product.name} ditambahkan ke keranjang untuk ${days} hari!`,
      {
        description: `Total: Rp${total.toLocaleString("id-ID")}`,
      }
    );
  };

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-10">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/20" />
      </div>

      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-green-700 dark:hover:text-green-400">
          Beranda
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href="/products"
          className="hover:text-green-700 dark:hover:text-green-400"
        >
          Semua Produk
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Gambar */}
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">
          <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Gambar {product.name}
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <span
              className={
                "absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md " +
                (isPackage
                  ? "bg-green-600/90 text-white"
                  : "bg-amber-400/90 text-amber-900")
              }
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Info produk — glass card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-6 shadow-xl backdrop-blur-2xl sm:p-8 dark:border-gray-800 dark:bg-gray-900/60">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative">
            <span
              className={
                "inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide " +
                (isPackage
                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300")
              }
            >
              {product.category}
            </span>

            <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-green-700 dark:text-green-400">
                Rp{product.pricePerDay.toLocaleString("id-ID")}
              </span>
              <span className="text-gray-500 dark:text-gray-400">/hari</span>
            </div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {isAvailable ? (
                <>
                  <span className="font-medium text-green-700 dark:text-green-400">
                    ✓ Tersedia
                  </span>
                  {" · "}
                  Sisa {product.stock} unit
                </>
              ) : (
                <span className="font-medium text-red-600">✕ Stok habis</span>
              )}
            </p>

            <hr className="my-6 border-gray-200 dark:border-gray-800" />

            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Deskripsi
            </h2>
            <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
              {product.description}
            </p>

            {product.packageItems && product.packageItems.length > 0 && (
              <div className="mt-4 rounded-2xl border border-green-200 bg-green-50/60 p-4 backdrop-blur-md dark:border-green-800/50 dark:bg-green-900/20">
                <h3 className="mb-2 text-sm font-semibold text-green-900 dark:text-green-300">
                  📦 Isi Paket:
                </h3>
                <ul className="space-y-1.5 text-sm text-green-800 dark:text-green-200">
                  {product.packageItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600 dark:text-green-400">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <hr className="my-6 border-gray-200 dark:border-gray-800" />

            {/* Tanggal sewa */}
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Tanggal Sewa
            </h2>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex flex-col text-sm">
                <span className="mb-1.5 font-medium text-gray-700 dark:text-gray-300">
                  Mulai
                </span>
                <input
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm shadow-inner backdrop-blur-md transition-all focus:border-green-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-500/30 dark:border-gray-700 dark:bg-gray-900/60 dark:text-white"
                />
              </label>

              <label className="flex flex-col text-sm">
                <span className="mb-1.5 font-medium text-gray-700 dark:text-gray-300">
                  Selesai
                </span>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm shadow-inner backdrop-blur-md transition-all focus:border-green-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-500/30 dark:border-gray-700 dark:bg-gray-900/60 dark:text-white"
                />
              </label>
            </div>

            {/* Summary harga */}
            <div className="mt-4 rounded-2xl border border-white/60 bg-white/40 p-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/40">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Durasi</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {days} hari
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-gray-200/60 pt-2 dark:border-gray-800">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-xl font-bold text-green-700 dark:text-green-400">
                  Rp{total.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-600 to-green-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-600/40 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none dark:disabled:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                {isAvailable ? "Tambah ke Keranjang" : "Stok Habis"}
              </button>
              <Link
                href="/products"
                className="rounded-xl border border-white/60 bg-white/50 px-6 py-3.5 text-center font-medium text-gray-700 backdrop-blur-md transition-colors hover:bg-white/80 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                ← Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}