import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

export default function Contact() {
    const ref = useRef()
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle')

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            await fetch('https://formspree.io/f/your-form-id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            setStatus('success')
            setForm({ name: '', email: '', message: '' })
        } catch {
            setStatus('error')
        }
        setTimeout(() => setStatus('idle'), 4000)
    }

    const inputStyle = {
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '0.9rem 1.2rem',
        color: '#e2e8f0',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'border-color 0.25s, box-shadow 0.25s',
    }

    const socials = [
        { icon: <FiGithub size={18} />, href: 'https://github.com', color: '#e2e8f0', label: 'GitHub' },
        { icon: <FiLinkedin size={18} />, href: 'https://linkedin.com', color: '#0077b5', label: 'LinkedIn' },
        { icon: <FiTwitter size={18} />, href: 'https://twitter.com', color: '#1da1f2', label: 'Twitter' },
    ]

    return (
        <section
            id="contact"
            ref={ref}
            style={{ padding: '9rem 2rem', position: 'relative', overflow: 'hidden' }}
        >
            {/* bg */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 100%, rgba(0,245,255,0.04) 0%, transparent 60%)',
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
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#00f5ff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            06 / Contact
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    </div>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700, letterSpacing: '-0.04em', color: '#e2e8f0',
                    }}>
                        Let's build something{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>
                            great
                        </span>
                    </h2>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1rem', color: '#475569',
                        marginTop: '1rem', maxWidth: '480px', lineHeight: 1.7,
                    }}>
                        Have a project, opportunity, or just want to say hello? I'm always open to meaningful conversations.
                    </p>
                </motion.div>

                {/* Two column */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
                    {/* Left info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.7 }}
                    >
                        {[
                            { icon: <FiMail size={16} />, label: 'Email', value: 'hroya@email.com', color: '#00f5ff' },
                            { icon: <FiMapPin size={16} />, label: 'Location', value: 'India 🇮🇳', color: '#a855f7' },
                        ].map(item => (
                            <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.75rem' }}>
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '12px',
                                    background: `rgba(${item.color === '#00f5ff' ? '0,245,255' : '168,85,247'},0.08)`,
                                    border: `1px solid rgba(${item.color === '#00f5ff' ? '0,245,255' : '168,85,247'},0.15)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: item.color,
                                }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#334155', marginBottom: '0.15rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                        {item.label}
                                    </div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#94a3b8' }}>
                                        {item.value}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div style={{ marginTop: '3rem' }}>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#334155', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                                Find me on
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {socials.map(s => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={s.label}
                                        style={{
                                            width: '44px', height: '44px', borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.07)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#475569', textDecoration: 'none',
                                            transition: 'all 0.25s ease',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.color = s.color
                                            e.currentTarget.style.borderColor = s.color
                                            e.currentTarget.style.transform = 'translateY(-4px)'
                                            e.currentTarget.style.background = `${s.color}15`
                                            e.currentTarget.style.boxShadow = `0 8px 20px ${s.color}25`
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.color = '#475569'
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                                            e.currentTarget.style.transform = 'none'
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.25, duration: 0.7 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                padding: '3rem',
                                background: 'rgba(255,255,255,0.025)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderRadius: '24px',
                                display: 'flex', flexDirection: 'column', gap: '1.5rem',
                                position: 'relative', overflow: 'hidden',
                            }}
                        >
                            {/* Top accent */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                                background: 'linear-gradient(90deg, transparent 10%, rgba(0,245,255,0.4) 50%, transparent 90%)',
                            }} />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {['name', 'email'].map(field => (
                                    <div key={field}>
                                        <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#475569', marginBottom: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                            {field}
                                        </label>
                                        <input
                                            type={field === 'email' ? 'email' : 'text'}
                                            name={field}
                                            value={form[field]}
                                            onChange={handleChange}
                                            placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
                                            required
                                            style={inputStyle}
                                            onFocus={e => {
                                                e.target.style.borderColor = 'rgba(0,245,255,0.35)'
                                                e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.06)'
                                            }}
                                            onBlur={e => {
                                                e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                                                e.target.style.boxShadow = 'none'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#475569', marginBottom: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or idea..."
                                    required
                                    rows={5}
                                    style={{ ...inputStyle, resize: 'vertical' }}
                                    onFocus={e => {
                                        e.target.style.borderColor = 'rgba(0,245,255,0.35)'
                                        e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.06)'
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                                    padding: '1rem 2rem',
                                    background: status === 'success' ? 'linear-gradient(135deg, #10b981, #059669)'
                                        : status === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                            : 'linear-gradient(135deg, #00f5ff, #a855f7)',
                                    color: '#030712',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.9rem', fontWeight: 600,
                                    border: 'none', borderRadius: '12px',
                                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 0 40px rgba(0,245,255,0.2)',
                                    opacity: status === 'sending' ? 0.7 : 1,
                                    letterSpacing: '0.02em',
                                }}
                                onMouseEnter={e => {
                                    if (status !== 'sending') {
                                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                                        e.currentTarget.style.boxShadow = '0 0 60px rgba(0,245,255,0.4), 0 16px 40px rgba(0,0,0,0.3)'
                                    }
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'none'
                                    e.currentTarget.style.boxShadow = '0 0 40px rgba(0,245,255,0.2)'
                                }}
                            >
                                <FiSend size={16} />
                                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent 🎉' : status === 'error' ? 'Error — Try Again' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
