import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cara Sewa",
  description:
    "Panduan lengkap cara menyewa perlengkapan mendaki di Ikal Outdoor Gear.",
};

const STEPS = [
  {
    number: "01",
    title: "Pilih Perlengkapan",
    description:
      "Jelajahi katalog kami dan pilih perlengkapan yang kamu butuhkan. Klik produk untuk melihat detail & spesifikasi lengkap.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Tentukan Tanggal Sewa",
    description:
      "Di halaman detail produk, pilih tanggal mulai dan tanggal selesai sewa. Total harga otomatis dihitung berdasarkan durasi.",
    icon: "📅",
  },
  {
    number: "03",
    title: "Tambahkan ke Keranjang",
    description:
      "Klik 'Tambah ke Keranjang' untuk memasukkan item. Kamu bisa menambah beberapa item sekaligus di satu pesanan.",
    icon: "🛒",
  },
  {
    number: "04",
    title: "Isi Data & Konfirmasi",
    description:
      "Buka keranjang, klik 'Lanjut ke Checkout', lengkapi data penyewa, lalu konfirmasi pesanan via WhatsApp.",
    icon: "📝",
  },
  {
    number: "05",
    title: "Ambil atau Terima Barang",
    description:
      "Setelah admin konfirmasi, ambil barang di toko kami (Cileungsi) atau tunggu pengiriman ke alamatmu.",
    icon: "📦",
  },
  {
    number: "06",
    title: "Kembalikan Tepat Waktu",
    description:
      "Kembalikan perlengkapan sesuai tanggal selesai. Keterlambatan akan dikenakan biaya tambahan per hari.",
    icon: "⏰",
  },
];

const TERMS = [
  "KTP/SIM asli sebagai jaminan (dikembalikan saat pengembalian).",
  "Deposit sebesar 50% dari total sewa (untuk penyewa baru).",
  "Barang dikembalikan dalam kondisi bersih dan tidak rusak.",
  "Kerusakan atau kehilangan barang menjadi tanggung jawab penyewa.",
  "Pembatalan H-1 dikenakan biaya 25% dari total sewa.",
];

export default function CaraSewaPage() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-12">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/20" />
      </div>

      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-green-500/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
            Panduan
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-green-500/60" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Cara Sewa
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Cuma 6 langkah mudah untuk menyewa perlengkapan mendaki
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {STEPS.map((step, idx) => (
          <div
            key={step.number}
            className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-lg backdrop-blur-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/60"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            <div className="relative flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-700 text-2xl shadow-lg ring-1 ring-white/30">
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-700 dark:bg-green-900/40 dark:text-green-300">
                    Langkah {step.number}
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Syarat & Ketentuan */}
      <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 shadow-lg backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        <div className="relative">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Syarat & Ketentuan
          </h2>
          <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
            {TERMS.map((term, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                  ✓
                </span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 p-8 text-center text-white shadow-2xl sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="relative">
          <h2 className="text-xl font-bold sm:text-2xl">
            Sudah siap memulai pendakianmu?
          </h2>
          <p className="mt-2 text-green-100">
            Jelajahi koleksi perlengkapan kami sekarang
          </p>
          <Link
            href="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-green-800 shadow-xl shadow-black/20 transition-all hover:scale-105 hover:bg-green-50"
          >
            Lihat Semua Produk
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}