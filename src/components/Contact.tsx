'use client'
import { useState } from 'react'
import SectionReveal from './SectionReveal'
import { motion } from 'framer-motion'

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kunal-kk ',
    color: '#0a66c2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Wampire-kashyap',
    color: '#e2e8f0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:Kunalkumarshri47@gmail.com',
    color: '#00f5ff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '5ea53904-3b38-469c-b670-ae0b291c1785',
          name: form.name,
          email: form.email,
          subject: form.subject || 'New Contact from Portfolio',
          message: form.message
        })
      })

      const result = await response.json()
      if (result.success) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        console.error('Submission failed', result)
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 4000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(0,245,255,0.12)',
    borderRadius: 10,
    padding: '0.9rem 1.1rem',
    color: '#e2e8f0',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    fontFamily: 'var(--font-inter)',
  }

  return (
    <section id="contact" className="section-wrapper">
      <div className="container-pad">
        <SectionReveal>
          <p style={{ color: '#00f5ff', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Let&apos;s Connect
          </p>
          <h2 className="section-title neon-text-blue">Get In Touch</h2>
          <p className="section-subtitle">Open to opportunities, collaborations, and conversations</p>
        </SectionReveal>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Left */}
          <SectionReveal direction="left">
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '1rem' }}>
                Let&apos;s build something together
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: '2rem' }}>
                I&apos;m open to data analyst roles, internships, and freelance opportunities. If you have a project or role in mind, feel free to reach out.
              </p>

              {/* Social links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {SOCIAL.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                      textDecoration: 'none', color: '#64748b',
                      padding: '0.75rem 1.1rem',
                      borderRadius: 10,
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.25s ease',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                    onMouseEnter={e => {
                      ; (e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`
                        ; (e.currentTarget as HTMLElement).style.color = s.color
                        ; (e.currentTarget as HTMLElement).style.background = `${s.color}08`
                    }}
                    onMouseLeave={e => {
                      ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                        ; (e.currentTarget as HTMLElement).style.color = '#64748b'
                        ; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
                    }}
                  >
                    <span style={{ color: s.color }}>{s.icon}</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{s.label}</span>
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: 100,
                padding: '0.5rem 1.25rem',
                fontSize: '0.82rem', color: '#10b981', fontWeight: 600,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse-glow 2s infinite' }} />
                Available for new opportunities
              </div>
            </div>
          </SectionReveal>

          {/* Right — Form */}
          <SectionReveal direction="right" delay={0.15}>
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
              <div className="contact-name-email" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Kunal"
                    required
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(0,245,255,0.4)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.06)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(0,245,255,0.12)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(0,245,255,0.4)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.06)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(0,245,255,0.12)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Job opportunity / Collaboration"
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(0,245,255,0.4)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.06)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(0,245,255,0.12)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity..."
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(0,245,255,0.4)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.06)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(0,245,255,0.12)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <motion.button
                id="contact-submit"
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%', padding: '0.9rem',
                  background: status === 'sent'
                    ? 'linear-gradient(135deg,#10b981,#00f5ff)'
                    : 'linear-gradient(135deg,#00f5ff,#a855f7)',
                  border: 'none', borderRadius: 10,
                  color: '#000', fontWeight: 700, fontSize: '0.92rem',
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                  boxShadow: '0 0 20px rgba(0,245,255,0.3)',
                  fontFamily: 'var(--font-inter)',
                  transition: 'background 0.3s',
                }}
              >
                {status === 'idle' && '🚀 Send Message'}
                {status === 'sending' && '⏳ Sending...'}
                {status === 'sent' && '✅ Message Sent!'}
                {status === 'error' && '❌ Try Again'}
              </motion.button>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
