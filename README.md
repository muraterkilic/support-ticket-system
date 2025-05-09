# SupportApp

SupportApp, kullanıcıların destek talepleri oluşturabildiği ve bu taleplerin yönetilebildiği, küçük ölçekli ama gerçekçi bir iş takip sistemidir. Katmanlı mimariye uygun olarak geliştirilmiş, modern backend ve frontend teknolojileriyle desteklenmiştir.

## 🎯 Proje Amacı

Kullanıcıların destek talepleri oluşturup, taleplerinin durumlarını (Açık, Yanıtlandı, Kapatıldı) takip edebildiği; yöneticilerin ise bu talepleri filtreleyerek yönetebildiği kurumsal seviyede bir örnek uygulama sunar.

## 🌐 Canlı Uygulama ve API Dokümantasyonu

- 🔗 **Canlı Uygulama (AWS)**: [http://18.215.159.99:8181/](http://18.215.159.99:8181/)
- 📘 **Swagger UI (Yerel)**: [http://127.0.0.1:8081/swagger-ui/index.html](http://127.0.0.1:8081/swagger-ui/index.html)
- 📘 **Swagger UI (Canlı - AWS)**: [http://18.215.159.99:8181/swagger-ui/index.html](http://18.215.159.99:8181/swagger-ui/index.html)

## 🛠️ Kullanılan Teknolojiler

### Backend

- Java 17+
- Spring Boot 3.2.5
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- PostgreSQL
- Spring Cache (Yerel bellek cache)
- Lombok
- MapStruct
- Log4j (SLF4J ile)
- Swagger / OpenAPI
- Maven

### Frontend

- React 18+
- React Router DOM
- Axios
- Material UI (MUI)
- React Hook Form
- Formik + Yup
- Redux Toolkit
- Vite

## 📦 Özellikler

### 1. Giriş ve Yetkilendirme
- JWT tabanlı login/logout
- Rol bazlı yetkilendirme (User / Admin)
- Yalnızca admin kullanıcılar talepleri yönetebilir

### 2. Talep Oluşturma
- Kullanıcılar başlık, açıklama ve kategori seçerek talep oluşturabilir

### 3. Talep Yönetimi (Admin Paneli)
- Talepler durumlarına göre filtrelenebilir
- Admin talepleri yanıtlayabilir ve güncelleyebilir

### 4. Kullanıcı Paneli
- Kullanıcı sadece kendi taleplerini görüntüleyebilir
- Talebin güncel durumu ve admin yanıtı takip edilebilir

### 5. Mimarî ve Kod Yapısı
- Katmanlı mimari (Controller → Service → Repository)
- DTO ↔ Entity dönüşümleri (MapStruct)
- Global exception handler
- Clean Code ilkelerine uygunluk
- Loglama: Log4j + SLF4J

## 🚀 Projeyi Çalıştırma

### Backend

1. Projeyi klonlayın:
   ```bash
   git clone git@github.com:muraterkilic/support-ticket-system.git
   cd support-ticket-system
   ```

2. `application.yml` veya `application.properties` dosyasını kendi veritabanı bilgilerinize göre güncelleyin.

3. Backend uygulamasını başlatın:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend (React + Vite)

1. Frontend klasörüne geçin:
   ```bash
   cd client
   ```

2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Uygulamayı geliştirme modunda başlatın:
   ```bash
   npm run dev
   ```

4. Tarayıcıdan erişin:
   ```
   http://localhost:3000
   ```
