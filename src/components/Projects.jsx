import { motion } from 'framer-motion'
import { Layers, ExternalLink, Github, Tag } from 'lucide-react'
import { PROJECTS } from '../data/portfolio'

export default function Projects() {
  return (
    <section id="projects" className="section-base relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-teal-500/4 rounded-full blur-3xl -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-14" data-aos="fade-right">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="font-mono text-xs text-teal-500 tracking-widest mb-0.5">05 / PROJECTS</p>
            <h2 className="font-display font-700 text-3xl text-slate-100">Proyek</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent ml-4" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover card-lift rounded-xl border border-slate-700/30 overflow-hidden group"
            >
              {/* Top visual bar */}
              <div className="h-1.5 bg-gradient-to-r from-teal-500 via-teal-400 to-amber-400 opacity-60" />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{project.icon}</span>
                    <div>
                      <h3 className="font-display font-700 text-base text-slate-100">{project.title}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-teal-500/10 border border-teal-500/20 rounded text-xs font-mono text-teal-400">
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 glass rounded border border-slate-700/40 flex items-center justify-center text-slate-400 hover:text-teal-400 transition-colors">
                      <Github className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 glass rounded border border-slate-700/40 flex items-center justify-center text-slate-400 hover:text-teal-400 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3 h-3 text-slate-600" />
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-navy-800/80 border border-slate-700/40 rounded text-xs font-mono text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10" data-aos="fade-up">
          <a
            href={`https://github.com/harisariefkamis`}
            target="_blank"
            rel="noreferrer"
            className="btn-outline inline-flex"
          >
            <Github className="w-4 h-4" />
            Lihat Semua di GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
