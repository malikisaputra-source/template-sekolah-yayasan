# Template Sekolah & Yayasan Qur'ani

Template website premium untuk yayasan, TK Qur'an, madrasah, dan SD Islam: kubah animasi GSAP, jadwal salat otomatis, satu config.js.

Tier: **premium** · Kategori: Template Website

![Tangkapan layar](ss.png)

## Fitur

- Hero kubah beranimasi GSAP
- Semua brand & kontak di config.js
- Jadwal salat otomatis sesuai kota
- Angka statistik berhitung saat digulir
- Kartu program bingkai mihrab
- Linimasa kisah lembaga
- Tombol WhatsApp PPDB
- Responsif + menu HP
- Ilustrasi SVG tanpa foto

## Cara menjalankan

1. Unduh atau clone folder ini.
2. Klik dua kali `index.html` — langsung terbuka di browser (butuh internet untuk font & GSAP dari CDN).
3. Edit teks dengan editor apa pun (mis. VS Code), simpan, lalu muat ulang browser.
4. Untuk online: unggah seluruh folder ke GitHub Pages, Netlify, atau Vercel.

## Struktur folder

```
index.html   halaman utama
config.js    SEMUA teks brand, kontak, kota, angka
style.css    tampilan & warna (:root)
app.js       animasi GSAP, jadwal salat, menu
meta.json, README.md, LICENSE, ss.png
```

## Cara ubah brand & warna

Buka `config.js`: nama yayasan, alamat, WA, email, Instagram, kota (untuk jadwal salat), dan angka statistik ada di satu tempat. Warna ada di `style.css` bagian `:root` (`--g-900` hijau tua, `--orange`, `--teal`). Ilustrasi pengganti foto memakai kelas `.ph`; ganti dengan `<img>` foto Anda bila perlu.

## Kredit

Dibuat oleh Maliki Studio — malikisaputra.biz.id, follow TikTok/IG @malikisaputra

## Lisensi

MIT — lihat berkas `LICENSE`. Semua nama, kontak, dan angka di template ini **fiktif**; ilustrasi SVG buatan sendiri, silakan ganti dengan foto milik Anda.
