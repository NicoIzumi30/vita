// Data Testimoni
const testimoniData = [
    {
        name: 'Andi Prasetyo',
        role: 'Pemilik Toko Online',
        content: 'Materi di Vita sangat mudah dipahami. Berkat belajar di sini, omset toko online saya naik 200%!',
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
        content: 'Vita tuh bener-bener game changer buat UMKM kayak kita. Materi berkualitas tanpa bayar!',
        avatar: 'DL',
        isDark: true
    }
];

// Configuration and Data
const moodData = {
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
};

let currentMateriIndex = 0;
let navbar = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    navbar = document.getElementById('mainNav');
    
    // Debug: Check if elements exist
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        console.log('Mobile menu elements found and ready');
    } else {
        console.warn('Mobile menu elements not found');
    }
    
    renderTestimoni();
    initializeEventListeners();
    initializeAnimations();
});

// Render Testimoni Function
function renderTestimoni() {
    const container = document.getElementById('testimoni-container');
    if (!container) return;

    const testimoniHTML = `
        <div class="overflow-hidden">
            <div class="flex animate-marquee-left w-max space-x-6">
                ${createTestimoniRow(testimoniData)}
                ${createTestimoniRow(testimoniData)}
            </div>
        </div>
        
        <div class="overflow-hidden mt-8">
            <div class="flex animate-marquee-right w-max space-x-6">
                ${createTestimoniRow(testimoniData.slice(3).concat(testimoniData.slice(0, 3)))}
                ${createTestimoniRow(testimoniData.slice(3).concat(testimoniData.slice(0, 3)))}
            </div>
        </div>
    `;

    container.innerHTML = testimoniHTML;
}

function createTestimoniRow(data) {
    return `<div class="flex space-x-6">
        ${data.map(testimoni => createTestimoniCard(testimoni)).join('')}
    </div>`;
}

function createTestimoniCard(testimoni) {
    const cardClass = testimoni.isDark ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white' : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200';
    const quoteColor = testimoni.isDark ? 'text-blue-200' : 'text-primary-500';
    const textColor = testimoni.isDark ? 'text-white' : '';
    const nameColor = testimoni.isDark ? 'text-white' : 'text-slate-900';
    const roleColor = testimoni.isDark ? 'text-blue-200' : 'text-slate-500';
    const avatarClass = testimoni.isDark ? 'bg-white/20 border border-white/30 text-white' : getAvatarGradient(testimoni.avatar);

    return `
        <div class="${cardClass} rounded-2xl p-8 w-[90vw] sm:w-[400px] md:w-[480px] min-h-[280px] shadow-lg hover:-translate-y-1 transition-all">
            <div class="text-6xl ${quoteColor} mb-4 font-serif">"</div>
            <p class="text-lg leading-relaxed mb-6 font-inter ${textColor}">${testimoni.content}</p>
            <div class="flex items-center">
                <div class="w-12 h-12 ${avatarClass} rounded-full flex items-center justify-center font-bold mr-4">
                    ${testimoni.avatar}
                </div>
                <div>
                    <div class="font-semibold ${nameColor}">${testimoni.name}</div>
                    <div class="text-sm ${roleColor}">${testimoni.role}</div>
                </div>
            </div>
        </div>
    `;
}

function getAvatarGradient(avatar) {
    const gradients = {
        'AP': 'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
        'SN': 'bg-white/20 border border-white/30 text-white',
        'BS': 'bg-gradient-to-br from-accent-500 to-accent-600 text-white',
        'MS': 'bg-white/20 border border-white/30 text-white',
        'RP': 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white',
        'DL': 'bg-white/20 border border-white/30 text-white'
    };
    return gradients[avatar] || 'bg-gradient-to-br from-primary-500 to-primary-700 text-white';
}

function initializeEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Handle both click and touch events
        const toggleMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class
            mobileMenu.classList.toggle('active');
            
            // Update icon and accessibility
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.className = 'fas fa-times text-xl';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                // Prevent body scroll on mobile
                document.body.classList.add('menu-open');
                console.log('Mobile menu opened');
            } else {
                icon.className = 'fas fa-bars text-xl';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                // Re-enable body scroll
                document.body.classList.remove('menu-open');
                console.log('Mobile menu closed');
            }
        };

        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars text-xl';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        };

        // Add event listeners for different interaction types
        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleMenu(e);
        }, { passive: false });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMenu();
            }
        });

        // Handle window resize - close mobile menu if screen becomes desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.className = 'fas fa-bars text-xl';
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('menu-open');
                    console.log('Mobile menu closed due to screen resize');
                }
            }
        });

        // Close mobile menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Navbar scroll behavior - hanya transparansi
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.group');
        const dropdownMenu = document.querySelector('.group .absolute');
        
        if (dropdown && dropdownMenu && !dropdown.contains(e.target)) {
            // Additional logic can be added here if needed for manual dropdown control
        }
    });

    // Materi carousel
    const materiCards = Array.from(document.querySelectorAll('.learning-card'));
    const nextBtn = document.getElementById('materi-next');
    const prevBtn = document.getElementById('materi-prev');

    if (materiCards.length > 0 && nextBtn && prevBtn) {
        const positions = ['0px', '16px', '32px'];
        const zIndexes = [30, 20, 10];
        const transforms = ['rotate(0deg)', 'rotate(2deg)', 'rotate(-1deg)'];

        const updateCards = () => {
            const total = materiCards.length;
            
            for (let i = 0; i < total; i++) {
                const idx = (currentMateriIndex + i) % total;
                materiCards[idx].style.zIndex = zIndexes[i] || 0;
                materiCards[idx].style.left = positions[i] || '48px';
                materiCards[idx].style.top = positions[i] || '16px';
                materiCards[idx].style.transform = transforms[i] || 'rotate(0deg)';
                materiCards[idx].style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        };

        nextBtn.addEventListener('click', () => {
            currentMateriIndex = (currentMateriIndex + 1) % materiCards.length;
            updateCards();
            animateButtonClick(nextBtn);
        });

        prevBtn.addEventListener('click', () => {
            currentMateriIndex = (currentMateriIndex - 1 + materiCards.length) % materiCards.length;
            updateCards();
            animateButtonClick(prevBtn);
        });

        updateCards();
    }

    // Mood selector
    document.querySelectorAll('[data-mood]').forEach(item => {
        item.addEventListener('click', () => {
            const mood = item.dataset.mood;
            const data = moodData[mood];
            if (!data) return;

            animateButtonClick(item);
            showMoodModal(data);
        });
    });

    // Mood modal events
    document.getElementById('mood-modal-close').addEventListener('click', () => {
        hideMoodModal();
    });

    document.getElementById('mood-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            hideMoodModal();
        }
    });

    // Flip cards
    document.querySelectorAll('.flip-prompt').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const flipCard = button.closest('.flip-card');
            flipCard.classList.add('flipped');
            animateButtonClick(button);
        });
    });

    document.querySelectorAll('.flip-back').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const flipCard = button.closest('.flip-card');
            flipCard.classList.remove('flipped');
        });
    });

    // Smooth scrolling
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
            const targetId = e.target.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                smoothScrollTo(targetEl);
            }
        }
    });

    // Button loading states
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('href') || button.getAttribute('onclick')) return;
            
            e.preventDefault();
            showLoadingState(button);
        });
    });
}

function showMoodModal(data) {
    document.getElementById('mood-desc').textContent = data.desc;
    document.getElementById('mood-materi').textContent = data.materi;
    
    const iconEl = document.getElementById('mood-icon');
    iconEl.innerHTML = `<i class="${data.icon}"></i>`;

    const modal = document.getElementById('mood-modal');
    modal.classList.remove('hidden');
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
        modal.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

function hideMoodModal() {
    const modal = document.getElementById('mood-modal');
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function smoothScrollTo(targetEl) {
    const navbarHeight = navbar.offsetHeight;
    const targetPosition = targetEl.offsetTop - navbarHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'fas fa-bars text-xl';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }
}

function showLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        showSuccessFeedback();
    }, 1500);
}

function showSuccessFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform translate-x-full transition-transform';
    feedback.innerHTML = '<i class="fas fa-check mr-2"></i>Berhasil! Redirecting...';
    document.body.appendChild(feedback);
    
    requestAnimationFrame(() => {
        feedback.style.transform = 'translateX(0)';
    });
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 2000);
}

function animateButtonClick(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function initializeAnimations() {
    initActiveNavigation();
    initIntersectionObserver();
    initParallaxEffect();
    initInteractiveElements();
    initHeroAnimation();
    initImageLazyLoading();
}

function initActiveNavigation() {
    const sections = ['hero', 'tentang', 'materi', 'kisahSukses', 'pelatihan-materi', 'hubungi'];
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
        let current = '';
        const scrollPos = window.scrollY + 120;
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const top = element.offsetTop;
                const bottom = top + element.offsetHeight;
                
                if (scrollPos >= top && scrollPos < bottom) {
                    current = section === 'mood-section' ? 'tentang' : section;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || (current === 'hero' && href === '#hero')) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                const children = entry.target.querySelectorAll('.card-elevated, .card-premium, .mood-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    const sections = ['hero', 'tentang', 'materi', 'kisahSukses', 'testimoni'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            observer.observe(section);
        }
    });
}

function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.floating-element');
        const speed = 0.5;

        parallax.forEach(element => {
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

function initInteractiveElements() {
    const interactiveElements = document.querySelectorAll('.card-elevated, .card-premium, .mood-card, .btn-primary, .btn-secondary');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

function initHeroAnimation() {
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'slide-up 0.8s ease-out';
        }, 500);
    }
}

function initImageLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0.7';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

