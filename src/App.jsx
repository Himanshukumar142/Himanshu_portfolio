import { useState } from 'react'
import './index.css'
import CustomCursor from './components/CustomCursor'
import Noise from './components/Noise'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      <CustomCursor />
      <Noise />
      <ScrollProgress />

      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transform: introComplete ? 'none' : 'scale(0.98)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
