import { Github, Linkedin, Mail, Heart, Database } from 'lucide-react'
import { PERSONAL } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-slate-800/80 mt-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(20,184,166,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <Database className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div>
              <p className="font-display font-700 text-sm text-slate-200">Haris Arief Kamis</p>
              <p className="font-mono text-xs text-slate-600">Data Analyst</p>
            </div>
          </div>

          {/* Center text */}
          <p className="text-slate-600 text-xs font-mono text-center">
            © {year} Haris Arief Kamis — Built with{' '}
            <Heart className="inline w-3 h-3 text-red-400 mx-0.5" />
            using React + Supabase
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: PERSONAL.github },
              { icon: Linkedin, href: PERSONAL.linkedin },
              { icon: Mail, href: `mailto:${PERSONAL.email}` },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 glass rounded border border-slate-700/40 flex items-center justify-center text-slate-500 hover:text-teal-400 hover:border-teal-500/30 transition-all"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-teal-400 transition-colors"
          >
            ↑ Kembali ke atas
          </button>
        </div>
      </div>
    </footer>
  )
}
