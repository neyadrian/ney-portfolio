import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Cursor />
        <Header />
        <Hero />
        <Skills />
        <Projects />
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
