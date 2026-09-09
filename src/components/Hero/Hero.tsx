import { useRef } from 'react';
import { EASE, gsap, MEDIA, useGSAP } from '../../lib/gsap';
import { onIntroReady } from '../../lib/intro';
import { profile, skillGroups } from '../../data/resume';
import { AnimatedText } from '../common/AnimatedText';
import { MagneticLink } from '../common/MagneticLink';
import { GithubMark } from '../common/icons';
import './Hero.css';

const marqueeWords = skillGroups.flatMap((group) =>
  group.items.map((item) => item.name)
);

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        let cancelled = false;

        const stopWaiting = onIntroReady(() => {
          if (cancelled) return;

          const tl = gsap.timeline({ defaults: { ease: EASE.out } });

          tl.from('.hero__eyebrow', { opacity: 0, y: 18, duration: 0.7 })
            .from(
              '.hero__actions > *',
              { opacity: 0, y: 26, duration: 0.7, stagger: 0.09 },
              0.7
            )
            .from('.hero__links li', { opacity: 0, y: 16, stagger: 0.07 }, 0.9)
            .from('.hero__hint', { opacity: 0, duration: 0.6 }, 1.2)
            .from('.hero__marquee', { opacity: 0, duration: 0.8 }, 0.4);

          gsap.fromTo(
            '.hero__grid',
            { scale: 1.12, opacity: 0.35 },
            { scale: 1, opacity: 1, duration: 1.6, ease: EASE.out }
          );
        });

        // 背景光晕缓慢呼吸，给静止的首屏一点生命感
        gsap.to('.hero__glow', {
          scale: 1.22,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 1.5, from: 'random' },
        });

        // 滚动离开首屏时整块内容上移淡出，姓名额外放大一点制造纵深
        gsap.to('.hero__content', {
          opacity: 0,
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to('.hero__name', {
          scale: 1.12,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to('.hero__marquee', {
          y: 80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '60% top',
            scrub: true,
          },
        });

        // 滚动提示先于内容消失
        gsap.to('.hero__hint', {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '15% top',
            scrub: true,
          },
        });

        return () => {
          cancelled = true;
          stopWaiting();
        };
      });

      // 鼠标视差：两层光晕反向位移，网格轻微跟随，聚光贴着指针
      mm.add(MEDIA.desktop, () => {
        const glowX = gsap.quickTo('.hero__glow--a', 'xPercent', {
          duration: 1.1,
          ease: 'power3',
        });
        const glowY = gsap.quickTo('.hero__glow--a', 'yPercent', {
          duration: 1.1,
          ease: 'power3',
        });
        const glowX2 = gsap.quickTo('.hero__glow--b', 'xPercent', {
          duration: 1.4,
          ease: 'power3',
        });
        const glowY2 = gsap.quickTo('.hero__glow--b', 'yPercent', {
          duration: 1.4,
          ease: 'power3',
        });
        const gridX = gsap.quickTo('.hero__grid', 'x', {
          duration: 1.2,
          ease: 'power3',
        });
        const gridY = gsap.quickTo('.hero__grid', 'y', {
          duration: 1.2,
          ease: 'power3',
        });
        const spotX = gsap.quickTo('.hero__spot', 'x', {
          duration: 0.55,
          ease: 'power3',
        });
        const spotY = gsap.quickTo('.hero__spot', 'y', {
          duration: 0.55,
          ease: 'power3',
        });

        const onMove = (event: MouseEvent) => {
          const root = rootRef.current;
          if (!root) return;
          const rect = root.getBoundingClientRect();
          // 归一化到 -0.5 ~ 0.5，避免依赖具体分辨率
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          glowX(nx * 22);
          glowY(ny * 22);
          glowX2(nx * -18);
          glowY2(ny * -18);
          gridX(nx * -28);
          gridY(ny * -28);
          spotX(event.clientX - rect.left);
          spotY(event.clientY - rect.top);
        };

        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <header className="hero" ref={rootRef}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__spot" />
        <div className="hero__vignette" />
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {[0, 1].map((copy) => (
            <p className="hero__marquee-copy" key={copy}>
              {marqueeWords.map((word) => (
                <span key={`${copy}-${word}`}>{word}</span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">
          <span className="hero__dot" />
          {profile.title} · {profile.location}
        </p>

        <AnimatedText
          as="h1"
          className="hero__name"
          text={profile.name}
          unit="chars"
          scroll={false}
          awaitIntro
          tone="punch"
          delay={0.08}
          stagger={0.06}
        />

        <AnimatedText
          className="hero__tagline"
          text={profile.tagline}
          unit="words"
          scroll={false}
          awaitIntro
          delay={0.48}
        />

        <div className="hero__actions">
          <MagneticLink
            href={profile.github}
            external
            className="btn btn--primary"
          >
            <GithubMark />
            <span>GitHub 主页</span>
          </MagneticLink>
          <MagneticLink href="#projects" className="btn">
            <span>看我的项目</span>
          </MagneticLink>
        </div>

        <ul className="hero__links">
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer">
              github.com/{profile.githubHandle}
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <a href={profile.blog} target="_blank" rel="noreferrer">
              {profile.blog.replace('https://', '')}
            </a>
          </li>
        </ul>
      </div>

      <div className="hero__hint">
        <span className="hero__hint-line" />
        向下滚动
      </div>
    </header>
  );
}
