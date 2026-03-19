import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (e, id) => {
        e.preventDefault()
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 1000,
                padding: '1.2rem 0',
                transition: 'all 0.4s ease',
                background: scrolled ? 'rgba(3, 7, 18, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}
        >
            <div style={{
                maxWidth: '1300px',
                margin: '0 auto',
                padding: '0 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <a
                    href="#"
                    onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <div style={{
                        width: '32px', height: '32px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.9rem', fontWeight: 700,
                        color: '#030712',
                    }}>H</div>
                    <span style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1rem', fontWeight: 600,
                        color: '#e2e8f0', letterSpacing: '-0.02em',
                    }}>
                        Himanshu
                    </span>
                </a>

                {/* Center links */}
                <div style={{
                    display: 'flex',
                    gap: '0.25rem',
                    padding: '0.4rem',
                    borderRadius: '999px',
                    background: scrolled ? 'rgba(255,255,255,0.04)' : 'transparent',
                    border: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                    {links.map(link => (
                        <NavLink key={link} label={link} active={active === link} onScroll={scrollTo} />
                    ))}
                </div>

                {/* Right CTA */}
                <a
                    href="/resume.pdf"
                    download
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        color: '#030712',
                        background: 'linear-gradient(135deg, #00f5ff, #7a1bf7ff)',
                        padding: '0.55rem 1.4rem',
                        borderRadius: '999px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 20px rgba(0,245,255,0.2)',
                        letterSpacing: '0.02em',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(0,245,255,0.4)'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,255,0.2)'
                        e.currentTarget.style.transform = 'translateY(0)'
                    }}
                >
                    Resume ↗
                </a>
            </div>
        </motion.nav>
    )
}

function NavLink({ label, active, onScroll }) {
    const [hovered, setHovered] = useState(false)
    return (
        <a
            href={`#${label.toLowerCase()}`}
            onClick={e => onScroll(e, label)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem',
                fontWeight: hovered || active ? 500 : 400,
                color: hovered || active ? '#e2e8f0' : '#64748b',
                textDecoration: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                background: hovered || active ? 'rgba(255,255,255,0.07)' : 'transparent',
                transition: 'all 0.2s ease',
                letterSpacing: '0.01em',
            }}
        >
            {label}
        </a>
    )
}
