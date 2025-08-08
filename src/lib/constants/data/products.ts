import type { Product } from '@/lib/types/globals'

export const sampleProducts: Product[] = [
  // TEES
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Essential Cotton T-Shirt',
    slug: 'essential-cotton-t-shirt',
    description:
      'Premium 100% cotton t-shirt with a classic fit. Soft, breathable, and perfect for everyday wear.',
    categories: ['tees', 'best-sellers'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'T-Shirts', slug: '/category/tees' },
      { name: 'Essential Cotton T-Shirt', slug: '/products/essential-cotton-t-shirt' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'White essential cotton t-shirt front view',
        isPrimary: true,
      },
      {
        url: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Cotton t-shirt back view',
        isPrimary: false,
      },
      {
        url: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'T-shirt fabric texture close-up',
        isPrimary: false,
      },
    ],
    price: 24.99,
    inventory: {
      available: 85,
      lowStockThreshold: 15,
    },
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Vintage Graphic Tee',
    slug: 'vintage-graphic-tee',
    description:
      'Retro-inspired graphic t-shirt with vintage wash and relaxed fit. Made from soft cotton blend.',
    categories: ['tees', 'new-arrivals', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'T-Shirts', slug: '/category/tees' },
      { name: 'Vintage Graphic Tee', slug: '/products/vintage-graphic-tee' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148579/pexels-photo-8148579.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Black vintage graphic t-shirt',
        isPrimary: true,
      },
      {
        url: 'https://images.pexels.com/photos/8532635/pexels-photo-8532635.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Graphic design detail',
        isPrimary: false,
      },
    ],
    price: 32.99,
    inventory: {
      available: 62,
      lowStockThreshold: 12,
    },
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'Organic Crew Neck Tee',
    slug: 'organic-crew-neck-tee',
    description:
      'Sustainable organic cotton crew neck t-shirt. Eco-friendly and ethically made with a modern fit.',
    categories: ['tees', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'T-Shirts', slug: '/category/tees' },
      { name: 'Organic Crew Neck Tee', slug: '/products/organic-crew-neck-tee' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148572/pexels-photo-8148572.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Navy organic crew neck t-shirt',
        isPrimary: true,
      },
      {
        url: 'https://images.pexels.com/photos/8532638/pexels-photo-8532638.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Organic cotton label detail',
        isPrimary: false,
      },
    ],
    price: 29.99,
    inventory: {
      available: 74,
      lowStockThreshold: 18,
    },
  },

  // HOODIES
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'Classic Pullover Hoodie',
    slug: 'classic-pullover-hoodie',
    description:
      'Comfortable pullover hoodie with kangaroo pocket and adjustable drawstrings. Perfect for layering.',
    categories: ['hoodies', 'best-sellers'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Hoodies', slug: '/category/hoodies' },
      { name: 'Classic Pullover Hoodie', slug: '/products/classic-pullover-hoodie' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Gray classic pullover hoodie',
        isPrimary: true,
      },
      {
        url: 'https://images.pexels.com/photos/8148634/pexels-photo-8148634.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Hoodie kangaroo pocket detail',
        isPrimary: false,
      },
    ],
    price: 54.99,
    inventory: {
      available: 43,
      lowStockThreshold: 10,
    },
  },
  {
    _id: '507f1f77bcf86cd799439015',
    name: 'Zip-Up Hoodie',
    slug: 'zip-up-hoodie',
    description:
      'Full-zip hoodie with ribbed cuffs and hem. Features two side pockets and premium metal zipper.',
    categories: ['hoodies', 'new-arrivals'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Hoodies', slug: '/category/hoodies' },
      { name: 'Zip-Up Hoodie', slug: '/products/zip-up-hoodie' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8532649/pexels-photo-8532649.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Black zip-up hoodie closed',
        isPrimary: true,
      },
      {
        url: 'https://images.pexels.com/photos/8532657/pexels-photo-8532657.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Metal zipper detail',
        isPrimary: false,
      },
    ],
    price: 64.99,
    inventory: {
      available: 38,
      lowStockThreshold: 8,
    },
  },
  {
    _id: '507f1f77bcf86cd799439016',
    name: 'Oversized Hoodie',
    slug: 'oversized-hoodie',
    description:
      'Relaxed oversized hoodie with dropped shoulders and extra room for comfort. Soft fleece interior.',
    categories: ['hoodies', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Hoodies', slug: '/category/hoodies' },
      { name: 'Oversized Hoodie', slug: '/products/oversized-hoodie' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148654/pexels-photo-8148654.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Cream oversized hoodie front view',
        isPrimary: true,
      },
    ],
    price: 59.99,
    inventory: {
      available: 29,
      lowStockThreshold: 6,
    },
  },

  // JACKETS
  {
    _id: '507f1f77bcf86cd799439017',
    name: 'Denim Jacket',
    slug: 'denim-jacket',
    description:
      'Classic denim jacket with button closure and chest pockets. Timeless style that pairs with everything.',
    categories: ['jackets', 'best-sellers', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Jackets', slug: '/category/jackets' },
      { name: 'Denim Jacket', slug: '/products/denim-jacket' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Blue denim jacket front view',
        isPrimary: true,
      },
      {
        url: 'https://images.pexels.com/photos/1656665/pexels-photo-1656665.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Denim jacket back view',
        isPrimary: false,
      },
    ],
    price: 89.99,
    inventory: {
      available: 31,
      lowStockThreshold: 7,
    },
  },
  {
    _id: '507f1f77bcf86cd799439018',
    name: 'Bomber Jacket',
    slug: 'bomber-jacket',
    description:
      'Modern bomber jacket with ribbed collar, cuffs, and hem. Lightweight yet warm with zip closure.',
    categories: ['jackets', 'new-arrivals'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Jackets', slug: '/category/jackets' },
      { name: 'Bomber Jacket', slug: '/products/bomber-jacket' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148673/pexels-photo-8148673.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Olive green bomber jacket',
        isPrimary: true,
      },
    ],
    price: 94.99,
    inventory: {
      available: 22,
      lowStockThreshold: 5,
    },
  },
  {
    _id: '507f1f77bcf86cd799439019',
    name: 'Windbreaker',
    slug: 'windbreaker',
    description:
      'Lightweight windbreaker with water-resistant coating. Packable design with adjustable hood.',
    categories: ['jackets', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Jackets', slug: '/category/jackets' },
      { name: 'Windbreaker', slug: '/products/windbreaker' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148686/pexels-photo-8148686.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Navy windbreaker with hood up',
        isPrimary: true,
      },
    ],
    price: 49.99,
    inventory: {
      available: 56,
      lowStockThreshold: 12,
    },
  },

  // LONGSLEEVES
  {
    _id: '507f1f77bcf86cd799439020',
    name: 'Long Sleeve Henley',
    slug: 'long-sleeve-henley',
    description:
      'Classic henley with three-button placket and long sleeves. Soft cotton blend for all-day comfort.',
    categories: ['longsleeves', 'best-sellers'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Long Sleeves', slug: '/category/longsleeves' },
      { name: 'Long Sleeve Henley', slug: '/products/long-sleeve-henley' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148698/pexels-photo-8148698.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Burgundy long sleeve henley',
        isPrimary: true,
      },
    ],
    price: 39.99,
    inventory: {
      available: 67,
      lowStockThreshold: 15,
    },
  },
  {
    _id: '507f1f77bcf86cd799439021',
    name: 'Striped Long Sleeve Tee',
    slug: 'striped-long-sleeve-tee',
    description:
      'Classic striped long sleeve t-shirt with crew neck. Timeless pattern in comfortable cotton.',
    categories: ['longsleeves', 'new-arrivals'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Long Sleeves', slug: '/category/longsleeves' },
      { name: 'Striped Long Sleeve Tee', slug: '/products/striped-long-sleeve-tee' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148708/pexels-photo-8148708.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Navy and white striped long sleeve tee',
        isPrimary: true,
      },
    ],
    price: 34.99,
    inventory: {
      available: 45,
      lowStockThreshold: 10,
    },
  },
  {
    _id: '507f1f77bcf86cd799439022',
    name: 'Thermal Long Sleeve',
    slug: 'thermal-long-sleeve',
    description:
      'Waffle-knit thermal long sleeve for extra warmth. Perfect base layer with crew neck design.',
    categories: ['longsleeves', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Long Sleeves', slug: '/category/longsleeves' },
      { name: 'Thermal Long Sleeve', slug: '/products/thermal-long-sleeve' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148724/pexels-photo-8148724.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Charcoal thermal long sleeve',
        isPrimary: true,
      },
    ],
    price: 42.99,
    inventory: {
      available: 38,
      lowStockThreshold: 8,
    },
  },

  // BOTTOMS
  {
    _id: '507f1f77bcf86cd799439023',
    name: 'Classic Straight Jeans',
    slug: 'classic-straight-jeans',
    description:
      'Timeless straight-leg jeans in premium denim. Five-pocket styling with button fly closure.',
    categories: ['bottoms', 'best-sellers'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Bottoms', slug: '/category/bottoms' },
      { name: 'Classic Straight Jeans', slug: '/products/classic-straight-jeans' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Dark wash straight jeans front view',
        isPrimary: true,
      },
    ],
    price: 79.99,
    inventory: {
      available: 52,
      lowStockThreshold: 12,
    },
  },
  {
    _id: '507f1f77bcf86cd799439024',
    name: 'Jogger Sweatpants',
    slug: 'jogger-sweatpants',
    description:
      'Comfortable jogger sweatpants with tapered fit and elastic waistband. Perfect for lounging or workouts.',
    categories: ['bottoms', 'new-arrivals', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Bottoms', slug: '/category/bottoms' },
      { name: 'Jogger Sweatpants', slug: '/products/jogger-sweatpants' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Gray jogger sweatpants',
        isPrimary: true,
      },
      {
        url: 'https://images.pexels.com/photos/8148736/pexels-photo-8148736.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Elastic waistband with drawstring',
        isPrimary: false,
      },
    ],
    price: 44.99,
    inventory: {
      available: 61,
      lowStockThreshold: 15,
    },
  },
  {
    _id: '507f1f77bcf86cd799439025',
    name: 'Chino Pants',
    slug: 'chino-pants',
    description:
      'Versatile chino pants in cotton twill. Slim fit with classic styling suitable for casual or smart-casual wear.',
    categories: ['bottoms', 'best-sellers'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Bottoms', slug: '/category/bottoms' },
      { name: 'Chino Pants', slug: '/products/chino-pants' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148748/pexels-photo-8148748.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Khaki chino pants',
        isPrimary: true,
      },
    ],
    price: 59.99,
    inventory: {
      available: 43,
      lowStockThreshold: 10,
    },
  },
  {
    _id: '507f1f77bcf86cd799439026',
    name: 'Cargo Shorts',
    slug: 'cargo-shorts',
    description:
      'Functional cargo shorts with multiple pockets and relaxed fit. Perfect for outdoor activities.',
    categories: ['bottoms', 'new-arrivals'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Bottoms', slug: '/category/bottoms' },
      { name: 'Cargo Shorts', slug: '/products/cargo-shorts' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/8148757/pexels-photo-8148757.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Olive cargo shorts with side pockets',
        isPrimary: true,
      },
    ],
    price: 39.99,
    inventory: {
      available: 34,
      lowStockThreshold: 8,
    },
  },

  // ACCESSORIES
  {
    _id: '507f1f77bcf86cd799439027',
    name: 'Knit Beanie',
    slug: 'knit-beanie',
    description:
      'Soft acrylic knit beanie with fold-over cuff. One size fits most, available in multiple colors.',
    categories: ['accessories', 'best-sellers'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Accessories', slug: '/category/accessories' },
      { name: 'Knit Beanie', slug: '/products/knit-beanie' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/1117492/pexels-photo-1117492.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Black knit beanie',
        isPrimary: true,
      },
    ],
    price: 18.99,
    inventory: {
      available: 89,
      lowStockThreshold: 20,
    },
  },
  {
    _id: '507f1f77bcf86cd799439028',
    name: 'Canvas Tote Bag',
    slug: 'canvas-tote-bag',
    description:
      'Durable canvas tote bag with reinforced handles. Spacious interior perfect for shopping or daily carry.',
    categories: ['accessories', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Accessories', slug: '/category/accessories' },
      { name: 'Canvas Tote Bag', slug: '/products/canvas-tote-bag' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/3373725/pexels-photo-3373725.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Natural canvas tote bag',
        isPrimary: true,
      },
    ],
    price: 22.99,
    inventory: {
      available: 76,
      lowStockThreshold: 18,
    },
  },
  {
    _id: '507f1f77bcf86cd799439029',
    name: 'Baseball Cap',
    slug: 'baseball-cap',
    description:
      'Classic six-panel baseball cap with adjustable strap. Curved brim and embroidered eyelets for ventilation.',
    categories: ['accessories', 'new-arrivals'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Accessories', slug: '/category/accessories' },
      { name: 'Baseball Cap', slug: '/products/baseball-cap' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/3755021/pexels-photo-3755021.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Navy baseball cap front view',
        isPrimary: true,
      },
    ],
    price: 26.99,
    inventory: {
      available: 58,
      lowStockThreshold: 12,
    },
  },
  {
    _id: '507f1f77bcf86cd799439030',
    name: 'Leather Belt',
    slug: 'leather-belt',
    description:
      'Genuine leather belt with classic pin buckle. Full-grain leather that develops beautiful patina over time.',
    categories: ['accessories', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Accessories', slug: '/category/accessories' },
      { name: 'Leather Belt', slug: '/products/leather-belt' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Brown leather belt with pin buckle',
        isPrimary: true,
      },
    ],
    price: 49.99,
    inventory: {
      available: 41,
      lowStockThreshold: 10,
    },
  },
  {
    _id: '507f1f77bcf86cd799439031',
    name: 'Cotton Socks 3-Pack',
    slug: 'cotton-socks-3-pack',
    description:
      'Comfortable crew socks in soft cotton blend. Pack of 3 in assorted colors with cushioned sole.',
    categories: ['accessories', 'best-sellers'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Accessories', slug: '/category/accessories' },
      { name: 'Cotton Socks 3-Pack', slug: '/products/cotton-socks-3-pack' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/6069114/pexels-photo-6069114.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Three pairs of cotton crew socks',
        isPrimary: true,
      },
    ],
    price: 16.99,
    inventory: {
      available: 95,
      lowStockThreshold: 25,
    },
  },
  {
    _id: '507f1f77bcf86cd799439032',
    name: 'Crossbody Messenger Bag',
    slug: 'crossbody-messenger-bag',
    description:
      'Compact crossbody messenger bag with adjustable strap. Multiple compartments for organization.',
    categories: ['accessories', 'new-arrivals'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Accessories', slug: '/category/accessories' },
      { name: 'Crossbody Messenger Bag', slug: '/products/crossbody-messenger-bag' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Black crossbody messenger bag',
        isPrimary: true,
      },
    ],
    price: 64.99,
    inventory: {
      available: 27,
      lowStockThreshold: 6,
    },
  },
  {
    _id: '507f1f77bcf86cd799439033',
    name: 'Sunglasses',
    slug: 'sunglasses',
    description:
      'Classic aviator-style sunglasses with UV protection. Metal frame with adjustable nose pads.',
    categories: ['accessories', 'featured-items'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Accessories', slug: '/category/accessories' },
      { name: 'Sunglasses', slug: '/products/sunglasses' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Gold-framed aviator sunglasses',
        isPrimary: true,
      },
    ],
    price: 42.99,
    inventory: {
      available: 53,
      lowStockThreshold: 12,
    },
  },
  {
    _id: '507f1f77bcf86cd799439034',
    name: 'Wool Scarf',
    slug: 'wool-scarf',
    description:
      'Soft wool blend scarf with fringed edges. Lightweight yet warm, perfect for layering.',
    categories: ['accessories', 'new-arrivals'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Accessories', slug: '/category/accessories' },
      { name: 'Wool Scarf', slug: '/products/wool-scarf' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/1390600/pexels-photo-1390600.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Charcoal wool scarf with fringe',
        isPrimary: true,
      },
    ],
    price: 34.99,
    inventory: {
      available: 39,
      lowStockThreshold: 8,
    },
  },
  {
    _id: '507f1f77bcf86cd799439035',
    name: 'Watch',
    slug: 'watch',
    description:
      'Minimalist analog watch with leather strap. Clean design with date display and water resistance.',
    categories: ['accessories', 'best-sellers'],
    breadcrumbs: [
      { name: 'Home', slug: '/' },
      { name: 'Accessories', slug: '/category/accessories' },
      { name: 'Watch', slug: '/products/watch' },
    ],
    images: [
      {
        url: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
        alt: 'Silver watch with brown leather strap',
        isPrimary: true,
      },
    ],
    price: 89.99,
    inventory: {
      available: 24,
      lowStockThreshold: 5,
    },
  },
]
