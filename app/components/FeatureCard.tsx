"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  desc: string;
  gradient: string;
  icon: ReactNode;
};

export default function FeatureCard({
  title,
  desc,
  gradient,
  icon,
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 shadow-lg backdrop-blur-2xl transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900/60"
    >
      {/* Spotlight */}
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(240px circle at ${mouse.x}px ${mouse.y}px, rgba(34,197,94,0.12), transparent 60%)`,
        }}
      />

      {/* Blob */}
      <span
        className={
          "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity group-hover:opacity-20 " +
          gradient
        }
      />

      {/* Top shine */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <div className="relative">
        <div
          className={
            "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg ring-1 ring-white/30 " +
            gradient
          }
        >
          {icon}
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