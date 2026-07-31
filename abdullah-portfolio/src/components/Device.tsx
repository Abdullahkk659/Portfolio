"use client";

import { useEffect, useState } from "react";
import { benchmarkScores, profile, projects } from "@/lib/profile";

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

function NovaScreen() {
  return (
    <>
      <div className="vhead">
        <span className="name">nova</span>
        <span className="live">
          <i />3 new posts
        </span>
      </div>
      <div className="card">
        <div className="row">
          <span className="av" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{`${profile.name.toLowerCase()}.dev`}</div>
            <div className="tiny" style={{ fontSize: 10 }}>
              {profile.location.split(",")[0]}
            </div>
          </div>
        </div>
        <div className="media" />
        <div className="tiny">
          Shipped the live feed today — Firestore listeners, no refresh button anywhere.
        </div>
      </div>
      <div className="card" style={{ opacity: 0.5 }}>
        <div className="row">
          <span
            className="av"
            style={{ background: "linear-gradient(135deg,#7FE4FF,#0A6FD8)" }}
          />
          <div style={{ fontSize: 13, fontWeight: 600 }}>novagram</div>
        </div>
        <div
          className="media"
          style={{ height: 72 }}
        />
      </div>
      <div style={{ marginTop: "auto" }}>
        <span className="chip">Firestore · FCM · Cloudinary</span>
      </div>
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

const screens = [NovaScreen, InsightScreen, BenchmarkScreen, MalwareScreen];

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
          {screens.map((Screen, i) => (
            <div
              key={projects[i].slug}
              className={`view${i === active ? " on" : ""}`}
              aria-hidden={i !== active}
            >
              <Screen />
            </div>
          ))}
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
