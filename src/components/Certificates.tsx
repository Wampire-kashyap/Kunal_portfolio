'use client'
import { useState } from 'react'
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
  const selectedImageUrl = imageUrl(selected?.image)

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
                  className="glass-card"
                  style={{ padding: '1.5rem', cursor: 'pointer' }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelected(cert)}
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

                  {/* Credential link removed as it is not in the type anymore */}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
              zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem', backdropFilter: 'blur(8px)',
            }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card"
              style={{ maxWidth: 480, width: '100%', padding: '2rem' }}
              onClick={e => e.stopPropagation()}
            >
              {selectedImageUrl && (
                <div style={{ position: 'relative', width: '100%', height: 240, borderRadius: 10, overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Image
                    src={selectedImageUrl}
                    alt={selected.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 480px"
                    style={{ objectFit: 'contain', background: 'rgba(2,5,16,0.7)' }}
                  />
                </div>
              )}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '0.5rem' }}>{selected.title}</h3>
              {selected.issuer && <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>{selected.issuer}</p>}
              {selected.date && (
                <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1.5rem' }}>
                  Issued: {new Date(selected.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              )}
              {/* Modal Credential link removed */}
              <button onClick={() => setSelected(null)} style={{
                marginLeft: '1rem', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.85rem'
              }}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
