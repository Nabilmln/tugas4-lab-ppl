# Book Archive API

Book Archive API adalah sistem API sederhana berbasis Node.js dan Express untuk mengelola arsip buku. API ini mendukung operasi CRUD (Create, Read, Update, Delete) dan menggunakan file JSON sebagai database.

## Fitur Utama
- Melihat semua buku (`GET /books`)
- Mencari buku berdasarkan ID (`GET /books/:id`)
- Mencari buku berdasarkan nama buku (`GET /search/:title`)
- Menambahkan buku baru (`POST /books`)
- Memperbarui data buku (`PUT /books/:id`)
- Menghapus buku (`DELETE /books/:id`)

## Tech Stack
- Node.js
- Express.js
- JSON sebagai database

## Instalasi

1. Clone repository:
   ```bash
   git clone https://github.com/Findney/bookhub-api.git
   cd bookhub-api
   ```

2. Install dependencies:
   ```bash
   npm install
 
3. Install dependencies:
   ```bash
   npm run build
   ```

4. Jalankan server:
   ```bash
   npm run dev atau npm run start
   ```
   Server akan berjalan di `http://localhost:3000`.

## Endpoint API

### 1. **Mendapatkan Semua Buku**
   - **Endpoint:** `GET /books`
   - **Response:**  
     ```json
     [
       {
         "id": 1,
         "title": "To Kill a Mockingbird",
         "author": "Harper Lee",
         "year": 1960,
         "publisher": "J.B. Lippincott & Co.",
         "genre": "Fiksi Klasik",
         "pages": 281,
         "isbn": "9780061120084",
         "status": "Dipinjam"
       }
     ]
     ```

### 2. **Mendapatkan Buku Berdasarkan ID**
   - **Endpoint:** `GET /books/:id`
   - **Contoh:**  
     ```bash
     curl http://localhost:3000/books/1
     ```

### 3. **Menambahkan Buku Baru**
   - **Endpoint:** `POST /books`
   - **Contoh:**  
     ```bash
     curl -X POST http://localhost:3000/books \
     -H "Content-Type: application/json" \
     -d '{
       "title": "1984",
       "author": "George Orwell",
       "year": 1949,
       "publisher": "Secker & Warburg",
       "genre": "Dystopian",
       "pages": 328,
       "isbn": "9780451524935",
       "status": "Tersedia"
     }'
     ```

### 4. **Memperbarui Data Buku**
   - **Endpoint:** `PUT /books/:id`
   - **Contoh:**  
     ```bash
     curl -X PUT http://localhost:3000/books/1 \
     -H "Content-Type: application/json" \
     -d '{"status": "Dipinjam"}'
     ```

### 5. **Menghapus Buku**
   - **Endpoint:** `DELETE /books/:id`
   - **Contoh:**  
     ```bash
     curl -X DELETE http://localhost:3000/books/1
     ```

## Catatan
- Pastikan **Node.js** sudah terinstall.  
- Gunakan alat seperti **cURL** atau **Postman** untuk menguji endpoint.  

```