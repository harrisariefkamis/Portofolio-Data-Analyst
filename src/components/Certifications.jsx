import { motion } from 'framer-motion'
import { Award, Calendar, Tag, ExternalLink } from 'lucide-react'
import { CERTIFICATIONS } from '../data/portfolio'

export default function Certifications() {
  return (
    <section id="certifications" className="section-base relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-14" data-aos="fade-right">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="font-mono text-xs text-teal-500 tracking-widest mb-0.5">04 / CERTIFICATIONS</p>
            <h2 className="font-display font-700 text-3xl text-slate-100">Pelatihan & Sertifikasi</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent ml-4" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`glass glass-hover card-lift rounded-xl border overflow-hidden relative ${
                cert.highlight
                  ? 'border-teal-500/30'
                  : 'border-slate-700/30'
              }`}
            >
              {cert.highlight && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 bg-teal-500/15 border border-teal-500/25 rounded-full px-2.5 py-0.5 text-xs font-mono text-teal-400">
                    ⭐ Featured
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">{cert.badge}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-700 text-base text-slate-100 leading-tight pr-16">
                      {cert.title}
                    </h3>
                    <p className={`text-sm mt-1 font-medium ${cert.color === 'teal' ? 'text-teal-400' : 'text-amber-400'}`}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                  <Calendar className="w-3 h-3" />
                  <span className="font-mono">{cert.period}</span>
                </div>

                {/* Topics */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
                    <Tag className="w-3 h-3" />
                    <span>Topik</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.topics.map((topic) => (
                      <span
                        key={topic}
                        className={`inline-block px-2.5 py-0.5 rounded text-xs font-mono ${
                          cert.color === 'teal'
                            ? 'bg-teal-500/8 text-teal-400/80 border border-teal-500/15'
                            : 'bg-amber-500/8 text-amber-400/80 border border-amber-500/15'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accent bottom bar */}
              <div className={`h-0.5 ${cert.color === 'teal'
                ? 'bg-gradient-to-r from-teal-500/50 via-teal-500/20 to-transparent'
                : 'bg-gradient-to-r from-amber-500/50 via-amber-500/20 to-transparent'
              }`} />
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-10 glass rounded-xl border border-teal-500/10 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { label: 'Total Sertifikat', value: '12+', icon: '🏅' },
            { label: 'Jam Pelatihan', value: '200+', icon: '⏱️' },
            { label: 'Platform', value: '3', icon: '🖥️' },
            { label: 'Tahun Belajar', value: '2+', icon: '📅' },
          ].map(({ label, value, icon }) => (
            <div key={label}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className="font-display font-700 text-2xl text-teal-400">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
