# Commodity Derivatives Intelligence Terminal (CDI Terminal)

> **Institutional-grade frontend web application** for tracking, relative-value surveillance, and walk-forward backtesting of MCX Gold futures.

---

## 🚀 Quick Setup & Launch Instructions

### Prerequisites
- **Node.js** (v18.0.0 or higher, tested on Node v24)
- **npm** (v9.0.0 or higher)

### 1. Installation
Navigate into the terminal directory and install dependencies:
```bash
cd cdi-terminal
npm install
```

### 2. Run the Development Server
Start Vite development server:
```bash
npm run dev
```
Open **`http://localhost:5173`** (or the port indicated in your console) in your web browser.

### 3. Build for Production
To verify and compile TypeScript & optimize the production bundle:
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## 📐 Project Structure

Organized exactly according to institutional architecture specifications:

```
src/
├── components/
│   ├── auth/
│   │   └── AuthModal.tsx       # Centered modal with User/Admin tabs & cyan-glowing inputs
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header with gold triangle logo & avatar spin border
│   │   ├── SideMenu.tsx        # Right drawer with live clock & flashing gold ticker
│   │   └── Footer.tsx          # Multi-column footer with credits & tools used
│   └── ui/
│       ├── GlowCard.tsx        # Reusable card with circular 200px cursor-tracking glow
│       └── Button.tsx          # Framer Motion animated buttons with gold/cyan variants
├── data/
│   └── mockData.ts             # MCX Gold ticker, contract lifecycles, and backtest data
├── hooks/
│   └── useCountUp.ts           # Eased count-up animation for numeric metric cards
├── pages/
│   └── Dashboard.tsx           # Institutional dashboard (Metrics, Pairwise, Backtest, Contracts)
├── styles/
│   └── global.css              # Deep dark gradient (#09090b to #121215), glow rules, typography
├── App.tsx                     # Top-level orchestration & layout container (max-w-[1600px])
├── main.tsx                    # React application entry point
└── index.css                   # Global Tailwind & style entry point
```

---

## 🌟 Key Architecture & Feature Highlights

1. **Global Theme & Aesthetics**:
   - Deep dark base gradient (`#09090b` to `#121215`).
   - High-contrast typography: `white` headings, `zinc-300` body text, and gold gradients (`#FFD700` to `#FF8C00`).
   - Accent gradients in Gold and Cyan (`#00F0FF` to `#0055FF`).
   - Smooth global transitions (`cubic-bezier(0.4, 0, 0.2, 1)`).

2. **Interactive Glassmorphism Header**:
   - Sticky top bar with gold triangle SVG branding and 4 navigation tabs with glowing gold underline indicator.
   - **User Avatar**: Hovering spins an animated gold gradient border around the avatar; clicking opens the Auth Modal.
   - **Hamburger Menu**: Clicking slides out the live surveillance drawer.

3. **Live Surveillance Side Menu**:
   - Slides smoothly from the right with backdrop blur.
   - Live clock powered by `date-fns` updating every second with a pulsing green dot.
   - Live MCX Gold futures ticker (GOLDM, GOLDTEN, GOLDGUINEA, GOLDPETAL) that dynamically flashes **green (up)** or **red (down)** on tick updates.
   - Gold footer credits: *"Made by: Krish Raj, Ananya Tiwari, Kajal Kumari"*.

4. **Centered Auth Modal**:
   - Centered glassmorphism modal with animated entry/exit.
   - Sliding tab switch between **User Login** and **Admin Login**.
   - Input fields with cyan focus glows (`#00F0FF`).
   - Shifting gold gradient login button.

5. **Cursor-Tracking GlowCard Effect**:
   - Reusable `GlowCard` component tracking mouse X/Y coordinates via CSS variables `--mouse-x` and `--mouse-y`.
   - Pseudo-element `::before` renders a circular radial gradient (~200px) that smoothly scales and brightens on hover.

6. **Comprehensive Quantitative Dashboard**:
   - **Top Row**: 4 summary metric cards (Pricing Date, Contracts Tracked, Active Signals, Backtest Horizon) featuring smooth count-up animations on page load.
   - **Second Row**:
     - *Pairwise Intelligence (GOLDM vs GOLDTEN)* with Z-Score, spread, rolling mean, "NORMAL" badge, and interactive Recharts spread vs. band tracking.
     - *Walk-Forward Backtesting Engine* with Total Trades, Win Rate, Gross P&L, Max Drawdown, and cumulative equity curve area chart.
   - **Third Row**: *Contract Lifecycle & Liquidity Table* with interactive cyan gradient hover highlights and DTE status badges.

---

## 👥 Credits

**Built by Team**:
- Krish Raj
- Ananya Tiwari
- Kajal Kumari
