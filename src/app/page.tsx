import { Rail, Topline } from "@/components/Chrome";
import Hero from "@/components/Hero";
import Stage from "@/components/Stage";
import Contact from "@/components/Contact";
import { profile, stack } from "@/lib/profile";

export default function Home() {
  return (
    <>
      <Rail />

      <div className="shell" id="top">
        <Topline />
        <Hero />
        <Stage />

        <section className="band" id="stack">
          <div className="shead" style={{ border: 0, padding: 0 }}>
            <h2>What I work with</h2>
            <span className="mono">Front &rarr; back &rarr; data</span>
          </div>
          <div className="grid4">
            {stack.map((col) => (
              <div className="col" key={col.group}>
                <h4>{col.group}</h4>
                <ul>
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Contact />

        <footer>
          <span className="mono">
            {profile.name} &mdash; {profile.role}
          </span>
          <span className="mono">Built with Next.js</span>
        </footer>
      </div>
    </>
  );
}
