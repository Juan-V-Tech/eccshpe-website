import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import CircularGallery from '../../components/reactbits/CircularGallery/CircularGallery';
import CountUp from '../../components/reactbits/CountUp/CountUp';
import Masonry from '../../components/reactbits/Masonry/Masonry';
import ScrollReveal from '../../components/reactbits/ScrollReveal/ScrollReveal';
import {
  ABOUT,
  ALL_ALUMNI,
  ALUMNI_PAGE,
  CHAPTER,
  EVENTS,
  GALLERY_PAGE,
  JOIN,
  LEADERSHIP_PAGE,
  NOT_FOUND,
  PILLARS,
  TEAM_PAGE,
} from '../../data/content';
import { ALL_PHOTOS, albumCover, EVENT_ALBUMS, GALLERY_ALBUMS, photoSrc } from '../../data/gallery';
import { EXECUTIVE_CABINET, LEADERSHPE_AT_LARGE, SHOW_AT_LARGE, SUPPORTING_ALUMNI } from '../../data/leadership';
import { CHAPTER_EMAIL, FORMS, SOCIAL_LINKS } from '../../data/site';
import { WEBSITE_TEAM } from '../../data/websiteTeam';
import ExternalLink from '../shared/ExternalLink';
import Icon from '../shared/Icon';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../shared/motion';
import Page from '../shared/Page';
import { Button, Eyebrow, PageHero, Person, RiseText, SectionHead, TextLink, UniversityLoop } from './AerospaceParts';

const JOST = 'https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap';

// ---------------------------------------------------------------- About

export const AerospaceAbout = () => (
  <Page title="About">
    <PageHero
      image="/images/gallery/2026-spring-ucla-soles-matlab-workshop/photo-01.jpg"
      crumb="About"
      title={ABOUT.title}
      intro={ABOUT.intro}
    />

    <section className="ax-section">
      <div className="ax-wrap ax-statement">
        <div data-reveal="fade">
          <Eyebrow>Our approach</Eyebrow>
        </div>
        <ScrollReveal as="p" baseOpacity={0.12} enableBlur blurStrength={6} baseRotation={0}>
          {ABOUT.body}
        </ScrollReveal>
      </div>
    </section>

    <section className="ax-section ax-section--paper">
      <div className="ax-wrap">
        <SectionHead eyebrow="What we do" title="Programs" />
        <div className="ax-tiles" data-reveal-group="up" data-reveal-stagger="0.12">
          {PILLARS.map((pillar, i) => (
            <article key={pillar.id} className="ax-tile" tabIndex={0}>
              <img src={pillar.image} alt="" loading="lazy" decoding="async" />
              <span className="ax-story__kind">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="ax-caps ax-story__title">{pillar.title}</h3>
              <p className="ax-tile__text">{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="ax-section ax-section--navy">
      <div className="ax-wrap ax-national">
        <p className="ax-national__year" aria-label={`Founded ${CHAPTER.nationalFounded}`}>
          <CountUp from={1950} to={CHAPTER.nationalFounded} duration={2.4} />
        </p>
        <div style={{ display: 'grid', gap: 24 }}>
          <div data-reveal="fade">
            <Eyebrow light>SHPE National</Eyebrow>
          </div>
          <h2 className="ax-caps ax-h2">
            <RiseText text="A national network" />
          </h2>
          <p className="ax-lead" data-reveal="up">
            {ABOUT.national}
          </p>
          <div data-reveal="up">
            <Button to="/join" variant="white">
              Become a member
            </Button>
          </div>
        </div>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- LeaderSHPE

export const AerospaceLeadership = () => (
  <Page title="LeaderSHPE">
    <PageHero
      image="/images/gallery/2026-spring-general-meeting-2/photo-02.jpg"
      crumb="LeaderSHPE"
      title={LEADERSHIP_PAGE.title}
      intro={LEADERSHIP_PAGE.intro}
    >
      <Button href={FORMS.officerApplication} variant="white" icon="arrowUpRight">
        {LEADERSHIP_PAGE.applyLabel}
      </Button>
    </PageHero>

    <section className="ax-section">
      <div className="ax-wrap">
        <SectionHead eyebrow="Officers" title="Executive Cabinet">
          <p className="ax-lead" style={{ maxWidth: 420 }}>Hover or focus a portrait to see what each officer leads.</p>
        </SectionHead>
        <div className="ax-people" data-reveal-group="up" data-reveal-stagger="0.08">
          {EXECUTIVE_CABINET.map((m) => (
            <Person key={`${m.title}-${m.name}`} img={m.img} name={m.name} role={m.title} focus={m.focus} />
          ))}
        </div>
      </div>
    </section>

    {SHOW_AT_LARGE && (
      <section className="ax-section ax-section--paper">
        <div className="ax-wrap">
          <SectionHead eyebrow="Support" title="LeaderSHPE at Large" />
          <div className="ax-people" data-reveal-group="up">
            {LEADERSHPE_AT_LARGE.map((m) => (
              <Person key={`${m.title}-${m.name}`} img={m.img} name={m.name} role={m.title} focus={m.focus} />
            ))}
          </div>
        </div>
      </section>
    )}

    <section className="ax-band">
      <div className="ax-wrap">
        <p className="ax-caps ax-band__title">{LEADERSHIP_PAGE.applyPrompt}</p>
        <Button href={FORMS.officerApplication} variant="white" icon="arrowUpRight">
          Apply now
        </Button>
      </div>
    </section>

    <section className="ax-section ax-section--paper">
      <div className="ax-wrap">
        <SectionHead eyebrow="Mentorship" title="Supporting alumni" />
        {SUPPORTING_ALUMNI.map((m) => (
          <article key={m.name} className="ax-feature" data-reveal="up">
            <img src={m.img} alt={m.name} loading="lazy" />
            <div style={{ display: 'grid', gap: 16 }}>
              <p className="ax-person__role">{m.title}</p>
              <h3 className="ax-caps ax-h2">{m.name}</h3>
              <p className="ax-lead">{m.focus}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- Website Team

export const AerospaceTeam = () => (
  <Page title="Website Team">
    <PageHero
      image="/images/gallery/2026-spring-jet-engine-design/photo-05.jpg"
      crumb="Website Team"
      title={TEAM_PAGE.title}
      intro={TEAM_PAGE.intro}
    />
    <section className="ax-section ax-section--paper">
      <div className="ax-wrap">
        <div className="ax-team" data-reveal-group="up" data-reveal-stagger="0.1">
          {WEBSITE_TEAM.map((member) => {
            const isEmail = member.link.startsWith('mailto:');
            const isOpen = member.name === 'Open Position';
            return (
              <ExternalLink
                key={member.name}
                href={member.link}
                className={`ax-member${isOpen ? ' ax-member--open' : ''}`}
                aria-label={isEmail ? `Email ${member.name}` : `${member.name} GitHub profile`}
              >
                <img src={member.img} alt="" loading="lazy" />
                <div className="ax-member__body">
                  <p className="ax-person__role">{member.role}</p>
                  <h2 className="ax-person__name">{member.name}</h2>
                  <p style={{ margin: 0, color: 'var(--ax-muted)', fontSize: 15 }}>{member.handle}</p>
                  <ul className="ax-member__list">
                    {member.contributions.map((c) => (
                      <li key={c}>
                        <Icon name="check" size={16} />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p style={{ margin: 0, fontSize: 15 }}>
                    <strong>Additional impact:</strong> {member.highlights}
                  </p>
                  <span className="ax-link">
                    <span>{isEmail ? 'Send an email' : 'View GitHub'}</span>
                    <Icon name="arrowUpRight" size={16} />
                  </span>
                </div>
              </ExternalLink>
            );
          })}
        </div>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- Events

const FORMAT_ICONS = ['people', 'cpu', 'briefcase', 'location'];

export const AerospaceEvents = () => {
  const next = EVENTS.upcoming[0];
  const social = (label) => SOCIAL_LINKS.find((s) => s.label === label)?.href;

  return (
    <Page title="Events">
      <PageHero
        image="/images/gallery/2026-spring-general-meeting-2/photo-01.jpg"
        crumb="Events"
        title={EVENTS.title}
        intro={EVENTS.intro}
      />

      <section className="ax-section ax-section--paper">
        <div className="ax-wrap">
          <SectionHead eyebrow="Up next" title="Next general meeting" />
          <article className="ax-next" data-reveal="up">
            <div className="ax-date" aria-hidden="true">
              <div style={{ textAlign: 'center' }}>
                <div className="ax-date__month">Date</div>
                <div className="ax-date__day">{next.date}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              <p className="ax-person__role">{next.status}</p>
              <h3 className="ax-caps ax-h2">{next.name}</h3>
              <p className="ax-lead">{next.note}</p>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ax-navy)' }}>
                <Icon name="location" size={18} /> {EVENTS.venueNote}
              </p>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              <Button href={social('Instagram')} icon="arrowUpRight">
                Instagram
              </Button>
              <Button href={social('Discord')} variant="outline" icon="arrowUpRight">
                Discord
              </Button>
            </div>
          </article>
        </div>
      </section>

      <section className="ax-section">
        <div className="ax-wrap">
          <SectionHead eyebrow="Formats" title="What we host" />
          <div className="ax-formats" data-reveal-group="up">
            {EVENTS.formats.map((format, i) => (
              <div key={format} className="ax-format">
                <span className="ax-format__icon">
                  <Icon name={FORMAT_ICONS[i]} size={34} strokeWidth={1.3} />
                </span>
                <h3 className="ax-caps ax-format__name">{format}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ax-section ax-section--paper">
        <div className="ax-wrap">
          <SectionHead eyebrow="Archive" title="Past events">
            <TextLink to="/gallery">Full gallery</TextLink>
          </SectionHead>
          <div className="ax-past" data-reveal-group="up">
            {EVENT_ALBUMS.map((album) => (
              <Link key={album.folder} to={`/gallery#${album.folder}`} className="ax-past__row">
                <div className="ax-past__thumb">
                  <img src={albumCover(album)} alt="" loading="lazy" />
                </div>
                <div>
                  <p className="ax-person__role">
                    {album.kind} · {album.term}
                  </p>
                  <h3 className="ax-caps ax-past__title">{album.title}</h3>
                  <p style={{ margin: 0, color: 'var(--ax-muted)' }}>{album.summary}</p>
                </div>
                <span className="ax-link">
                  <span>{album.photos.length} photos</span>
                  <Icon name="arrowRight" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ax-band">
        <div className="ax-wrap">
          <p className="ax-caps ax-band__title">{EVENTS.collab}</p>
          <Button href={`mailto:${CHAPTER_EMAIL}`} variant="white" icon="mail">
            {CHAPTER_EMAIL}
          </Button>
        </div>
      </section>
    </Page>
  );
};

// ---------------------------------------------------------------- Gallery

export const AerospaceGallery = () => (
  <Page title="Gallery">
    <section className="ax-showcase" aria-labelledby="ax-gallery-title">
      <div className="ax-showcase__gallery">
        <CircularGallery
          items={ALL_PHOTOS.map((p) => ({ image: p.src, text: p.album.title }))}
          bend={2}
          textColor="#ffffff"
          font="500 24px Jost"
          fontUrl={JOST}
          borderRadius={0.02}
          scrollSpeed={2}
          scrollEase={0.06}
          autoScroll={0.15}
        />
      </div>
      <div className="ax-wrap ax-showcase__head">
        <nav aria-label="Breadcrumb">
          <ol className="ax-crumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">Gallery</li>
          </ol>
        </nav>
        <h1 id="ax-gallery-title" className="ax-caps ax-page-hero__title" style={{ marginTop: 18 }}>
          <RiseText text={GALLERY_PAGE.title} trigger="load" />
        </h1>
        <p className="ax-lead" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {GALLERY_PAGE.intro}
        </p>
      </div>
      <p className="ax-showcase__hint">Drag the reel · click a photo to enlarge · albums below</p>
    </section>

    <section className="ax-section">
      <div className="ax-wrap">
        {GALLERY_ALBUMS.map((album) => (
          <section key={album.folder} id={album.folder} className="ax-album" aria-labelledby={`${album.folder}-title`}>
            <div className="ax-album__head" data-reveal="up">
              <div style={{ display: 'grid', gap: 10 }}>
                <p className="ax-person__role">
                  {album.kind} · {album.term}
                </p>
                <h2 id={`${album.folder}-title`} className="ax-caps ax-h2">
                  {album.title}
                </h2>
              </div>
              <p style={{ margin: 0, color: 'var(--ax-muted)' }}>{album.summary}</p>
            </div>
            <Masonry
              items={album.photos.map((p) => ({ id: p.file, img: photoSrc(album, p), alt: p.alt, title: p.caption }))}
              columnWidth={300}
              gap={14}
              radius={0}
              hoverEffect="zoom"
              captions="hover"
              lightbox
              draggable={false}
            />
          </section>
        ))}
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- Alumni

export const AerospaceAlumni = () => (
  <Page title="Alumni">
    <PageHero
      image="/images/gallery/2026-class-of-2026/juan-ventura-romero.jpg"
      crumb="Alumni"
      title={ALUMNI_PAGE.title}
      intro={ALUMNI_PAGE.intro}
    >
      {FORMS.alumni ? (
        <Button href={FORMS.alumni} variant="white" icon="arrowUpRight">
          Submit your information
        </Button>
      ) : (
        <Button href={`mailto:${CHAPTER_EMAIL}?subject=Alumni%20page`} variant="white" icon="mail">
          Email us your information
        </Button>
      )}
    </PageHero>

    <section className="ax-section ax-section--paper" style={{ paddingBlock: 'clamp(64px, 7vw, 104px)' }}>
      <div className="ax-wrap">
        <SectionHead eyebrow="Destinations" title="Where they transferred" />
      </div>
      <UniversityLoop />
    </section>

    <section className="ax-section">
      <div className="ax-wrap">
        <SectionHead eyebrow={`${ALL_ALUMNI.length} alumni`} title="Our alumni">
          <p className="ax-lead" style={{ maxWidth: 420 }}>
            {ALUMNI_PAGE.submitPrompt}{' '}
            <a href={FORMS.alumni ?? `mailto:${CHAPTER_EMAIL}?subject=Alumni%20page`}>Let us know.</a>
          </p>
        </SectionHead>
        <div className="ax-alumni" data-reveal-group="up" data-reveal-stagger="0.08">
          {ALL_ALUMNI.map((a) => (
            <Person
              key={a.name}
              img={a.img}
              name={a.name}
              role={`${a.role} · Class of ${a.graduationYear}`}
              meta={a.currentPosition}
              href={a.linkedinUrl}
              label={a.linkedinUrl ? 'LinkedIn' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- Join

const Timeline = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rail = ref.current.querySelector('.ax-timeline__rail i');
      if (prefersReducedMotion()) gsap.set(rail, { scaleY: 1 });
      else {
        gsap.to(rail, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
        });
      }
      gsap.utils.toArray('.ax-tstep', ref.current).forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 68%',
          onEnter: () => step.setAttribute('data-active', ''),
          onLeaveBack: () => step.removeAttribute('data-active'),
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={ref} className="ax-timeline">
      <span className="ax-timeline__rail" aria-hidden="true">
        <i />
      </span>
      {JOIN.steps.map((step, i) => (
        <li key={step.title} className="ax-tstep" data-reveal="up">
          <span className="ax-tstep__node" aria-hidden="true">
            {i + 1}
          </span>
          <p className="ax-tstep__label">Step {String(i + 1).padStart(2, '0')}</p>
          <h3 className="ax-tstep__title">{step.title}</h3>
          {step.note && <p className="ax-tstep__note">{step.note}</p>}
        </li>
      ))}
    </ol>
  );
};

export const AerospaceJoin = () => (
  <Page title="Join">
    <PageHero
      image="/images/gallery/2026-spring-ucla-soles-matlab-workshop/photo-03.jpg"
      crumb="Join"
      title="Join SHPE @ ECC"
      intro={JOIN.intro}
    >
      <Button href={FORMS.interest} variant="white" icon="arrowUpRight">
        Interest form
      </Button>
    </PageHero>

    <section className="ax-section">
      <div className="ax-wrap ax-join">
        <div>
          <SectionHead eyebrow="Membership" title="How to join" />
          <Timeline />
        </div>
        <aside className="ax-sticky" data-reveal="up">
          <Eyebrow light>Start here</Eyebrow>
          <p className="ax-caps" style={{ fontSize: 28 }}>Interest form</p>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)' }}>
            Tell us about yourself and we&apos;ll share meeting dates and how to get your national membership.
          </p>
          <Button href={FORMS.interest} variant="white" icon="arrowUpRight">
            Open the form
          </Button>
          <ul>
            {SOCIAL_LINKS.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <Icon name={s.label} size={18} />
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${CHAPTER_EMAIL}`}>
                Email <Icon name="mail" size={18} />
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- 404

export const AerospaceNotFound = () => (
  <Page title={NOT_FOUND.title}>
    <section className="ax-lost">
      <div className="ax-wrap" style={{ display: 'grid', gap: 24, paddingTop: 120 }}>
        <p className="ax-lost__code" aria-hidden="true">
          404
        </p>
        <h1 className="ax-caps ax-h2">
          <RiseText text={NOT_FOUND.title} trigger="load" />
        </h1>
        <p className="ax-lead" style={{ color: 'rgba(255,255,255,0.75)' }}>
          {NOT_FOUND.intro}
        </p>
        <div>
          <Button to="/" variant="white" icon="arrowLeft">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  </Page>
);
