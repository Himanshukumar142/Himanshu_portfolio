import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'

const projects = [
    {
        num: '01',
        title: 'Resume ATS Scorer',
        subtitle: 'AI-powered career tool',
        description: 'Full-stack SaaS platform with AI resume analysis, keyword matching, Gemini suggestions, and authentication system.',
        tags: ['React', 'Flask', 'Python', 'Gemini API', 'SQLite', 'JWT'],
        github: 'https://github.com',
        live: '#',
        color: '#00f5ff',
        rgb: '0,245,255',
        featured: true,
    },
    {
        num: '02',
        title: 'Labour Finder Platform',
        subtitle: 'Marketplace at scale',
        description: 'End-to-end marketplace connecting agents and workers with real-time dashboards, wallet, and news integration.',
        tags: ['Node.js', 'Express', 'MongoDB', 'React', 'Socket.io'],
        github: 'https://github.com',
        live: '#',
        color: '#a855f7',
        rgb: '168,85,247',
        featured: true,
    },
    {
        num: '03',
        title: 'AI Code Assistant',
        subtitle: 'Developer tooling',
        description: 'Context-aware coding assistant with multi-language support, code review, and LLM chain orchestration.',
        tags: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Redis'],
        github: 'https://github.com',
        live: '#',
        color: '#ec4899',
        rgb: '236,72,153',
        featured: false,
    },
    {
        num: '04',
        title: 'Freelancer Dashboard',
        subtitle: 'Business management',
        description: 'Comprehensive project tracking, invoice generation, and analytics dashboard for independent creators.',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Vercel'],
        github: 'https://github.com',
        live: '#',
        color: '#f59e0b',
        rgb: '245,158,11',
        featured: false,
    },
    {
        num: '05',
        title: 'E-Commerce Engine',
        subtitle: 'Scalable retail backend',
        description: 'High-performance e-commerce API with product catalog, cart management, Stripe payments, and admin panel.',
        tags: ['Flask', 'PostgreSQL', 'Redis', 'Docker', 'Stripe'],
        github: 'https://github.com',
        live: '#',
        color: '#10b981',
        rgb: '16,185,129',
        featured: false,
    },
    {
        num: '06',
        title: 'Real-time Chat App',
        subtitle: 'WebSocket communication',
        description: 'Encrypted chat with rooms, user presence indicators, file sharing, and end-to-end security.',
        tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
        github: 'https://github.com',
        live: '#',
        color: '#6366f1',
        rgb: '99,102,241',
        featured: false,
    },
]

function FeaturedCard({ project, delay, inView }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                padding: '3rem',
                borderRadius: '24px',
                border: `1px solid ${hovered ? `rgba(${project.rgb},0.35)` : 'rgba(255,255,255,0.06)'}`,
                background: hovered
                    ? `linear-gradient(135deg, rgba(${project.rgb},0.06), rgba(0,0,0,0.2))`
                    : 'rgba(255,255,255,0.02)',
                transform: hovered ? 'translateY(-10px)' : 'none',
                boxShadow: hovered ? `0 30px 80px rgba(${project.rgb},0.15), 0 0 0 1px rgba(${project.rgb},0.1)` : 'none',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                overflow: 'hidden',
                cursor: 'default',
            }}
        >
            {/* Number watermark */}
            <div style={{
                position: 'absolute',
                top: '1.5rem', right: '2rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '5rem', fontWeight: 700,
                color: `rgba(${project.rgb},0.06)`,
                lineHeight: 1,
                transition: 'color 0.3s',
            }}>
                {project.num}
            </div>

            {/* Top accent */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: hovered ? `linear-gradient(90deg, transparent 5%, ${project.color} 50%, transparent 95%)` : 'transparent',
                transition: 'all 0.4s',
            }} />

            {/* Color dot */}
            <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: project.color,
                boxShadow: `0 0 12px ${project.color}`,
                marginBottom: '1.5rem',
            }} />

            <div style={{ marginBottom: '0.4rem' }}>
                <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.72rem', color: project.color,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                    {project.subtitle}
                </span>
            </div>

            <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.5rem', fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#e2e8f0',
                marginBottom: '1rem',
            }}>
                {project.title}
            </h3>

            <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem', color: '#475569',
                lineHeight: 1.75,
                marginBottom: '2rem',
            }}>
                {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {project.tags.map(tag => (
                    <span key={tag} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.72rem', fontWeight: 500,
                        color: project.color,
                        background: `rgba(${project.rgb},0.08)`,
                        border: `1px solid rgba(${project.rgb},0.15)`,
                        padding: '0.25rem 0.7rem',
                        borderRadius: '6px',
                    }}>
                        {tag}
                    </span>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
                {[
                    { href: project.github, icon: <FiGithub size={14} />, label: 'Source' },
                    { href: project.live, icon: <FiArrowUpRight size={14} />, label: 'Live' },
                ].map(link => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.82rem', color: '#334155',
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = project.color}
                        onMouseLeave={e => e.currentTarget.style.color = '#334155'}
                    >
                        {link.icon} {link.label}
                    </a>
                ))}
            </div>
        </motion.div>
    )
}

function SmallCard({ project, delay, inView }) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.5 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '2rem',
                borderRadius: '16px',
                border: `1px solid ${hovered ? `rgba(${project.rgb},0.25)` : 'rgba(255,255,255,0.05)'}`,
                background: hovered ? `rgba(${project.rgb},0.04)` : 'rgba(255,255,255,0.015)',
                transform: hovered ? 'translateY(-6px)' : 'none',
                boxShadow: hovered ? `0 20px 50px rgba(${project.rgb},0.12)` : 'none',
                transition: 'all 0.3s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', marginBottom: '1rem',
            }}>
                <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: project.color,
                    boxShadow: `0 0 10px ${project.color}`,
                    marginTop: '4px',
                }} />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {[
                        { href: project.github, icon: <FiGithub size={12} /> },
                        { href: project.live, icon: <FiExternalLink size={12} /> },
                    ].map((link, i) => (
                        <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                            style={{ color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = project.color}
                            onMouseLeave={e => e.currentTarget.style.color = '#334155'}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>

            <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1rem', fontWeight: 600,
                color: '#e2e8f0', marginBottom: '0.5rem',
                letterSpacing: '-0.02em',
            }}>{project.title}</h3>
            <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem', color: '#475569',
                lineHeight: 1.65, marginBottom: '1.25rem',
            }}>
                {project.description.substring(0, 90)}...
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.68rem', color: project.color,
                        background: `rgba(${project.rgb},0.08)`,
                        padding: '0.2rem 0.55rem', borderRadius: '5px',
                    }}>{tag}</span>
                ))}
            </div>
        </motion.div>
    )
}

export default function Projects() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const featured = projects.filter(p => p.featured)
    const rest = projects.filter(p => !p.featured)

    return (
        <section
            id="projects"
            ref={ref}
            style={{ padding: '9rem 2rem', position: 'relative' }}
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
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#00f5ff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            04 / Projects
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <h2 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700, letterSpacing: '-0.04em', color: '#e2e8f0',
                        }}>
                            Selected{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>Work</span>
                        </h2>
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.82rem', color: '#334155',
                        }}>
                            {projects.length} projects total
                        </span>
                    </div>
                </motion.div>

                {/* Featured row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    {featured.map((p, i) => (
                        <FeaturedCard key={p.num} project={p} delay={i * 0.12} inView={inView} />
                    ))}
                </div>

                {/* Rest — 4 col */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                    {rest.map((p, i) => (
                        <SmallCard key={p.num} project={p} delay={0.2 + i * 0.08} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    )
}
