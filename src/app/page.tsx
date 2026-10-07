import { Rail, Topline } from "@/components/Chrome";
import Hero from "@/components/Hero";
import Stage from "@/components/Stage";
import Contact from "@/components/Contact";
import { certificates, profile, stack } from "@/lib/profile";

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
            <span className="mono">API &rarr; data &rarr; deploy</span>
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

        <section className="certs" id="certificates">
          <div className="shead">
            <h2>Recognition</h2>
            <span className="mono">GIFT University</span>
          </div>
          <div className="certgrid">
            {certificates.map((c) => (
              <a
                key={c.title}
                className="cert"
                href={c.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.thumb} alt={`${c.title} certificate`} loading="lazy" />
                </figure>
                <div className="cert__body">
                  <div className="cert__top">
                    <h3>{c.title}</h3>
                    <span className="cert__date">{c.date}</span>
                  </div>
                  <p className="cert__detail">{c.detail}</p>
                  <p className="cert__issuer">{c.issuer}</p>
                  <span className="cert__view">View certificate &#8599;</span>
                </div>
              </a>
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
