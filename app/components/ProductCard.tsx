"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isAvailable = product.stock > 0;
  const isPackage = product.category === "Paket Camp";

  const cardRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // 3D tilt effect — max 6 derajat
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 6;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={
        "group relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 " +
        (isPackage
          ? "border-green-300/60 bg-gradient-to-br from-white/90 to-green-50/80"
          : "border-white/40 bg-white/70") +
        " backdrop-blur-xl hover:shadow-2xl"
      }
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
          isHovered ? 1.02 : 1
        })`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glow effect saat hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            400px circle at ${mousePos.x}px ${mousePos.y}px,
            rgba(34, 197, 94, 0.15),
            transparent 50%
          )`,
        }}
      />

      {/* Border ring paket */}
      {isPackage && (
        <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl ring-2 ring-green-500/30" />
      )}

      {/* Badge */}
      {product.badge && (
        <span
          className={
            "absolute left-3 top-3 z-20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md " +
            (isPackage
              ? "bg-green-600/90 text-white"
              : "bg-amber-400/90 text-amber-900")
          }
        >
          {product.badge}
        </span>
      )}

      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative z-10 flex h-48 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-sm text-gray-400"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <span>Gambar {product.name}</span>
        )}
      </Link>

      {/* Body */}
      <div className="relative z-10 flex flex-1 flex-col p-4">
        <span
          className={
            "inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm " +
            (isPackage
              ? "bg-green-100/80 text-green-700"
              : "bg-gray-100/80 text-gray-600")
          }
        >
          {product.category}
        </span>

        <h3 className="mt-2 line-clamp-2 text-base font-semibold text-gray-900">
          <Link
            href={`/products/${product.slug}`}
            className="hover:underline"
          >
            {product.name}
          </Link>
        </h3>

        {/* Isi paket */}
        {isPackage && product.packageItems && (
          <ul className="mt-2 space-y-0.5 text-xs text-gray-600">
            {product.packageItems.slice(0, 4).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-green-600">✓</span>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Deskripsi */}
        {!isPackage && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>
        )}

        {/* Harga & tombol */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <span className="font-bold text-green-700">
              Rp{product.pricePerDay.toLocaleString("id-ID")}
            </span>
            <span className="text-xs text-gray-500">/hari</span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            aria-label={`Sewa ${product.name}`}
            className={
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-all " +
              (isAvailable
                ? isPackage
                  ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30"
                  : "bg-green-700 text-white hover:bg-green-800 hover:shadow-lg hover:shadow-green-700/30"
                : "cursor-not-allowed bg-gray-300 text-gray-500")
            }
          >
            {isAvailable ? "Sewa" : "Habis"}
          </Link>
        </div>
      </div>
    </article>
  );
}