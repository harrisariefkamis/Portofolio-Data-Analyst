import { useEffect } from 'react'
import AOS from 'aos'

import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import Organizations from './components/Organizations'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Divider from './components/Divider'

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    })
  }, [])

  return (
    <div className="relative min-h-screen bg-navy-900">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Education />
        <Divider />
        <Certifications />
        <Divider />
        <Projects />
        <Divider />
        <Organizations />
        <Divider />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
