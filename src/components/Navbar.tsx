'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Resume',       href: '#resume' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkBase: React.CSSProperties = {
    padding: '0.5rem 0.9rem',
    borderRadius: 8,
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'rgba(226,232,240,0.7)',
    background: 'transparent',
    transition: 'all 0.25s ease',
    whiteSpace: 'nowrap' as const,
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
        padding: '0 1.5rem',
        background: scrolled ? 'rgba(2, 5, 16, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 70,
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{
            fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg,#00f5ff,#a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            KK<span style={{ opacity: 0.7 }}>.</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="nav-desktop-links">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              data-hover
              onClick={() => setActive(link.href)}
              style={{
                ...linkBase,
                color: active === link.href ? '#00f5ff' : 'rgba(226,232,240,0.7)',
                background: active === link.href ? 'rgba(0,245,255,0.08)' : 'transparent',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.color = '#00f5ff'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,245,255,0.06)'
              }}
              onMouseLeave={e => {
                if (active !== link.href) {
                  ;(e.currentTarget as HTMLElement).style.color = 'rgba(226,232,240,0.7)'
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="btn-glow nav-hire-btn"
          data-hover
          style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#00f5ff', padding: 8, alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open
              ? <>
                  <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
              : <>
                  <line x1="2" y1="6"  x2="20" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(2,5,16,0.97)',
              borderTop: '1px solid rgba(0,245,255,0.08)',
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { 
                  e.preventDefault();
                  setActive(link.href); 
                  setOpen(false);
                  
                  setTimeout(() => {
                    const target = document.querySelector(link.href);
                    if (target) {
                      const yOffset = -70; 
                      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 50);
                }}
                style={{
                  display: 'block', padding: '1rem 1.5rem',
                  textDecoration: 'none', color: 'rgba(226,232,240,0.8)',
                  fontSize: '0.95rem', fontWeight: 500,
                  borderBottom: '1px solid rgba(0,245,255,0.05)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00f5ff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(226,232,240,0.8)')}
              >
                {link.label}
              </a>
            ))}
            <div style={{ padding: '1rem 1.5rem' }}>
              <a 
                href="#contact" 
                className="btn-glow" 
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  
                  setTimeout(() => {
                    const target = document.querySelector('#contact');
                    if (target) {
                      const yOffset = -70; 
                      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 50);
                }} 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
