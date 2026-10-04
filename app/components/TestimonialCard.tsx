type TestimonialCardProps = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

export default function TestimonialCard({
  name,
  role,
  text,
  rating,
}: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 shadow-lg backdrop-blur-2xl transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900/60">
      {/* Top shine */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* Quote mark */}
      <span className="pointer-events-none absolute -top-2 right-4 select-none text-7xl font-serif text-green-500/10">
        &ldquo;
      </span>

      <div className="relative">
        {/* Stars */}
        <div className="mb-3 flex gap-0.5 text-amber-400">
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          &ldquo;{text}&rdquo;
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-gray-200/60 pt-4 dark:border-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-xs font-bold text-white shadow-md ring-2 ring-white/50 dark:ring-gray-900">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}