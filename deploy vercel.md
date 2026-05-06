git init
git add .
git commit -m "Initial portofolio commit: React/Vite + Supabase + Tailwind"
git branch -M main

# Buat repo di GitHub: github.com/New > "Portofolio Data Anlyst" > Create (no README)
# Copy commands dari GitHub, contoh:
git remote add origin https://github.com/Portofolio Data Analyst/.git
git push -u origin main

{
  "builds": [{ "src": "package.json", "use": "@vercel/static-build" }],
  "outputDirectory": "dist"
}


