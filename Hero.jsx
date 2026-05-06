import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, ChevronRight, MapPin } from 'lucide-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { PERSONAL, STATS } from '../data/portfolio'

const ROLES = ['Data Analyst', 'SQL Developer', 'Python Enthusiast', 'Problem Solver']

function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0)
  const [char, setChar] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[idx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (char < word.length) {
          setChar(c => c + 1)
        } else {
          setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        if (char > 0) {
          setChar(c => c - 1)
        } else {
          setDeleting(false)
          setIdx(i => (i + 1) % words.length)
        }
      }
    }, deleting ? 60 : 110)
    return () => clearTimeout(timeout)
  }, [char, deleting, idx, words])

  return (
    <span className="gradient-text font-display">
      {words[idx].slice(0, char)}
      <span className="animate-blink text-teal-400 ml-0.5">|</span>
    </span>
  )
}

export default function Hero() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const canvasRef = useRef(null)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.4 + 0.1,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(20,184,166,${p.o})`
        ctx.fill()
      })
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(20,184,166,${0.05 * (1 - dist/120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(20,184,166,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(245,158,11,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Text content */}
          <div className="space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 border border-teal-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse-slow" />
              <span className="font-mono text-xs text-teal-400 tracking-widest">AVAILABLE FOR HIRE</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <p className="font-mono text-teal-500 text-sm mb-2 tracking-widest">
                <span className="text-slate-500">// </span>Hello, I am
              </p>
              <h1 className="font-display font-800 text-5xl lg:text-6xl xl:text-7xl leading-tight text-slate-50">
                Haris Arief
                <br />
                <span className="text-teal-400">Kamis</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl lg:text-3xl font-display font-300 text-slate-300 h-10"
            >
              <TypeWriter words={ROLES} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-lg"
            >
              {PERSONAL.tagline} — dari raw data hingga actionable insights.
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-2 text-slate-500 text-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-teal-500" />
              <span className="font-mono">{PERSONAL.location}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <a href="#projects" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-primary">
                <span>Lihat Proyek</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-outline">
                <Mail className="w-4 h-4" />
                <span>Kontak Saya</span>
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 pt-1"
            >
              {[
                { icon: Github, href: PERSONAL.github, label: 'GitHub' },
                { icon: Linkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${PERSONAL.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 glass rounded border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/30 transition-all"
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <span className="text-slate-600 text-xs font-mono ml-1">connect with me</span>
            </motion.div>
          </div>

          {/* RIGHT: Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-3xl border border-teal-500/5 animate-spin-slow" />
            <div className="absolute -inset-8 rounded-3xl border border-teal-500/3" />

            <div className="glass rounded-2xl p-6 border border-teal-500/10 relative overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-1.5 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-teal-500/60" />
                <span className="ml-3 font-mono text-xs text-slate-500">data_profile.json</span>
              </div>

              {/* Terminal content */}
              <div className="font-mono text-sm space-y-1.5 text-slate-400 mb-6">
                <p><span className="text-teal-500">const</span> analyst = {'{'}</p>
                <p className="pl-4"><span className="text-amber-400">name</span>: <span className="text-green-400">"Haris Arief Kamis"</span>,</p>
                <p className="pl-4"><span className="text-amber-400">role</span>: <span className="text-green-400">"Data Analyst"</span>,</p>
                <p className="pl-4"><span className="text-amber-400">stack</span>: [<span className="text-green-400">"SQL"</span>, <span className="text-green-400">"Python"</span>, <span className="text-green-400">"BigQuery"</span>],</p>
                <p className="pl-4"><span className="text-amber-400">status</span>: <span className="text-teal-400">available</span>,</p>
                <p>{'}'}</p>
              </div>

              {/* Stats grid */}
              <div ref={ref} className="grid grid-cols-2 gap-3">
                {STATS.map(({ label, value, suffix, prefix, decimals }) => (
                  <div key={label} className="bg-navy-800/60 rounded-lg p-3.5 border border-slate-700/30">
                    <p className="text-2xl font-display font-700 text-teal-400 leading-none">
                      {prefix}
                      {inView && <CountUp end={value} decimals={decimals || 0} duration={2} />}
                      {suffix}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar decoration */}
              <div className="mt-4 space-y-2">
                {[
                  { label: 'SQL & Database', val: 85 },
                  { label: 'Python & Data Science', val: 80 },
                  { label: 'Data Visualization', val: 78 },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{label}</span>
                      <span>{val}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${val}%` } : {}}
                        transition={{ delay: 0.3, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-teal-400 transition-colors"
        >
          <span className="font-mono text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
