/**
 * Guarantees an absolute URL. Without this, a value like "www.linkedin.com/in/x"
 * is treated as a path relative to your own site and 404s — which is exactly what
 * happened once already. Paste handles however you like; this fixes them.
 */
export function href(url: string): string {
  const u = url.trim();
  if (!u || u === "#") return "";
  if (/^(https?:)?\/\//i.test(u) || u.startsWith("mailto:") || u.startsWith("/")) return u;
  return `https://${u}`;
}

/**
 * Everything the site says lives here. Edit this file, not the components.
 * Anything marked TODO is a placeholder you should replace before deploying.
 */

export const profile = {
  name: "Abdullah",
  role: "Backend & Full-Stack Developer",
  location: "Gujranwala, Pakistan",
  education: "BS Computer Science, GIFT University",
  timezone: "Asia/Karachi",
  status: "Open to backend internships, junior roles & remote",
  email: "abdullahqudoos10@gmail.com", // CONFIRM: you wrote "abdullahqudoos10" without a domain
  socials: {
    github: "https://github.com/Abdullahkk659",
    linkedin: "www.linkedin.com/in/abdullah-qudoos-637342288",
    x: "", // empty hides the icon
  },
  photo: "/me.jpg", // drop your portrait here — grayscale is applied in CSS
  cvUrl: "/abdullah-abdul-qudoos-cv.pdf",
  intro:
    "I build the backend behind real products — APIs, databases, payments and real-time updates — and the app on top when it needs one. Final-year CS student in Gujranwala, open to remote work.",
  /** Headline renders as: plain text, then each `hl` word as a neon pill. */
  headline: [
    { text: "I build " },
    { text: "backends", hl: "solid" },
    { text: " " },
    { text: "& apps", hl: "ghost" },
    { text: " that real businesses run on" },
  ] as { text: string; hl?: "solid" | "ghost" }[],
  badgeText: "· backend · node.js · postgres · open to remote ",
  tools: ["Node.js", "PostgreSQL", "Docker", "React", "React Native"],
  facts: [
    { value: "6", label: "Shipped builds" },
    { value: "50", label: "Concurrent orders, 0 duplicates" },
    { value: "24", label: "End-to-end tests" },
  ],
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  links?: { label: string; url: string }[];
  summary: string;
  bullets: string[];
  tags: string[];
};


/* ============================================================================
   HOW TO ADD A PROJECT
   ----------------------------------------------------------------------------
   Copy the block below, paste it into the `projects` array, edit the fields.
   That is the whole job — the work list, the phone screens, the tab strip and
   the scroll syncing all read from this array, so nothing else needs touching.

   {
     slug: "short-id",                    // unique, lowercase, no spaces
     title: "What it's called",
     eyebrow: "Category · Tech · Tech",   // small grey line above the title
     links: [                             // optional; omit if nothing to show
       { label: "yoursite.com", url: "https://yoursite.com" },
       { label: "Source", url: "https://github.com/you/repo" },
     ],
     summary: "One or two sentences on what it is and why it was interesting.",
     bullets: [
       "What you actually built or decided",
       "Keep these concrete — numbers, names, trade-offs",
     ],
     tags: ["React", "Node.js"],          // first tag shows on the phone screen
   },

   The phone will auto-generate a screen from the title, bullets and tags.
   If you want a hand-designed screen instead, write a component in
   src/components/Device.tsx and register it in `customScreens` under this slug.

   Order in this array = order on the page. Put the strongest work first.
   ============================================================================ */

export const projects: Project[] = [
  {
    slug: "rosheen",
    title: "Rosheen Bakes — online ordering for a home bakery",
    eyebrow: "Full stack · Node.js · PostgreSQL · Live business",
    links: [{ label: "rosheenbakes.duckdns.org", url: "https://rosheenbakes.duckdns.org" }],
    summary:
      "A home bakery in Gujranwala needed to take orders online and deliver across the city without a developer on call. Customers order on the site, see the delivery fee before they pay and follow their order live; the kitchen phone gets an alert the moment an order lands.",
    bullets: [
      "Stopped duplicate orders and price tampering — 0 duplicates across 50 simultaneous submissions — with idempotency keys and server-side pricing inside PostgreSQL transactions",
      "Delivery fee calculated on the server from the customer's map pin, so the total shown before payment is the total charged",
      "Every status change reaches the customer, kitchen and rider screens instantly: PostgreSQL LISTEN/NOTIFY feeding server-sent events",
      "Live rider location from a WhatsApp link, no app install — shown on the customer's page and on one kitchen map for all active riders",
      "Bank transfers confirmed from a kitchen web app with push alerts; JazzCash checkout built with HMAC-signed requests, verified callbacks and a reconciliation job",
      "24 end-to-end tests against a real database; self-hosted on Oracle Cloud ARM with Docker Compose, automatic HTTPS and daily backups",
    ],
    tags: ["Node.js", "Fastify", "PostgreSQL", "Docker", "Leaflet", "GSAP", "Web Push"],
  },
  {
    slug: "pulsecheck",
    title: "PulseCheck — API Uptime Monitoring",
    eyebrow: "Full stack · React · Express · JWT",
    links: [{ label: "Source", url: "https://github.com/Abdullahkk659/PulseCheck" }],
    summary:
      "A monitoring service that polls your endpoints on a schedule and tells you the moment one stops responding — with the alert arriving in Slack rather than a dashboard you have to remember to check.",
    bullets: [
      "Express backend that runs scheduled health checks and records uptime history per endpoint",
      "Real Slack webhook delivery on failure, not a simulated notification",
      "JWT authentication with hashed passwords; secrets kept in environment variables and out of version control",
      "React + Vite dashboard with Tailwind and Framer Motion",
    ],
    tags: ["React", "Vite", "Express", "JWT", "Tailwind", "Slack API"],
  },
  {
    slug: "bizplan",
    title: "AI Business Plan Generator",
    eyebrow: "Full stack · React · Express · Anthropic API",
    links: [
      { label: "ai-business-plan-generator-six.vercel.app", url: "https://ai-business-plan-generator-six.vercel.app/" },
    ],
    summary:
      "A wizard that takes a few facts about a business and returns a full plan — nine written sections, computed financials and a PDF export. The interesting part isn't the generation, it's keeping the API key safe and the public demo free.",
    bullets: [
      "Multi-step wizard collects inputs, then the Anthropic API drafts nine plan sections",
      "Financial projections computed from the inputs, with the whole plan exported to PDF",
      "Firebase Auth (email/password and Google) with plans stored per user in Firestore",
      "API calls run through an Express proxy — the key lives in a server environment variable and is never shipped to the browser",
      "Public deploy runs in demo mode on pre-generated plans, so the live site makes no API calls: nothing to leak, nothing to bill",
    ],
    tags: ["React", "Vite", "Express", "Anthropic API", "Firebase", "Tailwind"],
  },
  {
    slug: "insighthire",
    title: "InsightHire",
    eyebrow: "Mobile · React Native · Node.js · Firebase",
    links: [{ label: "Source", url: "https://github.com/Abdullahkk659/InsightHire" }],
    summary:
      "A React Native app that reads a personality assessment and points an applicant at the department they're likely to fit. Scoring runs on a Node service, not in the client.",
    bullets: [
      "Big Five framework implemented server-side to score responses",
      "Node.js REST API returns ranked department recommendations",
      "Firebase Auth and result storage per user",
      "Three-option answer pattern to keep the assessment fast on mobile",
    ],
    tags: ["React Native", "Node.js", "REST", "Firebase"],
  },
  {
    slug: "benchmark",
    title: "Heart disease classification benchmark",
    eyebrow: "Machine learning · Python · NumPy from scratch",
    links: [{ label: "Source", url: "https://github.com/Abdullahkk659/heart-disease-prediction-" }],
    summary:
      "Three classifiers built from their mathematics rather than imported, then run against the same UCI Cleveland heart disease split to see which one earned the recommendation.",
    bullets: [
      "KNN, Logistic Regression and Gaussian Naive Bayes implemented from scratch in NumPy",
      "303 patient records, 13 clinical features, Min-Max scaling fitted on the training set only so nothing leaks",
      "Hyperparameters tuned with 5-fold stratified cross-validation; the test set was touched once",
      "Naive Bayes won on accuracy (81.97%), precision (0.867) and F1 (0.825)",
      "All three tied on recall — the accuracy gap came entirely from false positives",
    ],
    tags: ["Python", "NumPy", "Pandas", "Cross-validation"],
  },
  {
    slug: "malware",
    title: "Android malware traffic classifier",
    eyebrow: "Machine learning · Security · XGBoost",
    links: [{ label: "Source", url: "https://github.com/Abdullahkk659/Android-Malware-Detection" }],
    summary:
      "A four-class model that reads network flow statistics off an Android device and separates benign traffic from adware, scareware and SMS malware. I took over a notebook whose headline model was a deep network, and replaced it with something better suited to the data.",
    bullets: [
      "CICAndMal2017 flow data — around 80 numeric features per traffic flow",
      "Four classes: benign, adware, scareware and SMS malware",
      "Swapped the notebook's Keras network (256→128→64, 100 epochs) for XGBoost, which suits tabular data and trains on CPU in a fraction of the time",
      "Rebalanced the classes so the reported accuracy reflects real performance rather than majority-class bias",
      "Gradient-boosted trees also expose feature importances, so a detection can be explained by which traffic features drove it",
    ],
    tags: ["Python", "XGBoost", "Scikit-learn", "CICAndMal2017"],
  },
];

/** Held-out test accuracy, 61-patient test split. Source: ML term report. */
export const benchmarkScores = [
  { model: "K-Nearest Neighbours", score: 77.05, best: false },
  { model: "Logistic Regression", score: 80.33, best: false },
  { model: "Gaussian Naive Bayes", score: 81.97, best: true },
];

export type Certificate = {
  title: string;
  detail: string;
  issuer: string;
  date: string;
  thumb: string;
  file: string;
};

export const certificates: Certificate[] = [
  {
    title: "Harvard HSIL Hackathon",
    detail: "Participation · two-day event",
    issuer: "Harvard T.H. Chan Health Systems Innovation Lab, GIFT University & Brackets",
    date: "April 2026",
    thumb: "/certificates/cert-hsil.jpg",
    file: "/certificates/harvard-hsil-hackathon.pdf",
  },
  {
    title: "Code & Create Project Display 2026",
    detail: "Participation · Mobile App Development category",
    issuer: "GIFT University SEAS & Young Computer Professionals Society",
    date: "February 2026",
    thumb: "/certificates/cert-codecreate.jpg",
    file: "/certificates/code-and-create-2026.jpg",
  },
];

export const stack = [
  {
    group: "Backend",
    items: ["Node.js", "Fastify & Express", "REST APIs & SSE", "Auth (JWT)", "Spring Boot — learning"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "SQL & transactions", "MongoDB", "Firestore", "Python & Pandas"],
  },
  {
    group: "Infrastructure",
    items: ["Docker & Compose", "Linux servers", "Caddy / HTTPS", "Backups", "Git & GitHub"],
  },
  {
    group: "Frontend & mobile",
    items: ["React", "React Native", "JavaScript (ES6+)", "HTML5 & CSS3", "Firebase Auth & FCM"],
  },
];
