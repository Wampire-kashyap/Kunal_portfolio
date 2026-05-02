'use client'
import SectionReveal from './SectionReveal'
import { motion } from 'framer-motion'
import type { Experience } from '@/types'

const FALLBACK: Experience[] = [
  {
    _id: 'e1', company: 'TechCorp Analytics', role: 'Senior Data Analyst',
    duration: 'Jan 2024 – Present', current: true,
    description: 'Leading a team of 3 analysts to build executive-level dashboards. Automated 15+ manual reporting workflows, saving 120 hours/month. Driving data strategy for $50M business unit.',
    skills: ['Power BI', 'Python', 'SQL', 'Azure'],
  },
  {
    _id: 'e2', company: 'DataBridge Solutions', role: 'Data Analyst',
    duration: 'Jun 2022 – Dec 2023', current: false,
    description: 'Developed customer segmentation models that improved campaign ROI by 34%. Built real-time KPI tracking dashboards for 5 departments using Power BI and SQL Server.',
    skills: ['SQL', 'Tableau', 'Python', 'Excel'],
  },
  {
    _id: 'e3', company: 'StartupX', role: 'Junior Data Analyst (Intern → Full-time)',
    duration: 'Aug 2021 – May 2022', current: false,
    description: 'Started as intern, promoted to full-time within 3 months. Built product analytics from scratch using Python and Google Analytics. Helped raise Series A by providing investor-ready data reports.',
    skills: ['Python', 'Pandas', 'Google Analytics', 'Looker'],
  },
]

export default function Experience({ experiences }: { experiences: Experience[] }) {
  const data = experiences.length > 0 ? experiences : FALLBACK

  return (
    <section id="experience" className="section-wrapper">
      <div className="container-pad">
        <SectionReveal>
          <p style={{ color: '#10b981', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Career Path
          </p>
          <h2 className="section-title" style={{
            background: 'linear-gradient(135deg, #10b981, #00f5ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Experience
          </h2>
          <p className="section-subtitle">My professional journey</p>
        </SectionReveal>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 'clamp(1.25rem, 4vw, 2rem)',
            top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, transparent, #00f5ff 15%, #a855f7 85%, transparent)',
          }} />

          {data.map((exp, i) => (
            <SectionReveal key={exp._id} delay={i * 0.15}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'relative',
                  paddingLeft: 'clamp(3.5rem, 8vw, 4.5rem)',
                  paddingBottom: i < data.length - 1 ? '2.5rem' : 0,
                }}
              >
                {/* Dot */}
                <div className="timeline-dot" style={{
                  position: 'absolute',
                  left: 'clamp(0.58rem, 3.3vw, 1.3rem)',
                  top: '1.6rem',
                  background: exp.current ? '#00f5ff' : '#a855f7',
                  boxShadow: `0 0 12px ${exp.current ? '#00f5ff' : '#a855f7'}, 0 0 24px ${exp.current ? 'rgba(0,245,255,0.4)' : 'rgba(168,85,247,0.4)'}`,
                }} />

                <div className="glass-card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '0.2rem' }}>
                        {exp.role}
                      </h3>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#00f5ff' }}>
                        {exp.company}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.75rem',
                        background: exp.current ? 'rgba(0,245,255,0.1)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${exp.current ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 100,
                        fontSize: '0.72rem',
                        color: exp.current ? '#00f5ff' : '#64748b',
                        fontWeight: 600,
                      }}>
                        {exp.current ? '● Current' : exp.duration}
                      </span>
                      {exp.current && (
                        <p style={{ fontSize: '0.7rem', color: '#475569', marginTop: '0.3rem' }}>
                          {exp.duration}
                        </p>
                      )}
                    </div>
                  </div>

                  {exp.description && (
                    <p style={{ fontSize: '0.85rem', color: 'rgba(226,232,240,0.65)', lineHeight: 1.7, margin: '1rem 0' }}>
                      {exp.description}
                    </p>
                  )}

                  {exp.skills && exp.skills.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.75rem' }}>
                      {exp.skills.map(skill => (
                        <span key={skill} className="tech-badge" style={{ borderColor: 'rgba(16,185,129,0.3)', color: '#10b981' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
