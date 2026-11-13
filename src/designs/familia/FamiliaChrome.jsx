import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import PillNav from '../../components/reactbits/PillNav/PillNav';
import { CHAPTER, CREDITS, EVENTS } from '../../data/content';
import { BRAND, CHAPTER_EMAIL, NAV_ITEMS, SOCIAL_LINKS } from '../../data/site';
import Icon from '../shared/Icon';
import { Button } from './FamiliaParts';

const NAV = NAV_ITEMS.filter((item) => item.to !== '/join').map((item) => ({ label: item.label, href: item.to, ariaLabel: item.ariaLabel }));

// Lets PillNav render React Router links.
const RouterLink = ({ href, ref, ...props }) => <Link to={href} ref={ref} {...props} />;

export const FamiliaHeader = () => {
  const { pathname } = useLocation();
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
      className="fx-header"
      data-solid={solid ? '' : undefined}
      data-hidden={hidden ? '' : undefined}
      data-light-page={pathname !== '/' ? '' : undefined}
    >
      <div className="fx-header__inner">
        <Link to="/" className="fx-header__logo" aria-label="SHPE El Camino College home">
          <img src={BRAND.logoWhite} alt="" />
          <img src={BRAND.logo} alt="" />
        </Link>
        <div className="fx-header__nav">
          <PillNav
            items={NAV}
            activeHref={pathname}
            linkComponent={RouterLink}
            theme="light"
            surface="solid"
            layout="joined"
            itemStyle="pill"
            hoverEffect="glide"
            indicator="pill"
            highlightColor="#0070c0"
            highlightTextColor="#ffffff"
            size="md"
            collapse="auto"
            ariaLabel="Primary"
          />
        </div>
        <Button to="/join" className="fx-header__join" icon={null}>
          Join SHPE
        </Button>
      </div>
    </header>
  );
};

export const FamiliaFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="fx-footer">
      <div className="fx-wrap">
        <div className="fx-footer__top">
          <div className="fx-footer__brand">
            <img src={BRAND.logoWhite} alt="SHPE El Camino College" />
            <p>{CHAPTER.tagline}</p>
            <div className="fx-socials">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <Icon name={s.label} size={20} />
                </a>
              ))}
            </div>
          </div>
          <nav className="fx-footer__col" aria-label="Footer">
            <h2>Explore</h2>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="fx-footer__col">
            <h2>Visit</h2>
            <ul>
              <li>{EVENTS.venue}</li>
              <li>{EVENTS.room}</li>
              <li>{CHAPTER.campus}</li>
              <li>{CHAPTER.city}</li>
            </ul>
          </div>
          <div className="fx-footer__col">
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={`mailto:${CHAPTER_EMAIL}`}>{CHAPTER_EMAIL}</a>
              </li>
              <li>
                <Link to="/join">Become a member</Link>
              </li>
              <li>
                <Link to="/events">Upcoming events</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="fx-footer__bar">
          <p>© {year} SHPE @ El Camino College</p>
          {CREDITS.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </footer>
  );
};
