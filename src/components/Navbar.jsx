import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    // Scroll state & progress
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60)
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Active section via IntersectionObserver
    useEffect(() => {
        const observers = []
        links.forEach(link => {
            const el = document.getElementById(link.toLowerCase())
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(link) },
                { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
            )
            obs.observe(el)
            observers.push(obs)
        })
        return () => observers.forEach(o => o.disconnect())
    }, [])

    const scrollTo = (e, id) => {
        e.preventDefault()
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
        setMobileOpen(false)
    }

    return (
        <>
            <motion.nav
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0,
                    zIndex: 1000,
                    transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
                    background: scrolled ? 'rgba(3,7,18,0.82)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
                }}
            >
                <div style={{
                    maxWidth: '1300px', margin: '0 auto',
                    padding: '0.9rem 2rem',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    {/* ── Logo ── */}
                    <a
                        href="#"
                        onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.55rem' }}
                    >
                        <div style={{
                            width: '34px', height: '34px',
                            borderRadius: '9px',
                            background: 'linear-gradient(135deg, #f97316, #a855f7)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '0.95rem', fontWeight: 800,
                            color: '#fff',
                            boxShadow: '0 0 18px rgba(168,85,247,0.3)',
                        }}>H</div>
                        <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1rem', fontWeight: 600,
                            color: '#e2e8f0', letterSpacing: '-0.02em',
                        }}>
                            Himanshu
                        </span>
                    </a>

                    {/* ── Desktop links ── */}
                    <div style={{
                        display: 'flex', gap: '0.15rem',
                        padding: '0.35rem',
                        borderRadius: '999px',
                        background: scrolled ? 'rgba(255,255,255,0.04)' : 'transparent',
                        border: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
                        transition: 'all 0.4s ease',
                    }}
                        className="desktop-nav"
                    >
                        {links.map(link => (
                            <NavLink
                                key={link}
                                label={link}
                                isActive={activeSection === link}
                                onScroll={scrollTo}
                            />
                        ))}
                    </div>

                    {/* ── Right: Resume + Hamburger ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <a
                            href="/Himanshu_Resume.pdf"
                            download
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.82rem', fontWeight: 600,
                                color: '#0a0a0a',
                                background: 'linear-gradient(135deg, #f97316, #a855f7)',
                                padding: '0.52rem 1.4rem',
                                borderRadius: '999px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 0 22px rgba(249,115,22,0.25)',
                                letterSpacing: '0.02em',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'
                                e.currentTarget.style.boxShadow = '0 0 40px rgba(249,115,22,0.45)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'none'
                                e.currentTarget.style.boxShadow = '0 0 22px rgba(249,115,22,0.25)'
                            }}
                        >
                            Resume ↗
                        </a>
                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(o => !o)}
                            style={{
                                display: 'none',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#94a3b8',
                                padding: '0.45rem',
                                cursor: 'pointer',
                                alignItems: 'center', justifyContent: 'center',
                            }}
                            className="hamburger-btn"
                        >
                            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    </div>
                </div>

                {/* ── Scroll progress bar ── */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: '1.5px',
                    width: `${scrollProgress}%`,
                    background: 'linear-gradient(90deg, #f97316, #ec4899, #a855f7)',
                    transition: 'width 0.1s linear',
                    boxShadow: '0 0 8px rgba(249,115,22,0.5)',
                }} />
            </motion.nav>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{
                            position: 'fixed', top: '64px', left: 0, right: 0,
                            zIndex: 999,
                            background: 'rgba(3,7,18,0.96)',
                            backdropFilter: 'blur(24px)',
                            borderBottom: '1px solid rgba(255,255,255,0.07)',
                            padding: '1.5rem 2rem',
                            display: 'flex', flexDirection: 'column', gap: '0.4rem',
                        }}
                    >
                        {links.map((link, i) => (
                            <motion.a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                onClick={e => scrollTo(e, link)}
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '1.1rem', fontWeight: 500,
                                    color: activeSection === link ? '#f97316' : '#94a3b8',
                                    textDecoration: 'none',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '10px',
                                    background: activeSection === link ? 'rgba(249,115,22,0.08)' : 'transparent',
                                    borderLeft: activeSection === link ? '2px solid #f97316' : '2px solid transparent',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {link}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .hamburger-btn { display: flex !important; }
                }
            `}</style>
        </>
    )
}

function NavLink({ label, isActive, onScroll }) {
    const [hovered, setHovered] = useState(false)
    const lit = isActive || hovered
    return (
        <a
            href={`#${label.toLowerCase()}`}
            onClick={e => onScroll(e, label)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.83rem',
                fontWeight: lit ? 500 : 400,
                color: isActive ? '#f1f5f9' : hovered ? '#cbd5e1' : '#64748b',
                textDecoration: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                background: isActive
                    ? 'rgba(249,115,22,0.1)'
                    : hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
                transition: 'all 0.22s ease',
                letterSpacing: '0.01em',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
            }}
        >
            {isActive && (
                <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f97316, #a855f7)',
                    flexShrink: 0,
                    boxShadow: '0 0 6px rgba(249,115,22,0.7)',
                }} />
            )}
            {label}
        </a>
    )
}
