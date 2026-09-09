import { useRef } from 'react';
import { EASE, gsap, MEDIA, useGSAP } from '../../lib/gsap';
import { personalProjects } from '../../data/resume';
import { Section } from '../common/Section';
import { ArrowIcon } from '../common/icons';
import './Personal.css';

export function Personal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        gsap.from('.work', {
          opacity: 0,
          y: 36,
          duration: 0.75,
          stagger: 0.08,
          ease: EASE.out,
          scrollTrigger: { trigger: '.works', start: 'top 84%', once: true },
        });
      });

      mm.add(MEDIA.desktop, () => {
        const cleanups = gsap.utils
          .toArray<HTMLElement>('.work')
          .map((card) => {
            gsap.set(card, { transformPerspective: 900 });
            const rotX = gsap.quickTo(card, 'rotationX', {
              duration: 0.5,
              ease: 'power3',
            });
            const rotY = gsap.quickTo(card, 'rotationY', {
              duration: 0.5,
              ease: 'power3',
            });

            const onMove = (event: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width - 0.5;
              const py = (event.clientY - rect.top) / rect.height - 0.5;
              rotY(px * 10);
              rotX(-py * 10);
              card.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
              card.style.setProperty('--my', `${(py + 0.5) * 100}%`);
            };
            const onLeave = () => {
              rotX(0);
              rotY(0);
            };

            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
            return () => {
              card.removeEventListener('mousemove', onMove);
              card.removeEventListener('mouseleave', onLeave);
            };
          });

        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Section id="works" index="05" title="作品">
        <ul className="works">
          {personalProjects.map((item) => (
            <li className="work" key={item.title}>
              <a
                className="work__link"
                href={item.link}
                {...(item.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                <h3 className="work__title">{item.title}</h3>
                <p className="work__meta">{item.description}</p>
                <p className="work__detail">{item.detail}</p>
                <p className="work__tags">{item.tags.join(' · ')}</p>
                <span className="work__cta">
                  打开
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
