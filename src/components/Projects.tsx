import React, { useState } from 'react';
import { ExternalLink, Folder, Github, Users, Calendar, Server } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  external: string;
  image?: string;
  period: string;
  team: string;
  role: string;
  architecture?: string;
}

const featuredProjects: Project[] = [
  {
    title: 'Finble',
    description:
      '금융 데이터를 시각화하고 분석하여 사용자에게 인사이트를 제공하는 핀테크 서비스입니다. 복잡한 금융 정보를 직관적인 차트와 리포트로 제공합니다.',
    tech: ['React', 'TypeScript', 'Chart.js', 'Spring Boot'],
    github: 'https://github.com/ashkite/Finble',
    external: '#',
    image: '/image/finble.png',
    period: '2023.03 - 2023.06',
    team: '4명 (BE 2, FE 2)',
    role: 'Backend Developer',
    architecture: 'Spring Boot 기반의 Monolithic 아키텍처로 설계됨. 외부 금융 API와 연동하여 데이터를 수집 및 가공하고, Spring Security(JWT)를 통한 인증/인가 시스템 구축. Redis를 도입하여 데이터 캐싱 처리로 응답 속도 최적화.',
  },
  {
    title: 'Pill-Pack',
    description:
      '약품 정보를 쉽게 검색하고 관리할 수 있는 헬스케어 플랫폼입니다. 사용자 복용 약을 등록하고 알림을 받으며, 상호작용 정보도 함께 제공합니다.',
    tech: ['Java', 'Spring Boot', 'JPA', 'MySQL'],
    github: 'https://github.com/ashkite/Podo-News',
    external: '#',
    image: '/image/pill_pack.png',
    period: '2023.08 - 2023.10',
    team: '3명 (BE 1, FE 2)',
    role: 'Backend Lead',
    architecture: '사용자 및 약품 관리를 위한 서비스 중심 설계. 상호작용 분석 엔진을 통해 약물 간 충돌 위험을 감지하며, Firebase cloud Messaging(FCM)을 활용한 알림 서비스 구축. RESTful API 설계 및 JPA를 활용한 효율적인 데이터 모델링.',
  },
];

const otherProjects: Project[] = [
  {
    title: 'Daily Friend (일상친구)',
    description:
      '일기장, 가계부, 일정관리, 중요 정보 메모 등 일상생활에 필요한 다양한 기능을 제공하는 서비스입니다.',
    tech: ['Spring Boot', 'React', 'MySQL'],
    github: 'https://github.com/ashkite/dailyfriend',
    external: '#',
    period: '2022.12 - 2023.02',
    team: '1명 (개인 프로젝트)',
    role: 'Full Stack',
    architecture: 'Controller-Service-Repository 레이어 패턴을 적용한 모듈형 구조. 일기, 금융, 일정 등 각 도메인을 독립적으로 관리 가능한 구조로 설계.',
  },
  {
    title: 'Chatbot Service',
    description: 'LLM을 활용한 지능형 상담 챗봇 서비스입니다.',
    tech: ['Python', 'LangChain', 'OpenAI API'],
    github: 'https://github.com/ashkite/Chatbot-Service',
    external: '#',
    period: '2024.01 - 2024.02',
    team: '2명 (AI 1, BE 1)',
    role: 'AI Engineer',
    architecture: 'FastAPI 서버와 LangChain을 활용한 RAG(Retrieval-Augmented Generation) 파이프라인 구축. Vector DB를 활용하여 문맥 기반의 정확한 답변 생성.',
  },
];

const githubRepos = [
  {
    name: 'Finble',
    description: '금융 데이터를 수집·가공해 시각화 리포트를 제공하는 핀테크 서비스 백엔드.',
    href: 'https://github.com/ashkite/Finble',
  },
  {
    name: 'Pill-Pack',
    description: '약품 정보 검색과 복용 알림, 상호작용 분석을 제공하는 헬스케어 서비스.',
    href: 'https://github.com/ashkite/Podo-News',
  },
  {
    name: 'Daily Friend (일상친구)',
    description: '일기, 가계부, 일정, 메모를 통합 관리하는 개인용 라이프 관리 서비스.',
    href: 'https://github.com/ashkite/dailyfriend',
  },
  {
    name: 'Chatbot Service',
    description: 'RAG 파이프라인으로 정확도를 높인 LLM 기반 상담 챗봇 서비스.',
    href: 'https://github.com/ashkite/Chatbot-Service',
  },
];

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openProjectDetail = (project: Project) => {
    setActiveProject(project);
  };

  const closeProjectDetail = () => {
    setActiveProject(null);
  };

  if (activeProject) {
    return (
      <section id="projects" className="w-full" aria-labelledby="projects-detail-heading">
        <div className="flex items-center mb-10">
          <button
            type="button"
            className="mr-4 text-sm font-mono text-green border border-green/50 px-4 py-2 rounded-full hover:bg-green/10 transition-colors"
            onClick={closeProjectDetail}
          >
            ← 프로젝트 목록
          </button>
          <div className="flex-1 h-[1px] bg-lightest-navy" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            {activeProject.image && (
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-lightest-navy/50 bg-light-navy/60">
                <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <p className="font-mono text-green text-xs mb-2">Project Detail</p>
              <h2 id="projects-detail-heading" className="text-3xl font-bold text-lightest-slate mb-4">
                {activeProject.title}
              </h2>
              <p className="text-slate leading-relaxed">{activeProject.description}</p>
            </div>
            {activeProject.architecture && (
              <div className="rounded-2xl border border-green/20 bg-navy/50 p-5">
                <div className="flex items-center gap-2 mb-2 text-green font-mono text-xs">
                  <Server size={14} />
                  <span>System Architecture</span>
                </div>
                <p className="text-xs text-light-slate leading-relaxed">{activeProject.architecture}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-lightest-navy/50 bg-light-navy/70 p-6 space-y-4">
              <div className="flex items-center gap-3 text-slate text-sm">
                <Calendar size={16} className="text-green" />
                <span>{activeProject.period}</span>
              </div>
              <div className="flex items-center gap-3 text-slate text-sm">
                <Users size={16} className="text-green" />
                <span>{activeProject.team}</span>
              </div>
              <div className="flex items-center gap-3 text-slate text-sm">
                <Folder size={16} className="text-green" />
                <span className="font-semibold text-lightest-slate">{activeProject.role}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-mono text-green mb-3">Tech Stack</h3>
              <ul className="flex flex-wrap gap-2 text-slate font-mono text-xs">
                {activeProject.tech.map((tech) => (
                  <li key={tech} className="px-3 py-1 rounded-full bg-navy/70 border border-lightest-navy/40">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={activeProject.github}
                className="inline-flex items-center gap-2 text-sm font-mono text-green border border-green/60 px-4 py-2 rounded-full hover:bg-green/10 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} />
                GitHub 바로가기
              </a>
              {activeProject.external !== '#' && (
                <a
                  href={activeProject.external}
                  className="inline-flex items-center gap-2 text-sm font-mono text-slate border border-lightest-navy/60 px-4 py-2 rounded-full hover:text-green hover:border-green/60 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} />
                  서비스 보기
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="w-full" aria-labelledby="projects-heading">
      <div className="flex items-center mb-12 animate-fade-in-up">
        <span className="text-green font-mono text-xl mr-2">03.</span>
        <h2 id="projects-heading" className="text-3xl font-bold text-lightest-slate whitespace-nowrap">
          주요 프로젝트
        </h2>
        <div className="h-[1px] w-full bg-lightest-navy ml-6" />
      </div>

      <div className="space-y-32 mb-24">
        {featuredProjects.map((project, index) => (
          <div
            key={project.title}
            className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 items-start cursor-pointer ${index % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}
            role="button"
            tabIndex={0}
            onClick={() => openProjectDetail(project)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProjectDetail(project);
              }
            }}
          >
            <div className={`col-span-12 md:col-span-6 sticky top-24 ${index % 2 !== 0 ? 'md:col-start-7 order-last md:order-first' : ''}`}>
              <div className="relative h-80 rounded-2xl overflow-hidden border border-lightest-navy/50 bg-light-navy/60 shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-tr from-navy/60 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-0" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover p-0 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className={`col-span-12 md:col-span-6 z-10 ${index % 2 === 0 ? 'md:col-start-7' : ''}`}>
              <p className="font-mono text-green text-sm mb-2">Featured Project</p>
              <h3 className="text-2xl font-bold text-lightest-slate mb-4">{project.title}</h3>

              <div className={`bg-light-navy/90 text-slate p-6 rounded-xl text-sm leading-relaxed border border-lightest-navy/50 mb-5 shadow-lg backdrop-blur-sm ${index % 2 === 0 ? 'md:-ml-16' : 'md:-mr-16'}`}>
                {project.description}
              </div>

              <div className={`flex flex-col gap-3 mb-6 text-sm text-slate ${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-green" />
                  <span>{project.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-green" />
                  <span>{project.team}</span>
                  <span className="text-light-slate">|</span>
                  <span className="font-semibold text-lightest-slate">{project.role}</span>
                </div>
              </div>

              {project.architecture && (
                <div className={`mb-6 p-4 rounded-lg bg-navy/40 border border-green/20 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center gap-2 mb-2 text-green font-mono text-xs ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <Server size={14} />
                    <span>System Architecture</span>
                  </div>
                  <p className="text-xs text-light-slate leading-relaxed">
                    {project.architecture}
                  </p>
                </div>
              )}

              <ul className={`flex flex-wrap gap-3 text-slate font-mono text-xs mb-6 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                {project.tech.map((tech) => (
                  <li key={tech} className="px-3 py-1 rounded-full bg-navy/70 border border-lightest-navy/40 hover:text-green transition-colors cursor-default">
                    {tech}
                  </li>
                ))}
              </ul>
              <div className={`flex items-center gap-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <a
                  href={project.github}
                  className="text-slate hover:text-green transition-colors"
                  aria-label={`${project.title} GitHub`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Github size={20} />
                </a>
                {project.external !== '#' && (
                  <a
                    href={project.external}
                    className="text-slate hover:text-green transition-colors"
                    aria-label={`${project.title} live link`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
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
        <p className="font-mono text-green text-sm">다양한 기술 스택을 활용한 실험적인 프로젝트들입니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {otherProjects.map((project, index) => (
          <div
            key={project.title}
            className="bg-light-navy/70 border border-lightest-navy/50 p-7 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group cursor-pointer"
            style={{ animationDelay: `${index * 60}ms` }}
            role="button"
            tabIndex={0}
            onClick={() => openProjectDetail(project)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProjectDetail(project);
              }
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <Folder size={36} className="text-green group-hover:text-green/80 transition-colors" />
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  className="text-slate hover:text-green transition-colors"
                  aria-label={`${project.title} GitHub`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Github size={18} />
                </a>
                {project.external !== '#' && (
                  <a
                    href={project.external}
                    className="text-slate hover:text-green transition-colors"
                    aria-label={`${project.title} live link`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-lightest-slate mb-2 group-hover:text-green transition-colors">{project.title}</h3>

            <div className="flex flex-col gap-2 mb-4 text-xs text-light-slate font-mono">
              <div className="flex items-center gap-2">
                <Calendar size={12} />
                <span>{project.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={12} />
                <span>{project.team} · {project.role}</span>
              </div>
            </div>

            <p className="text-slate text-sm flex-grow mb-6 leading-relaxed">{project.description}</p>

            {project.architecture && (
              <div className="mb-4 pt-4 border-t border-lightest-navy/30">
                <div className="flex items-center gap-2 mb-1 text-green text-xs font-mono">
                  <Server size={12} />
                  <span>Architecture</span>
                </div>
                <p className="text-xs text-light-slate line-clamp-3 hover:line-clamp-none transition-all">
                  {project.architecture}
                </p>
              </div>
            )}

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

      <div className="mt-20">
        <div className="flex items-center mb-8">
          <span className="text-green font-mono text-sm mr-2">GitHub</span>
          <h3 className="text-2xl font-bold text-lightest-slate">저장소 요약</h3>
          <div className="h-[1px] w-full bg-lightest-navy ml-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {githubRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.href}
              className="group flex flex-col gap-3 rounded-2xl border border-lightest-navy/50 bg-light-navy/60 p-6 hover:-translate-y-1 transition-transform"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-lightest-slate group-hover:text-green transition-colors">
                  {repo.name}
                </h4>
                <Github size={18} className="text-slate group-hover:text-green transition-colors" />
              </div>
              <p className="text-sm text-slate leading-relaxed">{repo.description}</p>
              <span className="text-xs font-mono text-green">GitHub 바로가기</span>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Projects;
