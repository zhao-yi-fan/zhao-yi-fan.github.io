import { useRef } from 'react';
import { EASE, gsap, MEDIA, useGSAP } from '../../lib/gsap';
import { projects } from '../../data/resume';
import { AnimatedText } from '../common/AnimatedText';
import { ArrowIcon } from '../common/icons';
import './Projects.css';

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const mm = gsap.matchMedia();

      /**
       * 横向滚动只在桌面端且允许动效时开启，并且由 JS 加类名来切换布局。
       * 布局默认是竖向网格，这样在不启用 pin 的环境（移动端、减少动效、JS 出错）
       * 里卡片始终是可读可点的，不会出现横向溢出却滚不动的死角。
       */
      mm.add(MEDIA.desktop, () => {
        container.classList.add('is-horizontal');

        /** 卡片需要横向移动的距离 */
        const distance = () => track.scrollWidth - track.clientWidth;

        /**
         * 钉住区间要明显长于横向距离，否则滚一两格就走完并立刻解除钉住，
         * 体感上就成了"横向还没滚完页面就开始纵向滚"。
         * 拉长之后卡片推进得比滚动慢，钉住的感觉才成立；
         * 同时保证至少钉住一屏，卡片少的时候也不会一闪而过。
         */
        const scrollLength = () =>
          Math.max(distance() * 1.6, window.innerHeight);

        if (distance() <= 0) {
          return () => container.classList.remove('is-horizontal');
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollLength()}`,
            pin: true,
            // 缓冲太长会让卡片在解除钉住后还在滑，0.5 足够跟手又不拖尾
            scrub: 0.5,
            anticipatePin: 1,
            // 窗口尺寸变化后重新测量，否则 end 会停留在旧的距离上
            invalidateOnRefresh: true,
          },
        });

        tl.to(track, { x: () => -distance(), ease: 'none' }, 0).to(
          '.projects__bar',
          { scaleX: 1, ease: 'none' },
          0
        );

        return () => container.classList.remove('is-horizontal');
      });

      // 卡片跟随光标做轻微 3D 倾斜
      mm.add(MEDIA.desktop, () => {
        const cleanups = gsap.utils
          .toArray<HTMLElement>('.pcard')
          .map((card) => {
            gsap.set(card, { transformPerspective: 900 });
            const link = card.querySelector<HTMLElement>('.pcard__link');

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
              rotY(px * 14);
              rotX(-py * 14);
              if (link) {
                link.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
                link.style.setProperty('--my', `${(py + 0.5) * 100}%`);
              }
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

      // 移动端：竖向逐个进场
      mm.add(MEDIA.mobile, () => {
        gsap.from('.pcard', {
          opacity: 0,
          y: 48,
          duration: 0.8,
          stagger: 0.12,
          ease: EASE.out,
          scrollTrigger: { trigger: track, start: 'top 85%', once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section className="projects" id="projects" ref={containerRef}>
      <div className="projects__viewport">
        <header className="projects__head">
          <span className="projects__index">04</span>
          <AnimatedText
            as="h2"
            className="projects__title"
            text="项目"
            unit="chars"
            tone="punch"
          />
          <p className="projects__caption">
            近期任职项目默认不外链。能公开访问的，卡片可以点进去。
          </p>
          <div className="projects__progress" aria-hidden="true">
            <span className="projects__bar" />
          </div>
        </header>

        <div className="projects__stage">
          <ul className="projects__track" ref={trackRef}>
            {projects.map((project, index) => {
              const body = (
                <>
                  <span className="pcard__no">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="pcard__title">{project.title}</h3>
                  <p className="pcard__desc">{project.description}</p>
                  <p className="pcard__detail">{project.detail}</p>
                  <ul className="pcard__tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {project.link ? (
                    <span className="pcard__cta">
                      {project.external ? '访问站点' : '打开子站'}
                      <ArrowIcon />
                    </span>
                  ) : (
                    <span className="pcard__cta pcard__cta--muted">未公开访问</span>
                  )}
                </>
              );

              return (
                <li className="pcard" key={project.title}>
                  {project.link ? (
                    <a
                      className="pcard__link"
                      href={project.link}
                      {...(project.external
                        ? { target: '_blank', rel: 'noreferrer' }
                        : {})}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="pcard__link pcard__link--static">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
