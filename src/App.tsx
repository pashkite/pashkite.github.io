import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="absolute inset-0">
          {/* Animated orbs */}
          <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Grain texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="4" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")'}} />

      <Header />
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-gray-300 text-sm mb-2">Designed & Built by Park Jaeyeon</p>
            <p className="text-gray-400 text-xs">React · TypeScript · Tailwind CSS · 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
