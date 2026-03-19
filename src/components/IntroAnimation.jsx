import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Split text into characters for animation
function SplitText({ text, className, delay = 0, style = {} }) {
    const chars = text.split('')
    return (
        <span className={className} style={{ ...style, display: 'inline-block' }}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    )
}

export default function IntroAnimation({ onComplete }) {
    const [phase, setPhase] = useState('enter') // enter → exit
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        // Count 0→100 fast
        let start = 0
        const interval = setInterval(() => {
            start += Math.floor(Math.random() * 8) + 3
            if (start >= 100) {
                setCounter(100)
                clearInterval(interval)
                setTimeout(() => setPhase('exit'), 400)
            } else {
                setCounter(start)
            }
        }, 25)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (phase === 'exit') {
            setTimeout(onComplete, 900)
        }
    }, [phase, onComplete])

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    key="intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    onAnimationComplete={() => { if (phase === 'exit') setPhase('done') }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99990,
                        background: '#030712',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {/* Grid lines */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }} />

                    {/* Radial glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        style={{
                            position: 'absolute',
                            width: '600px', height: '600px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)',
                            filter: 'blur(40px)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Corner brackets */}
                    {[
                        { top: '10%', left: '8%', rotate: '0deg' },
                        { top: '10%', right: '8%', rotate: '90deg' },
                        { bottom: '10%', left: '8%', rotate: '-90deg' },
                        { bottom: '10%', right: '8%', rotate: '180deg' },
                    ].map((pos, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.4, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                            style={{
                                position: 'absolute',
                                width: '40px', height: '40px',
                                borderTop: '1px solid rgba(0,245,255,0.5)',
                                borderLeft: '1px solid rgba(0,245,255,0.5)',
                                transform: `rotate(${pos.rotate})`,
                                ...pos,
                            }}
                        />
                    ))}

                    {/* Main content */}
                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                        {/* Overline */}
                        <motion.div
                            initial={{ opacity: 0, letterSpacing: '0.5em' }}
                            animate={{ opacity: 1, letterSpacing: '0.3em' }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.7rem',
                                color: '#00f5ff',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                marginBottom: '2rem',
                            }}
                        >
                            Portfolio — Full Stack Developer & AI Builder
                        </motion.div>

                        {/* Big name */}
                        <div
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(4rem, 12vw, 9rem)',
                                fontWeight: 700,
                                lineHeight: 0.95,
                                letterSpacing: '-0.04em',
                                perspective: '800px',
                                perspectiveOrigin: 'center',
                            }}
                        >
                            <div style={{ overflow: 'hidden', display: 'block' }}>
                                <SplitText
                                    text="HIMANSHU"
                                    delay={0.2}
                                    style={{
                                        background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 60%, #475569 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Shimmer line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                height: '1px',
                                background: 'linear-gradient(90deg, transparent, #00f5ff, #a855f7, transparent)',
                                margin: '1.5rem auto',
                                maxWidth: '400px',
                                transformOrigin: 'left',
                            }}
                        />

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.9rem',
                                color: '#475569',
                                letterSpacing: '0.1em',
                            }}
                        >
                            AI Builder · Full Stack Engineer · Product Thinker
                        </motion.p>
                    </div>

                    {/* Counter bottom-left */}
                    <div style={{
                        position: 'absolute',
                        bottom: '2.5rem',
                        left: '2.5rem',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.8rem',
                        color: '#334155',
                        letterSpacing: '0.05em',
                    }}>
                        Loading... <span style={{ color: '#00f5ff' }}>{counter}%</span>
                    </div>

                    {/* Skip bottom-right */}
                    <button
                        onClick={() => { setPhase('exit') }}
                        style={{
                            position: 'absolute',
                            bottom: '2.5rem',
                            right: '2.5rem',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#475569',
                            padding: '0.4rem 1.2rem',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: '0.1em',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                            e.target.style.borderColor = 'rgba(0,245,255,0.4)'
                            e.target.style.color = '#00f5ff'
                        }}
                        onMouseLeave={e => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                            e.target.style.color = '#475569'
                        }}
                    >
                        SKIP
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
