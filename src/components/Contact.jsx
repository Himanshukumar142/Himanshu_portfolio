import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin, FiCheck, FiAlertCircle, FiClock, FiUser, FiMessageSquare, FiType } from 'react-icons/fi'

// ── EmailJS Config ── Replace with your values from https://dashboard.emailjs.com
const EMAILJS_SERVICE_ID = 'service_3wimech'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_px72re3'  // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY = '3Pu9a9VyxaZ9uzqVE'   // e.g. 'aBcDeFgHiJkLmNoP'

/* ─── Floating input field ─── */
function FloatingInput({ label, name, type = 'text', value, onChange, placeholder, required, rows }) {
    const [focused, setFocused] = useState(false)
    const active = focused || value.length > 0
    const Tag = rows ? 'textarea' : 'input'

    return (
        <div style={{ position: 'relative' }}>
            {/* floating label */}
            <label style={{
                position: 'absolute',
                left: '1rem',
                top: active ? (rows ? '0.55rem' : '0.45rem') : (rows ? '1rem' : '50%'),
                transform: active ? 'none' : rows ? 'none' : 'translateY(-50%)',
                fontSize: active ? '0.65rem' : '0.85rem',
                color: focused ? '#f97316' : active ? '#64748b' : '#334155',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: active ? '0.08em' : '0.02em',
                textTransform: active ? 'uppercase' : 'none',
                transition: 'all 0.2s ease',
                pointerEvents: 'none',
                zIndex: 2,
            }}>
                {label}
            </label>
            <Tag
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={focused ? placeholder : ''}
                rows={rows}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: '100%',
                    background: focused ? 'rgba(249,115,22,0.04)' : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${focused ? 'rgba(249,115,22,0.45)' : active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: '12px',
                    padding: rows ? '1.8rem 1rem 0.75rem' : '1.55rem 1rem 0.55rem',
                    color: '#e2e8f0',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxShadow: focused ? '0 0 0 3px rgba(249,115,22,0.08)' : 'none',
                    transition: 'all 0.22s ease',
                    resize: rows ? 'vertical' : undefined,
                    minHeight: rows ? '120px' : undefined,
                }}
            />
        </div>
    )
}

/* ─── Toast ─── */
function Toast({ status }) {
    return (
        <AnimatePresence>
            {(status === 'success' || status === 'error') && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '1rem 1.4rem',
                        background: status === 'success'
                            ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                        border: `1px solid ${status === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                        borderRadius: '12px',
                        color: status === 'success' ? '#34d399' : '#f87171',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.88rem',
                    }}
                >
                    {status === 'success'
                        ? <><FiCheck size={16} /> Message sent! I'll reply within 24 hours. 🎉</>
                        : <><FiAlertCircle size={16} /> Failed to send. Please email me directly.</>
                    }
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/* ─── Info card ─── */
function InfoCard({ icon, label, value, color, rgb, href }) {
    const [hov, setHov] = useState(false)
    const El = href ? 'a' : 'div'
    return (
        <El
            href={href}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem',
                background: hov ? `rgba(${rgb},0.07)` : 'rgba(255,255,255,0.025)',
                border: `1px solid ${hov ? `rgba(${rgb},0.25)` : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '14px',
                transition: 'all 0.25s ease',
                textDecoration: 'none',
                cursor: href ? 'pointer' : 'default',
            }}
        >
            <div style={{
                width: '42px', height: '42px', borderRadius: '10px',
                background: `rgba(${rgb},0.1)`,
                border: `1px solid rgba(${rgb},0.2)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: color, flexShrink: 0,
                transition: 'transform 0.2s',
                transform: hov ? 'scale(1.1)' : 'none',
            }}>
                {icon}
            </div>
            <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: '#334155', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {label}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: hov ? color : '#94a3b8', transition: 'color 0.2s' }}>
                    {value}
                </div>
            </div>
        </El>
    )
}

const socials = [
    { icon: <FiGithub size={18} />, href: 'https://github.com/Himanshukumar142', label: 'GitHub', color: '#e2e8f0', rgb: '226,232,240' },
    { icon: <FiLinkedin size={18} />, href: 'https://linkedin.com/in/himanshu-kumar-22a0ba239', label: 'LinkedIn', color: '#0ea5e9', rgb: '14,165,233' },
    { icon: <FiMail size={18} />, href: 'mailto:hrkhimanshu142@gmail.com', label: 'Email', color: '#f97316', rgb: '249,115,22' },
]

export default function Contact() {
    const ref = useRef()
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | success | error
    const [charCount, setCharCount] = useState(0)

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
        if (e.target.name === 'message') setCharCount(e.target.value.length)
    }

    const formRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                { publicKey: EMAILJS_PUBLIC_KEY }
            )
            setStatus('success')
            setForm({ name: '', email: '', subject: '', message: '' })
            setCharCount(0)
        } catch (err) {
            console.error('EmailJS error:', err)
            setStatus('error')
        }
        setTimeout(() => setStatus('idle'), 5000)
    }

    return (
        <section
            id="contact"
            ref={ref}
            style={{ padding: '9rem 2rem', position: 'relative', overflow: 'hidden' }}
        >
            {/* ambient bg */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 70% 50% at 30% 70%, rgba(249,115,22,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 70% 30%, rgba(168,85,247,0.04) 0%, transparent 55%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '4.5rem' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#f97316', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            06 / Contact
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    </div>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                        fontWeight: 700, letterSpacing: '-0.04em', color: '#e2e8f0',
                        lineHeight: 1.1, margin: 0,
                    }}>
                        Let's build something{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>
                            great together
                        </span>
                    </h2>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#475569', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.7 }}>
                        Have a project, opportunity, or just want to say hello? Drop me a message — I typically reply within 24 hours.
                    </p>
                </motion.div>

                {/* ── Two-column layout ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3.5rem', alignItems: 'start' }}>

                    {/* ──── LEFT: Info ──── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.7 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        {/* status chip */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.45rem 0.9rem', borderRadius: '999px',
                            background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
                            marginBottom: '0.5rem', width: 'fit-content',
                        }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', animation: 'ping 1.5s infinite' }} />
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#4ade80' }}>
                                Available for new projects
                            </span>
                        </div>

                        <InfoCard
                            icon={<FiMail size={16} />}
                            label="Email"
                            value="hrkhimanshu142@gmail.com"
                            color="#f97316"
                            rgb="249,115,22"
                            href="mailto:hrkhimanshu142@gmail.com"
                        />
                        <InfoCard
                            icon={<FiMapPin size={16} />}
                            label="Location"
                            value="India 🇮🇳"
                            color="#a855f7"
                            rgb="168,85,247"
                        />
                        <InfoCard
                            icon={<FiClock size={16} />}
                            label="Response Time"
                            value="Within 24 hours"
                            color="#00f5ff"
                            rgb="0,245,255"
                        />

                        {/* Social links */}
                        <div style={{ marginTop: '1rem' }}>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: '#334155', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                Find me on
                            </div>
                            <div style={{ display: 'flex', gap: '0.65rem' }}>
                                {socials.map(s => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={s.label}
                                        style={{
                                            width: '46px', height: '46px', borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.07)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#475569', textDecoration: 'none',
                                            transition: 'all 0.25s ease',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.color = s.color
                                            e.currentTarget.style.borderColor = `rgba(${s.rgb},0.35)`
                                            e.currentTarget.style.background = `rgba(${s.rgb},0.08)`
                                            e.currentTarget.style.transform = 'translateY(-4px)'
                                            e.currentTarget.style.boxShadow = `0 8px 20px rgba(${s.rgb},0.2)`
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.color = '#475569'
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                                            e.currentTarget.style.transform = 'none'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ──── RIGHT: Form ──── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.25, duration: 0.7 }}
                    >
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            style={{
                                padding: '2.5rem',
                                background: 'rgba(255,255,255,0.025)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderRadius: '24px',
                                display: 'flex', flexDirection: 'column', gap: '1.25rem',
                                position: 'relative', overflow: 'hidden',
                            }}
                        >
                            {/* top accent line */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                background: 'linear-gradient(90deg, transparent 5%, #f97316 40%, #ec4899 60%, #a855f7 80%, transparent 95%)',
                            }} />

                            {/* Name + Email row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <FloatingInput
                                    label="Your Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Rahul Sharma"
                                    required
                                />
                                <FloatingInput
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            {/* Subject */}
                            <FloatingInput
                                label="Subject"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="What's this about?"
                            />

                            {/* Message */}
                            <div style={{ position: 'relative' }}>
                                <FloatingInput
                                    label="Message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or idea..."
                                    required
                                    rows={5}
                                />
                                <span style={{
                                    position: 'absolute', bottom: '0.6rem', right: '0.85rem',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.62rem', color: charCount > 800 ? '#ef4444' : '#334155',
                                }}>
                                    {charCount}/1000
                                </span>
                            </div>

                            {/* Toast */}
                            <Toast status={status} />

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                                    padding: '1rem 2rem', marginTop: '0.25rem',
                                    background: status === 'success'
                                        ? 'linear-gradient(135deg, #059669, #10b981)'
                                        : status === 'error'
                                            ? 'linear-gradient(135deg, #dc2626, #ef4444)'
                                            : 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)',
                                    color: '#fff',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.92rem', fontWeight: 700,
                                    border: 'none', borderRadius: '12px',
                                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: status === 'success'
                                        ? '0 0 30px rgba(16,185,129,0.3)'
                                        : '0 0 30px rgba(249,115,22,0.25)',
                                    opacity: status === 'sending' ? 0.75 : 1,
                                    letterSpacing: '0.02em',
                                }}
                                onMouseEnter={e => {
                                    if (status !== 'sending') {
                                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                                        e.currentTarget.style.boxShadow = '0 0 50px rgba(249,115,22,0.4), 0 16px 40px rgba(0,0,0,0.25)'
                                    }
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'none'
                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(249,115,22,0.25)'
                                }}
                            >
                                {status === 'sending' ? (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin-slow 1s linear infinite' }}>
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : status === 'success' ? (
                                    <><FiCheck size={16} /> Sent Successfully!</>
                                ) : status === 'error' ? (
                                    <><FiAlertCircle size={16} /> Failed — Try Again</>
                                ) : (
                                    <><FiSend size={16} /> Send Message</>
                                )}
                            </button>

                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#334155', textAlign: 'center' }}>
                                Your message is delivered directly to my inbox via secure email.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
