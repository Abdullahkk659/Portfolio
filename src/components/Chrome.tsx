"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

const SECTIONS = ["top", "work", "stack", "contact"];

export function Rail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const icons: Record<string, React.ReactNode> = {
    top: <path d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" />,
    work: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </>
    ),
    stack: (
      <>
        <path d="M12 3l9 5-9 5-9-5z" />
        <path d="M3 13l9 5 9-5" />
      </>
    ),
    contact: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  };

  return (
    <nav className="rail" aria-label="Sections">
      {SECTIONS.map((id) => (
        <a key={id} href={`#${id}`} className={active === id ? "on" : undefined}>
          <span>{id === "top" ? "Home" : id}</span>
          <svg viewBox="0 0 24 24">{icons[id]}</svg>
        </a>
      ))}
    </nav>
  );
}

export function Topline() {
  const [stamp, setStamp] = useState<{ date: string; time: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setStamp({
        date: now.toLocaleDateString("en-GB", {
          timeZone: profile.timezone,
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        time: now.toLocaleTimeString("en-GB", {
          timeZone: profile.timezone,
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    };
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="topline">
      <div className="who rise d1">
        <span className="ava">{profile.name.charAt(0)}</span>
        <div>
          <b>{profile.name}</b>
          <span className="who-role">{profile.role}</span>
        </div>
      </div>
      <div className="stamp rise d1" suppressHydrationWarning>
        {stamp ? (
          <>
            {stamp.date}
            <br />
            {stamp.time}
          </>
        ) : (
          "—"
        )}
      </div>
    </header>
  );
}
