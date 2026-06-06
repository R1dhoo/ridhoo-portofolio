import { createContext, useContext, useState } from "react";

// ── Default data (pakai string path, gambar di-handle di Projects.jsx) ─────
const DEFAULT_PROJECTS = [
  {
    id: "p1",
    num: "01",
    title: "Website Portofolio Pribadi",
    desc: "Website portofolio pribadi yang dibuat menggunakan React sebagai sarana untuk menampilkan profil, keterampilan di bidang pengembangan web, pengalaman belajar, serta berbagai proyek yang telah dikerjakan. Dirancang dengan tampilan modern, responsif, dan mudah diakses pada berbagai perangkat.",
    tech: ["JavaScript", "React", "CSS", "React Router"],
    year: "2026",
    imageKey: "portfolioo",   // key untuk gambar lokal dari assets
    imageUrl: "",             // URL eksternal (dari admin)
  },
  {
    id: "p2",
    num: "02",
    title: "Website Rekomendasi Game",
    desc: "Aplikasi web rekomendasi game yang dibangun menggunakan React untuk menampilkan daftar game berdasarkan genre, rating, dan platform. Dilengkapi fitur pencarian, filter kategori, serta antarmuka responsif.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    year: "2026",
    imageKey: "webRekomendasi",
    imageUrl: "",
  },
  {
    id: "p3",
    num: "03",
    title: "Game 2D TurboWarp",
    desc: "Proyek game 2D yang dirancang dan dikembangkan menggunakan TurboWarp. Mengimplementasikan sistem kontrol karakter, mekanisme permainan, skor, serta berbagai elemen interaktif.",
    tech: ["TurboWarp", "Visual Programming", "Game Development"],
    year: "2025",
    imageKey: "game",
    imageUrl: "",
  },
];

const DEFAULT_EXPERIENCES = [
  {
    id: "e1",
    title: "Praktik Pengembangan Website",
    period: "Pengalaman Belajar",
    bullets: [
      "Membuat dan mengembangkan website menggunakan HTML, CSS, JavaScript, dan React.",
      "Mendesain antarmuka yang responsif dan mudah digunakan.",
      "Mengoptimalkan tampilan website agar nyaman diakses melalui berbagai perangkat.",
    ],
  },
  {
    id: "e2",
    title: "Pembelajaran Desain Grafis",
    period: "Pengalaman Belajar",
    bullets: [
      "Membuat desain poster, banner, dan konten visual menggunakan aplikasi desain.",
      "Memahami prinsip dasar desain seperti warna, tipografi, dan tata letak.",
    ],
  },
  {
    id: "e3",
    title: "Pengembangan Game Menggunakan TurboWarp",
    period: "Pengalaman Belajar",
    bullets: [
      "Membuat game 2D menggunakan TurboWarp berbasis visual programming.",
      "Merancang mekanisme permainan, sistem skor, dan interaksi antar objek.",
      "Mengimplementasikan logika permainan menggunakan blok pemrograman Scratch/TurboWarp.",
      "Melakukan pengujian dan perbaikan bug untuk meningkatkan pengalaman bermain pengguna.",
    ],
  },
  {
    id: "e4",
    title: "Pernah Mencapai Rank Immortal di Mobile Legends",
    period: "Pencapaian Pribadi",
    bullets: [
      "Berhasil mencapai Rank Immortal setelah menghadapi berbagai tantangan, mulai dari lawan yang kuat hingga rekan tim yang terkadang memiliki ide unik saat bermain.",
    ],
  },
];

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(() =>
    load("rdp_projects", DEFAULT_PROJECTS)
  );
  const [experiences, setExperiences] = useState(() =>
    load("rdp_experiences", DEFAULT_EXPERIENCES)
  );

  function addProject(data) {
    const newList = [
      ...projects,
      { ...data, id: uid(), num: String(projects.length + 1).padStart(2, "0"), imageKey: "", imageUrl: data.imageUrl || "" },
    ];
    setProjects(newList);
    save("rdp_projects", newList);
  }

  function updateProject(id, data) {
    const newList = projects.map((p) => (p.id === id ? { ...p, ...data } : p));
    setProjects(newList);
    save("rdp_projects", newList);
  }

  function deleteProject(id) {
    const newList = projects
      .filter((p) => p.id !== id)
      .map((p, i) => ({ ...p, num: String(i + 1).padStart(2, "0") }));
    setProjects(newList);
    save("rdp_projects", newList);
  }

  function addExperience(data) {
    const newList = [...experiences, { ...data, id: uid() }];
    setExperiences(newList);
    save("rdp_experiences", newList);
  }

  function updateExperience(id, data) {
    const newList = experiences.map((e) => (e.id === id ? { ...e, ...data } : e));
    setExperiences(newList);
    save("rdp_experiences", newList);
  }

  function deleteExperience(id) {
    const newList = experiences.filter((e) => e.id !== id);
    setExperiences(newList);
    save("rdp_experiences", newList);
  }

  return (
    <DataContext.Provider value={{
      projects, addProject, updateProject, deleteProject,
      experiences, addExperience, updateExperience, deleteExperience,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
