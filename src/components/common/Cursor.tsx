import { useRef } from 'react';
import { gsap, MEDIA, useGSAP } from '../../lib/gsap';
import './Cursor.css';

const HOVER_SELECTOR = 'a, button, .btn, .about__stat';

/**
 * 桌面端装饰光标：内点贴手，外环带一点惯性。
 * 原生指针藏掉，避免双光标；触屏和减少动效分支不渲染。
 */
export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.desktop, () => {
        const ring = root.querySelector<HTMLElement>('.cursor__ring');
        const dot = root.querySelector<HTMLElement>('.cursor__dot');
        if (!ring || !dot) return;

        document.documentElement.classList.add('has-custom-cursor');
        gsap.set(root, { autoAlpha: 1 });

        const ringX = gsap.quickTo(ring, 'x', { duration: 0.38, ease: 'power3' });
        const ringY = gsap.quickTo(ring, 'y', { duration: 0.38, ease: 'power3' });
        const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
        const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });

        const onMove = (event: MouseEvent) => {
          ringX(event.clientX);
          ringY(event.clientY);
          dotX(event.clientX);
          dotY(event.clientY);
        };

        const onOver = (event: MouseEvent) => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          const hovering = Boolean(target.closest(HOVER_SELECTOR));
          gsap.to(ring, {
            scale: hovering ? 1.75 : 1,
            duration: 0.28,
            ease: 'power3',
          });
          gsap.to(dot, { opacity: hovering ? 0 : 1, duration: 0.18 });
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);

        return () => {
          document.documentElement.classList.remove('has-custom-cursor');
          window.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseover', onOver);
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true">
      <div className="cursor__ring" />
      <div className="cursor__dot" />
    </div>
  );
}
