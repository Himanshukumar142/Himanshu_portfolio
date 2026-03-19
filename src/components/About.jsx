import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(target, duration = 2000, start = false) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!start) return
        let startTime = null
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [start, target, duration])
    return count
}

function StatBox({ num, suffix = '', label, color, delay, inView }) {
    const count = useCountUp(num, 1800, inView)
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid rgba(255,255,255,0.06)`,
                borderRadius: '16px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at center, rgba(${color},0.06) 0%, transparent 70%)`,
                pointerEvents: 'none',
            }} />
            <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2.8rem',
                fontWeight: 700,
                color: '#e2e8f0',
                letterSpacing: '-0.04em',
                lineHeight: 1,
            }}>
                {count}{suffix}
            </div>
            <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.78rem',
                color: '#475569',
                marginTop: '0.5rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
            }}>
                {label}
            </div>
        </motion.div>
    )
}

export default function About() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="about"
            ref={ref}
            style={{ padding: '9rem 2rem', position: 'relative', overflow: 'hidden' }}
        >
            {/* Background gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.04) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '5rem' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.72rem',
                            color: '#a855f7',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                        }}>02 / About</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    </div>
                </motion.div>

                {/* Bento grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto',
                    gap: '1rem',
                }}>
                    {/* Main bio card — spans 7 cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.7 }}
                        style={{
                            gridColumn: 'span 7',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: '20px',
                            padding: '3rem',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Shimmer on top border */}
                        <div style={{
                            position: 'absolute', top: 0, left: '-100%', width: '60%', height: '1px',
                            background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
                            animation: 'shimmer-line 4s ease-in-out infinite 1s',
                        }} />
                        <h2 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.04em',
                            lineHeight: 1.15,
                            color: '#e2e8f0',
                            marginBottom: '1.5rem',
                        }}>
                            Engineer who{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                obsesses
                            </span>{' '}
                            over details.
                        </h2>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '1.05rem',
                            color: '#475569',
                            lineHeight: 1.85,
                            maxWidth: '520px',
                        }}>
                            I thrive at the intersection of technology and craft — building systems where performance and aesthetics are non-negotiable. From scalable APIs to buttery smooth UIs, every line of code is intentional.
                        </p>
                    </motion.div>

                    {/* Highlight card — spans 5 cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        style={{
                            gridColumn: 'span 5',
                            background: 'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(168,85,247,0.05))',
                            border: '1px solid rgba(0,245,255,0.1)',
                            borderRadius: '20px',
                            padding: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1rem',
                            color: '#64748b',
                            marginBottom: '2rem',
                        }}>
                            Currently building
                        </div>
                        <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            letterSpacing: '-0.02em',
                            color: '#e2e8f0',
                            lineHeight: 1.3,
                        }}>
                            AI-powered tools for the next generation of{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                developers
                            </span>
                        </div>
                        <div style={{
                            marginTop: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                        }}>
                            <div style={{
                                width: '8px', height: '8px', borderRadius: '50%',
                                background: '#00f5ff',
                                boxShadow: '0 0 12px #00f5ff',
                                animation: 'pulse-ring 2s ease-in-out infinite',
                            }} />
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.82rem', color: '#00f5ff',
                            }}>
                                Open to opportunities
                            </span>
                        </div>
                    </motion.div>

                    {/* Stats row — 4 equal boxes */}
                    {[
                        { num: 15, suffix: '+', label: 'Projects Built', color: '0,245,255', delay: 0.25 },
                        { num: 2, suffix: '+', label: 'Years Experience', color: '168,85,247', delay: 0.3 },
                        { num: 5, suffix: '+', label: 'AI Applications', color: '236,72,153', delay: 0.35 },
                        { num: 99, suffix: '%', label: 'Commit Rate', color: '245,158,11', delay: 0.4 },
                    ].map(stat => (
                        <div key={stat.label} style={{ gridColumn: 'span 3' }}>
                            <StatBox
                                num={stat.num}
                                suffix={stat.suffix}
                                label={stat.label}
                                color={stat.color}
                                delay={stat.delay}
                                inView={inView}
                            />
                        </div>
                    ))}

                    {/* Quote card — spans 8 cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.45, duration: 0.6 }}
                        style={{
                            gridColumn: 'span 8',
                            padding: '2.5rem',
                            background: 'rgba(255,255,255,0.015)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem',
                        }}
                    >
                        <div style={{
                            width: '3px', alignSelf: 'stretch',
                            background: 'linear-gradient(180deg, #00f5ff, #a855f7)',
                            borderRadius: '2px', flexShrink: 0,
                        }} />
                        <div>
                            <p style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1.1rem',
                                fontStyle: 'italic',
                                color: '#94a3b8',
                                lineHeight: 1.6,
                                marginBottom: '0.75rem',
                            }}>
                                "Good code is like good design — invisible. Users shouldn't think about implementation; they should just experience the result."
                            </p>
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.8rem', color: '#334155',
                            }}>
                                — My Engineering Philosophy
                            </span>
                        </div>
                    </motion.div>

                    {/* Stack preview card — spans 4 cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        style={{
                            gridColumn: 'span 4',
                            padding: '2rem',
                            background: 'rgba(255,255,255,0.015)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '16px',
                        }}
                    >
                        <div style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.72rem', color: '#334155',
                            letterSpacing: '0.15em', textTransform: 'uppercase',
                            marginBottom: '1.25rem',
                        }}>
                            Go-to Stack
                        </div>
                        {[
                            { name: 'Next.js + TypeScript', tag: 'Frontend', color: '#00f5ff' },
                            { name: 'FastAPI + Python', tag: 'Backend', color: '#a855f7' },
                            { name: 'PostgreSQL + Redis', tag: 'Data', color: '#ec4899' },
                        ].map(item => (
                            <div
                                key={item.name}
                                style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '0.6rem 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                                }}
                            >
                                <span style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.875rem', color: '#94a3b8',
                                }}>
                                    {item.name}
                                </span>
                                <span style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.7rem', color: item.color,
                                    background: `rgba(${item.color === '#00f5ff' ? '0,245,255' : item.color === '#a855f7' ? '168,85,247' : '236,72,153'},0.1)`,
                                    padding: '0.2rem 0.6rem', borderRadius: '100px',
                                }}>
                                    {item.tag}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
