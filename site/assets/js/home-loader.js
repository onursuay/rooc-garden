/**
 * Ana Sayfa Dinamik Görsel Yükleme
 */

class HomeImageLoader {
    constructor(basePath = '/assets/images') {
        this.basePath = basePath;
        this.placeholderPath = `${basePath}/placeholder.jpg`;
    }

    async checkImageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    /**
     * Hero slider görsellerini yükle
     */
    async loadHeroSlides() {
        const sliderTrack = document.querySelector('.hero-slider .slider-track');
        if (!sliderTrack) return;

        const slides = [];
        let index = 1;

        while (true) {
            const slidePath = `${this.basePath}/home/slider/slide-${index}.jpg`;
            const exists = await this.checkImageExists(slidePath);
            
            if (!exists) break;

            slides.push({
                src: slidePath,
                index: index
            });
            index++;
        }

        if (slides.length > 0) {
            sliderTrack.innerHTML = slides.map((slide, idx) => {
                return `
                    <div class="slide" style="background-image: url('${slide.src}');" onerror="this.style.backgroundImage='url(${this.placeholderPath})'">
                        <div class="slide-overlay"></div>
                        <div class="container slide-content">
                            <span class="slide-badge">2024 Koleksiyonu</span>
                            <h2 class="slide-title">Slide ${idx + 1}</h2>
                        </div>
                    </div>
                `;
            }).join('');

            // Slider dots oluştur
            const dotsContainer = document.querySelector('.slider-dots');
            if (dotsContainer) {
                dotsContainer.innerHTML = slides.map((_, idx) => {
                    return `<div class="slider-dot ${idx === 0 ? 'is-active' : ''}" data-slide="${idx}"></div>`;
                }).join('');
            }
        }
    }

    /**
     * Kategori görsellerini yükle
     */
    async loadCategories() {
        const categoriesGrid = document.querySelector('.categories-grid');
        if (!categoriesGrid) return;

        const categories = [
            { name: 'bahce-balkon-mobilyalari', title: 'Bahçe Ve Balkon Mobilyaları', link: 'bahce-balkon-mobilyalari/index.html', featured: true },
            { name: 'salincaklar', title: 'Salıncaklar', link: 'salincaklar/index.html' },
            { name: 'ic-mekan-kapali-balkon-mobilyalari', title: 'İç Mekan Ve Kapalı Balkon', link: 'ic-mekan-kapali-balkon-mobilyalari/index.html' },
            { name: 'pergole', title: 'Pergole', link: 'pergole/index.html' },
            { name: 'perde', title: 'Perde', link: 'perde/index.html' },
            { name: 'aksesuar', title: 'Aksesuar', link: 'aksesuar/index.html' },
            { name: 'ev-tekstili', title: 'Ev Tekstili', link: 'ev-tekstili/index.html' }
        ];

        const loadedCategories = [];

        for (let i = 0; i < categories.length; i++) {
            const cat = categories[i];
            const catPath = `${this.basePath}/home/categories/cat-${i + 1}.jpg`;
            const exists = await this.checkImageExists(catPath);

            if (exists) {
                loadedCategories.push({
                    ...cat,
                    src: catPath,
                    index: i + 1
                });
            }
        }

        if (loadedCategories.length > 0) {
            categoriesGrid.innerHTML = loadedCategories.map((cat, idx) => {
                const featuredClass = cat.featured ? 'category-card--featured' : '';
                return `
                    <a href="${cat.link}" class="category-card ${featuredClass}">
                        <div class="category-card-bg" style="background-image: url('${cat.src}');" onerror="this.style.backgroundImage='url(${this.placeholderPath})'"></div>
                        <div class="category-card-overlay"></div>
                        <div class="category-card-content">
                            <h3 class="category-card-title">${cat.title}</h3>
                            ${cat.featured ? '<span class="category-card-link">İncele <span class="material-symbols-outlined">arrow_forward</span></span>' : ''}
                        </div>
                    </a>
                `;
            }).join('');
        }
    }

    /**
     * Promo görselini yükle
     */
    async loadPromo() {
        const promoBg = document.querySelector('.promo-card-bg');
        if (!promoBg) return;

        const promoPath = `${this.basePath}/home/promo/promo.jpg`;
        const exists = await this.checkImageExists(promoPath);

        if (exists) {
            promoBg.style.backgroundImage = `url('${promoPath}')`;
            promoBg.setAttribute('onerror', `this.style.backgroundImage='url(${this.placeholderPath})'`);
        } else {
            promoBg.style.backgroundImage = `url('${this.placeholderPath}')`;
        }
    }

    /**
     * Hero görselini yükle
     */
    async loadHero() {
        const heroPath = `${this.basePath}/home/hero/hero.jpg`;
        const exists = await this.checkImageExists(heroPath);
        // Hero için özel bir container varsa buraya eklenebilir
    }

    /**
     * Tüm ana sayfa görsellerini yükle
     */
    async loadAll() {
        await this.loadHeroSlides();
        await this.loadCategories();
        await this.loadPromo();
        await this.loadHero();
    }
}

// Ana sayfa için otomatik yükleme
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/' || window.location.pathname.includes('/index.html')) {
        const loader = new HomeImageLoader();
        loader.loadAll();
    }
});



