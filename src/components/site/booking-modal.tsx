'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ChevronLeft, ChevronRight, Calendar, Clock, User, Sparkles, CheckCircle2 } from 'lucide-react'
import { services, specialists, business, type Service } from '@/lib/data'
import { useBooking } from '@/components/site/booking-context'
import { cn, formatKsh, openWhatsApp } from '@/lib/utils'
import { toast } from 'sonner'

type Step = 'service' | 'specialist' | 'datetime' | 'details' | 'confirm'

const STEPS: { id: Step; label: string }[] = [
  { id: 'service', label: 'Service' },
  { id: 'specialist', label: 'Artist' },
  { id: 'datetime', label: 'Date & Time' },
  { id: 'details', label: 'Your Details' },
  { id: 'confirm', label: 'Confirm' },
]

const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']

export function BookingModal() {
  const { isOpen, close, preselectedService } = useBooking()

  const [step, setStep] = React.useState<Step>('service')
  const [serviceId, setServiceId] = React.useState<string | null>(null)
  const [specialistId, setSpecialistId] = React.useState<string | null>(null)
  const [date, setDate] = React.useState<string>('')
  const [time, setTime] = React.useState<string>('')
  const [details, setDetails] = React.useState({ name: '', phone: '', email: '', notes: '' })
  const [submitting, setSubmitting] = React.useState(false)
  const [confirmed, setConfirmed] = React.useState(false)

  // Reset when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setStep(preselectedService ? 'specialist' : 'service')
      setServiceId(preselectedService?.id ?? null)
      setSpecialistId(null)
      setDate('')
      setTime('')
      setDetails({ name: '', phone: '', email: '', notes: '' })
      setConfirmed(false)
    }
  }, [isOpen, preselectedService])

  const service = services.find((s) => s.id === serviceId)
  const specialist = specialists.find((s) => s.id === specialistId)
  const stepIndex = STEPS.findIndex((s) => s.id === step)

  const canNext = () => {
    if (step === 'service') return !!serviceId
    if (step === 'specialist') return !!specialistId
    if (step === 'datetime') return !!date && !!time
    if (step === 'details') return !!details.name && !!details.phone && !!details.email
    return true
  }

  const next = () => {
    if (!canNext()) {
      toast.error('Please complete this step first.')
      return
    }
    const i = STEPS.findIndex((s) => s.id === step)
    if (i < STEPS.length - 1) setStep(STEPS[i + 1].id)
  }

  const prev = () => {
    const i = STEPS.findIndex((s) => s.id === step)
    if (i > 0) setStep(STEPS[i - 1].id)
  }

  const submit = async () => {
    if (!service || !specialist || !date || !time) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: service.name,
          specialist: specialist.name,
          date,
          time,
          name: details.name,
          phone: details.phone,
          email: details.email,
          notes: details.notes,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setConfirmed(true)
      toast.success('Booking received! Confirmation email is on its way.')
    } catch (err) {
      toast.error('Could not submit booking. Please call us.')
    } finally {
      setSubmitting(false)
    }
  }

  const today = new Date()
  const minDate = today.toISOString().split('T')[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6" style={{ backgroundColor: 'rgba(26, 20, 19, 0.85)' }}
          onClick={close}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="relative bg-background w-full sm:max-w-3xl max-h-[95svh] sm:max-h-[90svh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border bg-cream/50">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-rosegold font-sans-lux flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" /> Book Appointment
                </div>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-foreground mt-0.5">
                  {confirmed ? 'You\'re booked!' : 'Reserve your moment'}
                </h2>
              </div>
              <button
                onClick={close}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-cream transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Stepper */}
            {!confirmed && (
              <div className="px-5 sm:px-6 py-4 border-b border-border bg-background">
                <div className="flex items-center justify-between gap-1">
                  {STEPS.map((s, i) => (
                    <React.Fragment key={s.id}>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={cn(
                          'h-8 w-8 rounded-full flex items-center justify-center text-xs font-sans-lux transition-all duration-300',
                          i < stepIndex && 'bg-rosegold text-white',
                          i === stepIndex && 'bg-charcoal text-ivory ring-4 ring-rosegold/20',
                          i > stepIndex && 'bg-cream text-muted-foreground'
                        )}>
                          {i < stepIndex ? <Check className="h-4 w-4" /> : i + 1}
                        </div>
                        <span className={cn(
                          'text-[9px] uppercase tracking-[0.18em] font-sans-lux hidden sm:block',
                          i === stepIndex ? 'text-foreground' : 'text-muted-foreground'
                        )}>{s.label}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={cn(
                          'flex-1 h-px mx-1 transition-colors duration-300',
                          i < stepIndex ? 'bg-rosegold' : 'bg-border'
                        )} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {confirmed ? (
                <ConfirmationView
                  service={service!}
                  specialist={specialist!}
                  date={date}
                  time={time}
                  details={details}
                  onClose={close}
                />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step === 'service' && (
                      <ServiceStep selected={serviceId} onSelect={setServiceId} />
                    )}
                    {step === 'specialist' && (
                      <SpecialistStep selected={specialistId} onSelect={setSpecialistId} />
                    )}
                    {step === 'datetime' && (
                      <DateTimeStep
                        date={date}
                        time={time}
                        onDate={setDate}
                        onTime={setTime}
                        minDate={minDate}
                      />
                    )}
                    {step === 'details' && (
                      <DetailsStep details={details} onChange={setDetails} />
                    )}
                    {step === 'confirm' && (
                      <ConfirmStep
                        service={service!}
                        specialist={specialist!}
                        date={date}
                        time={time}
                        details={details}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {!confirmed && (
              <div className="p-5 sm:p-6 border-t border-border bg-cream/30 flex items-center justify-between gap-3">
                <div className="flex-1 text-xs text-muted-foreground font-sans-lux">
                  {service && (
                    <span className="hidden sm:inline">
                      {service.name} · <strong className="text-foreground">{formatKsh(service.startingPrice)}</strong>
                    </span>
                  )}
                </div>
                {stepIndex > 0 && (
                  <button
                    onClick={prev}
                    className="px-5 py-3 rounded-full border border-border text-xs uppercase tracking-[0.18em] font-sans-lux hover:bg-cream transition-colors inline-flex items-center gap-1.5"
                  >
                    <ChevronLeft className="h-3 w-3" /> Back
                  </button>
                )}
                {step === 'confirm' ? (
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="btn-luxury-primary px-7 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-sans-lux inline-flex items-center gap-1.5 disabled:opacity-60"
                  >
                    {submitting ? 'Confirming...' : <>Confirm Booking <CheckCircle2 className="h-3.5 w-3.5" /></>}
                  </button>
                ) : (
                  <button
                    onClick={next}
                    disabled={!canNext()}
                    className="btn-luxury-primary px-7 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-sans-lux inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Steps ---------- */

function ServiceStep({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <StepHeader title="Choose your service" subtitle="Browse our menu of beauty rituals. Pick the one that calls to you." />
      <div className="grid sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              'text-left p-4 rounded-xl border transition-all duration-300',
              selected === s.id ? 'border-rosegold bg-blush-soft shadow-lg' : 'border-border bg-background hover:border-rosegold/60'
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-rosegold font-sans-lux">{s.category}</div>
                <h3 className="font-serif-display text-base text-foreground mt-0.5">{s.name}</h3>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-sans-lux text-foreground font-medium">{formatKsh(s.startingPrice)}</div>
                <div className="text-[10px] text-muted-foreground font-sans-lux flex items-center gap-1 justify-end mt-0.5">
                  <Clock className="h-2.5 w-2.5" />{s.duration}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function SpecialistStep({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <StepHeader title="Choose your artist" subtitle="All our artists are masters of their craft. Pick the one whose style resonates." />
      <div className="grid sm:grid-cols-2 gap-3">
        {specialists.map((sp) => (
          <button
            key={sp.id}
            onClick={() => onSelect(sp.id)}
            className={cn(
              'flex gap-3 p-3 rounded-xl border text-left transition-all duration-300',
              selected === sp.id ? 'border-rosegold bg-blush-soft shadow-lg' : 'border-border bg-background hover:border-rosegold/60'
            )}
          >
            <img src={sp.image} alt={sp.name} className="h-16 w-16 rounded-lg object-cover shrink-0" />
            <div className="min-w-0">
              <h3 className="font-serif-display text-base text-foreground leading-tight">{sp.name}</h3>
              <div className="text-[11px] text-rosegold font-sans-lux">{sp.role}</div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {sp.specialties.slice(0, 2).map((s) => (
                  <span key={s} className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground font-sans-lux px-1.5 py-0.5 rounded-full bg-cream">{s}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function DateTimeStep({ date, time, onDate, onTime, minDate }: {
  date: string; time: string; onDate: (v: string) => void; onTime: (v: string) => void; minDate: string
}) {
  return (
    <div>
      <StepHeader title="Pick your date & time" subtitle="We're open 24 hours. Choose any slot — late-night and early-morning welcome." />
      <div className="space-y-5">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux mb-2 flex items-center gap-1.5">
            <Calendar className="h-3 w-3" /> Date
          </label>
          <input
            type="date"
            value={date}
            min={minDate}
            onChange={(e) => onDate(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-rosegold transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux mb-2 flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> Available times
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {TIMES.map((t) => (
              <button
                key={t}
                onClick={() => onTime(t)}
                className={cn(
                  'py-2.5 rounded-lg text-xs font-sans-lux transition-all duration-300 border',
                  time === t ? 'bg-charcoal text-ivory border-charcoal' : 'bg-background border-border hover:border-rosegold'
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground font-sans-lux mt-3">
            * Times between 9pm–7am incur a 25% after-hours surcharge.
          </p>
        </div>
      </div>
    </div>
  )
}

function DetailsStep({ details, onChange }: {
  details: { name: string; phone: string; email: string; notes: string }
  onChange: (v: { name: string; phone: string; email: string; notes: string }) => void
}) {
  return (
    <div>
      <StepHeader title="Your details" subtitle="So we can confirm your appointment and send a reminder." />
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Full name *" value={details.name} onChange={(v) => onChange({ ...details, name: v })} placeholder="Jane Wanjiru" />
          <Input label="Phone *" value={details.phone} onChange={(v) => onChange({ ...details, phone: v })} placeholder="+254 7XX XXX XXX" />
        </div>
        <Input label="Email *" value={details.email} onChange={(v) => onChange({ ...details, email: v })} placeholder="you@example.com" type="email" />
        <div>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux mb-2">Notes (optional)</label>
          <textarea
            rows={4}
            value={details.notes}
            onChange={(e) => onChange({ ...details, notes: e.target.value })}
            placeholder="Allergies, inspiration photos, special requests..."
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-rosegold transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  )
}

function ConfirmStep({ service, specialist, date, time, details }: {
  service: Service; specialist: typeof specialists[number]; date: string; time: string; details: { name: string; phone: string; email: string; notes: string }
}) {
  return (
    <div>
      <StepHeader title="Review your booking" subtitle="Please confirm everything looks correct." />
      <div className="bg-cream rounded-2xl p-5 space-y-3">
        <Row label="Service" value={service.name} />
        <Row label="Price from" value={formatKsh(service.startingPrice)} />
        <Row label="Duration" value={service.duration} />
        <Row label="Artist" value={specialist.name} />
        <Row label="Date" value={new Date(date + 'T00:00').toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
        <Row label="Time" value={time} />
        <div className="pt-3 border-t border-border" />
        <Row label="Name" value={details.name} />
        <Row label="Phone" value={details.phone} />
        <Row label="Email" value={details.email} />
        {details.notes && <Row label="Notes" value={details.notes} />}
      </div>
      <p className="text-[10px] text-muted-foreground font-sans-lux mt-4 leading-relaxed">
        By confirming, you agree to our 24-hour cancellation policy. A confirmation email will be sent to {details.email}. Our team will reach out within 2 hours to finalise.
      </p>
    </div>
  )
}

function ConfirmationView({ service, specialist, date, time, details, onClose }: {
  service: Service; specialist: typeof specialists[number]; date: string; time: string; details: { name: string; phone: string; email: string; notes: string }; onClose: () => void
}) {
  const whatsappMsg = `Hello Juiced Beautician, I just booked online:\n\nService: ${service.name}\nArtist: ${specialist.name}\nDate: ${date} at ${time}\nName: ${details.name}\nPhone: ${details.phone}`
  return (
    <div className="text-center py-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="mx-auto h-20 w-20 rounded-full bg-rosegold/15 flex items-center justify-center mb-5"
      >
        <CheckCircle2 className="h-10 w-10 text-rosegold" />
      </motion.div>
      <h3 className="font-serif-display text-3xl text-foreground mb-2">Booking received</h3>
      <p className="text-sm text-muted-foreground font-light max-w-md mx-auto">
        Thank you, {details.name.split(' ')[0]}. We've received your booking for <strong className="text-foreground">{service.name}</strong> with <strong className="text-foreground">{specialist.name}</strong> on <strong className="text-foreground">{new Date(date + 'T00:00').toLocaleDateString('en-KE', { weekday: 'long', month: 'long', day: 'numeric' })}</strong> at <strong className="text-foreground">{time}</strong>.
      </p>
      <p className="text-xs text-muted-foreground font-sans-lux mt-3">
        A confirmation email is on its way to {details.email}. Our team will reach out within 2 hours.
      </p>

      <div className="mt-7 flex flex-col sm:flex-row gap-2 justify-center">
        <button
          onClick={() => openWhatsApp(whatsappMsg)}
          className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-[0.18em] font-sans-lux inline-flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-colors"
        >
          Send to WhatsApp
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-full border border-border text-xs uppercase tracking-[0.18em] font-sans-lux inline-flex items-center justify-center gap-2 hover:bg-cream transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  )
}

/* ---------- helpers ---------- */

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-serif-display text-2xl text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground font-light mt-1">{subtitle}</p>
    </div>
  )
}

function Input({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-rosegold transition-colors"
      />
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux pt-0.5">{label}</span>
      <span className="text-foreground font-sans-lux text-right max-w-[60%]">{value}</span>
    </div>
  )
}
