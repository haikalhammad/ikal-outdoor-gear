"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/cara-sewa", label: "How to Rent" },
  { href: "/kontak", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems, isHydrated } = useCart();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  const navRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [navMouse, setNavMouse] = useState({ x: 0, y: 0 });
  const [isHoveringNav, setIsHoveringNav] = useState(false);

  const [hoveredPill, setHoveredPill] = useState<string | null>(null);
  const [pillMouse, setPillMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setNavMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handlePillMouseMove = (
    e: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPillMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHoveredPill(id);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <svg
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="glass-distortion"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="70"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <nav
        ref={navRef}
        onMouseMove={handleNavMouseMove}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
        className="sticky top-0 z-50"
      >
        {/* Layer 1: Background blur */}
        <div
          className={
            "absolute inset-0 transition-all duration-300 " +
            (scrolled
              ? "bg-green-900/60 backdrop-blur-2xl backdrop-saturate-150 dark:bg-gray-900/70"
              : "bg-green-900/40 backdrop-blur-xl backdrop-saturate-150 dark:bg-gray-900/50")
          }
        />

        {/* Layer 2: Refraction */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
          style={{ filter: "url(#glass-distortion)" }}
        />

        {/* Highlights */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHoveringNav ? 1 : 0,
            background: `radial-gradient(
              500px circle at ${navMouse.x}px ${navMouse.y}px,
              rgba(255, 255, 255, 0.08),
              transparent 40%
            )`,
          }}
        />
        <div
          className={
            "pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300 " +
            (scrolled
              ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
              : "bg-gradient-to-r from-transparent via-white/10 to-transparent")
          }
        />

        {/* ====== KONTEN NAVBAR ====== */}
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={38} className="text-green-300 drop-shadow-sm" />
            <div>
              <div className="text-lg font-bold leading-tight text-white drop-shadow-sm">
                Ikal Outdoor Gear
              </div>
              <p className="text-[10px] text-green-100/80">
                Sewa perlengkapan mendaki
              </p>
            </div>
          </Link>

          {/* Menu glass pill */}
          <div className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 shadow-lg shadow-black/10 backdrop-blur-xl md:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const isHovered = hoveredPill === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseMove={(e) => handlePillMouseMove(e, link.href)}
                  onMouseLeave={() => setHoveredPill(null)}
                  className={
                    "relative flex items-center gap-1.5 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 " +
                    (isActive
                      ? "bg-white/15 text-white shadow-inner shadow-white/10 ring-1 ring-inset ring-white/20"
                      : "text-white/70 hover:text-white")
                  }
                >
                  <span
                    className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      background: `radial-gradient(
                        120px circle at ${pillMouse.x}px ${pillMouse.y}px,
                        rgba(255, 255, 255, 0.35),
                        transparent 60%
                      )`,
                    }}
                  />
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <span className="absolute inset-x-3 bottom-0.5 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* THEME TOGGLE */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl transition-all hover:border-white/40 hover:bg-white/20"
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}

            {/* AUTH SECTION */}
            {status === "loading" ? (
              <div className="h-8 w-20 animate-pulse rounded-full bg-white/10" />
            ) : session?.user ? (
              <div ref={userMenuRef} className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-2 py-1.5 text-xs font-medium text-white backdrop-blur-xl transition-all hover:border-white/40"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold">
                    {session.user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                  <span className="hidden max-w-[80px] truncate sm:inline">
                    {session.user.name ?? session.user.email}
                  </span>
                  <span className="text-[10px]">▼</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/20 bg-green-900/95 shadow-2xl backdrop-blur-xl dark:bg-gray-900/95">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    <div className="relative p-2">
                      <div className="border-b border-white/10 px-3 py-2">
                        <p className="truncate text-sm font-semibold text-white">
                          {session.user.name}
                        </p>
                        <p className="truncate text-xs text-white/60">
                          {session.user.email}
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-green-300">
                          {(session.user as { role?: string }).role ??
                            "customer"}
                        </span>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        Dashboard
                      </Link>

                      {(session.user as { role?: string }).role ===
                        "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          Admin Panel
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                onMouseMove={(e) => handlePillMouseMove(e, "signin")}
                onMouseLeave={() => setHoveredPill(null)}
                className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl transition-all hover:border-white/40 md:inline-flex"
              >
                <span
                  className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                  style={{
                    opacity: hoveredPill === "signin" ? 1 : 0,
                    background: `radial-gradient(
                      120px circle at ${pillMouse.x}px ${pillMouse.y}px,
                      rgba(255, 255, 255, 0.3),
                      transparent 60%
                    )`,
                  }}
                />
                <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
                <span className="relative z-10">Sign In</span>
              </Link>
            )}

            {/* CART */}
            <Link
              id="cart-icon"
              href="/keranjang"
              onMouseMove={(e) => handlePillMouseMove(e, "cart")}
              onMouseLeave={() => setHoveredPill(null)}
              className="relative flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-black/10 backdrop-blur-xl transition-all hover:border-white/40"
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <span
                  className="absolute inset-0 transition-opacity duration-200"
                  style={{
                    opacity: hoveredPill === "cart" ? 1 : 0,
                    background: `radial-gradient(
                      100px circle at ${pillMouse.x}px ${pillMouse.y}px,
                      rgba(255, 255, 255, 0.35),
                      transparent 60%
                    )`,
                  }}
                />
              </span>
              <span className="relative z-10" aria-hidden="true">
                🛒
              </span>
              <span className="relative z-10 hidden sm:inline">Cart</span>
              {isHydrated && totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 z-20 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-md ring-2 ring-green-900/60">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-white/20 bg-white/10 p-2 text-white shadow-lg shadow-black/10 backdrop-blur-xl transition-colors hover:bg-white/20 md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                {open ? (
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="relative border-t border-white/10 bg-green-900/70 backdrop-blur-xl md:hidden dark:bg-gray-900/80">
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              {session?.user ? (
                <>
                  <div className="my-2 border-t border-white/10 pt-2">
                    <p className="text-xs text-white/60">
                      Logged in as {session.user.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="py-2 text-sm text-white/80 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  {(session.user as { role?: string }).role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm text-white/80 hover:text-white"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      handleSignOut();
                    }}
                    className="py-2 text-left text-sm text-red-300 hover:text-red-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-white/80 hover:text-white"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}