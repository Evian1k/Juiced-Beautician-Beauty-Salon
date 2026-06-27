import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/site/theme-provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juicedbeautician.co.ke"),
  title: {
    default: "Juiced Beautician | Luxury Beauty Salon Nairobi",
    template: "%s | Juiced Beautician",
  },
  description:
    "Juiced Beautician is Nairobi's premier luxury beauty salon located at Travel House, Kenyatta Avenue. Specializing in professional makeup, lash extensions, brow styling, nails, facials, and bridal beauty. Rated 5.0 on Google with 39+ reviews. Open 24 hours.",
  keywords: [
    "beauty salon Nairobi",
    "luxury salon Nairobi",
    "makeup artist Nairobi",
    "eyelash extensions Kenya",
    "bridal makeup Nairobi",
    "acrylic nails Nairobi",
    "facials Nairobi CBD",
    "eyebrow threading",
    "henna brows",
    "lash bar Nairobi",
    "Kenyatta Avenue salon",
    "Juiced Beautician",
  ],
  authors: [{ name: "Juiced Beautician" }],
  creator: "Juiced Beautician",
  publisher: "Juiced Beautician",
  alternates: {
    canonical: "https://juicedbeautician.co.ke",
  },
  openGraph: {
    title: "Juiced Beautician | Luxury Beauty Salon Nairobi",
    description:
      "Nairobi's premier luxury beauty salon. Professional makeup, lashes, brows, nails & facials. Rated 5.0 ★ on Google. Open 24 hours at Travel House, Kenyatta Avenue.",
    url: "https://juicedbeautician.co.ke",
    siteName: "Juiced Beautician",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juiced Beautician | Luxury Beauty Salon Nairobi",
    description:
      "Nairobi's premier luxury beauty salon. Makeup, lashes, brows, nails & facials. 5.0 ★ on Google. Open 24 hours.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "beauty",
};

const ld = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Juiced Beautician Beauty Salon Nairobi",
  image: "https://juicedbeautician.co.ke/og.jpg",
  "@id": "https://juicedbeautician.co.ke",
  url: "https://juicedbeautician.co.ke",
  telephone: "+254759558872",
  priceRange: "KSh KSh 1500 - KSh 25000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Travel House, Kenyatta Avenue",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2841,
    longitude: 36.8225,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "39",
  },
  sameAs: [
    "https://instagram.com/juicedbeautician",
    "https://facebook.com/juicedbeautician",
    "https://tiktok.com/@juicedbeautician",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${jost.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
