export const reviewSeedData = [
  {
    productId: "69746de27517954833b299a3",
    adminId: "697b2f4e0bbe0177aa0985b1",
    orderId: null,

    userId: 535233,
    userName: "Akash Ali",
    userEmail: "akash@test.com",

    images: [],
    rating: 5,
    comment: "Amazing product! Quality and packaging both were excellent.",

    status: "pending",
    isDeleted: false,

    reply: undefined,
  },
  {
    productId: "69746de27517954833b299b0",
    adminId: "697b2f4e0bbe0177aa0985b1",
    orderId: "697c11aa0bbe0177aa0989a1",

    userId: 535233,
    userName: "Akash Ali",
    userEmail: "akash@test.com",

    images: [
      {
        url: "https://cdn.example.com/reviews/review-1.jpg",
        public_id: "review_1",
      },
    ],
    rating: 4,
    comment: "Product bhalo chilo, kintu delivery e halka delay hoyeche.",

    status: "approved",
    isDeleted: false,

    reply: {
      message: "Thanks for your feedback! We’re working on faster delivery.",
      repliedBy: "vendor",
      repliedAt: new Date("2026-01-31T10:05:40.796Z"),
    },
  },
  {
    productId: "69746de27517954833b299c1",
    adminId: "697b2f4e0bbe0177aa0985b7",
    orderId: "697c55aa0bbe0177aa0991b2",

    userId: 535233,
    userName: "Akash Ali",
    userEmail: "akash@test.com",

    images: [],
    rating: 3,
    comment: "Average experience. Description er sathe kichu mismatch chilo.",

    status: "pending",
    isDeleted: false,

    reply: undefined,
  },
  {
    productId: "69746de27517954833b299d2",
    adminId: "697b2f4e0bbe0177aa0985b7",
    orderId: null,

    userId: 535233,
    userName: "Akash Ali",
    userEmail: "akash@test.com",

    images: [],
    rating: 2,
    comment: "Price onujayi quality expected chilo na.",

    status: "rejected",
    isDeleted: false,

    reply: {
      message: "Sorry for the inconvenience. Please contact support.",
      repliedBy: "admin",
      repliedAt: new Date("2026-01-27T18:22:10.119Z"),
    },
  },
  {
    productId: "69746de27517954833b299a3",
    adminId: "697b2f4e0bbe0177aa0985b1",
    orderId: "697c66aa0bbe0177aa0999c8",

    userId: 535233,
    userName: "Akash Ali",
    userEmail: "akash@test.com",

    images: [
      {
        url: "https://cdn.example.com/reviews/review-setup.jpg",
        public_id: "review_setup",
      },
    ],
    rating: 5,
    comment: "Exactly jeita chai chilam. Highly recommended!",

    status: "approved",
    isDeleted: false,

    reply: {
      message: "Thanks a lot for your review ❤️",
      repliedBy: "vendor",
      repliedAt: new Date("2026-02-02T09:10:12.499Z"),
    },
  },
];
