import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useData } from "../context/DataContext";

// ── Reusable mini components ───────────────────────────────────────────────

function Modal({ title, onClose, children }) {
  return (
    <div className="adm-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal-header">
          <span className="adm-modal-title">{title}</span>
          <button className="adm-close" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="adm-overlay" onClick={onCancel}>
      <div className="adm-modal adm-modal--sm" onClick={(e) => e.stopPropagation()}>
        <p className="adm-confirm-msg">{message}</p>
        <div className="adm-confirm-btns">
          <button className="adm-btn adm-btn--ghost" onClick={onCancel}>Batal</button>
          <button className="adm-btn adm-btn--danger" onClick={onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  );
}

// ── Project Form ───────────────────────────────────────────────────────────
const EMPTY_PROJECT = { title: "", desc: "", tech: "", year: "", image: "" };

function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, tech: Array.isArray(initial.tech) ? initial.tech.join(", ") : initial.tech }
      : EMPTY_PROJECT
  );

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function handleSave() {
    if (!form.title.trim()) return;
    onSave({
      ...form,
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
    });
  }

  return (
    <div className="adm-form">
      <div className="adm-field">
        <label className="adm-label">Judul *</label>
        <input className="adm-inp" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Nama proyek" />
      </div>
      <div className="adm-field">
        <label className="adm-label">Deskripsi</label>
        <textarea className="adm-inp adm-textarea" value={form.desc} onChange={(e) => set("desc", e.target.value)} placeholder="Deskripsi proyek..." rows={4} />
      </div>
      <div className="adm-row">
        <div className="adm-field">
          <label className="adm-label">Tech Stack</label>
          <input className="adm-inp" value={form.tech} onChange={(e) => set("tech", e.target.value)} placeholder="React, CSS, PHP (pisah koma)" />
        </div>
        <div className="adm-field">
          <label className="adm-label">Tahun</label>
          <input className="adm-inp" value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2026" />
        </div>
      </div>
      <div className="adm-field">
        <label className="adm-label">URL Gambar (opsional)</label>
        <input className="adm-inp" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." />
      </div>
      <div className="adm-form-btns">
        <button className="adm-btn adm-btn--ghost" onClick={onCancel}>Batal</button>
        <button className="adm-btn adm-btn--primary" onClick={handleSave}>Simpan</button>
      </div>
    </div>
  );
}

// ── Experience Form ────────────────────────────────────────────────────────
const EMPTY_EXP = { title: "", period: "", bullets: "" };

function ExperienceForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, bullets: Array.isArray(initial.bullets) ? initial.bullets.join("\n") : initial.bullets }
      : EMPTY_EXP
  );

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function handleSave() {
    if (!form.title.trim()) return;
    onSave({
      ...form,
      bullets: form.bullets.split("\n").map((b) => b.trim()).filter(Boolean),
    });
  }

  return (
    <div className="adm-form">
      <div className="adm-field">
        <label className="adm-label">Judul *</label>
        <input className="adm-inp" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Nama pengalaman" />
      </div>
      <div className="adm-field">
        <label className="adm-label">Periode / Kategori</label>
        <input className="adm-inp" value={form.period} onChange={(e) => set("period", e.target.value)} placeholder="Pengalaman Belajar / 2024–2025" />
      </div>
      <div className="adm-field">
        <label className="adm-label">Poin-poin (satu baris = satu poin)</label>
        <textarea
          className="adm-inp adm-textarea"
          value={form.bullets}
          onChange={(e) => set("bullets", e.target.value)}
          placeholder={"Membuat website menggunakan React.\nMendesain UI yang responsif."}
          rows={6}
        />
      </div>
      <div className="adm-form-btns">
        <button className="adm-btn adm-btn--ghost" onClick={onCancel}>Batal</button>
        <button className="adm-btn adm-btn--primary" onClick={handleSave}>Simpan</button>
      </div>
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────────────────
export default function Admin() {
  const {
    projects, addProject, updateProject, deleteProject,
    experiences, addExperience, updateExperience, deleteExperience,
  } = useData();

  const [tab, setTab] = useState("projects");
  const [modal, setModal] = useState(null); // { type: 'add'|'edit', entity: 'project'|'exp', data? }
  const [confirm, setConfirm] = useState(null); // { id, entity }

  function closeModal() { setModal(null); }

  function handleSaveProject(data) {
    if (modal.data) updateProject(modal.data.id, data);
    else addProject(data);
    closeModal();
  }

  function handleSaveExp(data) {
    if (modal.data) updateExperience(modal.data.id, data);
    else addExperience(data);
    closeModal();
  }

  function handleDeleteConfirmed() {
    if (confirm.entity === "project") deleteProject(confirm.id);
    else deleteExperience(confirm.id);
    setConfirm(null);
  }

  return (
    <div className="adm-page">
      {/* ── Top bar ── */}
      <div className="adm-topbar">
        <NavLink to="/" className="adm-back">← Kembali ke Portfolio</NavLink>
        <span className="adm-topbar-title">Admin Panel</span>
        <span className="adm-topbar-badge">rd</span>
      </div>

      <div className="adm-container">
        <div className="adm-hero">
          <h1 className="adm-title">Kelola Konten</h1>
          <p className="adm-sub">Tambah, ubah, atau hapus proyek dan pengalaman yang ditampilkan di portfolio.</p>
        </div>

        {/* ── Tabs ── */}
        <div className="adm-tabs">
          <button
            className={`adm-tab ${tab === "projects" ? "adm-tab--active" : ""}`}
            onClick={() => setTab("projects")}
          >
            Proyek <span className="adm-tab-count">{projects.length}</span>
          </button>
          <button
            className={`adm-tab ${tab === "experiences" ? "adm-tab--active" : ""}`}
            onClick={() => setTab("experiences")}
          >
            Pengalaman <span className="adm-tab-count">{experiences.length}</span>
          </button>
        </div>

        {/* ── Projects Tab ── */}
        {tab === "projects" && (
          <div className="adm-section">
            <div className="adm-section-header">
              <span className="adm-section-label">{projects.length} proyek</span>
              <button
                className="adm-btn adm-btn--primary"
                onClick={() => setModal({ type: "add", entity: "project" })}
              >
                + Tambah Proyek
              </button>
            </div>

            <div className="adm-list">
              {projects.length === 0 && (
                <div className="adm-empty">Belum ada proyek. Tambah sekarang!</div>
              )}
              {projects.map((p) => (
                <div className="adm-item" key={p.id}>
                  <div className="adm-item-num">{p.num}</div>
                  <div className="adm-item-body">
                    <div className="adm-item-title">{p.title}</div>
                    <div className="adm-item-meta">
                      {p.year && <span className="adm-chip">{p.year}</span>}
                      {Array.isArray(p.tech) && p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="adm-chip">{t}</span>
                      ))}
                      {Array.isArray(p.tech) && p.tech.length > 3 && (
                        <span className="adm-chip">+{p.tech.length - 3}</span>
                      )}
                    </div>
                    {p.desc && <div className="adm-item-desc">{p.desc.slice(0, 120)}{p.desc.length > 120 ? "…" : ""}</div>}
                  </div>
                  <div className="adm-item-actions">
                    <button
                      className="adm-icon-btn adm-icon-btn--edit"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", entity: "project", data: p })}
                    >✎</button>
                    <button
                      className="adm-icon-btn adm-icon-btn--del"
                      title="Hapus"
                      onClick={() => setConfirm({ id: p.id, entity: "project", name: p.title })}
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Experiences Tab ── */}
        {tab === "experiences" && (
          <div className="adm-section">
            <div className="adm-section-header">
              <span className="adm-section-label">{experiences.length} pengalaman</span>
              <button
                className="adm-btn adm-btn--primary"
                onClick={() => setModal({ type: "add", entity: "exp" })}
              >
                + Tambah Pengalaman
              </button>
            </div>

            <div className="adm-list">
              {experiences.length === 0 && (
                <div className="adm-empty">Belum ada pengalaman. Tambah sekarang!</div>
              )}
              {experiences.map((e) => (
                <div className="adm-item" key={e.id}>
                  <div className="adm-item-num">✦</div>
                  <div className="adm-item-body">
                    <div className="adm-item-title">{e.title}</div>
                    <div className="adm-item-meta">
                      {e.period && <span className="adm-chip">{e.period}</span>}
                      {Array.isArray(e.bullets) && (
                        <span className="adm-chip">{e.bullets.length} poin</span>
                      )}
                    </div>
                    {Array.isArray(e.bullets) && e.bullets[0] && (
                      <div className="adm-item-desc">{e.bullets[0].slice(0, 100)}{e.bullets[0].length > 100 ? "…" : ""}</div>
                    )}
                  </div>
                  <div className="adm-item-actions">
                    <button
                      className="adm-icon-btn adm-icon-btn--edit"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", entity: "exp", data: e })}
                    >✎</button>
                    <button
                      className="adm-icon-btn adm-icon-btn--del"
                      title="Hapus"
                      onClick={() => setConfirm({ id: e.id, entity: "exp", name: e.title })}
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {modal?.entity === "project" && (
        <Modal
          title={modal.type === "add" ? "Tambah Proyek" : "Edit Proyek"}
          onClose={closeModal}
        >
          <ProjectForm initial={modal.data} onSave={handleSaveProject} onCancel={closeModal} />
        </Modal>
      )}

      {modal?.entity === "exp" && (
        <Modal
          title={modal.type === "add" ? "Tambah Pengalaman" : "Edit Pengalaman"}
          onClose={closeModal}
        >
          <ExperienceForm initial={modal.data} onSave={handleSaveExp} onCancel={closeModal} />
        </Modal>
      )}

      {confirm && (
        <ConfirmModal
          message={`Hapus "${confirm.name}"? Aksi ini tidak bisa dibatalkan.`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
