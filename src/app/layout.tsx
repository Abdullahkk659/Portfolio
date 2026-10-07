import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans, DM_Mono } from "next/font/google";
import { profile } from "@/lib/profile";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Backend and full-stack developer in Gujranwala, Pakistan. Node.js, PostgreSQL and Docker in production, React and React Native on the front. Open to internships, junior roles and remote work.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  openGraph: { title, description, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#050608",
  colorScheme: "dark" as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    knowsAbout: ["React Native", "React", "Node.js", "Firebase", "Machine learning"],
    sameAs: [profile.socials.github, profile.socials.linkedin],
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
