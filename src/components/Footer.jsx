import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{
                padding: '3rem 2rem',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 150%, rgba(0,245,255,0.03) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: '1300px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
            }}>
                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '28px', height: '28px', borderRadius: '7px',
                        background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.8rem', fontWeight: 700, color: '#030712',
                    }}>H</div>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>
                        roya
                    </span>
                </div>

                {/* Center */}
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#1e293b', textAlign: 'center' }}>
                    © {new Date().getFullYear()} Hroya · Built with React, Three.js & Framer Motion
                </div>

                {/* Socials */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {[
                        { icon: <FiGithub size={16} />, href: 'https://github.com' },
                        { icon: <FiLinkedin size={16} />, href: 'https://linkedin.com' },
                        { icon: <FiTwitter size={16} />, href: 'https://twitter.com' },
                    ].map((s, i) => (
                        <a
                            key={i}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#1e293b',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#00f5ff'}
                            onMouseLeave={e => e.currentTarget.style.color = '#1e293b'}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>
        </motion.footer>
    )
}
