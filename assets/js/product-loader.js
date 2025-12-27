/**
 * Ürün Sayfası Dinamik Görsel Yükleme
 * URL'den ürün ID'sini alır ve o ürüne ait görselleri yükler
 */

class ProductLoader {
    constructor(basePath = '/assets/images') {
        this.basePath = basePath;
        this.placeholderPath = `${basePath}/placeholder.jpg`;
        this.productsData = null;
    }

    /**
     * URL'den ürün ID'sini al (örn: urunler/urun-001.html → urun-001)
     */
    getProductIdFromUrl() {
        const path = window.location.pathname;
        const match = path.match(/urunler\/([^\/]+)\.html/);
        if (match) {
            return match[1]; // urun-001
        }
        
        // Fallback: dosya adından
        const filename = path.split('/').pop();
        return filename.replace('.html', '');
    }

    /**
     * Ürün ID'sinden kategoriyi bul (products.json'dan)
     */
    async findProductCategory(productId) {
        if (!this.productsData) {
            await this.loadProductsData();
        }

        // Eğer eski format ise (ornek-urun-06) → urun-001'e çevir
        let normalizedId = productId;
        if (productId.startsWith('ornek-urun-')) {
            const num = productId.replace('ornek-urun-', '');
            normalizedId = `urun-${num.padStart(3, '0')}`;
        }

        for (const [category, products] of Object.entries(this.productsData)) {
            if (products[normalizedId] || products[productId]) {
                return category;
            }
        }
        return null;
    }

    /**
     * Tüm ürün bilgilerini yükle
     */
    async loadProductsData() {
        if (this.productsData) return this.productsData;

        try {
            const baseHref = this.basePath.includes('..') ? '../' : '';
            const response = await fetch(`${baseHref}assets/js/products.json`);
            if (response.ok) {
                const data = await response.json();
                this.productsData = data;
                return this.productsData;
            }
        } catch (error) {
            console.warn('Ürün bilgileri yüklenemedi:', error);
        }
        
        return {};
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
     * Ürün ana görselini yükle
     */
    async loadMainImage(category, productId, selector = '.product-gallery-main img') {
        const img = document.querySelector(selector);
        if (!img) return;

        const mainImagePath = `${this.basePath}/${category}/products/${productId}/main.jpg`;
        const exists = await this.checkImageExists(mainImagePath);

        if (exists) {
            img.src = mainImagePath;
            img.alt = productId;
            img.onerror = () => {
                img.src = this.placeholderPath;
            };
        } else {
            img.src = this.placeholderPath;
        }
    }

    /**
     * Ürün thumbnail görsellerini yükle
     */
    async loadThumbnails(category, productId, containerSelector = '.product-gallery-thumbs') {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const thumbs = [];
        let index = 1;

        // thumb-1.jpg, thumb-2.jpg... sırayla kontrol et
        while (true) {
            const thumbPath = `${this.basePath}/${category}/products/${productId}/thumb-${index}.jpg`;
            const exists = await this.checkImageExists(thumbPath);
            
            if (!exists) break;

            thumbs.push({
                src: thumbPath,
                index: index
            });
            index++;
        }

        // Eğer thumb yoksa, main.jpg'i kullan
        if (thumbs.length === 0) {
            const mainPath = `${this.basePath}/${category}/products/${productId}/main.jpg`;
            const mainExists = await this.checkImageExists(mainPath);
            if (mainExists) {
                thumbs.push({ src: mainPath, index: 1 });
            }
        }

        if (thumbs.length > 0) {
            container.innerHTML = thumbs.map((thumb, idx) => {
                const activeClass = idx === 0 ? 'is-active' : '';
                return `
                    <div class="product-thumb ${activeClass}" data-thumb="${idx}">
                        <img 
                            src="${thumb.src}" 
                            loading="lazy" 
                            onerror="this.src='${this.placeholderPath}'"
                            alt="Ürün görseli ${idx + 1}"
                        >
                    </div>
                `;
            }).join('');

            // Thumbnail click event'lerini ekle
            this.setupThumbnailEvents(category, productId);
        }
    }

    /**
     * Thumbnail click event'lerini ayarla
     */
    setupThumbnailEvents(category, productId) {
        const thumbs = document.querySelectorAll('.product-thumb');
        const mainImg = document.querySelector('.product-gallery-main img');

        thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                // Active class'ı güncelle
                thumbs.forEach(t => t.classList.remove('is-active'));
                thumb.classList.add('is-active');

                // Ana görseli değiştir
                const thumbImg = thumb.querySelector('img');
                if (mainImg && thumbImg) {
                    mainImg.src = thumbImg.src;
                }
            });
        });
    }

    /**
     * Ürün bilgilerini yükle (isim, açıklama, kategori)
     */
    async loadProductInfo(productId, category) {
        await this.loadProductsData();

        const productInfo = this.productsData[category]?.[productId] || {};
        
        // Başlık güncelle
        const titleElement = document.querySelector('.product-detail-title, h1');
        if (titleElement && productInfo.name) {
            titleElement.textContent = productInfo.name;
            document.title = `${productInfo.name} - Enza Home`;
        }

        // Alt başlık/açıklama güncelle
        const subtitleElement = document.querySelector('.product-detail-subtitle, .product-info-header p');
        if (subtitleElement && productInfo.description) {
            subtitleElement.textContent = productInfo.description;
        }

        // Meta description güncelle
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && productInfo.description) {
            metaDesc.setAttribute('content', productInfo.description);
        }

        // Breadcrumb güncelle
        const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
        if (breadcrumbCurrent && productInfo.name) {
            breadcrumbCurrent.textContent = productInfo.name;
        }

        // WhatsApp butonlarını güncelle
        const whatsappButtons = document.querySelectorAll('[data-product-name], .btn-product-whatsapp, .mobile-whatsapp-btn');
        whatsappButtons.forEach(btn => {
            if (productInfo.name) {
                btn.setAttribute('data-product-name', productInfo.name);
            }
        });
    }

    /**
     * Tüm ürün bilgilerini yükle
     */
    async loadAll() {
        const productId = this.getProductIdFromUrl();
        if (!productId) {
            console.error('Ürün ID bulunamadı');
            return;
        }

        // Kategoriyi bul
        const category = await this.findProductCategory(productId);
        if (!category) {
            console.error('Ürün kategorisi bulunamadı:', productId);
            return;
        }

        // Base path'i ayarla (ürün sayfaları urunler/ klasöründe)
        const baseHref = '../';
        this.basePath = `${baseHref}assets/images`;

        // Ürün bilgilerini yükle
        await this.loadProductInfo(productId, category);

        // Görselleri yükle
        await this.loadMainImage(category, productId);
        await this.loadThumbnails(category, productId);
    }
}

// Ürün sayfası için otomatik yükleme
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('/urunler/') && path.endsWith('.html')) {
        const loader = new ProductLoader('../assets/images');
        loader.loadAll();
    }
});

