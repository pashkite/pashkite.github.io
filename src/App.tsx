import { useEffect } from 'react';

const projects = [
  {
    id: 'finble',
    title: 'Finble 리서치 플랫폼',
    summary:
      '리서치 데이터 자동화 수집과 분석을 위한 플랫폼. 대시보드 중심의 UX로 리서치 워크플로를 최적화했습니다.',
    detail:
      '클라이언트 리서치 프로젝트를 빠르게 시작할 수 있도록 설문 설계, 수집, 분석 과정을 하나의 플로우로 통합했습니다.',
    image: '/image/finble.png',
    tags: ['React', 'TypeScript', 'Analytics'],
  },
  {
    id: 'pill-pack',
    title: 'Pill Pack 모바일 경험',
    summary:
      '건강 기록과 복약 알림을 한 곳에서 관리하는 모바일 서비스. 정보 구조를 단순화해 접근성을 높였습니다.',
    detail:
      '사용자 인터뷰 결과를 반영해 복약 알림, 히스토리, 캘린더 뷰를 재구성하고 핵심 정보를 카드 레이아웃으로 재배치했습니다.',
    image: '/image/pill_pack.png',
    tags: ['UI/UX', 'Product Design', 'Figma'],
  },
  {
    id: 'studio',
    title: '브랜드 스튜디오 웹사이트',
    summary:
      '브랜드의 비주얼 톤을 살린 마케팅 사이트. 인터랙션 중심의 모션으로 몰입감을 강화했습니다.',
    detail:
      '브랜드 컬러 시스템과 모션 가이드를 정리해 히어로/포트폴리오/문의 섹션을 단계적으로 연결했습니다.',
    image: '/image/finble.png',
    tags: ['Next.js', 'GSAP', 'Vercel'],
  },
];

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

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          window.setTimeout(() => {
            target.classList.add('visible');
          }, index * 100);
          observerInstance.unobserve(entry.target);
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
            {projects.map((project) => (
              <div key={project.id} className="project-card scroll-animate">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.summary}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a className="project-link" href={`#project-${project.id}`}>
                    프로젝트 상세보기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="project-details">
          <div className="section-header scroll-animate">
            <div className="section-label">프로젝트 상세</div>
            <h2 className="section-title">Project Highlights</h2>
            <p className="section-description">
              클릭한 프로젝트의 흐름을 이어 볼 수 있도록 상세 내용을 정리했습니다.
            </p>
          </div>
          <div className="details-grid">
            {projects.map((project) => (
              <article
                key={`detail-${project.id}`}
                id={`project-${project.id}`}
                className="detail-card scroll-animate"
              >
                <div className="detail-media">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="detail-content">
                  <h3 className="detail-title">{project.title}</h3>
                  <p className="detail-description">{project.detail}</p>
                  <div className="detail-tags">
                    {project.tags.map((tag) => (
                      <span key={`${project.id}-${tag}`} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href="#contact" className="detail-link">
                    프로젝트 문의하기
                  </a>
                </div>
              </article>
            ))}
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
