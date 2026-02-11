import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center py-20">
      <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Main Content */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300 font-mono">Available for work</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none">
              Park
              <br />
              <span className="gradient-text">Jaeyeon</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
          </div>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
            사용자 중심의 웹 경험을 만드는 <span className="text-cyan-400 font-semibold">풀스택 개발자</span>입니다.
          </p>

          <p className="text-gray-400 leading-relaxed max-w-xl">
            문제 정의부터 해결까지, 명확한 커뮤니케이션과 섬세한 UI로 가치있는 서비스를 만듭니다.
            React와 Spring Boot를 활용한 현대적인 웹 애플리케이션 개발에 열정을 가지고 있습니다.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10">프로젝트 보기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="mailto:jaeyoun310@gmail.com"
              className="px-8 py-4 glass rounded-xl font-semibold text-white hover:bg-white/10 transition-all"
            >
              연락하기
            </a>
          </div>
        </div>

        {/* Right: Interactive Card */}
        <div className="order-1 lg:order-2">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            
            {/* Main card */}
            <div className="relative glass rounded-3xl p-8 space-y-6">
              {/* Profile section */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="text-sm text-gray-400 font-mono">Full-Stack Developer</div>
                  <div className="text-3xl font-bold text-white">박재연</div>
                  <div className="text-gray-300">PAshKite</div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                  PJ
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-cyan-400">3+</div>
                  <div className="text-xs text-gray-400">Years Coding</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-purple-400">10+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-pink-400">100%</div>
                  <div className="text-xs text-gray-400">Passion</div>
                </div>
              </div>

              {/* Tech stack tags */}
              <div className="space-y-3">
                <div className="text-sm text-gray-400 font-mono">Main Stack</div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Spring Boot', 'Tailwind', 'Git'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/pashkite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="mailto:jaeyoun310@gmail.com"
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400 font-mono">Scroll Down</span>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
