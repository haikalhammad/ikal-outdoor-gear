"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

const ADMIN_WHATSAPP = "6288291386899";

type PickupMethod = "pickup" | "delivery";

type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  pickupMethod: PickupMethod;
  notes: string;
};

function formatDisplayDate(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, isHydrated } = useCart();

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    pickupMethod: "pickup",
    notes: "",
  });

  useEffect(() => {
    if (isHydrated && items.length === 0) {
      router.replace("/keranjang");
    }
  }, [isHydrated, items.length, router]);

  if (!isHydrated) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">Memuat checkout...</p>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  const updateField = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return "Nama lengkap wajib diisi";
    if (!form.phone.trim()) return "Nomor HP/WhatsApp wajib diisi";
    if (form.phone.replace(/\D/g, "").length < 10)
      return "Nomor HP minimal 10 digit";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Format email tidak valid";
    if (form.pickupMethod === "delivery" && !form.address.trim())
      return "Alamat wajib diisi kalau pilih kirim";
    return null;
  };

  const buildWhatsAppMessage = (): string => {
    const lines: string[] = [];
    lines.push("Halo Ikal Outdoor Gear, saya mau sewa:");
    lines.push("");
    lines.push(`Nama: ${form.name}`);
    lines.push(`HP: ${form.phone}`);
    if (form.email.trim()) lines.push(`Email: ${form.email}`);
    lines.push("");
    lines.push("Item sewa:");
    items.forEach((item, idx) => {
      lines.push(
        `${idx + 1}. ${item.product.name} (${item.product.category})`
      );
      lines.push(
        `   ${formatDisplayDate(item.startDate)} → ${formatDisplayDate(
          item.endDate
        )} (${item.days} hari)`
      );
      lines.push(
        `   Rp${item.product.pricePerDay.toLocaleString("id-ID")}/hari × ${
          item.days
        } = Rp${(item.product.pricePerDay * item.days).toLocaleString(
          "id-ID"
        )}`
      );
    });
    lines.push("");
    lines.push(
      `Metode pengambilan: ${
        form.pickupMethod === "pickup"
          ? "Ambil di toko (Cileungsi)"
          : "Dikirim ke alamat"
      }`
    );
    if (form.pickupMethod === "delivery") {
      lines.push(`Alamat: ${form.address}`);
    }
    lines.push("");
    lines.push(`Total: Rp${totalPrice.toLocaleString("id-ID")}`);
    if (form.notes.trim()) {
      lines.push("");
      lines.push(`Catatan: ${form.notes}`);
    }
    lines.push("");
    lines.push("Mohon dikonfirmasi ya. Terima kasih!");
    return lines.join("\n");
  };

  const handleWhatsApp = () => {
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    const message = buildWhatsAppMessage();
    const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
      message
    )}`;

    clearCart();
    toast.success("Mengarahkan ke WhatsApp...");

    setTimeout(() => {
      window.location.href = waUrl;
    }, 200);
  };

  const inputClass =
    "rounded-xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm shadow-inner backdrop-blur-md transition-all focus:border-green-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-500/30 dark:border-gray-700 dark:bg-gray-900/60 dark:text-white dark:placeholder:text-gray-500";

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-10">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/20" />
      </div>

      {/* Header */}
      <div className="mb-8">
        <Link
          href="/keranjang"
          className="text-sm text-gray-500 hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400"
        >
          ← Kembali ke keranjang
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-px w-8 bg-green-500/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
            Checkout
          </span>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Lengkapi data penyewa, lalu konfirmasi via WhatsApp
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* KIRI: Form */}
        <div className="space-y-6 lg:col-span-3">
          {/* Data Penyewa */}
          <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 shadow-lg backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            <div className="relative">
              <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-gray-900 dark:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-white shadow-md">
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
                Data Penyewa
              </h2>

              <div className="space-y-4">
                <label className="flex flex-col text-sm">
                  <span className="mb-1.5 font-medium text-gray-700 dark:text-gray-300">
                    Nama lengkap <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className={inputClass}
                  />
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col text-sm">
                    <span className="mb-1.5 font-medium text-gray-700 dark:text-gray-300">
                      No. HP/WhatsApp <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="08123456789"
                      className={inputClass}
                    />
                  </label>

                  <label className="flex flex-col text-sm">
                    <span className="mb-1.5 font-medium text-gray-700 dark:text-gray-300">
                      Email (opsional)
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="email@contoh.com"
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Metode Pengambilan */}
          <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 shadow-lg backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            <div className="relative">
              <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-gray-900 dark:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
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
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                Metode Pengambilan
              </h2>

              <div className="space-y-3">
                <label
                  className={
                    "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all " +
                    (form.pickupMethod === "pickup"
                      ? "border-green-500 bg-green-50/60 shadow-md shadow-green-500/10 dark:border-green-500/50 dark:bg-green-900/20"
                      : "border-white/60 bg-white/40 hover:border-green-500/40 dark:border-gray-800 dark:bg-gray-900/40")
                  }
                >
                  <input
                    type="radio"
                    name="pickupMethod"
                    value="pickup"
                    checked={form.pickupMethod === "pickup"}
                    onChange={() => updateField("pickupMethod", "pickup")}
                    className="mt-0.5 accent-green-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Ambil di Toko
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cileungsi, Indonesia — Gratis
                    </p>
                  </div>
                </label>

                <label
                  className={
                    "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all " +
                    (form.pickupMethod === "delivery"
                      ? "border-green-500 bg-green-50/60 shadow-md shadow-green-500/10 dark:border-green-500/50 dark:bg-green-900/20"
                      : "border-white/60 bg-white/40 hover:border-green-500/40 dark:border-gray-800 dark:bg-gray-900/40")
                  }
                >
                  <input
                    type="radio"
                    name="pickupMethod"
                    value="delivery"
                    checked={form.pickupMethod === "delivery"}
                    onChange={() => updateField("pickupMethod", "delivery")}
                    className="mt-0.5 accent-green-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Dikirim ke Alamat
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ongkir menyesuaikan jarak (dikonfirmasi admin)
                    </p>
                  </div>
                </label>
              </div>

              {form.pickupMethod === "delivery" && (
                <label className="mt-4 flex flex-col text-sm">
                  <span className="mb-1.5 font-medium text-gray-700 dark:text-gray-300">
                    Alamat lengkap <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    rows={3}
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos"
                    className={inputClass}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Catatan */}
          <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 shadow-lg backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            <div className="relative">
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Catatan Tambahan{" "}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  (opsional)
                </span>
              </h2>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Contoh: Tolong siapkan tenda warna hijau"
                className={inputClass + " w-full"}
              />
            </div>
          </div>
        </div>

        {/* KANAN: Ringkasan */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-6 shadow-xl backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative">
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-4 border-b border-gray-200/60 pb-4 dark:border-gray-800">
                {items.map((item) => (
                  <div key={item.product.id} className="text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.product.name}
                      </span>
                      <span className="whitespace-nowrap font-semibold text-green-700 dark:text-green-400">
                        Rp
                        {(item.product.pricePerDay * item.days).toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {formatDisplayDate(item.startDate)} →{" "}
                      {formatDisplayDate(item.endDate)} ({item.days} hari)
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-xl font-bold text-green-700 dark:text-green-400">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-600 to-green-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-600/40"
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Konfirmasi via WhatsApp
              </button>

              <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
                Pesanan akan dikirim ke WhatsApp admin untuk dikonfirmasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}