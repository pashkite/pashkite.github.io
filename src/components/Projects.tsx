import React from 'react';
import { ExternalLink, Folder, Github } from 'lucide-react';

const featuredProjects = [
  {
    title: 'Finble',
    description:
      '금융 데이터를 시각화하고 분석하여 사용자에게 인사이트를 제공하는 핀테크 서비스입니다. 복잡한 금융 정보를 직관적인 차트와 리포트로 제공합니다.',
    tech: ['React', 'TypeScript', 'Chart.js', 'Spring Boot'],
    github: 'https://github.com/ashkite',
    external: '#',
    image: '/image/finble.png',
  },
  {
    title: 'Pill-Pack',
    description:
      '약품 정보를 쉽게 검색하고 관리할 수 있는 헬스케어 플랫폼입니다. 사용자 복용 약을 등록하고 알림을 받으며, 상호작용 정보도 함께 제공합니다.',
    tech: ['Java', 'Spring Boot', 'JPA', 'MySQL'],
    github: 'https://github.com/Park-Jaeyeon/Podo-News',
    external: '#',
    image: '/image/pill_pack.png',
  },
];

const otherProjects = [
  {
    title: 'Daily Friend (일상친구)',
    description:
      '일기장, 가계부, 일정관리, 중요 정보 메모 등 일상생활에 필요한 다양한 기능을 제공하는 서비스입니다.',
    tech: ['Spring Boot', 'React', 'MySQL'],
    github: 'https://github.com/Park-Jaeyeon/dailyfriend',
    external: '#',
  },
  {
    title: 'Chatbot Service',
    description: 'LLM을 활용한 지능형 상담 챗봇 서비스입니다.',
    tech: ['Python', 'LangChain', 'OpenAI API'],
    github: 'https://github.com/ashkite',
    external: '#',
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="w-full" aria-labelledby="projects-heading">
      <div className="flex items-center mb-12 animate-fade-in-up">
        <span className="text-green font-mono text-xl mr-2">03.</span>
        <h2 id="projects-heading" className="text-3xl font-bold text-lightest-slate whitespace-nowrap">
          주요 프로젝트
        </h2>
        <div className="h-[1px] w-full bg-lightest-navy ml-6" />
      </div>

      <div className="space-y-24 mb-24">
        {featuredProjects.map((project, index) => (
          <div
            key={project.title}
            className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center ${index % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}
          >
            <div className={`col-span-12 md:col-span-6 ${index % 2 !== 0 ? 'md:col-start-7 order-last md:order-first' : ''}`}>
              <div className="relative h-72 rounded-2xl overflow-hidden border border-lightest-navy/50 bg-light-navy/60 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-navy/60 to-transparent" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain p-4" 
                />
              </div>
            </div>

            <div className={`col-span-12 md:col-span-6 z-10 ${index % 2 === 0 ? 'md:col-start-7' : ''}`}>
              <p className="font-mono text-green text-sm mb-2">Featured Project</p>
              <h3 className="text-2xl font-bold text-lightest-slate mb-4">{project.title}</h3>
              <div className="bg-light-navy/70 text-slate p-6 rounded-xl text-sm leading-relaxed border border-lightest-navy/50 mb-5">
                {project.description}
              </div>
              <ul className="flex flex-wrap gap-3 text-slate font-mono text-xs mb-6">
                {project.tech.map((tech) => (
                  <li key={tech} className="px-3 py-1 rounded-full bg-navy/70 border border-lightest-navy/40">
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <a
                  href={project.github}
                  className="text-slate hover:text-green transition-colors"
                  aria-label={`${project.title} GitHub`}
                >
                  <Github size={20} />
                </a>
                {project.external !== '#' && (
                  <a
                    href={project.external}
                    className="text-slate hover:text-green transition-colors"
                    aria-label={`${project.title} live link`}
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-lightest-slate mb-2">기타 프로젝트</h3>
        <p className="font-mono text-green text-sm">아래 프로젝트들은 지속적으로 개선 중입니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {otherProjects.map((project, index) => (
          <div
            key={project.title}
            className="bg-light-navy/70 border border-lightest-navy/50 p-7 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex justify-between items-center mb-6">
              <Folder size={36} className="text-green" />
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  className="text-slate hover:text-green transition-colors"
                  aria-label={`${project.title} GitHub`}
                >
                  <Github size={18} />
                </a>
                {project.external !== '#' && (
                  <a
                    href={project.external}
                    className="text-slate hover:text-green transition-colors"
                    aria-label={`${project.title} live link`}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold text-lightest-slate mb-2">{project.title}</h3>
            <p className="text-slate text-sm flex-grow mb-6 leading-relaxed">{project.description}</p>
            <ul className="flex flex-wrap gap-2 text-slate font-mono text-xs mt-auto">
              {project.tech.map((tech) => (
                <li key={tech} className="px-3 py-1 rounded-full bg-navy/70 border border-lightest-navy/40">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
