"use client";

import { useEffect, useState } from "react";
import { benchmarkScores, profile, projects, type Project } from "@/lib/profile";

function Clock() {
  const [time, setTime] = useState("—:—");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: profile.timezone,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time}</span>;
}

function RosheenScreen() {
  const steps = [
    ["Order received", "done"],
    ["Payment confirmed", "done"],
    ["Baking", "done"],
    ["With the courier", "now"],
    ["Delivered", "next"],
  ] as const;
  return (
    <>
      <div className="vhead">
        <span className="name">RB-1042</span>
        <span className="chip">Live</span>
      </div>

      {steps.map(([label, state]) => (
        <div
          key={label}
          className={`opt${state === "now" ? " sel" : ""}`}
          style={{ padding: "9px 12px", marginBottom: 7, ...(state === "next" ? { opacity: 0.5 } : {}) }}
        >
          {label}
          <span style={{ color: state === "next" ? "rgba(255,255,255,.4)" : "var(--neon)" }}>
            {state === "done" ? "✓" : state === "now" ? "●" : "···"}
          </span>
        </div>
      ))}

      <div className="card" style={{ marginTop: "auto" }}>
        <div className="mono" style={{ fontSize: 9.5, color: "var(--neon)" }}>
          Rider on the way
        </div>
        <div className="tiny" style={{ marginTop: 5, color: "#fff" }}>
          Bilal &middot; 1.2 km away &middot; updated 8s ago
        </div>
      </div>
      <span className="chip">2 &times; Lotus Cake &middot; Rs 1,370</span>
    </>
  );
}

function BizPlanScreen() {
  const sections = [
    ["Executive summary", true],
    ["Market analysis", true],
    ["Competitive landscape", true],
    ["Financial projections", false],
  ] as const;
  return (
    <>
      <div className="vhead">
        <span className="name">Plan</span>
        <span className="chip">Step 4 / 5</span>
      </div>
      <div className="prog">
        <i style={{ width: "72%" }} />
      </div>

      {sections.map(([label, done]) => (
        <div className="opt" key={label} style={done ? undefined : { opacity: 0.55 }}>
          {label}
          <span style={{ color: done ? "var(--neon)" : "rgba(255,255,255,.4)" }}>
            {done ? "\u2713" : "\u00b7\u00b7\u00b7"}
          </span>
        </div>
      ))}

      <div className="card" style={{ marginTop: "auto" }}>
        <div className="tiny">
          Demo mode — served from pre-generated plans, so the live site makes no API calls.
        </div>
      </div>
      <span className="chip">Nine sections · PDF export</span>
    </>
  );
}

function InsightScreen() {
  return (
    <>
      <div className="vhead">
        <span className="name">InsightHire</span>
        <span className="chip">7 / 20</span>
      </div>
      <div className="prog">
        <i />
      </div>
      <p className="q">You&rsquo;d rather spend Saturday&hellip;</p>
      <div className="opt sel">
        Sketching an idea alone <span>✓</span>
      </div>
      <div className="opt">Somewhere loud with friends</div>
      <div className="opt">Finishing what&rsquo;s already open</div>
      <div
        className="card"
        style={{
          marginTop: "auto",
          borderColor: "rgba(31,182,255,.34)",
          background: "rgba(31,182,255,.09)",
        }}
      >
        <div className="mono" style={{ color: "var(--neon)", fontSize: 9.5 }}>
          Current best fit
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontWeight: 700,
            fontSize: 17,
            marginTop: 3,
          }}
        >
          Product &amp; Design
        </div>
      </div>
    </>
  );
}

function BenchmarkScreen() {
  return (
    <>
      <div className="vhead">
        <span className="name">Benchmark</span>
        <span className="chip">Test accuracy</span>
      </div>
      <div style={{ marginTop: 8 }}>
        {benchmarkScores.map((b) => (
          <div className={`bar${b.best ? " best" : ""}`} key={b.model}>
            <div className="lbl">
              <span style={b.best ? { color: "var(--neon)" } : undefined}>{b.model}</span>
              <span style={b.best ? { color: "var(--neon)" } : undefined}>{b.score}%</span>
            </div>
            <div className="track">
              <div className="fill" style={{ width: `${b.score}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: "auto" }}>
        <div className="tiny">
          Same 242/61 stratified split, same preprocessing, all three written from scratch.
        </div>
      </div>
    </>
  );
}

function MalwareScreen() {
  const classes = ["Benign", "Adware", "Scareware", "SMS malware"];
  return (
    <>
      <div className="vhead">
        <span className="name">Traffic</span>
        <span className="chip">XGBoost</span>
      </div>

      <div className="card">
        <div className="mono" style={{ fontSize: 9.5, color: "var(--neon)" }}>
          Classifies each flow as
        </div>
        <div className="tags" style={{ marginTop: 9 }}>
          {classes.map((c) => (
            <span className="tag" key={c}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="mono" style={{ fontSize: 9.5, color: "rgba(255,255,255,.45)" }}>
          Was
        </div>
        <div className="tiny" style={{ marginTop: 5, textDecoration: "line-through", opacity: 0.6 }}>
          Keras dense net · 256 → 128 → 64 · 100 epochs
        </div>
        <div className="mono" style={{ fontSize: 9.5, color: "var(--neon)", marginTop: 11 }}>
          Now
        </div>
        <div className="tiny" style={{ marginTop: 5, color: "#fff" }}>
          Gradient-boosted trees · CPU · feature importances
        </div>
      </div>

      <div style={{ marginTop: "auto" }}>
        <span className="chip">CICAndMal2017 · ~80 flow features</span>
      </div>
    </>
  );
}

/**
 * Fallback screen. Any project without a hand-built screen below gets this one,
 * generated from its own title, bullets and tags — so adding a project to
 * profile.ts is enough. Nothing else needs editing.
 */
function GenericScreen({ project }: { project: Project }) {
  return (
    <>
      <div className="vhead">
        <span className="name">{project.title.split(" ")[0]}</span>
        <span className="chip">{project.tags[0]}</span>
      </div>
      <div className="card">
        <div className="mono" style={{ fontSize: 9.5, color: "var(--neon)" }}>
          {project.eyebrow.split("·")[0].trim()}
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "-.02em",
            marginTop: 6,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </div>
      </div>
      {project.bullets.slice(0, 3).map((b) => (
        <div className="opt" key={b} style={{ fontSize: 12, lineHeight: 1.4 }}>
          {b.length > 74 ? `${b.slice(0, 74)}…` : b}
        </div>
      ))}
      <div className="tags" style={{ marginTop: "auto" }}>
        {project.tags.slice(0, 4).map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

/** Hand-built screens, keyed by project slug. Optional — see GenericScreen above. */
const customScreens: Record<string, () => React.JSX.Element> = {
  rosheen: RosheenScreen,
  bizplan: BizPlanScreen,
  insighthire: InsightScreen,
  benchmark: BenchmarkScreen,
  malware: MalwareScreen,
};

export default function Device({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="device">
      <div className="screen">
        <div className="island" />
        <div className="sbar">
          <Clock />
          <span>
            PK &nbsp;
            <span className="bat" />
          </span>
        </div>
        <div className="app">
          {projects.map((p, i) => {
            const Screen = customScreens[p.slug];
            return (
              <div
                key={p.slug}
                className={`view${i === active ? " on" : ""}`}
                aria-hidden={i !== active}
              >
                {Screen ? <Screen /> : <GenericScreen project={p} />}
              </div>
            );
          })}
        </div>
        <div className="tabs" role="tablist" aria-label="Project screens">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              role="tab"
              aria-selected={i === active}
              aria-label={p.title}
              onClick={() => onSelect(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
