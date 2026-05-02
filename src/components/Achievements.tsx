'use client'
import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import type { Achievement } from '@/types'

const FALLBACK: Achievement[] = [
  { _id: 'a1', title: 'Top 1% on Kaggle', description: 'Ranked in the top 1% of data scientists globally on Kaggle platform with 3 gold medals.', icon: '🥇', metric: 'Top 1%', date: '2024-01' },
  { _id: 'a2', title: 'Hackathon Winner', description: 'Won national-level data hackathon with a fraud detection model deployed in production.', icon: '🏆', metric: '1st Place', date: '2023-11' },
  { _id: 'a3', title: '$2M Cost Savings', description: 'Analytics work identified operational inefficiencies saving the company $2M annually.', icon: '💰', metric: '$2M Saved', date: '2023-09' },
  { _id: 'a4', title: 'Speaker @ DataConf', description: 'Invited speaker at regional data conference, presenting on "Democratizing Data in SMEs".', icon: '🎤', metric: '500+ Audience', date: '2023-07' },
  { _id: 'a5', title: 'Open Source Contributor', description: 'Active contributor to pandas and matplotlib with 200+ GitHub stars on personal tools.', icon: '⭐', metric: '200+ Stars', date: '2023-05' },
  { _id: 'a6', title: 'Published Research', description: 'Co-authored paper on predictive analytics in healthcare accepted at IEEE conference.', icon: '📄', metric: 'IEEE Published', date: '2022-12' },
]

const COLORS = ['#00f5ff', '#a855f7', '#10b981', '#f59e0b', '#3b82f6', '#ef4444']

export default function Achievements({ achievements }: { achievements: Achievement[] }) {
  const data = achievements.length > 0 ? achievements : FALLBACK

  return (
    <section id="achievements" className="section-wrapper grid-bg">
      <div className="container-pad">
        <SectionReveal>
          <p style={{ color: '#f59e0b', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Milestones
          </p>
          <h2 className="section-title" style={{
            background: 'linear-gradient(135deg,#f59e0b,#00f5ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Achievements
          </h2>
          <p className="section-subtitle">Recognition that matters</p>
        </SectionReveal>

        <div className="achieve-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {data.map((ach, i) => {
            const color = COLORS[i % COLORS.length]
            return (
              <SectionReveal key={ach._id} delay={i * 0.08}>
                <motion.div
                  className="glass-card"
                  style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  data-hover
                >
                  {/* Glow accent corner */}
                  <div style={{
                    position: 'absolute', top: -20, right: -20,
                    width: 80, height: 80, borderRadius: '50%',
                    background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      fontSize: '1.8rem',
                      width: 52, height: 52,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${color}12`,
                      border: `1px solid ${color}30`,
                      borderRadius: 12,
                      flexShrink: 0,
                    }}>
                      {ach.icon || '🏅'}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#e2e8f0', lineHeight: 1.3, marginBottom: '0.25rem' }}>
                        {ach.title}
                      </h3>
                      {ach.metric && (
                        <span style={{
                          display: 'inline-block',
                          background: `${color}15`,
                          border: `1px solid ${color}35`,
                          borderRadius: 100,
                          padding: '0.15rem 0.65rem',
                          fontSize: '0.72rem',
                          color,
                          fontWeight: 700,
                        }}>
                          {ach.metric}
                        </span>
                      )}
                    </div>
                  </div>

                  {ach.description && (
                    <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.65 }}>
                      {ach.description}
                    </p>
                  )}

                  {ach.date && (
                    <p style={{ fontSize: '0.72rem', color: '#334155', marginTop: '1rem', fontWeight: 500 }}>
                      {new Date(ach.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </motion.div>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
