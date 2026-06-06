import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";

function About() {
  return (
    <div>
      <Navbar />
      <section className="section">
        <FadeIn>
          <div className="about-wrap">
            <div className="section-header">
              <h2 className="section-title">Tentang Saya</h2>
              <p className="section-sub">Mengenal lebih dekat</p>
            </div>

            <p className="about-p">
              Halo! Saya <strong style={{ color: "#e2e2da", fontWeight: 500 }}>Ridho Dwi Nur Fahrizal</strong>,
              seorang siswa yang memiliki minat di bidang Pemrograman Web, Desain Grafis,
              dan Teknologi Informasi. Saya senang mempelajari teknologi baru serta
              mengembangkan keterampilan dalam membuat website yang menarik dan fungsional.
              Saya memiliki semangat belajar yang tinggi dan selalu berusaha meningkatkan
              kemampuan melalui berbagai proyek dan pengalaman yang saya kerjakan.
            </p>

          </div>
        </FadeIn>
      </section>
      <Footer />
    </div>
  );
}

export default About;
