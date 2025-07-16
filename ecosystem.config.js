module.exports = {
  apps: [
    {
      name: 'marketplace-api', // Anda bisa ganti nama aplikasi
      script: 'dist/main.js', // Langsung menunjuk ke file utama hasil build
      exec_mode: 'cluster', // Direkomendasikan untuk skalabilitas
      instances: 'max', // Menggunakan semua core CPU yang tersedia
      autorestart: true, // Restart otomatis jika aplikasi crash (ini adalah default, tapi baik untuk dicantumkan)
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
