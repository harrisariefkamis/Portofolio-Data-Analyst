# 🎯 Haris Arief Kamis — Portfolio Website

Portfolio Data Analyst yang dibangun dengan teknologi web modern.

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|-----------|--------|
| **ReactJS** | Frontend framework |
| **Tailwind CSS** | Utility-first CSS |
| **Supabase** | Backend (database, realtime, auth) |
| **Framer Motion** | Animasi React |
| **AOS** | Animate On Scroll |
| **Lucide React** | Icon library |
| **Material UI** | UI components |
| **SweetAlert2** | Beautiful alerts/dialogs |
| **Vite** | Build tool |

## 🚀 Cara Menjalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Setup Supabase

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Buka **SQL Editor** dan jalankan script berikut:

```sql
-- Tabel komentar
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public comments viewable"
  ON comments FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert comment"
  ON comments FOR INSERT WITH CHECK (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE comments;

-- Views counter
CREATE TABLE portfolio_views (
  id SERIAL PRIMARY KEY,
  count INTEGER DEFAULT 0
);
INSERT INTO portfolio_views (count) VALUES (0);

CREATE OR REPLACE FUNCTION increment_views()
RETURNS void AS $$
BEGIN
  UPDATE portfolio_views SET count = count + 1 WHERE id = 1;
END;
$$ LANGUAGE plpgsql;
```

### 3. Konfigurasi Environment

```bash
cp .env.example .env
```

Edit `.env` dan masukkan credentials Supabase Anda:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Jalankan development server
```bash
npm run dev
```

### 5. Build untuk production
```bash
npm run build
```

## 📁 Struktur Proyek

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Hero.jsx            # Landing section
│   │   ├── About.jsx           # Tentang saya
│   │   ├── Skills.jsx          # Keahlian & tools
│   │   ├── Education.jsx       # Pendidikan
│   │   ├── Certifications.jsx  # Sertifikasi
│   │   ├── Projects.jsx        # Proyek
│   │   ├── Organizations.jsx   # Organisasi
│   │   ├── Contact.jsx         # Kontak + form
│   │   ├── Comments.jsx        # Komentar (Supabase)
│   │   ├── CustomCursor.jsx    # Custom cursor
│   │   ├── Footer.jsx          # Footer
│   │   └── Divider.jsx         # Section divider
│   ├── data/
│   │   └── portfolio.js        # ← EDIT DATA DI SINI
│   ├── lib/
│   │   └── supabase.js         # Supabase client
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Global styles
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## ✏️ Kustomisasi

Semua data personal ada di **`src/data/portfolio.js`**:
- `PERSONAL` — nama, bio, kontak
- `SKILLS` — keahlian & level
- `EDUCATION` — riwayat pendidikan
- `CERTIFICATIONS` — sertifikat
- `PROJECTS` — proyek portofolio
- `ORGANIZATIONS` — pengalaman organisasi

## 🌐 Deploy

### Vercel (Rekomendasi)
```bash
npm install -g vercel
vercel --prod
```
Tambahkan environment variables di Vercel dashboard.

### Netlify
```bash
npm run build
# Upload folder dist/ ke Netlify
```

## 📱 Fitur

- ✅ Responsive design (mobile-first)
- ✅ Dark mode (default)
- ✅ Custom cursor animasi
- ✅ Particle network background
- ✅ Typewriter effect
- ✅ Animate on scroll (AOS)
- ✅ Smooth scroll navigation
- ✅ Skill progress bars animasi
- ✅ CountUp stats
- ✅ Supabase realtime comments
- ✅ Contact form dengan validasi
- ✅ SweetAlert2 feedback
- ✅ Glass morphism UI

---

**Dibuat oleh Haris Arief Kamis** | Data Analyst
