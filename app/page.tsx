import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import ScrollReveal from "./components/ScrollReveal";
import CategoryCard from "./components/CategoryCard";
import FeatureCard from "./components/FeatureCard";
import StepCard from "./components/StepCard";
import TestimonialCard from "./components/TestimonialCard";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Sewa perlengkapan mendaki berkualitas dengan harga terjangkau.",
};

const STATS = [
  { value: "100+", label: "Produk" },
  { value: "500+", label: "Pelanggan" },
  { value: "4.9★", label: "Rating" },
];

const CATEGORIES = [
  {
    name: "Tenda",
    color: "from-green-500 to-emerald-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 21 14 3M20.5 21 10 3M2 21h20M12 10v11" />
      </svg>
    ),
  },
  {
    name: "Tas",
    color: "from-blue-500 to-indigo-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    name: "Sepatu",
    color: "from-amber-500 to-orange-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18h20v2H2zM4 18V8l4-2 2 4h6a4 4 0 0 1 4 4v4" />
      </svg>
    ),
  },
  {
    name: "Paket Camp",
    color: "from-purple-500 to-pink-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4 8 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
      </svg>
    ),
  },
];

const FEATURES = [
  {
    title: "Berkualitas",
    desc: "Semua alat dicek & dibersihkan sebelum disewa.",
    gradient: "from-green-500 to-emerald-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4M21 12c0 5-3.5 9-9 11-5.5-2-9-6-9-11V5l9-3 9 3v7Z" />
      </svg>
    ),
  },
  {
    title: "Hemat",
    desc: "Mulai Rp8.000/hari. Paket camp hemat sampai 30%.",
    gradient: "from-amber-500 to-orange-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M15 9h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9" />
      </svg>
    ),
  },
  {
    title: "Cepat",
    desc: "Order online, konfirmasi WA, selesai.",
    gradient: "from-blue-500 to-cyan-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    num: "01",
    title: "Pilih Alat",
    desc: "Browse katalog & pilih perlengkapan.",
  },
  {
    num: "02",
    title: "Tentukan Tanggal",
    desc: "Pilih tanggal, sistem hitung total.",
  },
  {
    num: "03",
    title: "Konfirmasi WA",
    desc: "Checkout via WhatsApp, selesai!",
  },
];

const TESTIMONIALS = [
  {
    name: "Rizky Pratama",
    role: "Pendaki Gunung Gede",
    text: "Barang lengkap & bersih, harga masuk akal. Recommended!",
    rating: 5,
  },
  {
    name: "Sari Dewi",
    role: "Mahasiswa Pecinta Alam",
    text: "Paket camp-nya worth it! Hemat waktu & tenaga.",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Pendaki Pemula",
    text: "Admin fast respon. Pengalaman pertama mendaki jadi nyaman.",
    rating: 5,
  },
];

/* ===== Section header component ===== */
function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-green-500/60" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
        {children}
      </span>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-green-500/60" />
    </div>
  );
}

export default function Home() {
  const packages = products.filter((p) => p.category === "Paket Camp");
  const individualProducts = products.filter(
    (p) => p.category !== "Paket Camp"
  );

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-10">
      {/* ===== Background ambience ===== */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/20" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-900/20" />
      </div>

      {/* ===================== HERO ===================== */}
      <ScrollReveal direction="up" duration={0.7}>
        <div className="relative mb-20 overflow-hidden rounded-3xl border border-white/40 shadow-2xl">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80"
              alt="Mountain landscape"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-900/70 to-green-800/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="relative px-8 py-16 sm:px-12 sm:py-20 lg:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300" />
              </span>
              Trusted by 500+ pendaki Indonesia
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Siap Mendaki?
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-green-50 drop-shadow-md sm:text-lg">
              Sewa perlengkapan mendaki berkualitas dengan harga terjangkau.
              Persiapkan pendakianmu tanpa ribet.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-green-800 shadow-xl shadow-black/20 transition-all hover:scale-105 hover:bg-green-50"
              >
                Lihat Semua Produk
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/cara-sewa"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-medium text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/20"
              >
                Cara Sewa
              </Link>
            </div>

            <div className="mt-12 inline-flex flex-wrap gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-xl sm:gap-0">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={
                    "flex-1 px-4 py-2 text-center sm:px-6 " +
                    (i < STATS.length - 1 ? "border-r border-white/10" : "")
                  }
                >
                  <div className="text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-green-100/80 sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ===================== KATEGORI ===================== */}
      <ScrollReveal direction="up">
        <div className="mb-20">
          <div className="mb-8 text-center">
            <SectionLabel>Kategori Populer</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Cari Berdasarkan Kebutuhan
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CATEGORIES.map((cat, idx) => (
              <ScrollReveal key={cat.name} delay={idx * 0.08} direction="up">
                <CategoryCard name={cat.name} color={cat.color} icon={cat.icon} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ===================== FITUR ===================== */}
      <ScrollReveal direction="up">
        <div className="relative mb-20 overflow-hidden rounded-3xl border border-white/60 bg-white/40 p-8 shadow-xl backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/40 sm:p-14">
          {/* Top shine */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          {/* Blobs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative mb-10 text-center">
            <SectionLabel>Kenapa Ikal Outdoor</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Alasan 500+ Pendaki Pilih Kami
            </h2>
          </div>

          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURES.map((feature, idx) => (
              <ScrollReveal key={feature.title} delay={idx * 0.1} direction="up">
                <FeatureCard
                  title={feature.title}
                  desc={feature.desc}
                  gradient={feature.gradient}
                  icon={feature.icon}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ===================== CARA SEWA ===================== */}
      <ScrollReveal direction="up">
        <div className="mb-20">
          <div className="mb-10 text-center">
            <SectionLabel>Semudah Itu</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Sewa dalam 3 Langkah
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {STEPS.map((step, idx) => (
              <ScrollReveal key={step.num} delay={idx * 0.12} direction="up">
                <StepCard
                  num={step.num}
                  stepIndex={idx + 1}
                  title={step.title}
                  desc={step.desc}
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/cara-sewa"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-700 transition-colors hover:text-green-800 dark:text-green-400"
            >
              Pelajari selengkapnya
              <span>→</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* ===================== PAKET CAMP ===================== */}
      {packages.length > 0 && (
        <div className="mb-20">
          <ScrollReveal direction="up">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-8 bg-green-500/60" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
                    Hemat &amp; Praktis
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  Paket Camp
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Perlengkapan lengkap dalam satu paket — lebih hemat!
                </p>
              </div>
              <Link
                href="/products"
                className="hidden text-sm font-medium text-green-700 hover:underline dark:text-green-400 sm:block"
              >
                Lihat semua →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.1} direction="up">
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* ===================== KATALOG ===================== */}
      <ScrollReveal direction="up">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-8 bg-green-500/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
                Katalog
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Perlengkapan Tersedia
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {individualProducts.length} produk siap disewa
            </p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-medium text-green-700 hover:underline dark:text-green-400 sm:block"
          >
            Lihat semua →
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {individualProducts.map((product, idx) => (
          <ScrollReveal key={product.id} delay={idx * 0.06} direction="up">
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>

      {/* ===================== TESTIMONI ===================== */}
      <ScrollReveal direction="up">
        <div className="mb-20 mt-24">
          <div className="mb-10 text-center">
            <SectionLabel>Testimoni</SectionLabel>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Kata Mereka Tentang Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <ScrollReveal key={t.name} delay={idx * 0.1} direction="up">
                <TestimonialCard
                  name={t.name}
                  role={t.role}
                  text={t.text}
                  rating={t.rating}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ===================== CTA ===================== */}
      <ScrollReveal direction="up">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 p-10 text-center text-white shadow-2xl sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />

          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Siap Taklukkan Gunung Berikutnya?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-green-100">
              Sewa perlengkapan terbaik — pesan sekarang, ambil di toko atau
              dikirim.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-green-800 shadow-xl shadow-black/20 transition-all hover:scale-105 hover:bg-green-50"
              >
                Mulai Sewa Sekarang
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <a
                href="https://wa.me/6288291386899"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-medium text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/20"
              >
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}