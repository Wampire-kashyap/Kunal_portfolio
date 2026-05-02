'use client'
import { motion } from 'framer-motion'

const HERO_TITLE = "Turning Data into Decisions That Drive Impact"
const HERO_SUBTITLE = "I build data-driven solutions using Python, SQL, and Power BI to transform raw data into clear, actionable insights."
const ONE_LINER = "Focused on solving real-world business problems with data."
const HERO_TAGS = ["Python", "SQL", "Excel", "Power BI"]
const PRIMARY_CTA = "View Projects"
const SECONDARY_CTA = "Download Resume"

export default function Hero() {
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
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Name / Role Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.2rem',
            background: 'rgba(0,245,255,0.06)',
            border: '1px solid rgba(0,245,255,0.2)',
            borderRadius: 100,
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            color: '#00f5ff',
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}
        >
          <span style={{ width: 6, height: 6, background: '#00f5ff', borderRadius: '50%', boxShadow: '0 0 8px #00f5ff' }} />
          Kunal Kashyap • Data Analyst
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: '#f8fafc',
            maxWidth: '900px'
          }}
        >
          {HERO_TITLE.split(' ').map((word, i) => {
            if (word === 'Data' || word === 'Decisions' || word === 'Impact') {
              return (
                <span key={i} style={{
                  background: 'linear-gradient(135deg,#00f5ff 0%,#a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {word}{' '}
                </span>
              )
            }
            return word + ' '
          })}
        </motion.h1>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}
        >
          {HERO_TAGS.map(tag => (
            <span key={tag} style={{
              padding: '0.4rem 1rem',
              borderRadius: 999,
              background: 'rgba(0,245,255,0.1)',
              border: '1px solid rgba(0,245,255,0.2)',
              color: '#00f5ff',
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: '0 0 10px rgba(0,245,255,0.05)',
            }}>
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            maxWidth: 650,
            color: '#94a3b8',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            marginBottom: '0.5rem',
          }}
        >
          {HERO_SUBTITLE}
        </motion.p>

        {/* One-Liner */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            color: '#64748b',
            fontSize: '0.9rem',
            marginBottom: '3rem',
            fontWeight: 500
          }}
        >
          {ONE_LINER}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            width: '100%'
          }}
        >
          <a 
            href="#projects" 
            className="btn-glow" 
            data-hover 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.5rem', 
              textDecoration: 'none',
              padding: '0.8rem 2rem',
              minWidth: '200px'
            }}
          >
            {PRIMARY_CTA}
          </a>
          <a 
            href="#resume" 
            data-hover 
            style={{
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.5rem', 
              textDecoration: 'none',
              padding: '0.8rem 2rem', 
              borderRadius: 50, 
              border: '1px solid rgba(0, 245, 255, 0.3)',
              color: '#e2e8f0', 
              fontWeight: 600, 
              fontSize: '0.95rem',
              background: 'rgba(0, 245, 255, 0.05)', 
              transition: 'all 0.3s ease',
              minWidth: '200px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0, 245, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.3)';
            }}
          >
            {SECONDARY_CTA}
          </a>
        </motion.div>

      </div>
    </section>
  )
}
