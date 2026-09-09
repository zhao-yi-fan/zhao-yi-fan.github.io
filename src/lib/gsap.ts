import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  ScrollToPlugin,
  useGSAP
);

/**
 * matchMedia 的三个分支互斥，切换断点时 GSAP 会自动清理并重建对应分支的动画。
 * reduced 分支优先级最高，命中时只做透明度过渡，不做任何位移与 pin。
 */
export const MEDIA = {
  desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 899px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const;

export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
  /** 开场幕布那种“先慢后抽”的抽离感 */
  curtain: 'power4.inOut',
} as const;

export {
  gsap,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  ScrollToPlugin,
  useGSAP,
};
