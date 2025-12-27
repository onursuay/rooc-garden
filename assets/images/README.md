# Görsel Yönetim Sistemi

## 📁 Klasör Yapısı

Tüm görseller kategorize edilmiş klasörlerde saklanır. Bu yapı sayesinde görselleri kolayca bulup değiştirebilirsiniz.

### Ana Sayfa (home/)
```
home/
├── slider/          # Ana sayfa slider görselleri
│   ├── slide-1.jpg
│   ├── slide-2.jpg
│   └── ... (sınırsız)
├── categories/      # Kategori görselleri
│   ├── cat-1.jpg
│   ├── cat-2.jpg
│   └── ... (sınırsız)
├── promo/          # Promo görseli
│   └── promo.jpg
└── hero/           # Hero görseli (gelecekte kullanılabilir)
    └── hero.jpg
```

### Kategori Sayfaları
Her kategori için aynı yapı kullanılır:
```
[kategori-adi]/
├── banner/         # Kategori banner görseli
│   └── banner.jpg
└── products/       # Ürün görselleri
    ├── prod-1.jpg
    ├── prod-2.jpg
    └── ... (sınırsız)
```

Örnek kategoriler:
- `aksesuar/`
- `bahce-balkon-mobilyalari/`
- `ev-tekstili/`
- `ic-mekan-kapali-balkon-mobilyalari/`
- `perde/`
- `pergole/`
- `salincaklar/`

### İletişim
```
iletisim/
└── banner/
    └── banner.jpg
```

## 🎯 Görsel Değiştirme

### Yeni Görsel Eklemek
1. İlgili klasöre gidin (örn: `aksesuar/products/`)
2. Yeni görseli doğru formatta ekleyin (örn: `prod-5.jpg`)
3. Site otomatik olarak yeni görseli yükler

### Mevcut Görseli Değiştirmek
1. İlgili klasördeki dosyayı bulun (örn: `aksesuar/banner/banner.jpg`)
2. Aynı isimde yeni görsel ile değiştirin
3. Dosya adını değiştirmeyin!

### Görsel Silmek
- Dosyayı silin, artık görünmeyecek

## 📝 Dosya Adlandırma Kuralları

✅ **Doğru:**
- `prod-1.jpg`, `prod-2.jpg`, `prod-3.jpg`
- `slide-1.jpg`, `slide-2.jpg`
- `cat-1.jpg`, `cat-2.jpg`
- `banner.jpg` (her klasörde tek)

❌ **Yanlış:**
- `urun1.jpg`, `product-1.jpg`
- `slide_1.jpg`, `slide1.jpg`
- `banner-1.jpg` (banner her zaman `banner.jpg` olmalı)

## ⚡ Otomatik Yükleme

JavaScript otomatik olarak:
- Tüm görselleri bulur
- Sırayla yükler (prod-1, prod-2, prod-3...)
- Görsel yoksa otomatik olarak durur
- Lazy loading ile performansı optimize eder

## 🔄 Değişiklik Sonrası

Görseli değiştirdikten sonra:
1. Dosyayı kaydedin
2. Tarayıcıyı yenileyin (Ctrl+F5 veya Cmd+Shift+R)
3. Yeni görsel otomatik görünecek

HTML veya JavaScript dosyalarını değiştirmenize gerek yok!

