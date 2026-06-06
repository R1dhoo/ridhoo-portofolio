import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Experience from "./pages/Experience.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/skills"     element={<Skills />} />
        <Route path="/projects"   element={<Projects />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="/admin"      element={<Admin />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
