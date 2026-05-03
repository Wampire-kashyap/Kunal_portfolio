'use client'
import SectionReveal from './SectionReveal'
import type { Skill } from '@/types'

const FALLBACK_GROUPS = [
  {
    title: 'Core Skills',
    description: 'Daily-use tools for data analysis and dashboarding',
    skills: ['Python', 'SQL', 'Excel', 'Power BI']
  },
  {
    title: 'Libraries & Tools',
    description: 'Used in projects for data processing and visualization',
    skills: ['Pandas', 'NumPy', 'Matplotlib']
  },
  {
    title: 'Currently Exploring',
    description: 'Actively improving and learning',
    skills: ['Machine Learning', 'Statistics']
  }
]

const CATEGORY_LABELS: Record<Skill['category'], string> = {
  languages: 'Languages & Queries',
  visualization: 'Visualization',
  ml: 'Libraries & ML',
  tools: 'Tools & Platforms',
}

function getSkillGroups(skills: Skill[]) {
  if (!skills.length) return FALLBACK_GROUPS

  const grouped = skills.reduce<Record<string, string[]>>((groups, skill) => {
    if (!skill.name) return groups

    const title = CATEGORY_LABELS[skill.category] ?? skill.category
    groups[title] = [...(groups[title] ?? []), skill.name]
    return groups
  }, {})

  return Object.entries(grouped).map(([title, groupSkills]) => ({
    title,
    description: '',
    skills: groupSkills,
  }))
}

export default function Skills({ skills = [] }: { skills?: Skill[] }) {
  const groups = getSkillGroups(skills)

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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginTop: '2.5rem'
        }}>
          {groups.map((group, gi) => (
            <SectionReveal key={group.title} delay={gi * 0.1}>
              <div
                className="skill-group-card glass-card"
                data-hover
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(0, 245, 255, 0.15)',
                  borderRadius: '16px',
                  padding: '2rem',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 245, 255, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.15)'
                }}
              >
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#00f5ff',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em'
                }}>
                  {group.title}
                </h3>
                {group.description && (
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#94a3b8',
                    marginBottom: '1.8rem',
                    lineHeight: 1.6,
                    flexGrow: 1
                  }}>
                    {group.description}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  marginTop: group.description ? 0 : '1rem'
                }}>
                  {group.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        padding: '0.4rem 0.9rem',
                        background: 'rgba(0, 245, 255, 0.04)',
                        border: '1px solid rgba(0, 245, 255, 0.2)',
                        borderRadius: '50px',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        color: '#e2e8f0',
                        transition: 'all 0.3s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(0, 245, 255, 0.12)'
                        e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.5)'
                        e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 245, 255, 0.2)'
                        e.currentTarget.style.color = '#ffffff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(0, 245, 255, 0.04)'
                        e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.2)'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.color = '#e2e8f0'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
