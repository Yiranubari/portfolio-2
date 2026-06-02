import { Link } from "react-router-dom";
import { projects } from "../data/projects.js";

const skills = [
  { name: "API Design", ref: "insighta backend" },
  { name: "Authentication / OAuth", ref: "insighta backend" },
  { name: "Role-Based Access", ref: "insighta backend" },
  { name: "Caching", ref: "insighta backend" },
  { name: "Databases", ref: "insighta backend" },
  { name: "CLI Tooling", ref: "insighta cli" },
  { name: "Testing", ref: "event store" },
  { name: "Crash Recovery", ref: "event store" },
  { name: "Deployment", ref: "insighta web" },
];

export default function Home() {
  const featured = projects.find((p) => p.featured);

  return (
    <>
      <header className="hero" id="profile">
        <div className="wrap">
          <div className="stamp rv d1">
            <div>
              <span className="k">Doc</span>Portfolio
            </div>
            <div>
              <span className="k">Rev</span>2026.06
            </div>
            <div>
              <span className="k">Field</span>Full Stack
            </div>
            <div>
              <span className="k">Status</span>Open
            </div>
          </div>
          <h1 className="name rv d2">Yiranubari</h1>
          <p className="tag rv d3">
            Full stack developer building systems that hold.
          </p>
          <p className="blurb rv d3">
            I care about how software behaves when things go wrong: crashes,
            retries, recovery, and the small correctness details most people
            skip.
          </p>
          <div className="meta rv d4">
            <div className="c">
              <div className="k">Role</div>
              <div className="v">Full Stack Developer</div>
            </div>
            <div className="c">
              <div className="k">Location</div>
              <div className="v">Uyo, Nigeria</div>
            </div>
            <div className="c">
              <div className="k">Timezone</div>
              <div className="v">WAT · UTC+1</div>
            </div>
            <div className="c">
              <div className="k">Email</div>
              <div className="v">
                <a href="mailto:yiranubari4@gmail.com">yiranubari4@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="projects">
        <div className="wrap">
          <span className="chip">HNG Projects</span>
          <h2 className="big">The Work</h2>
          {projects.map((p) => (
            <div className="pcard" key={p.slug}>
              <div className="ptop">
                <span className="pno">{p.num}</span>
                <h3>{p.name}</h3>
              </div>
              <p className="pd">{p.oneLiner}</p>
              <div className="tags">
                {p.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <Link className="btn solid" to={`/projects/${p.slug}`}>
                View project →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="skills">
        <div className="wrap">
          <span className="chip">Backend Skills</span>
          <h2 className="big">
            What I<br />
            Reach For
          </h2>
          <div className="sgrid">
            {skills.map((s) => (
              <div className="r" key={s.name}>
                <span className="sk">{s.name}</span>
                <span className="rf">↳ {s.ref}</span>
              </div>
            ))}
          </div>
          <p
            className="mono"
            style={{
              fontSize: "12px",
              color: "var(--faint)",
              marginTop: "14px",
            }}
          >
            // each skill points to a project. nothing listed without proof.
          </p>
        </div>
      </section>

      <section id="featured">
        <div className="wrap">
          <span className="chip">Featured Deep Dive</span>
          <div className="fcall">
            <h3>{featured.name}</h3>
            <p>
              The problem it solves, the request flow, the endpoints, and the
              one design decision that mattered most.
            </p>
            <Link className="btn" to={`/projects/${featured.slug}`}>
              Read the deep dive →
            </Link>
          </div>
        </div>
      </section>

      <section id="reflection">
        <div className="wrap">
          <span className="chip">Learning Reflection</span>
          <div className="reflect">
            <p>
              A lot of HNG was me figuring things out as I went. Some of it was
              hard, and a few tasks took more tries than I'd like to admit. But
              I came out actually understanding things that used to feel like
              magic.
            </p>
            <p>
              What changed most is how I think about failure. What happens when
              a process dies mid-write, when a token is stolen, when a query
              repeats a thousand times a minute. I now design for those cases
              instead of discovering them in production.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" style={{ borderBottom: "none" }}>
        <div className="wrap contact">
          <span className="chip">Contact</span>
          <div className="big">Let's talk.</div>
          <a className="em" href="mailto:yiranubari4@gmail.com">
            yiranubari4@gmail.com
          </a>
          <div className="row">
            <a
              className="btn"
              href="https://github.com/Yiranubari"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a className="btn solid" href="mailto:yiranubari4@gmail.com">
              Email me
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
