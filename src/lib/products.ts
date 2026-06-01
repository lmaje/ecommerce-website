export type WeightVariant = {
  weight: string
  price: number
  inStock: boolean
}

export type Category = {
  id: string
  name: string
  emoji: string
  bgColor: string
  count: number
}

export type Product = {
  id: string
  name: string
  categoryId: string
  description: string
  variants: WeightVariant[]
  emoji: string
  bgColor: string
  image: string
}

export const PRODUCTS: Product[] = [
  // ── Rice ────────────────────────────────────────────────────────────────────
  {
    id: 'basmati-extra-long',
    name: 'Extra Long Grain Basmati Rice',
    categoryId: 'rice',
    description: 'Premium aged basmati, perfect for pilau and biryani',
    variants: [
      { weight: '1kg', price: 3.99, inStock: true },
      { weight: '5kg', price: 16.99, inStock: true },
      { weight: '10kg', price: 29.99, inStock: true },
    ],
    emoji: '🌾',
    bgColor: '#C4A35A',
    image: 'https://bakhtarmarket.co.uk/wp-content/webp-express/webp-images/uploads/2026/03/Photoroom_20260312_120913-pm-300x300.jpg.webp',
  },
  {
    id: 'sella-rice',
    name: 'Sella Parboiled Rice',
    categoryId: 'rice',
    description: 'Golden sella rice — firm texture that stays separate after cooking',
    variants: [
      { weight: '2kg', price: 5.49, inStock: true },
      { weight: '5kg', price: 12.49, inStock: true },
      { weight: '10kg', price: 22.99, inStock: true },
    ],
    emoji: '🌾',
    bgColor: '#D4B870',
    image: 'https://bakhtarmarket.co.uk/wp-content/webp-express/webp-images/uploads/2026/03/photo_2026-03-13_16-17-59-300x300.jpg.webp',
  },
  {
    id: 'afghani-white-rice',
    name: 'Afghani White Rice',
    categoryId: 'rice',
    description: 'Short-grain white rice ideal for chalau — the everyday Afghan staple',
    variants: [
      { weight: '2kg', price: 4.49, inStock: true },
      { weight: '5kg', price: 10.49, inStock: true },
    ],
    emoji: '🍚',
    bgColor: '#E8D9A0',
    image: 'https://bakhtarmarket.co.uk/wp-content/webp-express/webp-images/uploads/2024/10/WhatsApp-Image-2024-09-19-at-1.22.48-PM-300x300.jpeg.webp',
  },
  {
    id: 'qabuli-rice-mix',
    name: 'Qabuli Palau Rice Mix',
    categoryId: 'rice',
    description: 'Pre-mixed spiced rice blend with raisins and carrots for the national dish',
    variants: [
      { weight: '500g', price: 3.99, inStock: true },
      { weight: '1kg', price: 6.99, inStock: false },
    ],
    emoji: '🍛',
    bgColor: '#B8860B',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2022/02/WhatsApp-Image-2024-09-02-at-11.19.40_9f29c54b-2-300x300.webp',
  },

  // ── Nuts ─────────────────────────────────────────────────────────────────────
  {
    id: 'pistachio-roasted',
    name: 'Roasted Salted Pistachios',
    categoryId: 'nuts',
    description: 'Premium Afghan pistachios, slow-roasted and lightly salted',
    variants: [
      { weight: '250g', price: 5.99, inStock: true },
      { weight: '500g', price: 10.99, inStock: true },
      { weight: '1kg', price: 19.99, inStock: false },
    ],
    emoji: '🥜',
    bgColor: '#7D9B4A',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2022/02/Pistachio-Turkish-33-300x300.webp',
  },
  {
    id: 'almonds-raw',
    name: 'Raw Afghan Almonds (Badam)',
    categoryId: 'nuts',
    description: 'Freshly harvested raw almonds from Badakhshan province',
    variants: [
      { weight: '250g', price: 4.99, inStock: true },
      { weight: '500g', price: 8.99, inStock: true },
      { weight: '1kg', price: 15.99, inStock: true },
    ],
    emoji: '🤍',
    bgColor: '#D2B48C',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2022/02/Almond-in-shell-afghani-300x300.webp',
  },
  {
    id: 'walnuts-halved',
    name: 'Afghan Walnuts (Charmarghz)',
    categoryId: 'nuts',
    description: 'Light, buttery walnuts harvested in Nuristan — great for cooking and snacking',
    variants: [
      { weight: '250g', price: 3.99, inStock: true },
      { weight: '500g', price: 7.49, inStock: true },
      { weight: '1kg', price: 13.99, inStock: true },
    ],
    emoji: '🪨',
    bgColor: '#8B7355',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2022/02/Afghani-walnuts-300x300.webp',
  },
  {
    id: 'cashews-raw',
    name: 'Raw Cashews (Kaaju)',
    categoryId: 'nuts',
    description: 'Whole raw cashews — creamy, naturally sweet, ideal for sweets and snacking',
    variants: [
      { weight: '250g', price: 4.49, inStock: true },
      { weight: '500g', price: 7.99, inStock: true },
    ],
    emoji: '🌰',
    bgColor: '#C8A96E',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2024/09/Cashew-nuts-row-300x300.webp',
  },

  // ── Tea ──────────────────────────────────────────────────────────────────────
  {
    id: 'afghan-green-tea',
    name: 'Afghan Green Tea (Sabz Chai)',
    categoryId: 'tea',
    description: 'Traditional loose-leaf green tea from the Afghan mountains',
    variants: [
      { weight: '250g', price: 4.49, inStock: true },
      { weight: '500g', price: 7.99, inStock: true },
    ],
    emoji: '🫖',
    bgColor: '#4A7C59',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2022/02/WhatsApp-Image-2024-09-02-at-11.26.21_c424f2e2-300x300.webp',
  },
  {
    id: 'black-tea-siah-chai',
    name: 'Afghan Black Tea (Siah Chai)',
    categoryId: 'tea',
    description: 'Strong loose-leaf black tea — the bold base for Afghan milk tea',
    variants: [
      { weight: '250g', price: 3.99, inStock: true },
      { weight: '500g', price: 6.99, inStock: true },
      { weight: '1kg', price: 12.49, inStock: true },
    ],
    emoji: '☕',
    bgColor: '#4A3728',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2022/02/WhatsApp-Image-2024-09-02-at-11.26.19_280d60db-300x300.webp',
  },
  {
    id: 'chai-masala',
    name: 'Chai Masala Spice Blend',
    categoryId: 'tea',
    description: 'Aromatic spice blend of cardamom, cinnamon, ginger and cloves for spiced chai',
    variants: [
      { weight: '100g', price: 2.49, inStock: true },
      { weight: '250g', price: 4.99, inStock: true },
    ],
    emoji: '🌿',
    bgColor: '#6B4226',
    image: 'https://bakhtarmarket.co.uk/wp-content/webp-express/webp-images/uploads/2025/02/650D98EF-9518-4A07-B607-4D4CA4C9D9C3-300x300.jpg.webp',
  },
  {
    id: 'rose-hip-tea',
    name: 'Dried Rose Hip Tea (Nastaran)',
    categoryId: 'tea',
    description: 'Caffeine-free floral herbal tea made from dried Afghan rose hips',
    variants: [
      { weight: '100g', price: 3.49, inStock: true },
      { weight: '250g', price: 7.49, inStock: false },
    ],
    emoji: '🌹',
    bgColor: '#C0708A',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/03/75AC3BF4-BA68-43A0-813E-FDD83AC768D9-300x300.webp',
  },

  // ── Cold Drinks ───────────────────────────────────────────────────────────────
  {
    id: 'doogh',
    name: 'Doogh (Yoghurt Drink)',
    categoryId: 'cold-drinks',
    description: 'Traditional salted yoghurt drink, lightly carbonated',
    variants: [
      { weight: '1L', price: 1.79, inStock: true },
    ],
    emoji: '🥤',
    bgColor: '#5B9BD5',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2022/02/WhatsApp-Image-2024-09-02-at-11.26.22_3cd83715-300x300.webp',
  },
  {
    id: 'pomegranate-juice',
    name: 'Afghan Pomegranate Juice (Anar)',
    categoryId: 'cold-drinks',
    description: 'Pure pressed juice from Kandahar pomegranates — tart, sweet and deep red',
    variants: [
      { weight: '500ml', price: 2.99, inStock: true },
      { weight: '1L', price: 4.99, inStock: true },
    ],
    emoji: '🍹',
    bgColor: '#9B2335',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2024/09/Dark-mulberries-300x300.webp',
  },
  {
    id: 'mango-drink',
    name: 'Afghan Mango Drink (Aam)',
    categoryId: 'cold-drinks',
    description: 'Thick, sweet mango nectar made from South Asian alphonso mangoes',
    variants: [
      { weight: '250ml', price: 0.99, inStock: true },
      { weight: '1L', price: 2.49, inStock: true },
    ],
    emoji: '🥭',
    bgColor: '#F4A823',
    image: 'https://bakhtarmarket.co.uk/wp-content/webp-express/webp-images/uploads/2025/11/Mango-300x300.png.webp',
  },
  {
    id: 'tamarind-sharbat',
    name: 'Tamarind Sharbat (Amli)',
    categoryId: 'cold-drinks',
    description: 'Tangy tamarind concentrate — dilute with water for a refreshing summer drink',
    variants: [
      { weight: '500ml', price: 3.29, inStock: true },
    ],
    emoji: '🍋',
    bgColor: '#8B6914',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/02/Gur-300x300.webp',
  },

  // ── Sweets ────────────────────────────────────────────────────────────────────
  {
    id: 'shirpira',
    name: 'Shirpira (Afghan Milk Fudge)',
    categoryId: 'sweets',
    description: 'Traditional Afghan sweet made with milk, sugar, and cardamom',
    variants: [
      { weight: '200g', price: 3.49, inStock: true },
      { weight: '400g', price: 6.49, inStock: true },
    ],
    emoji: '🍬',
    bgColor: '#E8C97A',
    image: 'https://bakhtarmarket.co.uk/wp-content/webp-express/webp-images/uploads/2025/04/WhatsApp-Image-2024-09-17-at-10.08.18-AM-3-300x300.jpeg.webp',
  },
  {
    id: 'qa-qa-biscuits',
    name: 'Afghan Qa-Qa Biscuits',
    categoryId: 'sweets',
    description: 'Traditional Afghan cardamom-flavoured biscuits',
    variants: [
      { weight: '300g', price: 2.49, inStock: true },
    ],
    emoji: '🍪',
    bgColor: '#B8860B',
    image: 'https://bakhtarmarket.co.uk/wp-content/webp-express/webp-images/uploads/2025/04/WhatsApp-Image-2024-09-17-at-10.02.57-AM-1-300x300.jpeg.webp',
  },
  {
    id: 'halwa-e-aurd',
    name: 'Halwa-e-Aurd (Wheat Halwa)',
    categoryId: 'sweets',
    description: 'Dense, fragrant wheat flour halwa cooked in ghee with rosewater and pistachios',
    variants: [
      { weight: '250g', price: 3.99, inStock: true },
      { weight: '500g', price: 7.49, inStock: true },
    ],
    emoji: '🍮',
    bgColor: '#C9A227',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/02/Gur-300x300.webp',
  },
  {
    id: 'gosh-feel',
    name: 'Gosh-e-Feel (Elephant Ear Pastry)',
    categoryId: 'sweets',
    description: 'Crispy deep-fried pastry dusted with powdered sugar and crushed pistachios',
    variants: [
      { weight: '200g', price: 4.49, inStock: true },
    ],
    emoji: '🥐',
    bgColor: '#D4A96A',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/05/IMG_7274-300x300.webp',
  },

  // ── Spices ────────────────────────────────────────────────────────────────────
  {
    id: 'cardamom-green',
    name: 'Green Cardamom (Hel)',
    categoryId: 'spices',
    description: 'Whole green cardamom pods — essential for Afghan rice and chai',
    variants: [
      { weight: '100g', price: 2.99, inStock: true },
      { weight: '250g', price: 5.99, inStock: true },
    ],
    emoji: '🌱',
    bgColor: '#4D7C4D',
    image: 'https://bakhtarmarket.co.uk/wp-content/webp-express/webp-images/uploads/2025/02/AC55F85E-939D-48D7-B786-817C02AA65EA-300x300.jpg.webp',
  },
  {
    id: 'saffron-afghan',
    name: 'Afghan Saffron (Zafaran)',
    categoryId: 'spices',
    description: "Premium grade saffron from Herat — the world's finest",
    variants: [
      { weight: '1g', price: 4.99, inStock: true },
      { weight: '2g', price: 8.99, inStock: true },
      { weight: '5g', price: 19.99, inStock: true },
    ],
    emoji: '✨',
    bgColor: '#C9A227',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/03/205C8376-3F0A-46AC-B1BB-506F988C8C7C-300x300.webp',
  },
  {
    id: 'shorwa-mix',
    name: 'Shorwa Spice Blend',
    categoryId: 'spices',
    description: 'Ready-blend of spices for the classic Afghan shorwa soup',
    variants: [
      { weight: '100g', price: 1.99, inStock: true },
      { weight: '250g', price: 3.99, inStock: true },
    ],
    emoji: '🌶️',
    bgColor: '#C0392B',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/03/29818D5F-50B3-4D60-9F9E-F42B15F99A22-300x300.webp',
  },
  {
    id: 'coriander-ground',
    name: 'Ground Coriander (Gashneez)',
    categoryId: 'spices',
    description: 'Freshly stone-ground coriander seeds — warm, citrusy base spice',
    variants: [
      { weight: '100g', price: 1.49, inStock: true },
      { weight: '250g', price: 2.99, inStock: true },
    ],
    emoji: '🫙',
    bgColor: '#7D9B4A',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/03/cinnamon-powder-300x300.webp',
  },

  // ── Afghan Groceries ──────────────────────────────────────────────────────────
  {
    id: 'rose-water',
    name: 'Rose Water (Gol-e-Mohammadi)',
    categoryId: 'afghan-groceries',
    description: 'Pure Afghan rose water, perfect for firni and sweets',
    variants: [
      { weight: '250ml', price: 2.99, inStock: true },
      { weight: '500ml', price: 4.99, inStock: true },
    ],
    emoji: '🌹',
    bgColor: '#C0708A',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/03/75AC3BF4-BA68-43A0-813E-FDD83AC768D9-300x300.webp',
  },
  {
    id: 'pomegranate-molasses',
    name: 'Pomegranate Molasses (Rob-e-Anar)',
    categoryId: 'afghan-groceries',
    description: 'Thick, tangy pomegranate reduction — essential for marinades and stews',
    variants: [
      { weight: '250ml', price: 3.49, inStock: true },
      { weight: '500ml', price: 5.99, inStock: true },
    ],
    emoji: '🫙',
    bgColor: '#7D1A2A',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2024/09/Red-raisin-ghazni-300x300.webp',
  },
  {
    id: 'dried-mulberries',
    name: 'Dried White Mulberries (Toot)',
    categoryId: 'afghan-groceries',
    description: 'Sun-dried white mulberries from Kandahar — naturally sweet, eaten as a snack',
    variants: [
      { weight: '250g', price: 3.29, inStock: true },
      { weight: '500g', price: 5.99, inStock: true },
    ],
    emoji: '🫐',
    bgColor: '#D4C5A9',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/04/Mulberries-light-300x300.webp',
  },
  {
    id: 'grape-vinegar',
    name: 'Afghan Grape Vinegar (Sirka-e-Angoor)',
    categoryId: 'afghan-groceries',
    description: 'Naturally fermented grape vinegar — used in pickles, salads and chutneys',
    variants: [
      { weight: '500ml', price: 3.99, inStock: true },
    ],
    emoji: '🍇',
    bgColor: '#5A2D6A',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2024/09/Dark-mulberries-300x300.webp',
  },

  // ── Dairy ─────────────────────────────────────────────────────────────────────
  {
    id: 'afghan-yogurt',
    name: 'Afghan Yogurt (Mast)',
    categoryId: 'dairy',
    description: 'Thick, strained whole-milk yogurt — served with every Afghan meal',
    variants: [
      { weight: '500g', price: 2.49, inStock: true },
      { weight: '1kg', price: 4.29, inStock: true },
    ],
    emoji: '🥛',
    bgColor: '#F0EDE4',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2022/02/WhatsApp-Image-2024-09-02-at-11.26.20_ac32cc35-300x300.webp',
  },
  {
    id: 'ghee-roghan',
    name: 'Clarified Butter (Roghan)',
    categoryId: 'dairy',
    description: 'Pure slow-cooked clarified butter — the cooking fat for authentic Afghan flavour',
    variants: [
      { weight: '500g', price: 5.99, inStock: true },
      { weight: '1kg', price: 10.99, inStock: true },
    ],
    emoji: '🧈',
    bgColor: '#E8C97A',
    image: 'https://bakhtarmarket.co.uk/wp-content/webp-express/webp-images/uploads/2025/03/photo_2025-03-20_18-37-16-2-300x300.jpg.webp',
  },
  {
    id: 'paneer-fresh',
    name: 'Fresh Paneer (Panir-e-Taza)',
    categoryId: 'dairy',
    description: 'Soft, mild Afghan fresh cheese — crumbled over bolani or eaten with nan',
    variants: [
      { weight: '250g', price: 3.29, inStock: true },
      { weight: '500g', price: 5.99, inStock: false },
    ],
    emoji: '🧀',
    bgColor: '#F5DEB3',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/02/Pine-nuts-300x300.webp',
  },

  // ── Grains & Legumes ──────────────────────────────────────────────────────────
  {
    id: 'chickpeas-dried',
    name: 'Dried Chickpeas (Nakhod)',
    categoryId: 'grains-legumes',
    description: 'Traditional dried chickpeas for qorma and salads',
    variants: [
      { weight: '500g', price: 1.99, inStock: true },
      { weight: '1kg', price: 3.49, inStock: true },
    ],
    emoji: '🫘',
    bgColor: '#C4962A',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/03/Chick-peas-afg-300x300.webp',
  },
  {
    id: 'red-lentils',
    name: 'Red Lentils (Masoor Dal)',
    categoryId: 'grains-legumes',
    description: 'Split red lentils — quick-cooking base for dal and Afghan soups',
    variants: [
      { weight: '500g', price: 1.49, inStock: true },
      { weight: '1kg', price: 2.69, inStock: true },
    ],
    emoji: '🫘',
    bgColor: '#D2691E',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/03/FB1338A7-08B3-40F8-BB71-0F56D37A65BC-300x300.webp',
  },
  {
    id: 'yellow-split-peas',
    name: 'Yellow Split Peas (Lappeh Zard)',
    categoryId: 'grains-legumes',
    description: 'Tender yellow split peas for dal and stews — a winter staple',
    variants: [
      { weight: '500g', price: 1.39, inStock: true },
      { weight: '1kg', price: 2.49, inStock: true },
    ],
    emoji: '🟡',
    bgColor: '#DAA520',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/05/photo_2025-05-26_19-44-34-300x300.webp',
  },
  {
    id: 'whole-wheat-flour',
    name: 'Stone-Ground Wheat Flour (Ard-e-Gandum)',
    categoryId: 'grains-legumes',
    description: 'Coarsely stone-ground whole wheat flour for traditional nan and bolani',
    variants: [
      { weight: '1kg', price: 1.79, inStock: true },
      { weight: '5kg', price: 7.99, inStock: true },
    ],
    emoji: '🌾',
    bgColor: '#C4A35A',
    image: 'https://bakhtarmarket.co.uk/wp-content/uploads/2025/03/CF633FCB-F1BE-4438-87EA-DD64FA2F002D-300x300.webp',
  },
]

const CATEGORY_META: Omit<Category, 'count'>[] = [
  { id: 'afghan-groceries', name: 'Afghan Groceries', emoji: '🏪', bgColor: '#2D5A27' },
  { id: 'rice', name: 'Rice', emoji: '🌾', bgColor: '#8B7355' },
  { id: 'nuts', name: 'Nuts', emoji: '🥜', bgColor: '#6B4F0A' },
  { id: 'tea', name: 'Tea', emoji: '🫖', bgColor: '#4A3728' },
  { id: 'cold-drinks', name: 'Cold Drinks', emoji: '🥤', bgColor: '#1A5276' },
  { id: 'sweets', name: 'Sweets', emoji: '🍬', bgColor: '#7D3C98' },
  { id: 'spices', name: 'Spices', emoji: '🌶️', bgColor: '#922B21' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛', bgColor: '#1A6B5A' },
  { id: 'grains-legumes', name: 'Grains & Legumes', emoji: '🫘', bgColor: '#5D4037' },
]

export const CATEGORIES: Category[] = CATEGORY_META.map(meta => ({
  ...meta,
  count: PRODUCTS.filter(p => p.categoryId === meta.id).length,
}))

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.id === slug)
}

export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 8)
