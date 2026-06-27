'use client'

import * as React from 'react'
import { Logo } from '@/components/site/logo'
import { useAdmin } from '@/components/site/admin/admin-context'

/**
 * Wraps the Logo with a 5-tap secret trigger.
 * 5 taps within 2.5 seconds opens the admin login modal (or dashboard if already authed).
 * Single tap = navigate home (and close drawer if applicable).
 *
 * Strategy: count taps. If the gap between taps is small (<600ms) it counts toward the
 * secret. The first tap of a fresh sequence still triggers normal navigation.
 */
export function TapAwareLogo({
  onNavigate,
  onClose,
  tone = 'auto',
}: {
  onNavigate?: () => void
  onClose?: () => void
  tone?: 'auto' | 'light'
}) {
  const { openLogin, isAuthed, openDashboard } = useAdmin()
  const tapCountRef = React.useRef(0)
  const lastTapRef = React.useRef<number>(0)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleTap = () => {
    const now = Date.now()
    const gap = now - lastTapRef.current
    lastTapRef.current = now

    // First tap of a fresh sequence → behave like normal nav
    if (gap > 600 || tapCountRef.current === 0) {
      tapCountRef.current = 1
      if (onNavigate) onNavigate()
    } else {
      tapCountRef.current += 1
    }

    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0
      // Secret unlocked
      if (onClose) onClose()
      if (isAuthed) openDashboard()
      else openLogin()
      return
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      tapCountRef.current = 0
    }, 2500)
  }

  return (
    <button
      type="button"
      onClick={handleTap}
      aria-label="Juiced Beautician home"
      className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rosegold/50 rounded-md"
    >
      <Logo tone={tone} />
    </button>
  )
}
