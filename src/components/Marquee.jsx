const techs = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL',
    'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Vercel', 'LangChain', 'OpenAI',
    'TensorFlow', 'Tailwind CSS', 'Framer Motion', 'GraphQL', 'Prisma',
]

export default function Marquee() {
    const items = [...techs, ...techs] // doubled for seamless loop

    return (
        <div
            style={{
                overflow: 'hidden',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                padding: '1.4rem 0',
                background: 'rgba(255,255,255,0.01)',
                position: 'relative',
            }}
        >
            {/* Fade edges */}
            <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
                background: 'linear-gradient(90deg, #030712, transparent)',
                zIndex: 2, pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
                background: 'linear-gradient(-90deg, #030712, transparent)',
                zIndex: 2, pointerEvents: 'none',
            }} />

            <div
                className="animate-marquee"
                style={{
                    display: 'flex',
                    gap: '3rem',
                    width: 'max-content',
                    alignItems: 'center',
                }}
            >
                {items.map((tech, i) => (
                    <div
                        key={`${tech}-${i}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <span style={{
                            width: '4px', height: '4px',
                            borderRadius: '50%',
                            background: i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#a855f7' : '#ec4899',
                            opacity: 0.6,
                            flexShrink: 0,
                        }} />
                        <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            color: '#334155',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                        }}>
                            {tech}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
