# Dinamik Görsel Yönetim Sistemi

## 🎯 Özellikler

- ✅ **Sınırsız görsel desteği**: Kaç görsel atarsanız atın, hepsi otomatik yüklenir
- ✅ **Otomatik yükleme**: JavaScript klasörlerdeki tüm görselleri bulur ve render eder
- ✅ **Lazy loading**: Görseller görünene kadar yüklenmez
- ✅ **Responsive**: Mobil ve desktop için optimize
- ✅ **Cache**: 1 yıl browser cache
- ✅ **Format dönüşümü**: Vercel otomatik WebP/AVIF'e çevirir

## 📁 Klasör Yapısı

```
assets/images/
├── home/
│   ├── hero/
│   │   └── hero.jpg (tek)
│   ├── slider/
│   │   ├── slide-1.jpg
│   │   ├── slide-2.jpg
│   │   └── ... (sınırsız)
│   ├── categories/
│   │   ├── cat-1.jpg
│   │   ├── cat-2.jpg
│   │   └── ... (sınırsız)
│   └── promo/
│       └── promo.jpg (tek)
│
├── aksesuar/
│   ├── banner/
│   │   └── banner.jpg (tek)
│   ├── slider/
│   │   ├── slide-1.jpg
│   │   └── ... (sınırsız)
│   └── products/
│       ├── prod-1.jpg
│       ├── prod-2.jpg
│       └── ... (sınırsız)
│
└── [diğer kategoriler]/
    ├── banner/
    ├── slider/
    └── products/
```

## 🚀 Kullanım

### 1. Görselleri Yükleme

**Kategori sayfası için:**
```
assets/images/aksesuar/products/prod-1.jpg
assets/images/aksesuar/products/prod-2.jpg
assets/images/aksesuar/products/prod-3.jpg
...
```

**Ana sayfa için:**
```
assets/images/home/slider/slide-1.jpg
assets/images/home/slider/slide-2.jpg
...
```

### 2. HTML'e JavaScript Ekleme

**Kategori sayfaları için:**
```html
<script src="assets/js/main.js"></script>
<script src="assets/js/image-loader.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new ImageLoader('aksesuar'); // Kategori adı
        loader.loadAll({
            loadBanner: true,
            loadSlider: false,
            loadProducts: true
        });
    });
</script>
```

**Ana sayfa için:**
```html
<script src="assets/js/main.js"></script>
<script src="assets/js/home-loader.js"></script>
<!-- Otomatik yüklenir, ekstra kod gerekmez -->
```

### 3. HTML Yapısı

**Kategori sayfası:**
```html
<!-- Banner (otomatik yüklenir) -->
<div class="category-banner-bg"></div>

<!-- Ürün grid (otomatik doldurulur) -->
<div class="products-grid">
    <!-- JavaScript buraya ürün kartlarını ekler -->
</div>
```

## 📝 Dosya Adlandırma Kuralları

- ✅ **Doğru**: `prod-1.jpg`, `prod-2.jpg`, `slide-1.jpg`
- ❌ **Yanlış**: `urun1.jpg`, `product-1.jpg`, `slide_1.jpg`

**Önemli:** Dosya adlarını değiştirmeyin! JavaScript bu formatı bekliyor.

## 🔧 Özelleştirme

### Özel Ürün Kartı Template'i

```javascript
const loader = new ImageLoader('aksesuar');
loader.loadProducts('.products-grid', (product, index) => {
    return `
        <div class="product-card">
            <img src="${product.src}" alt="Ürün ${index + 1}" />
            <h3>Özel Başlık ${index + 1}</h3>
        </div>
    `;
});
```

### Sadece Banner Yükleme

```javascript
const loader = new ImageLoader('aksesuar');
loader.loadBanner('.category-banner-bg');
```

## 🎨 CSS Aspect Ratio

Görseller otomatik olarak aspect-ratio ile optimize edilir:
- Ürün kartları: `1:1` (kare)
- Hero slider: `16:9`
- Kategori banner: `21:9`

## 📊 Performans

- **Lazy loading**: Görseller görünene kadar yüklenmez
- **Cache**: 1 yıl browser cache (vercel.json)
- **Format**: Otomatik WebP/AVIF dönüşümü
- **Responsive**: srcset ile mobil/desktop optimize

## 🐛 Sorun Giderme

**Görseller görünmüyor:**
1. Dosya adlarını kontrol edin (`prod-1.jpg` formatında olmalı)
2. Klasör yapısını kontrol edin
3. Browser console'da hata var mı kontrol edin

**JavaScript çalışmıyor:**
1. `image-loader.js` dosyasının yüklendiğini kontrol edin
2. `DOMContentLoaded` event'inin tetiklendiğini kontrol edin
3. Kategori adının doğru olduğunu kontrol edin

## 📚 Örnek Dosyalar

- `site/example-category.html` - Kategori sayfası örneği
- `site/assets/js/image-loader.js` - Ana loader sınıfı
- `site/assets/js/home-loader.js` - Ana sayfa loader



