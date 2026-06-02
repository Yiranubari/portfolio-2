import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <>
      <div className="mast">
        <div className="wrap row">
          <Link to="/" className="logo">
            Yiranubari
          </Link>
          <nav className="nav">
            <Link to="/#projects">Projects</Link>
            <Link to="/#skills">Skills</Link>
            <Link to="/#featured">Featured</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
        </div>
      </div>

      {children}

      <footer>
        <div className="wrap">
          <span>© 2026 Yiranubari</span>
          <span>Full Stack Developer · Uyo, NG</span>
        </div>
      </footer>
    </>
  );
}
