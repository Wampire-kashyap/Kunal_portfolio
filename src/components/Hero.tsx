'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const HERO_TITLE = "Turning Data into Decisions"
const HERO_SUBTITLE = "I build analytics systems that transform raw data into clear, actionable insights."
const HERO_TAGS = ["Python", "SQL", "Excel", "Power BI"]
const ONE_LINER = "Focused on solving real business problems using data."

const TITLES = [
  HERO_TITLE,
  HERO_TAGS.join(' • '),
  ONE_LINER
]

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = TITLES[titleIdx]
    let i = typing ? displayed.length : displayed.length
    let timeout: ReturnType<typeof setTimeout>

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setTitleIdx((titleIdx + 1) % TITLES.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, titleIdx])

  const stats = [
    { value: '10+', label: 'Projects' },
    { value: '1+', label: 'Years Exp.' },
    { value: '10+', label: 'Certificates' },
    { value: '95%', label: 'Accuracy' },
  ]

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '6rem 1.5rem 4rem',
      }}
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.4rem 1.2rem',
          background: 'rgba(0,245,255,0.06)',
          border: '1px solid rgba(0,245,255,0.2)',
          borderRadius: 100,
          marginBottom: '2rem',
          fontSize: '0.8rem',
          color: '#00f5ff',
          fontWeight: 500,
        }}
      >
        <span style={{ width: 7, height: 7, background: '#00f5ff', borderRadius: '50%', boxShadow: '0 0 8px #00f5ff' }} />
        Available for opportunities
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          marginBottom: '0.5rem',
          color: '#e2e8f0',
        }}
      >
        Kunal{' '}
        <span style={{
          background: 'linear-gradient(135deg,#00f5ff 0%,#a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Kashyap
        </span>
      </motion.h1>

      {/* Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{
          fontSize: 'clamp(1.25rem, 3vw, 2rem)',
          fontWeight: 600,
          color: '#64748b',
          marginBottom: '1.5rem',
          minHeight: '2.5rem',
        }}
      >
        <span style={{ color: '#00f5ff' }}>{displayed}</span>
        <span style={{
          display: 'inline-block', width: 2, height: '1em',
          background: '#00f5ff', marginLeft: 3,
          animation: 'pulse-glow 0.8s ease-in-out infinite',
          verticalAlign: 'text-bottom',
        }} />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        style={{
          maxWidth: 560,
          color: 'rgba(226,232,240,0.55)',
          fontSize: '1.05rem',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}
      >
        {HERO_SUBTITLE}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#projects" className="btn-glow" data-hover style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            View My Work
          </a>
          <a href="#contact" data-hover style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none',
            padding: '0.8rem 1.8rem', borderRadius: 50, border: '1px solid rgba(0, 245, 255, 0.3)',
            color: '#e2e8f0', fontWeight: 600, fontSize: '0.95rem',
            background: 'rgba(0, 245, 255, 0.05)', transition: 'all 0.3s ease'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get In Touch
          </a>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'rgba(0,245,255,0.08)',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(0,245,255,0.1)',
          width: '100%',
          maxWidth: 560,
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 + i * 0.1 }}
            style={{
              padding: '1.25rem 0.5rem',
              textAlign: 'center',
              background: 'rgba(2,5,16,0.6)',
            }}
          >
            <div style={{
              fontSize: '1.6rem', fontWeight: 800,
              background: 'linear-gradient(135deg,#00f5ff,#a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500, marginTop: 2 }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
        >
          <span style={{ fontSize: '0.7rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
