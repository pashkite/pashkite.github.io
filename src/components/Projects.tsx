import React from 'react';
import { Github, ExternalLink, Folder } from 'lucide-react';

const Projects: React.FC = () => {
  const featuredProjects = [
    {
      title: 'Finble',
      description: '금융 데이터를 시각화하고 분석하여 사용자에게 인사이트를 제공하는 핀테크 서비스입니다. 복잡한 금융 정보를 직관적인 차트와 리포트로 제공합니다.',
      tech: ['React', 'TypeScript', 'Chart.js', 'Spring Boot'],
      github: '#',
      external: '#',
      image: '/image/finble.png'
    },
    {
      title: 'Pill-Pack',
      description: '약품 정보를 쉽게 검색하고 관리할 수 있는 헬스케어 플랫폼입니다. 사용자가 복용 중인 약을 등록하고 알림을 받을 수 있으며, 약물 간의 상호작용 정보를 제공합니다.',
      tech: ['Java', 'Spring Boot', 'JPA', 'MySQL'],
      github: 'https://github.com/Park-Jaeyeon/Podo-News', // Pill-Pack 관련 주소로 가정 (Podo-News에서 변경됨)
      external: '#',
      image: '/image/pill_pack.png'
    }
  ];

  const otherProjects = [
     {
      title: 'Daily Friend (일상친구)',
      description: '사용자의 일상을 공유하고 소통하는 커뮤니티 SNS 플랫폼입니다.',
      tech: ['Spring Boot', 'React', 'MySQL'],
      github: 'https://github.com/Park-Jaeyeon/dailyfriend',
      external: '#'
    },
     {
      title: 'Chatbot Service',
      description: 'LLM을 활용한 지능형 상담 챗봇 서비스입니다.',
      tech: ['Python', 'LangChain', 'OpenAI API'],
      github: '#',
      external: '#'
    },
     {
      title: 'Vibe Coding (바이브코딩)',
      description: '음악과 코딩을 결합한 창의적인 프로젝트입니다. 리듬에 맞춰 코드를 작성하거나 코드 흐름을 음악으로 시각화합니다.',
      tech: ['Web Audio API', 'React', 'Canvas'],
      github: '#',
      external: '#'
    },
  ];

  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6 sm:px-10">
      <div className="flex items-center mb-12 animate-fade-in-up">
        <span className="text-green font-mono text-xl mr-2">03.</span>
        <h2 className="text-3xl font-bold text-lightest-slate whitespace-nowrap">주요 프로젝트</h2>
        <div className="h-[1px] w-full bg-lightest-navy ml-6"></div>
      </div>

      {/* Featured Projects - Alternating Layout */}
      <div className="space-y-32 mb-32">
        {featuredProjects.map((project, index) => (
          <div key={index} className={`relative grid grid-cols-12 gap-4 items-center ${index % 2 !== 0 ? 'text-left' : 'text-right'}`}>
            {/* Project Image */}
            <div className={`col-span-12 md:col-span-7 relative h-64 md:h-96 ${index % 2 !== 0 ? 'md:col-start-6' : 'md:col-start-1'}`}>
               <div className="w-full h-full rounded shadow-xl overflow-hidden relative group cursor-pointer border border-lightest-navy">
                   <div className="absolute inset-0 bg-navy/30 group-hover:bg-transparent transition-colors z-10"></div>
                   <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                   />
               </div>
            </div>

            {/* Project Content */}
            <div className={`col-span-12 md:col-span-7 z-20 pointer-events-none md:pointer-events-auto ${index % 2 !== 0 ? 'md:col-start-1 md:row-start-1' : 'md:col-start-6 md:row-start-1 text-right'}`}>
              <p className="font-mono text-green text-sm mb-2">Featured Project</p>
              <h3 className="text-2xl font-bold text-lightest-slate mb-6 hover:text-green cursor-pointer transition-colors inline-block">
                <a href={project.external !== '#' ? project.external : project.github}>{project.title}</a>
              </h3>
              <div className="bg-light-navy text-slate p-6 rounded shadow-xl text-sm leading-relaxed mb-6 relative">
                {project.description}
              </div>
              <ul className={`flex flex-wrap gap-4 text-slate font-mono text-xs mb-8 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                {project.tech.map(t => <li key={t}>{t}</li>)}
              </ul>
              <div className={`flex items-center gap-4 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                <a href={project.github} className="text-slate hover:text-green transition-colors"><Github size={20} /></a>
                <a href={project.external} className="text-slate hover:text-green transition-colors"><ExternalLink size={20} /></a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Other Projects - Grid */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-lightest-slate mb-2">기타 프로젝트</h3>
        <a href="#" className="font-mono text-green text-sm hover:underline">전체 보기</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherProjects.map((project, index) => (
            <div key={index} className="bg-light-navy p-8 rounded shadow-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group">
                <div className="flex justify-between items-center mb-8">
                    <Folder size={40} className="text-green" />
                    <div className="flex space-x-4">
                         <a href={project.github} className="text-slate hover:text-green transition-colors"><Github size={20} /></a>
                         <a href={project.external} className="text-slate hover:text-green transition-colors"><ExternalLink size={20} /></a>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-lightest-slate mb-2 group-hover:text-green transition-colors">{project.title}</h3>
                <p className="text-slate text-sm flex-grow mb-6">{project.description}</p>
                <ul className="flex flex-wrap gap-2 text-slate font-mono text-xs mt-auto">
                    {project.tech.map(t => <li key={t}>{t}</li>)}
                </ul>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
