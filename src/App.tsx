import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-navy min-h-screen text-slate selection:bg-green selection:text-navy">
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-navy via-[#0d233f] to-navy opacity-80" />
      <div className="fixed inset-y-0 left-10 w-64 blur-3xl bg-green/5 rounded-full" />
      <div className="fixed inset-y-0 right-10 w-64 blur-3xl bg-green/5 rounded-full" />

      <Header />
      <main className="relative z-10 flex flex-col items-center w-full px-4 md:px-12 xl:px-24">
        <div className="w-full max-w-[1200px] space-y-28 md:space-y-36">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
