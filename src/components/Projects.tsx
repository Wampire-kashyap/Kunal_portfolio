'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SectionReveal from './SectionReveal'
import { urlFor } from '@/lib/sanity'
import type { Project } from '@/types'

const FALLBACK_PROJECTS: Project[] = [
  {
    _id: 'p1',
    title: 'Sales Analytics Dashboard',
    description: 'Built an end-to-end Power BI dashboard tracking $12M in revenue across 6 regions, reducing reporting time by 70%.',
    tools: ['Power BI', 'SQL', 'Python'],
    category: 'Dashboard',
    featured: true,
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'p2',
    title: 'Customer Churn Predictor',
    description: 'ML model achieving 91% accuracy in predicting customer churn, enabling proactive retention campaigns.',
    tools: ['Python', 'Scikit-learn', 'Pandas'],
    category: 'Machine Learning',
    featured: true,
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'p3',
    title: 'E-Commerce ETL Pipeline',
    description: 'Automated data pipeline processing 500K+ rows daily from 4 sources into a unified data warehouse.',
    tools: ['Python', 'PostgreSQL', 'Airflow'],
    category: 'Data Analysis',
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'p4',
    title: 'Financial Risk Model',
    description: 'Statistical risk assessment model for loan default prediction with 88% precision using ensemble methods.',
    tools: ['Python', 'R', 'Excel'],
    category: 'Machine Learning',
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'p5',
    title: 'HR Analytics Platform',
    description: 'Comprehensive workforce analytics with attrition analysis, performance prediction, and headcount planning.',
    tools: ['Power BI', 'DAX', 'SQL'],
    category: 'Dashboard',
    image: { asset: { url: '/placeholder.png' } }
  },
  {
    _id: 'p6',
    title: 'Market Basket Analysis',
    description: 'Association rule mining on 2M transactions revealing cross-sell opportunities worth $450K annually.',
    tools: ['Python', 'Pandas', 'Matplotlib'],
    category: 'Data Analysis',
    image: { asset: { url: '/placeholder.png' } }
  },
]

const CATEGORIES = ['All', 'Data Analysis', 'Machine Learning', 'Dashboard', 'Visualization']

export default function Projects({ projects }: { projects: Project[] }) {
  const data = projects.length > 0 ? projects : FALLBACK_PROJECTS
  const [filter, setFilter] = useState('All')
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = filter === 'All' ? data : data.filter(p => p.category === filter)

  return (
    <section id="projects" className="section-wrapper">
      <div className="container-pad">
        <SectionReveal>
          <p style={{ color: '#3b82f6', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Portfolio
          </p>
          <h2 className="section-title neon-text-blue">Projects</h2>
          <p className="section-subtitle">Real-world solutions built with data</p>
        </SectionReveal>

        {/* Filter tabs */}
        <SectionReveal delay={0.1}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-hover
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: 100,
                  border: `1px solid ${filter === cat ? '#3b82f6' : 'rgba(255,255,255,0.08)'}`,
                  background: filter === cat ? 'rgba(59,130,246,0.15)' : 'transparent',
                  color: filter === cat ? '#3b82f6' : '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Grid */}
        <motion.div
          layout
          className="proj-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="glass-card"
                onMouseEnter={() => setHovered(project._id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  overflow: 'hidden',
                  cursor: 'default',
                  position: 'relative',
                  transform: hovered === project._id ? 'translateY(-8px) scale(1.01)' : undefined,
                  boxShadow: hovered === project._id
                    ? '0 0 40px rgba(59,130,246,0.15), 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
                    : undefined,
                }}
              >
                {/* Image or gradient header */}
                <div style={{ height: 160, position: 'relative', overflow: 'hidden' }}>
                  {project.image ? (
                    <Image
                      src={urlFor(project.image).width(600).height(320).url()}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      height: '100%',
                      background: `linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(168,85,247,0.15) 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                      </svg>
                    </div>
                  )}

                  {/* Category badge */}
                  {project.category && (
                    <span style={{
                      position: 'absolute', top: 12, left: 12,
                      background: 'rgba(2,5,16,0.8)',
                      border: '1px solid rgba(59,130,246,0.3)',
                      borderRadius: 100,
                      padding: '0.2rem 0.7rem',
                      fontSize: '0.7rem',
                      color: '#3b82f6',
                      fontWeight: 600,
                      backdropFilter: 'blur(8px)',
                    }}>
                      {project.category}
                    </span>
                  )}
                  {project.featured && (
                    <span style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(2,5,16,0.8)',
                      border: '1px solid rgba(0,245,255,0.3)',
                      borderRadius: 100,
                      padding: '0.2rem 0.7rem',
                      fontSize: '0.7rem',
                      color: '#00f5ff',
                      fontWeight: 600,
                      backdropFilter: 'blur(8px)',
                    }}>
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.6rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    {project.description}
                  </p>

                  {/* Tools */}
                  {project.tools && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {project.tools.map(tool => (
                        <span key={tool} className="tech-badge">{tool}</span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                          fontSize: '0.78rem', fontWeight: 600, color: '#64748b',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                        </svg>
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                          fontSize: '0.78rem', fontWeight: 600, color: '#00f5ff',
                          textDecoration: 'none',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
