# Görsel Yönetim Sistemi

## Klasör Yapısı

### Ana Sayfa (home/)
- `hero/hero.jpg` - Ana hero görseli (tek)
- `slider/slide-1.jpg, slide-2.jpg...` - Slider görselleri (sınırsız)
- `categories/cat-1.jpg, cat-2.jpg...` - Kategori görselleri
- `promo/promo.jpg` - Promo görseli (tek)

### Kategori Sayfaları (aksesuar/, bahce-balkon-mobilyalari/, vb.)
- `banner/banner.jpg` - Kategori banner görseli (tek)
- `slider/slide-1.jpg, slide-2.jpg...` - Slider görselleri (sınırsız)
- `products/prod-1.jpg, prod-2.jpg...` - Ürün görselleri (sınırsız)

## Kullanım

1. Görselleri ilgili klasöre atın
2. Dosya adlarını değiştirmeyin (slide-1.jpg, prod-1.jpg formatında)
3. Tarayıcıyı yenileyin
4. JavaScript otomatik olarak tüm görselleri yükler

## Notlar

- Görseller otomatik olarak lazy load edilir
- Vercel otomatik olarak WebP/AVIF'e çevirir
- Browser cache'ler (1 yıl)
- Layout shift önlenir (aspect-ratio)
