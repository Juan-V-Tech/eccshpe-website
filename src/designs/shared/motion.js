// Shared animation setup for the redesigned sites.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

// The active Lenis instance (null when smooth scrolling is off).
let lenisInstance = null;
export const setLenis = (lenis) => {
  lenisInstance = lenis;
};
export const getLenis = () => lenisInstance;

// Stop page scrolling (for full-screen menus) and start it again.
export const lockScroll = (locked) => {
  if (lenisInstance) {
    if (locked) lenisInstance.stop();
    else lenisInstance.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
};

export const scrollToTarget = (target, options = {}) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -80, duration: 1.2, ...options });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else target?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
};

// Scroll-in presets used by [data-reveal="..."] (see useReveal).
export const REVEALS = {
  up: { from: { y: 48, autoAlpha: 0 }, to: { y: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out' } },
  fade: { from: { autoAlpha: 0 }, to: { autoAlpha: 1, duration: 1.2, ease: 'power2.out' } },
  left: { from: { x: -56, autoAlpha: 0 }, to: { x: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out' } },
  right: { from: { x: 56, autoAlpha: 0 }, to: { x: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out' } },
  scale: { from: { scale: 0.92, autoAlpha: 0 }, to: { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'expo.out' } },
  clip: {
    from: { clipPath: 'inset(0% 0% 100% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' },
  },
  wipe: {
    from: { clipPath: 'inset(0% 100% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' },
  },
  line: { from: { scaleX: 0, transformOrigin: '0% 50%' }, to: { scaleX: 1, duration: 1.4, ease: 'expo.inOut' } },
};
