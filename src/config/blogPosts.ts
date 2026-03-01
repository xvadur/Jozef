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
    title: "AI už nie je chatbot: 1 deň, 2 agenti, 0 výhovoriek",
    date: "2026-03-02",
    perex:
      "Dnes sa potvrdilo, že agentický workflow funguje v teréne. Mobil, hlasovky, Telegram a reálne nasadenie agentov pre zubára aj realiťáka.",
    slug: "ai-uz-nie-je-chatbot-1-den-2-agenti-0-vyhovoriek",
    readTime: "6 min",
    audioUrl: "/audio/ai-uz-nie-je-chatbot-1-den-2-agenti.mp3",
    content: [
      "Dnes bol deň, keď sa mi definitívne prepol mindset. AI už pre mňa nie je chatbot. Je to operátor, ktorý vie vykonávať úlohy medzi mojimi hlasovkami.",
      "Proof of concept prebehol vonku, cez telefón. Posielal som zadania cez Telegram, agent robil patche, upravoval prompty, mapoval payloady a spúšťal test cally. Ja som robil kontrolu výsledku.",
      "Postavili sme dva použiteľné flowy: zubársku recepciu a realitný intake. Obe verzie boli napojené na kalendár a pripravené na reálne testovanie.",
      "Kľúčový rozdiel bol skill layer. Keď je workflow zabalený do znovupoužiteľného skillu, iterácie sú stabilné, rýchle a bez chaosu.",
      "Zajtra ide finál discovery so zubárom. Cieľ je jasný: potvrdiť offer fit a rozbehnúť prvú case study, od ktorej sa dá škálovať predaj.",
      "CTA: Nerieš donekonečna modely. Definuj výsledok do 24 hodín, postav workflow, otestuj ho v realite a iteruj.",
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
