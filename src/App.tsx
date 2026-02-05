import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handleAnchorClick = (event: Event) => {
      event.preventDefault();
      const target = event.currentTarget as HTMLAnchorElement;
      const selector = target.getAttribute('href');
      if (!selector) {
        return;
      }
      const destination = document.querySelector(selector);
      destination?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          window.setTimeout(() => {
            target.classList.add('visible');
          }, index * 100);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((element) => observer.observe(element));

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const background = document.querySelector<HTMLElement>('.bg-animation');
      if (background) {
        background.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="bg-animation" />

      <div className="container">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-label">포트폴리오</div>
            <h1 className="hero-title">Park Jaeyeon</h1>
            <p className="hero-subtitle">Creative Developer & Designer</p>
            <p className="hero-description">
              혁신적인 아이디어를 현실로 만드는 개발자입니다. 사용자 경험을 최우선으로 생각하며,
              아름답고 직관적인 인터페이스를 구축합니다.
            </p>
            <div className="cta-group">
              <a href="#projects" className="btn btn-primary">
                프로젝트 보기
              </a>
              <a href="#contact" className="btn btn-secondary">
                연락하기
              </a>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="section-header scroll-animate">
            <div className="section-label">전문 분야</div>
            <h2 className="section-title">Skills</h2>
            <p className="section-description">
              다양한 기술 스택과 도구를 활용하여 최고의 결과물을 만들어냅니다.
            </p>
          </div>
          <div className="skills-grid">
            <div className="skill-card scroll-animate">
              <div className="skill-icon">💻</div>
              <h3 className="skill-title">Frontend Development</h3>
              <p className="skill-description">
                React, Vue.js, TypeScript를 활용한 모던 웹 애플리케이션 개발
              </p>
            </div>
            <div className="skill-card scroll-animate">
              <div className="skill-icon">🎨</div>
              <h3 className="skill-title">UI/UX Design</h3>
              <p className="skill-description">
                사용자 중심의 직관적이고 아름다운 인터페이스 디자인
              </p>
            </div>
            <div className="skill-card scroll-animate">
              <div className="skill-icon">⚙️</div>
              <h3 className="skill-title">Backend Development</h3>
              <p className="skill-description">
                Node.js, Python을 활용한 견고하고 확장 가능한 서버 개발
              </p>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="section-header scroll-animate">
            <div className="section-label">작업물</div>
            <h2 className="section-title">Projects</h2>
            <p className="section-description">지금까지 작업한 주요 프로젝트들을 소개합니다.</p>
          </div>
          <div className="projects-grid">
            <div className="project-card scroll-animate">
              <div className="project-image">🚀</div>
              <div className="project-content">
                <h3 className="project-title">프로젝트 1</h3>
                <p className="project-description">
                  혁신적인 웹 애플리케이션 개발 프로젝트. 사용자 경험을 극대화하기 위한 다양한 기술을
                  적용했습니다.
                </p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">Node.js</span>
                </div>
              </div>
            </div>
            <div className="project-card scroll-animate">
              <div className="project-image">🎯</div>
              <div className="project-content">
                <h3 className="project-title">프로젝트 2</h3>
                <p className="project-description">
                  데이터 시각화를 중심으로 한 대시보드 프로젝트. 복잡한 데이터를 직관적으로
                  표현했습니다.
                </p>
                <div className="project-tags">
                  <span className="tag">Vue.js</span>
                  <span className="tag">D3.js</span>
                  <span className="tag">Python</span>
                </div>
              </div>
            </div>
            <div className="project-card scroll-animate">
              <div className="project-image">✨</div>
              <div className="project-content">
                <h3 className="project-title">프로젝트 3</h3>
                <p className="project-description">
                  모바일 퍼스트 접근으로 개발한 반응형 웹사이트. 모든 디바이스에서 완벽한 경험을
                  제공합니다.
                </p>
                <div className="project-tags">
                  <span className="tag">HTML5</span>
                  <span className="tag">CSS3</span>
                  <span className="tag">JavaScript</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="section-header scroll-animate">
            <div className="section-label">연락</div>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-description">
              프로젝트 협업이나 문의사항이 있으시다면 언제든지 연락주세요.
            </p>
          </div>
          <div className="contact-content scroll-animate">
            <a href="mailto:your.email@example.com" className="contact-email">
              your.email@example.com
            </a>
            <div className="social-links">
              <a href="#" className="social-link" title="GitHub">
                <span>📱</span>
              </a>
              <a href="#" className="social-link" title="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#" className="social-link" title="Twitter">
                <span>🐦</span>
              </a>
              <a href="#" className="social-link" title="Instagram">
                <span>📷</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="container">
          <p>&copy; 2024 Park Jaeyeon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
