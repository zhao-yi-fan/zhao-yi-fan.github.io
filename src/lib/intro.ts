import { ScrollTrigger } from './gsap';

/**
 * 开场幕布和首屏进场的同步闸门。
 *
 * Hero 的 SplitText 如果在幕布盖着时就播完，揭开后只剩静态终态。
 * 各方在这里排队：幕布开始抽离时放行，超时则强制放行，避免 JS 异常把首页卡住。
 */
const FAILSAFE_MS = 2800;

let settled = false;
const waiters: Array<() => void> = [];
let failsafe: number | undefined;

export function onIntroReady(callback: () => void): () => void {
  if (settled) {
    callback();
    return () => undefined;
  }

  waiters.push(callback);
  return () => {
    const index = waiters.indexOf(callback);
    if (index >= 0) waiters.splice(index, 1);
  };
}

export function markIntroDone() {
  if (settled) return;
  settled = true;
  if (failsafe !== undefined) window.clearTimeout(failsafe);
  document.documentElement.classList.remove('is-intro');
  waiters.splice(0).forEach((fn) => fn());
  // 开场期间锁了 overflow，滚动条回来后视口宽度会变，pin 的起止要重算
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

if (typeof window !== 'undefined') {
  failsafe = window.setTimeout(markIntroDone, FAILSAFE_MS);
}
