"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";

type CategoryCardProps = {
  name: string;
  color: string;
  icon: ReactNode;
};

export default function CategoryCard({ name, color, icon }: CategoryCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link
      ref={ref}
      href={`/products?kategori=${encodeURIComponent(name)}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-6 text-center shadow-lg backdrop-blur-2xl transition-all hover:-translate-y-1 hover:border-white/80 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900/50"
    >
      {/* Spotlight */}
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${mouse.x}px ${mouse.y}px, rgba(34,197,94,0.15), transparent 60%)`,
        }}
      />

      {/* Top shine */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* Icon */}
      <span
        className={
          "relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ring-1 ring-white/30 transition-transform group-hover:scale-110 " +
          color
        }
      >
        {icon}
      </span>

      <span className="relative mt-4 text-sm font-semibold text-gray-900 dark:text-white">
        {name}
      </span>
    </Link>
  );
}