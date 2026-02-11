import React, { useState } from 'react';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  demo?: string;
  image?: string;
  period: string;
  team: string;
  role: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: 'Aiders',
    description: '실시간 응급 출동 및 병원 매칭 시스템',
    longDescription: '응급 상황 발생 시 가장 가까운 구급차를 자동으로 배차하고, 환자 상태에 적합한 병원을 실시간으로 매칭하는 응급 의료 서비스입니다. WebSocket을 활용한 실시간 위치 추적과 병상 현황 파악으로 골든타임 확보에 기여합니다.',
    tech: ['React', 'TypeScript', 'WebSocket', 'Spring Boot', 'MySQL', 'Redis'],
    github: 'https://github.com/pashkite/Aiders',
    image: '/image/aiders.png',
    period: '2024.10 - 2024.11',
    team: '6명 (FE 3, BE 3)',
    role: 'Frontend Developer',
    highlights: [
      'WebSocket 기반 실시간 구급차 위치 추적 구현',
      'Kakao Maps API를 활용한 최단거리 경로 계산',
      '환자 상태별 병원 추천 알고리즘 프론트엔드 연동',
      '반응형 관제 대시보드 UI/UX 설계 및 개발'
    ]
  },
  {
    title: 'Finble',
    description: '개인 자산 관리 및 금융 데이터 시각화 플랫폼',
    longDescription: '사용자의 금융 데이터를 수집하여 직관적인 차트와 리포트로 제공하는 핀테크 서비스입니다. 복잡한 금융 정보를 한눈에 파악할 수 있도록 데이터 시각화에 중점을 두었습니다.',
    tech: ['React', 'TypeScript', 'Chart.js', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/pashkite/Finble',
    image: '/image/finble.png',
    period: '2024.08 - 2024.09',
    team: '4명 (FE 2, BE 2)',
    role: 'Frontend Developer',
    highlights: [
      'Chart.js와 Recharts를 활용한 인터랙티브 차트 구현',
      '자산 포트폴리오 시각화 및 추이 분석 기능',
      '반응형 대시보드 레이아웃 설계',
      '사용자 친화적인 데이터 필터링 인터페이스 개발'
    ]
  },
  {
    title: 'Board Game Collection',
    description: '보드게임 온라인 플랫폼',
    longDescription: '다양한 보드게임을 웹에서 즐길 수 있는 멀티플레이어 게임 플랫폼입니다. WebSocket을 활용한 실시간 게임 진행과 턴 기반 로직 구현에 집중했습니다.',
    tech: ['React', 'TypeScript', 'WebSocket', 'Zustand', 'Tailwind CSS'],
    github: 'https://github.com/pashkite/board-game',
    period: '2024.06 - 2024.07',
    team: '2명 (FE 2)',
    role: 'Frontend Developer',
    highlights: [
      'WebSocket 기반 실시간 게임 상태 동기화',
      '턴 기반 게임 로직 및 애니메이션 구현',
      'Zustand를 활용한 전역 상태 관리',
      '게임별 커스텀 UI 컴포넌트 설계'
    ]
  },
  {
    title: 'Portfolio Website',
    description: '개인 포트폴리오 웹사이트',
    longDescription: '프론트엔드 개발자로서의 역량을 보여주기 위한 개인 포트폴리오 사이트입니다. 미니멀한 디자인과 부드러운 애니메이션으로 사용자 경험을 개선했습니다.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/pashkite/pashkite.github.io',
    demo: 'https://pashkite.github.io',
    period: '2024.02 - 현재',
    team: '1명 (개인)',
    role: 'Frontend Developer',
    highlights: [
      '미니멀한 디자인 시스템 구축',
      'CSS 애니메이션을 활용한 인터랙티브 요소',
      '반응형 레이아웃 및 접근성 최적화',
      'GitHub Pages 자동 배포 설정'
    ]
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Projects</h2>
          <p className="text-lg text-gray-600">제가 작업한 프로젝트들입니다. 각 카드를 클릭하면 자세한 내용을 확인할 수 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
            >
              {project.image && (
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </div>
              )}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {project.period}
                  </div>
                  <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    자세히 보기 →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="닫기"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-6 space-y-8">
              {/* Image */}
              {selectedProject.image && (
                <div className="rounded-2xl overflow-hidden border border-gray-200">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">프로젝트 소개</h4>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedProject.longDescription}</p>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2 font-medium">기간</div>
                  <div className="text-gray-900 font-semibold">{selectedProject.period}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2 font-medium">팀 구성</div>
                  <div className="text-gray-900 font-semibold">{selectedProject.team}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2 font-medium">역할</div>
                  <div className="text-gray-900 font-semibold">{selectedProject.role}</div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">주요 구현 사항</h4>
                <ul className="space-y-3">
                  {selectedProject.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">기술 스택</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub 저장소 보기
                </a>
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    라이브 데모 보기
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
