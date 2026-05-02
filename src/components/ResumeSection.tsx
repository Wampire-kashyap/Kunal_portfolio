'use client'
import SectionReveal from './SectionReveal'
import MiniVideoPlayer from './MiniVideoPlayer'
import type { VideoResume } from '@/types'

export default function ResumeSection({ resumeUrl, videoData }: { resumeUrl?: string, videoData?: VideoResume | null }) {
  return (
    <section id="resume" className="section-wrapper" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container-pad" style={{ maxWidth: 900 }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#00f5ff', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              My Profile
            </p>
            <h2 className="section-title neon-text">Resume & Video</h2>
            <p className="section-subtitle">Get to know me better</p>
          </div>
        </SectionReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
          
          {/* Part 1: PDF Resume */}
          {resumeUrl && (
            <SectionReveal delay={0.1}>
              <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: 600, textAlign: 'center', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: 60, height: 60, background: 'rgba(0,245,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem' }}>Formal Resume</h3>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Download my complete professional experience, education, and technical skills.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download Resume
                  </a>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" data-hover style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none',
                    padding: '0.8rem 1.8rem', borderRadius: 50, border: '1px solid rgba(0, 245, 255, 0.3)',
                    color: '#e2e8f0', fontWeight: 600, fontSize: '0.95rem',
                    background: 'rgba(0, 245, 255, 0.05)', transition: 'all 0.3s ease'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Resume
                  </a>
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Part 2: Video Resume */}
          {videoData && (videoData.videoUrl || videoData.videoFileUrl) && (
            <SectionReveal delay={0.2}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '1.5rem', textAlign: 'center' }}>
                  Watch My Intro
                </h3>
                <div style={{ width: '100%', maxWidth: 800 }}>
                  <MiniVideoPlayer videoUrl={videoData.videoUrl} fileUrl={videoData.videoFileUrl} />
                </div>
              </div>
            </SectionReveal>
          )}

        </div>
      </div>
    </section>
  )
}
