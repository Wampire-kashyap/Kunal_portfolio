'use client'
import SectionReveal from './SectionReveal'

const strengths = [
  { icon: '📊', title: 'Data Storytelling', desc: 'Turning complex datasets into clear, compelling narratives that non-technical stakeholders understand instantly.' },
  { icon: '🔍', title: 'Pattern Recognition', desc: 'Uncovering hidden trends and anomalies through statistical analysis and advanced querying techniques.' },
  { icon: '⚡', title: 'Automation', desc: 'Building ETL pipelines and automated reports that save hundreds of hours every quarter.' },
  { icon: '🎯', title: 'Business Acumen', desc: 'Aligning data insights with strategic goals to drive measurable ROI and informed decisions.' },
]

export default function About() {
  return (
    <section id="about" className="section-wrapper">
      <div className="container-pad">
        <SectionReveal>
          <p style={{ color: '#00f5ff', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Who I Am
          </p>
          <h2 className="section-title neon-text-blue">About Me</h2>
          <p className="section-subtitle">The story behind the analyst</p>
        </SectionReveal>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          {/* Left — Story */}
          <SectionReveal direction="left">
            <div>
              <p style={{ color: 'rgba(226,232,240,0.75)', lineHeight: 1.85, marginBottom: '1.5rem', fontSize: '0.97rem' }}>
                I&apos;m <strong style={{ color: '#e2e8f0' }}>Kunal</strong>, a Data Analyst focused on turning raw data into clear, actionable insights. I’m driven by understanding <em style={{ color: '#00f5ff' }}>why things happen</em> — not just reporting what happened.
              </p>
              <p style={{ color: 'rgba(226,232,240,0.75)', lineHeight: 1.85, marginBottom: '1.5rem', fontSize: '0.97rem' }}>
                I work with <strong style={{ color: '#a855f7' }}>SQL, Python, and Power BI</strong> to build end-to-end analytics solutions—from data cleaning and exploration to dashboards that support real business decisions.
              </p>
              <p style={{ color: 'rgba(226,232,240,0.75)', lineHeight: 1.85, fontSize: '0.97rem' }}>
                I believe effective analysis goes beyond numbers—it's about delivering clarity and enabling smarter, faster decisions with confidence.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, fontSize: '0.85rem', color: '#e2e8f0' }}>
                  <span style={{ color: '#ef4444' }}>📍</span> India
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, fontSize: '0.85rem', color: '#e2e8f0' }}>
                  <span style={{ color: '#3b82f6' }}>🎓</span> Data Science
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, fontSize: '0.85rem', color: '#e2e8f0' }}>
                  <span style={{ color: '#f59e0b' }}>💼</span> Open to Work
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, fontSize: '0.85rem', color: '#e2e8f0' }}>
                  <span style={{ color: '#06b6d4' }}>🌐</span> Remote Ready
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Right — Strengths */}
          <SectionReveal direction="right" delay={0.15}>
            <div className="strength-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {strengths.map((s, i) => (
                <div key={i} className="glass-card" style={{ padding: '1.5rem' }} data-hover>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
