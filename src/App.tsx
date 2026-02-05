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
      threshold: 0.2,
      rootMargin: '0px 0px -60px 0px',
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

    const animatedElements = document.querySelectorAll('.reveal');
    animatedElements.forEach((element) => observer.observe(element));

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroVisual = document.querySelector<HTMLElement>('.hero-visual');
      if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills = [
    {
      number: '01',
      title: 'Frontend Development',
      description: '모던 웹 기술로 반응형이고 인터랙티브한 사용자 인터페이스를 구현합니다.',
      items: ['React / Next.js', 'TypeScript', 'Chart.js / D3.js'],
    },
    {
      number: '02',
      title: 'UI/UX Design',
      description: '사용자 경험을 최우선으로 생각하며 직관적인 디자인을 설계합니다.',
      items: ['Figma / Adobe XD', 'Design Systems', 'Prototyping'],
    },
    {
      number: '03',
      title: 'Backend Development',
      description: '확장 가능하고 안정적인 서버 인프라를 구축합니다.',
      items: ['Spring Boot', 'Node.js / Express', 'MySQL / PostgreSQL'],
    },
  ];

  return (
    <div className="page">
      <nav>
        <div className="logo">PJY</div>
        <ul className="nav-links">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-label">PORTFOLIO 2024</div>
              <h1 className="hero-title">
                Park<br />
                <span className="gradient-text">Jaeyeon</span>
              </h1>
              <p className="hero-description">
                창의적인 아이디어와 기술력을 결합하여 사용자 중심의 디지털 경험을 만들어갑니다.
              </p>
              <div className="hero-cta">
                <a href="#work" className="btn btn-primary">
                  View Projects
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Get In Touch
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-box" />
              <div className="visual-box" />
              <div className="visual-box" />
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-number">01 / EXPERTISE</div>
            <h2 className="section-title">What I Do</h2>
            <p className="section-description">
              다양한 기술 스택과 창의적인 접근으로 프로젝트를 성공적으로 완성합니다.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.number} className="skill-card reveal">
                <div className="skill-number">{skill.number}</div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
                <ul className="skill-list">
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-number">02 / SELECTED WORKS</div>
            <h2 className="section-title">Featured Projects</h2>
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
        </div>
      </section>

      <section id="project-details">
        <div className="container">
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
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="contact-content reveal">
            <h2 className="contact-title">Let's Work<br />Together</h2>
            <p className="section-description">
              새로운 프로젝트나 협업 기회가 있으시다면 언제든 연락주세요.
            </p>
            <a href="mailto:jaeyoun310@gmail.com" className="contact-email">
              jaeyoun310@gmail.com
            </a>
            <div className="social-links">
              <a href="https://github.com/ashkite" className="social-link" title="GitHub" target="_blank" rel="noreferrer">
                <span>💻</span>
              </a>
              <a href="https://www.linkedin.com" className="social-link" title="LinkedIn" target="_blank" rel="noreferrer">
                <span>💼</span>
              </a>
              <a href="https://www.behance.net" className="social-link" title="Behance" target="_blank" rel="noreferrer">
                <span>🎨</span>
              </a>
              <a href="https://www.instagram.com" className="social-link" title="Instagram" target="_blank" rel="noreferrer">
                <span>📸</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <p className="footer-text">&copy; 2024 Park Jaeyeon. All rights reserved.</p>
          <div className="footer-links">
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
