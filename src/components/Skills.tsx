'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionReveal from './SectionReveal'

import type { Skill } from '@/types'

const CATEGORY_MAP = {
  languages: { label: 'Languages & Queries', color: '#00f5ff' },
  visualization: { label: 'Visualization', color: '#a855f7' },
  ml: { label: 'Libraries & ML', color: '#3b82f6' },
  tools: { label: 'Tools & Platforms', color: '#10b981' },
}

function SkillBar({ name, pct, color }: { name: string; pct: number; color: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <div ref={ref} style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#e2e8f0' }}>{name}</span>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color }}>{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          style={{
            height: '100%',
            borderRadius: 3,
            background: `linear-gradient(90deg, ${color}, #a855f7)`,
            boxShadow: `0 0 10px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}

const tools = [
  'SQL', 'Python', 'Excel', 'Power BI', 'Pandas', 'NumPy'
]

export default function Skills({ skills = [] }: { skills?: Skill[] }) {
  const [activeGroup, setActiveGroup] = useState(0)

  // Group the dynamic skills
  const groupedSkills = Object.entries(CATEGORY_MAP).map(([key, info]) => {
    return {
      label: info.label,
      color: info.color,
      items: (skills || []).filter(s => s.category === key).sort((a, b) => (a.order || 0) - (b.order || 0))
    }
  })

  return (
    <section id="skills" className="section-wrapper grid-bg">
      <div className="container-pad">
        <SectionReveal>
          <p style={{ color: '#a855f7', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Technical Arsenal
          </p>
          <h2 className="section-title neon-text">Skills</h2>
          <p className="section-subtitle">Technologies I work with daily</p>
        </SectionReveal>

        <div className="skill-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {groupedSkills.map((group, gi) => (
            <SectionReveal key={group.label} delay={gi * 0.1}>
              <div className="glass-card" style={{ padding: '1.75rem', height: '100%', transition: 'all 0.3s ease' }} data-hover>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: group.color, marginBottom: '1.25rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {group.label}
                </h3>
                {group.items.map(s => (
                  <SkillBar key={s._id} name={s.name} pct={s.level} color={group.color} />
                ))}
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Tools cloud */}
        <SectionReveal>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1.25rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Also worked with
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
              {tools.map(tool => (
                <span key={tool} className="tech-badge">{tool}</span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
