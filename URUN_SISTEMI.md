# Ürün Yönetim Sistemi

## 📋 Genel Bakış

Bu sistem, sınırsız sayıda ürün eklemenizi ve her ürün için özel sayfa oluşturmanızı sağlar.

## 📁 Klasör Yapısı

### Kategori Klasörleri
```
assets/images/
├── [kategori]/
│   ├── banner/
│   │   └── banner.jpg
│   └── products/
│       ├── urun-001/          # Birinci ürün
│       │   ├── main.jpg       # Kategori sayfasında gösterilecek ana görsel
│       │   ├── thumb-1.jpg    # Ürün sayfası görsel 1
│       │   ├── thumb-2.jpg    # Ürün sayfası görsel 2
│       │   └── thumb-3.jpg    # Ürün sayfası görsel 3 (sınırsız)
│       ├── urun-002/          # İkinci ürün
│       └── urun-003/          # Üçüncü ürün
```

## 🎯 Yeni Ürün Ekleme

### 1. Görselleri Hazırlayın
1. `assets/images/[kategori]/products/` klasörüne gidin
2. Yeni klasör oluşturun: `urun-004/`, `urun-005/` vb.
3. Görselleri ekleyin:
   - `main.jpg` - **ZORUNLU** - Kategori sayfasında gösterilecek
   - `thumb-1.jpg`, `thumb-2.jpg`... - Ürün sayfasında gösterilecek (isteğe bağlı, sınırsız)

### 2. Ürün Bilgilerini Ekleyin
`assets/js/products.json` dosyasını açın ve ürün bilgilerini ekleyin:

```json
{
  "salincaklar": {
    "urun-004": {
      "name": "Yeni Salıncak Modeli",
      "description": "Özellikler ve açıklama buraya.",
      "category": "Salıncaklar"
    }
  }
}
```

### 3. Ürün Sayfasını Oluşturun (Opsiyonel)
- Sistem otomatik olarak `urunler/urun-004.html` linkini oluşturur
- Eğer bu sayfa yoksa, `urunler/urun-001.html` dosyasını kopyalayıp `urun-004.html` olarak kaydedin
- JavaScript otomatik olarak ürün bilgilerini yükleyecektir

## 🔗 Ürün Linkleri

- **Kategori Sayfası:** `[kategori]/index.html` - Tüm ürünler otomatik listelenir
- **Ürün Sayfası:** `urunler/urun-001.html` - Ürün detay sayfası

## ✨ Özellikler

- ✅ **Sınırsız ürün:** istediğiniz kadar ürün ekleyebilirsiniz
- ✅ **Otomatik yükleme:** Yeni ürün otomatik olarak kategori sayfasında görünür
- ✅ **Dinamik sayfalar:** Ürün bilgileri otomatik yüklenir
- ✅ **Çoklu görsel:** Her ürün için sınırsız görsel eklenebilir
- ✅ **Kolay yönetim:** Sadece görselleri ekleyip JSON'ı güncelleyin

## 📝 Önemli Notlar

1. **Dosya adları:** `urun-001/`, `urun-002/` formatında olmalı
2. **Ana görsel:** `main.jpg` mutlaka olmalı
3. **Thumbnail'ler:** `thumb-1.jpg`, `thumb-2.jpg` formatında (sınırsız)
4. **JSON güncelleme:** Yeni ürün ekledikten sonra `products.json`'ı güncelleyin

