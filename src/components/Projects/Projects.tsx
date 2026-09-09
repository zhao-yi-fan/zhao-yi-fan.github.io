import { useRef } from 'react';
import { EASE, gsap, MEDIA, useGSAP } from '../../lib/gsap';
import { projects } from '../../data/resume';
import { Section } from '../common/Section';
import './Projects.css';

export function Projects() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        gsap.from('.case', {
          opacity: 0,
          y: 32,
          duration: 0.75,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: { trigger: '.cases', start: 'top 84%', once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Section id="projects" index="04" title="项目">
        <ol className="cases">
          {projects.map((project, index) => (
            <li className="case" key={project.title}>
              <span className="case__no">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="case__head">
                <h3 className="case__title">{project.title}</h3>
                <p className="case__meta">{project.description}</p>
              </div>
              <div className="case__body">
                <p className="case__detail">{project.detail}</p>
                <p className="case__tags">{project.tags.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
