export type ProductCategory =
  | "Tenda"
  | "Perlengkapan Tidur"
  | "Tas"
  | "Perlengkapan Masak"
  | "Sepatu"
  | "Trekking Pole"
  | "Paket Camp";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  pricePerDay: number;
  image?: string;
  description: string;
  stock: number;
  /** Label opsional — misal "Best Seller" / "Hemat 30%" */
  badge?: string;
  /** Daftar isi paket (untuk kategori "Paket Camp") */
  packageItems?: string[];
};

export const products: Product[] = [
  /* ========== PRODUK INDIVIDUAL ========== */
  {
    id: 1,
    slug: "tenda-dome-4-orang",
    name: "Tenda Dome 4 Orang",
    category: "Tenda",
    pricePerDay: 70000,
    image: "/images/tenda.jpg",
    description:
      "Tenda dome kapasitas 4 orang, cocok untuk pendakian kelompok. Ringan, mudah dipasang, dan tahan terhadap hujan ringan.",
    stock: 5,
  },
  {
    id: 2,
    slug: "tenda-dome-2-orang",
    name: "Tenda Dome 2 Orang",
    category: "Tenda",
    pricePerDay: 40000,
    image: "/images/tenda.jpg",
    description:
      "Tenda dome kapasitas 2 orang, ringan dan mudah dibawa. Cocok untuk pendakian solo atau berdua.",
    stock: 7,
  },
  {
    id: 3,
    slug: "sleeping-bag",
    name: "Sleeping Bag",
    category: "Perlengkapan Tidur",
    pricePerDay: 25000,
    image: "/images/sleepingbag.jpg",
    description:
      "Sleeping bag hangat untuk suhu dingin pegunungan. Bahan lembut, mudah dilipat, dan dilengkapi kantong penyimpanan.",
    stock: 20,
  },
  {
    id: 4,
    slug: "carrier-60l",
    name: "Carrier 60L",
    category: "Tas",
    pricePerDay: 35000,
    image: "/images/carrier.jpg",
    description:
      "Tas carrier kapasitas besar untuk pendakian multi-hari. Dilengkapi rain cover dan sistem ventilasi punggung.",
    stock: 8,
  },
  {
    id: 5,
    slug: "kompor-portable",
    name: "Kompor Portable",
    category: "Perlengkapan Masak",
    pricePerDay: 15000,
    image: "/images/kompor.png",
    description:
      "Kompor gas portable ringan untuk memasak di gunung. Hemat bahan bakar dan mudah dinyalakan.",
    stock: 20,
  },
  {
    id: 6,
    slug: "sepatu-hiking",
    name: "Sepatu Hiking",
    category: "Sepatu",
    pricePerDay: 45000,
    image: "/images/sepatu.jpg",
    description:
      "Sepatu hiking anti-slip dengan sol karet tebal. Nyaman untuk medan berbatu dan tanah licin.",
    stock: 10,
  },
  {
    id: 7,
    slug: "trekking-pole",
    name: "Trekking Pole",
    category: "Trekking Pole",
    pricePerDay: 15000,
    image: "/images/trekking-pole.jpg",
    description:
      "Tongkat mendaki aluminium ringan, bisa disetel tinggi rendahnya. Mengurangi beban lutut saat naik-turun gunung.",
    stock: 15,
  },

  /* ========== PAKET CAMP ========== */
  {
    id: 101,
    slug: "paket-camp-4-orang",
    name: "Paket Camp 4 Orang",
    category: "Paket Camp",
    pricePerDay: 155000,
    image: "/images/paket-4.jpg",
    badge: "Hemat 30%",
    description:
      "Paket lengkap untuk pendakian kelompok 4 orang. Sudah termasuk semua perlengkapan utama — tinggal bawa badan!",
    stock: 3,
    packageItems: [
      "Tenda Dome 4 Orang",
      "4× Sleeping Bag",
      "1× Kompor Portable",
      "4× Trekking Pole",
    ],
  },
  {
    id: 102,
    slug: "paket-camp-2-orang",
    name: "Paket Camp 2 Orang",
    category: "Paket Camp",
    pricePerDay: 105000,
    image: "/images/paket-2.jpg",
    badge: "Best Seller",
    description:
      "Paket pas untuk pendakian berdua. Semua perlengkapan inti sudah tersedia dalam satu paket.",
    stock: 5,
    packageItems: [
      "Tenda Dome 2 Orang",
      "2× Sleeping Bag",
      "1× Kompor Portable",
      "2× Trekking Pole",
    ],
  },
  {
    id: 103,
    slug: "paket-solo",
    name: "Paket Solo Hemat",
    category: "Paket Camp",
    pricePerDay: 85000,
    image: "/images/paket-1.jpg",
    badge: "Untuk Solo",
    description:
      "Paket khusus pendaki solo. Ringan, simpel, dan pastinya hemat.",
    stock: 4,
    packageItems: [
      "Tenda Dome 2 Orang",
      "1× Sleeping Bag",
      "1× Kompor Portable",
      "1× Trekking Pole",
    ],
  },
];

/* ---------- Helper functions ---------- */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(
  category: ProductCategory | "Semua"
): Product[] {
  if (category === "Semua") return products;
  return products.filter((p) => p.category === category);
}

export function getAllCategories(): ProductCategory[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

export function getPackageProducts(): Product[] {
  return products.filter((p) => p.category === "Paket Camp");
}

export function getIndividualProducts(): Product[] {
  return products.filter((p) => p.category !== "Paket Camp");
}