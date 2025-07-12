class AppManager {
    constructor() {
        this.config = AppConfig;
        this.currentMateriIndex = 0;
        this.navbar = null;
    }

    init() {
        this.renderComponents();
        this.bindEvents();
        this.initializeAnimations();
    }

    renderComponents() {
        document.getElementById('navbar-container').innerHTML = UIComponents.createNavbar();
        document.getElementById('footer-container').innerHTML = UIComponents.createFooter();
    }

    bindEvents() {
        this.bindMobileMenu();
        this.bindNavbarScroll();
        this.bindMateriCarousel();
        this.bindMoodSelector();
        this.bindFlipCards();
        this.bindSmoothScrolling();
        this.bindButtonStates();
    }

    bindMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                const icon = mobileMenuBtn.querySelector('i');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'fas fa-bars text-xl';
                } else {
                    icon.className = 'fas fa-times text-xl';
                }
            });
        }
    }

    bindNavbarScroll() {
        this.navbar = document.getElementById('mainNav');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                this.navbar.classList.add('shadow-lg');
            } else {
                this.navbar.classList.remove('shadow-lg');
            }
            
            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    bindMateriCarousel() {
        const materiCards = Array.from(document.querySelectorAll('.learning-card'));
        const nextBtn = document.getElementById('materi-next');
        const prevBtn = document.getElementById('materi-prev');

        if (materiCards.length > 0 && nextBtn && prevBtn) {
            const updateCards = () => {
                const total = materiCards.length;
                const { positions, zIndexes, transforms } = this.config.materiCards;
                
                for (let i = 0; i < total; i++) {
                    const idx = (this.currentMateriIndex + i) % total;
                    materiCards[idx].style.zIndex = zIndexes[i] || 0;
                    materiCards[idx].style.left = positions[i] || '48px';
                    materiCards[idx].style.top = positions[i] || '16px';
                    materiCards[idx].style.transform = transforms[i] || 'rotate(0deg)';
                    materiCards[idx].style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                }
            };

            nextBtn.addEventListener('click', () => {
                this.currentMateriIndex = (this.currentMateriIndex + 1) % materiCards.length;
                updateCards();
                this.animateButtonClick(nextBtn);
            });

            prevBtn.addEventListener('click', () => {
                this.currentMateriIndex = (this.currentMateriIndex - 1 + materiCards.length) % materiCards.length;
                updateCards();
                this.animateButtonClick(prevBtn);
            });

            updateCards();
        }
    }

    bindMoodSelector() {
        document.querySelectorAll('[data-mood]').forEach(item => {
            item.addEventListener('click', () => {
                const mood = item.dataset.mood;
                const data = this.config.moodData[mood];
                if (!data) return;

                this.animateButtonClick(item);
                this.showMoodModal(data);
            });
        });

        document.getElementById('mood-modal-close').addEventListener('click', () => {
            this.hideMoodModal();
        });

        document.getElementById('mood-modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideMoodModal();
            }
        });
    }

    showMoodModal(data) {
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

    hideMoodModal() {
        const modal = document.getElementById('mood-modal');
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, this.config.animations.modalTransition);
    }

    bindFlipCards() {
        document.querySelectorAll('.flip-prompt').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const flipCard = button.closest('.flip-card');
                flipCard.classList.add('flipped');
                this.animateButtonClick(button);
            });
        });

        document.querySelectorAll('.flip-back').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const flipCard = button.closest('.flip-card');
                flipCard.classList.remove('flipped');
            });
        });
    }

    bindSmoothScrolling() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
                const targetId = e.target.getAttribute('href').slice(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    this.smoothScrollTo(targetEl);
                }
            }
        });
    }

    smoothScrollTo(targetEl) {
        const navbarHeight = this.navbar.offsetHeight;
        const targetPosition = targetEl.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars text-xl';
        }
    }

    bindButtonStates() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.getAttribute('href') || button.getAttribute('onclick')) return;
                
                e.preventDefault();
                this.showLoadingState(button);
            });
        });
    }

    showLoadingState(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            this.showSuccessFeedback();
        }, this.config.animations.loadingDuration);
    }

    showSuccessFeedback() {
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
            }, this.config.animations.modalTransition);
        }, 2000);
    }

    animateButtonClick(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    initializeAnimations() {
        this.initActiveNavigation();
        this.initIntersectionObserver();
        this.initParallaxEffect();
        this.initInteractiveElements();
        this.initHeroAnimation();
        this.initImageLazyLoading();
    }

    initActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        const updateActiveNav = () => {
            let current = '';
            const scrollPos = window.scrollY + 120;
            
            this.config.sections.forEach(section => {
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

    initIntersectionObserver() {
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
                        }, index * this.config.animations.cardStaggerDelay);
                    });
                }
            });
        }, this.config.observerOptions);

        this.config.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
            }
        });
    }

    initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.floating-element');
            const speed = this.config.animations.parallaxSpeed;

            parallax.forEach(element => {
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    initInteractiveElements() {
        const interactiveElements = document.querySelectorAll('.card-elevated, .card-premium, .mood-card, .btn-primary, .btn-secondary');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    initHeroAnimation() {
        const heroTitle = document.querySelector('#hero h1');
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.animation = 'slide-up 0.8s ease-out';
            }, 500);
        }
    }

    initImageLazyLoading() {
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
}

const app = new AppManager();

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

function initializeComponents() {
    document.getElementById('navbar-container').innerHTML = createNavbar();
    document.getElementById('footer-container').innerHTML = createFooter();

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
    }

    const navbar = document.getElementById('mainNav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    const materiCards = Array.from(document.querySelectorAll('.learning-card'));
    const nextBtn = document.getElementById('materi-next');
    const prevBtn = document.getElementById('materi-prev');
    let currentIndex = 0;

    if (materiCards.length > 0 && nextBtn && prevBtn) {
        const positions = ['0px', '16px', '32px'];
        const zIndexes = [30, 20, 10];
        const transforms = ['rotate(0deg)', 'rotate(2deg)', 'rotate(-1deg)'];

        function updateMateriCards() {
            const total = materiCards.length;
            for (let i = 0; i < total; i++) {
                const idx = (currentIndex + i) % total;
                materiCards[idx].style.zIndex = zIndexes[i] || 0;
                materiCards[idx].style.left = positions[i] || '48px';
                materiCards[idx].style.top = positions[i] || '16px';
                materiCards[idx].style.transform = transforms[i] || 'rotate(0deg)';
                
                materiCards[idx].style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % materiCards.length;
            updateMateriCards();
            
            nextBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                nextBtn.style.transform = 'scale(1)';
            }, 150);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + materiCards.length) % materiCards.length;
            updateMateriCards();
            
            prevBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                prevBtn.style.transform = 'scale(1)';
            }, 150);
        });

        updateMateriCards();
    }

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

    document.querySelectorAll('[data-mood]').forEach(item => {
        item.addEventListener('click', () => {
            const mood = item.dataset.mood;
            const data = moodData[mood];
            if (!data) return;

            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);

            document.getElementById('mood-desc').textContent = data.desc;
            document.getElementById('mood-materi').textContent = data.materi;
            
            const iconEl = document.getElementById('mood-icon');
            iconEl.innerHTML = `<i class="${data.icon}"></i>`;

            const modal = document.getElementById('mood-modal');
            modal.classList.remove('hidden');
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1)';
                modal.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 10);
        });
    });

    document.getElementById('mood-modal-close').addEventListener('click', () => {
        const modal = document.getElementById('mood-modal');
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    });

    document.getElementById('mood-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            const modal = document.getElementById('mood-modal');
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
    });

    document.querySelectorAll('.flip-prompt').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const flipCard = button.closest('.flip-card');
            flipCard.classList.add('flipped');
            
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });

    document.querySelectorAll('.flip-back').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const flipCard = button.closest('.flip-card');
            flipCard.classList.remove('flipped');
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
            const targetId = e.target.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetEl.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.className = 'fas fa-bars text-xl';
                }
            }
        }
    });

    const sections = ['hero', 'tentang', 'mood-section', 'materi', 'kisahSukses', 'testimoni'];
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
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
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

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

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            observer.observe(section);
        }
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.floating-element');
        const speed = 0.5;

        parallax.forEach(element => {
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') || this.getAttribute('onclick')) return;
            
            e.preventDefault();
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                const feedback = document.createElement('div');
                feedback.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform translate-x-full transition-transform';
                feedback.innerHTML = '<i class="fas fa-check mr-2"></i>Berhasil! Redirecting...';
                document.body.appendChild(feedback);
                
                setTimeout(() => {
                    feedback.style.transform = 'translateX(0)';
                }, 100);
                
                setTimeout(() => {
                    feedback.style.transform = 'translateX(full)';
                    setTimeout(() => {
                        document.body.removeChild(feedback);
                    }, 300);
                }, 2000);
            }, 1500);
        });
    });

    const interactiveElements = document.querySelectorAll('.card-elevated, .card-premium, .mood-card, .btn-primary, .btn-secondary');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'slide-up 0.8s ease-out';
        }, 500);
    }

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

const style = document.createElement('style');
style.textContent = `
    .card-elevated, .card-premium, .mood-card {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .loading-placeholder {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});