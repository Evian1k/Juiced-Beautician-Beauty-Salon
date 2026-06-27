# Juiced Beautician — Luxury Beauty Salon Nairobi

Production-ready luxury website for **Juiced Beautician Beauty Salon Nairobi**, located at Travel House, Kenyatta Avenue, Nairobi CBD.

![Open 24 Hours](https://img.shields.io/badge/Open-24%20Hours-B76E79) ![5.0 Rating](https://img.shields.io/badge/Google-5.0★-C9A227) ![Next.js 16](https://img.shields.io/badge/Next.js-16-000000)

A KSh 250,000+ premium website designed in the spirit of Dior Beauty, Charlotte Tilbury, Fenty Beauty, and Sephora — built to convert visitors into paying customers.

---

## ✨ Features

### Customer-facing site
- **Custom luxury brand identity** — bespoke rose-gold "JB" monogram logo, Playfair Display + Cormorant + Jost typography, ivory/rose-gold/gold/charcoal palette with dark mode
- **Full-screen parallax hero** with animated headline, 4 CTAs (Book / Call / WhatsApp / View Services), Google rating bar, animated scroll indicator
- **About section** with stats, mission/vision, value pillars
- **28 services across 9 categories** (Makeup, Lashes, Brows, Nails, Facials, Skin Care, Bridal, Packages, VIP) with KSh pricing, durations, benefits, category filtering
- **6 beauty specialists** with bios, specialties, Instagram links, ratings
- **Masonry portfolio** with 6 category filters + keyboard-navigable lightbox (←/→/Esc)
- **Animated reviews slider** with Google rating stats
- **CTA banner, blog preview, FAQ accordion** (13 questions in 6 categories)
- **Contact** with embedded Google Map, social links, working contact form
- **Footer** with newsletter signup, quick links, services links

### Interactive systems
- **5-step booking modal** (Service → Artist → Date/Time → Details → Confirm) with stepper, validation, WhatsApp confirmation handoff, Prisma persistence
- **AI Beauty Concierge "Aisha"** — full chatbot powered by z-ai-web-dev-sdk with system prompt containing all salon facts (services, prices, specialists, policies)
- **Floating WhatsApp + Call + Back-to-Top** buttons
- **Scroll progress bar**
- **Dark / light mode** toggle (next-themes)
- **Sticky header** that compacts on scroll
- **Mobile drawer navigation**

### Hidden admin dashboard
- **5-tap on the logo** (any logo — header, mobile drawer, or footer) opens an admin PIN login modal
- After correct PIN, a full-screen **admin dashboard** opens with 4 tabs:
  - **Overview** — stat cards (bookings, pending, messages, subscribers), 14-day activity trend chart, top-requested services bar chart
  - **Bookings** — searchable, filterable list with confirm / complete / cancel / delete actions
  - **Messages** — searchable list of contact form submissions with delete
  - **Subscribers** — newsletter list with CSV export and delete
- **Logout** clears the session cookie
- Default PIN: `juiced2026` — change via `ADMIN_PIN` env var

### SEO & performance
- `BeautySalon` schema.org JSON-LD structured data
- Open Graph, Twitter cards, robots meta
- Comprehensive keyword metadata
- Semantic HTML, alt text on all images
- Core Web Vitals-friendly: lazy-loaded images, Framer Motion GPU-accelerated animations
- Mobile-first responsive design (320px → 2560px)

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (New York) + Lucide icons |
| Animation | Framer Motion 12 |
| Forms | React Hook Form + Zod |
| State | React Context + TanStack Query |
| Database | Prisma ORM + SQLite |
| AI | z-ai-web-dev-sdk (LLM chat completions) |
| Notifications | Sonner |
| Theme | next-themes |

---

## 📦 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── bookings/route.ts          # Public booking creation
│   │   ├── contact/route.ts           # Public contact form
│   │   ├── newsletter/route.ts        # Public newsletter signup
│   │   ├── chat/route.ts              # AI Beauty Concierge (z-ai-web-dev-sdk)
│   │   └── admin/                     # Protected admin endpoints
│   │       ├── login/                 # POST PIN → set cookie
│   │       ├── logout/                # POST → clear cookie
│   │       ├── stats/                 # GET dashboard stats
│   │       ├── bookings/              # GET list / PATCH [id] / DELETE [id]
│   │       ├── messages/              # GET list / DELETE [id]
│   │       └── subscribers/           # GET list / DELETE [id]
│   ├── globals.css                    # Luxury design system
│   ├── layout.tsx                     # Root layout + SEO metadata
│   └── page.tsx                       # Single-page site
├── components/
│   ├── site/
│   │   ├── admin/                     # Admin dashboard
│   │   │   ├── admin-context.tsx
│   │   │   ├── admin-dashboard.tsx
│   │   │   ├── admin-login-modal.tsx
│   │   │   ├── tap-aware-logo.tsx     # 5-tap detector
│   │   │   ├── use-fetch.ts
│   │   │   └── panels/
│   │   │       ├── bookings-panel.tsx
│   │   │       ├── messages-panel.tsx
│   │   │       ├── subscribers-panel.tsx
│   │   │       └── stats-panel.tsx
│   │   ├── sections/                  # Hero, About, Services, Specialists,
│   │   │                             # Portfolio, Reviews, CtaBanner, Blog,
│   │   │                             # Faq, Contact, Footer
│   │   ├── ai-assistant.tsx           # Aisha chatbot
│   │   ├── booking-context.tsx
│   │   ├── booking-modal.tsx          # 5-step booking flow
│   │   ├── floating-actions.tsx       # WhatsApp / Call / Back-to-top
│   │   ├── header.tsx
│   │   ├── logo.tsx                   # Custom SVG monogram
│   │   ├── scroll-progress.tsx
│   │   └── theme-provider.tsx
│   └── ui/                            # shadcn/ui primitives
├── lib/
│   ├── admin.ts                       # Cookie session + PIN verification
│   ├── data.ts                        # All salon data (services, specialists, etc.)
│   ├── db.ts                          # Prisma client singleton
│   └── utils.ts
└── prisma/
    └── schema.prisma                  # Booking, ContactMessage, NewsletterSubscriber
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 20+
- Bun (recommended) or npm
- SQLite (bundled — no separate install needed)

### Setup

```bash
# 1. Install dependencies
bun install        # or npm install

# 2. Copy env vars
cp .env.example .env

# 3. (Optional) Change the admin PIN
# Edit ADMIN_PIN in .env

# 4. Push database schema
bun run db:push     # or npx prisma db push

# 5. Start dev server
bun run dev         # or npm run dev
```

Visit http://localhost:3000.

### Accessing the admin dashboard
1. Tap the logo (top-left of header, or in the footer) **5 times within 2.5 seconds**
2. Enter the admin PIN (default: `juiced2026`)
3. The admin dashboard opens with Overview, Bookings, Messages, and Subscribers tabs

---

## 🔒 Production Deployment

### Vercel (recommended)

1. Push this repo to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in the Vercel project settings:
   - `DATABASE_URL` — set to a persistent SQLite path or migrate to PostgreSQL
   - `ADMIN_PIN` — set a strong, unique PIN
   - `ADMIN_COOKIE_SECRET` — set a long random string (use `openssl rand -hex 32`)
4. Deploy

### Environment variables checklist
| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Prisma datasource — SQLite file path or Postgres URL |
| `ADMIN_PIN` | ✅ | PIN for admin dashboard access |
| `ADMIN_COOKIE_SECRET` | ✅ | Secret for signing admin session cookies |

### Post-deploy checklist
- [ ] Change `ADMIN_PIN` from default
- [ ] Change `ADMIN_COOKIE_SECRET` from default
- [ ] Replace Unsplash image URLs in `src/lib/data.ts` with the salon's actual photography (Cloudinary recommended)
- [ ] Verify Google Map embed points to the actual salon location
- [ ] Update `metadataBase` in `src/app/layout.tsx` with the production domain
- [ ] Submit `sitemap.xml` and `robots.txt` to Google Search Console
- [ ] Set up Google Analytics 4

---

## 📞 Business Information

| | |
|---|---|
| **Business** | Juiced Beautician Beauty Salon Nairobi |
| **Address** | Travel House, Kenyatta Avenue, Nairobi CBD, Kenya |
| **Phone / WhatsApp** | +254 759 558872 |
| **Hours** | Open 24 hours · 7 days a week |
| **Google Rating** | 5.0 ★ (39+ reviews) |

---

## 📄 License

Proprietary — © Juiced Beautician. All rights reserved.

Built with care for Nairobi's most discerning beauty clients.
