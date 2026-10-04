"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function formatDisplayDate(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function KeranjangPage() {
  const { items, removeFromCart, updateItemDates, totalPrice, isHydrated } =
    useCart();

  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleExpand = (productId: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  if (!isHydrated) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">Memuat keranjang...</p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="relative mx-auto max-w-4xl px-6 py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-12 text-center shadow-xl backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-4xl shadow-lg ring-4 ring-white/50 dark:ring-gray-900">
            🛒
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Keranjang Kosong
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Yuk mulai sewa perlengkapan mendaki dulu!
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-green-600 to-green-700 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Lihat Produk
            <span>→</span>
          </Link>
        </div>
      </section>
    );
  }

  const today = formatDate(new Date());

  return (
    <section className="relative mx-auto max-w-4xl px-6 py-10">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/20" />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-8 bg-green-500/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
            Keranjang
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Keranjang Sewa
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {items.length} item siap disewa
            </p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-medium text-green-700 hover:underline dark:text-green-400 sm:block"
          >
            + Tambah item
          </Link>
        </div>
      </div>

      {/* List item */}
      <div className="space-y-4">
        {items.map((item) => {
          const subtotal = item.product.pricePerDay * item.days;
          const isExpanded = expandedIds.has(item.product.id);
          const isValidRange =
            item.endDate && new Date(item.endDate) > new Date(item.startDate);

          return (
            <div
              key={item.product.id}
              className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-lg backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              <div className="relative">
                {/* Header: nama & hapus */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700 dark:bg-green-900/40 dark:text-green-300">
                      {item.product.category}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                      {item.product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Rp{item.product.pricePerDay.toLocaleString("id-ID")}/hari
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/40"
                    aria-label="Hapus item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    </svg>
                  </button>
                </div>

                {/* Ringkasan tanggal (collapsed) */}
                {!isExpanded && (
                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/40 pt-4 dark:border-gray-800">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {formatDisplayDate(item.startDate)}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span>{formatDisplayDate(item.endDate)}</span>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {item.days} hari
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(item.product.id)}
                      className="text-sm font-medium text-green-700 hover:underline dark:text-green-400"
                    >
                      Ubah tanggal
                    </button>
                  </div>
                )}

                {/* Mode expanded */}
                {isExpanded && (
                  <div className="mt-4 border-t border-white/40 pt-4 dark:border-gray-800">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <label className="flex flex-col text-sm">
                        <span className="mb-1.5 font-medium text-gray-700 dark:text-gray-300">
                          Mulai
                        </span>
                        <input
                          type="date"
                          value={item.startDate || today}
                          min={today}
                          onChange={(e) =>
                            updateItemDates(
                              item.product.id,
                              e.target.value,
                              item.endDate || e.target.value
                            )
                          }
                          className="rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm shadow-inner backdrop-blur-md transition-all focus:border-green-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-500/30 dark:border-gray-700 dark:bg-gray-900/60 dark:text-white"
                        />
                      </label>

                      <label className="flex flex-col text-sm">
                        <span className="mb-1.5 font-medium text-gray-700 dark:text-gray-300">
                          Selesai
                        </span>
                        <input
                          type="date"
                          value={item.endDate || item.startDate || today}
                          min={item.startDate || today}
                          onChange={(e) =>
                            updateItemDates(
                              item.product.id,
                              item.startDate || today,
                              e.target.value
                            )
                          }
                          className="rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm shadow-inner backdrop-blur-md transition-all focus:border-green-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-500/30 dark:border-gray-700 dark:bg-gray-900/60 dark:text-white"
                        />
                      </label>
                    </div>

                    {!isValidRange && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        ⚠️ Tanggal selesai harus setelah tanggal mulai
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Durasi: {item.days} hari
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.product.id)}
                        className="text-sm font-medium text-green-700 hover:underline dark:text-green-400"
                      >
                        ✓ Selesai
                      </button>
                    </div>
                  </div>
                )}

                {/* Subtotal */}
                <div className="mt-4 flex items-center justify-between border-t border-white/40 pt-4 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.product.pricePerDay.toLocaleString("id-ID")} ×{" "}
                    {item.days} hari
                  </span>
                  <span className="text-lg font-bold text-green-700 dark:text-green-400">
                    Rp{subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total & Checkout */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-6 shadow-xl backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="text-2xl font-bold text-green-700 dark:text-green-400">
              Rp{totalPrice.toLocaleString("id-ID")}
            </span>
          </div>

          <Link
            href="/checkout"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-600 to-green-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-600/40"
          >
            Lanjut ke Checkout
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}