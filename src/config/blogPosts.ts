export type BlogPost = {
  title: string;
  date: string;
  perex: string;
  slug: string;
  readTime: string;
  audioUrl?: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "Rubicon Day: 1 deň, 2 agenti, 0 výhovoriek",
    date: "2026-03-02",
    perex:
      "Dnešný log je o reálnom shipovaní: publikácia na webe, CI/CD fix, podcast routing a iterácia obsahu tak, aby výstup nebol len pekný, ale použiteľný.",
    slug: "rubicon-day-2-agenti-0-vyhovoriek",
    readTime: "6 min",
    audioUrl: "/audio/rubicon-day-2026-03-02.mp3",
    content: [
      "Dnes to nebolo o veľkých slovách. Bolo to o tom, či vieme dotiahnuť výstup až na produkciu bez výhovoriek.",
      "Post sme publikovali, build pipeline sme opravili a následne sme riešili poslednú míľu: prečo podcast audio route vracia fallback HTML namiesto MP3.",
      "Po fixe sme to validovali technicky, nie pocitovo: správny content type audio/mpeg, funkčné prehrávanie v článku a konzistentný asset path.",
      "Najväčšia lekcia dňa je jednoduchá: publish bez validácie je náhoda. Validácia bez publishu je len simulácia progresu.",
      "Odteraz chceme každý deň držať rovnaký rytmus: krátky log, jasný point, audio verzia a jedno konkrétne ponaučenie pre builderov.",
    ],
  },
  {
    title: "AI agent v praxi: ako som za 1 deň nasadil voice flow pre zubára aj realiťáka",
    date: "2026-03-02",
    perex:
      "Reálna prípadová štúdia z terénu: Telegram hlasovky, OpenClaw orchestrace, ElevenLabs voice agent a Google Calendar booking. Bez teórie, len workflow, ktorý funguje.",
    slug: "ai-uz-nie-je-chatbot-1-den-2-agenti-0-vyhovoriek",
    readTime: "8 min",
    audioUrl: "/audio/ai-uz-nie-je-chatbot-1-den-2-agenti.mp3",
    content: [
      "Ak hľadáš, ako nasadiť AI voice agenta do malého biznisu, toto je môj report z jedného dňa v ostrej prevádzke. Cieľ nebol " +
        "spraviť pekné demo. Cieľ bol postaviť workflow, ktorý vie obsluhovať reálne hovory a booking.",
      "Najväčší zlom bol v tom, že som nepracoval klasicky za notebookom. Zadania som posielal cez Telegram hlasovky, agent robil úpravy promptov, mapoval tool payloady, spúšťal testy a ja som robil len validáciu výsledku.",
      "V ten istý deň sme nasadili dva funkčné use case flowy: AI recepcia pre zubnú ambulanciu a AI intake pre realitného makléra. Obe vetvy mali napojenie na kalendár a zvládli základný booking proces.",
      "Technicky najviac pomohla skill vrstva. Keď má agent jasný postup, iterácie sú konzistentné: zadanie -> patch -> test call -> korekcia. Toto je obrovský rozdiel oproti ručnému klikaniu každého parametra.",
      "Čo z toho vyplýva pre podnikateľa? AI chatbot je fajn na odpovede, ale AI agent je o exekúcii. Ak definuješ jasný outcome, agent vie medzi tvojimi vstupmi urobiť prácu, ktorú by si inak riešil hodiny alebo dni.",
      "Ďalší krok je finál discovery so zubárom a potvrdenie offer fitu. Ak sa to potvrdí, vzniká prvá case study pre predaj AI recepcie v zdravotníctve.",
      "Moja výzva na záver: nestrácaj čas nekonečným porovnávaním modelov. Zadefinuj výsledok do 24 hodín, postav jednoduchý workflow, otestuj ho v realite a iteruj.",
    ],
  },
  {
    title: "Čoskoro – Jožov denník sa otvára",
    date: "2026-02-23",
    perex: "Tu budú zápisky zo zákulisia budovania AI Striko. Nič sa nebude tajiť.",
    slug: "coming-soon",
    readTime: "1 min",
    content: ["Jožov denník sa práve otvára. Prvý zápis už je vonku."],
  },
];
