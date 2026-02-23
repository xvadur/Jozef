# xvadur Landing Page – Design Document
Date: 2026-02-23
Updated: 2026-02-23 (po analýze business kontextu z Desktop/busines)

## Overview

Multi-page landing page pre **xvadur** (Adam Rudavský) – 10 rokov zdravotná sestra na urgentnom príjme, dnes AI entrepreneur a zakladateľ **AI Striko**. Stránka predstavuje Adama a primárne komerčný produkt **AI Recepcia** (hlasová AI recepcia pre ambulancie/kliniky), pričom **Jožo** (nakonfigurovaný OpenClaw agent) je "mozog" za všetkým. Primárna cieľová skupina: podnikatelia (ambulancie, kliniky, hotely), sekundárne: AI-curious professionals.

---

## Site Architecture

```
/              → xvadur homepage (Adam intro + AI Striko + teasery pre Jožo + AI Recepcia)
/jozo          → Jožo – kto je Jožo, OpenClaw, čo reálne robí, Jožov denník teaser
/ai-recepcia   → AI Recepcia – produkt pre kliniky, problem/solution, pricing, ROI, demo CTA
/blog          → Builder blog – Jožov denník
/blog/[slug]   → Jednotlivý blog post
```

**Logika oddelenia:**
- `/jozo` = identita a schopnosti AI agenta (pre tých, čo chcú vedieť čo je Jožo)
- `/ai-recepcia` = obchodná ponuka pre kliniky (conversion page, priamo z outreachs)

**Tech stack:** Astro 5 + React 19 + Tailwind v4 + Framer Motion 12

---

## Brand & Identity

| Element | Hodnota |
|---------|---------|
| Meno autora | Adam Rudavský |
| Handle | xvadur |
| Firma | AI Striko |
| Metodológia | XVADUR Protocol™ |
| Produkt | AI Recepcia (hlasová AI 24/7 pre kliniky) |
| AI agent | Jožo (OpenClaw) |
| Email | adam@xvadur.com |
| Pozadie príbehu | 10 rokov zdravotná sestra → 7 mesiacov AI building → AI Striko |

---

## Real Copy – Homepage

### Hero (hlavný blok)
```
Label:    AI Striko · Slovensko
H1:       10 rokov urgentná medicína.
          Dnes AI.
Body:     Nie som random tech startup.
          Som kolega, ktorý pozná váš svet – a vie ho zlepšiť.
```

### AI Striko blok
```
Label:    Firma
H3:       AI Striko
Body:     Pomáhame podnikateľom adoptovať AI.
          Bez zbytočnej paniky.
```

### Jožo teaser blok
```
Label:    Môj AI suite
H3:       Kto je Jožo?
Body:     Jožo je môj nakonfigurovaný AI business asistent
          postavený na OpenClaw. Rieši AI recepciu, blog, automatizácie.
Link:     Zistiť viac →  (/jozo)
```

### Book a Call blok (pink)
```
Label:    Porozprávajme sa
H2:       Book a Call
Button:   Rezervovať →  (cal.com/xvadur)
```

### Blog teaser blok
```
Label:    Jožov denník
H3:       Posledný zápisom z blogu
Body:     Zápisky zo zákulisia budovania AI Striko.
```

---

## Real Copy – Jožo Page `/jozo`

Táto stránka je o **Jožovi ako AI agentovi** – nie o predaji. Slúži na vzdelanie a dôveru.

### Hero
```
Label:    OpenClaw AI Operátor
H1:       Jožo
Body:     Som AI operátor postavený na OpenClaw – nie chatbot na parádu.
          Bežím ako osobný asistent nad Adamovým workspace,
          správami a nástrojmi.
CTA1:     AI Recepcia →    (pink, → /ai-recepcia)
CTA2:     Jožov denník →   (white, → /blog)
```

### Čo reálne robím (Jožov hlas – prvá osoba)
```
Bloky schopností:
✓ Čítam a triedim poznámky
✓ Navrhujem priority a ďalšie kroky
✓ Zapisujem a aktualizujem tasky
✓ Pripravujem briefingy
✓ Držím kontext medzi dňami
✓ Spúšťam automatizované workflowy
```

### Hranice (Operational Truth)
```
Robím autonómne:    bežné tasky, poznámky, workflowy
Cez potvrdenie:     citlivé akcie, platby, externá komunikácia
Závislé od integr.: kalendár, email, Obsidian, n8n
Fallback:           pri nejasnostiach → Adam rozhodne
```

### Disclaimer blok
```
⚠️  Jožo nenahrádza medicínske rozhodovanie.
    Rieši komunikáciu, triáž hovorov a scheduling.
    Všetky zdravotnícke rozhodnutia zostávajú na lekárovi.
```

### Teaser na AI Recepciu
```
H3:   Chceš Jožo pre svoju kliniku?
Body: Mám vertikálnu konfiguráciu pre ambulancie.
      Volá sa AI Recepcia.
CTA:  Pozrieť AI Recepciu →   (/ai-recepcia)
```

---

## Real Copy – AI Recepcia Page `/ai-recepcia`

Táto stránka je **conversion page** – ide priamo z outreachs a cold emailov na kliniky.

### AI Recepcia – Problem Section
```
H2:       Poznáte to?
Pain:     ✗ Recepčná má plné ruky – pacienti + papiere + telefón
          ✗ Zmeškané hovory po 18:00, cez víkend
          ✗ Každý zmeškaný hovor = €50-150 menej
          ✗ Nemôžete si dovoliť ďalšieho zamestnanca (€1,500+/mes)
Impact:   Zubná klinika zmešká priemerne 10-15% hovorov.
          1,200 hovorov/mesiac = €3,600 stratených mesačne.
```

### AI Recepcia – Solution
```
H2:       AI recepcia, ktorá pracuje 24/7
Sub:      Zdvihne každý hovor, objedná pacienta, odpovie na otázky.
Features: ✓ 24/7 dostupnosť
          ✓ Automatické objednávanie do kalendára
          ✓ Triáž – urgentné → vás, bežné → AI
          ✓ Multijazyčnosť (SK, EN, DE, HU)
          ✓ Web widget
          ✓ SMS pripomienky → menej no-shows
```

### Pricing
```
H2:       Transparentný pricing
Sub:      Žiadne skryté poplatky. Žiadne 3-ročné zmluvy.

STARTER   Setup €1,000 · €400/mes
          Pre kliniky <800 hovorov/mesiac
          AI voice recepcia + kalendár integrácia + email support

GROWTH ⭐  Setup €1,500 · €500/mes
          800-1,500 hovorov/mesiac
          + Dashboard & analytics + Priority support + SMS + Web widget

PREMIUM   Setup €2,000 · €600/mes
          1,500+ hovorov/mesiac
          + CRM integrácia + Custom voice + Multi-user

Note:     Stojí to 1-2% vášho obratu. Návratnosť je 3-6x.
```

### ROI Blok
```
H2:       Koľko to prinesie vašej klinike?
Example:  Stredná zubná klinika:
          1,200 hovorov/mes · 10% zmeškané = 120 hovorov
          30% konverzia = 36 stratených pacientov
          €100/pacient = €3,600 stratených mesačne
          Tvoje náklady (Growth): €7,500/rok
          ROI: typicky 4–6x (podľa baseline kliniky)
          Väčšina klientov sa dostane do break-even do 60–90 dní.
          [POZNÁMKA: nie "zaplatí sa za 2 mesiace" – príliš tvrdý claim bez pilotov]
```

### Onboarding Timeline (nový blok – návrh Jožo)
```
H3:   Ako vyzerá prvých 30 dní
D1–3:   Mapovanie call flow + FAQ + fallback pravidlá
D4–7:   Technický setup + interné testy
Týž 2:  Limitovaný live režim + monitoring
Týž 3:  Optimalizácia scenárov podľa reálnych hovorov
Týž 4:  Report výsledkov + rozhodnutie o scale
```

### How It Works (3 kroky)
```
H3:       Ako to funguje?
1.        Setup (1-2 dni) – napojenie na telefón + kalendár
2.        Testovanie – zavoláte, doladíme, AI sa učí
3.        Live – AI dvíha hovory, vy dostávate notifikácie
```

### About Adam
```
H2:       Kto som a prečo mi môžete veriť
Story:    Volám sa Adam Rudavský (xvadur).
          10 rokov zdravotná sestra na urgentnom príjme v Bratislave.
          Každý deň: preťažená recepcia, chaos, zmeškané hovory.
          Vedel som, že ďalší zamestnanec to nerieši.
          Začal som sa učiť AI. 7 mesiacov buildu. Dnes AI Striko.
Why:      ✓ Rozumiem vášmu biznisu – 10 rokov v healthcare
          ✓ Pozním bolestivé body – zažil som to na vlastnej koži
          ✓ Nie som len technik – som z vášho sveta
Quote:    "Nie som random tech startup. Som kolega,
           ktorý pozná váš svet – a vie ho zlepšiť."
```

### Demo CTA (pink sekcia)
```
H2:       Prestať strácať pacientov. Začať dnes.
Sub:      Demo trvá 15 minút. Uvidíte presne, ako AI recepcia
          funguje pre vašu kliniku.
CTA1:     Chcem demo (zadarmo)  →  adam@xvadur.com
CTA2:     Zavolať / Napísať     →  cal.com/xvadur
Guarantee: ✓ Žiadny záväzok  ✓ Žiadna kreditka  ✓ 15 minút
```

### Trust Badges
```
✓ 10 rokov healthcare skúseností
✓ GDPR compliant
✓ EU hosting
✓ Slovenská firma
```

### FAQ
```
Q: Čo ak AI urobí chybu?
A: Fallback na človeka. Všetky hovory logujeme.

Q: GDPR?
A: EU servery. DPA zmluva k dispozícii.

Q: Koľko trvá setup?
A: 1-2 dni. Live za týždeň.

Q: Môžem zrušiť?
A: Áno. Mesačné predplatné, bez záväzkov.
```

---

## Visual Language

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#F7F8FA` | Main background (off-white) |
| `--color-silver` | `#DDE3EA` | DRIFT SILVER – card backgrounds |
| `--color-blue` | `#4FC3F7` | ION BLUE – primary accent |
| `--color-blue-deep` | `#4A7FA5` | Deep accent, hover states |
| `--color-text` | `#1A1A2E` | Body text |
| `--color-pink` | `#FF3EA5` | Primary CTA (sparingly) |
| `--color-red` | `#E53935` | OpenClaw/Jožo accent |

### Typography
- **Font:** Space Grotesk (Google Fonts)
- Headings: weight 300–500, large tracking
- Body: weight 300, comfortable line-height
- Labels/tags: uppercase, letter-spacing wide

### Brutalist UI Elements
- Borders: `2-3px solid #1A1A2E`
- Box shadow offset: `4px 4px 0px #1A1A2E`
- Hover: shadow shrinks to `2px 2px`, element shifts (+2px)
- Buttons: uppercase, bold, no border-radius (2px max)

### Animations (Framer Motion)
- Grid block reveal on scroll (slide up + fade, stagger)
- Brutalist button hover: translateY + shadow transition
- No excessive motion – purposeful only

---

## Navigation

### Header (sticky)
- Left: `xvadur` wordmark
- Right: `O mne` · `Jožo` · `Blog` · `[Book a Call]` (pink)
- Mobile: hamburger → fullscreen overlay

### Footer
- `xvadur · AI Striko · adam@xvadur.com · © 2026`
- Linky: xvadur / Jožo / Blog

---

## File Structure (Astro)

```
src/
├── pages/
│   ├── index.astro          # Homepage
│   ├── jozo.astro           # Jožo agent identity page
│   ├── ai-recepcia.astro    # AI Recepcia conversion page
│   └── blog/
│       ├── index.astro
│       └── [slug].astro
├── components/
│   ├── home/
│   │   └── HeroGrid.astro
│   ├── jozo/
│   │   ├── JozoHero.astro
│   │   ├── JozoCapabilities.astro
│   │   ├── JozoLimits.astro        # Operational truth + disclaimer
│   │   └── JozoTeaserRecepcia.astro
│   ├── ai-recepcia/
│   │   ├── RecepciahHero.astro
│   │   ├── ProblemSection.astro
│   │   ├── SolutionSection.astro
│   │   ├── HowItWorks.astro
│   │   ├── OnboardingTimeline.astro
│   │   ├── PricingGrid.astro
│   │   ├── RoiBlock.astro
│   │   ├── AboutAdam.astro
│   │   └── DemoBlock.astro
│   ├── blog/
│   │   └── PostCard.astro
│   └── ui/
│       ├── BrutalistButton.astro
│       └── AnimatedBlock.tsx
├── styles/
│   └── global.css
└── config/
    └── site.mjs
```

---

## Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| /jozo a /ai-recepcia sú oddelené stránky | Jožo = agent identita; AI Recepcia = conversion page pre kliniky |
| Jožo = mozog, AI Recepcia = produkt | Jasné oddelenie – Jožo je tech stack, AI Recepcia je ponuka |
| Pricing priamo na /jozo | Podnikatelia chcú čísla rýchlo – žiadne "kontaktujte nás" |
| ROI kalkulácia viditeľná | €3,600 stratených mesačne je konkrétny, presvedčivý argument |
| About Adam na /jozo (nie homepage) | Dôvera sa buduje kontextom – najprv produkt, potom osoba |
| Asymmetric grid layout | Differentiates, brutalist aesthetic |
| Space Grotesk | Thin, sebavedomý, nie generický |
| ION BLUE + DRIFT SILVER | Z inšpirácie usera |
| Pink pre primary CTA | Brutalist kontrast, eye-catching |
| Multi-page | Blog + Jožo sú dostatočne odlišné |
