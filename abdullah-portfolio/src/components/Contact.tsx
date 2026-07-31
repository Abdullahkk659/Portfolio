"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";

type State = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [state, setState] = useState<State>("idle");
  const [note, setNote] = useState("Replies usually land within a day.");

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setNote("Sending…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setState("error");
        setNote(json.error ?? "That didn't send. Email me directly instead.");
        return;
      }
      setState("sent");
      setNote("Message sent. I'll get back to you.");
      form.reset();
    } catch {
      setState("error");
      setNote(`Network error. Reach me at ${profile.email}.`);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="cgrid">
        <div>
          <p className="mono">Available now</p>
          <h2>Have something that needs building?</h2>
          <p className="contact-copy">
            Freelance mobile and web work, or an internship where I can ship. Tell me what
            you&rsquo;re making and I&rsquo;ll reply within a day.
          </p>
          <div className="pills">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <span>{profile.location}</span>
          </div>
        </div>

        <form className="form" onSubmit={send}>
          <label>
            <span>Name</span>
            <input name="name" required maxLength={80} placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" required placeholder="you@company.com" />
          </label>
          <label>
            <span>What are you building?</span>
            <textarea
              name="message"
              rows={4}
              required
              maxLength={2000}
              placeholder="A React Native app for…"
            />
          </label>
          {/* honeypot — bots fill this, people never see it */}
          <input
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            style={{ position: "absolute", left: "-9999px" }}
          />
          <button type="submit" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : state === "sent" ? "Sent" : "Send message"}
          </button>
          <p className="note" role="status">
            {note}
          </p>
        </form>
      </div>
    </section>
  );
}
