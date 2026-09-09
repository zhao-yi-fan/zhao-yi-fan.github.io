import { MouseEvent } from 'react';
import { EASE, gsap, MEDIA } from './gsap';

/**
 * 锚点跳转统一走 ScrollToPlugin，而不是 CSS 的 scroll-behavior: smooth。
 * 原生平滑滚动会和 ScrollTrigger 的 pin 互相干扰：滚动位置由浏览器持续改写时，
 * 钉住区间的进度算不准，表现为跳动和错位。GSAP 自己驱动滚动就没这个问题。
 *
 * 返回 true 表示已接管这次跳转，调用方应阻止默认行为。
 */
export function scrollToAnchor(href: string): boolean {
  if (!href.startsWith('#')) return false;

  const target = document.getElementById(href.slice(1));
  if (!target) return false;

  const reduced = window.matchMedia(MEDIA.reduced).matches;
  gsap.to(window, {
    duration: reduced ? 0 : 1,
    ease: EASE.inOut,
    scrollTo: { y: target, autoKill: true },
  });

  return true;
}

/** 供 onClick 直接使用：命中锚点时接管滚动并阻止默认跳转 */
export function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href') ?? '';
  if (scrollToAnchor(href)) {
    event.preventDefault();
  }
}
