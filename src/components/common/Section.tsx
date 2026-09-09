import { ReactNode, useRef } from 'react';
import { EASE, gsap, MEDIA, useGSAP } from '../../lib/gsap';
import { AnimatedText } from './AnimatedText';
import './Section.css';

interface SectionProps {
  id: string;
  /** 章节序号，如 01 */
  index: string;
  title: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  index,
  title,
  caption,
  children,
  className,
}: SectionProps) {
  const headRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        gsap.from('.section__index, .section__caption', {
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: { trigger: headRef.current, start: 'top 88%', once: true },
        });

        // 标题下方的横线从左向右展开
        gsap.from('.section__rule', {
          scaleX: 0,
          duration: 1.1,
          ease: EASE.inOut,
          scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: headRef }
  );

  return (
    <section id={id} className={`section ${className ?? ''}`}>
      <div className="section__inner">
        <div className="section__head" ref={headRef}>
          <span className="section__index">{index}</span>
          <AnimatedText
            as="h2"
            className="section__title"
            text={title}
            unit="chars"
            tone="punch"
          />
          {caption && <p className="section__caption">{caption}</p>}
          <span className="section__rule" />
        </div>
        {children}
      </div>
    </section>
  );
}
