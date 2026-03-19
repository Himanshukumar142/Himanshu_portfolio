import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiZap, FiCode, FiLayers, FiGithub, FiExternalLink } from 'react-icons/fi'
import {
    SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiTypescript, SiDocker,
} from 'react-icons/si'

/* ─── Floating project preview card ─── */
function ProjectCard({ style, delay, title, tag, tagColor, meta, items }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '18px',
                padding: '1.5rem',
                minWidth: '260px',
                ...style,
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: '#94a3b8' }}>
                    {title}
                </span>
                <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.65rem',
                    color: tagColor, background: `${tagColor}18`,
                    border: `1px solid ${tagColor}35`,
                    padding: '0.2rem 0.6rem', borderRadius: '100px',
                }}>
                    {tag}
                </span>
            </div>
            {items.map((item, i) => (
                <div
                    key={i}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        background: i === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.025)',
                        borderRadius: '10px',
                        marginBottom: i < items.length - 1 ? '0.5rem' : 0,
                        border: i === 0 ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                        <div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: '#e2e8f0' }}>
                                {item.label}
                            </div>
                            {item.sub && (
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: '#475569' }}>
                                    {item.sub}
                                </div>
                            )}
                        </div>
                    </div>
                    {item.badge && (
                        <span style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '0.62rem',
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
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: '#334155', marginTop: '1rem' }}>
                {meta}
            </div>
        </motion.div>
    )
}

const techLogos = [
    { name: 'React', icon: <SiReact size={20} />, color: '#61dafb' },
    { name: 'Next.js', icon: <SiNextdotjs size={20} />, color: '#e2e8f0' },
    { name: 'Node.js', icon: <SiNodedotjs size={20} />, color: '#68a063' },
    { name: 'Python', icon: <SiPython size={20} />, color: '#3776ab' },
    { name: 'TypeScript', icon: <SiTypescript size={20} />, color: '#3178c6' },
    { name: 'Docker', icon: <SiDocker size={20} />, color: '#2496ed' },
]

export default function Hero() {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section
            id="hero"
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
            {/* ─── Background: dual orbs ─── */}
            {/* Left warm orange orb */}
            <div style={{
                position: 'absolute',
                top: '-10%', left: '-12%',
                width: '55vw', height: '75vh',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(234,88,12,0.55) 0%, rgba(180,40,10,0.3) 35%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
            }} />
            {/* Right violet orb */}
            <div style={{
                position: 'absolute',
                top: '-10%', right: '-12%',
                width: '55vw', height: '75vh',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.65) 0%, rgba(109,40,217,0.35) 35%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
            }} />

            {/* ─── Dot grid ─── */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 1,
            }} />

            {/* ─── Dark bottom gradient ─── */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '55%',
                background: 'linear-gradient(to bottom, transparent, #0d0818 85%)',
                pointerEvents: 'none', zIndex: 2,
            }} />

            {/* ─── HERO CONTENT ─── */}
            <div style={{
                position: 'relative', zIndex: 10,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '10rem 2rem 3rem',
                width: '100%', maxWidth: '860px',
                margin: '0 auto',
            }}>

                {/* Badge pill */}
                <motion.div
                    initial={{ opacity: 0, y: -16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.45rem 1.1rem 0.45rem 0.7rem',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(12px)',
                        marginBottom: '2.5rem',
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
                        Available for work · Full Stack Developer
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(3rem, 7.5vw, 6rem)',
                        fontWeight: 700,
                        lineHeight: 1.08,
                        letterSpacing: '-0.04em',
                        marginBottom: '1.5rem',
                        color: '#f1f5f9',
                    }}
                >
                    {'Hi, I\'m '}
                    <span style={{
                        background: 'linear-gradient(135deg, #f97316 10%, #ec4899 50%, #a855f7 80%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Himanshu
                    </span>
                    <br />
                    <span style={{ color: '#94a3b8', fontWeight: 500 }}>
                        I Build Digital Products.
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.9rem, 1.8vw, 1.08rem)',
                        color: '#64748b',
                        lineHeight: 1.75,
                        maxWidth: '520px',
                        marginBottom: '2.75rem',
                    }}
                >
                    From pixel-perfect frontends to scalable backends and AI-powered systems — I engineer experiences that are fast, beautiful, and built to last.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    {/* Primary — pill with glow */}
                    <button
                        onClick={() => scrollTo('projects')}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.85rem 2.4rem',
                            borderRadius: '999px',
                            background: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)',
                            backgroundSize: '200%',
                            color: '#fff',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '0.95rem', fontWeight: 600,
                            border: 'none', cursor: 'pointer',
                            boxShadow: '0 0 40px rgba(249,115,22,0.35), 0 0 80px rgba(168,85,247,0.15)',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.02em',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'
                            e.currentTarget.style.boxShadow = '0 0 60px rgba(249,115,22,0.5), 0 0 100px rgba(168,85,247,0.25), 0 20px 40px rgba(0,0,0,0.4)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'none'
                            e.currentTarget.style.boxShadow = '0 0 40px rgba(249,115,22,0.35), 0 0 80px rgba(168,85,247,0.15)'
                        }}
                    >
                        View My Work <FiArrowRight size={16} />
                    </button>

                    {/* Secondary */}
                    <a
                        href="/resume.pdf"
                        download
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.85rem 2rem',
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
                        Download Resume
                    </a>
                </motion.div>

                {/* ─── Tech logos row ─── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                    style={{
                        marginTop: '3.5rem',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
                    }}
                >
                    <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.72rem', color: '#334155',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                    }}>
                        My go-to stack
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {techLogos.map((tech) => (
                            <div
                                key={tech.name}
                                title={tech.name}
                                style={{
                                    color: '#334155',
                                    transition: 'color 0.2s, transform 0.2s',
                                    cursor: 'default',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = tech.color
                                    e.currentTarget.style.transform = 'translateY(-3px)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = '#334155'
                                    e.currentTarget.style.transform = 'none'
                                }}
                            >
                                {tech.icon}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ─── FLOATING CARDS BELOW ─── */}
            <div style={{
                position: 'relative', zIndex: 10,
                width: '100%', maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 2rem 5rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.25rem',
                alignItems: 'start',
            }}>
                {/* LEFT card — Latest Project */}
                <ProjectCard
                    delay={1.0}
                    title="Latest Project"
                    tag="Live"
                    tagColor="#00f5ff"
                    meta="Deployed on Vercel · Updated 2 days ago"
                    items={[
                        { icon: '🤖', label: 'Resume ATS Scorer', sub: 'AI-powered resume analysis', badge: 'Featured', badgeColor: '#00f5ff' },
                        { icon: '🛒', label: 'Labour Finder Platform', sub: 'Full marketplace system', badge: 'Shipped', badgeColor: '#a855f7' },
                        { icon: '💬', label: 'AI Code Assistant', sub: 'LangChain + OpenAI', badge: 'In dev', badgeColor: '#f97316' },
                    ]}
                    style={{
                        boxShadow: '0 0 0 1px rgba(249,115,22,0.12), 0 30px 80px rgba(249,115,22,0.08)',
                    }}
                />

                {/* RIGHT card — Skills snapshot */}
                <ProjectCard
                    delay={1.15}
                    title="Skills snapshot"
                    tag="2026"
                    tagColor="#a855f7"
                    meta="5+ AI apps · 15+ projects shipped · 2 years building"
                    items={[
                        { icon: '⚡', label: 'Full Stack Development', sub: 'React · Next.js · Node.js · FastAPI', badge: 'Expert', badgeColor: '#00f5ff' },
                        { icon: '🧠', label: 'AI & LLM Integration', sub: 'LangChain · OpenAI · Gemini', badge: 'Advanced', badgeColor: '#a855f7' },
                        { icon: '🐳', label: 'DevOps & Cloud', sub: 'Docker · Kubernetes · Vercel', badge: 'Proficient', badgeColor: '#10b981' },
                    ]}
                    style={{
                        boxShadow: '0 0 0 1px rgba(139,92,246,0.15), 0 30px 80px rgba(139,92,246,0.08)',
                    }}
                />
            </div>
        </section>
    )
}
