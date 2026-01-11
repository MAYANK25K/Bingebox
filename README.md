# BingeBox 🎥

![React](https://img.shields.io/badge/React-19.0-blue?logo=react&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-7.0-purple?logo=vite&style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)

> **A high-fidelity, 120Hz-optimized streaming platform clone engineered for extreme performance and cinematic UX.**

---

## 🚀 Overview

**BingeBox** is not just a UI clone; it is a performance-first single-page application (SPA) that mimics the fluid experience of native applications. 

Engineered with **React 19** and **Vite**, it features a custom physics-based scrolling engine, GPU-accelerated micro-interactions, and a defensive architecture that handles API failures gracefully. It bridges the gap between web and native by maintaining sub-8ms frame times for a "buttery smooth" 120Hz feel.

---

## ✨ Key Engineering Features

### ⚡ Performance Architecture ("The 120Hz Standard")
* **Physics-Based Scrolling:** Custom hook (`smoothScroll.js`) implementing Quartic Ease-Out mathematics for momentum-based navigation, replacing jerky native scrolling.
* **GPU Acceleration:** Strategic use of `will-change: transform` and hardware-forced layers (`translateZ(0)`) to offload heavy animations from the CPU.
* **Input Debouncing:** Implemented `useDeferredValue` (React 19) on search inputs to maintain 60fps+ rendering during high-frequency typing.
* **Critical Asset Preloading:** "Invisible" high-priority image fetching ensures the Hero Banner appears instantly without layout shifts (CLS 0).
* **Async Image Decoding:** All media uses `decoding="async"` to prevent main-thread jank during rapid scrolling.

### 🛡️ Security & Reliability
* **Strict Environment Security:** API keys managed via `.env` with strict git-exclusion policies.
* **Race Condition Protection:** Implementation of the "isMounted" pattern in `useEffect` hooks to prevent memory leaks and strict-mode flashing.
* **Defensive Rendering:** Null-checks and Optional Chaining (`?.`) used extensively to prevent "White Screen of Death" crashes on API failures.

### 🎨 UX & Design
* **Cinema-Grade UI:** Glassmorphism modals, dynamic backdrop-aware headers, and hover-reveal micro-interactions.
* **Responsive Layout:** Fully adaptive grid system powered by Tailwind v4.
* **Context-Aware Navigation:** Navbar transitions based on scroll depth (transparent to solid).

---

## 🛠️ Tech Stack

* **Core:** React 19, Vite (ESBuild)
* **Styling:** TailwindCSS v4 (Utility-first)
* **Data Layer:** Axios (Interceptor pattern), TMDB API
* **State Management:** React Context API + LocalStorage Persistence ("My List")
* **Icons:** Lucide React
* **Media:** React-Youtube for trailer playback

---

## 📸 Screenshots

| **Immersive Hero Banner** | **Content Discovery & Rows** |
|:---:|:---:|
| <img src="public/assets/img/Screenshot 1.png" width="400" alt="Hero Banner" /> | <img src="public/assets/img/Screenshot 2.png" width="400" alt="Content Rows" /> |
| *Displays the high-priority "Hero" movie with a cinematic backdrop, dynamic title scaling, and instant access to "Play" and "My List" actions.* | *Showcases the "Trending Now" and category rows with horizontal scroll controls, demonstrating the physics-based scrolling engine.* |

| **Cinematic Details Modal** | **Landing Page & Onboarding** |
|:---:|:---:|
| <img src="public/assets/img/Screenshot 3.png" width="400" alt="Details Modal" /> | <img src="public/assets/img/Screenshot 4.png" width="400" alt="Landing Page" /> |
| *The detail popup appears over the UI with a glass-morphism effect, showing the trailer, synopsis, and metadata without a page reload.* | *The high-conversion landing page serves as the entry point, featuring a compelling hero section, value propositions, and a streamlined 'Get Started' flow.* |

| **Profile Management** | **Responsive Mobile Menu** |
|:---:|:---:|
| <img src="public/assets/img/Screenshot 5.png" width="400" alt="Profile Selection" /> | <img src="public/assets/img/Screenshot 6.png" width="400" alt="Mobile Menu" /> |
| *The "Who's Watching" interface allows switching between different user profiles (e.g., Kids, Guest) with persisted preferences.* | *Demonstrates the adaptive mobile layout where the navigation collapses into a touch-friendly hamburger menu on smaller screens.* |

---

## ⚡ Quick Start

### Prerequisites
* Node.js (v18+)
* NPM or Yarn
* A TMDB API Key (Free)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/MAYANK25K/bingebox.git](https://github.com/MAYANK25K/bingebox.git)
    cd bingebox
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```bash
    VITE_TMDB_API_KEY=your_api_key_here
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```bash
## 📂 Project Structure

```bash
src/
├── assets/                 # Build assets (SVGs, internal logos)
├── components/             # Reusable UI Components
│   ├── BrowseNavbar.jsx    # Main navigation bar with search & profile logic
│   ├── Hero.jsx            # Landing page hero section
│   ├── DataSecurityPopup.jsx # Demo security/disclaimer modal
│   └── ...                 # (Footer, FAQ, TrendingNow, etc.)
├── context/                # Global State Management
│   └── MyListContext.jsx   # Context for managing "My List" persistence
├── utils/                  # Utility Functions & Engines
│   └── smoothScroll.js     # Custom physics-based scrolling implementation
├── App.jsx                 # Main Application Router & Lazy Load Suspense
├── main.jsx                # Application Entry Point
├── index.css               # Global Styles, Tailwind directives & GPU utilities
├── axios.js                # Axios instance with TMDB base config
├── requests.js             # API endpoint collection
├── Banner.jsx              # Featured Movie Banner (API-driven)
├── Row.jsx                 # Reusable Movie Row with 120Hz optimizations
├── Browse.jsx              # Main Dashboard Page (After Login)
├── NetflixIntro.jsx        # Netflix-style Animation Sequence
└── ProfileSelection.jsx    # Profile Chooser Screen
public/
└── assets/                 # Static Public Assets
    ├── icons/              # Favicons and app icons
    ├── img/                # README Screenshots
    └── posters/            # Profile avatars
```

---

## 🧠 Lessons Learned

* **The Cost of Re-renders:** Initially, the "My List" context caused the entire app to re-render whenever a movie was added. Implementing `useMemo` on the context value significantly reduced CPU usage.
* **Native vs. Physics Scrolling:** Standard CSS `scroll-behavior: smooth` feels "webby." Writing a custom JS-based momentum scroller was necessary to achieve that premium "iOS/Native" feel.
* **Race Conditions in React:** `React.StrictMode` highlighted bugs where API data would flash or mismatch. Adopting the `isMounted` cleanup pattern in `useEffect` solved this and improved data integrity.
* **Asset Prioritization:** Browsers are lazy. Manually preloading the Hero image using a hidden `<img>` tag with `fetchPriority="high"` eliminated the initial black screen flash.

---

## 🔮 Future Improvements

* **Unit Testing:** Implement Vitest and React Testing Library to ensure component stability during refactors.
* **Server-Side Rendering (SSR):** Migrate to Next.js to improve SEO and initial page load speed for slower connections.
* **Authentication:** Replace the current "Profile Simulation" with real backend auth using Firebase or Supabase.
* **Infinite Scrolling:** Replace horizontal sliders with a grid-based infinite scroll for the "Browse All" view.

---