import { useRef, useState } from 'react';
import { EASE, gsap, MEDIA, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { experiences } from '../../data/resume';
import { Section } from '../common/Section';
import './Timeline.css';

const pad = (n: number) => String(n).padStart(2, '0');

export function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        // 竖线随滚动绘制，scrub 给一点缓冲让线条跟手但不生硬
        gsap.fromTo(
          '.timeline__draw',
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            ease: 'none',
            scrollTrigger: {
              trigger: mainRef.current,
              start: 'top 72%',
              end: 'bottom 82%',
              scrub: 0.6,
            },
          }
        );

        gsap.utils.toArray<HTMLElement>('.tl-item').forEach((item, index) => {
          gsap.from(item, {
            opacity: 0,
            x: 48,
            duration: 0.85,
            ease: EASE.out,
            scrollTrigger: { trigger: item, start: 'top 86%', once: true },
          });

          // 条目进入视口中部时点亮自己，并把侧栏的阶段信息切过去
          ScrollTrigger.create({
            trigger: item,
            start: 'top 62%',
            end: 'bottom 62%',
            toggleClass: { targets: item, className: 'is-active' },
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          });
        });
      });

      // 侧栏钉住：pinSpacing 关掉，否则会在网格里挤出一段空白
      mm.add(MEDIA.desktop, () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 20%',
          end: 'bottom 80%',
          pin: asideRef.current,
          pinSpacing: false,
        });
      });

      mm.add(MEDIA.reduced, () => {
        gsap.set('.timeline__draw', { drawSVG: '0% 100%' });
        gsap.utils
          .toArray<HTMLElement>('.tl-item')
          .forEach((item) => item.classList.add('is-active'));
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        gsap.from(
          '.timeline__aside-period, .timeline__aside-company, .timeline__aside-count',
          {
            y: 16,
            opacity: 0,
            duration: 0.42,
            stagger: 0.05,
            ease: EASE.out,
          }
        );
      });
      return () => mm.revert();
    },
    { scope: asideRef, dependencies: [active] }
  );

  const current = experiences[active];

  return (
    <div ref={rootRef}>
      <Section id="experience" index="03" title="工作经历">
        <div className="timeline" ref={containerRef}>
          <div className="timeline__col">
            <div className="timeline__aside" ref={asideRef}>
              <span className="timeline__aside-label">当前阶段</span>
              <p className="timeline__aside-period grad-text">
                {current.period}
              </p>
              <p className="timeline__aside-company">{current.company}</p>
              <p className="timeline__aside-count">
                {pad(active + 1)} <span>/ {pad(experiences.length)}</span>
              </p>
            </div>
          </div>

          <div className="timeline__main" ref={mainRef}>
            <svg
              className="timeline__line"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line className="timeline__track" x1="1" y1="0" x2="1" y2="100" />
              <line className="timeline__draw" x1="1" y1="0" x2="1" y2="100" />
            </svg>

            {experiences.map((item) => (
              <article className="tl-item" key={`${item.company}-${item.period}`}>
                <span className="tl-item__dot" aria-hidden="true" />
                <p className="tl-item__period">{item.period}</p>
                <h3 className="tl-item__role">
                  {item.role}
                  <span className="tl-item__at"> @ {item.company}</span>
                </h3>
                <ul className="tl-item__points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <ul className="tl-item__tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
