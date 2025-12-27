/**
 * Enza Home - Ürün Detay Galeri Slider
 * Vanilla JavaScript ile basit galeri
 */

class ProductGallery {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.mainImage = this.container.querySelector('.product-gallery-main img');
        this.thumbs = this.container.querySelectorAll('.product-thumb');
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        if (!this.mainImage || this.thumbs.length === 0) return;
        
        // Thumbnail click events
        this.thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goTo(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Touch/Swipe on main image
        this.initTouchEvents();
    }
    
    goTo(index) {
        if (index < 0) index = this.thumbs.length - 1;
        if (index >= this.thumbs.length) index = 0;
        
        this.currentIndex = index;
        
        // Update thumbs
        this.thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('is-active', i === index);
        });
        
        // Update main image
        const newThumb = this.thumbs[index];
        if (newThumb) {
            const img = newThumb.querySelector('img');
            if (img && this.mainImage) {
                // Fade effect
                this.mainImage.style.opacity = '0';
                
                setTimeout(() => {
                    this.mainImage.src = img.src;
                    this.mainImage.alt = img.alt || '';
                    this.mainImage.style.opacity = '1';
                }, 150);
            }
        }
    }
    
    next() {
        this.goTo(this.currentIndex + 1);
    }
    
    prev() {
        this.goTo(this.currentIndex - 1);
    }
    
    initTouchEvents() {
        const mainContainer = this.container.querySelector('.product-gallery-main');
        if (!mainContainer) return;
        
        let startX = 0;
        let isDragging = false;
        
        mainContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        mainContainer.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            isDragging = false;
        }, { passive: true });
    }
}

// Sayfa yüklendiğinde galeriyi başlat
document.addEventListener('DOMContentLoaded', () => {
    new ProductGallery('.product-gallery');
});

