"use client";

import { useEffect, useRef, useState } from "react";
import Device from "./Device";
import { projects } from "@/lib/profile";

export default function Stage() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);

  // On desktop, whichever project sits in the middle of the viewport drives the phone.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (!window.matchMedia("(min-width:1081px)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="stage" id="work">
      <div className="stage__left">
        <div className="shead">
          <h2>Selected work</h2>
          <span className="mono">Scroll &mdash; the phone follows</span>
        </div>

        {projects.map((p, i) => (
          <article
            key={p.slug}
            className="item"
            data-i={i}
            data-active={i === active}
            ref={(el) => {
              items.current[i] = el;
            }}
            onClick={() => setActive(i)}
          >
            <p className="mono">{p.eyebrow}</p>
            <h3>
              {p.title}
              {p.href && (
                <a
                  className="link"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {p.hrefLabel} &#8599;
                </a>
              )}
            </h3>
            <p>{p.summary}</p>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <aside className="stage__right">
        <div className="sticky">
          <Device active={active} onSelect={setActive} />
        </div>
      </aside>
    </div>
  );
}
