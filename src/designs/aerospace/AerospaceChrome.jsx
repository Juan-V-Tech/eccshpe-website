import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { CHAPTER, CREDITS, EVENTS } from '../../data/content';
import { BRAND, CHAPTER_EMAIL, NAV_ITEMS, SOCIAL_LINKS } from '../../data/site';
import Icon from '../shared/Icon';
import { gsap, lockScroll, prefersReducedMotion, scrollToTarget } from '../shared/motion';
import { Button } from './AerospaceParts';

const HEADER_LINKS = NAV_ITEMS.filter((item) => item.to !== '/' && item.to !== '/join');

const FOOTER_GROUPS = [
  { title: 'Who we are', links: ['/about', '/leadershpe', '/alumni', '/website-team'] },
  { title: 'Get involved', links: ['/events', '/gallery', '/join'] },
];

const navLabel = (to) => NAV_ITEMS.find((item) => item.to === to)?.label;

export const AerospaceHeader = ({ onMenu, menuOpen, burgerRef }) => {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      if (y > last + 4 && y > 400) setHidden(true);
      else if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="ax-header"
      data-solid={solid ? '' : undefined}
      data-hidden={hidden && !menuOpen ? '' : undefined}
    >
      <div className="ax-header__inner">
        <Link to="/" className="ax-header__logo" aria-label="SHPE El Camino College home">
          <img src={BRAND.logoWhite} alt="" />
          <img src={BRAND.logo} alt="" />
        </Link>
        <nav className="ax-header__nav" aria-label="Primary">
          <ul>
            {HEADER_LINKS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button to="/join" className="ax-header__join" icon={null}>
          Join
        </Button>
        <button
          ref={burgerRef}
          type="button"
          className="ax-burger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="ax-drawer"
          onClick={onMenu}
        >
          <span aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>
    </header>
  );
};

export const AerospaceDrawer = ({ open, onClose, burgerRef }) => {
  const ref = useRef(null);
  const closeRef = useRef(null);
  const wasOpen = useRef(false);

  useLayoutEffect(() => {
    const root = ref.current;
    const panel = root.querySelector('.ax-drawer__panel');
    const scrim = root.querySelector('.ax-drawer__scrim');
    const links = root.querySelectorAll('.ax-drawer__list a');
    const instant = prefersReducedMotion() ? 0 : 1;

    if (open) {
      wasOpen.current = true;
      lockScroll(true);
      gsap.set(root, { visibility: 'visible' });
      gsap.to(scrim, { opacity: 1, duration: 0.5 * instant });
      gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.8 * instant, ease: 'expo.out' });
      gsap.fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.8 * instant, stagger: 0.05, delay: 0.15 * instant, ease: 'expo.out' });
      closeRef.current?.focus({ preventScroll: true });
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    lockScroll(false);
    gsap.to(scrim, { opacity: 0, duration: 0.4 * instant });
    gsap.to(panel, {
      xPercent: 100,
      duration: 0.6 * instant,
      ease: 'expo.in',
      onComplete: () => gsap.set(root, { visibility: 'hidden' }),
    });
    burgerRef.current?.focus({ preventScroll: true });
  }, [open, burgerRef]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      id="ax-drawer"
      ref={ref}
      className="ax-drawer"
      data-open={open ? '' : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
    >
      <div className="ax-drawer__scrim" onClick={onClose} aria-hidden="true" />
      <div className="ax-drawer__panel">
        <div className="ax-drawer__top">
          <img src={BRAND.logoWhite} alt="" style={{ height: 30 }} />
          <button ref={closeRef} type="button" className="ax-round-btn" onClick={onClose} aria-label="Close menu">
            <Icon name="close" size={18} />
          </button>
        </div>
        <ul className="ax-drawer__list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end onClick={onClose}>
                {item.label}
                <Icon name="arrowRight" size={20} />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="ax-drawer__foot">
          <a href={`mailto:${CHAPTER_EMAIL}`}>{CHAPTER_EMAIL}</a>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Icon name={s.label} size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AerospaceFooter = () => {
  const markRef = useRef(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const el = markRef.current;
    if (!el || prefersReducedMotion()) return undefined;
    const tween = gsap.fromTo(
      el,
      { '--ax-track': '0.02em', opacity: 0.4 },
      { '--ax-track': '0.16em', opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom 70%', scrub: true } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer className="ax-footer">
      <div className="ax-wrap">
        <div className="ax-footer__top">
          <div className="ax-footer__brand">
            <img src={BRAND.logoWhite} alt="SHPE El Camino College" />
            <p>{CHAPTER.tagline}</p>
            <div>
              <Button to="/join" variant="white">
                Become a member
              </Button>
            </div>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} className="ax-footer__col" aria-label={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((to) => (
                  <li key={to}>
                    <Link to={to}>{navLabel(to)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="ax-footer__col">
            <h2>Connect</h2>
            <ul>
              {SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a className="ax-footer__social" href={s.href} target="_blank" rel="noopener noreferrer">
                    <Icon name={s.label} size={16} /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ax-footer__col">
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={`mailto:${CHAPTER_EMAIL}`}>{CHAPTER_EMAIL}</a>
              </li>
              <li>
                <p>
                  {EVENTS.venue} ({EVENTS.room})
                  <br />
                  {CHAPTER.campus}
                  <br />
                  {CHAPTER.city}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <p ref={markRef} className="ax-footer__mark" aria-hidden="true">
          SHPE · El Camino College
        </p>
        <div className="ax-footer__bar">
          <p>© {year} SHPE @ El Camino College</p>
          {CREDITS.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <button type="button" className="ax-footer__top-btn" onClick={() => scrollToTarget(0)}>
            Back to top <Icon name="arrowUp" size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
