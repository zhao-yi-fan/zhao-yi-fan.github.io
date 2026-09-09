import { useRef } from 'react';
import { EASE, gsap, MEDIA, useGSAP } from '../../lib/gsap';
import { attachShine } from '../../lib/shine';
import { profile, stats } from '../../data/resume';
import { AnimatedText } from '../common/AnimatedText';
import { Section } from '../common/Section';
import './About.css';

export function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        gsap.from('.about__stat', {
          opacity: 0,
          y: 42,
          duration: 0.8,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: {
            trigger: '.about__stats',
            start: 'top 88%',
            once: true,
          },
        });

        // 数字从 0 滚到目标值，snap 保证过程中不出现小数
        gsap.utils.toArray<HTMLElement>('.about__num').forEach((el) => {
          gsap.to(el, {
            textContent: Number(el.dataset.value),
            duration: 1.8,
            ease: EASE.out,
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          });
        });
      });

      mm.add(MEDIA.desktop, () => {
        const cleanups = gsap.utils
          .toArray<HTMLElement>('.about__stat')
          .map((card) => attachShine(card));
        return () => cleanups.forEach((fn) => fn());
      });

      mm.add(MEDIA.reduced, () => {
        // 不做计数动画，直接落到终值
        gsap.utils.toArray<HTMLElement>('.about__num').forEach((el) => {
          el.textContent = el.dataset.value ?? '';
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Section id="about" index="01" title="关于我">
        <div className="about">
          <div className="about__text">
            {profile.intro.map((paragraph) => (
              <AnimatedText
                key={paragraph}
                className="about__para"
                text={paragraph}
              />
            ))}
          </div>

          <ul className="about__stats">
            {stats.map((stat) => (
              <li className="about__stat" key={stat.label}>
                <p className="about__value grad-text">
                  <span className="about__num" data-value={stat.value}>
                    0
                  </span>
                  <span className="about__suffix">{stat.suffix}</span>
                </p>
                <p className="about__label">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
