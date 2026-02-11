import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-[85vh] flex items-center py-20">
      <div className="w-full">
        <div className="max-w-4xl space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-700 font-medium">Available for opportunities</span>
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight">
              안녕하세요,<br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                박재연
              </span>
              입니다
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 font-medium leading-relaxed">
              사용자 중심의 인터페이스를 만드는<br />
              <span className="text-blue-600">프론트엔드 개발자</span>입니다
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            React와 TypeScript를 활용하여 직관적이고 아름다운 웹 경험을 만듭니다.
            사용자 경험을 최우선으로 생각하며, 디테일한 UI 구현과 성능 최적화에 관심이 많습니다.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2"
            >
              프로젝트 보기
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="mailto:jaeyoun310@gmail.com"
              className="px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              연락하기
            </a>
          </div>

          {/* Stats/Skills cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {[
              { label: 'React', desc: 'UI 라이브러리', icon: '⚛️' },
              { label: 'TypeScript', desc: '타입 안정성', icon: '📘' },
              { label: 'Responsive', desc: '반응형 디자인', icon: '📱' },
              { label: 'Performance', desc: '최적화', icon: '⚡' },
            ].map((item) => (
              <div
                key={item.label}
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-default"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative element - profile card */}
        <div className="absolute top-20 right-8 hidden xl:block">
          <div className="w-80 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 space-y-6">
            {/* Profile header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">박재연</h3>
                <p className="text-gray-600 text-sm mt-1">Frontend Developer</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                PJ
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">Seoul, South Korea</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">SSAFY</span>
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <p className="text-xs text-gray-500 mb-3 font-medium">TECH STACK</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind', 'Next.js', 'Git'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/pashkite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              <a
                href="mailto:jaeyoun310@gmail.com"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
