import { useState } from 'react';
import CountUp from '../../components/reactbits/CountUp/CountUp';
import LogoLoop from '../../components/reactbits/LogoLoop/LogoLoop';
import RotatingText from '../../components/reactbits/RotatingText/RotatingText';
import SpotlightCard from '../../components/reactbits/SpotlightCard/SpotlightCard';
import Stack from '../../components/reactbits/Stack/Stack';
import TiltedCard from '../../components/reactbits/TiltedCard/TiltedCard';
import { ABOUT, CHAPTER, EVENTS, HOME, PILLARS, STATS, UNIVERSITIES } from '../../data/content';
import { ALL_PHOTOS, GALLERY_ALBUMS } from '../../data/gallery';
import { EXECUTIVE_CABINET } from '../../data/leadership';
import { CHAPTER_EMAIL } from '../../data/site';
import HeroMedia from '../shared/HeroMedia';
import Icon from '../shared/Icon';
import { scrollToTarget } from '../shared/motion';
import Page from '../shared/Page';
import { BlurHeading, Button, Contours, Kicker, SectionHead, TextLink } from './FamiliaParts';

const PILLAR_ICONS = { community: 'people', academics: 'book', professional: 'briefcase', engineering: 'cpu' };

const Hero = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section className="fx-hero" aria-labelledby="fx-hero-title">
      <HeroMedia className="fx-hero__media" paused={paused} />
      <div className="fx-hero__shade" aria-hidden="true" />
      <div className="fx-wrap fx-hero__content">
        <p className="fx-hero__pre" data-reveal="up" data-reveal-start="top bottom">
          {CHAPTER.name}
        </p>
        <h1 id="fx-hero-title" className="fx-h1 fx-hero__title" data-reveal="up" data-reveal-delay="0.1" data-reveal-start="top bottom">
          <span>Engineer your</span>
          <RotatingText
            texts={['future.', 'career.', 'community.', 'network.']}
            mainClassName="fx-hero__rotate"
            highlight
            highlightColor="#d33a02"
            staggerFrom="last"
            staggerDuration={0.025}
            rotationInterval={2600}
            splitBy="characters"
          />
        </h1>
        <p className="fx-hero__lead" data-reveal="up" data-reveal-delay="0.25" data-reveal-start="top bottom">
          {HOME.lead}
        </p>
        <div className="fx-hero__actions" data-reveal="up" data-reveal-delay="0.35" data-reveal-start="top bottom">
          <Button to="/join">Become a member</Button>
          <Button to="/events" variant="ghost" icon="calendar">
            See events
          </Button>
        </div>
      </div>
      <div className="fx-hero__bottom">
        <div className="fx-wrap">
          <button type="button" className="fx-pause" onClick={() => setPaused((p) => !p)}>
            <Icon name={paused ? 'play' : 'pause'} size={14} />
            {paused ? 'Play slideshow' : 'Pause slideshow'}
          </button>
          <button
            type="button"
            className="fx-explore"
            onClick={() => scrollToTarget(document.getElementById('fx-what'))}
          >
            Explore
            <Icon name="arrowDown" size={18} />
          </button>
          <span style={{ width: 150 }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

// Built once: LogoLoop re-measures whenever its `logos` array changes identity.
const REEL_ROWS = (() => {
  const half = Math.ceil(ALL_PHOTOS.length / 2);
  return [ALL_PHOTOS.slice(0, half), ALL_PHOTOS.slice(half)].map((row) =>
    row.map((p) => ({
      node: <img className="fx-reel__photo" src={p.src} alt={p.alt} width={320} height={240} decoding="async" />,
      title: p.caption,
    })),
  );
})();

const PhotoReel = () => (
  <div className="fx-reel" data-reveal="fade">
    {REEL_ROWS.map((logos, i) => (
      <LogoLoop
        key={i}
        logos={logos}
        speed={i === 0 ? 40 : 34}
        direction={i === 0 ? 'left' : 'right'}
        gap={16}
        logoHeight={240}
        pauseOnHover
        fadeOut
        fadeOutWidth={0.08}
        ariaLabel="Chapter photos"
      />
    ))}
  </div>
);

const graduation = GALLERY_ALBUMS.find((a) => a.kind === 'Milestone');

const FamiliaHome = () => (
  <Page title={null}>
    <Hero />

    <section id="fx-what" className="fx-section fx-section--gray">
      <div className="fx-wrap fx-two">
        <div style={{ display: 'grid', gap: 22 }}>
          <div data-reveal="fade">
            <Kicker>Who we are</Kicker>
          </div>
          <BlurHeading text="What is SHPE?" />
          <p className="fx-lead" data-reveal="up">
            {ABOUT.intro}
          </p>
          <p className="fx-lead" data-reveal="up">
            {ABOUT.national}
          </p>
          <div data-reveal="up">
            <TextLink to="/about">More about our chapter</TextLink>
          </div>
        </div>
        <div className="fx-stats" data-reveal-group="up" data-reveal-stagger="0.1">
          <div className="fx-stat">
            <p className="fx-stat__value">
              <CountUp from={1950} to={CHAPTER.nationalFounded} duration={2.4} />
            </p>
            <p className="fx-stat__label">SHPE founded in Los Angeles</p>
          </div>
          {STATS.slice(0, 4).map((stat) => (
            <div className="fx-stat" key={stat.label}>
              <p className="fx-stat__value">
                <CountUp to={stat.value} duration={2.2} />
              </p>
              <p className="fx-stat__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="fx-section">
      <div className="fx-wrap">
        <SectionHead kicker="What we do" title="Grow in every way" intro="Four ways the chapter supports you, from your first meeting to your transfer." center />
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
      </div>
    </section>

    <section className="fx-section fx-section--gray" style={{ paddingInline: 0 }}>
      <div className="fx-wrap">
        <SectionHead kicker="Life at SHPE ECC" title="Moments from this year" aside={<TextLink to="/gallery">Open the gallery</TextLink>} />
      </div>
      <PhotoReel />
    </section>

    <section className="fx-section">
      <div className="fx-wrap">
        <SectionHead kicker="Upcoming" title="Come to a meeting" aside={<TextLink to="/events">All events</TextLink>} />
        <article className="fx-next" data-reveal="up">
          <div className="fx-next__img">
            <img src="/images/gallery/2026-spring-general-meeting-2/photo-01.jpg" alt="" loading="lazy" />
          </div>
          <div className="fx-next__body">
            <span className="fx-date">
              <span style={{ textAlign: 'center' }}>
                <small>Date</small>
                {EVENTS.upcoming[0].date}
              </span>
            </span>
            <h3 className="fx-h2" style={{ fontSize: 'clamp(26px, 2.6vw, 38px)' }}>
              Next {EVENTS.upcoming[0].name}
            </h3>
            <p className="fx-lead">
              {EVENTS.upcoming[0].note} {EVENTS.venueNote}
            </p>
            <ul className="fx-chips">
              {EVENTS.formats.map((f) => (
                <li key={f} className="fx-chip fx-chip--blue">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section className="fx-section fx-section--navy">
      <div className="fx-wrap fx-two">
        <div className="fx-stack" data-reveal="scale">
          <Stack
            cards={graduation.photos.map((p) => (
              <img key={p.file} src={`/images/gallery/${graduation.folder}/${p.file}`} alt={p.alt} draggable={false} />
            ))}
            layout="fan"
            spread={0.6}
            radius={20}
            frame={8}
            frameColor="#ffffff"
            autoplay
            autoplayDelay={3200}
            pauseOnHover
            sendToBackOnClick
          />
        </div>
        <div style={{ display: 'grid', gap: 22, justifyItems: 'start' }}>
          <div data-reveal="fade">
            <Kicker light>Class of 2026</Kicker>
          </div>
          <BlurHeading text="Congratulations, graduates" />
          <p className="fx-lead" data-reveal="up">
            Our graduating officers and members transferred to {UNIVERSITIES.slice(0, -1).join(', ')} and {UNIVERSITIES.at(-1)}. Drag the photos to
            shuffle them.
          </p>
          <ul className="fx-chips" data-reveal-group="up">
            {UNIVERSITIES.map((u) => (
              <li key={u} className="fx-chip fx-chip--orange">
                <Icon name="graduation" size={14} /> {u}
              </li>
            ))}
          </ul>
          <div data-reveal="up">
            <Button to="/alumni" variant="white">
              Meet our alumni
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section className="fx-section">
      <div className="fx-wrap">
        <SectionHead kicker="LeaderSHPE" title="Meet the cabinet" aside={<TextLink to="/leadershpe">Full LeaderSHPE</TextLink>} />
        <div className="fx-people" data-reveal-group="up" data-reveal-stagger="0.08">
          {EXECUTIVE_CABINET.slice(0, 4).map((m) => (
            <div key={m.name} className="fx-person">
              <TiltedCard
                imageSrc={m.img}
                altText={m.name}
                captionText={m.title}
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
                    <strong>{m.title}</strong>
                    {m.focus}
                  </div>
                }
              />
              <h3 className="fx-person__name">{m.name}</h3>
              <p className="fx-person__role">{m.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="fx-cta">
      <Contours className="fx-cta__bg" />
      <div className="fx-wrap">
        <div className="fx-cta__box" data-reveal="scale">
          <Kicker>Want to learn more?</Kicker>
          <BlurHeading text="We'd love to meet you." />
          <p className="fx-lead">Become part of a supportive community that helps you grow academically, professionally and personally.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Button to="/join">Join SHPE @ ECC</Button>
            <Button href={`mailto:${CHAPTER_EMAIL}`} variant="outline" icon="mail">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  </Page>
);

export default FamiliaHome;
