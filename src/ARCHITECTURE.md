# Clean Architecture - Struktur Kode

Proyek ini telah direvisi mengikuti prinsip **Clean Architecture** untuk pemisahan tanggung jawab dan kemudahan pengujian.

## Struktur Lapisan

```
src/
├── domain/                    # Lapisan Domain (inti bisnis)
│   ├── entities/              # Entitas bisnis
│   │   └── User.ts
│   └── repositories/          # Interface repository (kontrak)
│       └── auth.repository.ts
│
├── application/               # Lapisan Aplikasi (use cases)
│   └── use-cases/
│       └── profile/
│           ├── ChangeProfileUseCase.ts
│           ├── ResetPasswordUseCase.ts
│           └── index.ts
│
├── infrastructure/            # Lapisan Infrastruktur (implementasi eksternal)
│   ├── api/
│   │   └── apiClient.ts       # HTTP client
│   ├── repositories/
│   │   └── auth.repository.impl.ts
│   └── container.ts           # Dependency Injection
│
├── presentation/              # Lapisan Presentasi (UI)
│   └── hooks/
│       ├── useProfile.ts
│       └── useResetPassword.ts
│
└── components/                 # Komponen React
└── pages/                      # Halaman
```

## Alur Data

1. **UI (Page/Component)** → Memanggil `useProfile()` atau `useResetPassword()`
2. **Presentation Hook** → Memanggil Use Case
3. **Use Case** → Memanggil Repository (interface)
4. **Repository Implementation** → Menggunakan API Client untuk HTTP request

## Prinsip yang Diterapkan

- **Domain** tidak bergantung pada framework atau eksternal
- **Application** hanya bergantung pada Domain
- **Infrastructure** mengimplementasikan interface dari Domain
- **Presentation** menghubungkan UI dengan Use Case

## Komponen yang Di-refactor

- `ProfilePage.tsx` - Menggunakan `useProfile` hook
- `ChangeInfoProfileForm.tsx` - Menggunakan `useResetPassword` hook

## Menambah Fitur Baru

1. Buat interface di `domain/repositories/` jika perlu
2. Buat Use Case di `application/use-cases/`
3. Implementasikan di `infrastructure/repositories/`
4. Daftarkan di `infrastructure/container.ts`
5. Buat hook di `presentation/hooks/` jika perlu
6. Gunakan di komponen/halaman
