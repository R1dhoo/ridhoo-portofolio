import { NavLink } from "react-router-dom";

const links = [
  { to: "/",           label: "Home" },
  { to: "/about",      label: "Tentang" },
  { to: "/experience", label: "Pengalaman" },
  { to: "/skills",     label: "Keahlian" },
  { to: "/projects",   label: "Proyek" },
  { to: "/contact",    label: "Kontak" },
];

function Footer() {
  return (
    <footer className="footer">
      <span className="footer-copy">© 2024 Ridho Dwi Nur F. — All rights reserved</span>
      <div className="footer-links">
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} className="footer-link">{label}</NavLink>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
