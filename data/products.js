const products = [
  {
    slug: "red-vintage-oversized-tee",
    name: "Red Vintage Oversized Tee",
    brand: "Blueberries",
    price: 799,
    oldPrice: 1499,
    discount: "46% OFF",
    rating: 4.9,
    reviews: 156,
    category: "T-shirts",
    subcategory: "Cotton T-Shirts",
    images: [
      "/images/products/red-tshirt/4V6A4562.jpg",
      "/images/products/red-tshirt/4V6A4559.jpg",
      "/images/products/red-tshirt/4V6A4563.jpg",
      "/images/products/red-tshirt/4V6A4566.jpg",
      "/images/products/red-tshirt/4V6A4567.jpg",
      "/images/products/red-tshirt/4V6A4568.jpg",
      "/images/products/red-tshirt/4V6A4570.jpg",
      "/images/products/red-tshirt/4V6A4574.jpg"
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "Make a statement with our Red Vintage Oversized Tee. This premium cotton t-shirt features a relaxed, drop-shoulder fit and a rich vintage red wash that pairs perfectly with denim or cargos.",
    specs: {
      "Fabric": "100% Premium Cotton",
      "Fit": "Oversized Fit",
      "Neck": "Round Neck",
      "Sleeve": "Half Sleeve",
      "Pattern": "Vintage Wash",
      "Wash Care": "Machine Wash"
    }
  },
  {
    slug: "grey-acid-wash-polo-t-shirt",
    name: "Grey Acid Wash Polo T-Shirt",
    brand: "Blueberries",
    price: 799,
    oldPrice: 1599,
    discount: "50% OFF",
    rating: 4.8,
    reviews: 124,
    category: "Polo",
    subcategory: "Half-Sleeve",
    images: [
      "/images/products/4V6A4532.jpg",
      "/images/products/4V6A4566.jpg",
      "/images/products/4V6A4604.jpg"
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "Upgrade your casual wardrobe with our Grey Acid Wash Polo T-Shirt. Crafted from premium cotton, this polo features a unique acid wash finish that gives it a rugged, vintage look while maintaining a soft feel.",
    specs: {
      "Fabric": "100% Cotton",
      "Fit": "Regular Fit",
      "Neck": "Polo Neck",
      "Sleeve": "Half Sleeve",
      "Pattern": "Acid Wash",
      "Wash Care": "Machine Wash"
    }
  },
  {
    slug: "mauve-linen-striped-shirt",
    name: "Mauve Linen Striped Shirt",
    brand: "Blueberries",
    price: 899,
    oldPrice: 2299,
    discount: "61% OFF",
    rating: 4.9,
    reviews: 85,
    category: "Shirts",
    subcategory: "Cotton-Shirts",
    images: [
      "/images/products/4V6A4639.jpg",
      "/images/products/4V6A4532.jpg",
      "/images/products/4V6A4566.jpg"
    ],
    sizes: ['M', 'L', 'XL'],
    description: "Keep it cool and classy with our Mauve Linen Striped Shirt. Made from breathable linen blend, it's perfect for summer outings and casual Fridays.",
    specs: {
      "Fabric": "Linen Blend",
      "Fit": "Relaxed Fit",
      "Neck": "Collar",
      "Sleeve": "Full Sleeve",
      "Pattern": "Striped",
      "Wash Care": "Hand Wash Recommended"
    }
  },
  {
    slug: "green-linen-striped-shirt",
    name: "Green Linen Striped Shirt",
    brand: "Blueberries",
    price: 899,
    oldPrice: 2299,
    discount: "61% OFF",
    rating: 4.7,
    reviews: 56,
    category: "Shirts",
    subcategory: "Cotton-Shirts",
    images: [
      "/images/products/4V6A4720.jpg",
      "/images/products/4V6A4566.jpg",
      "/images/products/4V6A4604.jpg"
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: "A fresh take on the classic striped shirt. This green linen blend shirt offers comfort and style for any daytime event.",
    specs: {
      "Fabric": "Linen Blend",
      "Fit": "Regular Fit",
      "Neck": "Collar",
      "Sleeve": "Full Sleeve",
      "Pattern": "Striped",
      "Wash Care": "Machine Wash"
    }
  },
  {
    slug: "beige-oxford-striped-shirt",
    name: "Beige Oxford Striped Shirt",
    brand: "Blueberries",
    price: 849,
    oldPrice: 2299,
    discount: "63% OFF",
    rating: 4.6,
    reviews: 42,
    category: "Shirts",
    subcategory: "Cotton-Shirts",
    images: [
      "/images/products/4V6A4809.jpg",
      "/images/products/4V6A4604.jpg",
      "/images/products/4V6A4629.jpg"
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: "Classic Oxford shirt in a versatile beige stripe. Perfect for semi-formal settings or a smart-casual look.",
    specs: {
      "Fabric": "100% Oxford Cotton",
      "Fit": "Slim Fit",
      "Neck": "Button-down Collar",
      "Sleeve": "Full Sleeve",
      "Pattern": "Striped",
      "Wash Care": "Machine Wash"
    }
  },
  {
    slug: "sky-blue-regular-fit-jeans",
    name: "Sky Blue Regular Fit Jeans",
    brand: "Blueberries",
    price: 1299,
    oldPrice: 2499,
    discount: "48% OFF",
    rating: 4.7,
    reviews: 210,
    category: "Jeans",
    subcategory: "Toned Jeans",
    images: [
      "/images/products/4V6A4865.jpg",
      "/images/products/4V6A4919.jpg",
      "/images/products/4V6A5033.jpg"
    ],
    sizes: ['30', '32', '34', '36'],
    description: "Classic sky blue jeans that offer a comfortable regular fit. Durable denim with a slight stretch for all-day wear.",
    specs: {
      "Fabric": "Denim",
      "Fit": "Regular Fit",
      "Closure": "Button & Zip",
      "Pockets": "5 Pocket Style",
      "Pattern": "Solid",
      "Wash Care": "Machine Wash Cold"
    }
  },
  {
    slug: "navy-relaxed-korean-pants",
    name: "Navy Relaxed Korean Pants",
    brand: "Blueberries",
    price: 1099,
    oldPrice: 2199,
    discount: "50% OFF",
    rating: 4.8,
    reviews: 145,
    category: "Trousers",
    subcategory: "Cotton-Trousers",
    images: [
      "/images/products/4V6A4919.jpg",
      "/images/products/4V6A4865.jpg",
      "/images/products/4V6A5033.jpg"
    ],
    sizes: ['28', '30', '32', '34'],
    description: "Trendy Korean-style relaxed pants in a deep navy blue. Features a comfortable stretch fabric and a modern silhouette.",
    specs: {
      "Fabric": "Cotton Stretch",
      "Fit": "Relaxed Fit",
      "Style": "Korean Style",
      "Closure": "Elasticated Waist",
      "Pattern": "Solid",
      "Wash Care": "Dry Clean Recommended"
    }
  },
  {
    slug: "black-regular-fit-jeans",
    name: "Black Regular Fit Jeans",
    brand: "Blueberries",
    price: 1299,
    oldPrice: 2499,
    discount: "48% OFF",
    rating: 4.6,
    reviews: 92,
    category: "Jeans",
    subcategory: "Toned Jeans",
    images: [
      "/images/products/4V6A5033.jpg",
      "/images/products/4V6A4865.jpg",
      "/images/products/4V6A4919.jpg"
    ],
    sizes: ['30', '32', '34', '36'],
    description: "Premium black regular fit jeans with a timeless look. High-quality denim that maintains its color and shape wash after wash.",
    specs: {
      "Fabric": "Denim",
      "Fit": "Regular Fit",
      "Closure": "Button & Zip",
      "Pockets": "5 Pocket Style",
      "Pattern": "Solid",
      "Wash Care": "Machine Wash Cold"
    }
  },
  {
    slug: "olive-cotton-cargos",
    name: "Olive Cotton Cargos",
    brand: "Blueberries",
    price: 1499,
    oldPrice: 2999,
    discount: "50% OFF",
    rating: 4.5,
    reviews: 67,
    category: "Cargo",
    subcategory: "Cotton Cargo",
    images: [
      "/images/products/4V6A4975.jpg",
      "/images/products/4V6A4865.jpg",
      "/images/products/4V6A5033.jpg"
    ],
    sizes: ['30', '32', '34'],
    description: "Functional and stylish olive cotton cargos. Plenty of pocket space and a durable build for outdoor adventures.",
    specs: {
      "Fabric": "Cotton Twill",
      "Fit": "Cargo Fit",
      "Pockets": "Multi-pocket",
      "Sleeve": "N/A",
      "Pattern": "Solid",
      "Wash Care": "Machine Wash"
    }
  },
  {
    slug: "pink-oxford-striped-shirt",
    name: "Pink Oxford Striped Shirt",
    brand: "Blueberries",
    price: 849,
    oldPrice: 2299,
    discount: "63% OFF",
    rating: 4.7,
    reviews: 58,
    category: "Shirts",
    subcategory: "Cotton-Shirts",
    images: [
      "/images/products/4V6A4629.jpg",
      "/images/products/4V6A4604.jpg",
      "/images/products/4V6A4532.jpg"
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: "A vibrant pink Oxford shirt that adds a pop of color to your smart-casual rotation. Breathable cotton with a premium textured finish.",
    specs: {
      "Fabric": "100% Oxford Cotton",
      "Fit": "Regular Fit",
      "Neck": "Button-down Collar",
      "Sleeve": "Full Sleeve",
      "Pattern": "Solid",
      "Wash Care": "Machine Wash"
    }
  },
  {
    slug: "premium-denim-jacket",
    name: "Premium Denim Jacket",
    brand: "Blueberries",
    price: 1599,
    oldPrice: 2999,
    discount: "47% OFF",
    rating: 4.9,
    reviews: 112,
    category: "Shorts",
    subcategory: "Cotton Shorts",
    images: [
      "/images/products/4V6A4629.jpg",
      "/images/products/4V6A4865.jpg",
      "/images/products/4V6A4919.jpg"
    ],
    sizes: ['M', 'L', 'XL'],
    description: "The ultimate layering piece. This premium denim jacket features a heavy-weight fabric and timeless construction for years of style.",
    specs: {
      "Fabric": "Heavyweight Denim",
      "Fit": "Classic Fit",
      "Closure": "Button Front",
      "Sleeve": "Full Sleeve",
      "Pattern": "Solid",
      "Wash Care": "Dry Clean Only"
    }
  }
];

module.exports = { products };
