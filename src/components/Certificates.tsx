'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SectionReveal from './SectionReveal'
import { imageUrl } from '@/lib/sanity'
import type { Certificate } from '@/types'

const FALLBACK: Certificate[] = [
  {
    _id: 'c1',
    title: 'Google Data Analytics Professional',
    issuer: 'Google / Coursera',
    date: '2024-03',
    category: 'Data Analytics',
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'c2',
    title: 'Microsoft Power BI Data Analyst',
    issuer: 'Microsoft',
    date: '2024-01',
    category: 'BI & Visualization',
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'c3',
    title: 'IBM Data Science Professional',
    issuer: 'IBM / Coursera',
    date: '2023-11',
    category: 'Data Science',
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'c4',
    title: 'Python for Data Science & ML',
    issuer: 'Udemy',
    date: '2023-08',
    category: 'Python',
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'c5',
    title: 'SQL for Data Analysis',
    issuer: 'Mode Analytics',
    date: '2023-06',
    category: 'SQL',
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'c6',
    title: 'Tableau Desktop Specialist',
    issuer: 'Tableau',
    date: '2023-04',
    category: 'BI & Visualization',
    image: { asset: { url: '/placeholder.png' } }
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Data Analytics': '#00f5ff',
  'BI & Visualization': '#a855f7',
  'Data Science': '#3b82f6',
  'Python': '#10b981',
  'SQL': '#f59e0b',
  'Machine Learning': '#ef4444',
}

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
  const data = certificates && certificates.length > 0 ? certificates : FALLBACK
  const [selected, setSelected] = useState<Certificate | null>(null)
  const [isModalImageLoaded, setIsModalImageLoaded] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const overlayPointerStartedRef = useRef(false)
  const selectedImageUrl = imageUrl(selected?.image)

  const openCertificate = (certificate: Certificate) => {
    setIsModalImageLoaded(false)
    setSelected(certificate)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    if (!selected) return

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null)
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return
      }

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      if (!firstFocusable || !lastFocusable) {
        event.preventDefault()
        modalRef.current.focus()
        return
      }

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 0)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      previousFocusRef.current?.focus()
    }
  }, [selected])

  return (
    <section id="certificates" className="section-wrapper grid-bg">
      <div className="container-pad">
        <SectionReveal>
          <p style={{ color: '#a855f7', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Credentials
          </p>
          <h2 className="section-title neon-text">Certificates</h2>
          <p className="section-subtitle">Verified expertise, continuously growing</p>
        </SectionReveal>

        <div className="cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {data.map((cert, i) => {
            const color = CATEGORY_COLORS[cert.category || ''] || '#00f5ff'
            const certificateImageUrl = imageUrl(cert.image)
            return (
              <SectionReveal key={cert._id} delay={i * 0.07}>
                <motion.div
                  className="glass-card focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  style={{ padding: '1.5rem', cursor: 'pointer' }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openCertificate(cert)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      openCertificate(cert)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  data-hover
                >
                  {/* Top bar accent */}
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: 2, marginBottom: '1.25rem' }} />

                  {/* Icon placeholder or image */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: `${color}18`,
                      border: `1px solid ${color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      {certificateImageUrl ? (
                        <Image
                          src={certificateImageUrl}
                          alt={cert.title}
                          fill
                          sizes="44px"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
                          <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                        </svg>
                      )}
                    </div>
                    {cert.date && (
                      <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 500 }}>
                        {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                    {cert.title}
                  </h3>
                  {cert.issuer && (
                    <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.9rem' }}>
                      {cert.issuer}
                    </p>
                  )}

                  {cert.category && (
                    <span style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.7rem',
                      background: `${color}12`,
                      border: `1px solid ${color}30`,
                      borderRadius: 100,
                      fontSize: '0.7rem',
                      color,
                      fontWeight: 600,
                    }}>
                      {cert.category}
                    </span>
                  )}

                  {(cert?.skills?.length ?? 0) > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.85rem' }}>
                      {cert.skills?.map((skill, skillIndex) => (
                        <span
                          key={`${cert._id}-${skill}-${skillIndex}`}
                          className="tech-badge"
                          style={{ fontSize: '0.68rem', padding: '0.18rem 0.55rem' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </SectionReveal>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden bg-black/85 p-3 backdrop-blur-md sm:p-6"
            onPointerDown={event => {
              overlayPointerStartedRef.current = event.target === event.currentTarget
            }}
            onPointerUp={event => {
              if (overlayPointerStartedRef.current && event.target === event.currentTarget) {
                setSelected(null)
              }
              overlayPointerStartedRef.current = false
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              initial={prefersReducedMotion ? false : { scale: 0.94, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.94, opacity: 0, y: 14 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: 'easeOut' }}
              className="glass-card relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl mx-auto flex-col overflow-y-auto p-4 outline-none sm:max-h-[calc(100dvh-3rem)] sm:p-6"
              onClick={e => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-400 transition hover:border-white/20 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                aria-label="Close certificate preview"
              >
                ×
              </button>

              {selectedImageUrl ? (
                <div className="relative mx-auto mb-6 w-full max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-slate-950/70">
                  {!isModalImageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-slate-900/80" aria-hidden="true" />
                  )}
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={selectedImageUrl}
                      alt={selected?.title ?? 'Certificate image'}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 672px"
                      className={`object-contain transition-opacity duration-200 ${isModalImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      loading="eager"
                      onLoadingComplete={() => setIsModalImageLoaded(true)}
                      priority
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-6 flex min-h-48 items-center justify-center rounded-lg border border-white/10 bg-slate-950/70 text-sm text-slate-500">
                  Certificate image unavailable
                </div>
              )}

              <div className="pr-10">
                <h3 id="certificate-modal-title" className="mb-2 text-lg font-extrabold text-slate-200 sm:text-xl">{selected?.title}</h3>
                {selected?.issuer && <p className="mb-2 text-sm text-slate-500">{selected.issuer}</p>}
              </div>

              {selected?.date && (
                <p className="mb-4 text-xs text-slate-600">
                  Issued: {new Date(selected.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              )}

              {(selected?.skills?.length ?? 0) > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {selected.skills?.map((skill, skillIndex) => (
                    <span
                      key={`${selected._id}-${skill}-${skillIndex}`}
                      className="tech-badge"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-end gap-4">
                {selected?.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
                  >
                    View Certificate →
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-sm text-slate-500 transition hover:text-slate-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
