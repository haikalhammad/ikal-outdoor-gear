import type { Metadata } from "next";
import Link from "next/link";
import { products, getAllCategories } from "../data/products";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Semua Produk",
  description:
    "Jelajahi semua perlengkapan mendaki yang tersedia untuk disewa.",
};

type ProductsPageProps = {
  searchParams: Promise<{ kategori?: string }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { kategori } = await searchParams;

  const categories = getAllCategories();
  const activeCategory = kategori ?? "Semua";

  const filtered =
    activeCategory === "Semua"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-10">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/20" />
      </div>

      <ScrollReveal direction="up">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-8 bg-green-500/60" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
              Katalog
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Semua Produk
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} produk ditemukan
            {activeCategory !== "Semua" && (
              <>
                {" di kategori "}
                <span className="font-medium text-green-700 dark:text-green-400">
                  {activeCategory}
                </span>
              </>
            )}
          </p>
        </div>
      </ScrollReveal>

      {/* Filter kategori — glass pill */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="mb-8 flex flex-wrap gap-2 rounded-full border border-white/60 bg-white/60 p-1.5 shadow-lg backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60 inline-flex">
          <FilterLink
            href="/products"
            label="Semua"
            active={activeCategory === "Semua"}
          />
          {categories.map((cat) => (
            <FilterLink
              key={cat}
              href={`/products?kategori=${encodeURIComponent(cat)}`}
              label={cat}
              active={activeCategory === cat}
            />
          ))}
        </div>
      </ScrollReveal>

      {/* Grid produk */}
      {filtered.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-white/60 py-16 text-center backdrop-blur-2xl dark:border-gray-700 dark:bg-gray-900/40">
          <div className="text-5xl">🔍</div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Belum ada produk di kategori ini.
          </p>
          <Link
            href="/products"
            className="mt-3 inline-block text-sm font-medium text-green-700 hover:underline dark:text-green-400"
          >
            Lihat semua produk →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product, idx) => (
            <ScrollReveal
              key={product.id}
              delay={idx * 0.05}
              direction="up"
            >
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}

function FilterLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        "rounded-full px-4 py-1.5 text-sm font-medium transition-all " +
        (active
          ? "bg-gradient-to-br from-green-600 to-green-700 text-white shadow-md shadow-green-600/30"
          : "text-gray-700 hover:bg-white/60 dark:text-gray-300 dark:hover:bg-white/10")
      }
    >
      {label}
    </Link>
  );
}