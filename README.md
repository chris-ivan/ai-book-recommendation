# Sistem Rekomendasi Buku
![Demo](static/demo.gif)
Sistem rekomendasi buku ini dibuat untuk memenuhi tugas besar mata kuliah ET4047 Intelegensi Buatan & Analisis Big Data untuk Telekomunikasi. Sistem yang dikembangkan merupakan machine learning menggunakan [ANN (Approximate Nearest Neighbour)](https://towardsdatascience.com/comprehensive-guide-to-approximate-nearest-neighbors-algorithms-8b94f057d6b6) yang dimuat dalam web.

## Instalasi
1. Clone repository ini
2. Install [Docker](https://www.docker.com/) pada perangkat anda.
3. Unduh model [text-embedding ini](https://tfhub.dev/google/nnlm-id-dim128/2) dan masukkan pada folder `backend/model-data/1`.* (baca keterangan pada bagian catatan Backend di bawah)
4. Jalankan `docker-compose up`.
5. Untuk mematikan server pada local environment, jalankan `docker-compose down`.

## Machine Learning
Machine learning yang digunakan adalah ANN (Approximate Nearest Neighbour) yang diimplementasikan menggunakan [annoy](https://github.com/spotify/annoy) dengan model text-embedding Bahasa Indonesia dari [Tensorflow Hub](https://tfhub.dev/google/nnlm-id-dim128/2). Metode ANN digunakan untuk mencari buku yang memiliki deskripsi yang mirip dengan buku yang dicari. Hasil keluaran sistem ini dapat digunakan untuk mengembangkan sistem rekomendasi buku.

Dataset buku yang digunakan diambil dari [UCSD Book Graph](https://sites.google.com/eng.ucsd.edu/ucsdbookgraph/books?authuser=0&pli=1) yang memuat data 2,5 juta buku dari [Goodreads](https://www.goodreads.com/). Dataset ini kemudian diproses untuk mendapatkan data yang dibutuhkan oleh sistem rekomendasi.

**Proses pembuatan model ANN dapat dilihat pada berkas Google Colab di dalam [folder Google Drive ini](https://drive.google.com/open?id=181j5cKeYbF3E2K1AhqMGvb4J1uIgnMr0&usp=drive_copy).**

## Web
### Frontend

Frontend dibuat menggunakan [ReactJS](https://reactjs.org/) dengan UI framework [MaterialUI](https://mui.com/material-ui/api/outlined-input/). Web ini terdiri dari 2 bagian:
- Rekomendasi buku dari judul buku yang sudah diketahui. Pengguna dapat menggunakan fitur search untuk memilih judul buku berdasarkan masukan. Web akan menampilkan informasi buku tersebut dan 10 buku yang paling mirip dengan buku tersebut.
- Rekomendasi buku berdasarkan deskripsi. Pengguna perlu memasukkan deskripsi buku secara manual. Web akan menampilkan 10 buku yang paling mirip dengan deskripsi tersebut.

### Backend
Backend dikembangkan menggunakan framework [Flask](https://flask.palletsprojects.com/en/2.2.x/). Telah dikembangkan 3 endpoint API:

- `/api/v1/similar-title?title={string}&limit={number}` untuk melakukan query SQL judul buku yang memuat string dalam query `title`. Parameter limit bersifat opsional dengan default value `10`.
- `/api/v1/recommend-by-id?book_id={number}` untuk mendapat 10 buku dengan deskripsi yang paling mirip dengan buku yang memiliki `book_id` yang diberikan. `book_id` dapat diperoleh dari hasil query API sebelumnya. Untuk mempercepat proses, 10 informasi buku yang paling mirip dengan buku tersebut akan disimpan dalam database (tidak dilewatkan pada ANN).
- `/api/v1/recommend-by-desc?query={string}&limit={number}` untuk mendapat rekomendasi buku sebanyak `limit` berdasarkan deskripsi yang diberikan. Parameter limit bersifat opsional dengan default value `10`. Data ini diperoleh dengan melakukan embedding deskripsi masukkan dan membandingkannya dengan dataset buku menggunakan ANN.

Catatan:
- *Folder `backend/model-data/1` harus berisi berkas-berkas berikut:
  - `assets/`
  - `variables/`
  - `saved_model.pb`
- Jika tidak ingin mengunduh model, dapat digunakan pustaka Tensorflow Hub yang sudah otomatis terinstall dalam Dockerfile. Namun, proses inisiasi server akan berlangsung lebih lama karena model harus diunduh terlebih dahulu.
  - Uncomment baris 3 (MODEL_URL) pada `constant.py` dan comment baris 2 (MODEL_URL).
  - Lakukan `import tensorflow_hub as hub` pada `predict.py`.
  - Ganti baris 17 pada `predict.py` dengan `model = hub.load(MODEL_URL)`.
- Server Flask akan berjalan pada port 5000 (development). Idealnya, server ini akan dijalankan dengan WSGI, namun WSGI tidak dapat memanggil model Tensorflow untuk text-embedding dan perlu dilakukan konfigurasi lebih lanjut dalam `backend/Dockerfile` dan `docker-compose.yaml`.
- Normalnya, model Tensorflow dijalankan dengan [Tensorflow Serving](https://www.tensorflow.org/tfx/serving/docker) dan diakses melalui API secara REST maupun gRPC. Karena keterbatasan waktu, penulis menggunakan model Tensorflow yang sudah diunduh dan dijalankan secara langsung pada development mode Flask.

## Anggota Kelompok
- Christopher Ivan Gunardi (18119025)
- Amadea Rashida (18119017)

## Referensi
- Mengting Wan, Julian McAuley, ["Item Recommendation on Monotonic Behavior Chains"](https://www.google.com/url?q=https%3A%2F%2Fgithub.com%2FMengtingWan%2Fmengtingwan.github.io%2Fraw%2Fmaster%2Fpaper%2Frecsys18_mwan.pdf&sa=D&sntz=1&usg=AOvVaw0HcX6gU1ENhk7fbCXXbCiy), RecSys 2018.
- Mengting Wan, Rishabh Misra, Ndapa Nakashole, Julian McAuley, ["Item Recommendation on Monotonic Behavior Chains"](https://www.google.com/url?q=https%3A%2F%2Fwww.aclweb.org%2Fanthology%2FP19-1248&sa=D&sntz=1&usg=AOvVaw1G1ZlQ7oe0NDtqeI8gN2Nf), in ACL19.