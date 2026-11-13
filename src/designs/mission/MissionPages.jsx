import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import ChromaGrid from '../../components/reactbits/ChromaGrid/ChromaGrid';
import CountUp from '../../components/reactbits/CountUp/CountUp';
import Magnet from '../../components/reactbits/Magnet/Magnet';
import Masonry from '../../components/reactbits/Masonry/Masonry';
import Radar from '../../components/reactbits/Radar/Radar';
import ScrollReveal from '../../components/reactbits/ScrollReveal/ScrollReveal';
import SplitFlapText from '../../components/reactbits/SplitFlapText/SplitFlapText';
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
import { ALL_PHOTOS, EVENT_ALBUMS, GALLERY_ALBUMS } from '../../data/gallery';
import { EXECUTIVE_CABINET, LEADERSHPE_AT_LARGE, SHOW_AT_LARGE, SUPPORTING_ALUMNI } from '../../data/leadership';
import { CHAPTER_EMAIL, FORMS, SOCIAL_LINKS } from '../../data/site';
import { WEBSITE_TEAM } from '../../data/websiteTeam';
import ExternalLink from '../shared/ExternalLink';
import Icon from '../shared/Icon';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../shared/motion';
import Page from '../shared/Page';
import {
  Button,
  Corners,
  DestinationBars,
  FieldLog,
  Label,
  PageHeader,
  ProgramsList,
  Scramble,
  SectionHead,
} from './MissionParts';

const pad = (n, size = 2) => String(n).padStart(size, '0');
const socialHref = (label) => SOCIAL_LINKS.find((s) => s.label === label)?.href;

// Three photos that drift at different speeds while scrolling.
const ParallaxStrip = ({ images }) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('img', ref.current).forEach((img, i) => {
        gsap.fromTo(
          img,
          { yPercent: -12 - i * 3 },
          { yPercent: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="mx-strip" data-reveal="clip">
      {images.map((src) => (
        <figure key={src}>
          <img src={src} alt="" loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------- About

export const MissionAbout = () => (
  <Page title="About">
    <PageHeader index="01" label="About" title={ABOUT.title} intro={ABOUT.intro} />

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="01.1" label="Approach">
          <ScrollReveal as="p" containerClassName="mx-statement" baseOpacity={0.14} enableBlur={false} baseRotation={0}>
            {ABOUT.body}
          </ScrollReveal>
        </SectionHead>
      </div>
      <ParallaxStrip
        images={[
          '/images/gallery/2026-spring-jet-engine-design/photo-01.jpg',
          '/images/gallery/2026-spring-ucla-soles-matlab-workshop/photo-03.jpg',
          '/images/gallery/2026-spring-general-meeting-1/photo-02.jpg',
        ]}
      />
    </section>

    <section className="mx-section mx-section--panel">
      <div className="mx-wrap">
        <SectionHead index="01.2" label="Programs" title="What we do" />
        <ProgramsList items={PILLARS} />
      </div>
    </section>

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="01.3" label="National network">
          <p className="mx-display" style={{ fontSize: 'clamp(80px, 16vw, 260px)', lineHeight: 0.8 }}>
            <CountUp from={1900} to={CHAPTER.nationalFounded} duration={2.6} />
          </p>
          <p className="mx-lead" data-reveal="up">
            {ABOUT.national}
          </p>
        </SectionHead>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- LeaderSHPE

const cabinetItems = (members) =>
  members.map((m) => ({ image: m.img, title: m.name, subtitle: m.title, alt: m.name, accent: '#fd652f' }));

export const MissionLeadership = () => (
  <Page title="LeaderSHPE">
    <PageHeader
      index="02"
      label="Command"
      title={LEADERSHIP_PAGE.title}
      intro={LEADERSHIP_PAGE.intro}
      meta={`${pad(EXECUTIVE_CABINET.length)} officers on roster`}
    >
      <div style={{ display: 'grid', gap: 14, justifyItems: 'start' }}>
        <p className="mx-mono" style={{ margin: 0 }}>{LEADERSHIP_PAGE.applyPrompt}</p>
        <Button href={FORMS.officerApplication} variant="solid" icon="arrowUpRight">
          {LEADERSHIP_PAGE.applyLabel}
        </Button>
      </div>
    </PageHeader>

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="02.1" label="Executive Cabinet" title="Executive Cabinet" />
        <div data-reveal="fade">
          <ChromaGrid
            items={cabinetItems(EXECUTIVE_CABINET)}
            columns={4}
            minCardWidth={220}
            gap={1}
            aspectRatio="4 / 5"
            cardRadius={0}
            radius={300}
            theme="dark"
          />
        </div>
      </div>
    </section>

    <section className="mx-section mx-section--panel">
      <div className="mx-wrap">
        <SectionHead index="02.2" label="Responsibilities" title="Who does what" />
        <table className="mx-table" data-reveal="fade">
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Officer</th>
              <th scope="col">Focus</th>
            </tr>
          </thead>
          <tbody>
            {EXECUTIVE_CABINET.map((m) => (
              <tr key={`${m.title}-${m.name}`}>
                <td className="mx-mono" style={{ color: 'var(--mx-accent)' }}>{m.title}</td>
                <td className="mx-table__strong">{m.name}</td>
                <td style={{ color: '#c3c5c9' }}>{m.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {SHOW_AT_LARGE && (
      <section className="mx-section">
        <div className="mx-wrap">
          <SectionHead index="02.3" label="At large" title="LeaderSHPE at Large" />
          <ChromaGrid items={cabinetItems(LEADERSHPE_AT_LARGE)} columns={5} minCardWidth={200} gap={1} aspectRatio="4 / 5" cardRadius={0} theme="dark" />
        </div>
      </section>
    )}

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="02.4" label="Support" title="Supporting alumni" />
        <div style={{ display: 'grid', gap: 16 }}>
          {SUPPORTING_ALUMNI.map((m) => (
            <article key={m.name} className="mx-feature" data-reveal="up">
              <Corners />
              <img src={m.img} alt={m.name} loading="lazy" />
              <div style={{ display: 'grid', gap: 14 }}>
                <Label>{m.title}</Label>
                <h3 className="mx-display" style={{ fontSize: 'clamp(30px, 4vw, 60px)' }}>{m.name}</h3>
                <p className="mx-lead">{m.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- Website Team

export const MissionTeam = () => (
  <Page title="Website Team">
    <PageHeader index="03" label="Engineering" title={TEAM_PAGE.title} intro={TEAM_PAGE.intro} meta="Built with React + Vite" />
    <section className="mx-section">
      <div className="mx-wrap">
        <div className="mx-files" data-reveal-group="up">
          {WEBSITE_TEAM.map((member, i) => {
            const isEmail = member.link.startsWith('mailto:');
            const isOpen = member.name === 'Open Position';
            return (
              <ExternalLink
                key={member.name}
                href={member.link}
                className={`mx-file${isOpen ? ' mx-file--open' : ''}`}
                aria-label={isEmail ? `Email ${member.name}` : `${member.name} GitHub profile`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="mx-mono">File {pad(i + 1, 3)}</span>
                  <span className="mx-mono" style={{ color: isOpen ? 'var(--mx-accent)' : undefined }}>
                    {isOpen ? 'Recruiting' : 'Active'}
                  </span>
                </div>
                <div className="mx-file__head">
                  <img src={member.img} alt="" loading="lazy" />
                  <div className="mx-file__info">
                    <h2 className="mx-display mx-file__name">{member.name}</h2>
                    <p className="mx-mono" style={{ margin: 0, color: 'var(--mx-text)' }}>{member.handle}</p>
                    <p style={{ margin: '6px 0 0', color: 'var(--mx-muted)' }}>{member.role}</p>
                  </div>
                </div>
                <div>
                  <Label plain className="mx-file__label">Key contributions</Label>
                  <ul className="mx-file__list" style={{ marginTop: 12 }}>
                    {member.contributions.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <p className="mx-file__impact">
                  <strong style={{ color: 'var(--mx-text)' }}>Additional impact: </strong>
                  {member.highlights}
                </p>
                <div className="mx-file__foot">
                  <span className="mx-textlink">
                    {isEmail ? 'Email' : 'GitHub'} <Icon name="arrowUpRight" size={14} />
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

const BOARD_COLUMNS = ['Event', 'Date', 'Location', 'Status'];

export const MissionEvents = () => (
  <Page title="Events">
    <PageHeader index="04" label="Operations" title={EVENTS.title} intro={`${EVENTS.intro} ${EVENTS.venueNote}`} />

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="04.1" label="Departures" title="Schedule" />
        <div className="mx-board" data-reveal="up">
          <div className="mx-board__head" aria-hidden="true">
            {BOARD_COLUMNS.map((c) => (
              <span key={c} className="mx-mono">{c}</span>
            ))}
          </div>
          {EVENTS.upcoming.map((event) => (
            <div key={event.name} className="mx-board__row">
              <SplitFlapText text={event.name.toUpperCase()} padTo={0} loop={false} tileColor="#15181d" textColor="#ecebe7" fontSize={24} gap={3} tileRadius={2} />
              <SplitFlapText text={event.date} padTo={0} loop={false} tileColor="#15181d" textColor="#fd652f" fontSize={24} gap={3} tileRadius={2} />
              <SplitFlapText text={EVENTS.room.toUpperCase()} padTo={0} loop={false} tileColor="#15181d" textColor="#ecebe7" fontSize={24} gap={3} tileRadius={2} />
              <SplitFlapText text="PENDING" padTo={0} loop={false} tileColor="#15181d" textColor="#72a9be" fontSize={24} gap={3} tileRadius={2} />
            </div>
          ))}
          <div className="mx-board__note">
            <p className="mx-mono" style={{ margin: 0 }}>{EVENTS.upcoming[0].note}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button href={socialHref('Instagram')} size="sm" icon="arrowUpRight">Instagram</Button>
              <Button href={socialHref('Discord')} size="sm" icon="arrowUpRight">Discord</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-section mx-section--panel">
      <div className="mx-wrap">
        <SectionHead index="04.2" label="Venue" title="Where we meet" />
        <div className="mx-venue" data-reveal="up">
          <div className="mx-venue__info">
            <div style={{ display: 'grid', gap: 18 }}>
              <Label>Default location</Label>
              <p className="mx-display mx-venue__name">{EVENTS.venue}</p>
              <p className="mx-lead">{EVENTS.venueNote}</p>
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              <p className="mx-mono" style={{ margin: 0 }}>Room · {EVENTS.room}</p>
              <p className="mx-mono" style={{ margin: 0 }}>{CHAPTER.campus} · {CHAPTER.city}</p>
              <p className="mx-mono" style={{ margin: 0 }}>{CHAPTER.coordinates}</p>
            </div>
          </div>
          <div className="mx-venue__radar" aria-hidden="true">
            <Radar color="#72a9be" ringCount={5} spokeCount={8} targets={3} speed={0.8} trail={0.4} glow={0.7} grain={0.02} />
          </div>
        </div>

        <div className="mx-formats" style={{ marginTop: 64 }} data-reveal-group="up">
          {EVENTS.formats.map((format, i) => (
            <div key={format} className="mx-format">
              <span className="mx-mono">{pad(i + 1)}</span>
              <h3 className="mx-display mx-format__name">{format}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="04.3" label="Field log" title="Past events" />
        <FieldLog albums={EVENT_ALBUMS} />
        <div className="mx-board__note" style={{ marginTop: 48, border: '1px solid var(--mx-line-2)' }} data-reveal="up">
          <p style={{ margin: 0, fontSize: 18 }}>{EVENTS.collab}</p>
          <Button href={`mailto:${CHAPTER_EMAIL}`} variant="solid" icon="mail">
            {CHAPTER_EMAIL}
          </Button>
        </div>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- Gallery

export const MissionGallery = () => {
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
        description: `${p.album.title} · ${p.album.term}`,
      })),
    [filter],
  );

  const refresh = () => window.setTimeout(() => ScrollTrigger.refresh(), 900);

  return (
    <Page title="Gallery">
      <PageHeader
        index="05"
        label="Archive"
        title={GALLERY_PAGE.title}
        intro={GALLERY_PAGE.intro}
        meta={`${pad(GALLERY_ALBUMS.length)} albums · ${pad(ALL_PHOTOS.length)} frames`}
      />
      <section className="mx-section" style={{ paddingTop: 48 }}>
        <div className="mx-wrap">
          <div className="mx-filters" role="group" aria-label="Filter photos by album" data-reveal-group="fade">
            <button type="button" className="mx-filter" aria-pressed={filter === 'all'} onClick={() => { setFilter('all'); refresh(); }}>
              All <span>{pad(ALL_PHOTOS.length)}</span>
            </button>
            {GALLERY_ALBUMS.map((album) => (
              <button
                key={album.folder}
                type="button"
                className="mx-filter"
                aria-pressed={filter === album.folder}
                onClick={() => {
                  setFilter(album.folder);
                  refresh();
                }}
              >
                {album.title} <span>{pad(album.photos.length)}</span>
              </button>
            ))}
          </div>
          <Masonry items={items} columnWidth={320} gap={2} radius={0} hoverEffect="zoom" captions="hover" lightbox stagger={0.04} draggable={false} />
        </div>
      </section>
    </Page>
  );
};

// ---------------------------------------------------------------- Alumni

export const MissionAlumni = () => (
  <Page title="Alumni">
    <PageHeader
      index="06"
      label="Trajectory"
      title={ALUMNI_PAGE.title}
      meta={`${pad(ALL_ALUMNI.length)} alumni on file`}
      intro={
        <>
          {ALUMNI_PAGE.intro} {ALUMNI_PAGE.submitPrompt}{' '}
          {FORMS.alumni ? (
            <ExternalLink href={FORMS.alumni} className="mx-textlink">Submit your information</ExternalLink>
          ) : (
            <a href={`mailto:${CHAPTER_EMAIL}?subject=Alumni%20page`} className="mx-textlink">
              Email us your information
            </a>
          )}
        </>
      }
    />

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="06.1" label="Destinations" title="Transfer universities" />
        <DestinationBars />
      </div>
    </section>

    <section className="mx-section mx-section--panel">
      <div className="mx-wrap">
        <SectionHead index="06.2" label="Roster" title="Alumni roster" />
        <table className="mx-table mx-roster" data-reveal="fade">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Class</th>
              <th scope="col">Chapter role</th>
              <th scope="col">Currently</th>
              <th scope="col">
                <span className="sr-only">LinkedIn</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ALL_ALUMNI.map((a) => (
              <tr key={a.name}>
                <td>
                  <div className="mx-roster__person">
                    <img src={a.img} alt="" loading="lazy" />
                    <span className="mx-table__strong">{a.name}</span>
                  </div>
                </td>
                <td className="mx-mono">{a.graduationYear}</td>
                <td className="mx-mono" style={{ color: 'var(--mx-accent)' }}>{a.role}</td>
                <td style={{ color: '#c3c5c9' }}>{a.currentPosition}</td>
                <td style={{ textAlign: 'right' }}>
                  {a.linkedinUrl && (
                    <ExternalLink href={a.linkedinUrl} className="mx-textlink" aria-label={`${a.name} on LinkedIn`}>
                      LinkedIn <Icon name="arrowUpRight" size={14} />
                    </ExternalLink>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- Join

const JoinSteps = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.mx-step', ref.current).forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 70%',
          onEnter: () => step.setAttribute('data-active', ''),
          onLeaveBack: () => step.removeAttribute('data-active'),
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={ref} className="mx-steps" style={{ margin: 0, padding: 0, listStyle: 'none' }} data-reveal-group="up">
      {JOIN.steps.map((step, i) => (
        <li key={step.title} className="mx-step">
          <span className="mx-step__index">Step {pad(i + 1)}</span>
          <div>
            <h3 className="mx-display mx-step__title">{step.title}</h3>
            {step.note && <p className="mx-step__note">{step.note}</p>}
          </div>
          <span className="mx-step__status">
            <i aria-hidden="true" /> Go
          </span>
        </li>
      ))}
    </ol>
  );
};

export const MissionJoin = () => (
  <Page title="Join">
    <PageHeader index="07" label="Enlist" title="Join SHPE @ ECC" intro={JOIN.intro} meta="Membership sequence">
      <Magnet padding={80} magnetStrength={4}>
        <Button href={FORMS.interest} variant="solid" icon="arrowUpRight">Interest form</Button>
      </Magnet>
    </PageHeader>

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="07.1" label="Sequence" title="How to join" />
        <JoinSteps />
      </div>
    </section>

    <section className="mx-section mx-section--panel">
      <div className="mx-wrap">
        <div className="mx-panel-grid" data-reveal="up">
          <div style={{ display: 'grid', gap: 22, alignContent: 'start' }}>
            <Label index="07.2">Start here</Label>
            <p className="mx-display" style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}>Fill out the interest form.</p>
            <p className="mx-lead">It takes a couple of minutes. We&apos;ll follow up with meeting dates and how to get your national membership.</p>
            <div>
              <Button href={FORMS.interest} variant="solid" icon="arrowUpRight">Interest form</Button>
            </div>
          </div>
          <div>
            <Label index="07.3">Channels</Label>
            <ul className="mx-channel-list">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} <Icon name="arrowUpRight" size={20} />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${CHAPTER_EMAIL}`}>
                  Email <Icon name="mail" size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Page>
);

// ---------------------------------------------------------------- 404

export const MissionNotFound = () => (
  <Page title={NOT_FOUND.title}>
    <section className="mx-lost">
      <div className="mx-lost__radar" aria-hidden="true">
        <Radar color="#fd652f" ringCount={8} targets={0} clutter={0.6} speed={1.2} />
      </div>
      <div className="mx-wrap" style={{ paddingTop: 120 }}>
        <Label index="404">Signal lost</Label>
        <p className="mx-display mx-lost__code" aria-hidden="true">404</p>
        <h1 className="mx-display mx-h2" style={{ margin: '12px 0 20px' }}>
          <Scramble text={NOT_FOUND.title} />
        </h1>
        <p className="mx-lead" style={{ marginBottom: 32 }}>{NOT_FOUND.intro}</p>
        <Button to="/" variant="solid" icon="arrowLeft">Back to home</Button>
      </div>
    </section>
  </Page>
);
