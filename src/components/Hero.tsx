"use client";

import { useState } from "react";
import { href, profile } from "@/lib/profile";

const initial = profile.name.charAt(0).toUpperCase();

function Socials() {
  return (
    <div className="socials">
      {href(profile.socials.x) && (
        <a href={href(profile.socials.x)} aria-label="X" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24">
            <path d="M17.5 3h3l-6.6 7.5L21.7 21h-5.9l-4.6-6-5.3 6H2.9l7-8L2.6 3h6l4.2 5.5zm-1 16h1.6L8.1 4.6H6.3z" />
          </svg>
        </a>
      )}
      <a href={href(profile.socials.linkedin)} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24">
          <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4 0 4.74 2.5 4.74 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4z" />
        </svg>
      </a>
      <a href={href(profile.socials.github)} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 00-3.16 19.5c.5.08.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.57.69.48A10 10 0 0012 2z" />
        </svg>
      </a>
    </div>
  );
}

function Portrait() {
  const [missing, setMissing] = useState(false);

  return (
    <div className="portrait rise d2">
      <div className="photo">
        {!missing && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={profile.photo}
            alt={profile.name}
            onError={() => setMissing(true)}
          />
        )}
      </div>

      {missing && (
        <div className="ph-empty" style={{ display: "flex" }}>
          <div className="ph-frame">
            <div className="ph-mono">{initial}</div>
          </div>
          <p className="mono">
            Your photo goes here
            <br />
            save it as /public/me.jpg
          </p>
        </div>
      )}

      <div className="p-top">
        <span className="glyph">{initial}</span>
        <Socials />
      </div>

      <div className="avail">
        <i />
        Available for work
      </div>

      <div className="p-card">
        <h2>Hey, I&rsquo;m {profile.name}</h2>
        <p>{profile.intro}</p>
      </div>

      <div className="p-acts">
        <a className="orb" href="#contact" aria-label="Get in touch">
          <svg viewBox="0 0 24 24">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
        <a className="btn-neon" href="#contact">
          Let&rsquo;s talk
        </a>
        <a className="btn-line" href={profile.cvUrl} download>
          <svg viewBox="0 0 24 24">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
          </svg>
          Download CV
        </a>
      </div>
    </div>
  );
}

const RIBBON =
  "M10 160 C 110 40, 205 45, 285 120 C 345 176, 405 186, 452 140 C 500 92, 566 88, 600 126 C 634 164, 604 200, 566 184 C 522 165, 546 104, 690 96";

function Ribbon() {
  return (
    <div className="ribbon rise d4">
      <svg className="flow" viewBox="0 0 700 210" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A6FD8" />
            <stop offset="52%" stopColor="#1FB6FF" />
            <stop offset="100%" stopColor="#7FE4FF" />
          </linearGradient>
          <filter id="ribbonBlur">
            <feGaussianBlur stdDeviation="17" />
          </filter>
        </defs>
        <path
          d={RIBBON}
          stroke="url(#ribbonGrad)"
          strokeWidth="46"
          fill="none"
          strokeLinecap="round"
          opacity=".4"
          filter="url(#ribbonBlur)"
        />
        <path d={RIBBON} stroke="url(#ribbonGrad)" strokeWidth="42" fill="none" strokeLinecap="round" />
      </svg>

      <div className="badge">
        <svg className="ring" viewBox="0 0 118 118">
          <defs>
            <path id="badgeCirc" d="M59,59 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text>
            <textPath href="#badgeCirc" startOffset="0">
              {profile.badgeText}
            </textPath>
          </text>
        </svg>
        <div className="core">
          <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="2" width="12" height="20" rx="3" />
            <path d="M11 18h2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <Portrait />

      <div className="pitch">
        <h1 className="rise d3">
          {profile.headline.map((part, i) =>
            part.hl ? (
              <span key={i} className={`hl${part.hl === "ghost" ? " hl--ghost" : ""}`}>
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </h1>

        <Ribbon />

        <div className="stats rise d5">
          {profile.facts.map((f) => (
            <div key={f.label}>
              <b>{f.value}</b>
              <span className="stat-label">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="tools rise d5">
          <p className="mono">Built with</p>
          <div className="toolrow">
            {profile.tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
