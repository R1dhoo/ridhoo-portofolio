import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
import { useData } from "../context/DataContext";

import portfoliooImg from "../assets/portfolioo.png";
import gameRecImg from "../assets/Web-Rekomendasi.png";
import gameImg from "../assets/game.png";

const LOCAL_IMAGES = {
  portfolioo: portfoliooImg,
  webRekomendasi: gameRecImg,
  game: gameImg,
};

const EMPTY_FORM = { title: "", desc: "", tech: "", year: "", imageUrl: "" };

function getImage(p) {
  if (p.imageUrl) return p.imageUrl;
  if (p.imageKey && LOCAL_IMAGES[p.imageKey]) return LOCAL_IMAGES[p.imageKey];
  return null;
}

function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, tech: Array.isArray(initial.tech) ? initial.tech.join(", ") : initial.tech, imageUrl: initial.imageUrl || "" }
      : EMPTY_FORM
  );
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function handleSave() {
    if (!form.title.trim()) return;
    onSave({ ...form, tech: form.tech.split(",").map(t => t.trim()).filter(Boolean) });
  }
  return (
    <div className="proj-form">
      <div className="pf-field">
        <input className="pf-inp" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Judul proyek *" />
      </div>
      <div className="pf-field">
        <textarea className="pf-inp pf-textarea" value={form.desc} onChange={e => set("desc", e.target.value)} placeholder="Deskripsi..." rows={3} />
      </div>
      <div className="pf-row">
        <input className="pf-inp" value={form.tech} onChange={e => set("tech", e.target.value)} placeholder="Tech: React, CSS, PHP" />
        <input className="pf-inp" value={form.year} onChange={e => set("year", e.target.value)} placeholder="Tahun" style={{maxWidth:100}} />
      </div>
      <div className="pf-field">
        <input className="pf-inp" value={form.imageUrl} onChange={e => set("imageUrl", e.target.value)} placeholder="URL Gambar (opsional)" />
      </div>
      <div className="pf-btns">
        <button className="pf-btn pf-btn--ghost" onClick={onCancel}>Batal</button>
        <button className="pf-btn pf-btn--save" onClick={handleSave}>Simpan</button>
      </div>
    </div>
  );
}

function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  function handleSaveEdit(id, data) {
    updateProject(id, data);
    setEditingId(null);
  }

  function handleAdd(data) {
    addProject(data);
    setAdding(false);
  }

  return (
    <div>
      <Navbar />
      <section className="section">
        <FadeIn>
          <div className="proj-header">
            <div>
              <h2 className="section-title">Proyek</h2>
              <p className="section-sub" style={{ marginTop: 6 }}>Karya yang pernah dikerjakan</p>
            </div>
            <button className="pf-btn pf-btn--save" onClick={() => { setAdding(true); setEditingId(null); }}>
              + Tambah
            </button>
          </div>
        </FadeIn>

        {/* Form tambah baru */}
        {adding && (
          <FadeIn>
            <div className="proj-add-wrap">
              <p className="pf-section-label">Proyek Baru</p>
              <ProjectForm onSave={handleAdd} onCancel={() => setAdding(false)} />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={100}>
          <div className="proj-list">
            {projects.map((p) => {
              const img = getImage(p);
              const isEditing = editingId === p.id;
              return (
                <div key={p.id} className={`proj-row ${isEditing ? "proj-row--editing" : ""}`}>
                  <span className="pnum">{p.num}</span>
                  <div className="proj-info">
                    {isEditing ? (
                      <ProjectForm
                        initial={p}
                        onSave={(data) => handleSaveEdit(p.id, data)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <>
                        {img && <img src={img} alt={p.title} className="proj-image" />}
                        <div className="proj-title">{p.title}</div>
                        <div className="proj-desc">{p.desc}</div>
                        <div className="tech-badges">
                          {p.tech.map(t => <span key={t} className="tbadge">{t}</span>)}
                        </div>
                        <div className="proj-year">{p.year}</div>
                      </>
                    )}
                  </div>

                  {/* Action buttons */}
                  {!isEditing && (
                    <div className="proj-actions">
                      <button className="proj-act-btn proj-act-btn--edit" onClick={() => { setEditingId(p.id); setAdding(false); }} title="Edit">✎</button>
                      <button className="proj-act-btn proj-act-btn--del" onClick={() => setConfirmId(p.id)} title="Hapus">✕</button>
                    </div>
                  )}
                </div>
              );
            })}

            {projects.length === 0 && !adding && (
              <p style={{ color: "#333", fontSize: 13, padding: "40px 0" }}>Belum ada proyek.</p>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Confirm delete */}
      {confirmId && (
        <div className="adm-overlay" onClick={() => setConfirmId(null)}>
          <div className="adm-modal adm-modal--sm" onClick={e => e.stopPropagation()}>
            <p className="adm-confirm-msg">Hapus proyek ini? Aksi ini tidak bisa dibatalkan.</p>
            <div className="adm-confirm-btns">
              <button className="pf-btn pf-btn--ghost" onClick={() => setConfirmId(null)}>Batal</button>
              <button className="pf-btn pf-btn--del" onClick={() => { deleteProject(confirmId); setConfirmId(null); }}>Hapus</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Projects;
