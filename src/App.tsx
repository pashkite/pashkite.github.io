import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-navy min-h-screen text-slate selection:bg-green selection:text-navy">
      {/* Enhanced gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0a1628] to-[#05111f] opacity-90" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <Header />
      <main className="relative z-10 flex flex-col items-center w-full px-4 md:px-12 xl:px-24">
        <div className="w-full max-w-[1200px] space-y-32 md:space-y-40">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-20 py-8 text-center text-sm text-light-slate border-t border-lightest-navy/20">
        <p>Built with React + TypeScript + Tailwind CSS</p>
        <p className="mt-2 text-slate">© 2026 Park Jaeyeon</p>
      </footer>
    </div>
  );
}

export default App;
