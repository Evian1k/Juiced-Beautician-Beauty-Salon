import * as React from 'react'

interface LogoProps {
  className?: string
  variant?: 'full' | 'mark' | 'stacked'
  showText?: boolean
  /** Text color tone — 'auto' uses foreground (for light backgrounds), 'light' forces ivory text (for dark backgrounds like the footer) */
  tone?: 'auto' | 'light'
}

/**
 * Juiced Beautician — custom luxury monogram logo.
 * The mark blends a stylised "JB" initial inside a rose-gold gem frame,
 * crowned by a single drop representing the "juiced" essence of beauty.
 */
export function Logo({ className = '', variant = 'full', showText = true, tone = 'auto' }: LogoProps) {
  if (variant === 'mark' || !showText) {
    return <LogoMark className={className} />
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-1 ${className}`}>
        <LogoMark className="h-12 w-12" />
        <LogoText stacked tone={tone} />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <LogoText tone={tone} />
    </div>
  )
}

function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Juiced Beautician monogram"
    >
      <defs>
        <linearGradient id="jb-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6C66A" />
          <stop offset="50%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#A38317" />
        </linearGradient>
        <linearGradient id="jb-rose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D99BA5" />
          <stop offset="50%" stopColor="#B76E79" />
          <stop offset="100%" stopColor="#9A5661" />
        </linearGradient>
        <linearGradient id="jb-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF7F2" />
          <stop offset="100%" stopColor="#F4D9DE" />
        </linearGradient>
      </defs>

      {/* Outer gem frame */}
      <path
        d="M32 2 L58 14 L58 38 C58 52 46 60 32 62 C18 60 6 52 6 38 L6 14 Z"
        fill="url(#jb-fill)"
        stroke="url(#jb-gold)"
        strokeWidth="1.6"
      />

      {/* Inner accent line */}
      <path
        d="M32 6 L54 16 L54 38 C54 49 44 56 32 58 C20 56 10 49 10 38 L10 16 Z"
        fill="none"
        stroke="url(#jb-rose)"
        strokeWidth="0.6"
        opacity="0.6"
      />

      {/* Drop crown */}
      <path
        d="M32 10 C30 14 27 17 27 20 C27 22.5 29 24.5 32 24.5 C35 24.5 37 22.5 37 20 C37 17 34 14 32 10 Z"
        fill="url(#jb-rose)"
      />
      <ellipse cx="33.5" cy="18.5" rx="1.2" ry="2" fill="#FFFFFF" opacity="0.6" />

      {/* Stylised J */}
      <path
        d="M28 30 L28 44 C28 48 25 50 22 48.5"
        stroke="url(#jb-rose)"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Stylised B */}
      <path
        d="M34 30 L34 50 M34 30 L42 30 C45 30 46 32 46 34 C46 36 45 38 42 38 L34 38 M34 38 L42 38 C45 38 47 40 47 42 C47 44 45 46 42 46 L34 46"
        stroke="url(#jb-gold)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Base sparkle */}
      <circle cx="32" cy="55" r="1.2" fill="url(#jb-gold)" />
    </svg>
  )
}

function LogoText({ stacked = false, tone = 'auto' }: { stacked?: boolean; tone?: 'auto' | 'light' }) {
  const titleColor = tone === 'light' ? 'text-white' : 'text-foreground'
  return (
    <div className={stacked ? 'flex flex-col items-center leading-none' : 'flex flex-col leading-none'}>
      <span className={`font-serif-display text-[1.05rem] tracking-[0.18em] uppercase ${titleColor}`}>
        Juiced
      </span>
      <span className="font-serif-soft text-[0.78rem] tracking-[0.32em] uppercase text-rosegold -mt-0.5">
        Beautician
      </span>
    </div>
  )
}
