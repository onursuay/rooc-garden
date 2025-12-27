/**
 * Dinamik Görsel Yükleme Sistemi
 * Klasörlerdeki tüm görselleri otomatik olarak yükler ve render eder
 */

class ImageLoader {
    constructor(category, basePath = '/assets/images') {
        this.category = category;
        this.basePath = basePath;
        this.placeholderPath = `${basePath}/placeholder.jpg`;
    }

    /**
     * Dosya adından başlık üret
     * Örnek: "koltuk-takimlari.jpg" → "Koltuk Takımları"
     */
    formatTitle(filename) {
        return filename
            .replace(/\.(jpg|jpeg|png|webp)$/i, '') // Uzantı çıkar
            .replace(/[-_]/g, ' ')                   // Tire/alt çizgi → boşluk
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    /**
     * Görselin var olup olmadığını kontrol et
     */
    async checkImageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    /**
     * Slider görsellerini yükle
     */
    async loadSlides(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const slides = [];
        let index = 1;

        while (true) {
            const slidePath = `${this.basePath}/${this.category}/slider/slide-${index}.jpg`;
            const exists = await this.checkImageExists(slidePath);
            
            if (!exists) break;

            slides.push({
                src: slidePath,
                index: index
            });
            index++;
        }

        // Slider container'ına ekle
        if (slides.length > 0) {
            container.innerHTML = slides.map((slide, idx) => {
                const isActive = idx === 0 ? 'is-active' : '';
                return `
                    <div class="slider-dot ${isActive}" data-slide="${idx}"></div>
                `;
            }).join('');

            // Slider track'e slide'ları ekle
            const sliderTrack = document.querySelector('.slider-track');
            if (sliderTrack) {
                sliderTrack.innerHTML = slides.map((slide, idx) => {
                    return `
                        <div class="slide" style="background-image: url('${slide.src}');" onerror="this.style.backgroundImage='url(${this.placeholderPath})'">
                            <div class="slide-overlay"></div>
                            <div class="container slide-content">
                                <span class="slide-badge">${this.category}</span>
                                <h2 class="slide-title">Slide ${idx + 1}</h2>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }
    }

    /**
     * Ürün görsellerini yükle
     * Hem prod-X.jpg formatını hem de anlamlı dosya adlarını destekler
     */
    async loadProducts(containerSelector, productTemplate = null) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const products = [];
        let index = 1;

        // Önce prod-X.jpg formatını dene (geriye dönük uyumluluk)
        while (true) {
            const productPath = `${this.basePath}/${this.category}/prod-${index}.jpg`;
            const exists = await this.checkImageExists(productPath);
            
            if (!exists) break;

            // Dosya adından başlık üret
            const filename = `prod-${index}.jpg`;
            const title = this.formatTitle(filename);

            products.push({
                src: productPath,
                index: index,
                filename: filename,
                title: title
            });
            index++;
        }

        // Ürün kartlarını oluştur ve ekle
        if (products.length > 0) {
            container.innerHTML = products.map((product, idx) => {
                if (productTemplate) {
                    return productTemplate(product, idx);
                }
                return this.createProductCard(product, idx);
            }).join('');
        }
    }

    /**
     * Varsayılan ürün kartı template'i
     * Dosya adından otomatik başlık üretir
     */
    createProductCard(product, index) {
        const badges = ['Yeni', 'Popüler'];
        const badge = index < 2 ? `<span class="product-badge ${index === 0 ? 'product-badge--new' : ''}">${badges[index] || ''}</span>` : '';
        
        // Dosya adından başlık üret (eğer title yoksa formatTitle kullan)
        const title = product.title || this.formatTitle(product.filename || `prod-${product.index}.jpg`);
        const productName = title || `Ürün ${index + 1}`;
        
        return `
            <div class="product-card">
                <a href="../urunler/ornek-urun-${String(index + 1).padStart(2, '0')}.html" class="product-card-image">
                    ${badge}
                    <img 
                        src="${product.src}" 
                        srcset="${product.src} 600w, ${product.src} 1200w"
                        sizes="(max-width: 768px) 100vw, 600px"
                        loading="lazy" 
                        onerror="this.src='${this.placeholderPath}'" 
                        alt="${productName}"
                    />
                </a>
                <div class="product-card-info">
                    <span class="product-category">${this.category}</span>
                    <a href="../urunler/ornek-urun-${String(index + 1).padStart(2, '0')}.html" class="product-title">${productName}</a>
                    <p class="product-desc">Ürün açıklaması buraya gelecek.</p>
                    <a href="#" class="btn-product-whatsapp" data-product-name="${productName}">
                        <span class="material-symbols-outlined">chat</span>
                        WhatsApp İle Sor
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Banner görselini yükle
     */
    async loadBanner(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const bannerPath = `${this.basePath}/${this.category}/banner/banner.jpg`;
        const exists = await this.checkImageExists(bannerPath);

        if (exists) {
            container.style.backgroundImage = `url('${bannerPath}')`;
            container.setAttribute('onerror', `this.style.backgroundImage='url(${this.placeholderPath})'`);
        } else {
            container.style.backgroundImage = `url('${this.placeholderPath}')`;
        }
    }

    /**
     * Tüm görselleri yükle (banner, slider, products)
     */
    async loadAll(options = {}) {
        const {
            loadBanner = true,
            loadSlider = false,
            loadProducts = true,
            bannerSelector = '.category-banner-bg',
            sliderSelector = '.slider-dots',
            productsSelector = '.products-grid'
        } = options;

        if (loadBanner) {
            await this.loadBanner(bannerSelector);
        }

        if (loadSlider) {
            await this.loadSlides(sliderSelector);
        }

        if (loadProducts) {
            await this.loadProducts(productsSelector);
        }
    }
}

// Kategori sayfaları için otomatik yükleme
document.addEventListener('DOMContentLoaded', () => {
    // Sayfa yolundan kategoriyi belirle
    const path = window.location.pathname;
    let category = null;

    if (path.includes('/aksesuar')) category = 'aksesuar';
    else if (path.includes('/bahce-balkon-mobilyalari')) category = 'bahce-balkon-mobilyalari';
    else if (path.includes('/ev-tekstili')) category = 'ev-tekstili';
    else if (path.includes('/ic-mekan-kapali-balkon-mobilyalari')) category = 'ic-mekan-kapali-balkon-mobilyalari';
    else if (path.includes('/perde')) category = 'perde';
    else if (path.includes('/pergole')) category = 'pergole';
    else if (path.includes('/salincaklar')) category = 'salincaklar';

    if (category) {
        const loader = new ImageLoader(category);
        loader.loadAll({
            loadBanner: true,
            loadSlider: false,
            loadProducts: true
        });
    }
});



