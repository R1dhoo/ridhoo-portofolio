import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
import { useData } from "../context/DataContext";

const EMPTY_FORM = { title: "", period: "", bullets: "" };

function ExpForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, bullets: Array.isArray(initial.bullets) ? initial.bullets.join("\n") : initial.bullets }
      : EMPTY_FORM
  );
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function handleSave() {
    if (!form.title.trim()) return;
    onSave({ ...form, bullets: form.bullets.split("\n").map(b => b.trim()).filter(Boolean) });
  }
  return (
    <div className="proj-form">
      <div className="pf-row">
        <input className="pf-inp" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Judul pengalaman *" />
        <input className="pf-inp" value={form.period} onChange={e => set("period", e.target.value)} placeholder="Periode / Kategori" />
      </div>
      <div className="pf-field">
        <textarea
          className="pf-inp pf-textarea"
          value={form.bullets}
          onChange={e => set("bullets", e.target.value)}
          placeholder={"Satu baris = satu poin\nContoh: Membuat website dengan React.\nBelajar desain UI/UX."}
          rows={5}
        />
      </div>
      <div className="pf-btns">
        <button className="pf-btn pf-btn--ghost" onClick={onCancel}>Batal</button>
        <button className="pf-btn pf-btn--save" onClick={handleSave}>Simpan</button>
      </div>
    </div>
  );
}

function Experience() {
  const { experiences, addExperience, updateExperience, deleteExperience } = useData();
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  return (
    <div>
      <Navbar />
      <section className="section">
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
            <div className="section-header" style={{ margin: 0, textAlign: "left" }}>
              <h2 className="section-title">Pengalaman</h2>
              <p className="section-sub">Perjalanan belajar dan berkembang</p>
            </div>
            <button className="pf-btn pf-btn--save" onClick={() => { setAdding(true); setEditingId(null); }}>
              + Tambah
            </button>
          </div>
        </FadeIn>

        {/* Form tambah baru */}
        {adding && (
          <FadeIn>
            <div className="proj-add-wrap" style={{ marginBottom: 24 }}>
              <p className="pf-section-label">Pengalaman Baru</p>
              <ExpForm
                onSave={(data) => { addExperience(data); setAdding(false); }}
                onCancel={() => setAdding(false)}
              />
            </div>
          </FadeIn>
        )}

        <div className="exp-list">
          {experiences.map((exp, i) => {
            const isEditing = editingId === exp.id;
            return (
              <FadeIn key={exp.id} delay={i * 80}>
                <div className="exp-card" style={{ position: "relative" }}>
                  {isEditing ? (
                    <ExpForm
                      initial={exp}
                      onSave={(data) => { updateExperience(exp.id, data); setEditingId(null); }}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <>
                      <div className="exp-header">
                        <div>
                          <div className="exp-title">{exp.title}</div>
                          <div className="exp-period">{exp.period}</div>
                        </div>
                      </div>
                      <ul className="exp-bullets">
                        {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    </>
                  )}

                  {!isEditing && (
                    <div className="proj-actions proj-actions--card">
                      <button className="proj-act-btn proj-act-btn--edit" onClick={() => { setEditingId(exp.id); setAdding(false); }} title="Edit">✎</button>
                      <button className="proj-act-btn proj-act-btn--del" onClick={() => setConfirmId(exp.id)} title="Hapus">✕</button>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}

          {experiences.length === 0 && !adding && (
            <p style={{ color: "#333", fontSize: 13, textAlign: "center", padding: "40px 0" }}>Belum ada pengalaman.</p>
          )}
        </div>
      </section>

      {/* Confirm delete */}
      {confirmId && (
        <div className="adm-overlay" onClick={() => setConfirmId(null)}>
          <div className="adm-modal adm-modal--sm" onClick={e => e.stopPropagation()}>
            <p className="adm-confirm-msg">Hapus pengalaman ini? Aksi ini tidak bisa dibatalkan.</p>
            <div className="adm-confirm-btns">
              <button className="pf-btn pf-btn--ghost" onClick={() => setConfirmId(null)}>Batal</button>
              <button className="pf-btn pf-btn--del" onClick={() => { deleteExperience(confirmId); setConfirmId(null); }}>Hapus</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Experience;
