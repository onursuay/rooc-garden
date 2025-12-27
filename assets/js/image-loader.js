/**
 * Dinamik Görsel Yükleme Sistemi
 * Klasörlerdeki tüm görselleri otomatik olarak yükler ve render eder
 */

class ImageLoader {
    constructor(category, basePath = '/assets/images') {
        this.category = category;
        this.basePath = basePath;
        this.placeholderPath = `${this.basePath}/placeholder.jpg`;
        this.productsData = null;
    }

    /**
     * Ürün bilgilerini yükle (products.json)
     */
    async loadProductsData() {
        if (this.productsData) return this.productsData;

        try {
            const baseHref = this.basePath.includes('..') ? '../' : '';
            const response = await fetch(`${baseHref}assets/js/products.json`);
            if (response.ok) {
                const data = await response.json();
                this.productsData = data[this.category] || {};
                return this.productsData;
            }
        } catch (error) {
            console.warn('Ürün bilgileri yüklenemedi, varsayılanlar kullanılacak:', error);
        }
        
        return {};
    }

    /**
     * Dosya adından başlık üret
     */
    formatTitle(filename) {
        return filename
            .replace(/\.(jpg|jpeg|png|webp)$/i, '')
            .replace(/[-_]/g, ' ')
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
     * Klasör var mı kontrol et (ürün klasörleri için)
     */
    async checkDirectoryExists(path) {
        // Klasör varlığını kontrol etmek için main.jpg dosyasını kontrol ediyoruz
        const mainImagePath = `${path}/main.jpg`;
        return await this.checkImageExists(mainImagePath);
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
            let slidePath = `${this.basePath}/${this.category}/slider/slide-${index}.jpg`;
            let exists = await this.checkImageExists(slidePath);
            
            if (!exists) {
                slidePath = `${this.basePath}/${this.category}/slide-${index}.jpg`;
                exists = await this.checkImageExists(slidePath);
            }
            
            if (!exists) break;

            slides.push({
                src: slidePath,
                index: index
            });
            index++;
        }

        if (slides.length > 0) {
            container.innerHTML = slides.map((slide, idx) => {
                const isActive = idx === 0 ? 'is-active' : '';
                return `<div class="slider-dot ${isActive}" data-slide="${idx}"></div>`;
            }).join('');

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
     * Ürün görsellerini yükle (yeni sistem: urun-001/, urun-002/ klasörleri)
     */
    async loadProducts(containerSelector, productTemplate = null) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Ürün bilgilerini yükle
        await this.loadProductsData();

        const products = [];
        let index = 1;

        // urun-001/, urun-002/ formatında klasörleri kontrol et
        while (true) {
            const productFolder = `urun-${String(index).padStart(3, '0')}`;
            const productPath = `${this.basePath}/${this.category}/products/${productFolder}`;
            const mainImagePath = `${productPath}/main.jpg`;
            
            const exists = await this.checkImageExists(mainImagePath);
            if (!exists) break;

            // Ürün bilgilerini al
            const productInfo = this.productsData[productFolder] || {};
            const productName = productInfo.name || `Ürün ${index}`;
            const productDesc = productInfo.description || 'Ürün açıklaması buraya gelecek.';
            const productCategory = productInfo.category || this.category;

            products.push({
                id: productFolder,
                folder: productFolder,
                src: mainImagePath,
                name: productName,
                description: productDesc,
                category: productCategory,
                index: index
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
     * Ürün kartı template'i
     */
    createProductCard(product, index) {
        const badges = ['Yeni', 'Popüler'];
        const badge = index < 2 ? `<span class="product-badge ${index === 0 ? 'product-badge--new' : ''}">${badges[index] || ''}</span>` : '';
        
        // Relative path için href ayarla
        const baseHref = this.basePath.includes('..') ? '../' : '';
        const productUrl = `${baseHref}urunler/${product.id}.html`;
        
        return `
            <div class="product-card">
                <a href="${productUrl}" class="product-card-image">
                    ${badge}
                    <img 
                        src="${product.src}" 
                        srcset="${product.src} 600w, ${product.src} 1200w"
                        sizes="(max-width: 768px) 100vw, 600px"
                        loading="lazy" 
                        onerror="this.src='${this.placeholderPath}'" 
                        alt="${product.name}"
                    />
                </a>
                <div class="product-card-info">
                    <span class="product-category">${product.category}</span>
                    <a href="${productUrl}" class="product-title">${product.name}</a>
                    <p class="product-desc">${product.description}</p>
                    <a href="#" class="btn-product-whatsapp" data-product-name="${product.name}">
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

        let bannerPath = `${this.basePath}/${this.category}/banner/banner.jpg`;
        let exists = await this.checkImageExists(bannerPath);
        
        if (!exists) {
            bannerPath = `${this.basePath}/${this.category}/banner.jpg`;
            exists = await this.checkImageExists(bannerPath);
        }

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
    const path = window.location.pathname;
    let category = null;

    if (path.includes('/aksesuar') || path.includes('aksesuar/index.html')) category = 'aksesuar';
    else if (path.includes('/bahce-balkon-mobilyalari') || path.includes('bahce-balkon-mobilyalari/index.html')) category = 'bahce-balkon-mobilyalari';
    else if (path.includes('/ev-tekstili') || path.includes('ev-tekstili/index.html')) category = 'ev-tekstili';
    else if (path.includes('/ic-mekan-kapali-balkon-mobilyalari') || path.includes('ic-mekan-kapali-balkon-mobilyalari/index.html')) category = 'ic-mekan-kapali-balkon-mobilyalari';
    else if (path.includes('/perde') || path.includes('perde/index.html')) category = 'perde';
    else if (path.includes('/pergole') || path.includes('pergole/index.html')) category = 'pergole';
    else if (path.includes('/salincaklar') || path.includes('salincaklar/index.html')) category = 'salincaklar';

    if (category) {
        const loader = new ImageLoader(category, '../assets/images');
        loader.loadAll({
            loadBanner: true,
            loadSlider: false,
            loadProducts: true // Artık dinamik yükleme aktif
        });
    }
});
