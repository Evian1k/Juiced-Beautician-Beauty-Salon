/**
 * Juiced Beautician — single source of truth for all salon data.
 * Real business information. Imagery uses Unsplash hot-linking for demo.
 */

export const business = {
  name: "Juiced Beautician",
  legalName: "Juiced Beautician Beauty Salon Nairobi",
  tagline: "Where Beauty Meets Artistry",
  description:
    "Nairobi's premier luxury beauty destination. From editorial makeup to bespoke lash artistry, we craft timeless beauty rituals tailored to you.",
  phone: "+254759558872",
  phoneDisplay: "+254 759 558872",
  whatsapp: "254759558872",
  email: "hello@juicedbeautician.co.ke",
  address: {
    line1: "Travel House, Kenyatta Avenue",
    line2: "Nairobi CBD",
    city: "Nairobi",
    country: "Kenya",
    postal: "00100",
  },
  hours: "Open 24 Hours · Every Day",
  rating: 5.0,
  reviewCount: 39,
  mapEmbed:
    "https://www.google.com/maps?q=Travel+House+Kenyatta+Avenue+Nairobi&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Travel+House+Kenyatta+Avenue+Nairobi",
  social: {
    instagram: "https://instagram.com/juicedbeautician",
    facebook: "https://facebook.com/juicedbeautician",
    tiktok: "https://tiktok.com/@juicedbeautician",
  },
  founded: 2019,
  stats: [
    { value: "5.0★", label: "Google Rating" },
    { value: "39+", label: "5-Star Reviews" },
    { value: "6+", label: "Years of Artistry" },
    { value: "5K+", label: "Happy Clients" },
  ],
};

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  benefits: string[];
  duration: string;
  startingPrice: number; // KSh
  image: string;
  popular?: boolean;
};

export type ServiceCategory =
  | "Makeup"
  | "Lashes"
  | "Brows"
  | "Nails"
  | "Facials"
  | "Skin Care"
  | "Bridal Beauty"
  | "Beauty Packages"
  | "VIP Packages";

export const serviceCategories: { name: ServiceCategory; tagline: string; icon: string }[] = [
  { name: "Makeup", tagline: "Editorial. Bridal. Everyday glamour.", icon: "makeup" },
  { name: "Lashes", tagline: "Volume, length, and timeless allure.", icon: "lash" },
  { name: "Brows", tagline: "Sculpted frames for your eyes.", icon: "brow" },
  { name: "Nails", tagline: "Hand-painted wearable art.", icon: "nail" },
  { name: "Facials", tagline: "Rituals for luminous skin.", icon: "facial" },
  { name: "Skin Care", tagline: "Personalised, results-driven protocols.", icon: "skin" },
  { name: "Bridal Beauty", tagline: "The most important face of your life.", icon: "bridal" },
  { name: "Beauty Packages", tagline: "Curated rituals, savoured together.", icon: "package" },
  { name: "VIP Packages", tagline: "Private suite. Dedicated artist. Zero compromise.", icon: "vip" },
];

export const services: Service[] = [
  // Makeup
  {
    id: "mua-professional",
    name: "Professional Makeup Artistry",
    category: "Makeup",
    description:
      "A bespoke makeup experience tailored to your features, occasion, and personal aesthetic. We blend HD formulas with skin-prep mastery to deliver a flawless, photograph-ready finish that wears gracefully from morning to last dance.",
    benefits: ["HD & airbrush finish", "Custom colour matching", "Skin-prep ritual", "Long-wear setting"],
    duration: "75 min",
    startingPrice: 4500,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: "event-makeup",
    name: "Event & Red Carpet Makeup",
    category: "Makeup",
    description:
      "Camera-ready artistry designed for galas, premieres, and milestone celebrations. Smudge-proof, flash-friendly, and built to endure the longest of evenings with poise.",
    benefits: ["Flash-photography tested", "Smudge-proof formulas", "Lash application included", "Touch-up kit"],
    duration: "90 min",
    startingPrice: 6500,
    image: "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "graduation-makeup",
    name: "Graduation Makeup",
    category: "Makeup",
    description:
      "Celebrate your milestone with a look that photographs beautifully under graduation robes and Nairobi's golden hour. Soft, sculpted, effortlessly you.",
    benefits: ["Photo-optimised finish", "Robe-friendly palette", "Quick refresh option", "Group bookings available"],
    duration: "60 min",
    startingPrice: 3500,
    image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "photoshoot-makeup",
    name: "Photoshoot Makeup",
    category: "Makeup",
    description:
      "Editorial-grade makeup built to perform under studio lights and outdoor shoots. We work hand-in-hand with photographers and creative directors to bring the brief to life.",
    benefits: ["Editorial techniques", "On-set touch-ups", "Concept collaboration", "Male grooming available"],
    duration: "90 min",
    startingPrice: 7000,
    image: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=1200&q=80",
  },

  // Lashes
  {
    id: "lash-extensions-classic",
    name: "Classic Lash Extensions",
    category: "Lashes",
    description:
      "One premium synthetic lash applied to each natural lash. The most natural-looking enhancement — perfect for first-timers and lovers of understated elegance.",
    benefits: ["1:1 application", "Lightweight premium fibre", "Natural finish", "4–6 week retention"],
    duration: "120 min",
    startingPrice: 3500,
    image: "https://images.unsplash.com/photo-1583241800698-9c2e0d5d2117?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: "lash-volume",
    name: "Volume Lash Extensions",
    category: "Lashes",
    description:
      "Hand-crafted fans of 3–5 ultra-fine lashes per natural lash. Soft, full, and fluttery — the signature Nairobi glam.",
    benefits: ["2D–5D fans", "Featherweight fibre", "Custom curl mapping", "Full lash line density"],
    duration: "150 min",
    startingPrice: 5500,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lash-mega-volume",
    name: "Mega Volume Lashes",
    category: "Lashes",
    description:
      "Maximum density with 6–16 lightweight lashes per natural lash. A bold, dramatic, red-carpet statement that lasts.",
    benefits: ["6D–16D fans", "Maximum density", "Bold statement look", "Durable bond"],
    duration: "180 min",
    startingPrice: 7500,
    image: "https://images.unsplash.com/photo-1633113215987-3a4e1e5e5c1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lash-bar",
    name: "Lash Bar Express",
    category: "Lashes",
    description:
      "Walk-in lash enhancements — lash tint, lift, and express clusters. Perfect for a quick pick-me-up before a meeting or date night.",
    benefits: ["Walk-in friendly", "30–45 min service", "Lash tint & lift", "Cluster add-ons"],
    duration: "45 min",
    startingPrice: 1800,
    image: "https://images.unsplash.com/photo-1591375275624-c3fd14d04d3b?auto=format&fit=crop&w=1200&q=80",
  },

  // Brows
  {
    id: "eyebrow-threading",
    name: "Eyebrow Threading",
    category: "Brows",
    description:
      "The ancient art of brow sculpting with a cotton thread. Razor-precise, hygienic, and gentle on sensitive skin — the gold standard for brow shaping.",
    benefits: ["Hair-thread precision", "No chemicals", "Long-lasting shape", "Suitable for sensitive skin"],
    duration: "20 min",
    startingPrice: 800,
    image: "https://images.unsplash.com/photo-1583241800698-9c2e0d5d2117?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "eyebrow-styling",
    name: "Eyebrow Styling & Lamination",
    category: "Brows",
    description:
      "A two-week brow lift and shape that delivers full, brushed-up brows à la Lily Collins. Includes tint, shape, and setting.",
    benefits: ["Up to 8-week lift", "Fuller-looking brows", "Tint included", "Brushed-up finish"],
    duration: "45 min",
    startingPrice: 2500,
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: "henna-brows",
    name: "Henna Brows",
    category: "Brows",
    description:
      "Natural henna dye stains both brow hair and skin for a fuller, defined arch that lasts up to two weeks. Vegan and chemical-free.",
    benefits: ["Vegan henna formula", "Stains skin & hair", "Up to 14-day wear", "Custom shade"],
    duration: "40 min",
    startingPrice: 1800,
    image: "https://images.unsplash.com/photo-1633113215987-3a4e1e5e5c1d?auto=format&fit=crop&w=1200&q=80",
  },

  // Nails
  {
    id: "acrylic-nails",
    name: "Acrylic Nails",
    category: "Nails",
    description:
      "Sculpted extensions in your chosen length and shape, finished with gel polish or hand-painted nail art. Built to last up to three weeks.",
    benefits: ["Custom length & shape", "Up to 3-week wear", "Hand-painted art options", "Strengthening overlay"],
    duration: "120 min",
    startingPrice: 2800,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: "gel-nails",
    name: "Gel Polish Manicure",
    category: "Nails",
    description:
      "High-shine gel polish cured under LED light. Chip-free for up to three weeks with a glass-like finish.",
    benefits: ["3-week chip-free wear", "Mirror shine finish", "Quick LED cure", "32-day removal service"],
    duration: "60 min",
    startingPrice: 1800,
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "manicure",
    name: "Signature Manicure",
    category: "Nails",
    description:
      "Cuticle care, shape, buff, hand mask, and polish. A restorative ritual for hands that tell your story.",
    benefits: ["Cuticle ritual", "Hand massage", "Strengthening treatment", "Polish or bare finish"],
    duration: "45 min",
    startingPrice: 1200,
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pedicure",
    name: "Luxury Spa Pedicure",
    category: "Nails",
    description:
      "A 60-minute indulgence — warm soak, exfoliation, callus care, mask, massage, and polish. Sandal-ready feet in under an hour.",
    benefits: ["Warm aromatherapy soak", "Callus smoothing", "Foot mask & massage", "Polish or gel finish"],
    duration: "60 min",
    startingPrice: 2000,
    image: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=1200&q=80",
  },

  // Facials
  {
    id: "facial-glow",
    name: "Signature Glow Facial",
    category: "Facials",
    description:
      "Our most-requested ritual. Deep cleanse, exfoliation, steam extraction, hydrating mask, and lymphatic massage for instant Nairobi glow.",
    benefits: ["Instant radiance", "Deep pore cleanse", "Lymphatic drainage", "Custom mask"],
    duration: "75 min",
    startingPrice: 4500,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: "facial-hydrafacial",
    name: "HydraFacial™ Resurfacing",
    category: "Facials",
    description:
      "Medical-grade resurfacing — cleanse, exfoliate, extract, and hydrate in one patented system. Visible results with zero downtime.",
    benefits: ["Medical-grade device", "No downtime", "Instant visible results", "Suitable for all skin types"],
    duration: "60 min",
    startingPrice: 7500,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "facial-antiaging",
    name: "Anti-Ageing Caviar Facial",
    category: "Facials",
    description:
      "Caviar extract, peptide serum, and micro-current lifting. A luxurious protocol that firms, plumps, and redefines facial contours.",
    benefits: ["Micro-current lift", "Peptide infusion", "Firmer contours", "Caviar-rich formula"],
    duration: "90 min",
    startingPrice: 9500,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80",
  },

  // Skin Care
  {
    id: "skincare-consultation",
    name: "Skin Care Consultation",
    category: "Skin Care",
    description:
      "A 45-minute skin analysis with our lead aesthetician. We assess, diagnose, and prescribe a personalised home-care and treatment plan.",
    benefits: ["Digital skin analysis", "Personalised regimen", "Treatment roadmap", "Product sampling"],
    duration: "45 min",
    startingPrice: 1500,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "skincare-acne",
    name: "Acne Clarifying Treatment",
    category: "Skin Care",
    description:
      "Targeted protocol for congested and acne-prone skin. Salicylic peel, blue-light therapy, and calming mask to clear and rebalance.",
    benefits: ["Salicylic peel", "Blue-light therapy", "Sebum control", "Calming mask"],
    duration: "75 min",
    startingPrice: 5500,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "skincare-hyperpigmentation",
    name: "Hyperpigmentation Brightening",
    category: "Skin Care",
    description:
      "Layered brightening protocol — vitamin C, niacinamide, and gentle lactic peel. Designed to even tone and fade dark spots over a course of sessions.",
    benefits: ["Vitamin C infusion", "Lactic peel", "Tone-evening results", "Course recommended"],
    duration: "75 min",
    startingPrice: 6500,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
  },

  // Bridal
  {
    id: "bridal-makeup",
    name: "Bridal Makeup Signature",
    category: "Bridal Beauty",
    description:
      "The face you'll wear for the rest of your life. Pre-trial, day-of application, lash, and touch-up kit. We arrive early, calm, and unflappable.",
    benefits: ["Pre-wedding trial", "Day-of application", "Premium lash set", "Touch-up kit included"],
    duration: "180 min",
    startingPrice: 18000,
    image: "https://images.unsplash.com/photo-1583241800698-9c2e0d5d2117?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: "bridal-party",
    name: "Bridal Party Package",
    category: "Bridal Beauty",
    description:
      "Coordinated artistry for the bride and up to 5 bridesmaids. One team, one timeline, one flawless result. Group rates apply.",
    benefits: ["Bride + 5 maids", "Coordinated timeline", "Single artist team", "Group discount"],
    duration: "Full day",
    startingPrice: 55000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bridal-trial",
    name: "Bridal Trial Session",
    category: "Bridal Beauty",
    description:
      "A pre-wedding trial to perfect your look. We test, photograph, and refine so your wedding day is calm, confident, and on-schedule.",
    benefits: ["Full look test", "Photographed reference", "Note refinement", "Schedule rehearsal"],
    duration: "90 min",
    startingPrice: 5000,
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
  },

  // Packages
  {
    id: "package-glow-up",
    name: "The Glow-Up Package",
    category: "Beauty Packages",
    description:
      "Facial + makeup + lash refresh. The complete ritual for a special evening or a personal reset.",
    benefits: ["Glow Facial", "Express Lash", "Event Makeup", "Complimentary prosecco"],
    duration: "3 hours",
    startingPrice: 12000,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "package-mum-to-be",
    name: "Mum-to-Be Pamper Package",
    category: "Beauty Packages",
    description:
      "Gentle, pregnancy-safe facial, mani, and pedi. A restorative ritual for the journey into motherhood.",
    benefits: ["Pregnancy-safe facial", "Manicure", "Pedicure", "Gentle products only"],
    duration: "3 hours",
    startingPrice: 9500,
    image: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "package-girls-day",
    name: "Girls' Day Out Package",
    category: "Beauty Packages",
    description:
      "Booked for 2–4 friends. Mimosas, music, and four hours of bliss — facial, mani, pedi, and makeup for the night out.",
    benefits: ["Per-person pricing", "Private lounge", "Mimosas & snacks", "Group photo session"],
    duration: "4 hours",
    startingPrice: 8500,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
  },

  // VIP
  {
    id: "vip-private-suite",
    name: "VIP Private Suite Experience",
    category: "VIP Packages",
    description:
      "Exclusive use of our private VIP suite with a dedicated artist, sommelier service, and curated playlist. Total discretion, total indulgence.",
    benefits: ["Private suite", "Dedicated artist", "Sommelier service", "Curated playlist"],
    duration: "4 hours",
    startingPrice: 25000,
    image: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: "vip-concierge",
    name: "VIP Home Concierge",
    category: "VIP Packages",
    description:
      "Our team comes to you. Full glam, lashes, and styling in the comfort of your home, hotel suite, or shoot location.",
    benefits: ["On-location service", "Full glam team", "Setup & tear-down", "Within Nairobi & environs"],
    duration: "Flexible",
    startingPrice: 35000,
    image: "https://images.unsplash.com/photo-1591375275624-c3fd14d04d3b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "vip-annual",
    name: "VIP Annual Membership",
    category: "VIP Packages",
    description:
      "Twelve months of priority booking, member-only events, complimentary monthly lash refresh, and 15% off all services.",
    benefits: ["Priority booking", "Monthly lash refresh", "15% off all services", "Member events"],
    duration: "12 months",
    startingPrice: 120000,
    image: "https://images.unsplash.com/photo-1633113215987-3a4e1e5e5c1d?auto=format&fit=crop&w=1200&q=80",
  },
];

export type Specialist = {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  experience: number;
  image: string;
  instagram: string;
  rating: number;
};

export const specialists: Specialist[] = [
  {
    id: "wanjiru",
    name: "Wanjiru Kamau",
    role: "Founder & Lead Makeup Artist",
    bio: "Wanjiru founded Juiced Beautician in 2019 after a decade between London, Dubai, and Nairobi editorial circles. Her work has graced Vogue Africa covers, Nairobi Fashion Week runways, and over 200 brides. She brings a calm, precise hand and an editorial eye to every face that sits in her chair.",
    specialties: ["Bridal Makeup", "Editorial", "Airbrush"],
    experience: 12,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
    instagram: "https://instagram.com/wanjiru.mua",
    rating: 5.0,
  },
  {
    id: "amina",
    name: "Amina Hassan",
    role: "Master Lash Artist",
    bio: "Amina is a certified Volume & Mega Volume lash artist with advanced training in Seoul and Istanbul. She has performed over 3,000 lash applications and is known for her featherweight, long-lasting fans and meticulous isolation technique.",
    specialties: ["Mega Volume", "Classic", "Lash Lift"],
    experience: 8,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
    instagram: "https://instagram.com/amina.lashes",
    rating: 5.0,
  },
  {
    id: "grace",
    name: "Grace Atieno",
    role: "Brow & Skin Specialist",
    bio: "Grace trained in brow artistry under Dubai's Brow Code academy and is our resident expert in lamination, henna, and threading. She pairs her brow mastery with a deep knowledge of skincare — particularly hyperpigmentation protocols suited to melanin-rich skin.",
    specialties: ["Brow Lamination", "Henna Brows", "Hyperpigmentation"],
    experience: 7,
    image: "https://images.unsplash.com/photo-1559548331-f9cb98001426?auto=format&fit=crop&w=900&q=80",
    instagram: "https://instagram.com/grace.brows",
    rating: 5.0,
  },
  {
    id: "leila",
    name: "Leila Mwangi",
    role: "Nail Artist & Aesthetician",
    bio: "Leila is a multi-disciplinary artist — acrylic sculptor, gel technician, and licensed aesthetician. Her hand-painted nail art has been featured in local campaigns and she leads our HydraFacial protocols. Clients describe her chair as a sanctuary.",
    specialties: ["Acrylic Sculpting", "Gel Art", "HydraFacial"],
    experience: 6,
    image: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&w=900&q=80",
    instagram: "https://instagram.com/leila.nails",
    rating: 5.0,
  },
  {
    id: "zawadi",
    name: "Zawadi Ochieng",
    role: "Senior Bridal Artist",
    bio: "Zawadi specialises in long-wear bridal and event makeup. She has escorted over 80 brides down the aisle across Kenya, Uganda, and Tanzania. Her superpower is calm — she will steady your nerves and your liner in equal measure.",
    specialties: ["Bridal", "Long-wear", "South-Asian Bridal"],
    experience: 9,
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
    instagram: "https://instagram.com/zawadi.bridal",
    rating: 5.0,
  },
  {
    id: "njeri",
    name: "Njeri Wangari",
    role: "Facialist & Wellness Lead",
    bio: "Njeri brings eight years of spa leadership to Juiced. Trained in Bali and Cape Town, she designs our facial protocols and curates the wellness experience — from aromatherapy to lymphatic drainage.",
    specialties: ["Anti-ageing", "Lymphatic Drainage", "Aromatherapy"],
    experience: 8,
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80",
    instagram: "https://instagram.com/njeri.wellness",
    rating: 5.0,
  },
];

export type Review = {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  service: string;
  avatar: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Chelsea Wanjiru",
    text: "I have never felt more beautiful. Wanjiru did my wedding makeup and it stayed flawless from the church ceremony to the last dance at midnight. People are still talking about it. Worth every shilling.",
    rating: 5,
    date: "2 weeks ago",
    service: "Bridal Makeup Signature",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r2",
    author: "Aisha Mohammed",
    text: "Amina is a lash genius. I have had volume lashes done in three different cities and no one comes close. Six weeks later and I still have full retention. The salon itself feels like a five-star hotel lobby.",
    rating: 5,
    date: "1 month ago",
    service: "Volume Lash Extensions",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r3",
    author: "Stephanie Otieno",
    text: "Booked the VIP suite for my 30th. Champagne, music, a dedicated artist, and the most relaxing four hours I've had in years. Left looking like a magazine cover. This is the standard for luxury in Nairobi.",
    rating: 5,
    date: "3 weeks ago",
    service: "VIP Private Suite Experience",
    avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r4",
    author: "Brenda Kamau",
    text: "Grace transformed my brows. I had overplucked them for years and she mapped out a shape that suits my face perfectly. The lamination lasts and lasts. I will never go anywhere else.",
    rating: 5,
    date: "2 months ago",
    service: "Eyebrow Styling & Lamination",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r5",
    author: "Mitchelle Adhiambo",
    text: "The HydraFacial by Leila is unreal. My skin looked lit-from-within for two weeks. She walked me through every step and tailored the serums to my hyperpigmentation. Top-tier service.",
    rating: 5,
    date: "1 month ago",
    service: "HydraFacial Resurfacing",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r6",
    author: "Faith Nyambura",
    text: "Open 24 hours saved my life. I had a 6am flight to Dubai for a photoshoot and Zawadi met me at 3am to do my makeup. She was calm, professional, and the look survived the entire flight and shoot.",
    rating: 5,
    date: "5 weeks ago",
    service: "Photoshoot Makeup",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r7",
    author: "Vivian Wambui",
    text: "The girls' day package was everything. Four of us, mimosas, music, and we all left looking phenomenal for the night out. They even took group photos for us. 11/10 experience.",
    rating: 5,
    date: "3 months ago",
    service: "Girls' Day Out Package",
    avatar: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r8",
    author: "Diana Chebet",
    text: "I travel from Eldoret to Nairobi specifically for Juiced Beautician. That should tell you everything. Clean, luxurious, professional, and the results speak for themselves.",
    rating: 5,
    date: "2 months ago",
    service: "Signature Glow Facial",
    avatar: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=200&q=80",
  },
];

export type PortfolioItem = {
  id: string;
  title: string;
  category: "Lashes" | "Brows" | "Makeup" | "Bridal" | "Nails" | "Skin Care";
  image: string;
  width: number; // for masonry sizing hint
  height: number;
};

export const portfolio: PortfolioItem[] = [
  { id: "p1", title: "Soft Glam Bridal", category: "Bridal", image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=900&q=80", width: 900, height: 1200 },
  { id: "p2", title: "Volume Lash Set", category: "Lashes", image: "https://images.unsplash.com/photo-1583241800698-9c2e0d5d2117?auto=format&fit=crop&w=900&q=80", width: 900, height: 600 },
  { id: "p3", title: "Henna Brow Mapping", category: "Brows", image: "https://images.unsplash.com/photo-1633113215987-3a4e1e5e5c1d?auto=format&fit=crop&w=900&q=80", width: 900, height: 1100 },
  { id: "p4", title: "Editorial Cut-crease", category: "Makeup", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80", width: 900, height: 1350 },
  { id: "p5", title: "Acrylic Chrome Nails", category: "Nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80", width: 900, height: 600 },
  { id: "p6", title: "HydraFacial Glow", category: "Skin Care", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80", width: 900, height: 1200 },
  { id: "p7", title: "South-Asian Bridal", category: "Bridal", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", width: 900, height: 600 },
  { id: "p8", title: "Mega Volume Lashes", category: "Lashes", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80", width: 900, height: 1200 },
  { id: "p9", title: "Brushed-up Brows", category: "Brows", image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=80", width: 900, height: 1100 },
  { id: "p10", title: "Red Carpet Glam", category: "Makeup", image: "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=900&q=80", width: 900, height: 1350 },
  { id: "p11", title: "Hand-painted Nail Art", category: "Nails", image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=80", width: 900, height: 1100 },
  { id: "p12", title: "Caviar Facial Result", category: "Skin Care", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80", width: 900, height: 600 },
  { id: "p13", title: "Bridal Trial Look", category: "Bridal", image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=900&q=80", width: 900, height: 1350 },
  { id: "p14", title: "Classic Lash Extensions", category: "Lashes", image: "https://images.unsplash.com/photo-1591375275624-c3fd14d04d3b?auto=format&fit=crop&w=900&q=80", width: 900, height: 1100 },
  { id: "p15", title: "Sculpted Brow Arch", category: "Brows", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80", width: 900, height: 600 },
  { id: "p16", title: "Smoky Eye Editorial", category: "Makeup", image: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=900&q=80", width: 900, height: 1200 },
];

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: "Skincare" | "Bridal" | "Lash Care" | "Brow Care" | "Nail Care" | "Trends";
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Nairobi Bride's Complete Beauty Timeline",
    excerpt:
      "A 6-month roadmap from skin consult to wedding-day glow. We break down every appointment, treatment, and at-home ritual to ensure you walk down the aisle at your most radiant.",
    category: "Bridal",
    author: "Wanjiru Kamau",
    date: "March 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1200&q=80",
    slug: "nairobi-bride-beauty-timeline",
  },
  {
    id: "b2",
    title: "Lash Care 101: How to Make Your Set Last 6 Weeks",
    excerpt:
      "Volume lashes are an investment. We share the aftercare rituals our master lash artist Amina swears by — from cleansing technique to sleep positioning.",
    category: "Lash Care",
    author: "Amina Hassan",
    date: "March 4, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1583241800698-9c2e0d5d2117?auto=format&fit=crop&w=1200&q=80",
    slug: "lash-care-101-six-weeks",
  },
  {
    id: "b3",
    title: "Skincare for Melanin-Rich Skin: A Nairobi Guide",
    excerpt:
      "Hyperpigmentation, uneven tone, and post-inflammatory marks affect melanin-rich skin differently. Here's how we approach it at Juiced — and what you can do at home.",
    category: "Skincare",
    author: "Grace Atieno",
    date: "February 26, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
    slug: "skincare-melanin-rich-nairobi",
  },
  {
    id: "b4",
    title: "The 2026 Bridal Makeup Trends We're Loving",
    excerpt:
      "From soft-glam monochromatic looks to graphic liner moments, here are the bridal trends defining 2026 — and how to know which is right for you.",
    category: "Trends",
    author: "Zawadi Ochieng",
    date: "February 18, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
    slug: "2026-bridal-makeup-trends",
  },
  {
    id: "b5",
    title: "Brow Lamination: Everything You Need to Know",
    excerpt:
      "Brushed-up brows aren't going anywhere. We break down the science, the aftercare, and how to know if you're a candidate.",
    category: "Brow Care",
    author: "Grace Atieno",
    date: "February 9, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&q=80",
    slug: "brow-lamination-guide",
  },
  {
    id: "b6",
    title: "Acrylic vs Gel vs Dip: Choosing the Right Nail System",
    excerpt:
      "Three popular nail systems, three very different wear profiles. Leila explains how to choose based on your lifestyle, nail health, and aesthetic goals.",
    category: "Nail Care",
    author: "Leila Mwangi",
    date: "January 30, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    slug: "acrylic-gel-dip-comparison",
  },
];

export type FaqItem = { q: string; a: string; category: string };

export const faqs: FaqItem[] = [
  {
    category: "Appointments",
    q: "How do I book an appointment?",
    a: "You can book online 24/7 via the booking form on this page, call us at +254 759 558872, or message us on WhatsApp. Online bookings receive an immediate confirmation email and our team will reach out within 2 hours to confirm specialist availability.",
  },
  {
    category: "Appointments",
    q: "How far in advance should I book?",
    a: "For bridal and VIP services we recommend 4–8 weeks in advance. For most other services, 3–7 days is sufficient. Same-day appointments are often available — please call or WhatsApp us directly for the fastest response.",
  },
  {
    category: "Appointments",
    q: "Can I choose my specialist?",
    a: "Absolutely. Our online booking system lets you select any specialist by name. If you have a preference but are unsure, our reception team can recommend the best match for your service and aesthetic.",
  },
  {
    category: "Walk-ins",
    q: "Do you accept walk-ins?",
    a: "Yes, walk-ins are welcome at our Lash Bar and for express services (brow threading, lash refresh, manicure). However, we strongly recommend booking ahead for facials, makeup, and lash extensions to secure your preferred time and specialist.",
  },
  {
    category: "Walk-ins",
    q: "Are you really open 24 hours?",
    a: "Yes — we are open 24 hours, 7 days a week. Late-night and early-morning appointments (between 9pm and 7am) require advance booking and may incur a 25% after-hours surcharge. This is popular with flight crew, models, and brides.",
  },
  {
    category: "Payments",
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa, Visa, Mastercard, American Express, and cash. For packages and bridal bookings, a 50% deposit is required to secure your slot, with the balance due on the day of service.",
  },
  {
    category: "Payments",
    q: "Do you offer instalment plans for packages?",
    a: "Yes. Our VIP Annual Membership and bridal packages over KSh 50,000 can be split into 2–3 instalments via M-Pesa. Please mention this when booking and our team will arrange a plan.",
  },
  {
    category: "Cancellations",
    q: "What is your cancellation policy?",
    a: "Cancellations or rescheduling made 24+ hours before your appointment incur no charge. Within 24 hours, a 50% fee applies. No-shows are charged the full service amount. Bridal trials and VIP suite bookings require 72-hour notice.",
  },
  {
    category: "Cancellations",
    q: "Can I reschedule my bridal appointment?",
    a: "Yes, with at least 72 hours' notice we will reschedule your bridal appointment at no charge. We understand wedding timelines shift — communicate early and we will accommodate.",
  },
  {
    category: "Bridal",
    q: "Do you travel for destination weddings?",
    a: "Yes. Our VIP Home Concierge team travels within Kenya and across East Africa for destination weddings. Travel and accommodation are billed separately. Please book at least 8 weeks in advance for destination events.",
  },
  {
    category: "Bridal",
    q: "Do you offer bridal party discounts?",
    a: "Yes. Bookings for the bride plus 4 or more bridesmaids receive a 10% discount on the total. Bride plus 8+ receives 15%. This is automatically applied when you book the Bridal Party Package.",
  },
  {
    category: "Gift Vouchers",
    q: "Do you sell gift vouchers?",
    a: "Yes — available in any denomination from KSh 1,500 to KSh 250,000. Vouchers are digital, valid for 12 months, and can be redeemed against any service or package. Perfect for birthdays, anniversaries, and bridal party gifts.",
  },
  {
    category: "Gift Vouchers",
    q: "Can I buy a voucher for the VIP suite?",
    a: "Absolutely. Our VIP suite experiences are the most-gifted item in our catalogue. We can also curate fully bespoke vouchers — just call us and we will tailor one to your recipient.",
  },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Specialists", href: "#specialists" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews", href: "#reviews" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
