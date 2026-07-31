/**
 * Everything the site says lives here. Edit this file, not the components.
 * Anything marked TODO is a placeholder you should replace before deploying.
 */

export const profile = {
  name: "Abdullah",
  role: "Mobile & Full-Stack Developer",
  location: "Gujranwala, Pakistan",
  education: "BS Computer Science, GIFT University",
  timezone: "Asia/Karachi",
  status: "Open to internships & freelance",
  email: "abdullahqudoos10@gmail.com", // CONFIRM: you wrote "abdullahqudoos10" without a domain
  socials: {
    github: "https://github.com/Abdullahkk659",
    linkedin: "https://linkedin.com/in/yourhandle", // TODO
    x: "#", // TODO
  },
  photo: "/me.jpg", // drop your portrait here — grayscale is applied in CSS
  cvUrl: "/abdullah-abdul-qudoos-cv.pdf",
  intro:
    "I build mobile and web apps end to end — the screen, the API, the database and the notification that reaches your phone. Based in Gujranwala.",
  /** Headline renders as: plain text, then each `hl` word as a neon pill. */
  headline: [
    { text: "I build " },
    { text: "apps", hl: "solid" },
    { text: " " },
    { text: "& interfaces", hl: "ghost" },
    { text: " that people actually keep installed" },
  ] as { text: string; hl?: "solid" | "ghost" }[],
  badgeText: "· open to internships · freelance · gujranwala pk ",
  tools: ["React Native", "React", "Node.js", "Firebase", "Python"],
  facts: [
    { value: "4", label: "Shipped builds" },
    { value: "3", label: "Classifiers from scratch" },
    { value: "80+", label: "Flow features modelled" },
  ],
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  href?: string;
  hrefLabel?: string;
  summary: string;
  bullets: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "nova",
    title: "Nova",
    eyebrow: "Social · React · Vite · Firebase · Cloudinary",
    href: "https://novagram.vercel.app",
    hrefLabel: "novagram.vercel.app",
    summary:
      "An Instagram-style social platform where the feed updates without a refresh. Built to prove out the hard parts: live listeners, media pipelines and notifications that reach the device.",
    bullets: [
      "Real-time feed driven by Firestore snapshot listeners",
      "Email and Google sign-in through Firebase Auth",
      "Cloudinary uploads for photo and video with live progress",
      "Push notifications on web and mobile via Firebase Cloud Messaging",
    ],
    tags: ["React", "Vite", "Firestore", "FCM", "Cloudinary"],
  },
  {
    slug: "insighthire",
    title: "InsightHire",
    eyebrow: "Mobile · React Native · Node.js · Firebase",
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

export const stack = [
  {
    group: "Frontend",
    items: ["React.js", "React Native", "JavaScript (ES6+)", "HTML5 & CSS3", "Responsive design"],
  },
  {
    group: "Backend",
    items: ["Node.js", "REST APIs", "Firebase Auth", "Firestore & Storage", "Cloud Messaging"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MongoDB", "SQL", "Firestore", "Cloudinary"],
  },
  {
    group: "Machine learning",
    items: ["Python", "Scikit-learn", "Pandas & NumPy", "EDA & cleaning", "Model evaluation"],
  },
];
