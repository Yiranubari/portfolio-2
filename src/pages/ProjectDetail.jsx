import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects.js";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="detail">
        <div className="wrap">
          <div className="backbar">
            <Link className="btn" to="/">
              ← Back to all projects
            </Link>
          </div>
          <p className="mono">Project not found.</p>
        </div>
      </div>
    );
  }

  const {
    num,
    name,
    oneLiner,
    stack,
    featured,
    built,
    problem,
    flow,
    endpoints,
    challenge,
    links,
  } = project;

  return (
    <div className="detail">
      <div className="wrap">
        <div className="backbar">
          <Link className="btn" to="/">
            ← Back to all projects
          </Link>
        </div>

        <div className="dhead">
          <span className="pno">
            {num}
            {featured ? " / Featured" : ""}
          </span>
          <h1>{name}</h1>
          <p className="dd">{oneLiner}</p>
          <div className="tags" style={{ marginTop: "18px" }}>
            {stack.map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {built && (
          <div className="panel">
            <span className="pl">What I built</span>
            <ul className="built-list">
              {built.map((item, i) => (
                <li key={i}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {problem && (
          <div className="panel">
            <span className="pl">The problem</span>
            <p>{problem}</p>
          </div>
        )}

        {flow && (
          <div className="panel dark">
            <span className="pl">Request flow</span>
            <div className="flow">
              {flow.map((node, i) => (
                <div key={i} style={{ display: "contents" }}>
                  <div className="n">
                    {node.t}
                    <span className="s">{node.s}</span>
                  </div>
                  {i < flow.length - 1 && <div className="a">→</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {endpoints && (
          <div className="panel">
            <span className="pl">Key endpoints</span>
            <div className="eps">
              {endpoints.map((ep, i) => (
                <div className="ep" key={i}>
                  <span className="verb">{ep.verb}</span>
                  <span>{ep.path}</span>
                  <span className="nt">{ep.note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {challenge && (
          <div className="panel">
            <span className="pl">One challenge I solved</span>
            <p>{challenge}</p>
          </div>
        )}

        {links && (
          <div className="dlinks">
            {links.map((l, i) => (
              <a
                key={i}
                className={"btn" + (i === 0 ? " solid" : "")}
                href={l.url}
                target="_blank"
                rel="noreferrer"
              >
                {l.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
