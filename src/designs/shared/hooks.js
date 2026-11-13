import { useEffect, useLayoutEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { gsap, prefersReducedMotion, REVEALS } from './motion';

const SITE_TITLE = 'SHPE El Camino College';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  }, [title]);
};

// Load a Google Fonts stylesheet once.
export const useGoogleFonts = (href) => {
  useEffect(() => {
    if ([...document.head.querySelectorAll('link[data-design-font]')].some((l) => l.href === href)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.designFont = '';
    document.head.appendChild(link);
  }, [href]);
};

const reducedQuery = () => window.matchMedia('(prefers-reduced-motion: reduce)');
const subscribeReduced = (callback) => {
  const query = reducedQuery();
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};

export const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribeReduced, () => reducedQuery().matches, () => false);

// A ticking clock in the chapter's time zone, e.g. "14:05:09".
export const useClock = (timeZone = 'America/Los_Angeles') => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const format = useMemo(
    () => new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
    [timeZone],
  );
  return format.format(now);
};

// Animate every [data-reveal] element inside `scopeRef` as it scrolls into view.
// data-reveal="up|fade|left|right|scale|clip|wipe|line"
// data-reveal-delay="0.2" adds a delay in seconds.
// data-reveal-start="top bottom" changes when it fires (use for hero content).
// [data-reveal-group] staggers its direct children with the group's preset.
export const useReveal = (scopeRef) => {
  useLayoutEffect(() => {
    const root = scopeRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]', root).forEach((el) => {
        const preset = REVEALS[el.dataset.reveal] ?? REVEALS.up;
        gsap.fromTo(el, preset.from, {
          ...preset.to,
          delay: Number(el.dataset.revealDelay || 0),
          scrollTrigger: { trigger: el, start: el.dataset.revealStart || 'top 92%', once: true },
        });
      });

      gsap.utils.toArray('[data-reveal-group]', root).forEach((group) => {
        const preset = REVEALS[group.dataset.revealGroup] ?? REVEALS.up;
        gsap.fromTo(group.children, preset.from, {
          ...preset.to,
          delay: Number(group.dataset.revealDelay || 0),
          stagger: Number(group.dataset.revealStagger || 0.08),
          scrollTrigger: { trigger: group, start: group.dataset.revealStart || 'top 92%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scopeRef]);
};
