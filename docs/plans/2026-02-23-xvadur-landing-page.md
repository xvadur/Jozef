# xvadur Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a brutalist-asymmetric-grid landing page pre xvadur (Adam Rudavský / AI Striko).
- `/` = homepage (Adam intro, teasery)
- `/jozo` = Jožo agent identity (kto je Jožo, schopnosti, limity, disclaimer)
- `/ai-recepcia` = conversion page pre kliniky (problem, pricing, ROI, onboarding, demo)
- `/blog` = Jožov denník

**Brand context:**
- Adam Rudavský = xvadur, firma = AI Striko, email = adam@xvadur.com
- Story: 10 rokov zdravotná sestra na urgente → 7 mesiacov AI → AI Striko
- Jožo = OpenClaw agent (mozog za všetkým), AI Recepcia = komerčný produkt
- Pricing: Starter €1k+€400/mes | Growth €1.5k+€500/mes | Premium €2k+€600/mes
- Booking: cal.com/xvadur

**Architecture:** Multi-page Astro 5 site. Homepage uses an asymmetric CSS Grid layout. Components split into `ui/` primitives, `home/`, `jozo/`, and `blog/` sections. Framer Motion handles scroll-reveal animations on React islands.

**Tech Stack:** Astro 5, React 19, Tailwind v4, Framer Motion 12, Space Grotesk (Google Fonts), Tabler Icons (astro-icon)

**Design Reference:** `docs/plans/2026-02-23-xvadur-landing-page-design.md`

**Dev server:** `cd astro-base-main && npm run dev` → http://localhost:4321

---

## Task 1: Foundation – CSS Variables & Typography

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`

**Step 1: Add Space Grotesk font + CSS design tokens to global.css**

Replace/extend `src/styles/global.css` with:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Space Grotesk from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

:root {
  --color-bg: #F7F8FA;
  --color-silver: #DDE3EA;
  --color-blue: #4FC3F7;
  --color-blue-deep: #4A7FA5;
  --color-text: #1A1A2E;
  --color-pink: #FF3EA5;
  --color-red: #E53935;
  --color-black: #1A1A2E;

  --shadow-brutal: 4px 4px 0px var(--color-black);
  --shadow-brutal-sm: 2px 2px 0px var(--color-black);
  --border-brutal: 2px solid var(--color-black);

  --font-sans: 'Space Grotesk', sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
}

body {
  min-height: 100vh;
  background-color: var(--color-bg);
}

/* Accessibility: Skip to content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: fixed;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Brutalist utility classes */
.brutal-border { border: var(--border-brutal); }
.brutal-shadow { box-shadow: var(--shadow-brutal); }
.brutal-shadow-sm { box-shadow: var(--shadow-brutal-sm); }
```

**Step 2: Update Layout.astro body class**

In `src/layouts/Layout.astro`, change:
```html
<body class="min-h-screen bg-white">
```
to:
```html
<body class="min-h-screen" style="background-color: var(--color-bg); font-family: var(--font-sans);">
```

**Step 3: Start dev server and verify font loads**

```bash
cd astro-base-main && npm run dev
```

Open http://localhost:4321 – font should be Space Grotesk, background slightly warm off-white.

**Step 4: Commit**

```bash
cd astro-base-main && git add src/styles/global.css src/layouts/Layout.astro && git commit -m "feat: add Space Grotesk + brutalist CSS design tokens"
```

---

## Task 2: BrutalistButton UI Component

**Files:**
- Create: `src/components/ui/BrutalistButton.astro`

**Step 1: Create the component**

```astro
---
interface Props {
  href?: string;
  variant?: 'pink' | 'blue' | 'white' | 'black';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  target?: string;
}

const {
  href,
  variant = 'black',
  size = 'md',
  class: className = '',
  target,
} = Astro.props;

const variantStyles = {
  pink: 'bg-[#FF3EA5] text-white hover:bg-[#e0358f]',
  blue: 'bg-[#4FC3F7] text-[#1A1A2E] hover:bg-[#3ab4e8]',
  white: 'bg-white text-[#1A1A2E] hover:bg-[#f0f0f0]',
  black: 'bg-[#1A1A2E] text-white hover:bg-[#2a2a4e]',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const baseStyles = `
  inline-flex items-center justify-center gap-2
  font-bold uppercase tracking-widest
  border-2 border-[#1A1A2E]
  shadow-[4px_4px_0px_#1A1A2E]
  transition-all duration-100
  hover:shadow-[2px_2px_0px_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px]
  active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
  cursor-pointer select-none
`.replace(/\n\s+/g, ' ').trim();
---

{href ? (
  <a
    href={href}
    target={target}
    class={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
  >
    <slot />
  </a>
) : (
  <button
    class={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
  >
    <slot />
  </button>
)}
```

**Step 2: Verify component renders (add temp to index.astro)**

Temporarily add to `src/pages/index.astro`:
```astro
import BrutalistButton from "../components/ui/BrutalistButton.astro";
// In template:
<BrutalistButton variant="pink">Book a Call</BrutalistButton>
<BrutalistButton variant="blue">Live Demo</BrutalistButton>
<BrutalistButton variant="white">Čo je Jožo?</BrutalistButton>
```

Check http://localhost:4321 – brutalist buttons should appear with shadow and hover effect.

**Step 3: Remove temp code from index.astro**

**Step 4: Commit**

```bash
cd astro-base-main && git add src/components/ui/BrutalistButton.astro && git commit -m "feat: add BrutalistButton component"
```

---

## Task 3: AnimatedBlock React Component (Framer Motion)

**Files:**
- Create: `src/components/ui/AnimatedBlock.tsx`

**Step 1: Create scroll-reveal wrapper**

```tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}

export default function AnimatedBlock({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: Props) {
  const initial = {
    up: { opacity: 0, y: 32 },
    left: { opacity: 0, x: -32 },
    right: { opacity: 0, x: 32 },
  };

  return (
    <motion.div
      className={className}
      initial={initial[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
cd astro-base-main && git add src/components/ui/AnimatedBlock.tsx && git commit -m "feat: add AnimatedBlock scroll-reveal component"
```

---

## Task 4: Update Header

**Files:**
- Modify: `src/components/Header.astro`

**Step 1: Rewrite Header.astro**

Replace entire file contents with:

```astro
---
import { Icon } from "astro-icon/components";
import BrutalistButton from "./ui/BrutalistButton.astro";

const navLinks = [
  { href: "/", label: "xvadur" },
  { href: "/jozo", label: "Jožo" },
  { href: "/ai-recepcia", label: "AI Recepcia" },
  { href: "/blog", label: "Blog" },
];
---

<header
  class="w-full sticky top-0 z-50"
  style="background-color: var(--color-bg); border-bottom: 2px solid var(--color-black);"
  role="banner"
>
  <nav
    class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4"
    aria-label="Main navigation"
  >
    <!-- Logo -->
    <a
      href="/"
      class="text-xl font-bold tracking-tight hover:text-[#4FC3F7] transition-colors"
      style="font-family: var(--font-sans); color: var(--color-text);"
      aria-label="xvadur - domov"
    >
      xvadur
    </a>

    <!-- Mobile menu button -->
    <button
      type="button"
      class="md:hidden p-2"
      aria-label="Otvoriť menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
      id="mobile-menu-button"
    >
      <Icon name="tabler:menu-2" class="w-6 h-6" aria-hidden="true" />
    </button>

    <!-- Desktop nav -->
    <ul class="hidden md:flex items-center gap-8" role="list">
      {navLinks.map(link => (
        <li>
          <a
            href={link.href}
            class="text-sm font-medium uppercase tracking-wider hover:text-[#4FC3F7] transition-colors"
            style="color: var(--color-text);"
          >
            {link.label}
          </a>
        </li>
      ))}
      <li>
        <BrutalistButton href="https://cal.com/xvadur" variant="pink" size="sm" target="_blank">
          Book a Call
        </BrutalistButton>
      </li>
    </ul>
  </nav>

  <!-- Mobile menu -->
  <div
    id="mobile-menu"
    class="hidden md:hidden px-6 pb-4"
    style="border-top: 2px solid var(--color-black);"
    role="menu"
  >
    <ul class="flex flex-col gap-3 pt-4" role="list">
      {navLinks.map(link => (
        <li>
          <a
            href={link.href}
            class="block text-sm font-medium uppercase tracking-wider hover:text-[#4FC3F7] transition-colors"
            role="menuitem"
          >
            {link.label}
          </a>
        </li>
      ))}
      <li class="pt-2">
        <BrutalistButton href="https://cal.com/xvadur" variant="pink" size="sm" target="_blank">
          Book a Call
        </BrutalistButton>
      </li>
    </ul>
  </div>
</header>

<script>
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      mobileMenu.classList.toggle("hidden");
    });
  }
</script>
```

**Step 2: Check header at http://localhost:4321**

Should see: `xvadur` wordmark left, nav links + pink "BOOK A CALL" button right. Bottom border 2px black.

**Step 3: Commit**

```bash
cd astro-base-main && git add src/components/Header.astro && git commit -m "feat: brutalist header with nav + book a call CTA"
```

---

## Task 5: Homepage – HeroGrid Component

**Files:**
- Create: `src/components/home/HeroGrid.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create HeroGrid.astro**

```astro
---
import BrutalistButton from "../ui/BrutalistButton.astro";
---

<section class="max-w-7xl mx-auto px-6 py-12">
  <!-- Asymmetric grid -->
  <div
    class="grid gap-3"
    style="grid-template-columns: 1fr 1fr 280px; grid-template-rows: auto auto auto;"
  >
    <!-- Hero block: col 1-2, row 1 -->
    <div
      class="col-span-2 p-10 flex flex-col justify-between min-h-[260px]"
      style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);"
    >
      <div>
        <p class="text-xs font-bold uppercase tracking-widest mb-3" style="color: var(--color-blue);">
          AI Striko · Slovensko
        </p>
        <h1 class="text-5xl font-light leading-tight mb-4" style="color: var(--color-text);">
          10 rokov urgentná medicína.<br />
          <span style="color: var(--color-blue);">Dnes AI.</span>
        </h1>
        <p class="text-lg font-light max-w-lg" style="color: var(--color-text); opacity: 0.7;">
          Nie som random tech startup. Som kolega, ktorý pozná váš svet – a vie ho zlepšiť.
        </p>
      </div>
      <div class="flex gap-3 mt-6 flex-wrap">
        <BrutalistButton href="/jozo#demo" variant="blue" size="md">
          Live Demo
        </BrutalistButton>
        <BrutalistButton href="/jozo" variant="white" size="md">
          Čo je Jožo?
        </BrutalistButton>
      </div>
    </div>

    <!-- Book a Call block: col 3, row 1 -->
    <div
      class="p-8 flex flex-col items-start justify-between min-h-[260px]"
      style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: #FF3EA5;"
    >
      <div>
        <p class="text-xs font-bold uppercase tracking-widest mb-2 text-white opacity-80">
          Porozprávajme sa
        </p>
        <h2 class="text-2xl font-bold text-white leading-tight">
          Book<br />a Call
        </h2>
      </div>
      <BrutalistButton
        href="https://cal.com/xvadur"
        variant="white"
        size="sm"
        target="_blank"
        class="mt-4"
      >
        Rezervovať →
      </BrutalistButton>
    </div>

    <!-- AI Striko block: col 1, row 2 -->
    <div
      class="p-8 flex flex-col justify-between"
      style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-silver);"
    >
      <p class="text-xs font-bold uppercase tracking-widest mb-2" style="color: var(--color-blue-deep);">
        Firma
      </p>
      <div>
        <h3 class="text-3xl font-bold mb-2">AI Striko</h3>
        <p class="text-sm font-light" style="opacity: 0.7;">
          Pomáhame podnikateľom adoptovať AI.<br />Bez zbytočnej paniky.
        </p>
      </div>
    </div>

    <!-- What is Jožo block: col 2, row 2 -->
    <div
      class="p-8 flex flex-col justify-between"
      style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);"
    >
      <p class="text-xs font-bold uppercase tracking-widest mb-2" style="color: var(--color-blue-deep);">
        Môj AI suite
      </p>
      <div>
        <h3 class="text-2xl font-semibold mb-2">Kto je Jožo?</h3>
        <p class="text-sm font-light mb-4" style="opacity: 0.7;">
          Jožo je môj nakonfigurovaný AI business asistent postavený na OpenClaw.
          Rieši AI recepciu, blog, automatizácie.
        </p>
        <a href="/jozo" class="text-sm font-bold uppercase tracking-wider hover:underline" style="color: var(--color-blue-deep);">
          Zistiť viac →
        </a>
      </div>
    </div>

    <!-- Jožo teaser block: col 3, row 2 -->
    <div
      class="p-8 flex flex-col justify-between"
      style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-blue);"
    >
      <p class="text-xs font-bold uppercase tracking-widest mb-2 text-white opacity-80">
        Jožo
      </p>
      <p class="text-4xl" aria-hidden="true">🦞</p>
      <p class="text-sm font-bold text-white mt-2">
        OpenClaw · AI Suite
      </p>
    </div>

    <!-- Blog teaser: full width, row 3 -->
    <div
      class="col-span-3 p-8 flex items-center justify-between"
      style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);"
    >
      <div>
        <p class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-blue-deep);">
          Jožov denník
        </p>
        <h3 class="text-xl font-semibold">Posledný zápisom z blogu</h3>
        <p class="text-sm font-light mt-1" style="opacity: 0.6;">Čoskoro – zápisky zo zákulisia budovania AI Striko.</p>
      </div>
      <BrutalistButton href="/blog" variant="black" size="sm">
        Blog →
      </BrutalistButton>
    </div>
  </div>
</section>
```

**Step 2: Update src/pages/index.astro**

Replace entire file with:

```astro
---
import Layout from "../layouts/Layout.astro";
import Header from "../components/Header.astro";
import HeroGrid from "../components/home/HeroGrid.astro";
import Footer from "../components/Footer.astro";
import { SITE } from "../config/site.mjs";
---

<Layout
  title={SITE.title}
  description={SITE.description}
  canonicalURL={SITE.url}
>
  <Header />
  <main id="main-content" role="main">
    <HeroGrid />
  </main>
  <Footer />
</Layout>
```

**Step 3: Create `src/components/home/` directory (the file creation does this)**

**Step 4: Check at http://localhost:4321**

Should see asymmetric 3-column grid with hero text, pink "Book a Call" block, AI Striko block, Jožo teaser, and blog strip.

**Step 5: Commit**

```bash
cd astro-base-main && git add src/components/home/HeroGrid.astro src/pages/index.astro && git commit -m "feat: homepage asymmetric hero grid"
```

---

## Task 6: Homepage – Mobile Responsive Grid

**Files:**
- Modify: `src/components/home/HeroGrid.astro`

**Step 1: Add responsive stacking**

The grid uses inline `style` for desktop 3-col layout. Add a `<style>` block in HeroGrid.astro for mobile:

Add inside `<section>` after the grid div, add a `<style>` tag:

```astro
<style>
  @media (max-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr !important;
    }
    .col-span-2, .col-span-3 {
      grid-column: span 1 !important;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr 1fr !important;
    }
    .col-span-3 {
      grid-column: span 2 !important;
    }
  }
</style>
```

Also add `class="hero-grid"` to the grid `<div>`.

**Step 2: Check mobile at http://localhost:4321**

Use browser DevTools to simulate 375px width – blocks should stack vertically.

**Step 3: Commit**

```bash
cd astro-base-main && git add src/components/home/HeroGrid.astro && git commit -m "feat: responsive grid for mobile/tablet"
```

---

## Task 7: Jožo Page (agent identity)

**Files:**
- Create: `src/pages/jozo.astro`
- Create: `src/components/jozo/JozoHero.astro`
- Create: `src/components/jozo/JozoCapabilities.astro`
- Create: `src/components/jozo/JozoLimits.astro`
- Create: `src/components/jozo/JozoTeaserRecepcia.astro`

**Step 1: Create JozoHero.astro**

```astro
---
import BrutalistButton from "../ui/BrutalistButton.astro";
---
<section class="max-w-7xl mx-auto px-6 py-12">
  <div class="grid gap-3" style="grid-template-columns: 1fr 300px;">
    <div class="p-10 min-h-[280px] flex flex-col justify-between"
      style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-blue);">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest mb-3 text-white opacity-80">OpenClaw AI Operátor</p>
        <h1 class="text-6xl font-light text-white mb-4">Jožo</h1>
        <p class="text-xl font-light text-white max-w-lg" style="opacity: 0.9;">
          Som AI operátor postavený na OpenClaw – nie chatbot na parádu.
          Bežím ako osobný asistent nad Adamovým workspace, správami a nástrojmi.
        </p>
      </div>
      <div class="flex gap-3 mt-6 flex-wrap">
        <BrutalistButton href="/ai-recepcia" variant="pink" size="md">AI Recepcia →</BrutalistButton>
        <BrutalistButton href="/blog" variant="white" size="md">Jožov denník</BrutalistButton>
      </div>
    </div>
    <div class="p-8 flex flex-col items-center justify-center text-center"
      style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);">
      <span class="text-8xl mb-4" aria-hidden="true">🦞</span>
      <p class="text-xs font-bold uppercase tracking-widest" style="color: var(--color-red);">Postavený na OpenClaw</p>
    </div>
  </div>
</section>
```

**Step 2: Create JozoCapabilities.astro**

```astro
---
const capabilities = [
  { icon: "📋", title: "Tasky & Priority", desc: "Čítam poznámky, navrhujem priority, zapisujem ďalšie kroky." },
  { icon: "🔄", title: "Kontext medzi dňami", desc: "Pamätám si čo sme robili. Žiadne opakovanie briefingow." },
  { icon: "⚡", title: "Automatizované workflowy", desc: "Spúšťam n8n workflowy, synkronizujem nástroje." },
  { icon: "📝", title: "Briefingy & Reporty", desc: "Pripravujem podklady, sumarizujem, triedim." },
];
---
<section class="max-w-7xl mx-auto px-6 pb-12">
  <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
    <div class="lg:col-span-4 p-6"
      style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-silver);">
      <p class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-blue-deep);">Čo reálne robím</p>
      <h2 class="text-2xl font-light">Schopnosti</h2>
    </div>
    {capabilities.map(c => (
      <div class="p-8" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);">
        <span class="text-3xl mb-4 block">{c.icon}</span>
        <h3 class="text-lg font-semibold mb-2">{c.title}</h3>
        <p class="text-sm font-light" style="opacity: 0.7;">{c.desc}</p>
      </div>
    ))}
  </div>
</section>
```

**Step 3: Create JozoLimits.astro (Operational Truth + Disclaimer)**

```astro
---
const limits = [
  { label: "Autonómne", value: "Bežné tasky, poznámky, workflowy, reporting" },
  { label: "Cez potvrdenie", value: "Citlivé akcie, externá komunikácia, platby" },
  { label: "Závisí od integrácií", value: "Kalendár, email, Obsidian, n8n pipelines" },
  { label: "Fallback → Adam", value: "Pri nejasnostiach, hraničných prípadoch" },
];
---
<section class="max-w-7xl mx-auto px-6 pb-12">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="p-8" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);">
      <p class="text-xs font-bold uppercase tracking-widest mb-4" style="color: var(--color-blue-deep);">Operational Truth</p>
      <h2 class="text-2xl font-light mb-6">Čo robím – a kde sú hranice</h2>
      <div class="space-y-3">
        {limits.map(l => (
          <div class="flex gap-4" style="border-bottom: 1px solid var(--color-silver); padding-bottom: 0.75rem;">
            <span class="text-xs font-bold uppercase tracking-wider w-36 shrink-0 pt-0.5" style="color: var(--color-blue-deep);">{l.label}</span>
            <span class="text-sm font-light">{l.value}</span>
          </div>
        ))}
      </div>
    </div>
    <div class="p-8" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-silver);">
      <p class="text-xs font-bold uppercase tracking-widest mb-4" style="color: var(--color-red);">⚠ Disclaimer</p>
      <p class="text-base font-light" style="line-height: 1.8;">
        Jožo <strong>nenahrádza medicínske rozhodovanie</strong>.<br /><br />
        Rieši komunikáciu, triáž hovorov a scheduling.
        Všetky zdravotnícke rozhodnutia zostávajú výlučne na lekárovi.<br /><br />
        Urgentné hovory sú vždy presmerované na zdravotnícky personál.
      </p>
    </div>
  </div>
</section>
```

**Step 4: Create JozoTeaserRecepcia.astro**

```astro
---
import BrutalistButton from "../ui/BrutalistButton.astro";
---
<section class="max-w-7xl mx-auto px-6 pb-12">
  <div class="p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-blue);">
    <div>
      <p class="text-xs font-bold uppercase tracking-widest mb-2 text-white opacity-80">Vertikálna konfigurácia</p>
      <h2 class="text-3xl font-light text-white mb-2">Chceš Jožo pre svoju kliniku?</h2>
      <p class="text-white font-light" style="opacity: 0.85;">
        Mám nakonfigurovanú verziu pre ambulancie. Volá sa AI Recepcia.
      </p>
    </div>
    <BrutalistButton href="/ai-recepcia" variant="pink" size="lg">Pozrieť AI Recepciu →</BrutalistButton>
  </div>
</section>
```

**Step 5: Create src/pages/jozo.astro**

```astro
---
import Layout from "../layouts/Layout.astro";
import Header from "../components/Header.astro";
import JozoHero from "../components/jozo/JozoHero.astro";
import JozoCapabilities from "../components/jozo/JozoCapabilities.astro";
import JozoLimits from "../components/jozo/JozoLimits.astro";
import JozoTeaserRecepcia from "../components/jozo/JozoTeaserRecepcia.astro";
import Footer from "../components/Footer.astro";
import { SITE } from "../config/site.mjs";
---
<Layout
  title={`Jožo – AI Operátor | ${SITE.title}`}
  description="Jožo je AI operátor postavený na OpenClaw. Rieši tasky, workflowy a operatívu. Nie chatbot na parádu."
>
  <Header />
  <main id="main-content" role="main">
    <JozoHero />
    <JozoCapabilities />
    <JozoLimits />
    <JozoTeaserRecepcia />
  </main>
  <Footer />
</Layout>
```

**Step 6: Check at http://localhost:4321/jozo**

Mala by byť: blue hero → schopnosti grid → operational truth + disclaimer → teaser na /ai-recepcia.

**Step 7: Commit**

```bash
cd astro-base-main && git add src/pages/jozo.astro src/components/jozo/ && git commit -m "feat: Jožo page – agent identity, capabilities, operational truth"
```

---

## Task 7b: AI Recepcia Page `/ai-recepcia` (conversion page pre kliniky)

**Files:**
- Create: `src/pages/ai-recepcia.astro`
- Create: `src/components/ai-recepcia/RecepciahHero.astro`
- Create: `src/components/ai-recepcia/ProblemSection.astro`
- Create: `src/components/ai-recepcia/SolutionSection.astro`
- Create: `src/components/ai-recepcia/HowItWorks.astro`
- Create: `src/components/ai-recepcia/OnboardingTimeline.astro`
- Create: `src/components/ai-recepcia/PricingGrid.astro`
- Create: `src/components/ai-recepcia/RoiBlock.astro`
- Create: `src/components/ai-recepcia/AboutAdam.astro`
- Create: `src/components/ai-recepcia/DemoBlock.astro`

**Step 1: Create PricingGrid.astro**

```astro
---
const tiers = [
  {
    name: "STARTER",
    setup: "€1,000",
    monthly: "€400/mes",
    forWho: "Malá klinika · <800 hovorov/mes",
    features: ["AI voice recepcia", "Kalendár integrácia", "Základný reporting", "Email support"],
    highlight: false,
  },
  {
    name: "GROWTH",
    badge: "⭐ NAJPOPULÁRNEJŠÍ",
    setup: "€1,500",
    monthly: "€500/mes",
    forWho: "Stredná klinika · 800–1,500 hovorov",
    features: ["Všetko zo Starter", "Dashboard & analytics", "Priority support (2h)", "SMS pripomienky", "Web widget"],
    highlight: true,
  },
  {
    name: "PREMIUM",
    setup: "€2,000",
    monthly: "€600/mes",
    forWho: "Veľká klinika · 1,500+ hovorov",
    features: ["Všetko z Growth", "CRM integrácia", "Custom voice/branding", "Multi-user", "Dedicated support"],
    highlight: false,
  },
];
import BrutalistButton from "../ui/BrutalistButton.astro";
---

<section class="max-w-7xl mx-auto px-6 pb-12">
  <div
    class="p-8 mb-3"
    style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-silver);"
  >
    <p class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-blue-deep);">Pricing</p>
    <h2 class="text-3xl font-light">Transparentný pricing</h2>
    <p class="text-sm font-light mt-1" style="opacity: 0.6;">Žiadne skryté poplatky. Žiadne 3-ročné zmluvy.</p>
  </div>

  <div class="grid gap-3 md:grid-cols-3">
    {tiers.map(tier => (
      <div
        class="p-8 flex flex-col justify-between"
        style={`border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: ${tier.highlight ? 'var(--color-blue)' : 'var(--color-bg)'};`}
      >
        <div>
          {tier.badge && (
            <p class="text-xs font-bold uppercase tracking-widest mb-2" style={tier.highlight ? 'color: white; opacity: 0.8;' : 'color: var(--color-blue-deep);'}>
              {tier.badge}
            </p>
          )}
          <h3 class="text-2xl font-bold mb-1" style={tier.highlight ? 'color: white;' : ''}>{tier.name}</h3>
          <p class="text-3xl font-light mb-1" style={tier.highlight ? 'color: white;' : 'color: var(--color-blue-deep);'}>{tier.monthly}</p>
          <p class="text-xs mb-4" style={tier.highlight ? 'color: white; opacity: 0.7;' : 'opacity: 0.5;'}>Setup: {tier.setup} jednorazovo</p>
          <p class="text-xs font-bold uppercase tracking-wider mb-4" style={tier.highlight ? 'color: white; opacity: 0.8;' : 'color: var(--color-blue-deep);'}>{tier.forWho}</p>
          <ul class="space-y-1">
            {tier.features.map(f => (
              <li class="text-sm font-light flex gap-2" style={tier.highlight ? 'color: white;' : ''}>
                <span>✓</span>{f}
              </li>
            ))}
          </ul>
        </div>
        <div class="mt-6">
          <BrutalistButton href="https://cal.com/xvadur" variant={tier.highlight ? 'white' : 'black'} size="sm" target="_blank" class="w-full justify-center">
            Chcem demo →
          </BrutalistButton>
        </div>
      </div>
    ))}
  </div>

  <div class="mt-3 p-4 text-center" style="border: var(--border-brutal); background-color: var(--color-bg);">
    <p class="text-sm font-semibold">Stojí to 1–2% vášho obratu. Návratnosť je 3–6x.</p>
  </div>
</section>
```

**Step 2: Create RoiBlock.astro**

```astro
---
---
<section class="max-w-7xl mx-auto px-6 pb-12">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="p-8" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);">
      <p class="text-xs font-bold uppercase tracking-widest mb-3" style="color: var(--color-blue-deep);">ROI Kalkulácia</p>
      <h2 class="text-2xl font-light mb-6">Koľko to prinesie vašej klinike?</h2>
      <table class="w-full text-sm">
        <tbody>
          {[
            ["Mesačný obrat", "€60,000–100,000"],
            ["Hovory/mesiac", "1,200"],
            ["Zmeškané hovory (10%)", "120"],
            ["Stratení pacienti (30%)", "36"],
            ["Hodnota pacienta", "€100"],
            ["Stratené tržby/mesiac", "€3,600"],
            ["Stratené tržby/rok", "€43,200"],
            ["Vaše náklady (Growth/rok)", "€7,500"],
          ].map(([label, value], i) => (
            <tr style={`border-bottom: 1px solid var(--color-silver); ${i >= 5 ? 'font-weight: 600;' : ''}`}>
              <td class="py-2 pr-4" style="opacity: 0.7;">{label}</td>
              <td class="py-2 text-right" style={i >= 5 ? 'color: var(--color-blue-deep);' : ''}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div class="p-8 flex flex-col justify-center items-start" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-pink);">
      <p class="text-xs font-bold uppercase tracking-widest mb-4 text-white opacity-80">Výsledok</p>
      <p class="text-7xl font-bold text-white mb-2">5.7x</p>
      <p class="text-xl font-light text-white mb-4">návratnosť investície</p>
      <p class="text-white font-light" style="opacity: 0.9;">Väčšina klientov dosiahne break-even <strong>do 60–90 dní</strong>. Zvyšok roka je čistý zisk.</p>
    </div>
  </div>
</section>
```

**Step 3: Create HowItWorks.astro**

```astro
---
const steps = [
  { num: "01", title: "Setup (1–2 dni)", desc: "Napojíme AI na váš telefón a kalendár. Vy nám poskytnete info o klinike – ordinačné hodiny, služby, ceny." },
  { num: "02", title: "Testovanie", desc: "Zavoláte, otestujeme, doladíme. AI sa učí vašim potrebám." },
  { num: "03", title: "Live", desc: "AI začne dvíhať hovory. Vy dostávate notifikácie o nových objednávkach. Žiadna ďalšia práca z vašej strany." },
];
---
<section class="max-w-7xl mx-auto px-6 pb-12">
  <div class="grid gap-3 md:grid-cols-3">
    <div class="md:col-span-3 p-6" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-silver);">
      <p class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-blue-deep);">Proces</p>
      <h2 class="text-2xl font-light">Ako to funguje?</h2>
    </div>
    {steps.map(step => (
      <div class="p-8" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);">
        <p class="text-5xl font-bold mb-4" style="color: var(--color-blue); opacity: 0.3;">{step.num}</p>
        <h3 class="text-lg font-semibold mb-2">{step.title}</h3>
        <p class="text-sm font-light" style="opacity: 0.7;">{step.desc}</p>
      </div>
    ))}
  </div>
</section>
```

**Step 4: Create AboutAdam.astro**

```astro
---
import BrutalistButton from "../ui/BrutalistButton.astro";
---
<section class="max-w-7xl mx-auto px-6 pb-12">
  <div class="grid gap-3 md:grid-cols-2">
    <div class="p-10" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);">
      <p class="text-xs font-bold uppercase tracking-widest mb-4" style="color: var(--color-blue-deep);">Kto som</p>
      <h2 class="text-3xl font-light mb-6">Kto som a prečo mi môžete veriť</h2>
      <p class="text-base font-light mb-4" style="line-height: 1.8;">
        Volám sa <strong>Adam Rudavský</strong> (xvadur).<br /><br />
        <strong>10 rokov</strong> som pracoval ako zdravotná sestra na urgentnom príjme v Bratislave.
        Každý deň som videl preťaženú recepciu, chaos, zmeškané hovory – a frustráciu pacientov aj personálu.<br /><br />
        Vedel som, že to nejde riešiť najímaním ďalšej recepčnej.
        Začal som sa učiť AI. <strong>7 mesiacov</strong> som buildil AI riešenia. Dnes robím AI recepcie pre ambulancie a kliniky.
      </p>
      <ul class="space-y-2 mb-6">
        {[
          "Rozumiem vášmu biznisu – 10 rokov v healthcare",
          "Pozním bolestivé body – zažil som to na vlastnej koži",
          "Nie som len technik – som z vášho sveta",
        ].map(item => (
          <li class="text-sm font-light flex gap-2">
            <span style="color: var(--color-blue);">✓</span> {item}
          </li>
        ))}
      </ul>
      <blockquote class="border-l-4 pl-4 italic text-sm font-light" style="border-color: var(--color-blue); opacity: 0.8;">
        "Nie som random tech startup. Som kolega, ktorý pozná váš svet – a vie ho zlepšiť."
      </blockquote>
    </div>
    <div class="p-10 flex flex-col justify-between" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-silver);">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest mb-4" style="color: var(--color-blue-deep);">Trust</p>
        <div class="grid grid-cols-2 gap-3 mb-6">
          {[
            "10 rokov healthcare",
            "GDPR compliant",
            "EU hosting",
            "Slovenská firma",
          ].map(badge => (
            <div class="p-3 text-center text-xs font-bold uppercase tracking-wider" style="border: var(--border-brutal); background-color: var(--color-bg);">
              ✓ {badge}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p class="text-xs font-bold uppercase tracking-widest mb-3" style="color: var(--color-blue-deep);">Kontakt</p>
        <p class="text-sm font-light mb-4">adam@xvadur.com</p>
        <BrutalistButton href="https://cal.com/xvadur" variant="pink" size="md" target="_blank">
          Rezervovať Demo →
        </BrutalistButton>
      </div>
    </div>
  </div>
</section>
```

**Step 5: Create OnboardingTimeline.astro**

```astro
---
const timeline = [
  { day: "Deň 1–3", title: "Mapovanie", desc: "Mapujeme call flow, FAQ, fallback pravidlá. Vy nám poviete o klinike." },
  { day: "Deň 4–7", title: "Setup", desc: "Technický setup + interné testy. Napojenie na telefón a kalendár." },
  { day: "Týždeň 2", title: "Limitovaný live", desc: "Obmedzený live režim + monitoring každého hovoru." },
  { day: "Týždeň 3", title: "Optimalizácia", desc: "Ladíme scenáre podľa reálnych hovorov z vašej kliniky." },
  { day: "Týždeň 4", title: "Report & Scale", desc: "Dostanete výsledkový report. Rozhodujete o scale režime." },
];
---
<section class="max-w-7xl mx-auto px-6 pb-12">
  <div class="grid gap-3">
    <div class="p-6" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-silver);">
      <p class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-blue-deep);">Onboarding</p>
      <h2 class="text-2xl font-light">Ako vyzerá prvých 30 dní</h2>
    </div>
    <div class="grid gap-3 md:grid-cols-5">
      {timeline.map(t => (
        <div class="p-6" style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);">
          <p class="text-xs font-bold uppercase tracking-widest mb-2" style="color: var(--color-blue-deep);">{t.day}</p>
          <h3 class="text-base font-semibold mb-2">{t.title}</h3>
          <p class="text-xs font-light" style="opacity: 0.7;">{t.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 6: Create src/pages/ai-recepcia.astro**

```astro
---
import Layout from "../layouts/Layout.astro";
import Header from "../components/Header.astro";
import RecepciahHero from "../components/ai-recepcia/RecepciahHero.astro";
import ProblemSection from "../components/ai-recepcia/ProblemSection.astro";
import SolutionSection from "../components/ai-recepcia/SolutionSection.astro";
import HowItWorks from "../components/ai-recepcia/HowItWorks.astro";
import OnboardingTimeline from "../components/ai-recepcia/OnboardingTimeline.astro";
import PricingGrid from "../components/ai-recepcia/PricingGrid.astro";
import RoiBlock from "../components/ai-recepcia/RoiBlock.astro";
import AboutAdam from "../components/ai-recepcia/AboutAdam.astro";
import DemoBlock from "../components/ai-recepcia/DemoBlock.astro";
import Footer from "../components/Footer.astro";
import { SITE } from "../config/site.mjs";
---
<Layout
  title={`AI Recepcia pre kliniky | ${SITE.title}`}
  description="AI hlasová recepcia 24/7 pre ambulancie a kliniky. Žiadne zmeškané hovory. Typicky ROI 4–6x. Slovenská firma, GDPR."
>
  <Header />
  <main id="main-content" role="main">
    <RecepciahHero />
    <ProblemSection />
    <SolutionSection />
    <HowItWorks />
    <OnboardingTimeline />
    <PricingGrid />
    <RoiBlock />
    <AboutAdam />
    <DemoBlock />
  </main>
  <Footer />
</Layout>
```

**Step 7: Check http://localhost:4321/ai-recepcia**

Stránka: hero → problém → riešenie → ako to funguje → onboarding 30 dní → pricing → ROI → about Adam → demo.

**Step 8: Commit**

```bash
cd astro-base-main && git add src/components/ai-recepcia/ src/pages/ai-recepcia.astro && git commit -m "feat: AI Recepcia page – full conversion page pre kliniky"
```

---

## Task 8: Blog Pages

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/components/blog/PostCard.astro`
- Create: `src/content/blog/.gitkeep` (placeholder)

**Step 1: Create PostCard.astro**

```astro
---
interface Props {
  title: string;
  date: string;
  perex: string;
  slug: string;
  readTime?: string;
}
const { title, date, perex, slug, readTime = '3 min' } = Astro.props;
---

<a
  href={`/blog/${slug}`}
  class="block p-6 transition-all duration-100"
  style="border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);"
  onmouseenter="this.style.cssText='border: var(--border-brutal); box-shadow: 2px 2px 0px #1A1A2E; transform: translate(2px,2px); background-color: var(--color-bg);'"
  onmouseleave="this.style.cssText='border: var(--border-brutal); box-shadow: var(--shadow-brutal); background-color: var(--color-bg);'"
>
  <div class="flex items-center justify-between mb-3">
    <span class="text-xs font-bold uppercase tracking-widest" style="color: var(--color-blue-deep);">
      {date}
    </span>
    <span class="text-xs font-light" style="opacity: 0.5;">{readTime} čítania</span>
  </div>
  <h3 class="text-lg font-semibold mb-2">{title}</h3>
  <p class="text-sm font-light" style="opacity: 0.7;">{perex}</p>
  <p class="text-xs font-bold uppercase tracking-wider mt-4" style="color: var(--color-blue-deep);">
    Čítať →
  </p>
</a>
```

**Step 2: Create blog/index.astro**

```astro
---
import Layout from "../../layouts/Layout.astro";
import Header from "../../components/Header.astro";
import PostCard from "../../components/blog/PostCard.astro";
import Footer from "../../components/Footer.astro";
import { SITE } from "../../config/site.mjs";

// Placeholder posts – replace with Astro content collections later
const posts = [
  {
    title: "Čoskoro – Jožov denník sa otvára",
    date: "2026-02-23",
    perex: "Tu budú zápisky zo zákulisia budovania AI Striko. Nič sa nebude tajiť.",
    slug: "coming-soon",
    readTime: "1 min",
  },
];
---

<Layout
  title={`Blog – Jožov denník | ${SITE.title}`}
  description="Zápisky zo zákulisia budovania AI Striko. Adam píše s Jožom."
>
  <Header />
  <main id="main-content" role="main" class="max-w-7xl mx-auto px-6 py-12">

    <div class="mb-10" style="border-bottom: var(--border-brutal); padding-bottom: 1.5rem;">
      <p class="text-xs font-bold uppercase tracking-widest mb-2" style="color: var(--color-blue-deep);">
        Builder Blog
      </p>
      <h1 class="text-5xl font-light">Jožov denník</h1>
      <p class="text-lg font-light mt-2" style="opacity: 0.6;">
        Adam píše. Jožo pomáha. Vy čítate.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard {...post} />
      ))}
    </div>

  </main>
  <Footer />
</Layout>
```

**Step 3: Create blog/[slug].astro (placeholder)**

```astro
---
import Layout from "../../layouts/Layout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";

const { slug } = Astro.params;

export async function getStaticPaths() {
  return [{ params: { slug: "coming-soon" } }];
}
---

<Layout title="Čoskoro | xvadur blog">
  <Header />
  <main id="main-content" role="main" class="max-w-2xl mx-auto px-6 py-16">
    <a href="/blog" class="text-xs font-bold uppercase tracking-wider hover:underline mb-8 block" style="color: var(--color-blue-deep);">
      ← Späť na blog
    </a>
    <h1 class="text-4xl font-light mb-6">Čoskoro</h1>
    <p class="text-lg font-light" style="opacity: 0.7;">
      Jožov denník sa práve otvára. Prvý zápisom čoskoro.
    </p>
  </main>
  <Footer />
</Layout>
```

**Step 4: Check at http://localhost:4321/blog**

Should see blog header + one placeholder card.

**Step 5: Commit**

```bash
cd astro-base-main && git add src/pages/blog/ src/components/blog/ && git commit -m "feat: blog index and post pages (placeholder content)"
```

---

## Task 9: Update Footer

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Replace Footer.astro**

```astro
---
const year = new Date().getFullYear();
---

<footer
  class="w-full mt-auto"
  style="border-top: var(--border-brutal); background-color: var(--color-bg);"
>
  <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div>
      <span class="text-sm font-bold uppercase tracking-wider">xvadur</span>
      <span class="text-xs font-light ml-3" style="opacity: 0.5;">
        · AI Striko · {year}
      </span>
    </div>
    <nav class="flex gap-6" aria-label="Footer navigation">
      <a href="/" class="text-xs font-medium uppercase tracking-wider hover:text-[#4FC3F7] transition-colors">xvadur</a>
      <a href="/jozo" class="text-xs font-medium uppercase tracking-wider hover:text-[#4FC3F7] transition-colors">Jožo</a>
      <a href="/blog" class="text-xs font-medium uppercase tracking-wider hover:text-[#4FC3F7] transition-colors">Blog</a>
    </nav>
  </div>
</footer>
```

**Step 2: Commit**

```bash
cd astro-base-main && git add src/components/Footer.astro && git commit -m "feat: minimal brutalist footer"
```

---

## Task 10: Add Framer Motion Scroll Reveals

**Files:**
- Modify: `src/components/home/HeroGrid.astro`
- Modify: `src/components/jozo/JozoHero.astro`

**Step 1: Wrap HeroGrid grid div with AnimatedBlock**

In `HeroGrid.astro`, import and wrap each major grid block with `<AnimatedBlock client:load>`:

```astro
---
import AnimatedBlock from "../ui/AnimatedBlock.tsx";
import BrutalistButton from "../ui/BrutalistButton.astro";
---
```

Wrap hero block:
```astro
<AnimatedBlock client:load delay={0} className="col-span-2">
  <!-- hero content div (remove col-span-2 from inner div) -->
</AnimatedBlock>
```

Wrap CTA block:
```astro
<AnimatedBlock client:load delay={0.1}>
  <!-- book a call content -->
</AnimatedBlock>
```

Continue for remaining blocks with delays `0.2`, `0.3`, `0.4`, `0.5`.

**Step 2: Check at http://localhost:4321**

Reload page – blocks should animate in from below on initial load. Scroll down – blog strip should animate in on scroll.

**Step 3: Commit**

```bash
cd astro-base-main && git add src/components/home/HeroGrid.astro src/components/jozo/JozoHero.astro && git commit -m "feat: Framer Motion scroll-reveal on grid blocks"
```

---

## Task 11: Final Check & Build

**Step 1: Run type-check and linter**

```bash
cd astro-base-main && npm run check
```

Fix any TypeScript errors reported.

**Step 2: Run production build**

```bash
cd astro-base-main && npm run build
```

Expected: no errors, `dist/` directory created.

**Step 3: Preview production build**

```bash
cd astro-base-main && npm run preview
```

Check http://localhost:4321 – verify all pages work: `/`, `/jozo`, `/blog`, `/blog/coming-soon`.

**Step 4: Final commit**

```bash
cd astro-base-main && git add -A && git commit -m "feat: xvadur landing page – production build verified"
```

---

## Notes

- **cal.com/xvadur** – booking link (potvrdiť s Adamom či je správny)
- **adam@xvadur.com** – kontaktný email (overený z biznis dokumentov)
- Blog posts currently hardcoded – migrate to Astro Content Collections in v2
- OpenClaw logo assets in `/Users/_xvadur/xvadur_openclaw/docs/assets/` – copy `openclaw-logo-text.png` to `astro-base-main/public/` if needed
- Mobile hover effects via `onmouseenter` inline – consider extracting to CSS class in v2
- Space Grotesk loaded from Google Fonts CDN – consider self-hosting for production performance
