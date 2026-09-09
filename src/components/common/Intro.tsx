import { useRef } from 'react';
import { EASE, gsap, MEDIA, SplitText, useGSAP } from '../../lib/gsap';
import { markIntroDone } from '../../lib/intro';
import { profile } from '../../data/resume';
import './Intro.css';

/**
 * 首屏开场：深色幕布对开，露出浅色站点。
 * 这是整站唯一一段深色，用来制造进入反差；减少动效时直接跳过，不挡内容。
 */
export function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.reduced, () => {
        gsap.set(root, { autoAlpha: 0 });
        markIntroDone();
      });

      mm.add(MEDIA.motion, () => {
        document.documentElement.classList.add('is-intro');
        gsap.set(root, { autoAlpha: 1, pointerEvents: 'auto' });

        const split = SplitText.create('.intro__name', {
          type: 'chars',
          mask: 'chars',
          aria: 'hidden',
        });

        const tl = gsap.timeline({
          defaults: { ease: EASE.expo },
          onComplete: () => {
            gsap.set(root, { autoAlpha: 0, pointerEvents: 'none' });
          },
        });

        tl.from(split.chars, {
          yPercent: 130,
          rotateX: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
          transformOrigin: '50% 100%',
        })
          .from(
            '.intro__rule',
            { scaleX: 0, duration: 0.45, ease: EASE.inOut },
            0.28
          )
          .to('.intro__brand', { opacity: 0, y: -16, duration: 0.32 }, 0.92)
          // 幕布开始抽离的瞬间放行首屏，揭开过程中姓名正在入场
          .add(markIntroDone, 1.02)
          .to(
            '.intro__panel--top',
            { yPercent: -101, duration: 0.9, ease: EASE.curtain },
            1.05
          )
          .to(
            '.intro__panel--bottom',
            { yPercent: 101, duration: 0.9, ease: EASE.curtain },
            1.05
          );

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div className="intro" ref={rootRef} aria-hidden="true">
      <div className="intro__panel intro__panel--top" />
      <div className="intro__panel intro__panel--bottom" />
      <div className="intro__brand">
        <p className="intro__name">{profile.name}</p>
        <span className="intro__rule" />
      </div>
    </div>
  );
}
