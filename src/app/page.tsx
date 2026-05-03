import {
  client,
  PROJECTS_QUERY,
  CERTIFICATES_QUERY,
  EXPERIENCE_QUERY,
  ACHIEVEMENTS_QUERY,
  RESUME_QUERY,
  VIDEO_RESUME_QUERY,
  SKILLS_QUERY
} from '@/lib/sanity'

import type {
  Project,
  Certificate,
  Experience as ExperienceType,
  Achievement,
  Resume,
  VideoResume,
  Skill
} from '@/types'

import ClientLayer from '@/components/ClientLayer'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Experience from '@/components/Experience'
import Achievements from '@/components/Achievements'
import Contact from '@/components/Contact'
import ResumeSection from '@/components/ResumeSection'

export const revalidate = 0

async function getData() {
  try {
    const [
      projects,
      certificates,
      experiences,
      achievements,
      resume,
      videoResume,
      skills
    ] = await Promise.all([
      client.fetch<Project[]>(PROJECTS_QUERY, {}, { cache: 'no-store' }),
      client.fetch<Certificate[]>(CERTIFICATES_QUERY, {}, { cache: 'no-store' }),
      client.fetch<ExperienceType[]>(EXPERIENCE_QUERY, {}, { cache: 'no-store' }),
      client.fetch<Achievement[]>(ACHIEVEMENTS_QUERY, {}, { cache: 'no-store' }),
      client.fetch<Resume | null>(RESUME_QUERY, {}, { cache: 'no-store' }),
      client.fetch<VideoResume | null>(VIDEO_RESUME_QUERY, {}, { cache: 'no-store' }),
      client.fetch<Skill[]>(SKILLS_QUERY, {}, { cache: 'no-store' }),
    ])

    return {
      projects: projects ?? [],
      certificates: certificates ?? [],
      experiences: experiences ?? [],
      achievements: achievements ?? [],
      resume,
      videoResume,
      skills: skills ?? []
    }

  } catch (err) {
    console.error('Sanity fetch failed:', err)

    return {
      projects: [],
      certificates: [],
      experiences: [],
      achievements: [],
      resume: null,
      videoResume: null,
      skills: []
    }
  }
}

export default async function HomePage() {
  const {
    projects,
    certificates,
    experiences,
    achievements,
    resume,
    videoResume,
    skills
  } = await getData()

  return (
    <>
      <ClientLayer />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills skills={skills} />
        <ResumeSection resumeUrl={resume?.pdfUrl} videoData={videoResume} />
        <Projects projects={projects} />
        <Certificates certificates={certificates} />
        <Experience experiences={experiences} />
        <Achievements achievements={achievements} />
        <Contact />
      </main>

      <footer
        style={{
          padding: '3rem 1rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(0,245,255,0.1)',
          position: 'relative',
          zIndex: 1,
          background: 'rgba(2, 5, 16, 0.9)'
        }}
      >
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} <span style={{ color: '#00f5ff' }}>Kunal</span>. Built with Next.js & Sanity.
        </p>
      </footer>
    </>
  )
}
