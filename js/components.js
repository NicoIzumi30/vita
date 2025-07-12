class UIComponents {
    static createNavbar() {
        return `
            <nav class="fixed top-0 w-full z-50 glass transition-all duration-300" id="mainNav">
                <div class="container mx-auto px-6">
                    <div class="flex items-center justify-between h-16">
                        ${this.createLogo()}
                        ${this.createDesktopMenu()}
                        ${this.createMobileMenuButton()}
                    </div>
                    ${this.createMobileMenu()}
                </div>
            </nav>
        `;
    }

    static createLogo() {
        return `
            <a href="#hero" class="flex items-center space-x-3 hover:scale-105 transition-transform">
                <div class="relative">
                    <div class="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        K
                    </div>
                    <div class="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                </div>
                <div class="flex flex-col">
                    <span class="text-lg font-bold font-outfit tracking-tight">KEINGINAN</span>
                    <span class="text-xs text-slate-500 -mt-1 font-medium">usaha</span>
                </div>
            </a>
        `;
    }

    static createDesktopMenu() {
        const menuItems = [
            { href: '#hero', text: 'Beranda', active: true },
            { href: '#tentang', text: 'Tentang Kami' },
            { href: '#kisahSukses', text: 'Kisah Sukses' },
            { href: '#', text: 'Pelatihan & Materi' },
            { href: '#', text: 'Hubungi Kami' }
        ];

        const dropdownItems = [
            { href: '#', text: 'Panduan Memulai', icon: 'fas fa-rocket', color: 'text-primary-500' },
            { href: '#', text: 'Pemasaran Digital', icon: 'fas fa-bullhorn', color: 'text-accent-500' },
            { href: '#', text: 'Manajemen Keuangan', icon: 'fas fa-chart-line', color: 'text-emerald-500' }
        ];

        return `
            <div class="hidden lg:flex items-center space-x-8">
                ${menuItems.map(item => `
                    <a href="${item.href}" class="nav-link ${item.active ? 'active' : ''} font-medium px-3 py-2 text-slate-700 hover:text-primary-600">
                        ${item.text}
                    </a>
                `).join('')}
                
                <div class="relative group">
                    <button class="nav-link font-medium px-3 py-2 flex items-center text-slate-700 hover:text-primary-600">
                        Materi Bisnis
                        <i class="fas fa-chevron-down ml-2 text-xs transition-transform group-hover:rotate-180"></i>
                    </button>
                    <div class="absolute top-full left-0 mt-2 w-64 glass rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/20">
                        <div class="p-2">
                            ${dropdownItems.map(item => `
                                <a href="${item.href}" class="block px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors">
                                    <i class="${item.icon} mr-3 ${item.color}"></i>
                                    ${item.text}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static createMobileMenuButton() {
        return `
            <button class="lg:hidden text-slate-700 hover:text-primary-600 transition-colors" id="mobileMenuBtn">
                <i class="fas fa-bars text-xl"></i>
            </button>
        `;
    }

    static createMobileMenu() {
        const mobileMenuItems = [
            { href: '#hero', text: 'Beranda', active: true },
            { href: '#tentang', text: 'Tentang Kami' },
            { href: '#', text: 'Panduan Memulai' },
            { href: '#', text: 'Pemasaran Digital' },
            { href: '#', text: 'Manajemen Keuangan' },
            { href: '#kisahSukses', text: 'Kisah Sukses' },
            { href: '#', text: 'Pelatihan & Materi' },
            { href: '#', text: 'Hubungi Kami' }
        ];

        return `
            <div class="lg:hidden hidden border-t border-slate-200/50 mt-2" id="mobileMenu">
                <div class="py-4 space-y-2">
                    ${mobileMenuItems.map(item => `
                        <a href="${item.href}" class="block py-3 px-4 ${item.active ? 'text-primary-600 font-medium rounded-xl bg-primary-50' : 'text-slate-700 hover:bg-slate-100 rounded-xl transition-colors'}">
                            ${item.text}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    static createFooter() {
        return `
            <footer class="bg-white border-t border-slate-200 py-16">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${this.createFooterBrand()}
                        ${this.createFooterNavigation()}
                        ${this.createFooterMaterials()}
                        ${this.createFooterContact()}
                    </div>
                    ${this.createFooterBottom()}
                </div>
            </footer>
        `;
    }

    static createFooterBrand() {
        const socialLinks = [
            { href: '#', icon: 'fab fa-instagram' },
            { href: '#', icon: 'fab fa-facebook' },
            { href: '#', icon: 'fab fa-youtube' }
        ];

        return `
            <div>
                <div class="flex items-center space-x-3 mb-6">
                    <div class="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        K
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xl font-bold font-outfit tracking-tight text-slate-900">KEINGINAN</span>
                        <span class="text-sm text-slate-500 -mt-1 font-medium">usaha</span>
                    </div>
                </div>
                <p class="text-slate-600 mb-6 text-body">
                    Platform edukasi interaktif untuk membantu UMKM lokal belajar bisnis secara mandiri, gratis, dan efektif.
                </p>
                <div class="flex space-x-4">
                    ${socialLinks.map(link => `
                        <a href="${link.href}" class="w-10 h-10 bg-slate-100 hover:bg-primary-500 text-slate-600 hover:text-white rounded-xl flex items-center justify-center transition-colors">
                            <i class="${link.icon}"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    static createFooterNavigation() {
        const navItems = [
            { href: '#hero', text: 'Beranda' },
            { href: '#tentang', text: 'Tentang Kami' },
            { href: '#materi', text: 'Materi Belajar' },
            { href: '#kisahSukses', text: 'Kisah Sukses' }
        ];

        return `
            <div>
                <h3 class="heading-sub text-xl mb-4 text-slate-900">Navigasi</h3>
                <ul class="space-y-3">
                    ${navItems.map(item => `
                        <li>
                            <a href="${item.href}" class="text-slate-600 hover:text-primary-600 transition-colors">
                                ${item.text}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    static createFooterMaterials() {
        const materialItems = [
            { href: '#', text: 'Panduan Memulai' },
            { href: '#', text: 'Pemasaran Digital' },
            { href: '#', text: 'Manajemen Keuangan' },
            { href: '#', text: 'Strategi Bisnis' }
        ];

        return `
            <div>
                <h3 class="heading-sub text-xl mb-4 text-slate-900">Materi</h3>
                <ul class="space-y-3">
                    ${materialItems.map(item => `
                        <li>
                            <a href="${item.href}" class="text-slate-600 hover:text-primary-600 transition-colors">
                                ${item.text}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    static createFooterContact() {
        const contactInfo = [
            { icon: 'fas fa-envelope', text: 'keinginanusaha@gmail.com' },
            { icon: 'fas fa-phone', text: '+62 859 1264 62972' },
            { icon: 'fas fa-map-marker-alt', text: 'Yogyakarta, Indonesia' }
        ];

        return `
            <div>
                <h3 class="heading-sub text-xl mb-4 text-slate-900">Hubungi Kami</h3>
                <ul class="space-y-4">
                    ${contactInfo.map(item => `
                        <li class="flex items-center text-slate-600">
                            <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                <i class="${item.icon} text-primary-600 text-sm"></i>
                            </div>
                            <span class="text-sm">${item.text}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    static createFooterBottom() {
        return `
            <div class="border-t border-slate-200 mt-12 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <p class="text-slate-600 text-sm text-body">© 2025 KEINGINAN usaha. Hak Cipta Dilindungi.</p>
                    <p class="text-slate-600 text-sm mt-4 md:mt-0 text-body">Dibuat dengan ❤️ untuk UMKM Indonesia</p>
                </div>
                
                <div class="mt-6 text-center">
                    <div class="inline-flex items-center px-4 py-2 bg-slate-50 rounded-full text-xs text-slate-500">
                        <div class="status-dot mr-2"></div>
                        Platform ini telah membantu 10,000+ UMKM berkembang
                    </div>
                </div>
            </div>
        `;
    }

    static createModal(id, title, content, actions = '') {
        return `
            <div id="${id}" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm hidden">
                <div class="card-premium p-8 max-w-xl w-[90%] relative animate-scale-in">
                    <button class="modal-close absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors">
                        <i class="fas fa-times text-slate-600"></i>
                    </button>
                    <div class="mb-6">
                        <h4 class="heading-sub text-xl mb-2 text-slate-900">${title}</h4>
                        <div class="text-slate-600 text-body">${content}</div>
                    </div>
                    ${actions}
                </div>
            </div>
        `;
    }

    static createCard(type = 'elevated', content = '', classes = '') {
        return `
            <div class="card-${type} ${classes}">
                ${content}
            </div>
        `;
    }

    static createButton(type = 'primary', content = '', classes = '', icon = '') {
        const iconHtml = icon ? `<i class="${icon} mr-2"></i>` : '';
        return `
            <button class="btn-${type} ${classes}">
                ${iconHtml}${content}
            </button>
        `;
    }

    static createBadge(content = '', color = 'primary') {
        return `
            <span class="bg-${color}-100 text-${color}-700 px-3 py-1 rounded-full text-sm font-semibold">
                ${content}
            </span>
        `;
    }

    static createTestimonialCard(name, role, content, avatar = '', isDark = false) {
        const cardClass = isDark ? 'testimonial-card testimonial-dark' : 'testimonial-card';
        const textClass = isDark ? 'text-white' : 'text-slate-900';
        const roleClass = isDark ? 'text-blue-200' : 'text-slate-500';
        const quoteClass = isDark ? 'text-blue-200' : 'text-primary-500';
        
        return `
            <div class="${cardClass} rounded-2xl p-8 w-[90vw] sm:w-[400px] md:w-[480px] min-h-[280px] shadow-lg">
                <div class="text-6xl ${quoteClass} mb-4 font-serif">"</div>
                <p class="text-lg leading-relaxed mb-6 text-body ${isDark ? 'text-white' : ''}">${content}</p>
                <div class="flex items-center">
                    <div class="w-12 h-12 ${isDark ? 'bg-white/20 border border-white/30' : 'gradient-primary'} rounded-full flex items-center justify-center text-white font-bold mr-4">
                        ${avatar || name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                        <div class="font-semibold ${textClass}">${name}</div>
                        <div class="text-sm ${roleClass}">${role}</div>
                    </div>
                </div>
            </div>
        `;
    }

    static createFeatureCard(icon, title, description, color = 'primary') {
        return `
            <div class="group opacity-100 transform translate-y-0">
                <div class="card-premium p-8 hover-lift group-hover:border-${color}-300 transition-all duration-500 h-full opacity-100">
                    <div class="w-16 h-16 gradient-${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <i class="${icon} text-2xl text-white"></i>
                    </div>
                    <h3 class="heading-sub text-xl mb-4 text-slate-900">${title}</h3>
                    <p class="text-slate-600 mb-6 text-body">${description}</p>
                    <a href="#" class="inline-flex items-center text-${color}-600 font-semibold hover:text-${color}-700 transition-colors group">
                        Pelajari Selengkapnya
                        <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>
            </div>
        `;
    }
}