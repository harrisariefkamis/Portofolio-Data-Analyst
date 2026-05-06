import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { SKILLS } from '../data/portfolio'

function SkillCard({ category, icon, color, items, delay }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const isTeal = color === 'teal'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass glass-hover rounded-xl p-6 card-lift border border-slate-700/30"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-display font-600 text-base text-slate-200">{category}</h3>
      </div>
      <div className="space-y-4">
        {items.map(({ name, level }) => (
          <div key={name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-slate-400">{name}</span>
              <span className={`font-mono text-xs ${isTeal ? 'text-teal-400' : 'text-amber-400'}`}>
                {level}%
              </span>
            </div>
            <div className="skill-bar-track">
              <motion.div
                className={`h-full rounded-full origin-left ${
                  isTeal
                    ? 'bg-gradient-to-r from-teal-600 to-teal-400'
                    : 'bg-gradient-to-r from-amber-600 to-amber-400'
                }`}
                style={{ height: '4px' }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${level}%` } : {}}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const techStack = [
  { name: 'SQL', color: '#14B8A6' },
  { name: 'Python', color: '#3B82F6' },
  { name: 'BigQuery', color: '#F59E0B' },
  { name: 'PostgreSQL', color: '#6366F1' },
  { name: 'Looker Studio', color: '#10B981' },
  { name: 'Pandas', color: '#14B8A6' },
  { name: 'NumPy', color: '#F59E0B' },
  { name: 'Google Colab', color: '#F59E0B' },
  { name: 'Excel', color: '#22C55E' },
  { name: 'Power Point', color: '#EF4444' },
  { name: 'GitHub', color: '#94A3B8' },
  { name: 'Matplotlib', color: '#8B5CF6' },
]

export default function Skills() {
  return (
    <section id="skills" className="section-base relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-14" data-aos="fade-right">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="font-mono text-xs text-teal-500 tracking-widest mb-0.5">02 / SKILLS</p>
            <h2 className="font-display font-700 text-3xl text-slate-100">Keahlian & Teknologi</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent ml-4" />
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.category} {...skill} delay={i * 0.1} />
          ))}
        </div>

        {/* Tech stack bubbles */}
        <div data-aos="fade-up" data-aos-delay="200">
          <p className="font-mono text-xs text-slate-600 text-center tracking-widest mb-5">TECH STACK</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techStack.map(({ name, color }, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass rounded-full px-4 py-1.5 text-sm font-mono border border-slate-700/40 transition-all"
                style={{ color, borderColor: `${color}30` }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
