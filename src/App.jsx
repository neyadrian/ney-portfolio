import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Contributions from "./components/Contributions";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <Hero />
      <About />
      <Contributions />
      <Skills />
      <Projects />
      <Footer />
    </LanguageProvider>
  );
}
