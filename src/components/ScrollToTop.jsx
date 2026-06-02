import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const positions = new Map();

export default function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    const key = location.key;

    const saveCurrent = () => {
      positions.set(key, window.scrollY);
    };
    window.addEventListener("scroll", saveCurrent, { passive: true });

    if (navType === "POP") {
      const y = positions.get(key) ?? 0;
      requestAnimationFrame(() => window.scrollTo(0, y));
    } else {
      window.scrollTo(0, 0);
    }

    return () => window.removeEventListener("scroll", saveCurrent);
  }, [location.key, navType]);

  return null;
}
