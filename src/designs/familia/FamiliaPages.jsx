import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import CountUp from '../../components/reactbits/CountUp/CountUp';
import Masonry from '../../components/reactbits/Masonry/Masonry';
import SpotlightCard from '../../components/reactbits/SpotlightCard/SpotlightCard';
import TiltedCard from '../../components/reactbits/TiltedCard/TiltedCard';
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
  UNIVERSITIES,
} from '../../data/content';
import { ALL_PHOTOS, albumCover, EVENT_ALBUMS, GALLERY_ALBUMS } from '../../data/gallery';
import { EXECUTIVE_CABINET, LEADERSHPE_AT_LARGE, SHOW_AT_LARGE, SUPPORTING_ALUMNI } from '../../data/leadership';
import { CHAPTER_EMAIL, FORMS, SOCIAL_LINKS } from '../../data/site';
import { WEBSITE_TEAM } from '../../data/websiteTeam';
import ExternalLink from '../shared/ExternalLink';
import Icon from '../shared/Icon';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../shared/motion';
import Page from '../shared/Page';
import { BlurHeading, Button, Contours, Kicker, PageHeader, SectionHead, TextLink } from './FamiliaParts';

const PILLAR_ICONS = { community: 'people', academics: 'book', professional: 'briefcase', engineering: 'cpu' };
const FORMAT_ICONS = ['people', 'cpu', 'briefcase', 'location'];

const Pillars = () => (
  <div className="fx-pillars" data-reveal-group="up" data-reveal-stagger="0.1">
    {PILLARS.map((pillar) => (
      <SpotlightCard key={pillar.id} theme="light" spotlightColor="rgba(253, 101, 47, 0.18)" intensity={0.35} spotlightSize={260}>
        <div className="fx-pillar">
          <span className="fx-pillar__icon">
            <Icon name={PILLAR_ICONS[pillar.id]} size={26} />
          </span>
          <h3 className="fx-h3">{pillar.title}</h3>
          <p>{pillar.text}</p>
        </div>
      </SpotlightCard>
    ))}
  </div>
);

const PersonCard = ({ member }) => (
  <div className="fx-person">
    <TiltedCard
      imageSrc={member.img}
      altText={member.name}
      captionText={`${member.name}, ${member.title}. Click to flip.`}
      containerHeight="300px"
      imageHeight="300px"
      imageWidth="240px"
      rotateAmplitude={10}
      scaleOnHover={1.04}
      radius={20}
      glare={0.35}
      showTooltip={false}
      backContent={
        <div className="fx-person__back">
          <strong>{member.title}</strong>
          {member.focus}
        </div>
      }
    />
    <h3 className="fx-person__name">{member.name}</h3>
    <p className="fx-person__role">{member.title}</p>
  </div>
);

// ---------------------------------------------------------------- About

const Collage = ({ images }) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('img', ref.current).forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: 60 * (i + 1) },
          { y: -30 * (i + 1), ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="fx-collage" aria-hidden="true">
      {images.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" />
      ))}
    </div>
  );
};

export const FamiliaAbout = () => (
  <Page title="About">
    <PageHeader crumb="About" title={ABOUT.title} intro={ABOUT.intro} />

    <section className="fx-section">
      <div className="fx-wrap fx-two">
        <div style={{ display: 'grid', gap: 22 }}>
          <div data-reveal="fade">
            <Kicker>Our approach</Kicker>
          </div>
          <BlurHeading text="Launching the next generation of engineers" />
          <p className="fx-lead" data-reveal="up">
            {ABOUT.body}
          </p>
          <div data-reveal="up">
            <Button to="/join">Become a member</Button>
          </div>
        </div>
        <Collage
          images={[
            '/images/gallery/2026-spring-ucla-soles-matlab-workshop/photo-01.jpg',
            '/images/gallery/2026-spring-jet-engine-design/photo-02.jpg',
            '/images/gallery/2026-spring-general-meeting-1/photo-01.jpg',
          ]}
        />
      </div>
    </section>

    <section className="fx-section fx-section--gray">
      <div className="fx-wrap">
        <SectionHead kicker="What we do" title="Grow in every way" center />
        <Pillars />
      </div>
    </section>

    <section className="fx-section fx-section--navy">
      <div className="fx-wrap fx-two">
        <p className="fx-lost__code" style={{ color: '#fd652f' }} aria-label={`Founded ${CHAPTER.nationalFounded}`}>
          <CountUp from={1950} to={CHAPTER.nationalFounded} duration={2.4} />
        </p>
        <div style={{ display: 'grid', gap: 20 }}>
          <div data-reveal="fade">
            <Kicker light>SHPE National</Kicker>
          </div>
          <BlurHeading text="Part of something bigger" />
          <p className="fx-lead" data-reveal="up">
            {ABOUT.national}
          </p>
        </div>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- LeaderSHPE

export const FamiliaLeadership = () => (
  <Page title="LeaderSHPE">
    <PageHeader crumb="LeaderSHPE" title={LEADERSHIP_PAGE.title} intro={LEADERSHIP_PAGE.intro}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
        <Button href={FORMS.officerApplication} icon="arrowUpRight">
          {LEADERSHIP_PAGE.applyLabel}
        </Button>
        <span style={{ color: 'var(--fx-muted)' }}>{LEADERSHIP_PAGE.applyPrompt}</span>
      </div>
    </PageHeader>

    <section className="fx-section">
      <div className="fx-wrap">
        <SectionHead kicker="Officers" title="Executive Cabinet" intro="Click or press Enter on a card to flip it and see what each officer leads." />
        <div className="fx-people" data-reveal-group="up" data-reveal-stagger="0.06">
          {EXECUTIVE_CABINET.map((m) => (
            <PersonCard key={`${m.title}-${m.name}`} member={m} />
          ))}
        </div>
      </div>
    </section>

    {SHOW_AT_LARGE && (
      <section className="fx-section fx-section--gray">
        <div className="fx-wrap">
          <SectionHead kicker="Support" title="LeaderSHPE at Large" />
          <div className="fx-people" data-reveal-group="up">
            {LEADERSHPE_AT_LARGE.map((m) => (
              <PersonCard key={`${m.title}-${m.name}`} member={m} />
            ))}
          </div>
        </div>
      </section>
    )}

    <section className="fx-section fx-section--gray">
      <div className="fx-wrap">
        <SectionHead kicker="Mentorship" title="Supporting alumni" />
        {SUPPORTING_ALUMNI.map((m) => (
          <article key={m.name} className="fx-card fx-next" data-reveal="up">
            <div className="fx-next__img">
              <img src={m.img} alt={m.name} loading="lazy" />
            </div>
            <div className="fx-next__body">
              <span className="fx-chip fx-chip--orange" style={{ justifySelf: 'start' }}>
                {m.title}
              </span>
              <h3 className="fx-h2">{m.name}</h3>
              <p className="fx-lead">{m.focus}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- Website Team

export const FamiliaTeam = () => (
  <Page title="Website Team">
    <PageHeader crumb="Website Team" title={TEAM_PAGE.title} intro={TEAM_PAGE.intro} />
    <section className="fx-section">
      <div className="fx-wrap">
        <div className="fx-team" data-reveal-group="up" data-reveal-stagger="0.1">
          {WEBSITE_TEAM.map((member) => {
            const isEmail = member.link.startsWith('mailto:');
            const isOpen = member.name === 'Open Position';
            return (
              <SpotlightCard key={member.name} theme="light" spotlightColor="rgba(0, 112, 192, 0.16)" intensity={0.3}>
                <ExternalLink
                  href={member.link}
                  className={`fx-member${isOpen ? ' fx-member--open' : ''}`}
                  aria-label={isEmail ? `Email ${member.name}` : `${member.name} GitHub profile`}
                >
                  <div className="fx-member__head">
                    <img src={member.img} alt="" loading="lazy" />
                    <div className="fx-member__info">
                      <h2 className="fx-person__name" style={{ margin: 0 }}>{member.name}</h2>
                      <p style={{ margin: 0, color: 'var(--fx-muted)', fontSize: 15 }}>{member.handle}</p>
                      <span className="fx-chip fx-chip--blue" style={{ marginTop: 8 }}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <ul>
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
                  <span className="fx-link">
                    <span>{isEmail ? 'Send an email' : 'View GitHub'}</span>
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                </ExternalLink>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- Events

const EventCards = () => (
  <div className="fx-events" data-reveal-group="up" data-reveal-stagger="0.1">
    {EVENT_ALBUMS.map((album) => (
      <Link key={album.folder} to={`/gallery#${album.folder}`} className="fx-card fx-event">
        <div className="fx-event__img">
          <img src={albumCover(album)} alt="" loading="lazy" />
        </div>
        <div className="fx-event__body">
          <span className="fx-chip fx-chip--orange" style={{ justifySelf: 'start' }}>
            {album.kind}
          </span>
          <h3 className="fx-h3" style={{ color: 'var(--fx-navy)' }}>
            {album.title}
          </h3>
          <p>{album.summary}</p>
          <span className="fx-link">
            <span>{album.photos.length} photos</span>
            <Icon name="arrowRight" size={18} />
          </span>
        </div>
      </Link>
    ))}
  </div>
);

export const FamiliaEvents = () => {
  const next = EVENTS.upcoming[0];
  const social = (label) => SOCIAL_LINKS.find((s) => s.label === label)?.href;
  return (
    <Page title="Events">
      <PageHeader crumb="Events" title={EVENTS.title} intro={`${EVENTS.intro} ${EVENTS.venueNote}`} />

      <section className="fx-section">
        <div className="fx-wrap">
          <article className="fx-next" data-reveal="up">
            <div className="fx-next__img">
              <img src="/images/gallery/2026-spring-general-meeting-1/photo-03.jpg" alt="" loading="lazy" />
            </div>
            <div className="fx-next__body">
              <span className="fx-date">
                <span style={{ textAlign: 'center' }}>
                  <small>Date</small>
                  {next.date}
                </span>
              </span>
              <h2 className="fx-h2">Next {next.name}</h2>
              <p className="fx-lead">{next.note}</p>
              <p style={{ margin: 0, display: 'flex', gap: 10, alignItems: 'center', color: 'var(--fx-navy)', fontWeight: 600 }}>
                <Icon name="location" size={20} /> {EVENTS.venue} ({EVENTS.room})
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <Button href={social('Instagram')} icon="arrowUpRight">
                  Instagram
                </Button>
                <Button href={social('Discord')} variant="outline" icon="arrowUpRight">
                  Discord
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="fx-section fx-section--gray">
        <div className="fx-wrap">
          <SectionHead kicker="Formats" title="What we host" center />
          <div className="fx-pillars" data-reveal-group="up">
            {EVENTS.formats.map((format, i) => (
              <SpotlightCard key={format} theme="light" spotlightColor="rgba(253, 101, 47, 0.18)" intensity={0.35}>
                <div className="fx-pillar">
                  <span className="fx-pillar__icon">
                    <Icon name={FORMAT_ICONS[i]} size={26} />
                  </span>
                  <h3 className="fx-h3">{format}</h3>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-section">
        <div className="fx-wrap">
          <SectionHead kicker="Recap" title="Past events" aside={<TextLink to="/gallery">Full gallery</TextLink>} />
          <EventCards />
        </div>
      </section>

      <section className="fx-cta">
        <Contours className="fx-cta__bg" />
        <div className="fx-wrap">
          <div className="fx-cta__box" data-reveal="scale">
            <Kicker>Collaborate</Kicker>
            <BlurHeading text="Have an event idea?" />
            <p className="fx-lead">{EVENTS.collab}</p>
            <Button href={`mailto:${CHAPTER_EMAIL}`} icon="mail">
              {CHAPTER_EMAIL}
            </Button>
          </div>
        </div>
      </section>
    </Page>
  );
};

// ---------------------------------------------------------------- Gallery

export const FamiliaGallery = () => {
  const { hash } = useLocation();
  const [filter, setFilter] = useState(() => {
    const folder = decodeURIComponent(hash.slice(1));
    return GALLERY_ALBUMS.some((a) => a.folder === folder) ? folder : 'all';
  });

  const items = useMemo(
    () =>
      ALL_PHOTOS.filter((p) => filter === 'all' || p.album.folder === filter).map((p) => ({
        id: p.src,
        img: p.src,
        alt: p.alt,
        title: p.caption,
        description: p.album.title,
      })),
    [filter],
  );

  const choose = (value) => {
    setFilter(value);
    window.setTimeout(() => ScrollTrigger.refresh(), 900);
  };

  return (
    <Page title="Gallery">
      <PageHeader crumb="Gallery" title={GALLERY_PAGE.title} intro={GALLERY_PAGE.intro} />
      <section className="fx-section" style={{ paddingTop: 56 }}>
        <div className="fx-wrap">
          <div className="fx-filters" role="group" aria-label="Filter photos by album" data-reveal-group="fade">
            <button type="button" className="fx-filter" aria-pressed={filter === 'all'} onClick={() => choose('all')}>
              All photos
            </button>
            {GALLERY_ALBUMS.map((album) => (
              <button key={album.folder} type="button" className="fx-filter" aria-pressed={filter === album.folder} onClick={() => choose(album.folder)}>
                {album.title}
              </button>
            ))}
          </div>
          <Masonry items={items} columnWidth={300} gap={16} radius={16} hoverEffect="lift" captions="hover" lightbox stagger={0.05} draggable={false} />
        </div>
      </section>
    </Page>
  );
};

// ---------------------------------------------------------------- Alumni

export const FamiliaAlumni = () => {
  const submitHref = FORMS.alumni ?? `mailto:${CHAPTER_EMAIL}?subject=Alumni%20page`;
  return (
    <Page title="Alumni">
      <PageHeader crumb="Alumni" title={ALUMNI_PAGE.title} intro={ALUMNI_PAGE.intro}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <Button href={submitHref} icon={FORMS.alumni ? 'arrowUpRight' : 'mail'}>
            {FORMS.alumni ? 'Submit your information' : 'Email us your information'}
          </Button>
          <span style={{ color: 'var(--fx-muted)' }}>{ALUMNI_PAGE.submitPrompt}</span>
        </div>
      </PageHeader>

      <section className="fx-section">
        <div className="fx-wrap">
          <SectionHead
            kicker="Where they went"
            title="Our alumni"
            aside={
              <ul className="fx-chips">
                {UNIVERSITIES.map((u) => (
                  <li key={u} className="fx-chip fx-chip--orange">
                    <Icon name="graduation" size={14} /> {u}
                  </li>
                ))}
              </ul>
            }
          />
          <div className="fx-alumni" data-reveal-group="up" data-reveal-stagger="0.08">
            {ALL_ALUMNI.map((a) => (
              <ExternalLink key={a.name} href={a.linkedinUrl} className="fx-card fx-alum" aria-label={`${a.name} on LinkedIn`}>
                <div className="fx-alum__img">
                  <img src={a.img} alt="" loading="lazy" />
                </div>
                <div className="fx-alum__body">
                  <span className="fx-chip fx-chip--blue" style={{ justifySelf: 'start' }}>
                    Class of {a.graduationYear}
                  </span>
                  <h3 className="fx-person__name" style={{ margin: 0 }}>{a.name}</h3>
                  <p className="fx-person__role">{a.role}</p>
                  <p>{a.currentPosition}</p>
                  <span className="fx-link">
                    <span>LinkedIn</span>
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                </div>
              </ExternalLink>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
};

// ---------------------------------------------------------------- Join

const StepProgress = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const tween = gsap.fromTo(
      ref.current.firstChild,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 40%', scrub: true } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  return (
    <div ref={ref} className="fx-progress" aria-hidden="true">
      <i />
    </div>
  );
};

export const FamiliaJoin = () => (
  <Page title="Join">
    <PageHeader crumb="Join" title="Join SHPE @ El Camino" intro={JOIN.intro}>
      <Button href={FORMS.interest} icon="arrowUpRight">
        Interest form
      </Button>
    </PageHeader>

    <section className="fx-section">
      <div className="fx-wrap">
        <SectionHead kicker="Four steps" title="How to join" center />
        <ol className="fx-steps" style={{ margin: 0, padding: 0, listStyle: 'none' }} data-reveal-group="up" data-reveal-stagger="0.12">
          {JOIN.steps.map((step, i) => (
            <li key={step.title} className="fx-card fx-step">
              <span className="fx-step__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{step.title}</h3>
              {step.note && <p>{step.note}</p>}
            </li>
          ))}
        </ol>
        <StepProgress />
      </div>
    </section>

    <section className="fx-section fx-section--gray">
      <div className="fx-wrap fx-two">
        <div style={{ display: 'grid', gap: 20, justifyItems: 'start' }}>
          <div data-reveal="fade">
            <Kicker>Start here</Kicker>
          </div>
          <BlurHeading text="Fill out the interest form" />
          <p className="fx-lead" data-reveal="up">
            It takes a couple of minutes. We&apos;ll follow up with meeting dates and how to get your national membership.
          </p>
          <div data-reveal="up">
            <Button href={FORMS.interest} icon="arrowUpRight">
              Open the interest form
            </Button>
          </div>
        </div>
        <div className="fx-channels" data-reveal-group="up">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="fx-card fx-channel">
              <span>
                <Icon name={s.label} size={20} />
              </span>
              {s.label}
            </a>
          ))}
          <a href={`mailto:${CHAPTER_EMAIL}`} className="fx-card fx-channel">
            <span>
              <Icon name="mail" size={20} />
            </span>
            Email
          </a>
        </div>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- 404

export const FamiliaNotFound = () => (
  <Page title={NOT_FOUND.title}>
    <section className="fx-lost">
      <Contours className="fx-lost__bg" />
      <div className="fx-wrap" style={{ display: 'grid', gap: 20, justifyItems: 'center', paddingTop: 100 }}>
        <p className="fx-lost__code" aria-hidden="true">
          404
        </p>
        <BlurHeading as="h1" text={NOT_FOUND.title} trigger="load" />
        <p className="fx-lead">{NOT_FOUND.intro}</p>
        <Button to="/" icon="arrowLeft">
          Back to home
        </Button>
      </div>
    </section>
  </Page>
);
