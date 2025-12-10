import React from 'react';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="w-full pb-24" aria-labelledby="contact-heading">
      <div className="text-center max-w-2xl mx-auto px-4">
        <p className="text-green font-mono mb-3">04. 다음 단계는?</p>
        <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-lightest-slate mb-6">
          연락하기
        </h2>
        <p className="text-slate text-lg mb-12 leading-relaxed">
          새로운 제안과 협업을 언제나 환영합니다. 프로젝트가 있다면 간단히 공유해주세요.
          곧 답장을 드리겠습니다!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="mailto:jaeyoun310@gmail.com"
            className="inline-block px-8 py-4 bg-green text-navy font-mono rounded shadow hover:shadow-lg transition-all"
          >
            메일 보내기
          </a>
          <a
            href="/portfolio.pdf"
            download="portfolio.pdf"
            className="inline-block px-8 py-4 border border-green text-green font-mono rounded hover:bg-green/10 transition-colors"
          >
            포트폴리오 다운로드
          </a>
        </div>

        <div className="flex justify-center space-x-8 mb-10">
          <a href="https://github.com/ashkite" className="text-slate hover:text-green transition-colors" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com" className="text-slate hover:text-green transition-colors" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="https://www.instagram.com" className="text-slate hover:text-green transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://twitter.com" className="text-slate hover:text-green transition-colors" aria-label="Twitter">
            <Twitter size={20} />
          </a>
        </div>

        <p className="text-sm text-slate font-mono hover:text-green cursor-pointer transition-colors">
          Designed & Built by Park Jaeyeon
        </p>
      </div>
    </section>
  );
};

export default Contact;
