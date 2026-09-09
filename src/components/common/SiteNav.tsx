import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { handleAnchorClick } from '../../lib/scroll';
import { sections } from '../../data/resume';
import './SiteNav.css';

/** 顶部整页滚动进度条 + 右侧章节锚点。锚点在窄屏隐藏，避免遮挡内容。 */
export function SiteNav() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>('');

  useGSAP(
    () => {
      gsap.to('.nav__bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      // 章节滚过视口中线时高亮对应锚点
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive) setActive(section.id);
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <div className="nav__progress" aria-hidden="true">
        <span className="nav__bar" />
      </div>

      <nav className="nav__anchors" aria-label="章节导航">
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={active === section.id ? 'is-active' : undefined}
                aria-current={active === section.id ? 'true' : undefined}
                onClick={handleAnchorClick}
              >
                <span className="nav__label">{section.label}</span>
                <span className="nav__dot" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
