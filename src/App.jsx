import Header from "./components/Header";
import Hero from "./components/Hero";
import Contributions from "./components/Contributions";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <Hero />
        <Contributions />
        <Skills />
        <Certifications />
        <Projects />
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
