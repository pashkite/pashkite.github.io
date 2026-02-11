import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-[90vh] w-full flex items-center pt-20 md:pt-28"
    >
      <div className="w-full space-y-8 animate-fade-in-up">
        {/* Intro */}
        <div className="space-y-4">
          <p className="text-green font-mono text-sm md:text-base tracking-wider">안녕하세요 👋</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lightest-slate to-light-slate leading-tight">
            박재연입니다
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-light-slate leading-tight max-w-3xl">
            사용자 중심의 <span className="text-green">웹 경험</span>을 만드는 풀스택 개발자입니다
          </h2>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-base md:text-lg text-slate leading-relaxed">
          문제를 정의하고 해결하는 과정을 좋아합니다. 명확한 커뮤니케이션과 디테일한 UI를 통해 
          가치있는 서비스를 만들며, 팀과 함께 성장하는 개발자가 되고자 합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-6">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-navy font-mono text-sm font-semibold rounded-lg shadow-lg hover:shadow-green/50 hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            프로젝트 보기
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="mailto:jaeyoun310@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-green text-green font-mono text-sm font-semibold rounded-lg hover:bg-green/10 transition-all duration-300 backdrop-blur"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            메일 보내기
          </a>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          {[
            { icon: '💻', label: '풀스택 개발', desc: 'React · Spring' },
            { icon: '🎨', label: 'UI/UX', desc: '사용자 경험' },
            { icon: '🤝', label: '협업', desc: '팀 커뮤니케이션' },
            { icon: '🚀', label: '성장', desc: '지속적 학습' }
          ].map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden border border-lightest-navy/40 rounded-2xl px-4 py-5 bg-gradient-to-br from-light-navy/60 to-light-navy/30 backdrop-blur hover:border-green/40 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-2">
                <div className="text-2xl">{item.icon}</div>
                <p className="text-lightest-slate font-semibold text-sm">{item.label}</p>
                <p className="text-slate text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pt-12 animate-bounce">
          <svg className="w-6 h-6 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
