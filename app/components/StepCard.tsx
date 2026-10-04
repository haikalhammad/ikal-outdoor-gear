type StepCardProps = {
  num: string;
  stepIndex: number;
  title: string;
  desc: string;
};

export default function StepCard({
  num,
  stepIndex,
  title,
  desc,
}: StepCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 shadow-lg backdrop-blur-2xl transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900/60">
      {/* Top shine */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* Big number background */}
      <span className="pointer-events-none absolute -right-3 -top-6 select-none text-8xl font-black text-green-500/10 transition-opacity group-hover:text-green-500/20 dark:text-green-400/10">
        {num}
      </span>

      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-800 text-sm font-bold text-white shadow-lg ring-2 ring-white/40">
          {stepIndex}
        </div>
        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {desc}
        </p>
      </div>
    </div>
  );
}