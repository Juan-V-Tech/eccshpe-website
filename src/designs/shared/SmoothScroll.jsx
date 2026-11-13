import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { getLenis, gsap, prefersReducedMotion, ScrollTrigger, scrollToTarget, setLenis } from './motion';

// Lenis smooth scrolling wired into GSAP's ticker, plus route housekeeping:
// scroll to the top (or to #hash) on navigation and move focus to <main>.
const SmoothScroll = ({ lerp = 0.1 }) => {
  const { pathname, hash } = useLocation();
  const firstRoute = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const lenis = new Lenis({ lerp, smoothWheel: true });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      setLenis(null);
    };
  }, [lerp]);

  // Lazy images change the page height; keep scroll-triggered animations in sync.
  useEffect(() => {
    let timer;
    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useLayoutEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    if (!firstRoute.current) document.getElementById('main')?.focus({ preventScroll: true });
    firstRoute.current = false;
  }, [pathname]);

  useEffect(() => {
    if (!hash) return undefined;
    const timer = window.setTimeout(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) scrollToTarget(target);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default SmoothScroll;
