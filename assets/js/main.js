/**
 * Enza Home - Ana JavaScript Dosyası
 * Header/Footer Inject + WhatsApp Entegrasyonu
 */

// ==========================================================================
// WhatsApp Konfigürasyonu
// ==========================================================================
const WHATSAPP_NUMBER = "905326023199";

// WhatsApp link oluşturma fonksiyonu
function getWhatsAppLink(productName = null) {
    let message = "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.";
    
    if (productName) {
        message = `Merhaba, ${productName} hakkında bilgi almak istiyorum.`;
    }
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ==========================================================================
// Header ve Footer Yükleme
// ==========================================================================
async function loadPartials() {
    const headerPlaceholder = document.getElementById('site-header');
    const footerPlaceholder = document.getElementById('site-footer');
    
    try {
        // Header yükle - mutlak path kullan (sunucu site klasöründen çalışıyor)
        if (headerPlaceholder) {
            const headerResponse = await fetch('/partials/header.html');
            if (headerResponse.ok) {
                let headerHTML = await headerResponse.text();
                // Path'leri düzelt - /site/ yerine / kullan
                headerHTML = headerHTML.replace(/\/site\//g, '/');
                headerPlaceholder.innerHTML = headerHTML;
                initMobileMenu();
            }
        }
        
        // Footer yükle
        if (footerPlaceholder) {
            const footerResponse = await fetch('/partials/footer.html');
            if (footerResponse.ok) {
                let footerHTML = await footerResponse.text();
                // Path'leri düzelt
                footerHTML = footerHTML.replace(/\/site\//g, '/');
                footerPlaceholder.innerHTML = footerHTML;
            }
        }
        
        // WhatsApp linklerini güncelle
        updateWhatsAppLinks();
        
    } catch (error) {
        // Sessizce hata yönetimi
    }
}

// ==========================================================================
// WhatsApp Linklerini Güncelleme
// ==========================================================================
function updateWhatsAppLinks() {
    // Header ve Footer WhatsApp butonları
    const headerBtn = document.getElementById('header-whatsapp-btn');
    const footerBtn = document.getElementById('footer-whatsapp-btn');
    
    if (headerBtn) {
        headerBtn.href = getWhatsAppLink();
        headerBtn.target = '_blank';
        headerBtn.rel = 'noopener noreferrer';
    }
    
    if (footerBtn) {
        footerBtn.href = getWhatsAppLink();
        footerBtn.target = '_blank';
        footerBtn.rel = 'noopener noreferrer';
    }
    
    // Sayfa içi tüm WhatsApp butonları
    document.querySelectorAll('.btn-whatsapp, .btn-whatsapp-large, .btn-product-whatsapp, .product-cta-btn, .mobile-whatsapp-btn, .contact-whatsapp-btn').forEach(btn => {
        // Eğer data-product-name varsa ürün adıyla link oluştur
        const productName = btn.dataset.productName;
        btn.href = getWhatsAppLink(productName);
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        
        // a tag değilse onclick ekle
        if (btn.tagName !== 'A') {
            btn.addEventListener('click', () => {
                window.open(getWhatsAppLink(productName), '_blank');
            });
        }
    });
}

// ==========================================================================
// Mobile Menu
// ==========================================================================
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-overlay');
    
    if (menuToggle && mobileNav && overlay) {
        // Menü açma/kapama fonksiyonu
        function toggleMenu(isOpen) {
            if (isOpen) {
                mobileNav.classList.add('is-open');
                overlay.classList.add('is-active');
                document.body.classList.add('menu-open');
            } else {
                mobileNav.classList.remove('is-open');
                overlay.classList.remove('is-active');
                document.body.classList.remove('menu-open');
            }
            
            // Icon değiştir
            const icon = menuToggle.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = isOpen ? 'close' : 'menu';
            }
        }
        
        // Menü toggle butonu
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = !mobileNav.classList.contains('is-open');
            toggleMenu(isOpen);
        });
        
        // Overlay'e tıklayınca menüyü kapat
        overlay.addEventListener('click', function() {
            toggleMenu(false);
        });
        
        // Mobile dropdown toggle
        mobileNav.querySelectorAll('.mobile-dropdown-trigger').forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdown = this.closest('.mobile-dropdown');
                if (dropdown) {
                    dropdown.classList.toggle('is-open');
                }
            });
        });
        
        // Menü linklerine tıklandığında menüyü kapat (dropdown trigger hariç)
        mobileNav.querySelectorAll('a.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });
    }
}

// ==========================================================================
// Sayfa Yüklendiğinde Çalıştır
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Partials'ı hızlıca yükle
    loadPartials();
    
    // WhatsApp linklerini güncelle
    setTimeout(() => {
        updateWhatsAppLinks();
    }, 100);
});

// Sayfa geçişlerinde scroll pozisyonunu koru
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Sayfa yüklendiğinde scroll'u üste al
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ==========================================================================
// Smooth Scroll - Kaldırıldı (performans için)
// ==========================================================================
// Smooth scroll sayfa geçişlerinde layout shift'e sebep oluyor
// Bu sebeple devre dışı bırakıldı

// ==========================================================================
// Export for global usage
// ==========================================================================
window.EnzaHome = {
    WHATSAPP_NUMBER,
    getWhatsAppLink,
    updateWhatsAppLinks
};

