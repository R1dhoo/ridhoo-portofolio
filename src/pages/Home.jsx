import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import fotoDiri from "../assets/foto_diri.jpeg";

function Home() {
  return (
    <div>
      <Navbar />

      <section className="hero">
        <div className="hero-blob" />

        <div className="hero-content">
          <div className="hero-left">
            <p className="hero-eyebrow">Halo, saya</p>
            <h1 className="hero-title">
              Ridho Dwi<br />
              <em>Nur Fahrizal</em>
            </h1>
            <p className="hero-desc">
              Siswa yang passionate di bidang Pemrograman Web, Desain Grafis,
              dan Teknologi Informasi. Senang membuat website yang menarik dan fungsional.
            </p>
            <div className="hero-btns">
              <NavLink to="/projects" className="btn-primary">Lihat Proyek</NavLink>
              <NavLink to="/contact" className="btn-ghost">Hubungi Saya</NavLink>
            </div>
            <div className="socials">
              <a href="mailto:ridhodwinurfahrizal@gmail.com" className="social-ico" title="Email">✉</a>
              <a href="https://github.com/R1dhoo" target="_blank" rel="noreferrer" className="social-ico">gh</a>
              <a href="https://instagram.com/ridhodwinf_" target="_blank" rel="noreferrer" className="social-ico">ig</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-photo-wrap">
              <img src={fotoDiri} alt="Ridho Dwi Nur Fahrizal" className="hero-photo" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
