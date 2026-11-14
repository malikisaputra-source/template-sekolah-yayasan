/* kredit-maliki: Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id. Lisensi Nonkomersial Maliki Studio: wajib kredit, dilarang dijual (lihat LICENSE). */
/* ============================================================
   CONFIG — ganti semua teks brand, kontak, dan angka di sini.
   Semua data di bawah adalah CONTOH FIKTIF.
   Warna diatur di style.css bagian :root (--g-900, --orange, dst.)
   ============================================================ */
window.SITE = {
  nama: 'Yayasan Cahaya Ilmu',
  singkat: 'Cahaya Ilmu',
  sekolah: 'Sekolah Cahaya Ilmu',
  kota: 'Jakarta',                 // dipakai untuk jadwal salat otomatis
  alamat: 'Jl. Contoh Raya No. 1, Kota Contoh, Indonesia 00000',
  wa: '6281200000000',              // format internasional tanpa +
  waTampil: '0812-0000-0000',
  waPesan: "Assalamu'alaikum, saya ingin bertanya tentang pendaftaran santri baru.",
  email: 'contoh@email.com',
  instagram: 'akun.contoh',
  situs: 'www.contoh-sekolah.sch.id',
  video: '#',                       // tautan video profil (YouTube dsb.)
  ketua: 'Nama Ketua, M.Pd.',
  berdiri: '2015',
  // angka statistik (contoh)
  santri: 120,
  guru: 20,
  jenjang: 5,
  akreditasi: 'A',

  // ===== LOGO & FOTO — semua path gambar diatur di sini =====
  // Kosongkan ('') = pakai ilustrasi/ornamen bunga bawaan. Isi path = tampilkan foto.
  // Ganti cukup dengan menimpa berkas di img/ (nama sama) atau mengubah path di bawah.
  logo: '',                         // mis. 'img/logo.svg' (1:1). Dipakai di navbar, footer & favicon; gagal dimuat = inisial
  foto: {
    hero: '',                       // latar hero di balik kubah (16:9, ≥1600px)
    tentang: '',                    // bagian Tentang (4:5)
    gedung: '',                     // bagian Kilas/gedung sekolah (4:3)
    halaman: '',                    // lingkaran "Dalam angka" (1:1)
    program: ['', '', '', ''],      // 4 kartu program: PAUD, Tahfizh, SD, Rumah asuh (3:4)
    fasilitas: ['', '', ''],        // 3 kubah fasilitas: kelas, pojok baca, ruang mengaji (3:4)
    cta: ''                         // latar ajakan daftar (16:9)
  },
  // Guru & staf (foto 4:5). Kosongkan array = bagian disembunyikan.
  guru: [
    { nama: 'Nama Guru 1, S.Pd.', peran: 'Kepala Sekolah', foto: 'img/guru-1.svg' },
    { nama: 'Nama Guru 2, S.Ag.', peran: 'Guru Tahfizh', foto: 'img/guru-2.svg' },
    { nama: 'Nama Guru 3, S.Pd.', peran: 'Wali Kelas PAUD', foto: 'img/guru-3.svg' }
  ],
  // Galeri kegiatan (foto 4:3). Kosongkan array = galeri disembunyikan.
  galeri: ['img/galeri-1.svg', 'img/galeri-2.svg', 'img/galeri-3.svg', 'img/galeri-4.svg']
};
