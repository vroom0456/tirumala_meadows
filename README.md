# Tirumala Meadows Private Limited
### *Quality For The Best Living*
**28 Years of Excellence | A Legacy of Distinction | A Vision Beyond Tomorrow**

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

A next-generation, high-performance corporate web platform engineered for **Tirumala Meadows Private Limited** — a premier luxury real estate and infrastructure development enterprise headquartered in Jubilee Hills, Hyderabad (500 034).

Developed as an **Industrial Internship Project**, the platform combines Apple-inspired minimalist luxury aesthetics with interactive digital innovations designed around customer mindset, spatial transparency, and investor confidence.

---

## 🏛️ About Tirumala Meadows

For over **28 years**, Tirumala Meadows Private Limited has been driven by an enduring passion for architectural excellence, refined aesthetics, and the creation of extraordinary living spaces.

- **30+ Completed Luxury Villas**: Signature residences created for distinguished clientele comprising eminent politicians, celebrated film personalities, entrepreneurs, industrialists, and prominent business families, particularly across Jubilee Hills, Hyderabad.
- **3,000+ Acres Facilitated**: Land acquired and facilitated for strategic layout developments and institutional partnerships across Western Telangana.
- **250+ Professionals**: Dedicated in-house multidisciplinary workforce.
- **In-House Integrated Luxury Ecosystem**:
  - 🎨 **In-House Architects** – Distinctive spatial expressions & Vastu harmony.
  - 🛋️ **In-House Interior Designers** – Bespoke Italian marble & luxury curation.
  - ⚡ **In-House Technology Team** – Home automation & intelligent climate control.
  - 🏗️ **In-House Civil Engineers** – Earthquake-resistant structural precision.

---

## 🌟 Key Features & Technical Innovations

### 1. 📐 3D Architectural Studio
Eliminating static PDF brochures with a dynamic multi-perspective spatial viewer:
- **Isometric 3D Cutaway**: Exploded spatial anatomy highlighting living, dining, master suites, and landscaped open courts.
- **CAD Blueprint Schema**: Structural civil engineering wireframe detailing load-bearing columns, room dimensions, and flow.
- **360° Walkthrough Simulator**: Immersive room-by-room virtual spatial tour.

### 2. 🧮 Interactive Financial Engines
- **Real-Time EMI & Mortgage Calculator**: Sliders for property value, down payment percentage, interest rate, and loan tenure (5 to 30 years) with instant breakdown of principal vs. interest.
- **5-Year Investor ROI Engine**: Dynamic projection model simulating annual capital appreciation and gross rental yield tailored for luxury Telangana land corridors.

### 3. ☀️ 24-Hour Daylight & Orientation Simulator
- Interactive time tracker (6:00 AM to 6:00 PM) simulating real-time sun angles, natural light infiltration, and thermal comfort across living spaces.

### 4. 🧭 Customer Mindset UX & Persona Switching
- Frictionless journey allowing visitors to self-segment:
  - **Luxury Homebuyers**: Focus on Jubilee Hills villas, interior finishes, and lifestyle.
  - **Commercial Investors**: Focus on ROI, warehouse assets, and prime rental yields.
  - **Strategic Land Partners**: Focus on Western Telangana land banking (Kollur, Velimala, Shankarpally, Vikarabad).

### 5. 📄 Interactive Factsheet & Brochure System
- Instant modal factsheet displaying technical specifications, structural safety credentials, and direct downloadable corporate dossiers.

### 6. 📱 Direct Executive Concierge Routing
- Floating VIP action bar with 1-click WhatsApp routing to the Jubilee Hills sales director and direct telephone lines (`+91 95508 28688`).

---

## 🏗️ 8 Business Verticals

1. **Luxury Residential Villas** – Ultra-prime bespoke residences in Jubilee Hills.
2. **Premium Apartments** – High-end multi-storey urban residential communities.
3. **Residential Layouts** – HMDA/DTCP master-planned plotted gated enclaves.
4. **Commercial & Office Spaces** – Grade-A corporate towers and retail hubs.
5. **Warehousing & Logistics** – High-clearance modern logistics parks.
6. **Strategic Land Acquisition** – Active land banking across Western Telangana.
7. **Land Aggregation & JVs** – Value unlocking via developer partnerships.
8. **Real Estate Investments** – Strategic capital deployment in high-CAGR assets.

---

## 💻 Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18/19](https://react.dev/) (Hooks, Context, Functional Components) |
| **Language** | [TypeScript 5.x](https://www.typescriptlang.org/) (Strict Type Checking) |
| **Build & Tooling** | [Vite 5](https://vitejs.dev/) (Lightning Fast HMR, Rollup Bundling) |
| **Styling & Design System** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Corporate Tokens |
| **Iconography** | [Lucide React](https://lucide.dev/) (Pixel-perfect modern icons) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) (Single Page Navigation) |
| **Charts & Data Viz** | [Recharts](https://recharts.org/) |
| **Performance** | **319 KB** optimized production bundle |

---

## 📁 Project Structure

```bash
buildtrack/
├── public/
│   ├── portfolio/              # Real high-resolution property photography
│   │   ├── jubilee-hills-facade-dusk.jpg
│   │   ├── jubilee-hills-regal-estate.jpg
│   │   ├── modern-minimalist-villa-night.jpg
│   │   ├── contemporary-villa-daylight.jpg
│   │   └── premium-apartments-tower.jpg
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Pre-header strip & responsive luxury header
│   │   ├── Footer.tsx           # Corporate footer with Jubilee Hills HQ details
│   │   ├── TirumalaLogo.tsx     # Corporate vector brand badge
│   │   ├── Villa3DViewer.tsx    # Isometric / CAD / Walkthrough 3D Studio
│   │   └── BrochureModal.tsx    # Factsheet & specs download modal
│   ├── pages/
│   │   ├── HomePage.tsx         # Main corporate landing page with all engines
│   │   ├── VillasPage.tsx       # Luxury villa portfolio showcase
│   │   ├── AmenitiesPage.tsx    # In-house luxury ecosystem & lifestyle features
│   │   ├── LocationPage.tsx     # Western Telangana strategic land acquisitions
│   │   ├── ContactPage.tsx      # Corporate office inquiry form & map
│   │   └── ResidentHubPage.tsx  # Dedicated resident & investor portal
│   ├── App.tsx                  # Main route configuration
│   ├── main.tsx                 # Entrypoint
│   └── index.css                # Global styles & Tailwind directives
├── Tirumala_Meadows_Internship_Presentation.pptx # 8-slide college presentation
├── generate_presentation.py     # Programmatic python-pptx presentation generator
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vroom0456/tirumala_meadows.git
   cd tirumala_meadows
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Typecheck & Production Build:**
   ```bash
   npm run typecheck
   npm run build
   ```

---

## 📊 Industrial Internship Presentation

The project includes an **8-slide PowerPoint presentation** specifically formatted for academic and industrial evaluation:
- **File**: `Tirumala_Meadows_Internship_Presentation.pptx`
- **Slide Deck Structure**:
  1. Title Slide (Student credentials, Guide, Department)
  2. Abstract (Domain, Keywords, Scope)
  3. Problem Statement (Static legacy brochures vs. Modern buyer expectations)
  4. Project Objectives (6 numbered development targets)
  5. Platform Workflow & User Journey (8-stage customer acquisition funnel)
  6. Modules & Methodology (Brand, 3D Studio, Financial Engines)
  7. Tech Stack & System Specifications
  8. Conclusion & Future Roadmap (VR walkthroughs, Headless CMS, EOI booking)

---

## 📍 Corporate Headquarters

**Tirumala Meadows Private Limited**  
*Quality For The Best Living*  
- **Registered Address**: Jubilee Hills, Hyderabad – 500 034, Telangana, India  
- **Contact Phone**: +91 95508 28688  
- **Active Land Bank Corridors**: Kollur | Velimala | Shankarpally | Vikarabad

---

*Crafted with precision for Tirumala Meadows Private Limited.*
