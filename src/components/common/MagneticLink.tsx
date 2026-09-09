// React 的 MouseEvent 用别名导入，避免遮蔽下面 addEventListener 需要的全局 DOM MouseEvent
import { MouseEvent as ReactMouseEvent, ReactNode, useRef } from 'react';
import { gsap, MEDIA, useGSAP } from '../../lib/gsap';
import { handleAnchorClick } from '../../lib/scroll';

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** 站外地址会新开标签页 */
  external?: boolean;
  /** 位移强度，0.2 约为向光标偏移 20% 的距离 */
  strength?: number;
  ariaLabel?: string;
  /** 追加的点击回调，在内置的锚点跳转处理之后执行 */
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}

/**
 * 磁吸链接：光标在按钮上移动时按钮轻微跟随，离开后弹回原位。
 * 只在桌面端且用户未要求减少动效时启用；触屏没有 hover，启用了反而会残留位移。
 */
export function MagneticLink({
  href,
  children,
  className,
  external = false,
  strength = 0.25,
  ariaLabel,
  onClick,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(MEDIA.desktop, () => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

      const onMove = (event: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);

      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => mm.revert();
  });

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        handleAnchorClick(event);
        onClick?.(event);
      }}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
