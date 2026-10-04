"use client";

import { useEffect, useState } from "react";

export type FlyToCartProps = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  onComplete?: () => void;
};

export default function FlyToCart({
  fromX,
  fromY,
  toX,
  toY,
  onComplete,
}: FlyToCartProps) {
  const [pos, setPos] = useState({ x: fromX, y: fromY, scale: 1, opacity: 1 });

  useEffect(() => {
    // Trigger animasi di frame berikutnya
    const startTimer = requestAnimationFrame(() => {
      setPos({ x: toX, y: toY, scale: 0.3, opacity: 0 });
    });

    const endTimer = setTimeout(() => {
      onComplete?.();
    }, 750);

    return () => {
      cancelAnimationFrame(startTimer);
      clearTimeout(endTimer);
    };
  }, [fromX, fromY, toX, toY, onComplete]);

  return (
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${pos.scale})`,
        opacity: pos.opacity,
        transition: "all 700ms cubic-bezier(0.5, -0.5, 1, 1)",
      }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-2xl shadow-lg ring-2 ring-white">
        🛒
      </div>
    </div>
  );
}