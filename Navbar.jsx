import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Database } from 'lucide-react'

const navItems = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Tentang', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Pendidikan', href: '#education' },
  { label: 'Sertifikasi', href: '#certifications' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Organisasi', href: '#organizations' },
  { label: 'Kontak', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#hero')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navItems.map(n => n.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${id}`)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setOpen(false)
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-teal-500/10 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded bg-teal-500/10 border border-teal-500/30 flex items-center justify-center group-hover:border-teal-400 transition-colors">
            <Database className="w-4 h-4 text-teal-400" />
          </div>
          <span className="font-display font-700 text-sm text-slate-100 hidden sm:block">
            haris<span className="text-teal-400">.dev</span>
          </span>
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={`nav-link ${active === href ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="mailto:harisariefkamis16@gmail.com"
            className="btn-primary text-xs py-2 px-4"
          >
            Hubungi Saya
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded border border-teal-500/20 text-teal-400 hover:border-teal-400 transition-colors"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden glass border-t border-teal-500/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={`text-left py-2.5 px-3 rounded text-sm font-body font-500 transition-colors ${
                    active === href
                      ? 'text-teal-400 bg-teal-500/5'
                      : 'text-slate-400 hover:text-teal-400'
                  }`}
                >
                  {label}
                </button>
              ))}
              <a
                href="mailto:harisariefkamis16@gmail.com"
                className="btn-primary text-sm mt-2 justify-center"
              >
                Hubungi Saya
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
