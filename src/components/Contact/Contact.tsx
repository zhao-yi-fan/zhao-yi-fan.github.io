import { useCallback, useEffect, useRef, useState } from 'react';
import { EASE, gsap, MEDIA, useGSAP } from '../../lib/gsap';
import { copyText } from '../../lib/clipboard';
import { profile } from '../../data/resume';
import { AnimatedText } from '../common/AnimatedText';
import { MagneticLink } from '../common/MagneticLink';
import { GithubMark } from '../common/icons';
import './Contact.css';

const channels = [
  { label: 'GitHub', value: `github.com/${profile.githubHandle}`, href: profile.github, external: true },
  { label: '邮箱', value: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: '博客', value: profile.blog.replace('https://', ''), href: profile.blog, external: true },
  { label: '主站', value: profile.site.replace('https://', ''), href: profile.site, external: true },
];

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  /**
   * mailto: 只是把请求交给系统默认邮件客户端，没配客户端的人点了会毫无反应。
   * 所以点击时顺手把地址复制到剪贴板：有客户端的照常唤起，没有的也拿得到地址。
   */
  const copyEmail = useCallback(async () => {
    try {
      await copyText(profile.email);
      setCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // 复制失败就沉默，交给 mailto 的默认行为，不要弹错误干扰访客
    }
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        gsap.fromTo(
          '.contact__title',
          { scale: 1.22 },
          {
            scale: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: '.contact',
              start: 'top 88%',
              end: 'top 32%',
              scrub: 0.5,
            },
          }
        );

        gsap.from('.contact__row', {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.08,
          ease: EASE.out,
          scrollTrigger: { trigger: '.contact__list', start: 'top 88%', once: true },
        });

        gsap.from('.contact__actions > *', {
          opacity: 0,
          y: 26,
          duration: 0.7,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: { trigger: '.contact__actions', start: 'top 92%', once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section className="contact" id="contact" ref={rootRef}>
      <div className="contact__glow" aria-hidden="true" />

      <div className="contact__inner">
        <span className="contact__index">06</span>
          <AnimatedText
            as="h2"
            className="contact__title"
            text="一起做点东西"
            unit="chars"
            tone="punch"
          />
        <p className="contact__lead">
          正在寻找前端方向的机会，也欢迎交流技术、聊聊开源。
        </p>

        <div className="contact__actions">
          <MagneticLink href={profile.github} external className="btn btn--primary">
            <GithubMark />
            <span>逛逛我的 GitHub</span>
          </MagneticLink>
          <MagneticLink
            href={`mailto:${profile.email}`}
            className="btn"
            onClick={copyEmail}
            ariaLabel={`发邮件给我，邮箱地址 ${profile.email}`}
          >
            {/* 两个文案都是 5 个汉字，切换时按钮宽度不变，不会把旁边的按钮挤动 */}
            <span>{copied ? '邮箱已复制' : '发邮件给我'}</span>
          </MagneticLink>
        </div>

        {/* 按钮文案的变化读屏软件不一定播报，单独留一个 live region */}
        <p className="sr-only" role="status" aria-live="polite">
          {copied ? `邮箱地址 ${profile.email} 已复制到剪贴板` : ''}
        </p>

        <ul className="contact__list">
          {channels.map((channel) => (
            <li className="contact__row" key={channel.label}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                <span className="contact__label">{channel.label}</span>
                <span className="contact__value">{channel.value}</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="contact__footer">
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </footer>
      </div>
    </section>
  );
}
