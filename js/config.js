const AppConfig = {
    sections: ['hero', 'tentang', 'mood-section', 'materi', 'kisahSukses', 'testimoni'],
    
    moodData: {
        semangat: {
            desc: "Luar biasa! Semangat tinggi kamu akan membantu dalam pembelajaran advanced. Mari fokus pada strategi scaling dan leadership bisnis!",
            materi: "Advanced Business Strategy & Leadership",
            icon: "fas fa-fire"
        },
        santai: {
            desc: "Perfect! Mood santai sangat cocok untuk pembelajaran fundamental. Mari mulai dengan dasar-dasar bisnis yang solid.",
            materi: "Fundamental Bisnis & Mindset Entrepreneur",
            icon: "fas fa-coffee"
        },
        bingung: {
            desc: "Tidak apa-apa, setiap entrepreneur pernah mengalami fase ini. Mari mulai dengan panduan step-by-step yang mudah diikuti.",
            materi: "Panduan Lengkap: Dari Ide ke Eksekusi",
            icon: "fas fa-question"
        },
        fokus: {
            desc: "Mantap! Fokus tinggi akan memaksimalkan hasil pembelajaran. Saatnya deep dive ke analisis dan strategi detail.",
            materi: "Deep Dive Analytics & Strategic Planning",
            icon: "fas fa-crosshairs"
        },
        optimis: {
            desc: "Mindset optimis adalah asset terbesar entrepreneur! Mari belajar cara membangun brand yang kuat dan memorable.",
            materi: "Brand Building & Customer Experience",
            icon: "fas fa-star"
        },
        serius: {
            desc: "Komitmen tinggi adalah kunci sukses! Saatnya menguasai financial planning dan business model yang profitable.",
            materi: "Financial Mastery & Business Modeling",
            icon: "fas fa-briefcase"
        }
    },

    materiCards: {
        positions: ['0px', '16px', '32px'],
        zIndexes: [30, 20, 10],
        transforms: ['rotate(0deg)', 'rotate(2deg)', 'rotate(-1deg)']
    },

    animations: {
        parallaxSpeed: 0.5,
        cardStaggerDelay: 100,
        loadingDuration: 1500,
        modalTransition: 300
    },

    observerOptions: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    },

    company: {
        name: 'KEINGINAN usaha',
        email: 'keinginanusaha@gmail.com',
        phone: '+62 859 1264 62972',
        location: 'Yogyakarta, Indonesia',
        description: 'Platform edukasi interaktif untuk membantu UMKM lokal belajar bisnis secara mandiri, gratis, dan efektif.'
    },

    features: [
        {
            icon: 'fas fa-question-circle',
            title: 'Bingung Cara Memulai Bisnis',
            description: 'Mau mulai usaha tapi bingung dari mana? Pelajari langkah-langkah memulai usaha secara sistematis dengan panduan praktis kami.',
            color: 'primary'
        },
        {
            icon: 'fas fa-bullhorn',
            title: 'Kesulitan Promosi & Pemasaran',
            description: 'Sudah jualan tapi belum tahu cara promosi? Temukan strategi pemasaran digital yang efektif untuk bisnis kecil dengan budget terbatas.',
            color: 'accent'
        },
        {
            icon: 'fas fa-calculator',
            title: 'Manajemen Keuangan Rumit',
            description: 'Pengen atur keuangan bisnis tapi belum paham caranya? Kuasai dasar-dasar manajemen keuangan untuk UMKM dengan cara yang mudah dipahami.',
            color: 'emerald'
        }
    ],

    testimonials: [
        {
            name: 'Andi Prasetyo',
            role: 'Pemilik Toko Online',
            content: 'Materi di KEINGINAN usaha sangat mudah dipahami. Berkat belajar di sini, omset toko online saya naik 200%!',
            avatar: 'AP',
            isDark: false
        },
        {
            name: 'Siti Nurhaliza',
            role: 'Pengusaha Makanan',
            content: 'Gratis tapi berkualitas! Materi pemasaran digitalnya benar-benar praktikal dan bisa langsung diterapin.',
            avatar: 'SN',
            isDark: true
        },
        {
            name: 'Budi Santoso',
            role: 'Pemilik Warung',
            content: 'Dulu bingung mau mulai bisnis dari mana. Sekarang udah punya warung sendiri berkat panduan di sini!',
            avatar: 'BS',
            isDark: false
        },
        {
            name: 'Maya Sari',
            role: 'Pemilik Salon',
            content: 'Platform yang sangat membantu para pemula seperti saya. Materinya lengkap dan mudah diikuti step by step.',
            avatar: 'MS',
            isDark: true
        },
        {
            name: 'Riko Pratama',
            role: 'Pengusaha Konveksi',
            content: 'Berkat belajar manajemen keuangan di sini, sekarang bisnis saya lebih teratur dan profit jadi jelas!',
            avatar: 'RP',
            isDark: false
        },
        {
            name: 'Devi Lestari',
            role: 'Pemilik Katering',
            content: 'KEINGINAN usaha tuh bener-bener game changer buat UMKM kayak kita. Materi berkualitas tanpa bayar!',
            avatar: 'DL',
            isDark: true
        }
    ],

    stats: [
        { value: '100%', label: 'Gratis' },
        { value: '500+', label: 'Materi' },
        { value: '10K+', label: 'Pelajar' },
        { value: '34', label: 'Provinsi' }
    ],

    ctaStats: [
        { value: '24/7', label: 'Akses Tanpa Batas' },
        { value: '0%', label: 'Biaya Tersembunyi' },
        { value: '∞', label: 'Potensi Pertumbuhan' }
    ]
};