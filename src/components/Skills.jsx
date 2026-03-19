import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiFramer,
    SiNodedotjs, SiExpress, SiPython, SiFastapi, SiFlask, SiGraphql,
    SiPostgresql, SiMongodb, SiRedis, SiSqlite, SiPrisma,
    SiDocker, SiGit, SiGithub, SiLinux, SiVercel, SiKubernetes,
    SiOpenai, SiTensorflow, SiPandas, SiNumpy, SiLangchain,
} from 'react-icons/si'

const categories = [
    {
        id: 'frontend',
        label: 'Frontend',
        num: '01',
        color: '#00f5ff',
        rgb: '0,245,255',
        desc: 'Pixel-perfect, performant UIs',
        skills: [
            { name: 'React', icon: <SiReact /> },
            { name: 'Next.js', icon: <SiNextdotjs /> },
            { name: 'TypeScript', icon: <SiTypescript /> },
            { name: 'Tailwind', icon: <SiTailwindcss /> },
            { name: 'Vite', icon: <SiVite /> },
            { name: 'Framer Motion', icon: <SiFramer /> },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        num: '02',
        color: '#a855f7',
        rgb: '168,85,247',
        desc: 'Scalable, reliable architecture',
        skills: [
            { name: 'Node.js', icon: <SiNodedotjs /> },
            { name: 'Python', icon: <SiPython /> },
            { name: 'FastAPI', icon: <SiFastapi /> },
            { name: 'Express', icon: <SiExpress /> },
            { name: 'Flask', icon: <SiFlask /> },
            { name: 'GraphQL', icon: <SiGraphql /> },
        ],
    },
    {
        id: 'database',
        label: 'Data',
        num: '03',
        color: '#ec4899',
        rgb: '236,72,153',
        desc: 'Storage, caching & pipelines',
        skills: [
            { name: 'PostgreSQL', icon: <SiPostgresql /> },
            { name: 'MongoDB', icon: <SiMongodb /> },
            { name: 'Redis', icon: <SiRedis /> },
            { name: 'SQLite', icon: <SiSqlite /> },
            { name: 'Prisma', icon: <SiPrisma /> },
        ],
    },
    {
        id: 'devops',
        label: 'DevOps',
        num: '04',
        color: '#f59e0b',
        rgb: '245,158,11',
        desc: 'CI/CD, containers & cloud',
        skills: [
            { name: 'Docker', icon: <SiDocker /> },
            { name: 'Kubernetes', icon: <SiKubernetes /> },
            { name: 'Git', icon: <SiGit /> },
            { name: 'GitHub', icon: <SiGithub /> },
            { name: 'Linux', icon: <SiLinux /> },
            { name: 'Vercel', icon: <SiVercel /> },
        ],
    },
    {
        id: 'ai',
        label: 'AI & ML',
        num: '05',
        color: '#10b981',
        rgb: '16,185,129',
        desc: 'LLMs, models & intelligence',
        skills: [
            { name: 'OpenAI', icon: <SiOpenai /> },
            { name: 'LangChain', icon: <SiLangchain /> },
            { name: 'TensorFlow', icon: <SiTensorflow /> },
            { name: 'Pandas', icon: <SiPandas /> },
            { name: 'NumPy', icon: <SiNumpy /> },
        ],
    },
]

function SkillPill({ name, icon, color, rgb, delay, inView }) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1rem',
                borderRadius: '999px',
                background: hovered ? `rgba(${rgb},0.12)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hovered ? `rgba(${rgb},0.4)` : 'rgba(255,255,255,0.07)'}`,
                transition: 'all 0.2s ease',
                transform: hovered ? 'translateY(-3px) scale(1.05)' : 'none',
                boxShadow: hovered ? `0 8px 24px rgba(${rgb},0.2)` : 'none',
                cursor: 'default',
                willChange: 'transform',
            }}
        >
            <span style={{ color: hovered ? color : '#475569', fontSize: '1rem', transition: 'color 0.2s' }}>
                {icon}
            </span>
            <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 500,
                color: hovered ? '#e2e8f0' : '#64748b',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
            }}>
                {name}
            </span>
        </motion.div>
    )
}

export default function Skills() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [activeTab, setActiveTab] = useState('frontend')

    const active = categories.find(c => c.id === activeTab) || categories[0]

    return (
        <section
            id="skills"
            ref={ref}
            style={{ padding: '9rem 2rem', position: 'relative', overflow: 'hidden' }}
        >
            {/* bg glow */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 70% 50%, rgba(${active.rgb},0.04) 0%, transparent 60%)`,
                transition: 'background 0.5s ease',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                {/* Head */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '5rem' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#a855f7', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            03 / Skills
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    </div>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700, letterSpacing: '-0.04em',
                        color: '#e2e8f0',
                    }}>
                        Tools &{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>
                            Technologies
                        </span>
                    </h2>
                </motion.div>

                {/* Tab nav */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}
                >
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                padding: '0.7rem 1.4rem',
                                borderRadius: '999px',
                                border: `1px solid ${activeTab === cat.id ? `rgba(${cat.rgb},0.4)` : 'rgba(255,255,255,0.07)'}`,
                                background: activeTab === cat.id ? `rgba(${cat.rgb},0.1)` : 'rgba(255,255,255,0.02)',
                                color: activeTab === cat.id ? cat.color : '#475569',
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.82rem', fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                                boxShadow: activeTab === cat.id ? `0 0 20px rgba(${cat.rgb},0.15)` : 'none',
                            }}
                        >
                            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.7rem', opacity: 0.5 }}>
                                {cat.num}
                            </span>
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Active category */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        padding: '3rem',
                        background: 'rgba(255,255,255,0.015)',
                        border: `1px solid rgba(${active.rgb},0.12)`,
                        borderRadius: '24px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Top accent line */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: `linear-gradient(90deg, transparent 10%, ${active.color} 50%, transparent 90%)`,
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                        <div>
                            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', fontWeight: 600, color: active.color, letterSpacing: '-0.02em' }}>
                                {active.label}
                            </h3>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#475569', marginTop: '0.3rem' }}>
                                {active.desc}
                            </p>
                        </div>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '4rem', fontWeight: 700, color: `rgba(${active.rgb},0.08)`, lineHeight: 1 }}>
                            {active.num}
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {active.skills.map((skill, i) => (
                            <SkillPill
                                key={skill.name}
                                name={skill.name}
                                icon={skill.icon}
                                color={active.color}
                                rgb={active.rgb}
                                delay={i * 0.06}
                                inView={true}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
