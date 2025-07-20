import type { Product } from '@/lib/types/globals'

export const sampleProducts: Product[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description:
      'Premium over-ear headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=1',
        alt: 'Black wireless headphones front view',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=2',
        alt: 'Wireless headphones side profile',
        isPrimary: false,
      },
    ],
    price: 199.99,
    inventory: {
      available: 45,
      lowStockThreshold: 10,
    },
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-t-shirt',
    description:
      'Soft, breathable organic cotton t-shirt in classic fit. Available in multiple colors. Sustainably sourced and ethically made.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=3',
        alt: 'White organic cotton t-shirt',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=4',
        alt: 'T-shirt fabric close-up',
        isPrimary: false,
      },
    ],
    price: 29.99,
    inventory: {
      available: 120,
      lowStockThreshold: 20,
    },
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'Smart Watch Series X',
    slug: 'smart-watch-series-x',
    description:
      'Advanced fitness tracking, heart rate monitoring, GPS, and smartphone connectivity. Water-resistant with 5-day battery life.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=5',
        alt: 'Black smart watch on wrist',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=6',
        alt: 'Smart watch display interface',
        isPrimary: false,
      },
      {
        url: 'https://picsum.photos/600/400?random=7',
        alt: 'Smart watch charging dock',
        isPrimary: false,
      },
    ],
    price: 349.99,
    inventory: {
      available: 28,
      lowStockThreshold: 5,
    },
  },
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'Ceramic Coffee Mug',
    slug: 'ceramic-coffee-mug',
    description:
      'Handcrafted ceramic mug with ergonomic handle. Microwave and dishwasher safe. Holds 12oz of your favorite beverage.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=8',
        alt: 'Blue ceramic coffee mug',
        isPrimary: true,
      },
    ],
    price: 18.5,
    inventory: {
      available: 75,
      lowStockThreshold: 15,
    },
  },
  {
    _id: '507f1f77bcf86cd799439015',
    name: 'LED Desk Lamp',
    slug: 'led-desk-lamp',
    description:
      'Adjustable LED desk lamp with multiple brightness levels and color temperatures. USB charging port included.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=9',
        alt: 'Modern LED desk lamp',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=10',
        alt: 'Desk lamp adjustment demonstration',
        isPrimary: false,
      },
    ],
    price: 89.99,
    inventory: {
      available: 32,
      lowStockThreshold: 8,
    },
  },
  {
    _id: '507f1f77bcf86cd799439016',
    name: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    description:
      'Non-slip yoga mat made from eco-friendly TPE material. 6mm thick for extra comfort and joint protection.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=11',
        alt: 'Purple yoga mat rolled out',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=12',
        alt: 'Yoga mat texture close-up',
        isPrimary: false,
      },
    ],
    price: 45.0,
    inventory: {
      available: 60,
      lowStockThreshold: 12,
    },
  },
  {
    _id: '507f1f77bcf86cd799439017',
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description:
      'Double-wall insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free with leak-proof cap.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=13',
        alt: 'Silver stainless steel water bottle',
        isPrimary: true,
      },
    ],
    price: 32.99,
    inventory: {
      available: 95,
      lowStockThreshold: 25,
    },
  },
  {
    _id: '507f1f77bcf86cd799439018',
    name: 'Wireless Phone Charger',
    slug: 'wireless-phone-charger',
    description:
      'Fast wireless charging pad compatible with Qi-enabled devices. LED indicator shows charging status.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=14',
        alt: 'Wireless charging pad with phone',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=15',
        alt: 'Charging pad LED indicators',
        isPrimary: false,
      },
    ],
    price: 24.99,
    inventory: {
      available: 88,
      lowStockThreshold: 20,
    },
  },
  {
    _id: '507f1f77bcf86cd799439019',
    name: 'Mechanical Keyboard',
    slug: 'mechanical-keyboard',
    description:
      'RGB backlit mechanical keyboard with blue switches. Programmable keys and N-key rollover for gaming and productivity.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=16',
        alt: 'RGB mechanical keyboard',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=17',
        alt: 'Keyboard switch close-up',
        isPrimary: false,
      },
    ],
    price: 129.99,
    inventory: {
      available: 22,
      lowStockThreshold: 5,
    },
  },
  {
    _id: '507f1f77bcf86cd799439020',
    name: 'Bamboo Cutting Board',
    slug: 'bamboo-cutting-board',
    description:
      'Sustainable bamboo cutting board with juice groove. Naturally antimicrobial and gentle on knife blades.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=18',
        alt: 'Bamboo cutting board with vegetables',
        isPrimary: true,
      },
    ],
    price: 28.75,
    inventory: {
      available: 42,
      lowStockThreshold: 10,
    },
  },
  {
    _id: '507f1f77bcf86cd799439021',
    name: 'Gaming Mouse',
    slug: 'gaming-mouse',
    description:
      'High-precision gaming mouse with 12000 DPI sensor, customizable RGB lighting, and 8 programmable buttons.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=19',
        alt: 'Black gaming mouse with RGB lighting',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=20',
        alt: 'Gaming mouse side buttons',
        isPrimary: false,
      },
    ],
    price: 79.99,
    inventory: {
      available: 35,
      lowStockThreshold: 8,
    },
  },
  {
    _id: '507f1f77bcf86cd799439022',
    name: 'Essential Oil Diffuser',
    slug: 'essential-oil-diffuser',
    description:
      'Ultrasonic aromatherapy diffuser with 7-color LED lights and multiple timer settings. Whisper-quiet operation.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=21',
        alt: 'Wood grain essential oil diffuser',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=22',
        alt: 'Diffuser with colored lights',
        isPrimary: false,
      },
    ],
    price: 39.99,
    inventory: {
      available: 58,
      lowStockThreshold: 12,
    },
  },
  {
    _id: '507f1f77bcf86cd799439023',
    name: 'Running Shoes',
    slug: 'running-shoes',
    description:
      'Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for daily training.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=23',
        alt: 'Black and white running shoes',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=24',
        alt: 'Running shoes sole detail',
        isPrimary: false,
      },
    ],
    price: 119.99,
    inventory: {
      available: 67,
      lowStockThreshold: 15,
    },
  },
  {
    _id: '507f1f77bcf86cd799439024',
    name: 'Bluetooth Speaker',
    slug: 'bluetooth-speaker',
    description:
      'Portable wireless speaker with 360-degree sound, 20-hour battery life, and IPX7 waterproof rating.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=25',
        alt: 'Cylindrical bluetooth speaker',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=26',
        alt: 'Speaker control buttons',
        isPrimary: false,
      },
    ],
    price: 89.5,
    inventory: {
      available: 41,
      lowStockThreshold: 10,
    },
  },
  {
    _id: '507f1f77bcf86cd799439025',
    name: 'Memory Foam Pillow',
    slug: 'memory-foam-pillow',
    description:
      'Contoured memory foam pillow with cooling gel layer. Provides optimal neck and head support for better sleep.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=27',
        alt: 'White memory foam pillow',
        isPrimary: true,
      },
    ],
    price: 69.99,
    inventory: {
      available: 29,
      lowStockThreshold: 6,
    },
  },
  {
    _id: '507f1f77bcf86cd799439026',
    name: 'Laptop Stand',
    slug: 'laptop-stand',
    description:
      'Adjustable aluminum laptop stand with heat dissipation design. Compatible with laptops 10-17 inches.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=28',
        alt: 'Laptop on adjustable stand',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=29',
        alt: 'Laptop stand adjustment mechanism',
        isPrimary: false,
      },
    ],
    price: 49.99,
    inventory: {
      available: 53,
      lowStockThreshold: 12,
    },
  },
  {
    _id: '507f1f77bcf86cd799439027',
    name: 'Resistance Bands Set',
    slug: 'resistance-bands-set',
    description:
      'Complete resistance bands set with 5 different resistance levels, door anchor, and workout guide.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=30',
        alt: 'Colorful resistance bands set',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=31',
        alt: 'Resistance bands with accessories',
        isPrimary: false,
      },
    ],
    price: 34.99,
    inventory: {
      available: 76,
      lowStockThreshold: 18,
    },
  },
  {
    _id: '507f1f77bcf86cd799439028',
    name: 'Smart Light Bulb',
    slug: 'smart-light-bulb',
    description:
      'WiFi-enabled LED smart bulb with 16 million colors and dimming control. Voice assistant compatible.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=32',
        alt: 'Smart LED bulb glowing',
        isPrimary: true,
      },
    ],
    price: 22.99,
    inventory: {
      available: 102,
      lowStockThreshold: 25,
    },
  },
  {
    _id: '507f1f77bcf86cd799439029',
    name: 'Vacuum Insulated Tumbler',
    slug: 'vacuum-insulated-tumbler',
    description:
      '20oz stainless steel tumbler with double-wall insulation and spill-resistant lid. Keeps drinks at temperature for hours.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=33',
        alt: 'Stainless steel tumbler with lid',
        isPrimary: true,
      },
    ],
    price: 26.5,
    inventory: {
      available: 84,
      lowStockThreshold: 20,
    },
  },
  {
    _id: '507f1f77bcf86cd799439030',
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    description:
      'Mesh back office chair with lumbar support, adjustable armrests, and pneumatic height adjustment.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=34',
        alt: 'Black ergonomic office chair',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=35',
        alt: 'Office chair adjustment controls',
        isPrimary: false,
      },
    ],
    price: 249.99,
    inventory: {
      available: 18,
      lowStockThreshold: 4,
    },
  },
  {
    _id: '507f1f77bcf86cd799439031',
    name: 'Portable Power Bank',
    slug: 'portable-power-bank',
    description:
      '10000mAh portable charger with fast charging capability and dual USB ports. LED power indicator included.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=36',
        alt: 'Slim portable power bank',
        isPrimary: true,
      },
    ],
    price: 28.99,
    inventory: {
      available: 91,
      lowStockThreshold: 22,
    },
  },
  {
    _id: '507f1f77bcf86cd799439032',
    name: 'Silk Pillowcase',
    slug: 'silk-pillowcase',
    description:
      '100% mulberry silk pillowcase with hidden zipper closure. Gentle on hair and skin, naturally hypoallergenic.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=37',
        alt: 'Cream colored silk pillowcase',
        isPrimary: true,
      },
    ],
    price: 49.5,
    inventory: {
      available: 36,
      lowStockThreshold: 8,
    },
  },
  {
    _id: '507f1f77bcf86cd799439033',
    name: 'Air Fryer',
    slug: 'air-fryer',
    description:
      '4-quart compact air fryer with digital controls and 8 preset cooking functions. Oil-free cooking for healthier meals.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=38',
        alt: 'Black digital air fryer',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=39',
        alt: 'Air fryer basket and controls',
        isPrimary: false,
      },
    ],
    price: 89.99,
    inventory: {
      available: 24,
      lowStockThreshold: 6,
    },
  },
  {
    _id: '507f1f77bcf86cd799439034',
    name: 'Fitness Tracker',
    slug: 'fitness-tracker',
    description:
      'Advanced fitness tracker with heart rate monitoring, sleep tracking, and 14-day battery life. Water-resistant design.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=40',
        alt: 'Fitness tracker on wrist showing stats',
        isPrimary: true,
      },
    ],
    price: 129.5,
    inventory: {
      available: 47,
      lowStockThreshold: 10,
    },
  },
  {
    _id: '507f1f77bcf86cd799439035',
    name: 'Weighted Blanket',
    slug: 'weighted-blanket',
    description:
      '15lb weighted blanket with soft cotton cover and glass bead filling. Promotes better sleep and reduces anxiety.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=41',
        alt: 'Gray weighted blanket on bed',
        isPrimary: true,
      },
    ],
    price: 79.99,
    inventory: {
      available: 31,
      lowStockThreshold: 7,
    },
  },
  {
    _id: '507f1f77bcf86cd799439036',
    name: 'Wireless Earbuds',
    slug: 'wireless-earbuds',
    description:
      'True wireless earbuds with active noise cancellation and 6-hour battery life. Includes charging case.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=42',
        alt: 'White wireless earbuds in case',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=43',
        alt: 'Single earbud close-up',
        isPrimary: false,
      },
    ],
    price: 149.99,
    inventory: {
      available: 62,
      lowStockThreshold: 15,
    },
  },
  {
    _id: '507f1f77bcf86cd799439037',
    name: 'Plant-Based Protein Powder',
    slug: 'plant-based-protein-powder',
    description:
      'Organic pea and hemp protein powder with natural vanilla flavor. 25g protein per serving, vegan and gluten-free.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=44',
        alt: 'Protein powder container',
        isPrimary: true,
      },
    ],
    price: 39.99,
    inventory: {
      available: 73,
      lowStockThreshold: 18,
    },
  },
  {
    _id: '507f1f77bcf86cd799439038',
    name: 'Thermal Coffee Carafe',
    slug: 'thermal-coffee-carafe',
    description:
      'Double-wall stainless steel thermal carafe keeps coffee hot for 12 hours. 1.5L capacity with easy-pour spout.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=45',
        alt: 'Stainless steel thermal carafe',
        isPrimary: true,
      },
    ],
    price: 54.99,
    inventory: {
      available: 26,
      lowStockThreshold: 6,
    },
  },
  {
    _id: '507f1f77bcf86cd799439039',
    name: 'Blue Light Glasses',
    slug: 'blue-light-glasses',
    description:
      'Computer glasses with blue light blocking lenses to reduce eye strain. Lightweight titanium frame with anti-reflective coating.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=46',
        alt: 'Black framed blue light glasses',
        isPrimary: true,
      },
    ],
    price: 34.5,
    inventory: {
      available: 89,
      lowStockThreshold: 20,
    },
  },
  {
    _id: '507f1f77bcf86cd799439040',
    name: 'Himalayan Salt Lamp',
    slug: 'himalayan-salt-lamp',
    description:
      'Hand-carved Himalayan pink salt lamp with wooden base and dimmer switch. Creates warm, ambient lighting.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=47',
        alt: 'Glowing pink salt lamp',
        isPrimary: true,
      },
    ],
    price: 42.99,
    inventory: {
      available: 38,
      lowStockThreshold: 9,
    },
  },
  {
    _id: '507f1f77bcf86cd799439041',
    name: 'Stainless Steel Mixing Bowls',
    slug: 'stainless-steel-mixing-bowls',
    description:
      'Set of 5 nesting stainless steel mixing bowls with non-slip silicone bottoms. Dishwasher safe and stackable.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=48',
        alt: 'Nested stainless steel mixing bowls',
        isPrimary: true,
      },
    ],
    price: 38.75,
    inventory: {
      available: 55,
      lowStockThreshold: 12,
    },
  },
  {
    _id: '507f1f77bcf86cd799439042',
    name: 'Wireless Car Charger',
    slug: 'wireless-car-charger',
    description:
      'Magnetic wireless car charger mount with automatic alignment and fast charging. Compatible with MagSafe devices.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=49',
        alt: 'Wireless car charger with phone',
        isPrimary: true,
      },
    ],
    price: 44.99,
    inventory: {
      available: 67,
      lowStockThreshold: 15,
    },
  },
  {
    _id: '507f1f77bcf86cd799439043',
    name: 'Organic Green Tea',
    slug: 'organic-green-tea',
    description:
      'Premium organic sencha green tea loose leaf. Rich in antioxidants with a fresh, grassy flavor profile.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=50',
        alt: 'Green tea leaves in white bowl',
        isPrimary: true,
      },
    ],
    price: 24.5,
    inventory: {
      available: 98,
      lowStockThreshold: 25,
    },
  },
  {
    _id: '507f1f77bcf86cd799439044',
    name: 'Phone Camera Lens Kit',
    slug: 'phone-camera-lens-kit',
    description:
      'Universal smartphone camera lens kit with wide-angle, macro, and fisheye lenses. Clip-on design works with most phones.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=51',
        alt: 'Camera lens kit with accessories',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=52',
        alt: 'Lens attached to smartphone',
        isPrimary: false,
      },
    ],
    price: 29.99,
    inventory: {
      available: 72,
      lowStockThreshold: 16,
    },
  },
  {
    _id: '507f1f77bcf86cd799439045',
    name: 'Meditation Cushion',
    slug: 'meditation-cushion',
    description:
      'Traditional zafu meditation cushion filled with organic buckwheat hulls. Removable washable cover included.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=53',
        alt: 'Round meditation cushion in lotus position',
        isPrimary: true,
      },
    ],
    price: 52.5,
    inventory: {
      available: 33,
      lowStockThreshold: 8,
    },
  },
  {
    _id: '507f1f77bcf86cd799439046',
    name: 'Collapsible Water Bottle',
    slug: 'collapsible-water-bottle',
    description:
      'Silicone collapsible water bottle that folds to 1/3 size when empty. BPA-free and dishwasher safe.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=54',
        alt: 'Blue collapsible water bottle',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=55',
        alt: 'Bottle shown collapsed',
        isPrimary: false,
      },
    ],
    price: 19.99,
    inventory: {
      available: 86,
      lowStockThreshold: 20,
    },
  },
  {
    _id: '507f1f77bcf86cd799439047',
    name: 'Bamboo Phone Stand',
    slug: 'bamboo-phone-stand',
    description:
      'Eco-friendly bamboo phone stand with adjustable viewing angles. Compatible with phones and small tablets.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=56',
        alt: 'Bamboo phone stand with smartphone',
        isPrimary: true,
      },
    ],
    price: 16.75,
    inventory: {
      available: 114,
      lowStockThreshold: 30,
    },
  },
  {
    _id: '507f1f77bcf86cd799439048',
    name: 'Aromatherapy Shower Steamers',
    slug: 'aromatherapy-shower-steamers',
    description:
      'Set of 12 eucalyptus aromatherapy shower steamers. Transform your shower into a spa experience.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=57',
        alt: 'Eucalyptus shower steamers in box',
        isPrimary: true,
      },
    ],
    price: 21.99,
    inventory: {
      available: 64,
      lowStockThreshold: 15,
    },
  },
  {
    _id: '507f1f77bcf86cd799439049',
    name: 'Insulated Lunch Bag',
    slug: 'insulated-lunch-bag',
    description:
      'Leak-proof insulated lunch bag with multiple compartments and adjustable shoulder strap. Keeps food fresh all day.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=58',
        alt: 'Gray insulated lunch bag',
        isPrimary: true,
      },
      {
        url: 'https://picsum.photos/600/400?random=59',
        alt: 'Lunch bag interior compartments',
        isPrimary: false,
      },
    ],
    price: 32.5,
    inventory: {
      available: 49,
      lowStockThreshold: 12,
    },
  },
  {
    _id: '507f1f77bcf86cd799439050',
    name: 'USB-C Hub',
    slug: 'usb-c-hub',
    description:
      '7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and USB-C pass-through charging.',
    images: [
      {
        url: 'https://picsum.photos/600/400?random=60',
        alt: 'Silver USB-C hub with multiple ports',
        isPrimary: true,
      },
    ],
    price: 59.99,
    inventory: {
      available: 41,
      lowStockThreshold: 10,
    },
  },
]
