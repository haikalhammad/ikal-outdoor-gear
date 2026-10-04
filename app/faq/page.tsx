import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang sewa perlengkapan mendaki di Ikal Outdoor Gear.",
};

const FAQS = [
  {
    q: "Bagaimana cara menyewa perlengkapan?",
    a: "Pilih produk, tentukan tanggal sewa, tambahkan ke keranjang, lalu checkout. Kami akan konfirmasi via WhatsApp.",
  },
  {
    q: "Apakah perlu jaminan untuk menyewa?",
    a: "Ya, kami memerlukan KTP/SIM asli sebagai jaminan. Untuk penyewa baru, ada deposit 50% dari total sewa.",
  },
  {
    q: "Berapa lama proses pengambilan barang?",
    a: "Setelah admin konfirmasi via WhatsApp, kamu bisa langsung ambil di toko kami (Cileungsi). Untuk pengiriman, 1-2 hari kerja.",
  },
  {
    q: "Apakah bisa sewa harian?",
    a: "Ya, minimal sewa 1 hari. Untuk sewa mingguan atau bulanan, ada diskon khusus — hubungi kami via WhatsApp.",
  },
  {
    q: "Bagaimana kalau barang rusak atau hilang?",
    a: "Kerusakan atau kehilangan barang menjadi tanggung jawab penyewa. Biaya perbaikan/penggantian akan dibicarakan bersama.",
  },
  {
    q: "Apakah bisa batal atau ubah tanggal?",
    a: "Pembatalan H-1 dikenakan biaya 25%. Perubahan tanggal bisa dilakukan selama barang masih tersedia.",
  },
  {
    q: "Apa saja perlengkapan yang tersedia?",
    a: "Tenda, sleeping bag, carrier, kompor portable, sepatu hiking, trekking pole, dan paket camp lengkap.",
  },
  {
    q: "Apakah harga sudah termasuk pengiriman?",
    a: "Belum. Harga sewa hanya untuk barang. Ongkir pengiriman menyesuaikan jarak dan akan dikonfirmasi admin.",
  },
];

export default function FaqPage() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-12">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/20" />
      </div>

      <div className="mb-12 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-green-500/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
            FAQ
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-green-500/60" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Pertanyaan Umum
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Jawaban untuk pertanyaan yang sering diajukan
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => (
          <details
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 shadow-lg backdrop-blur-2xl transition-all open:border-green-500/40 open:shadow-xl dark:border-gray-800 dark:bg-gray-900/60 dark:open:border-green-500/40"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-gray-900 marker:content-none dark:text-white">
              <span className="pr-2">{faq.q}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 transition-transform group-open:rotate-180 dark:bg-green-900/40 dark:text-green-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-white/40 px-5 py-4 dark:border-gray-800">
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </div>

      {/* CTA */}
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-8 text-center shadow-lg backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="relative">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Masih ada pertanyaan?
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Hubungi kami via WhatsApp untuk jawaban langsung
          </p>
          <Link
            href="/kontak"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-green-600 to-green-700 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Hubungi Kami
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}