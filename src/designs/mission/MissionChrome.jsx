import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import FlowingMenu from '../../components/reactbits/FlowingMenu/FlowingMenu';
import { CHAPTER, CREDITS, EVENTS } from '../../data/content';
import { BRAND, CHAPTER_EMAIL, NAV_ITEMS, SOCIAL_LINKS } from '../../data/site';
import Icon from '../shared/Icon';
import { gsap, lockScroll, prefersReducedMotion, ScrollTrigger, scrollToTarget } from '../shared/motion';
import { Button, Clock, Label } from './MissionParts';

const HEADER_LINKS = NAV_ITEMS.filter((item) => item.to !== '/' && item.to !== '/join');

// Photo shown in each menu row's marquee band.
const MENU_IMAGES = {
  '/': '/images/gallery/2026-spring-general-meeting-2/photo-02.jpg',
  '/about': '/images/gallery/2026-spring-ucla-soles-matlab-workshop/photo-01.jpg',
  '/leadershpe': '/images/gallery/2026-class-of-2026/destiny-munguia-and-miguel-gonzalez.jpg',
  '/website-team': '/images/gallery/2026-spring-jet-engine-design/photo-05.jpg',
  '/events': '/images/gallery/2026-spring-general-meeting-2/photo-01.jpg',
  '/gallery': '/images/gallery/2026-spring-jet-engine-design/photo-04.jpg',
  '/alumni': '/images/gallery/2026-class-of-2026/juan-ventura-romero.jpg',
  '/join': '/images/gallery/2026-spring-ucla-soles-matlab-workshop/photo-03.jpg',
};

const routeLabel = (pathname) => NAV_ITEMS.find((item) => item.to === pathname)?.label ?? 'Not found';

export const MissionHeader = ({ menuOpen, onMenu, toggleRef }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > last + 4 && y > 260) setHidden(true);
      else if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="mx-header"
      data-scrolled={scrolled ? '' : undefined}
      data-hidden={hidden && !menuOpen ? '' : undefined}
    >
      <div className="mx-header__inner">
        <Link to="/" className="mx-header__logo" aria-label="SHPE El Camino College home">
          <img src={BRAND.logoWhite} alt="" />
        </Link>

        <nav className="mx-header__nav" aria-label="Primary">
          <ul>
            {HEADER_LINKS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end className="mx-header__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-header__actions">
          <Button to="/join" variant="solid" size="sm" icon="arrowUpRight">
            Join
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="mx-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mx-menu"
            onClick={onMenu}
          >
            Menu
            <span className="mx-menu-btn__icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

// Full-screen menu built on React Bits FlowingMenu.
export const MissionMenu = ({ open, openCount, onClose, toggleRef, skipCurtainRef }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const wasOpen = useRef(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const instant = prefersReducedMotion();

    if (open) {
      wasOpen.current = true;
      lockScroll(true);
      gsap.killTweensOf(panel);
      gsap.set(panel, { visibility: 'visible' });
      gsap.fromTo(
        panel,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: instant ? 0 : 0.85, ease: 'expo.inOut' },
      );
      gsap.fromTo(
        panel.querySelectorAll('[data-menu-fade]'),
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, delay: instant ? 0 : 0.5, ease: 'power3.out' },
      );
      closeRef.current?.focus({ preventScroll: true });
      return;
    }

    if (!wasOpen.current) return;
    wasOpen.current = false;
    lockScroll(false);
    gsap.killTweensOf(panel);
    gsap.to(panel, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: instant ? 0 : 0.8,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.set(panel, { visibility: 'hidden' });
        ScrollTrigger.refresh();
      },
    });
    toggleRef.current?.focus({ preventScroll: true });
  }, [open, toggleRef]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const items = NAV_ITEMS.map((item, i) => ({
    link: item.to,
    text: item.label,
    meta: String(i + 1).padStart(2, '0'),
    image: MENU_IMAGES[item.to],
  }));

  const onItemClick = (item, index, event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
    event.preventDefault();
    if (item.link !== pathname) {
      skipCurtainRef.current = true;
      navigate(item.link);
    }
    onClose();
  };

  return (
    <div
      id="mx-menu"
      ref={panelRef}
      className="mx-menu"
      data-open={open ? '' : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
    >
      <div className="mx-menu__top">
        <Link to="/" className="mx-header__logo" aria-label="SHPE El Camino College home" onClick={onClose} tabIndex={open ? 0 : -1}>
          <img src={BRAND.logoWhite} alt="" style={{ height: 30 }} />
        </Link>
        <button ref={closeRef} type="button" className="mx-menu-btn" onClick={onClose} tabIndex={open ? 0 : -1}>
          Close <Icon name="close" size={14} />
        </button>
      </div>

      <div className="mx-menu__list">
        {open && (
          <FlowingMenu
            key={openCount}
            items={items}
            activeIndex={NAV_ITEMS.findIndex((item) => item.to === pathname)}
            onItemClick={onItemClick}
            textColor="#ecebe7"
            bgColor="#07080a"
            marqueeBgColor="#ecebe7"
            marqueeTextColor="#07080a"
            borderColor="rgba(255, 255, 255, 0.1)"
            align="left"
            showIndex
            showArrow
            imageShape="rounded"
            speed={70}
            ariaLabel="Site pages"
          />
        )}
      </div>

      <div className="mx-menu__bottom">
        <ul className="mx-menu__socials" data-menu-fade="">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.href}>
              <a className="mx-mono" href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mx-mono" data-menu-fade="" style={{ margin: 0 }}>
          {CHAPTER.coordinates} · <Clock />
        </p>
      </div>
    </div>
  );
};

// Wipes up over each new page, showing where you're going.
export const RouteCurtain = ({ skipRef }) => {
  const { pathname } = useLocation();
  const ref = useRef(null);
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return undefined;
    }
    if (skipRef.current) {
      skipRef.current = false;
      return undefined;
    }
    if (prefersReducedMotion()) return undefined;
    const el = ref.current;
    const tl = gsap
      .timeline()
      .set(el, { visibility: 'visible', clipPath: 'inset(0% 0% 0% 0%)' })
      .fromTo(el.firstChild, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.25 })
      .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.85, ease: 'expo.inOut' }, '+=0.15')
      .set(el, { visibility: 'hidden' });
    return () => tl.kill();
  }, [pathname, skipRef]);

  return (
    <div ref={ref} className="mx-curtain" aria-hidden="true">
      <span className="mx-curtain__label">
        <b>→</b> {routeLabel(pathname)}
      </span>
    </div>
  );
};

export const MissionFooter = () => {
  const wordRef = useRef(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const el = wordRef.current;
    if (!el || prefersReducedMotion()) return undefined;
    const tween = gsap.fromTo(
      el,
      { '--mx-fill': '0%', yPercent: 30 },
      {
        '--mx-fill': '100%',
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer className="mx-footer">
      <div className="mx-wrap">
        <div className="mx-footer__cta">
          <div>
            <Label index="//">Next step</Label>
            <p className="mx-display mx-footer__headline">Build with us.</p>
          </div>
          <div className="mx-footer__cta-actions">
            <Button to="/join" variant="solid">Become a member</Button>
            <Button to="/events" icon="calendar">See events</Button>
          </div>
        </div>

        <div className="mx-footer__grid">
          <nav className="mx-footer__col" aria-label="Footer">
            <Label plain>Navigate</Label>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mx-footer__col">
            <Label plain>Connect</Label>
            <ul>
              {SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a className="mx-footer__social" href={s.href} target="_blank" rel="noopener noreferrer">
                    <Icon name={s.label} size={16} /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-footer__col">
            <Label plain>Contact</Label>
            <a href={`mailto:${CHAPTER_EMAIL}`}>{CHAPTER_EMAIL}</a>
            <p>
              {EVENTS.venue} ({EVENTS.room})
              <br />
              {CHAPTER.campus}, {CHAPTER.city}
            </p>
          </div>
          <div className="mx-footer__col">
            <Label plain>Position</Label>
            <p className="mx-mono">{CHAPTER.coordinates}</p>
            <p className="mx-mono">
              <Clock />
            </p>
          </div>
        </div>
      </div>

      <p ref={wordRef} className="mx-footer__wordmark" aria-hidden="true">
        SHPE ECC
      </p>

      <div className="mx-wrap">
        <div className="mx-footer__bar">
          <p className="mx-mono">© {year} SHPE @ El Camino College</p>
          {CREDITS.map((line) => (
            <p key={line} className="mx-mono">
              {line}
            </p>
          ))}
          <button type="button" className="mx-footer__top" onClick={() => scrollToTarget(0)}>
            Back to top <Icon name="arrowUp" size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
