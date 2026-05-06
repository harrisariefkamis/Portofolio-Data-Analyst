import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react'
import { EDUCATION } from '../data/portfolio'

export default function Education() {
  return (
    <section id="education" className="section-base relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-500/4 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-14" data-aos="fade-right">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="font-mono text-xs text-teal-500 tracking-widest mb-0.5">03 / EDUCATION</p>
            <h2 className="font-display font-700 text-3xl text-slate-100">Pendidikan</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent ml-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/40 via-teal-500/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="md:pl-16 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-3.5 top-6 w-5 h-5 rounded-full border-2 border-teal-400 bg-navy-900 hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                </div>

                <div className="glass glass-hover card-lift rounded-xl border border-slate-700/30 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{edu.icon}</span>
                        <div>
                          <h3 className="font-display font-700 text-xl text-slate-100">{edu.degree}</h3>
                          <p className="text-teal-400 font-medium mt-0.5">{edu.institution}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono ${
                          edu.status === 'Aktif'
                            ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                            : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${edu.status === 'Aktif' ? 'bg-teal-400 animate-pulse' : 'bg-slate-400'}`} />
                          {edu.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm mb-5 leading-relaxed">{edu.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-teal-500/60" />
                        <span className="font-mono text-xs">{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-teal-500/60" />
                        <span className="text-xs">{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-amber-500/60" />
                        <span className="font-mono text-xs text-amber-400">IPK {edu.gpa}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-0.5 bg-gradient-to-r from-teal-500/40 via-teal-500/20 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
