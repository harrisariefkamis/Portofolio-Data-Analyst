import { motion } from "framer-motion";
import { User, Download, CheckCircle2 } from "lucide-react";
import { PERSONAL } from "../data/portfolio";

const highlights = [
  "Mahasiswa aktif S1 Sains Data IPK 3.69",
  "Lulus program D3 Teknik Komputer",
  "Pengalaman FullStack Data Analysis Bootcamp (2 bulan)",
  "Memahami SQL, Python, BigQuery, Looker Studio",
  "Pengalaman kepemimpinan organisasi mahasiswa",
  "Tertarik pada proyek data yang menantang",
];

export default function About() {
  return (
    <section id="about" className="section-base relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-teal-500/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-14" data-aos="fade-right">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <User className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="font-mono text-xs text-teal-500 tracking-widest mb-0.5">
              01 / ABOUT
            </p>
            <h2 className="font-display font-700 text-3xl text-slate-100">
              Tentang Saya
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent ml-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: Bio */}
          <div data-aos="fade-right" data-aos-delay="100">
            <div className="relative">
              {/* Decorative photo placeholder */}
              <div className="relative w-64 h-64 mx-auto lg:mx-0 mb-8">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-teal-500/20 via-navy-800 to-amber-500/10 border border-teal-500/20 flex items-center justify-center overflow-hidden">
                  {/* Avatar photo */}
                  <div className="text-center relative w-full h-full">
                    <img
                      src="/harisariefkamis.jpg"
                      alt="Foto Haris Arief Kamis"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay for readability */}
                    <div className="absolute inset-0 bg-navy-900/20" />

                    {/* Optional initials fallback */}
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-teal-500/20 border-2 border-teal-400/30 flex items-center justify-center">
                        <span className="font-display font-700 text-4xl gradient-text">
                          HA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-3 -right-3 glass rounded-lg px-3 py-1.5 border border-teal-500/20"
                >
                  <span className="font-mono text-xs text-teal-400">
                    IPK 3.69 ⭐
                  </span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-3 -left-3 glass rounded-lg px-3 py-1.5 border border-amber-500/20"
                >
                  <span className="font-mono text-xs text-amber-400">
                    Data Analyst 📊
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Saya adalah{" "}
                <span className="text-slate-200 font-medium">
                  Haris Arief Kamis
                </span>
                , mahasiswa S1 Sains Data di{" "}
                <span className="text-teal-400">
                  Universitas Insan Cita Indonesia (UICI)
                </span>{" "}
                dengan IPK 3.69, sekaligus lulusan program D3 Teknik Komputer.
              </p>
              <p>
                Passion saya terletak pada kemampuan mengolah data menjadi
                insight yang bermakna — mulai dari{" "}
                <span className="text-slate-200">data cleaning</span>,{" "}
                <span className="text-slate-200">SQL querying</span>, hingga{" "}
                <span className="text-slate-200">visualisasi interaktif</span>{" "}
                yang mempermudah pengambilan keputusan bisnis.
              </p>
              <p>
                Saya aktif berkontribusi dalam berbagai organisasi kemahasiswaan
                dan memiliki pengalaman kepemimpinan yang kuat — mulai dari
                ketua panitia event besar hingga koordinator program sosial
                lingkungan hidup.
              </p>
            </div>

            <div className="mt-6">
              <a href="#" className="btn-primary inline-flex">
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* Right: Highlights */}
          <div data-aos="fade-left" data-aos-delay="200">
            <h3 className="font-display font-600 text-xl text-slate-200 mb-6">
              Yang perlu Anda ketahui tentang saya
            </h3>

            <div className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                  <span className="text-slate-400 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact info card */}
            <div className="glass rounded-xl p-5 border border-teal-500/10 space-y-3">
              <p className="font-mono text-xs text-teal-500 tracking-widest mb-4">
                KONTAK INFO
              </p>
              {[
                {
                  label: "Email",
                  value: PERSONAL.email,
                  href: `mailto:${PERSONAL.email}`,
                },
                {
                  label: "Phone",
                  value: PERSONAL.phone,
                  href: `tel:${PERSONAL.phone}`,
                },
                { label: "Location", value: PERSONAL.location, href: null },
                {
                  label: "LinkedIn",
                  value: "harisariefkamis",
                  href: PERSONAL.linkedin,
                },
                {
                  label: "GitHub",
                  value: "harisariefkamis",
                  href: PERSONAL.github,
                },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex gap-3 text-sm">
                  <span className="text-slate-600 font-mono w-20 shrink-0">
                    {label}
                  </span>
                  <span className="text-slate-600">:</span>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors truncate"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-slate-300">{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
