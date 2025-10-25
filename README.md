# 💬 Qiscus Chat Interface

Aplikasi chat interface modern yang dibangun dengan React dan Vite, mendukung berbagai jenis pesan termasuk teks, gambar, video, dan file PDF dengan desain responsif yang elegan.

## 📑 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Folder](#-struktur-folder)
- [Detail File](#-detail-file-per-bagian)
- [Format Data JSON](#-format-data-json)
- [Instalasi & Setup](#-instalasi--setup)
- [Penggunaan](#-penggunaan)
- [Konfigurasi](#-konfigurasi)

---

## ✨ Fitur Utama

### Messaging

- ✅ **Text Messages** - Pesan teks dengan timestamp
- ✅ **Image Support** - Tampilkan dan lihat gambar dalam modal fullscreen
- ✅ **Video Support** - Player video embedded dengan kontrol
- ✅ **PDF Support** - Preview PDF dengan thumbnail dan info file
- ✅ **File Upload** - Upload file dengan drag & drop atau klik

### UI/UX

- ✅ **Responsive Design** - Otomatis menyesuaikan untuk desktop dan mobile
- ✅ **Modern UI** - Desain hijau emerald dengan Tailwind CSS
- ✅ **Smooth Animations** - Transisi dan hover effects yang halus
- ✅ **Custom Scrollbar** - Scrollbar yang stylish dan tidak mengganggu
- ✅ **Avatar System** - Avatar dengan inisial dan accent colors

### Fungsionalitas

- ✅ **User Switching** - Ganti identitas pengirim untuk testing
- ✅ **Real-time UI** - Dynamic message rendering
- ✅ **Multiple Chat Rooms** - Support multiple percakapan
- ✅ **Mobile Optimization** - Header compact dan navigasi mobile-friendly

---

## 🛠 Tech Stack

### Core Framework

- **React 19.1.1** - Library JavaScript untuk membangun UI
- **Vite 7.1.7** - Build tool yang cepat untuk development modern

### Styling

- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.16** - Plugin Vite untuk Tailwind CSS v4

### Icons & Assets

- **Lucide React 0.548.0** - Icon library modern dan customizable
- **Custom Assets** - Logo Qiscus dan sample media files

### Development Tools

- **ESLint 9.36.0** - Linter untuk code quality
- **@vitejs/plugin-react 5.0.4** - Plugin React untuk Vite

### Tipe File yang Didukung

- **Images**: JPEG, PNG, GIF, WebP (max 10MB)
- **Videos**: MP4, WebM, OGG (max 10MB)
- **Documents**: PDF files (max 10MB)

---

## 📂 Struktur Folder

```
Frontend/
├── public/                      # Static assets
│   └── vite.svg
│
├── src/
│   ├── assets/                  # Asset files (images, logos)
│   │   ├── Logo_Teks.png       # Logo Qiscus dengan teks
│   │   ├── qiscus.webp         # Logo Qiscus untuk avatar group
│   │   └── react.svg
│   │
│   ├── components/              # React components
│   │   ├── ChatPanel.jsx       # Panel chat utama (wrapper)
│   │   ├── EmptyState.jsx      # Tampilan ketika belum pilih chat
│   │   ├── Header.jsx          # Header chat room
│   │   ├── MediaModal.jsx      # Modal fullscreen untuk media
│   │   ├── MessageInput.jsx    # Input pesan dengan upload
│   │   ├── MessageList.jsx     # Container list pesan
│   │   ├── Messege.jsx         # Komponen individual message
│   │   └── Sidebar.jsx         # Sidebar daftar percakapan
│   │
│   ├── constants/               # Konstanta aplikasi
│   │   └── index.js            # Warna, static chats, dll
│   │
│   ├── data/                    # Data JSON
│   │   └── extended-chat-data.json  # Data chat dengan media
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useChatData.js      # Hook untuk data management
│   │   └── useResponsive.js    # Hook untuk responsive behavior
│   │
│   ├── utils/                   # Utility functions
│   │   └── formatters.js       # Format waktu, inisial, dll
│   │
│   ├── App.jsx                  # Main application component
│   ├── index.css               # Global styles (Tailwind imports)
│   └── main.jsx                # Entry point aplikasi
│
├── .gitignore
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Dependencies & scripts
├── README.md                   # Dokumentasi
└── vite.config.js              # Vite configuration
```

---

## 📄 Detail File Per Bagian

### 🎯 **1. Core Application** (`src/`)

#### **App.jsx**

**Fungsi**: Komponen utama aplikasi, orchestrator untuk semua komponen
**Bagian Utama**:

```javascript
// Import hooks dan komponen
import { useChatData } from "./hooks/useChatData";
import { useResponsive } from "./hooks/useResponsive";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";

// State management
const { isMobile, mobileView, setMobileView } = useResponsive();
const { chatItems, selectedChatId, activeChat, ... } = useChatData();

// Event handlers
handleChatSelect() // Handle pemilihan chat
handleBackToList() // Handle kembali ke list (mobile)

// Conditional rendering
showSidebar // Tampilkan sidebar (desktop/mobile)
showChatPanel // Tampilkan chat panel (desktop/mobile)
```

#### **main.jsx**

**Fungsi**: Entry point aplikasi, mounting React ke DOM

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

#### **index.css**

**Fungsi**: Import Tailwind CSS dan custom styles global

```css
@import "tailwindcss";
```

---

### 🧩 **2. Components** (`src/components/`)

#### **Sidebar.jsx**

**Fungsi**: Sidebar dengan daftar percakapan, search, dan filter
**Props**: `chats`, `selectedChatId`, `onChatSelect`
**Bagian Utama**:

- **Header Section**: Logo, tombol search, notifikasi, avatar agent
- **Search Bar**: Input search dengan ikon dan tombol new chat
- **Filter Pills**: Tab filter (Semua pesan, Belum dibaca, Favorit, Pekerjaan)
- **AI CTA Button**: Call-to-action untuk Qiscus AI
- **Chat List**: List semua percakapan dengan avatar, nama, preview, waktu, unread badge
  **Styling**: Custom scrollbar, hover effects, active state dengan ring emerald

#### **Header.jsx**

**Fungsi**: Header chat room dengan info dan action buttons
**Props**: `room`, `participants`, `currentUserId`, `onChangeUser`, `showBackButton`, `onBack`, `isMobile`
**Bagian Desktop**:

- Avatar/Logo room
- Nama room dan subtitle
- User switcher dropdown
- Action buttons: Video, Phone, Search, More
  **Bagian Mobile**:
- Back button
- Avatar lebih kecil
- Nama room compact
- Hanya 3 action buttons: Video, Search, More

#### **ChatPanel.jsx**

**Fungsi**: Wrapper untuk panel chat (Header + MessageList + MessageInput)
**Props**: `activeChat`, `headerData`, `activeParticipants`, `currentUserProfile`, dll
**Struktur**:

```jsx
{
  !activeChat ? (
    <EmptyState />
  ) : (
    <>
      <Header {...headerProps} />
      <MessageList {...messageListProps} />
      <MessageInput {...inputProps} />
    </>
  );
}
```

#### **EmptyState.jsx**

**Fungsi**: Tampilan ketika belum ada chat yang dipilih
**Struktur**:

- Icon chat besar (💬)
- Heading "Pilih percakapan untuk memulai"
- Subtext informasi

#### **MessageList.jsx**

**Fungsi**: Container untuk list pesan dengan scroll
**Props**: `comments`, `currentUser`, `participants`, `emptyState`
**Struktur**:

```jsx
{hasMessages ? (
  <div className="message-stack">
    {comments.map(comment => (
      <Message key={comment.id} {...} />
    ))}
  </div>
) : (
  <div className="empty-state">{emptyState}</div>
)}
```

#### **Messege.jsx** (Message)

**Fungsi**: Render individual message dengan berbagai tipe konten
**Props**: `comment`, `isSender`, `participants`
**Tipe Message yang Didukung**:

1. **Text Message**

   - Bubble dengan background emerald (pengirim) atau slate (penerima)
   - Border kiri dengan accent color untuk penerima
   - Timestamp di bawah pesan

2. **Image Message**

   ```jsx
   <img className="max-w-xs rounded-xl" onClick={() => setIsModalOpen(true)} />
   ```

   - Max width untuk konsistensi
   - Clickable untuk fullscreen modal
   - Caption opsional

3. **Video Message**

   ```jsx
   <video controls className="max-h-72 max-w-xs rounded-xl">
     <source src={url} type={mimetype} />
   </video>
   ```

   - Embedded video player
   - Controls built-in
   - Caption opsional

4. **PDF Message**
   ```jsx
   <button className="pdf-preview">
     <div className="thumbnail">
       <FileText icon />
       <ExternalLink overlay />
     </div>
     <div className="info">
       <filename />
       <size • PDF • pages />
     </div>
   </button>
   ```
   - Preview thumbnail dengan icon
   - Hover effect dengan overlay
   - Info: filename, size, jumlah halaman
   - Click untuk buka di tab baru

**Helper Functions**:

- `formatTime()`: Format timestamp ke HH:MM
- `formatFileSize()`: Format bytes ke KB/MB/GB

#### **MessageInput.jsx** (MessegeInput)

**Fungsi**: Input area untuk mengirim pesan dan upload file
**Props**: `onSendMessage`, `currentUser`, `currentUserLabel`, `disabled`
**Fitur**:

- Text input dengan placeholder
- Tombol attachment (Paperclip icon)
- Preview file yang dipilih dengan tombol remove
- Tombol send (disabled jika kosong)
- Label "Mengirim sebagai [nama]"
- Disabled state untuk chat yang tidak aktif
  **File Handling**:

```javascript
handleFileSelect(); // Validasi tipe & size file
removeFile(); // Hapus file preview
handleSubmit(); // Kirim message dengan/tanpa file
```

#### **MediaModal.jsx**

**Fungsi**: Modal fullscreen untuk preview image/video
**Props**: `isOpen`, `onClose`, `mediaUrl`, `mediaType`, `filename`
**Struktur**:

```jsx
<div className="modal-backdrop" onClick={handleBackdropClick}>
  <div className="modal-content">
    <button className="close-button" onClick={onClose}>
      <X icon />
    </button>
    {mediaType === "image" && <img />}
    {mediaType === "video" && <video />}
    <div className="filename">{filename}</div>
  </div>
</div>
```

---

### 🎣 **3. Custom Hooks** (`src/hooks/`)

#### **useChatData.js**

**Fungsi**: Custom hook untuk data management dan business logic
**Return Values**:

```javascript
{
  chatItems, // Array semua chat items
    selectedChatId, // ID chat yang aktif
    setSelectedChatId, // Setter untuk selected chat
    activeChat, // Data chat yang sedang aktif
    isProductChat, // Boolean apakah chat product-a
    currentUserEmail, // Email user yang aktif
    setCurrentUserEmail, // Setter untuk ganti user
    currentUserProfile, // Profile lengkap user aktif
    activeParticipants, // Array participants chat aktif
    activeComments, // Array comments chat aktif
    headerData, // Data untuk Header component
    handleSendMessage, // Function untuk kirim pesan
    productRoom; // Data product room
}
```

**Logic**:

- Load initial data dari JSON
- Generate participant dengan accent colors
- Format chat items dengan preview & timestamp
- Manage current user selection
- Handle send message

#### **useResponsive.js**

**Fungsi**: Custom hook untuk responsive behavior
**Return Values**:

```javascript
{
  isMobile, // Boolean apakah dalam mode mobile
    mobileView, // String "sidebar" | "chat"
    setMobileView; // Setter untuk ganti view (mobile)
}
```

**Logic**:

- Media query listener untuk breakpoint 768px
- Auto switch view saat resize
- Cleanup listener saat unmount

---

### 🔧 **4. Constants** (`src/constants/`)

#### **index.js**

**Fungsi**: Konstanta yang digunakan di seluruh aplikasi

```javascript
// Accent colors untuk participant avatars
export const PARTICIPANT_COLORS = [
  "#16a34a", // emerald-600
  "#0ea5e9", // sky-500
  "#f97316", // orange-500
  "#a855f7", // purple-500
  "#ec4899", // pink-500
];

// Static chat rooms (dummy data)
export const STATIC_CHATS = [
  {
    id: "anna-johnson",
    name: "Anna Johnson",
    initials: "AJ",
    subtitle: "Pelanggan · Daring",
    accent: "#22d3ee",
  },
  // ... 4 chat lainnya
];
```

---

### 🛠 **5. Utils** (`src/utils/`)

#### **formatters.js**

**Fungsi**: Utility functions untuk formatting data

```javascript
// Format timestamp ke HH:MM
export function formatPreviewTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Generate inisial dari nama
export function generateParticipantInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
```

---

### 📊 **6. Data** (`src/data/`)

#### **extended-chat-data.json**

**Fungsi**: Data JSON untuk simulasi chat dengan berbagai tipe pesan
**Struktur**:

```json
{
  "results": [
    {
      "room": {
        "id": "123",
        "name": "Product A",
        "participant": [
          {
            "id": "agent@mail.com",
            "name": "Agent A",
            "role": 2
          }
        ]
      },
      "comments": [
        {
          "id": 123,
          "type": "text|image|video|pdf",
          "message": "Pesan atau caption",
          "sender": "agent@mail.com",
          "timestamp": "2024-01-15T19:03:00Z",
          "attachment": {
            "url": "https://...",
            "filename": "file.jpg",
            "size": 245760,
            "mimetype": "image/jpeg",
            "thumbnail": "https://...",
            "duration": 120,
            "pages": 2
          }
        }
      ]
    }
  ]
}
```

---

## 📦 Format Data JSON

### Chat Room Structure

```json
{
  "room": {
    "id": "string",
    "name": "string",
    "participant": [
      {
        "id": "email",
        "name": "Nama Lengkap",
        "role": 1 | 2,
        "initials": "XX",
        "accent": "#hexcolor"
      }
    ]
  }
}
```

### Message Types

#### 1. Text Message

```json
{
  "id": 123,
  "type": "text",
  "message": "Isi pesan teks",
  "sender": "email@mail.com",
  "timestamp": "ISO 8601 string"
}
```

#### 2. Image Message

```json
{
  "id": 124,
  "type": "image",
  "message": "Caption gambar (opsional)",
  "sender": "email@mail.com",
  "timestamp": "ISO 8601 string",
  "attachment": {
    "url": "https://example.com/image.jpg",
    "filename": "image.jpg",
    "size": 245760,
    "mimetype": "image/jpeg"
  }
}
```

#### 3. Video Message

```json
{
  "id": 125,
  "type": "video",
  "message": "Caption video (opsional)",
  "sender": "email@mail.com",
  "timestamp": "ISO 8601 string",
  "attachment": {
    "url": "https://example.com/video.mp4",
    "filename": "video.mp4",
    "size": 5242880,
    "mimetype": "video/mp4",
    "thumbnail": "https://example.com/thumb.jpg",
    "duration": 120
  }
}
```

#### 4. PDF Message

```json
{
  "id": 126,
  "type": "pdf",
  "message": "Deskripsi dokumen (opsional)",
  "sender": "email@mail.com",
  "timestamp": "ISO 8601 string",
  "attachment": {
    "url": "https://example.com/document.pdf",
    "filename": "document.pdf",
    "size": 1048576,
    "mimetype": "application/pdf",
    "pages": 5
  }
}
```

---

## 🚀 Instalasi & Setup

### Prerequisites

- Node.js 20.19+ atau 22.12+ (required by Vite 7)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   Server akan berjalan di `http://localhost:5173`

4. **Build untuk production**

   ```bash
   npm run build
   ```

   Output akan ada di folder `dist/`

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 💻 Penggunaan

### Development

```bash
npm run dev
```

- Hot Module Replacement (HMR) aktif
- Auto refresh saat ada perubahan
- Error overlay di browser

### Linting

```bash
npm run lint
```

- Check code quality dengan ESLint
- Auto-fix minor issues

### Production Build

```bash
npm run build
npm run preview
```

- Optimized bundle dengan code splitting
- Minified CSS & JS
- Asset optimization

---

## ⚙️ Konfigurasi

### Vite Config (`vite.config.js`)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(), // React plugin dengan Fast Refresh
    tailwindcss(), // Tailwind CSS v4 plugin
  ],
});
```

### Tailwind CSS (`index.css`)

```css
@import "tailwindcss";
```

Tailwind v4 menggunakan CSS imports, tidak perlu config file terpisah.

### ESLint Config (`eslint.config.js`)

- React hooks rules
- React refresh rules
- Custom globals for browser environment

---

## 🎨 Styling Convention

### Tailwind Classes Pattern

```jsx
// Container classes
className = "flex flex-col gap-4 p-6";

// Responsive variants
className = "w-full md:w-80 xl:w-96";

// State variants
className = "bg-white hover:bg-slate-50 active:scale-95";

// Custom values
className = "text-[0.7rem] min-w-5 rounded-xl";
```

### Color Palette

- **Primary**: Emerald (600, 500, 50)
- **Background**: White, Slate (50, 100, 900)
- **Text**: Slate (900, 700, 500, 400)
- **Accent**: Per participant colors
- **Alert**: Rose (500) for unread badge

---

## 📱 Responsive Behavior

### Breakpoints

- **Mobile**: < 768px
- **Desktop**: ≥ 768px

### Mobile View

- Sidebar full-width dengan back button
- Header compact (py-2, smaller avatar)
- Action buttons minimal (3 buttons)
- View switching: "sidebar" ⇄ "chat"

### Desktop View

- Sidebar fixed width (320px, 384px XL)
- Chat panel flex-1
- All action buttons visible
- User switcher dropdown visible

---

## 🔍 Tips Development

1. **Hot Reload**: Perubahan otomatis ter-reflect di browser
2. **React DevTools**: Install extension untuk debugging
3. **Console Errors**: Check browser console untuk errors
4. **Mobile Testing**: Gunakan Chrome DevTools mobile emulator
5. **File Upload**: Test dengan berbagai ukuran dan tipe file

---
