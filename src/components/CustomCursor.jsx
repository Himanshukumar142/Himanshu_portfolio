import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 })
    const [trail, setTrail] = useState({ x: -100, y: -100 })
    const [clicked, setClicked] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [hidden, setHidden] = useState(false)
    const animFrameRef = useRef(null)
    const targetRef = useRef({ x: -100, y: -100 })

    useEffect(() => {
        const onMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY })
            targetRef.current = { x: e.clientX, y: e.clientY }
        }
        const onDown = () => setClicked(true)
        const onUp = () => setClicked(false)
        const onLeave = () => setHidden(true)
        const onEnter = () => setHidden(false)

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mousedown', onDown)
        window.addEventListener('mouseup', onUp)
        document.documentElement.addEventListener('mouseleave', onLeave)
        document.documentElement.addEventListener('mouseenter', onEnter)

        // Trailing cursor animation
        let current = { x: -100, y: -100 }
        const animate = () => {
            current.x += (targetRef.current.x - current.x) * 0.12
            current.y += (targetRef.current.y - current.y) * 0.12
            setTrail({ x: current.x, y: current.y })
            animFrameRef.current = requestAnimationFrame(animate)
        }
        animFrameRef.current = requestAnimationFrame(animate)

        // Detect hoverable elements
        const addHover = () => setHovered(true)
        const removeHover = () => setHovered(false)
        const els = document.querySelectorAll('a, button, [data-cursor-hover]')
        els.forEach(el => {
            el.addEventListener('mouseenter', addHover)
            el.addEventListener('mouseleave', removeHover)
        })

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mousedown', onDown)
            window.removeEventListener('mouseup', onUp)
            document.documentElement.removeEventListener('mouseleave', onLeave)
            document.documentElement.removeEventListener('mouseenter', onEnter)
            cancelAnimationFrame(animFrameRef.current)
        }
    }, [])

    return (
        <>
            {/* Dot cursor */}
            <div
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    zIndex: 99999,
                    pointerEvents: 'none',
                    transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#00f5ff',
                    mixBlendMode: 'screen',
                    transition: 'opacity 0.2s',
                    opacity: hidden ? 0 : 1,
                    boxShadow: '0 0 10px #00f5ff, 0 0 20px rgba(0,245,255,0.5)',
                }}
            />
            {/* Ring cursor */}
            <div
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    zIndex: 99998,
                    pointerEvents: 'none',
                    transform: `translate(${trail.x - (hovered ? 24 : 16)}px, ${trail.y - (hovered ? 24 : 16)}px)`,
                    width: hovered ? '48px' : '32px',
                    height: hovered ? '48px' : '32px',
                    borderRadius: '50%',
                    border: `1.5px solid ${hovered ? 'rgba(168,85,247,0.8)' : 'rgba(0,245,255,0.5)'}`,
                    transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, transform 0.05s linear',
                    opacity: hidden ? 0 : (clicked ? 0.6 : 1),
                    backdropFilter: hovered ? 'blur(2px)' : 'none',
                }}
            />
        </>
    )
}
