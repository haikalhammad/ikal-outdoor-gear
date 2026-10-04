import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Ikal Outdoor Gear untuk pertanyaan sewa perlengkapan mendaki.",
};

const CONTACTS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Alamat",
    value: "Cileungsi, Bogor, Jawa Barat, Indonesia",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Telepon / WhatsApp",
    value: "+62 8829-1386-899",
    href: "https://wa.me/6288291386899",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: "Email",
    value: "halo@ikaloutdoor.id",
    href: "mailto:halo@ikaloutdoor.id",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Jam Operasional",
    value: "Senin - Sabtu: 08.00 - 20.00 WIB",
    gradient: "from-purple-500 to-pink-600",
  },
];

export default function KontakPage() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-12">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
        <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/20" />
      </div>

      <div className="mb-12 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-green-500/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
            Kontak
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-green-500/60" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Hubungi Kami
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Ada pertanyaan? Tim kami siap membantu
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CONTACTS.map((item) => {
          const content = (
            <div className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-lg backdrop-blur-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/60">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              <span
                className={
                  "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg ring-1 ring-white/30 transition-transform group-hover:scale-110 " +
                  item.gradient
                }
              >
                {item.icon}
              </span>
              <div className="relative flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            </div>
          );

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="block"
            >
              {content}
            </a>
          ) : (
            <div key={item.label}>{content}</div>
          );
        })}
      </div>

      {/* WhatsApp CTA */}
      <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 p-8 text-center text-white shadow-2xl sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="relative">
          <h2 className="text-xl font-bold sm:text-2xl">Butuh respon cepat?</h2>
          <p className="mt-2 text-green-100">
            Chat kami langsung di WhatsApp — balas dalam 1x24 jam
          </p>
          <a
            href="https://wa.me/6288291386899?text=Halo%20Ikal%20Outdoor%20Gear"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-green-800 shadow-xl shadow-black/20 transition-all hover:scale-105 hover:bg-green-50"
          >
            Chat via WhatsApp
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}