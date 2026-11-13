import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import CountUp from '../../components/reactbits/CountUp/CountUp';
import DecryptedText from '../../components/reactbits/DecryptedText/DecryptedText';
import { ALL_ALUMNI, UNIVERSITIES } from '../../data/content';
import { albumCover } from '../../data/gallery';
import ExternalLink from '../shared/ExternalLink';
import { useClock } from '../shared/hooks';
import Icon from '../shared/Icon';
import { gsap, prefersReducedMotion } from '../shared/motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#_<>';

const pad = (n, size = 2) => String(n).padStart(size, '0');

// Text that decrypts into place (React Bits DecryptedText).
export const Scramble = ({ text, on = 'view', className = '', ...props }) => (
  <DecryptedText
    text={text}
    animateOn={on}
    sequential
    revealDirection="start"
    speed={26}
    maxIterations={12}
    characters={GLYPHS}
    encryptedClassName="mx-encrypted"
    parentClassName={className}
    {...props}
  />
);

export const Label = ({ index, plain = false, className = '', children }) => (
  <p className={`mx-label${plain ? ' mx-label--plain' : ''} ${className}`.trim()}>
    {index && <span className="mx-label__index">{index}</span>}
    {children}
  </p>
);

export const Button = ({ to, href, variant, size, icon = 'arrowRight', className = '', children, ...props }) => {
  const cls = ['mx-btn', variant && `mx-btn--${variant}`, size && `mx-btn--${size}`, className].filter(Boolean).join(' ');
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={16} />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <ExternalLink href={href} className={cls} {...props}>
      {content}
    </ExternalLink>
  );
};

export const Corners = () => (
  <span className="mx-corners" aria-hidden="true">
    <i />
    <i />
    <i />
    <i />
  </span>
);

export const Clock = () => {
  const time = useClock();
  return <>{time} PT</>;
};

export const SectionHead = ({ index, label, title, children }) => (
  <div className="mx-section-head">
    <div className="mx-section-head__side" data-reveal="fade">
      <Label index={index}>{label}</Label>
    </div>
    <div className="mx-section-head__main">
      {title && (
        <h2 className="mx-display mx-h2">
          <Scramble text={title} />
        </h2>
      )}
      {children}
    </div>
  </div>
);

export const PageHeader = ({ index, label, title, intro, meta = 'SHPE / El Camino College', children }) => (
  <header className="mx-page-head">
    <div className="mx-gridlines" aria-hidden="true" />
    <div className="mx-wrap">
      <div className="mx-page-head__meta" data-reveal="fade">
        <Label index={index}>{label}</Label>
        <p className="mx-mono" style={{ margin: 0 }}>{meta}</p>
      </div>
      <h1 className="mx-display mx-page-head__title">
        <Scramble text={title} />
      </h1>
      {(intro || children) && (
        <div className="mx-page-head__body">
          {intro && (
            <div className="mx-lead" data-reveal="up">
              {intro}
            </div>
          )}
          {children && (
            <div data-reveal="up" data-reveal-delay="0.12">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  </header>
);

export const Stats = ({ items }) => {
  const max = Math.max(...items.map((s) => s.value));
  return (
    <div className="mx-stats" data-reveal-group="up">
      {items.map((stat) => (
        <div className="mx-stat" key={stat.label}>
          <Label plain>{stat.label}</Label>
          <p className="mx-stat__value" style={{ margin: 0 }}>
            <CountUp to={stat.value} prefix={stat.value < 10 ? '0' : ''} duration={2.4} />
          </p>
          <span className="mx-stat__bar">
            <i data-reveal="line" style={{ width: `${(stat.value / max) * 100}%` }} />
          </span>
        </div>
      ))}
    </div>
  );
};

// List rows with an image that follows the cursor on hover (desktop).
export const ProgramsList = ({ items }) => {
  const previewRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el || prefersReducedMotion()) return undefined;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.65, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.65, ease: 'power3' });
    const move = (e) => {
      xTo(e.clientX + 28);
      yTo(e.clientY - 120);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    gsap.to(previewRef.current, {
      autoAlpha: active ? 1 : 0,
      scale: active ? 1 : 0.86,
      duration: 0.45,
      ease: 'power3.out',
    });
  }, [active]);

  return (
    <>
      <div className="mx-programs" data-reveal-group="up" onPointerLeave={() => setActive(null)}>
        {items.map((item, i) => (
          <article key={item.id} className="mx-program" onPointerEnter={() => setActive(item.id)}>
            <span className="mx-mono">
              {pad(i + 1)} / {pad(items.length)}
            </span>
            <h3 className="mx-display mx-program__title">{item.title}</h3>
            <p className="mx-program__text">{item.text}</p>
            <span className="mx-program__arrow">
              <Icon name="arrowRight" size={28} strokeWidth={1.2} />
            </span>
            <img className="mx-program__thumb" src={item.image} alt="" loading="lazy" decoding="async" />
          </article>
        ))}
      </div>
      {createPortal(
        <div ref={previewRef} className="mx-preview" aria-hidden="true">
          {items.map((item) => (
            <img key={item.id} src={item.image} alt="" loading="lazy" style={{ opacity: active === item.id ? 1 : 0 }} />
          ))}
        </div>,
        document.body,
      )}
    </>
  );
};

// Event cards, linking into the gallery filtered to that album.
export const FieldLog = ({ albums }) => (
  <div className="mx-log" data-reveal-group="fade" data-reveal-stagger="0.14">
    {albums.map((album, i) => (
      <Link key={album.folder} to={`/gallery#${album.folder}`} className="mx-log__card">
        <img className="mx-log__img" src={albumCover(album)} alt="" loading="lazy" decoding="async" />
        <div className="mx-log__top">
          <span className="mx-mono">Log {pad(albums.length - i, 3)}</span>
          <span className="mx-mono">{album.kind}</span>
        </div>
        <div>
          <p className="mx-mono" style={{ margin: '0 0 10px' }}>
            {album.term} · {pad(album.photos.length)} frames
          </p>
          <h3 className="mx-display mx-log__title">{album.title}</h3>
          <p className="mx-log__summary">{album.summary}</p>
        </div>
      </Link>
    ))}
  </div>
);

// Horizontal bars: how many alumni went to each university.
export const DestinationBars = () => {
  const rows = UNIVERSITIES.map((name) => ({
    name,
    count: ALL_ALUMNI.filter((a) => a.currentPosition.endsWith(name)).length,
  })).sort((a, b) => b.count - a.count);
  const max = Math.max(...rows.map((r) => r.count));

  return (
    <div className="mx-bars" data-reveal-group="up">
      {rows.map((row) => (
        <div className="mx-bar" key={row.name}>
          <span className="mx-bar__name">{row.name}</span>
          <span className="mx-bar__track" aria-hidden="true">
            <span className="mx-bar__fill" data-reveal="line" style={{ width: `${(row.count / max) * 100}%` }} />
          </span>
          <span className="mx-bar__count">
            {pad(row.count)}
            <span className="sr-only"> alumni</span>
          </span>
        </div>
      ))}
    </div>
  );
};
