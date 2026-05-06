import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle, Github, Linkedin } from 'lucide-react'
import Swal from 'sweetalert2'
import Comments from './Comments'
import { PERSONAL } from '../data/portfolio'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nama wajib diisi'
    if (!form.email.trim()) e.email = 'Email wajib diisi'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format email tidak valid'
    if (!form.message.trim()) e.message = 'Pesan wajib diisi'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Simulate sending (integrate with EmailJS or Supabase)
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setForm({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    Swal.fire({
      title: 'Pesan Terkirim! 🎉',
      html: `Terima kasih <b>${form.name}</b>! Saya akan membalas pesan Anda secepatnya.`,
      icon: 'success',
      confirmButtonText: 'Oke!',
      timer: 4000,
      timerProgressBar: true,
    })
  }

  const contactItems = [
    { icon: Mail, label: 'Email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}`, color: 'teal' },
    { icon: Phone, label: 'WhatsApp', value: PERSONAL.phone, href: `https://wa.me/6285282436796`, color: 'teal' },
    { icon: MapPin, label: 'Lokasi', value: PERSONAL.location, href: null, color: 'amber' },
    { icon: Linkedin, label: 'LinkedIn', value: 'harisariefkamis', href: PERSONAL.linkedin, color: 'teal' },
    { icon: Github, label: 'GitHub', value: 'harisariefkamis', href: PERSONAL.github, color: 'amber' },
  ]

  return (
    <section id="contact" className="section-base relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-teal-500/3 rounded-full blur-3xl -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-14" data-aos="fade-right">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Mail className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="font-mono text-xs text-teal-500 tracking-widest mb-0.5">07 / CONTACT</p>
            <h2 className="font-display font-700 text-3xl text-slate-100">Hubungi Saya</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent ml-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Info */}
          <div data-aos="fade-right">
            <p className="text-slate-400 leading-relaxed mb-8">
              Tertarik bekerja sama atau punya pertanyaan tentang data analysis? 
              Jangan ragu menghubungi saya — saya selalu terbuka untuk diskusi, 
              kolaborasi, dan peluang baru.
            </p>

            <div className="space-y-4 mb-8">
              {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    color === 'teal'
                      ? 'bg-teal-500/10 border border-teal-500/20'
                      : 'bg-amber-500/10 border border-amber-500/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${color === 'teal' ? 'text-teal-400' : 'text-amber-400'}`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-mono">{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer"
                        className="text-slate-300 text-sm hover:text-teal-400 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <span className="text-slate-300 text-sm">{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="glass rounded-xl p-4 border border-teal-500/15">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="font-mono text-xs text-teal-400 tracking-widest">TERSEDIA UNTUK HIRE</span>
              </div>
              <p className="text-slate-400 text-xs">
                Terbuka untuk posisi Data Analyst, Junior Data Scientist, atau peran terkait data.
                Tersedia untuk full-time maupun freelance.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div data-aos="fade-left">
            <form onSubmit={handleSubmit} className="glass rounded-xl border border-slate-700/30 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5 tracking-wide">NAMA *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama Anda"
                    className={`w-full bg-navy-900/50 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 border transition-colors outline-none focus:border-teal-500/50 ${
                      errors.name ? 'border-red-500/40' : 'border-slate-700/40'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5 tracking-wide">EMAIL *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="email@contoh.com"
                    className={`w-full bg-navy-900/50 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 border transition-colors outline-none focus:border-teal-500/50 ${
                      errors.email ? 'border-red-500/40' : 'border-slate-700/40'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1.5 tracking-wide">SUBJEK</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="Perihal pesan Anda"
                  className="w-full bg-navy-900/50 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 border border-slate-700/40 transition-colors outline-none focus:border-teal-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1.5 tracking-wide">PESAN *</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tulis pesan Anda..."
                  className={`w-full bg-navy-900/50 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 border transition-colors outline-none focus:border-teal-500/50 resize-none ${
                    errors.message ? 'border-red-500/40' : 'border-slate-700/40'
                  }`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</>
                ) : (
                  <><Send className="w-4 h-4" /> Kirim Pesan</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Comment section */}
        <div className="border-t border-slate-800 pt-12" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-10">
            <MessageCircle className="w-5 h-5 text-teal-400" />
            <h3 className="font-display font-700 text-2xl text-slate-100">Tamu & Komentar</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent ml-2" />
          </div>
          <Comments />
        </div>
      </div>
    </section>
  )
}
