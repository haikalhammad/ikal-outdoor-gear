import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan sewa perlengkapan mendaki di Ikal Outdoor Gear.",
};

const SECTIONS = [
  {
    title: "1. Ketentuan Umum",
    items: [
      "Penyewa wajib berusia minimal 17 tahun atau didampingi orang tua.",
      "Penyewa wajib menyerahkan KTP/SIM asli sebagai jaminan.",
      "KTP/SIM akan dikembalikan setelah barang dikembalikan dengan lengkap.",
    ],
  },
  {
    title: "2. Proses Penyewaan",
    items: [
      "Pemesanan dilakukan via website, lalu konfirmasi via WhatsApp.",
      "Pembayaran dapat dilakukan via transfer bank atau e-wallet.",
      "Barang dapat diambil setelah pembayaran dikonfirmasi admin.",
    ],
  },
  {
    title: "3. Deposit & Pembayaran",
    items: [
      "Deposit 50% dari total sewa untuk penyewa baru.",
      "Pembayaran penuh harus diselesaikan sebelum pengambilan barang.",
      "Deposit akan dikembalikan setelah barang diperiksa dengan baik.",
    ],
  },
  {
    title: "4. Pengembalian Barang",
    items: [
      "Barang harus dikembalikan sesuai tanggal yang disepakati.",
      "Keterlambatan dikenakan biaya tambahan 100% dari harga sewa harian per hari.",
      "Barang harus dalam kondisi bersih dan tidak rusak.",
    ],
  },
  {
    title: "5. Kerusakan & Kehilangan",
    items: [
      "Kerusakan ringan: penyewa menanggung biaya perbaikan.",
      "Kerusakan berat atau kehilangan: penyewa menanggung biaya penggantian penuh.",
      "Biaya akan diinformasikan setelah pemeriksaan barang.",
    ],
  },
  {
    title: "6. Pembatalan & Perubahan",
    items: [
      "Pembatalan H-1 sebelum tanggal sewa: dikenakan biaya 25%.",
      "Pembatalan di hari-H: dikenakan biaya 50%.",
      "Perubahan tanggal dapat dilakukan selama barang tersedia.",
    ],
  },
  {
    title: "7. Force Majeure",
    items: [
      "Ikal Outdoor Gear tidak bertanggung jawab atas kejadian di luar kendali (bencana alam, kerusuhan, dll).",
      "Dalam kondisi force majeure, penyewa tetap bertanggung jawab atas barang yang disewa.",
    ],
  },
];

export default function SyaratKetentuanPage() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-12">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/20" />
      </div>

      <div className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-green-500/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
            Legal
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Syarat &amp; Ketentuan
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Terakhir diperbarui:{" "}
          {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Dengan melakukan pemesanan di Ikal Outdoor Gear, kamu dianggap telah
          membaca dan menyetujui semua ketentuan berikut:
        </p>
      </div>

      <div className="space-y-4">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 shadow-lg backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            <div className="relative">
              <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                {section.title}
              </h2>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 text-center text-sm shadow-lg backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="relative">
          <p className="text-gray-600 dark:text-gray-400">
            Ada pertanyaan tentang syarat &amp; ketentuan ini?{" "}
            <a
              href="https://wa.me/6288291386899"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-green-700 hover:underline dark:text-green-400"
            >
              Hubungi kami →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}