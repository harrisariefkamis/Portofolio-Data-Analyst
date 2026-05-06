import { motion } from 'framer-motion'
import { Users, ChevronDown, ChevronUp, Calendar, MapPin } from 'lucide-react'
import { useState } from 'react'
import { ORGANIZATIONS } from '../data/portfolio'

function OrgCard({ org, delay }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass glass-hover rounded-xl border border-slate-700/30 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 text-xl">
            {org.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-600 text-sm text-slate-100 leading-tight">{org.role}</h3>
            <p className="text-teal-400 text-xs mt-0.5 font-medium">{org.org}</p>

            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <Calendar className="w-3 h-3" />
                <span className="font-mono">{org.period}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <MapPin className="w-3 h-3" />
                <span>{org.location}</span>
              </div>
            </div>
          </div>
        </div>

        {org.events && (
          <div className="mt-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-400 transition-colors"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expanded ? 'Sembunyikan' : `Lihat ${org.events.length} kegiatan`}
            </button>

            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-1.5 pl-3 border-l border-teal-500/20"
              >
                {org.events.map((event, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <p className="text-slate-400 text-xs leading-relaxed">{event}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Organizations() {
  return (
    <section id="organizations" className="section-base relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-teal-500/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-14" data-aos="fade-right">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="font-mono text-xs text-teal-500 tracking-widest mb-0.5">06 / ORGANIZATIONS</p>
            <h2 className="font-display font-700 text-3xl text-slate-100">Pengalaman Organisasi</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent ml-4" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {ORGANIZATIONS.map((org, i) => (
            <OrgCard key={`${org.role}-${i}`} org={org} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
