'use client'

import { BookingProvider } from '@/components/site/booking-context'
import { Header } from '@/components/site/header'
import { Hero } from '@/components/site/sections/hero'
import { About } from '@/components/site/sections/about'
import { Services } from '@/components/site/sections/services'
import { Specialists } from '@/components/site/sections/specialists'
import { Portfolio } from '@/components/site/sections/portfolio'
import { Reviews } from '@/components/site/sections/reviews'
import { Blog } from '@/components/site/sections/blog'
import { Faq } from '@/components/site/sections/faq'
import { Contact } from '@/components/site/sections/contact'
import { CtaBanner } from '@/components/site/sections/cta-banner'
import { Footer } from '@/components/site/sections/footer'
import { BookingModal } from '@/components/site/booking-modal'
import { FloatingActions } from '@/components/site/floating-actions'
import { AiAssistant } from '@/components/site/ai-assistant'

export default function Home() {
  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Services />
          <Specialists />
          <Portfolio />
          <Reviews />
          <CtaBanner />
          <Blog />
          <Faq />
          <Contact />
        </main>
        <Footer />

        {/* Floating overlays */}
        <BookingModal />
        <FloatingActions />
        <AiAssistant />
      </div>
    </BookingProvider>
  )
}
