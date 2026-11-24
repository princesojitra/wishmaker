# WishMaker ✨

> An independent, AI-powered greeting and wishes generator built with React, TypeScript, Tailwind CSS, shadcn/ui, and Google Gemini API, engineered for Cloudflare deployment.

---

## 🌟 Key Features

- **Culturally Nuanced Greetings**: Authentic phrasing and native script typography for **English**, **Hindi (हिन्दी)**, and **Gujarati (ગુજરાતી)**.
- **3 Distinct Variations per Request**:
  - 💖 *Heartfelt & Classic*: Deep emotional warmth and lasting blessings.
  - 😄 *Playful & Witty*: Cheerful humor, friendly banter, and high energy.
  - 🪶 *Poetic & Expressive / Shayari*: Metaphorical depth, rhyming rhythm, or couplets.
- **1-Tap Social Sharing**:
  - Instant clipboard copy with animated visual acknowledgment.
  - Direct WhatsApp deep-linking (`https://api.whatsapp.com/send?text=...`) pre-formatted for chat.
  - Inline "Tweak" editor allowing users to fine-tune words before copying or sharing.
- **Occasions Covered**: Birthday, Diwali & Festivals, Anniversaries, Weddings, Promotions & Success, New Year, Friendship, Gratitude, and Custom Celebrations.
- **Enterprise-Grade Privacy & Edge Security**:
  - Serverless edge architecture ensures **zero client-side API key leakage**.
  - All Gemini API calls are securely dispatched server-side (`functions/api/generate.ts` on Cloudflare Pages and Vite dev middleware locally).
  - Built-in Curated Engine fallback guarantees zero crashes even offline or without an API key.
- **Warm Festive Aesthetic**:
  - Custom Champagne & Sunset Terracotta color system.
  - Soft glowing glassmorphism, responsive cards, micro-confetti on generation, and complete dark mode support.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (tested on v22)
- **npm** or **pnpm**

### 2. Installation
```bash
git clone <repo-url>
cd wishmaker
npm install
```

### 3. Configure Environment Variables (Optional for live Gemini AI)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=AIzaSy...
```
*(Get a free API key at [Google AI Studio](https://aistudio.google.com/))*

> **Note**: Even without an API key, WishMaker runs seamlessly using its built-in curated greeting engine.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Architecture & Project Structure

```
wishmaker/
├── functions/
│   └── api/
│       └── generate.ts        # Cloudflare Pages Functions edge handler (Gemini API server-side)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Brand logo, language chips, dark mode toggle
│   │   ├── Hero.tsx           # Celebratory heading & multilingual value props
│   │   ├── OccasionSelector.tsx # 8 visual occasion cards with active states
│   │   ├── WishForm.tsx       # Recipient, relationship, tone & memory inputs
│   │   ├── WishCard.tsx       # 3 individual wish cards with Copy, Tweak, WhatsApp
│   │   ├── WishResults.tsx    # Result section layout, badges & regenerate action
│   │   ├── LoadingSkeleton.tsx # Shimmer loading state with uplifting cycling copy
│   │   ├── Toast.tsx          # Non-blocking copy confirmation notifications
│   │   └── ui/                # Reusable shadcn/ui primitives (button, card, badge, etc.)
│   ├── data/
│   │   ├── occasions.ts       # Occasions, relationships, tones, and languages data
│   │   └── sampleWishes.ts    # Fallback curated engine for offline resilience
│   ├── types/
│   │   └── wish.ts            # TypeScript interfaces
│   ├── App.tsx                # Central state orchestration & confetti triggers
│   ├── index.css              # Custom Tailwind theme & Google Fonts imports
│   └── main.tsx               # Application mount point
├── vite.config.ts             # Vite configuration with integrated local dev API middleware
├── wrangler.toml              # Cloudflare Pages configuration
└── tailwind.config.js         # Custom festive color tokens & typography
```

---

## ☁️ Cloudflare Pages Deployment

Deploying WishMaker to Cloudflare Pages is completely automated:

### Method A: Cloudflare Dashboard (Git-based)
1. Push this repository to GitHub or GitLab.
2. In the Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Set build configuration:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Under **Settings** > **Environment variables**, add:
   - Variable name: `GEMINI_API_KEY`
   - Value: *(your secret key)*
   - Encrypt as secret.
5. Save and Deploy!

### Method B: Wrangler CLI
```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name wishmaker

# Add secret API key
npx wrangler pages secret put GEMINI_API_KEY
```

---

## 🔒 Security & AI Best Practices
1. **Server-Side Key Isolation**: The client application never receives or bundles `GEMINI_API_KEY`.
2. **Strict Output Schema**: Gemini is queried with `responseMimeType: "application/json"` and strict instructions to enforce typed, valid JSON arrays.
3. **Resilient Fallback**: If network limits or token quotas are reached, WishMaker automatically switches to curated authentic responses without crashing.

---

## 📜 License
MIT © WishMaker
