'use client'
import { useEffect, useState } from 'react'

const SECTIONS = ['hero', 'about', 'skills', 'resume', 'projects', 'certificates', 'experience', 'achievements', 'contact']

export default function FloatingSectionIndicator() {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div style={{
      position: 'fixed',
      right: '1.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 900,
    }} className="nav-desktop-links"> {/* Hide on mobile to save space */}
      {SECTIONS.map((id) => {
        const isActive = activeId === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Go to ${id}`}
            style={{
              width: 10,
              height: isActive ? 24 : 10,
              borderRadius: 10,
              background: isActive ? '#00f5ff' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              boxShadow: isActive ? '0 0 10px #00f5ff' : 'none',
              cursor: 'pointer',
            }}
            data-hover
          />
        )
      })}
    </div>
  )
}
