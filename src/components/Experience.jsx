import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBriefcase, FiCode, FiStar, FiAward } from 'react-icons/fi'

const experiences = [
    {
        num: '01',
        type: 'work',
        title: 'Full Stack Developer Intern',
        org: 'Tech Startup',
        location: 'Remote',
        period: '2024 – Present',
        icon: <FiBriefcase size={14} />,
        color: '#00f5ff',
        rgb: '0,245,255',
        description: 'Architected and shipped multiple full-stack features using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines and improved API response times by 40%.',
        tags: ['React', 'Node.js', 'PostgreSQL', 'CI/CD'],
    },
    {
        num: '02',
        type: 'project',
        title: 'AI Resume Scorer Platform',
        org: 'Open Source / Personal',
        location: 'Shipped',
        period: '2024',
        icon: <FiCode size={14} />,
        color: '#a855f7',
        rgb: '168,85,247',
        description: 'Complete SaaS-like platform with Flask backend, SQLite, Gemini AI integration, React frontend, and full authentication system.',
        tags: ['Flask', 'Gemini AI', 'React', 'Auth'],
    },
    {
        num: '03',
        type: 'open-source',
        title: 'Labour Finder Marketplace',
        org: 'Freelance Project',
        location: 'Delivered',
        period: '2024',
        icon: <FiStar size={14} />,
        color: '#ec4899',
        rgb: '236,72,153',
        description: 'End-to-end marketplace with real-time features, wallet system, role-based access control, and Live news API integration.',
        tags: ['Node.js', 'MongoDB', 'Socket.io', 'React'],
    },
    {
        num: '04',
        type: 'project',
        title: 'Freelancer Dashboard',
        org: 'Personal Project',
        location: 'Live',
        period: '2023',
        icon: <FiAward size={14} />,
        color: '#f59e0b',
        rgb: '245,158,11',
        description: 'Comprehensive dashboard with responsive UI, data visualization, client management, invoice tracking, and news sidebar.',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    },
    {
        num: '05',
        type: 'education',
        title: 'Systems & Engineering Mastery',
        org: 'Self-Directed Learning',
        location: 'Ongoing',
        period: '2022 – 2023',
        icon: <FiCode size={14} />,
        color: '#6366f1',
        rgb: '99,102,241',
        description: 'Deep-dived into algorithms, system design, databases, cloud infrastructure, and modern full-stack patterns through projects and coursework.',
        tags: ['DSA', 'System Design', 'Cloud', 'Web'],
    },
]

export default function Experience() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="experience"
            ref={ref}
            style={{
                padding: '9rem 2rem',
                background: 'rgba(255,255,255,0.008)',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                position: 'relative',
            }}
        >
            <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                {/* Head */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '5rem' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#ec4899', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            05 / Experience
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    </div>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700, letterSpacing: '-0.04em', color: '#e2e8f0',
                    }}>
                        The{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>Journey</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {experiences.map((exp, i) => (
                        <ExperienceCard key={exp.num} exp={exp} delay={i * 0.1} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ExperienceCard({ exp, delay, inView }) {
    const [hovered, setHovered] = useState(false)
    // simpler hover
    const ref = useRef()

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            ref={ref}
            style={{
                padding: '2.5rem',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = `rgba(${exp.rgb},0.3)`
                e.currentTarget.style.background = `rgba(${exp.rgb},0.04)`
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(${exp.rgb},0.1)`
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
            }}
        >
            {/* Number watermark */}
            <div style={{
                position: 'absolute', top: '1rem', right: '1.5rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '4rem', fontWeight: 700,
                color: `rgba(${exp.rgb},0.06)`,
                lineHeight: 1,
            }}>{exp.num}</div>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: `rgba(${exp.rgb},0.1)`,
                    border: `1px solid rgba(${exp.rgb},0.2)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: exp.color,
                }}>
                    {exp.icon}
                </div>
                <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.72rem', color: exp.color,
                    background: `rgba(${exp.rgb},0.1)`,
                    border: `1px solid rgba(${exp.rgb},0.2)`,
                    padding: '0.25rem 0.75rem', borderRadius: '100px',
                }}>
                    {exp.period}
                </span>
            </div>

            <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.05rem', fontWeight: 600,
                color: '#e2e8f0', marginBottom: '0.3rem', letterSpacing: '-0.02em',
            }}>
                {exp.title}
            </h3>
            <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem', color: exp.color,
                marginBottom: '1rem',
            }}>
                {exp.org} · {exp.location}
            </div>
            <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem', color: '#475569',
                lineHeight: 1.7, marginBottom: '1.5rem',
            }}>
                {exp.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {exp.tags.map(tag => (
                    <span key={tag} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.7rem', color: '#475569',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        padding: '0.2rem 0.6rem', borderRadius: '6px',
                    }}>{tag}</span>
                ))}
            </div>
        </motion.div>
    )
}
