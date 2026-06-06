import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const links = [
  { to: "/",           label: "Home" },
  { to: "/about",      label: "Tentang" },
  { to: "/experience", label: "Pengalaman" },
  { to: "/skills",     label: "Keahlian" },
  { to: "/projects",   label: "Proyek" },
  { to: "/contact",    label: "Kontak" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <NavLink to="/" className="nav-logo">rd</NavLink>

      <div className="nav-pills">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <NavLink to="/contact" className="btn-talk">Hubungi Saya</NavLink>
    </nav>
  );
}

export default Navbar;
