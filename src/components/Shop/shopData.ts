// import { Product } from "@/types/product";
// const shopData: Product[] = [
//   {
//     title: "Havit HV-G69 USB Gamepad",
//     reviews: 15,
//     price: 59.0,
//     discountedPrice: 29.0,
//     id: 1,
//     imgs: {
//       thumbnails: [
//         "/images/products/product-1-sm-1.png",
//         "/images/products/product-1-sm-2.png",
//       ],
//       previews: [
//         "/images/products/product-1-bg-1.png",
//         "/images/products/product-1-bg-2.png",
//       ],
//     },
//   },
//   {
//     title: "iPhone 14 Plus , 6/128GB",
//     reviews: 5,
//     price: 899.0,
//     discountedPrice: 99.0,
//     id: 2,
//     imgs: {
//       thumbnails: [
//         "/images/products/product-2-sm-1.png",
//         "/images/products/product-2-sm-2.png",
//       ],
//       previews: [
//         "/images/products/product-2-bg-1.png",
//         "/images/products/product-2-bg-2.png",
//       ],
//     },
//   },
//   {
//     title: "Apple iMac M1 24-inch 2021",
//     reviews: 5,
//     price: 59.0,
//     discountedPrice: 29.0,
//     id: 3,
//     imgs: {
//       thumbnails: [
//         "/images/products/product-3-sm-1.png",
//         "/images/products/product-3-sm-2.png",
//       ],
//       previews: [
//         "/images/products/product-3-bg-1.png",
//         "/images/products/product-3-bg-2.png",
//       ],
//     },
//   },
//   {
//     title: "MacBook Air M1 chip, 8/256GB",
//     reviews: 6,
//     price: 59.0,
//     discountedPrice: 29.0,
//     id: 4,
//     imgs: {
//       thumbnails: [
//         "/images/products/product-4-sm-1.png",
//         "/images/products/product-4-sm-2.png",
//       ],
//       previews: [
//         "/images/products/product-4-bg-1.png",
//         "/images/products/product-4-bg-2.png",
//       ],
//     },
//   },
//   {
//     title: "Apple Watch Ultra",
//     reviews: 3,
//     price: 99.0,
//     discountedPrice: 29.0,
//     id: 5,
//     imgs: {
//       thumbnails: [
//         "/images/products/product-5-sm-1.png",
//         "/images/products/product-5-sm-2.png",
//       ],
//       previews: [
//         "/images/products/product-5-bg-1.png",
//         "/images/products/product-5-bg-2.png",
//       ],
//     },
//   },
//   {
//     title: "Logitech MX Master 3 Mouse",
//     reviews: 15,
//     price: 59.0,
//     discountedPrice: 29.0,
//     id: 6,
//     imgs: {
//       thumbnails: [
//         "/images/products/product-6-sm-1.png",
//         "/images/products/product-6-sm-2.png",
//       ],
//       previews: [
//         "/images/products/product-6-bg-1.png",
//         "/images/products/product-6-bg-2.png",
//       ],
//     },
//   },
//   {
//     title: "Apple iPad Air 5th Gen - 64GB",
//     reviews: 15,
//     price: 59.0,
//     discountedPrice: 29.0,
//     id: 7,
//     imgs: {
//       thumbnails: [
//         "/images/products/product-7-sm-1.png",
//         "/images/products/product-7-sm-2.png",
//       ],
//       previews: [
//         "/images/products/product-7-bg-1.png",
//         "/images/products/product-7-bg-2.png",
//       ],
//     },
//   },
//   {
//     title: "Asus RT Dual Band Router",
//     reviews: 15,
//     price: 59.0,
//     discountedPrice: 29.0,
//     id: 8,
//     imgs: {
//       thumbnails: [
//         "/images/products/product-8-sm-1.png",
//         "/images/products/product-8-sm-2.png",
//       ],
//       previews: [
//         "/images/products/product-8-bg-1.png",
//         "/images/products/product-8-bg-2.png",
//       ],
//     },
//   },
// ];

// export default shopData;

const shopData = [
  // ──────── 1) Mobile Phone ────────
  {
    id: "p-001",
    slug: "tecno-camon-40-pro",
    title: "Tecno Camon 40 Pro",
    category: "electronics",
    subCategory: "mobile-phone",

    price: 28999,
    discountPrice: 26999,
    currency: "BDT",

    stock: 25,
    sku: "TECNO-C40P",

    images: {
      thumbnail: "https://e-catalog.com/jpg/2858801.jpg",
      gallery: [
        "https://cdn.etoren.com/upload/images/0.62549700_1743588527_tecno-camon-40-pro-dual-sim-256gb-emerald-lake-green-8gb-ram-global-version.jpg",
        "https://admin.opiniozone.com/itemupload/tecno-camon-40-pro-4g.jpg",
        "https://i0.wp.com/androidguys.com/wp-content/uploads/2025/05/tecno_camon_40_pro-21.webp",
      ],
    },

    shortDescription:
      "Tecno Camon 40 Pro with powerful camera, AMOLED display and fast performance.",

    longDescription: `
Tecno Camon 40 Pro is designed for users who want premium performance
at an affordable price. It features a stunning AMOLED display, a powerful
camera system, and a long-lasting battery.

This smartphone is ideal for photography lovers, gamers, and daily users.
With optimized software and modern design, it delivers excellent value.
    `,

    rating: 4.5,
    reviewsCount: 128,

    brand: "Tecno",
    tags: ["smartphone", "android", "camera phone"],

    status: "active",
    createdAt: "2026-01-01",

    // category-specific attributes
    categoryAttributes: {
      model: "Camon 40 Pro",
      ram: "8GB",
      storage: "256GB",
      processor: "MediaTek Helio G99",
      display: {
        size: "6.78 inch",
        type: "AMOLED",
        refreshRate: "120Hz",
      },
      camera: {
        rear: "64MP + 2MP",
        front: "32MP",
      },
      battery: "5000mAh",
      charging: "45W Fast Charging",
      operatingSystem: "Android 14",
      network: "4G LTE",
      sim: "Dual SIM",
      fingerprint: "In-display",
    },
  },

  // ──────── 2) T-Shirt ────────
  {
    id: "p-002",
    slug: "premium-cotton-tshirt",
    title: "Premium Cotton T-Shirt",
    category: "fashion",
    subCategory: "tshirt",

    price: 899,
    discountPrice: 699,
    currency: "BDT",

    stock: 100,
    sku: "TSHIRT-001",

    images: {
      thumbnail: "/images/tshirt/tshirt-thumb.jpg",
      gallery: [
        "/images/tshirt/tshirt-black.jpg",
        "/images/tshirt/tshirt-white.jpg",
        "/images/tshirt/tshirt-navy.jpg",
      ],
    },

    shortDescription: "Comfortable premium cotton t-shirt for everyday wear.",

    longDescription: `
This premium cotton t-shirt is made with high-quality fabric
to ensure comfort and durability. Suitable for casual wear,
office outings, and everyday use.

The breathable material makes it ideal for all seasons.
    `,

    rating: 4.2,
    reviewsCount: 75,

    brand: "TechOrbit Wear",
    tags: ["tshirt", "fashion", "cotton"],

    status: "active",
    createdAt: "2026-01-01",

    categoryAttributes: {
      availableSizes: ["S", "M", "L", "XL"],
      availableColors: ["Black", "White", "Navy"],
      fabric: "100% Cotton",
      fit: "Regular",
      washCare: "Machine wash",
      sleeve: "Half Sleeve",
      neckline: "Round Neck",
    },
  },

  // ──────── 3) Laptop ────────
  {
    id: "p-003",
    slug: "hp-pavilion-15",
    title: "HP Pavilion 15",
    category: "electronics",
    subCategory: "laptop",

    price: 74999,
    discountPrice: null,
    currency: "BDT",

    stock: 10,
    sku: "HP-PAV-15",

    images: {
      thumbnail: "/images/laptop/hp15-thumb.jpg",
      gallery: ["/images/laptop/hp15-1.jpg", "/images/laptop/hp15-2.jpg"],
    },

    shortDescription:
      "HP Pavilion 15 laptop for productivity and entertainment.",

    longDescription: `
HP Pavilion 15 offers reliable performance for students
and professionals. It features a powerful processor,
fast SSD storage, and a sleek design.

Ideal for office work, study, and entertainment, ensuring
smooth multitasking and satisfying visuals.
    `,

    rating: 4.6,
    reviewsCount: 52,

    brand: "HP",
    tags: ["laptop", "hp", "computer"],

    status: "active",
    createdAt: "2026-01-01",

    categoryAttributes: {
      processor: "Intel Core i5",
      ram: "16GB",
      storage: "512GB SSD",
      display: "15.6 inch FHD",
      graphics: "Intel Iris Xe",
      battery: "Up to 8 hours",
      weight: "1.7 kg",
      os: "Windows 11",
    },
  },

  // ──────── 4) Grocery ────────
  {
    id: "p-004",
    slug: "premium-basmati-rice",
    title: "Premium Basmati Rice",
    category: "grocery",
    subCategory: "rice",

    price: 1250,
    discountPrice: 1150,
    currency: "BDT",

    stock: 200,
    sku: "RICE-001",

    images: {
      thumbnail: "/images/grocery/rice-thumb.jpg",
      gallery: [],
    },

    shortDescription: "Premium quality basmati rice with rich aroma.",

    longDescription: `
Premium basmati rice sourced from high-quality farms.
Perfect for biryani, pulao, and special dishes.

Carefully packed to preserve aroma and quality
for long shelf life.
    `,

    rating: 4.8,
    reviewsCount: 210,

    brand: "TechOrbit Agro",
    tags: ["rice", "grocery", "food"],

    status: "active",
    createdAt: "2026-01-01",

    categoryAttributes: {
      weight: "5kg",
      origin: "India",
      shelfLife: "12 months",
      cookingTime: "20 minutes",
    },
  },

  // ──────── 5) Service ────────
  {
    id: "p-005",
    slug: "seo-service",
    title: "SEO Optimization Service",
    category: "services",
    subCategory: "seo",

    price: 15000,
    discountPrice: 13999,
    currency: "BDT",

    stock: 10,
    sku: "SEO-SERVICE",

    images: {
      thumbnail: "/images/services/seo-thumb.jpg",
      gallery: [],
    },

    shortDescription:
      "Professional SEO service to rank your website on Google.",

    longDescription: `
Our SEO service helps businesses achieve long-term
organic growth through proven strategies and best practices.

Includes comprehensive keyword research,
on-page improvements, technical fixes,
and monthly performance reports.
    `,

    rating: 4.9,
    reviewsCount: 35,

    brand: "TechOrbit IT",
    tags: ["seo", "digital marketing"],

    status: "active",
    createdAt: "2026-01-01",

    categoryAttributes: {
      duration: "3 Months",
      includes: [
        "Keyword Research",
        "On-page SEO",
        "Technical SEO",
        "Monthly Report",
      ],
      deliverables: "PDF reports, consultation calls",
    },
  },

  // ──────── 6) Furniture ────────
  {
    id: "p-006",
    slug: "modern-wooden-dining-table",
    title: "Modern Wooden Dining Table",
    category: "home-furniture",
    subCategory: "dining-table",

    price: 23900,
    discountPrice: 21900,
    currency: "BDT",

    stock: 12,
    sku: "FURN-DT-001",

    images: {
      thumbnail: "/images/furniture/table-thumb.jpg",
      gallery: [
        "/images/furniture/table-1.jpg",
        "/images/furniture/table-2.jpg",
      ],
    },

    shortDescription: "Sleek modern dining table made from high-quality wood.",

    longDescription: `
A modern dining table crafted with premium wood
for durability and timeless style. Perfect for family
dining, small apartments, or open-plan living spaces.

Easy to assemble, strong build, and elegant finish.
    `,

    rating: 4.3,
    reviewsCount: 28,

    brand: "HomeStyle",
    tags: ["furniture", "dining", "wood"],

    status: "active",
    createdAt: "2026-01-05",

    categoryAttributes: {
      material: "Solid wood",
      dimensions: "150 x 90 x 75 cm",
      colorFinish: "Natural Oak",
      seatingCapacity: 6,
      assemblyRequired: "Yes",
      warranty: "2 years",
    },
  },
  {
    id: "P007",
    title: "HP Pavilion 15 Laptop",
    slug: "hp-pavilion-15-laptop",
    category: "laptop",
    brand: "HP",
    price: 82000,
    discountPrice: 79000,
    stock: 12,
    rating: 4.6,
    thumbnail: "/images/products/hp-pavilion-15.jpg",
    images: [
      "/images/products/hp-pavilion-15-1.jpg",
      "/images/products/hp-pavilion-15-2.jpg",
    ],
    shortDescription: "Powerful laptop for students and professionals.",
    longDescription:
      "HP Pavilion 15 is a reliable and powerful laptop designed for everyday productivity, study, and entertainment. It comes with a modern design, strong performance, and long battery life, making it ideal for students, office workers, and freelancers.",
    specifications: {
      processor: "Intel Core i5 12th Gen",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      display: "15.6 inch FHD",
      graphics: "Intel Iris Xe",
      battery: "Up to 8 hours",
      os: "Windows 11",
    },
    warranty: "2 Years Official Warranty",
    tags: ["laptop", "hp", "student", "office"],
  },
  {
    id: "P008",
    title: "Wooden Dining Table Set (6 Chair)",
    slug: "wooden-dining-table-set-6-chair",
    category: "furniture",
    brand: "HomeCraft",
    price: 45000,
    discountPrice: 42000,
    stock: 5,
    rating: 4.4,
    thumbnail: "/images/products/dining-table.jpg",
    images: [
      "/images/products/dining-table-1.jpg",
      "/images/products/dining-table-2.jpg",
    ],
    shortDescription: "Premium wooden dining table set for modern homes.",
    longDescription:
      "This wooden dining table set is crafted with high-quality solid wood, ensuring durability and elegance. It comfortably seats six people and enhances the beauty of your dining space with its modern yet classic design.",
    specifications: {
      material: "Solid Wood",
      seatingCapacity: "6 Persons",
      tableSize: "5 x 3 Feet",
      color: "Natural Brown",
      finish: "Matte Polish",
    },
    warranty: "1 Year Service Warranty",
    tags: ["furniture", "dining-table", "home"],
  },
];

export default shopData;
