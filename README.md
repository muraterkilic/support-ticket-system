# SupportApp

SupportApp, kullanıcıların destek talepleri oluşturabildiği ve bu taleplerin yönetilebildiği, küçük ölçekli ama gerçekçi bir iş takip sistemidir. Katmanlı mimariye uygun olarak geliştirilmiş, modern backend ve frontend teknolojileriyle desteklenmiştir.

## 🎯 Proje Amacı

Bu proje, kullanıcıların destek talepleri oluşturabildiği, taleplerinin durumlarını (Açık, Yanıtlandı, Kapatıldı) takip edebildiği, yöneticilerin bu talepleri filtreleyerek yanıtlayabildiği bir sistem sunar. Gerçek dünya uygulamalarına benzer, kurumsal seviyede örnek bir yazılım geliştirme deneyimi amaçlanmıştır.

## 🌐 Canlı Uygulama ve API Dokümantasyonu

- 🔗 **Canlı Uygulama (AWS)**: [http://18.215.159.99:8181/](http://18.215.159.99:8181/)
- 📘 **Swagger UI (Yerel)**: [http://127.0.0.1:8081/swagger-ui/index.html#/](http://127.0.0.1:8081/swagger-ui/index.html#/)
- 📘 **Swagger UI (Canlı - AWS)**: [http://18.215.159.99:8181/swagger-ui/index.html#/](http://18.215.159.99:8181/swagger-ui/index.html#/)

## 🛠️ Teknolojik Gereksinimler

### Backend

- Java 17+
- Spring Boot 3.x
- Spring Security (JWT ile kimlik doğrulama)
- Spring Data JPA
- PostgreSQL
- Redis (cache)
- RESTful API mimarisi
- Swagger / OpenAPI dokümantasyonu
- Lombok
- MapStruct
- log4j

### Frontend

- React 18+
- React Router DOM
- Axios
- Material UI (MUI)
- React Hook Form
- Formik & Yup (form validasyon için)
- Redux Toolkit
- Vite (build ve geliştirme sunucusu)

## 📦 Temel Modüller / Gereksinimler

### 1. Kullanıcı Girişi ve Yetkilendirme
- JWT tabanlı login/logout mekanizması
- “User” ve “Admin” rollerine dayalı yetkilendirme
- Yalnızca admin kullanıcılar talepleri görebilir ve yönetebilir

### 2. Talep Oluşturma
- Kullanıcılar başlık, açıklama ve kategori seçerek talep oluşturabilir
- Talepler veritabanına kaydedilir

### 3. Talep Listeleme ve Filtreleme (Admin Panel)
- Admin talepleri durumlarına göre filtreleyebilir (Açık, Yanıtlandı, Kapatıldı)
- Admin her talebe yanıt verebilir ve durumunu güncelleyebilir

### 4. Kullanıcı Paneli
- Kullanıcı sadece kendi taleplerini görebilir
- Talebin güncel statüsünü ve admin yanıtını takip edebilir

### 5. Yazılım Mimarisi
- Katmanlı mimari (Controller → Service → Repository)
- Global exception handling
- DTO ↔ Entity dönüşümleri (MapStruct ile)
- Clean Code prensiplerine uygun yapı
- Loglama log4j ile console
- Uygulamada loglama için SLF4J kullanılmıştır

## 🚀 Projeyi Çalıştırma

### Backend

1. Projeyi klonlayın:
   ```bash
   git clone git@github.com:muraterkilic/support-ticket-system.git
   cd support-ticket-system

