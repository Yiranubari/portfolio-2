import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <>
      <div className="mast">
        <div className="wrap row">
          <Link to="/" className="logo">
            Yiranubari
          </Link>
          <nav className="nav">
            <a href="#projects" onClick={goToSection("projects")}>
              Projects
            </a>
            <a href="#skills" onClick={goToSection("skills")}>
              Skills
            </a>
            <a href="#featured" onClick={goToSection("featured")}>
              Featured
            </a>
            <a href="#contact" onClick={goToSection("contact")}>
              Contact
            </a>
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
