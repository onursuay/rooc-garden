# Ürün Görsel Yapısı

## 📁 Klasör Yapısı

Her kategori için ürünler `products/` klasörü altında, her ürün için ayrı klasörlerde saklanır:

```
[kategori]/
└── products/
    ├── urun-001/          # Birinci ürün
    │   ├── main.jpg       # Ana görsel (kategori sayfasında gösterilecek)
    │   ├── thumb-1.jpg    # Ürün sayfası görsel 1
    │   ├── thumb-2.jpg    # Ürün sayfası görsel 2
    │   ├── thumb-3.jpg    # Ürün sayfası görsel 3
    │   └── ...            # Sınırsız thumb-X.jpg
    │
    ├── urun-002/          # İkinci ürün
    │   ├── main.jpg
    │   ├── thumb-1.jpg
    │   └── ...
    │
    └── urun-003/          # Üçüncü ürün
        ├── main.jpg
        └── ...
```

## 🎯 Ürün Ekleme

1. `assets/images/[kategori]/products/` klasörüne gidin
2. Yeni klasör oluşturun: `urun-004/`, `urun-005/` vb.
3. İçine görselleri ekleyin:
   - `main.jpg` - Mutlaka olmalı (kategori sayfasında gösterilecek)
   - `thumb-1.jpg`, `thumb-2.jpg`... - Ürün sayfasında gösterilecek (isteğe bağlı)

## 📝 Dosya Adlandırma

✅ **Doğru:**
- `urun-001/`, `urun-002/`, `urun-003/`
- `main.jpg` (ana görsel, zorunlu)
- `thumb-1.jpg`, `thumb-2.jpg`, `thumb-3.jpg`... (sınırsız)

❌ **Yanlış:**
- `urun1/`, `product-1/`
- `main-image.jpg`, `ana-gorsel.jpg`
- `thumb1.jpg`, `thumbnail-1.jpg`

## 🔗 Ürün Linkleri

Her ürün otomatik olarak şu formatta link alır:
- `urunler/urun-001.html`
- `urunler/urun-002.html`
- vb.

Ürün ID'si klasör adından alınır (`urun-001` → ID: `001`)

## 📋 Ürün Bilgileri

Ürün ismi ve açıklaması JavaScript tarafından otomatik olarak üretilir veya `products.json` dosyasından okunur.

