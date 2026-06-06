import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";

const contactLinks = [
  { icon: "📧", label: "Email", value: "ridhodwinurfahrizal@gmail.com", href: "mailto:ridhodwinurfahrizal@gmail.com" },
  { icon: "📱", label: "WhatsApp", value: "+62882003061082", href: "https://wa.me/62882003061082" },
  { icon: "💻", label: "GitHub", value: "github.com/R1dhoo", href: "https://github.com/R1dhoo" },
  { icon: "📸", label: "Instagram", value: "@ridhodwinf_", href: "https://instagram.com/ridhodwinf_" },
  { icon: "📍", label: "Lokasi", value: "Purbalingga, Jawa Tengah, Indonesia", href: "#" },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div>
      <Navbar />
      <section className="section">
        <div className="contact-inner">
          <FadeIn>
            <div className="section-header">
              <h2 className="section-title">Kontak</h2>
              <p className="contact-sub">
                Tertarik untuk bekerja sama atau berdiskusi?<br />
                Hubungi saya melalui salah satu cara berikut.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="contact-links">
              {contactLinks.map(({ icon, label, value, href }) => (
                <a key={label} href={href} className="contact-link-row" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <span className="contact-link-icon">{icon}</span>
                  <div>
                    <div className="contact-link-label">{label}</div>
                    <div className="contact-link-value">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={160}>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, color: "#3a3a3a", marginBottom: 16, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Atau kirim pesan langsung
              </p>
              {sent ? (
                <div className="sent-msg">✦ Pesan terkirim! Saya akan segera membalas.</div>
              ) : (
                <form className="form-group" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <input className="inp" name="name" placeholder="Nama kamu" value={form.name} onChange={handleChange} />
                    <input className="inp" name="email" type="email" placeholder="Email kamu" value={form.email} onChange={handleChange} />
                  </div>
                  <input className="inp" name="subject" placeholder="Subjek" value={form.subject} onChange={handleChange} />
                  <textarea
                    className="inp" name="message" rows={5}
                    placeholder="Ceritakan proyekmu atau apa yang ingin didiskusikan..."
                    value={form.message} onChange={handleChange}
                    style={{ resize: "vertical" }}
                  />
                  <div className="form-submit">
                    <button type="submit" className="btn-primary">Kirim Pesan →</button>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
