import { ElementType, useRef } from 'react';
import { EASE, gsap, MEDIA, SplitText, useGSAP } from '../../lib/gsap';
import { onIntroReady } from '../../lib/intro';

type SplitUnit = 'chars' | 'words' | 'lines';
type Tone = 'plain' | 'punch';

interface AnimatedTextProps {
  text: string;
  /** 渲染的标签，默认 p，标题处传 h1 / h2 保持语义 */
  as?: ElementType;
  className?: string;
  unit?: SplitUnit;
  delay?: number;
  stagger?: number;
  /** 关掉则挂载即播放，用于首屏；开启则滚动进入视口才播放 */
  scroll?: boolean;
  /**
   * 等开场幕布放行后再播。首屏姓名如果在幕布盖着时播完，
   * 揭开后只剩终态，这个闸门就是为了避免那种空窗。
   */
  awaitIntro?: boolean;
  /** punch：带透视翻转的揭示，比默认的遮罩滑入更冲 */
  tone?: Tone;
}

/**
 * SplitText 遮罩揭示。
 *
 * autoSplit 会在窗口尺寸变化或字体加载完成后自动重新切分，
 * onSplit 里返回的补间会被 SplitText 接管，重新切分时自动清理，避免动画叠加。
 */
export function AnimatedText({
  text,
  as: Tag = 'p',
  className,
  unit = 'lines',
  delay = 0,
  stagger,
  scroll = true,
  awaitIntro = false,
  tone = 'plain',
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        let split: ReturnType<typeof SplitText.create> | undefined;
        let cancelled = false;

        const play = () => {
          if (cancelled || !el) return;
          split = SplitText.create(el, {
            type: unit,
            mask: unit,
            autoSplit: true,
            aria: 'auto',
            onSplit: (self) => {
              const fromVars =
                tone === 'punch'
                  ? {
                      yPercent: 130,
                      rotateX: 72,
                      opacity: 0,
                      transformOrigin: '50% 100%',
                    }
                  : { yPercent: 115, opacity: 0 };

              return gsap.from(self[unit], {
                ...fromVars,
                duration: tone === 'punch' ? 1.05 : 0.9,
                delay,
                ease: EASE.expo,
                stagger: stagger ?? (unit === 'chars' ? 0.025 : 0.09),
                scrollTrigger: scroll
                  ? { trigger: el, start: 'top 88%', once: true }
                  : undefined,
              });
            },
          });
        };

        const stopWaiting = awaitIntro
          ? onIntroReady(play)
          : (play(), () => undefined);

        return () => {
          cancelled = true;
          stopWaiting();
          split?.revert();
        };
      });

      // 降级分支：不切分、不位移，内容直接可见
      mm.add(MEDIA.reduced, () => {
        gsap.set(el, { opacity: 1 });
      });

      return () => mm.revert();
    },
    { dependencies: [text, unit, tone, awaitIntro], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
