'use client'

import * as React from 'react'
import { services, type Service } from '@/lib/data'

type BookingState = {
  isOpen: boolean
  preselectedService: Service | null
  open: (service?: Service) => void
  close: () => void
}

const BookingContext = React.createContext<BookingState | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [preselectedService, setPreselectedService] = React.useState<Service | null>(null)

  const open = React.useCallback((service?: Service) => {
    setPreselectedService(service ?? null)
    setIsOpen(true)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }, [])

  const close = React.useCallback(() => {
    setIsOpen(false)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }, [])

  React.useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
  }, [])

  return (
    <BookingContext.Provider value={{ isOpen, preselectedService, open, close }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = React.useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}

// Helper for non-React areas
export function useBookingService(serviceId?: string): Service | undefined {
  return React.useMemo(() => {
    if (!serviceId) return undefined
    return services.find((s) => s.id === serviceId)
  }, [serviceId])
}
