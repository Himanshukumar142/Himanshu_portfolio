import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiArrowRight, FiZap, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'
import {
    SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiTypescript, SiDocker,
} from 'react-icons/si'

/* ─── Particle Star Canvas ─── */
function StarField() {
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        const stars = []
        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)
        for (let i = 0; i < 120; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.2 + 0.2,
                alpha: Math.random(),
                speed: Math.random() * 0.004 + 0.001,
                phase: Math.random() * Math.PI * 2,
            })
        }
        const draw = (t) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (const s of stars) {
                const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * s.speed + s.phase))
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${pulse * 0.7})`
                ctx.fill()
            }
            animId = requestAnimationFrame(draw)
        }
        animId = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])
    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                pointerEvents: 'none', zIndex: 0,
            }}
        />
    )
}

/* ─── Typing Role Effect ─── */
const roles = [
    'Full Stack Developer',
    'AI Integration Engineer',
    'React & Next.js Expert',
    'Backend Architect',
    'Open Source Builder',
]
function TypingRole() {
    const [displayed, setDisplayed] = useState('')
    const [roleIdx, setRoleIdx] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    useEffect(() => {
        const current = roles[roleIdx]
        let timeout
        if (!isDeleting && displayed === current) {
            timeout = setTimeout(() => setIsDeleting(true), 1800)
        } else if (isDeleting && displayed === '') {
            setIsDeleting(false)
            setRoleIdx((i) => (i + 1) % roles.length)
        } else {
            const speed = isDeleting ? 40 : 70
            timeout = setTimeout(() => {
                setDisplayed(isDeleting
                    ? current.slice(0, displayed.length - 1)
                    : current.slice(0, displayed.length + 1))
            }, speed)
        }
        return () => clearTimeout(timeout)
    }, [displayed, isDeleting, roleIdx])

    return (
        <span style={{ color: '#e2e8f0', fontWeight: 500 }}>
            {displayed}
            <span style={{
                display: 'inline-block', width: '2px', height: '1.1em',
                background: 'linear-gradient(135deg,#f97316,#a855f7)',
                marginLeft: '2px', verticalAlign: 'middle',
                animation: 'blink 0.9s step-end infinite',
            }} />
        </span>
    )
}

/* ─── Animated stat counter ─── */
function StatCounter({ end, label, suffix = '' }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true
                let start = 0
                const step = end / 60
                const id = setInterval(() => {
                    start += step
                    if (start >= end) { setCount(end); clearInterval(id) }
                    else setCount(Math.floor(start))
                }, 16)
            }
        })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [end])
    return (
        <div ref={ref} style={{ textAlign: 'center' }}>
            <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg,#f97316,#a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>
                {count}{suffix}
            </div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: '#475569', marginTop: '0.2rem', letterSpacing: '0.04em' }}>
                {label}
            </div>
        </div>
    )
}

/* ─── 3-D Tilt Card ─── */
function TiltCard({ children, style }) {
    const ref = useRef(null)
    const rotX = useMotionValue(0)
    const rotY = useMotionValue(0)
    const sRotX = useSpring(rotX, { stiffness: 200, damping: 20 })
    const sRotY = useSpring(rotY, { stiffness: 200, damping: 20 })

    const onMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        rotX.set(((e.clientY - cy) / (rect.height / 2)) * -8)
        rotY.set(((e.clientX - cx) / (rect.width / 2)) * 8)
    }
    const onLeave = () => { rotX.set(0); rotY.set(0) }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{
                rotateX: sRotX,
                rotateY: sRotY,
                transformStyle: 'preserve-3d',
                ...style,
            }}
        >
            {children}
        </motion.div>
    )
}

/* ─── Project / Skills card ─── */
function ProjectCard({ delay, title, tag, tagColor, meta, items, style }) {
    return (
        <TiltCard style={style}>
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    minWidth: '260px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* shimmer sweep */}
                <div style={{
                    position: 'absolute', top: 0, left: '-60%',
                    width: '40%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
                    transform: 'skewX(-15deg)',
                    animation: 'shimmer-sweep 4s ease-in-out infinite',
                    pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.78rem', fontWeight: 500, color: '#94a3b8' }}>
                        {title}
                    </span>
                    <span style={{
                        fontFamily: "'Inter',sans-serif", fontSize: '0.65rem',
                        color: tagColor, background: `${tagColor}18`,
                        border: `1px solid ${tagColor}35`,
                        padding: '0.2rem 0.6rem', borderRadius: '100px',
                    }}>
                        {tag}
                    </span>
                </div>

                {items.map((item, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        background: i === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.025)',
                        borderRadius: '12px',
                        marginBottom: i < items.length - 1 ? '0.5rem' : 0,
                        border: i === 0 ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                        transition: 'background 0.2s',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                            <div>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.78rem', fontWeight: 500, color: '#e2e8f0' }}>{item.label}</div>
                                {item.sub && <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.65rem', color: '#475569' }}>{item.sub}</div>}
                            </div>
                        </div>
                        {item.badge && (
                            <span style={{
                                fontFamily: "'Inter',sans-serif", fontSize: '0.62rem',
                                color: item.badgeColor || '#00f5ff',
                                background: `${item.badgeColor || '#00f5ff'}15`,
                                border: `1px solid ${item.badgeColor || '#00f5ff'}30`,
                                padding: '0.15rem 0.55rem', borderRadius: '100px',
                            }}>
                                {item.badge}
                            </span>
                        )}
                    </div>
                ))}
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.65rem', color: '#334155', marginTop: '1rem' }}>{meta}</div>
            </motion.div>
        </TiltCard>
    )
}

const techLogos = [
    { name: 'React', icon: <SiReact size={22} />, color: '#61dafb' },
    { name: 'Next.js', icon: <SiNextdotjs size={22} />, color: '#e2e8f0' },
    { name: 'Node.js', icon: <SiNodedotjs size={22} />, color: '#68a063' },
    { name: 'Python', icon: <SiPython size={22} />, color: '#3776ab' },
    { name: 'TypeScript', icon: <SiTypescript size={22} />, color: '#3178c6' },
    { name: 'Docker', icon: <SiDocker size={22} />, color: '#2496ed' },
]

const socials = [
    { icon: <FiGithub size={18} />, href: 'https://github.com/Himanshukumar142', label: 'GitHub' },
    { icon: <FiLinkedin size={18} />, href: 'https://linkedin.com/in/himanshu-kumar-22a0ba239', label: 'LinkedIn' },
    { icon: <FiMail size={18} />, href: 'mailto:hrkhimanshu142@gmail.com', label: 'Email' },
]

export default function Hero() {
    const sectionRef = useRef(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const orbX = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), { stiffness: 60, damping: 20 })
    const orbY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), { stiffness: 60, damping: 20 })
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    const onMouseMove = useCallback((e) => {
        const rect = sectionRef.current?.getBoundingClientRect()
        if (!rect) return
        mouseX.set((e.clientX - rect.left) / rect.width)
        mouseY.set((e.clientY - rect.top) / rect.height)
    }, [mouseX, mouseY])

    return (
        <section
            ref={sectionRef}
            id="hero"
            onMouseMove={onMouseMove}
            style={{
                minHeight: '100vh',
                background: '#0d0818',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* ─── Star field ─── */}
            <StarField />

            {/* ─── Background: parallax orbs ─── */}
            <motion.div
                style={{
                    x: orbX, y: orbY,
                    position: 'absolute',
                    top: '-10%', left: '-12%',
                    width: '58vw', height: '78vh',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(234,88,12,0.5) 0%, rgba(180,40,10,0.25) 35%, transparent 70%)',
                    filter: 'blur(70px)',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />
            <motion.div
                style={{
                    x: useSpring(useTransform(mouseX, [0, 1], [30, -30]), { stiffness: 60, damping: 20 }),
                    y: useSpring(useTransform(mouseY, [0, 1], [20, -20]), { stiffness: 60, damping: 20 }),
                    position: 'absolute',
                    top: '-10%', right: '-12%',
                    width: '58vw', height: '78vh',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(109,40,217,0.3) 35%, transparent 70%)',
                    filter: 'blur(70px)',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            {/* ─── Subtle grid overlay ─── */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 2,
            }} />

            {/* ─── Dark bottom gradient ─── */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '55%',
                background: 'linear-gradient(to bottom, transparent, #0d0818 85%)',
                pointerEvents: 'none', zIndex: 3,
            }} />

            {/* ═══ HERO CONTENT ═══ */}
            <div style={{
                position: 'relative', zIndex: 10,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '10rem 2rem 3rem',
                width: '100%', maxWidth: '900px',
                margin: '0 auto',
            }}>

                {/* ── Availability badge ── */}
                <motion.div
                    initial={{ opacity: 0, y: -16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.4rem 1.1rem 0.4rem 0.6rem',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(12px)',
                        marginBottom: '2rem',
                    }}
                >
                    <span style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f97316, #a855f7)',
                        fontSize: '0.65rem',
                    }}>
                        <FiZap size={11} color="#fff" />
                    </span>
                    <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '0.8rem',
                        color: '#cbd5e1', letterSpacing: '0.02em',
                    }}>
                        Open to opportunities · Full Stack Developer
                    </span>
                    {/* pulsing dot */}
                    <span style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: '#22c55e',
                        boxShadow: '0 0 0 0 rgba(34,197,94,0.6)',
                        animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
                        display: 'inline-block',
                    }} />
                </motion.div>

                {/* ── Headline ── */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2.8rem, 7.5vw, 5.8rem)',
                        fontWeight: 800,
                        lineHeight: 1.06,
                        letterSpacing: '-0.04em',
                        marginBottom: '1rem',
                        color: '#f1f5f9',
                    }}
                >
                    {'Hi, I\'m '}
                    {/* animated gradient name */}
                    <span style={{
                        background: 'linear-gradient(135deg, #f97316 0%, #ec4899 45%, #a855f7 80%, #f97316 100%)',
                        backgroundSize: '300% 300%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'grad-shift 5s ease infinite',
                    }}>
                        Himanshu
                    </span>
                </motion.h1>

                {/* ── Typing role line ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.65 }}
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                        fontWeight: 400,
                        color: '#64748b',
                        marginBottom: '1.5rem',
                        minHeight: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <span style={{ color: '#475569' }}>{'//  '}</span>
                    <TypingRole />
                </motion.div>

                {/* ── Subtitle ── */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.88rem, 1.7vw, 1.05rem)',
                        color: '#64748b',
                        lineHeight: 1.8,
                        maxWidth: '500px',
                        marginBottom: '2.5rem',
                    }}
                >
                    From pixel-perfect frontends to scalable backends and AI-powered systems — I craft experiences that are{' '}
                    <span style={{ color: '#94a3b8', fontWeight: 500 }}>fast, beautiful,</span> and built to last.
                </motion.p>

                {/* ── CTA buttons ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                    style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.25rem' }}
                >
                    {/* Primary */}
                    <button
                        onClick={() => scrollTo('projects')}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.9rem 2.4rem',
                            borderRadius: '999px',
                            background: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)',
                            backgroundSize: '200%',
                            color: '#fff',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '0.95rem', fontWeight: 600,
                            border: 'none', cursor: 'pointer',
                            boxShadow: '0 0 40px rgba(249,115,22,0.3), 0 0 80px rgba(168,85,247,0.12)',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.02em',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)'
                            e.currentTarget.style.boxShadow = '0 0 60px rgba(249,115,22,0.5), 0 0 100px rgba(168,85,247,0.25), 0 20px 40px rgba(0,0,0,0.4)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'none'
                            e.currentTarget.style.boxShadow = '0 0 40px rgba(249,115,22,0.3), 0 0 80px rgba(168,85,247,0.12)'
                        }}
                    >
                        View My Work <FiArrowRight size={16} />
                    </button>

                    {/* Secondary — download resume */}
                    <a
                        href="/resume.pdf"
                        download
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.9rem 2rem',
                            borderRadius: '999px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: '#94a3b8',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '0.95rem', fontWeight: 500,
                            textDecoration: 'none',
                            backdropFilter: 'blur(12px)',
                            transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                            e.currentTarget.style.color = '#e2e8f0'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                            e.currentTarget.style.color = '#94a3b8'
                            e.currentTarget.style.transform = 'none'
                        }}
                    >
                        <FiDownload size={16} /> Resume
                    </a>
                </motion.div>

                {/* ── Social icons ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem' }}
                >
                    {socials.map(({ icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={label}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '42px', height: '42px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#64748b',
                                transition: 'all 0.25s ease',
                                backdropFilter: 'blur(10px)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(249,115,22,0.12)'
                                e.currentTarget.style.borderColor = 'rgba(249,115,22,0.35)'
                                e.currentTarget.style.color = '#f97316'
                                e.currentTarget.style.transform = 'translateY(-3px)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                                e.currentTarget.style.color = '#64748b'
                                e.currentTarget.style.transform = 'none'
                            }}
                        >
                            {icon}
                        </a>
                    ))}
                </motion.div>

                {/* ── Stats row ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                    style={{
                        display: 'flex', gap: '3rem', alignItems: 'center',
                        padding: '1.5rem 3rem',
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(20px)',
                        marginBottom: '3rem',
                        flexWrap: 'wrap', justifyContent: 'center',
                    }}
                >
                    <StatCounter end={15} label="Projects Shipped" suffix="+" />
                    <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.07)' }} />
                    <StatCounter end={5} label="AI Apps Built" suffix="+" />
                    <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.07)' }} />
                    <StatCounter end={2} label="Years Building" suffix="+" />
                    <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.07)' }} />
                    <StatCounter end={100} label="Happy with Quality" suffix="%" />
                </motion.div>

                {/* ── Tech stack row ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.05, duration: 0.7 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                >
                    <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.7rem', color: '#334155',
                        letterSpacing: '0.16em', textTransform: 'uppercase',
                    }}>
                        My go-to stack
                    </div>
                    <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {techLogos.map((tech) => (
                            <div
                                key={tech.name}
                                title={tech.name}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
                                    color: '#334155',
                                    transition: 'color 0.2s, transform 0.25s',
                                    cursor: 'default',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = tech.color
                                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.15)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = '#334155'
                                    e.currentTarget.style.transform = 'none'
                                }}
                            >
                                {tech.icon}
                                <span style={{ fontSize: '0.58rem', letterSpacing: '0.06em', fontFamily: "'Inter',sans-serif" }}>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ═══ FLOATING CARDS ═══ */}
            <div style={{
                position: 'relative', zIndex: 10,
                width: '100%', maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 2rem 6rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                alignItems: 'start',
                perspective: '1000px',
            }}>
                <ProjectCard
                    delay={1.1}
                    title="Latest Projects"
                    tag="Live"
                    tagColor="#00f5ff"
                    meta="Deployed on Vercel · Updated recently"
                    items={[
                        { icon: '🤖', label: 'Resume ATS Scorer', sub: 'AI-powered resume analysis', badge: 'Featured', badgeColor: '#00f5ff' },
                        { icon: '🛒', label: 'Labour Finder Platform', sub: 'Full marketplace system', badge: 'Shipped', badgeColor: '#a855f7' },
                        { icon: '💬', label: 'AI Code Assistant', sub: 'LangChain + OpenAI', badge: 'In dev', badgeColor: '#f97316' },
                    ]}
                    style={{ boxShadow: '0 0 0 1px rgba(249,115,22,0.1), 0 40px 100px rgba(249,115,22,0.07)' }}
                />

                <ProjectCard
                    delay={1.25}
                    title="Skills Snapshot"
                    tag="2026"
                    tagColor="#a855f7"
                    meta="5+ AI apps · 15+ projects shipped · 2 years building"
                    items={[
                        { icon: '⚡', label: 'Full Stack Development', sub: 'React · Next.js · Node.js · FastAPI', badge: 'Expert', badgeColor: '#00f5ff' },
                        { icon: '🧠', label: 'AI & LLM Integration', sub: 'LangChain · OpenAI · Gemini', badge: 'Advanced', badgeColor: '#a855f7' },
                        { icon: '🐳', label: 'DevOps & Cloud', sub: 'Docker · Kubernetes · Vercel', badge: 'Proficient', badgeColor: '#10b981' },
                    ]}
                    style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.12), 0 40px 100px rgba(139,92,246,0.07)' }}
                />
            </div>

            {/* ─── Scroll indicator ─── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                style={{
                    position: 'absolute', bottom: '2rem', left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                    zIndex: 10,
                }}
            >
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.65rem', color: '#334155', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
                <div style={{
                    width: '22px', height: '36px',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    display: 'flex', justifyContent: 'center', paddingTop: '6px',
                }}>
                    <div style={{
                        width: '4px', height: '8px',
                        borderRadius: '2px',
                        background: 'linear-gradient(180deg, #f97316, #a855f7)',
                        animation: 'scroll-dot 1.6s ease-in-out infinite',
                    }} />
                </div>
            </motion.div>
        </section>
    )
}
