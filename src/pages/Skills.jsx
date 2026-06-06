import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";

const skillGroups = [
  {
    category: "Front-End Development",
    items: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "React", "Responsive Design"],
  },
  {
    category: "Tools & Software",
    items: ["Visual Studio Code", "GitHub", "Figma", "Canva"],
  },
];

function Skills() {
  return (
    <div>
      <Navbar />
      <section className="section">
        <FadeIn>
          <div className="section-header">
            <h2 className="section-title">Keahlian</h2>
            <p className="section-sub">Skill yang terus dikembangkan</p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid-4">
            {skillGroups.map(({ category, items }) => (
              <div key={category} className="skill-card">
                <div className="skill-cat">{category}</div>
                <div className="pills">
                  {items.map((item) => (
                    <span key={item} className="pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
      <Footer />
    </div>
  );
}

export default Skills;
