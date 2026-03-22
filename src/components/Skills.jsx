import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiFramer,
    SiNodedotjs, SiExpress, SiPython, SiFastapi, SiFlask, SiGraphql,
    SiPostgresql, SiMongodb, SiRedis, SiSqlite, SiPrisma,
    SiDocker, SiGit, SiGithub, SiLinux, SiVercel, SiKubernetes,
    SiOpenai, SiTensorflow, SiPandas, SiNumpy, SiLangchain,
} from 'react-icons/si'

/* ── Data ── */
const categories = [
    {
        id: 'frontend',
        label: 'Frontend',
        emoji: '🎨',
        color: '#00f5ff',
        rgb: '0,245,255',
        desc: 'Pixel-perfect, performant UIs',
        skills: [
            { name: 'React', icon: <SiReact />, level: 95 },
            { name: 'Next.js', icon: <SiNextdotjs />, level: 88 },
            { name: 'TypeScript', icon: <SiTypescript />, level: 82 },
            { name: 'Tailwind', icon: <SiTailwindcss />, level: 90 },
            { name: 'Vite', icon: <SiVite />, level: 85 },
            { name: 'Framer Motion', icon: <SiFramer />, level: 80 },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        emoji: '⚙️',
        color: '#a855f7',
        rgb: '168,85,247',
        desc: 'Scalable, reliable architecture',
        skills: [
            { name: 'Node.js', icon: <SiNodedotjs />, level: 90 },
            { name: 'Python', icon: <SiPython />, level: 88 },
            { name: 'FastAPI', icon: <SiFastapi />, level: 82 },
            { name: 'Express', icon: <SiExpress />, level: 85 },
            { name: 'Flask', icon: <SiFlask />, level: 78 },
            { name: 'GraphQL', icon: <SiGraphql />, level: 70 },
        ],
    },
    {
        id: 'database',
        label: 'Data',
        emoji: '🗄️',
        color: '#ec4899',
        rgb: '236,72,153',
        desc: 'Storage, caching & pipelines',
        skills: [
            { name: 'PostgreSQL', icon: <SiPostgresql />, level: 85 },
            { name: 'MongoDB', icon: <SiMongodb />, level: 88 },
            { name: 'Redis', icon: <SiRedis />, level: 75 },
            { name: 'SQLite', icon: <SiSqlite />, level: 80 },
            { name: 'Prisma', icon: <SiPrisma />, level: 78 },
        ],
    },
    {
        id: 'devops',
        label: 'DevOps',
        emoji: '🚀',
        color: '#f59e0b',
        rgb: '245,158,11',
        desc: 'CI/CD, containers & cloud',
        skills: [
            { name: 'Docker', icon: <SiDocker />, level: 82 },
            { name: 'Kubernetes', icon: <SiKubernetes />, level: 65 },
            { name: 'Git', icon: <SiGit />, level: 95 },
            { name: 'GitHub', icon: <SiGithub />, level: 92 },
            { name: 'Linux', icon: <SiLinux />, level: 80 },
            { name: 'Vercel', icon: <SiVercel />, level: 90 },
        ],
    },
    {
        id: 'ai',
        label: 'AI & ML',
        emoji: '🧠',
        color: '#10b981',
        rgb: '16,185,129',
        desc: 'LLMs, models & intelligence',
        skills: [
            { name: 'OpenAI', icon: <SiOpenai />, level: 88 },
            { name: 'LangChain', icon: <SiLangchain />, level: 82 },
            { name: 'TensorFlow', icon: <SiTensorflow />, level: 70 },
            { name: 'Pandas', icon: <SiPandas />, level: 78 },
            { name: 'NumPy', icon: <SiNumpy />, level: 75 },
        ],
    },
]

/* ── Animated progress bar ── */
function ProgressBar({ level, color, rgb, inView, delay }) {
    return (
        <div style={{
            height: '4px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '99px',
            overflow: 'hidden',
            flex: 1,
        }}>
            <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${level}%` } : { width: 0 }}
                transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    height: '100%',
                    borderRadius: '99px',
                    background: `linear-gradient(90deg, rgba(${rgb},0.6), ${color})`,
                    boxShadow: `0 0 8px rgba(${rgb},0.4)`,
                }}
            />
        </div>
    )
}

/* ── Skill row ── */
function SkillRow({ skill, color, rgb, inView, idx }) {
    const [hov, setHov] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 + idx * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.55rem 0.75rem',
                borderRadius: '10px',
                background: hov ? `rgba(${rgb},0.07)` : 'transparent',
                transition: 'background 0.2s ease',
                cursor: 'default',
            }}
        >
            <span style={{
                fontSize: '1.05rem',
                color: hov ? color : '#475569',
                transition: 'color 0.2s',
                flexShrink: 0,
            }}>
                {skill.icon}
            </span>
            <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem', fontWeight: 500,
                color: hov ? '#e2e8f0' : '#64748b',
                transition: 'color 0.2s',
                minWidth: '90px',
                whiteSpace: 'nowrap',
            }}>
                {skill.name}
            </span>
            <ProgressBar level={skill.level} color={color} rgb={rgb} inView={inView} delay={0.2 + idx * 0.07} />
            <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.72rem', fontWeight: 600,
                color: hov ? color : '#334155',
                minWidth: '32px', textAlign: 'right',
                transition: 'color 0.2s',
            }}>
                {skill.level}%
            </span>
        </motion.div>
    )
}

/* ── Category card ── */
function CategoryCard({ cat, inView, delay }) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${hovered ? `rgba(${cat.rgb},0.3)` : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '20px',
                padding: '1.75rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                background: hovered ? `rgba(${cat.rgb},0.04)` : 'rgba(255,255,255,0.025)',
                boxShadow: hovered ? `0 20px 60px rgba(${cat.rgb},0.1), 0 0 0 1px rgba(${cat.rgb},0.15)` : 'none',
            }}
        >
            {/* top accent */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: hovered
                    ? `linear-gradient(90deg, transparent 5%, ${cat.color} 50%, transparent 95%)`
                    : `linear-gradient(90deg, transparent 5%, rgba(${cat.rgb},0.25) 50%, transparent 95%)`,
                transition: 'background 0.3s ease',
            }} />

            {/* corner glow */}
            <div style={{
                position: 'absolute', top: '-40px', right: '-40px',
                width: '120px', height: '120px',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${cat.rgb},0.12) 0%, transparent 70%)`,
                pointerEvents: 'none',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
            }} />

            {/* header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                        width: '38px', height: '38px',
                        borderRadius: '10px',
                        background: `rgba(${cat.rgb},0.12)`,
                        border: `1px solid rgba(${cat.rgb},0.2)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem',
                    }}>
                        {cat.emoji}
                    </div>
                    <div>
                        <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1rem', fontWeight: 700,
                            color: cat.color,
                            letterSpacing: '-0.01em',
                        }}>{cat.label}</div>
                        <div style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.7rem', color: '#475569', marginTop: '1px',
                        }}>{cat.desc}</div>
                    </div>
                </div>
                <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.65rem', fontWeight: 600,
                    color: cat.color,
                    background: `rgba(${cat.rgb},0.1)`,
                    border: `1px solid rgba(${cat.rgb},0.2)`,
                    padding: '0.18rem 0.6rem',
                    borderRadius: '99px',
                }}>
                    {cat.skills.length} tools
                </span>
            </div>

            {/* skills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                {cat.skills.map((skill, i) => (
                    <SkillRow key={skill.name} skill={skill} color={cat.color} rgb={cat.rgb} inView={inView} idx={i} />
                ))}
            </div>
        </motion.div>
    )
}

/* ── Main export ── */
export default function Skills() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section
            id="skills"
            ref={ref}
            style={{ padding: '9rem 2rem', position: 'relative', overflow: 'hidden' }}
        >
            {/* ambient background */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 70% 50% at 20% 40%, rgba(0,245,255,0.03) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(168,85,247,0.04) 0%, transparent 55%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

                {/* ── Section header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '4.5rem' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.72rem', color: '#a855f7',
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                        }}>
                            03 / Skills
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                            fontWeight: 700, letterSpacing: '-0.04em',
                            color: '#e2e8f0', lineHeight: 1.1,
                            margin: 0,
                        }}>
                            Tools &{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>
                                Technologies
                            </span>
                        </h2>

                        {/* quick stat pills */}
                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            {[
                                { label: '5 Domains', color: '#00f5ff', rgb: '0,245,255' },
                                { label: '28+ Tools', color: '#a855f7', rgb: '168,85,247' },
                                { label: '2+ Years', color: '#f59e0b', rgb: '245,158,11' },
                            ].map(pill => (
                                <span key={pill.label} style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.72rem', fontWeight: 500,
                                    color: pill.color,
                                    background: `rgba(${pill.rgb},0.08)`,
                                    border: `1px solid rgba(${pill.rgb},0.2)`,
                                    padding: '0.3rem 0.85rem',
                                    borderRadius: '99px',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {pill.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1rem', color: '#475569',
                        marginTop: '1rem', maxWidth: '520px', lineHeight: 1.7,
                    }}>
                        A full-spectrum toolkit — from reactive UIs to AI pipelines — built through real-world projects.
                    </p>
                </motion.div>

                {/* ── Bento grid of all categories ── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                    gap: '1.25rem',
                }}>
                    {categories.map((cat, i) => (
                        <CategoryCard
                            key={cat.id}
                            cat={cat}
                            inView={inView}
                            delay={0.1 + i * 0.12}
                        />
                    ))}
                </div>

                {/* ── Bottom expertise bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    style={{
                        marginTop: '3rem',
                        padding: '2rem 2.5rem',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                    }}
                >
                    <div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600, color: '#e2e8f0' }}>
                            Overall Expertise Level
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#475569', marginTop: '0.2rem' }}>
                            Based on project depth & production experience
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Beginner', w: 8, color: '#334155' },
                            { label: 'Intermediate', w: 24, color: '#475569' },
                            { label: 'Advanced', w: 45, color: '#a855f7' },
                            { label: 'Expert', w: 23, color: '#00f5ff' },
                        ].map(({ label, w, color }) => (
                            <div key={label} style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '1.4rem', fontWeight: 700, color,
                                }}>
                                    {w}%
                                </div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: '#334155', marginTop: '2px' }}>
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
