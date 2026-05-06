import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, User, Clock, Loader2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { commentsService } from '../lib/supabase'

function CommentItem({ comment, index }) {
  const initials = comment.name?.slice(0, 2).toUpperCase() || 'AN'
  const colors = ['#14B8A6', '#F59E0B', '#8B5CF6', '#EC4899', '#3B82F6']
  const color = colors[comment.name?.charCodeAt(0) % colors.length] || colors[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-xl p-4 border border-slate-700/30"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-700 shrink-0"
          style={{ background: `${color}20`, color, border: `1.5px solid ${color}40` }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="font-display font-600 text-sm text-slate-200">{comment.name}</span>
            <div className="flex items-center gap-1 text-slate-600 text-xs font-mono shrink-0">
              <Clock className="w-3 h-3" />
              {new Date(comment.created_at).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{comment.message}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Comments() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadComments()

    // Realtime subscription
    const channel = commentsService.subscribe((payload) => {
      if (payload.new?.approved) {
        setComments(prev => [payload.new, ...prev])
      }
    })

    return () => channel?.unsubscribe?.()
  }, [])

  const loadComments = async () => {
    try {
      const data = await commentsService.getAll()
      setComments(data || [])
    } catch {
      // Supabase not configured - show placeholder
      setComments([
        {
          id: 'demo-1',
          name: 'Visitor',
          message: 'Koneksikan Supabase untuk mengaktifkan sistem komentar! 🚀',
          created_at: new Date().toISOString(),
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nama wajib diisi'
    if (!form.message.trim()) e.message = 'Pesan wajib diisi'
    if (form.message.trim().length < 5) e.message = 'Pesan terlalu singkat'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    try {
      const newComment = await commentsService.create(form)
      if (newComment?.[0]) {
        setComments(prev => [newComment[0], ...prev])
      }
      setForm({ name: '', email: '', message: '' })
      setErrors({})
      Swal.fire({
        title: 'Terima kasih! 🎉',
        text: 'Komentar Anda berhasil dikirim.',
        icon: 'success',
        confirmButtonText: 'Oke!',
        timer: 3000,
        timerProgressBar: true,
      })
    } catch {
      Swal.fire({
        title: 'Oops!',
        text: 'Supabase belum terhubung. Konfigurasi .env terlebih dahulu.',
        icon: 'warning',
        confirmButtonText: 'Mengerti',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form */}
      <div data-aos="fade-right">
        <h3 className="font-display font-600 text-xl text-slate-200 mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-teal-400" />
          Tinggalkan Komentar
        </h3>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1.5 tracking-wide">NAMA *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Nama lengkap Anda"
              className={`w-full glass rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 border transition-colors outline-none focus:border-teal-500/50 ${
                errors.name ? 'border-red-500/40' : 'border-slate-700/40'
              }`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1.5 tracking-wide">EMAIL (opsional)</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="email@contoh.com"
              className="w-full glass rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 border border-slate-700/40 transition-colors outline-none focus:border-teal-500/50"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1.5 tracking-wide">PESAN *</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Tulis pesan Anda di sini..."
              className={`w-full glass rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 border transition-colors outline-none focus:border-teal-500/50 resize-none ${
                errors.message ? 'border-red-500/40' : 'border-slate-700/40'
              }`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</>
            ) : (
              <><Send className="w-4 h-4" /> Kirim Komentar</>
            )}
          </button>
        </div>
      </div>

      {/* Comments list */}
      <div data-aos="fade-left">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-600 text-xl text-slate-200 flex items-center gap-2">
            <User className="w-5 h-5 text-teal-400" />
            Komentar
          </h3>
          <span className="font-mono text-xs text-teal-400 glass px-2.5 py-1 rounded-full border border-teal-500/20">
            {comments.length} komentar
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Belum ada komentar. Jadilah yang pertama!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            <AnimatePresence>
              {comments.map((comment, i) => (
                <CommentItem key={comment.id} comment={comment} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
