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
      threshold: 0.2,
      rootMargin: '0px 0px -60px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add('active');
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

  const projects = [
    {
      number: 'PROJECT 01',
      title: 'Finble',
      description:
        '금융 데이터를 시각화하고 분석하여 사용자에게 인사이트를 제공하는 핀테크 서비스입니다. 복잡한 금융 정보를 직관적인 차트와 리포트로 제공합니다.',
      tags: ['React', 'TypeScript', 'Chart.js', 'Spring Boot'],
      link: 'https://github.com/ashkite/Finble',
    },
    {
      number: 'PROJECT 02',
      title: 'Pill-Pack',
      description:
        '약품 정보를 쉽게 검색하고 관리할 수 있는 헬스케어 플랫폼입니다. 사용자 복용 약을 등록하고 알림을 받으며, 상호작용 정보도 함께 제공합니다.',
      tags: ['Java', 'Spring Boot', 'JPA', 'MySQL'],
      link: 'https://github.com/ashkite/Podo-News',
    },
    {
      number: 'PROJECT 03',
      title: 'Daily Friend',
      description:
        '일기장, 가계부, 일정관리, 중요 정보 메모 등 일상생활에 필요한 다양한 기능을 제공하는 서비스입니다.',
      tags: ['Spring Boot', 'React', 'MySQL'],
      link: 'https://github.com/ashkite/dailyfriend',
    },
  ];

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
              <article key={project.title} className="project-item reveal">
                <div className="project-image" aria-hidden="true" />
                <div className="project-content">
                  <div className="project-number">{project.number}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="project-link" target="_blank" rel="noreferrer">
                    View Project
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
