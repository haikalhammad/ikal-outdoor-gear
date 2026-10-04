import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="text-8xl">🏔️</div>

      <h1 className="mt-6 text-6xl font-bold text-green-700">404</h1>

      <h2 className="mt-2 text-2xl font-semibold text-gray-900">
        Halaman Tidak Ditemukan
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        Sepertinya jalur yang kamu tuju tidak ada di peta. Coba kembali
        ke jalur utama, atau jelajahi perlengkapan kami.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-md bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
        >
          ← Kembali ke Beranda
        </Link>
        <Link
          href="/products"
          className="rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Lihat Produk
        </Link>
      </div>
    </section>
  );
}