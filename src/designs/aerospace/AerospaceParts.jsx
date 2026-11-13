import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import CountUp from '../../components/reactbits/CountUp/CountUp';
import LogoLoop from '../../components/reactbits/LogoLoop/LogoLoop';
import SplitText from '../../components/reactbits/SplitText/SplitText';
import { UNIVERSITIES } from '../../data/content';
import { albumCover } from '../../data/gallery';
import ExternalLink from '../shared/ExternalLink';
import Icon from '../shared/Icon';
import { gsap, prefersReducedMotion } from '../shared/motion';

export const Eyebrow = ({ light = false, children }) => (
  <p className={`ax-eyebrow${light ? ' ax-eyebrow--light' : ''}`}>{children}</p>
);

export const Button = ({ to, href, variant, icon = 'arrowRight', className = '', children, ...props }) => {
  const cls = ['ax-btn', variant && `ax-btn--${variant}`, className].filter(Boolean).join(' ');
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

export const TextLink = ({ to, href, icon = 'arrowRight', children, ...props }) => {
  const content = (
    <>
      <span>{children}</span>
      <Icon name={icon} size={16} />
    </>
  );
  return to ? (
    <Link to={to} className="ax-link" {...props}>
      {content}
    </Link>
  ) : (
    <ExternalLink href={href} className="ax-link" {...props}>
      {content}
    </ExternalLink>
  );
};

// Wide-tracked caps that rise into place letter by letter (React Bits SplitText).
export const RiseText = ({ text, tag = 'span', trigger = 'view', delay = 34, className = '' }) => (
  <SplitText
    text={text}
    tag={tag}
    className={className}
    splitType="chars"
    effect="rise"
    mask
    delay={delay}
    duration={1.1}
    ease="expo.out"
    textAlign="left"
    trigger={trigger}
    threshold={0.2}
    rootMargin="0px"
  />
);

export const SectionHead = ({ eyebrow, title, light = false, children }) => (
  <div className="ax-head">
    <div className="ax-head__text">
      <div data-reveal="fade">
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
      </div>
      {title && (
        <h2 className="ax-caps ax-h2">
          <RiseText text={title} />
        </h2>
      )}
    </div>
    {children && (
      <div data-reveal="up" data-reveal-delay="0.15">
        {children}
      </div>
    )}
  </div>
);

// Image hero for inner pages. The photo drifts slower than the page.
export const PageHero = ({ image, crumb, title, intro, children }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ax-page-hero__img', { scale: 1.18 }, { scale: 1, duration: 2.2, ease: 'expo.out' });
      gsap.to('.ax-page-hero__img', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={ref} className="ax-page-hero">
      <img className="ax-page-hero__img" src={image} alt="" fetchPriority="high" />
      <div className="ax-wrap ax-page-hero__content">
        <nav aria-label="Breadcrumb" data-reveal="fade" data-reveal-start="top bottom">
          <ol className="ax-crumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <h1 className="ax-caps ax-page-hero__title">
          <RiseText text={title} trigger="load" />
        </h1>
        {intro && (
          <div className="ax-lead" data-reveal="up" data-reveal-delay="0.4" data-reveal-start="top bottom">
            {intro}
          </div>
        )}
        {children && (
          <div data-reveal="up" data-reveal-delay="0.55" data-reveal-start="top bottom">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};

export const StatsBand = ({ items }) => (
  <section className="ax-stats" aria-label="Chapter numbers">
    <div className="ax-wrap">
      <div className="ax-stats__grid" data-reveal-group="up" data-reveal-stagger="0.12">
        {items.map((stat) => (
          <div key={stat.label} className="ax-stat">
            <p className="ax-stat__value">
              <CountUp to={stat.value} duration={2.4} />
            </p>
            <p className="ax-stat__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Portrait card. `href` makes it a link (opens in a new tab).
export const Person = ({ img, name, role, focus, meta, href, label }) => {
  const body = (
    <>
      <div className="ax-person__frame">
        <img src={img} alt="" loading="lazy" decoding="async" />
        {focus && <p className="ax-person__focus">{focus}</p>}
      </div>
      <p className="ax-person__role">{role}</p>
      <h3 className="ax-person__name">{name}</h3>
      <span className="ax-person__line" aria-hidden="true" />
      {meta && <p className="ax-person__meta">{meta}</p>}
      {label && (
        <span className="ax-link">
          <span>{label}</span>
          <Icon name="arrowUpRight" size={16} />
        </span>
      )}
    </>
  );
  return href ? (
    <ExternalLink href={href} className="ax-person" aria-label={`${name}, ${role}. ${label ?? ''}`.trim()}>
      {body}
    </ExternalLink>
  ) : (
    <article className="ax-person" tabIndex={focus ? 0 : undefined}>
      {body}
    </article>
  );
};

// Built once: LogoLoop re-measures whenever its `logos` array changes identity.
const UNIVERSITY_LOGOS = UNIVERSITIES.map((name) => ({ node: <span className="ax-uni">{name}</span>, title: name }));

export const UniversityLoop = () => (
  <div className="ax-loop" data-reveal="fade">
    <LogoLoop
      logos={UNIVERSITY_LOGOS}
      speed={60}
      gap={48}
      logoHeight={60}
      pauseOnHover
      fadeOut
      fadeOutWidth={0.1}
      ariaLabel="Universities our alumni transferred to"
    />
  </div>
);

// Full-height cards that scroll sideways while the section is pinned.
export const StoryScroller = ({ albums, eyebrow, title }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px)', () => {
        const track = ref.current.querySelector('.ax-stories__track');
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(
          '.ax-stories__progress i',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
          },
        );
      });
      return () => mm.revert();
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ax-stories" aria-label={title}>
      <div className="ax-stories__pin">
        <div className="ax-wrap ax-stories__head">
          <SectionHead eyebrow={eyebrow} title={title} light>
            <TextLink to="/gallery">View the gallery</TextLink>
          </SectionHead>
        </div>
        <div className="ax-stories__viewport">
          <div className="ax-stories__track">
            {albums.map((album) => (
              <Link key={album.folder} to={`/gallery#${album.folder}`} className="ax-story">
                <img src={albumCover(album)} alt="" loading="lazy" decoding="async" />
                <span className="ax-story__kind">
                  {album.kind} · {album.term}
                </span>
                <h3 className="ax-caps ax-story__title">{album.title}</h3>
                <p className="ax-story__summary">{album.summary}</p>
                <span className="ax-link">
                  <span>See photos</span>
                  <Icon name="arrowRight" size={16} />
                </span>
              </Link>
            ))}
            <div className="ax-story ax-story--end">
              <span className="ax-story__kind" style={{ color: '#fff' }}>
                Next
              </span>
              <p className="ax-caps ax-story__title">Your story starts at the next general meeting.</p>
              <Button to="/events" variant="white">
                See events
              </Button>
            </div>
          </div>
        </div>
        <div className="ax-wrap">
          <div className="ax-stories__progress" aria-hidden="true">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
};
