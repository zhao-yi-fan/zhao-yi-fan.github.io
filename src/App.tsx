import { ScrollTrigger, useGSAP } from './lib/gsap';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Hero } from './components/Hero/Hero';
import { Personal } from './components/Personal/Personal';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { Timeline } from './components/Timeline/Timeline';
import { Cursor } from './components/common/Cursor';
import { Intro } from './components/common/Intro';
import { SiteNav } from './components/common/SiteNav';

function App() {
  useGSAP(() => {
    /**
     * 字体加载完成后元素高度会变，pin 的起止位置是挂载时算出来的，
     * 不刷新就会出现钉住位置偏移。document.fonts 在目标浏览器均可用，
     * 这里仍做一次存在性判断，避免个别环境缺失时报错。
     */
    if (!document.fonts) return;

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
    };
  });

  return (
    <>
      <Intro />
      <Cursor />
      <SiteNav />
      <Hero />
      <main>
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <Personal />
        <Contact />
      </main>
    </>
  );
}

export default App;
