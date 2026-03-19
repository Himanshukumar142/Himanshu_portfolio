import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement
            const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight)
            setProgress(Math.min(scrolled, 1))
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '2px',
                zIndex: 9998,
                background: 'rgba(255,255,255,0.05)',
            }}
        >
            <motion.div
                style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #00f5ff, #8a2be2)',
                    scaleX: progress,
                    transformOrigin: 'left',
                }}
            />
        </div>
    )
}
