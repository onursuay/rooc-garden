/**
 * Enza Home - Ana Sayfa Hero Slider
 * Vanilla JavaScript ile basit slider
 */

class HomeSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.track = this.container.querySelector('.slider-track');
        this.slides = this.container.querySelectorAll('.slide');
        this.dotsContainer = this.container.querySelector('.slider-dots');
        this.prevBtn = this.container.querySelector('.slider-nav--prev');
        this.nextBtn = this.container.querySelector('.slider-nav--next');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        
        this.init();
    }
    
    init() {
        if (this.slideCount === 0) return;
        
        // Dots oluştur
        this.createDots();
        
        // Event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Touch/Swipe desteği
        this.initTouchEvents();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Autoplay
        this.startAutoPlay();
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // İlk slide'ı göster
        this.goTo(0);
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot' + (i === 0 ? ' is-active' : '');
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        }
        
        this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
    }
    
    updateDots() {
        if (!this.dots) return;
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === this.currentIndex);
        });
    }
    
    goTo(index) {
        if (index < 0) index = this.slideCount - 1;
        if (index >= this.slideCount) index = 0;
        
        this.currentIndex = index;
        
        if (this.track) {
            this.track.style.transform = `translateX(-${index * 100}%)`;
        }
        
        this.updateDots();
    }
    
    next() {
        this.goTo(this.currentIndex + 1);
    }
    
    prev() {
        this.goTo(this.currentIndex - 1);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    initTouchEvents() {
        let startX = 0;
        let isDragging = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoPlay();
        }, { passive: true });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
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
            this.startAutoPlay();
        }, { passive: true });
    }
}

// Sayfa yüklendiğinde slider'ı başlat
document.addEventListener('DOMContentLoaded', () => {
    new HomeSlider('.hero-slider');
});

