import { useRef } from 'react';
import { EASE, gsap, MEDIA, useGSAP } from '../../lib/gsap';
import { skillGroups } from '../../data/resume';
import { Section } from '../common/Section';
import './Skills.css';

export function Skills() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        gsap.from('.skills__group', {
          opacity: 0,
          y: 48,
          duration: 0.85,
          stagger: 0.12,
          ease: EASE.out,
          scrollTrigger: { trigger: '.skills', start: 'top 82%', once: true },
        });

        // 能力条跟随滚动进度增长，滚回去会收回，符合 scrub 的直觉
        gsap.utils.toArray<HTMLElement>('.skill').forEach((row) => {
          const fill = row.querySelector('.skill__fill');
          const levelEl = row.querySelector<HTMLElement>('.skill__level');
          const level = Number(row.dataset.level);

          gsap.fromTo(
            fill,
            { scaleX: 0 },
            {
              scaleX: level / 100,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top 92%',
                end: 'top 58%',
                scrub: true,
              },
            }
          );

          if (levelEl) {
            gsap.fromTo(
              levelEl,
              { textContent: 0 },
              {
                textContent: level,
                snap: { textContent: 1 },
                ease: 'none',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 92%',
                  end: 'top 58%',
                  scrub: true,
                },
              }
            );
          }
        });
      });

      mm.add(MEDIA.reduced, () => {
        gsap.utils.toArray<HTMLElement>('.skill').forEach((row) => {
          const level = Number(row.dataset.level);
          gsap.set(row.querySelector('.skill__fill'), {
            scaleX: level / 100,
          });
          const levelEl = row.querySelector<HTMLElement>('.skill__level');
          if (levelEl) levelEl.textContent = String(level);
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Section
        id="skills"
        index="02"
        title="技能"
        caption="按使用频率排序，进度条只表示自评熟练度，不代表全部边界。"
      >
        <div className="skills">
          {skillGroups.map((group) => (
            <article className="skills__group" key={group.title}>
              <header className="skills__head">
                <h3 className="skills__title">{group.title}</h3>
                <p className="skills__caption">{group.caption}</p>
              </header>

              <ul className="skills__list">
                {group.items.map((item) => (
                  <li className="skill" key={item.name} data-level={item.level}>
                    <div className="skill__meta">
                      <span className="skill__name">{item.name}</span>
                      <span className="skill__level">0</span>
                    </div>
                    <div className="skill__track">
                      <span className="skill__fill" />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
