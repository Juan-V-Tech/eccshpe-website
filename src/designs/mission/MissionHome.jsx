import { useState } from 'react';
import ChromaGrid from '../../components/reactbits/ChromaGrid/ChromaGrid';
import Magnet from '../../components/reactbits/Magnet/Magnet';
import Radar from '../../components/reactbits/Radar/Radar';
import ScrollReveal from '../../components/reactbits/ScrollReveal/ScrollReveal';
import ScrollVelocity from '../../components/reactbits/ScrollVelocity/ScrollVelocity';
import { ABOUT, CHAPTER, EVENTS, HOME, JOIN, PILLARS, STATS } from '../../data/content';
import { EVENT_ALBUMS } from '../../data/gallery';
import { EXECUTIVE_CABINET } from '../../data/leadership';
import { HERO_SLIDES } from '../../data/media';
import { FORMS } from '../../data/site';
import HeroMedia from '../shared/HeroMedia';
import Icon from '../shared/Icon';
import Page from '../shared/Page';
import {
  Button,
  Clock,
  Corners,
  DestinationBars,
  FieldLog,
  Label,
  ProgramsList,
  Scramble,
  SectionHead,
  Stats,
} from './MissionParts';

const Hero = () => {
  const [paused, setPaused] = useState(false);
  const [slide, setSlide] = useState(0);
  const current = HERO_SLIDES[slide];

  return (
    <section className="mx-hero" aria-labelledby="mx-hero-title">
      <HeroMedia className="mx-hero__media" paused={paused} onChange={setSlide} />
      <div className="mx-hero__shade" aria-hidden="true" />
      <div className="mx-gridlines" aria-hidden="true" />
      <div className="mx-hero__frame" aria-hidden="true">
        <Corners />
        <span className="mx-hero__scan" />
      </div>

      <div className="mx-wrap">
        <div className="mx-hero__content">
          <div>
            <Label index="[ECC]">{CHAPTER.chapter}</Label>
            <h1 id="mx-hero-title" className="mx-display mx-hero__title">
              <span>
                <Scramble text="Society of Hispanic" />
              </span>
              <span>
                <Scramble text="Professional" />
              </span>
              <span>
                <Scramble text="Engineers" />
              </span>
            </h1>
          </div>
          <div className="mx-hero__aside" data-reveal="up" data-reveal-delay="0.5" data-reveal-start="top bottom">
            <p className="mx-lead">{HOME.lead}</p>
            <div className="mx-hero__actions">
              <Button to="/join" variant="solid">Become a member</Button>
              <Button to="/events" icon="calendar">See events</Button>
            </div>
          </div>
        </div>

        <div
          className="mx-hero__bar"
          data-reveal-group="fade"
          data-reveal-stagger="0.1"
          data-reveal-delay="0.8"
          data-reveal-start="top bottom"
        >
          <div className="mx-hero__cell">
            <Label plain>Location</Label>
            <strong>{CHAPTER.coordinates}</strong>
          </div>
          <div className="mx-hero__cell">
            <Label plain>Local time</Label>
            <strong>
              <Clock />
            </strong>
          </div>
          <div className="mx-hero__cell">
            <Label plain>Next general meeting</Label>
            <strong>
              {EVENTS.upcoming[0].date} <span className="mx-blink">_</span>
            </strong>
          </div>
          <div className="mx-hero__cell">
            <Label plain>
              Frame {String(slide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
            </Label>
            <div className="mx-hero__frame-cell" style={{ display: 'flex' }}>
              <strong style={{ flex: 1 }}>{current.caption}</strong>
              <button
                type="button"
                className="mx-icon-btn"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Play background slideshow' : 'Pause background slideshow'}
              >
                <Icon name={paused ? 'play' : 'pause'} size={14} />
              </button>
            </div>
            <span className="mx-hero__progress" data-paused={paused ? '' : undefined} aria-hidden="true">
              <i key={slide} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Ticker = () => (
  <div className="mx-ticker" aria-hidden="true">
    <ScrollVelocity
      texts={['Community — Leadership — Engineering — ', 'Society of Hispanic Professional Engineers — ']}
      velocity={42}
      numCopies={4}
      outlineAlternate
      fontSize="clamp(44px, 8vw, 128px)"
      color="#ecebe7"
      damping={40}
      stiffness={300}
    />
  </div>
);

const MissionHome = () => (
  <Page title={null}>
    <Hero />
    <Ticker />

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="01" label="Mission">
          <ScrollReveal
            as="p"
            containerClassName="mx-statement"
            baseOpacity={0.14}
            enableBlur={false}
            baseRotation={0}
            stagger={0.04}
          >
            {ABOUT.intro}
          </ScrollReveal>
          <div>
            <Button to="/about" icon="arrowRight">About the chapter</Button>
          </div>
        </SectionHead>
        <Stats items={STATS} />
      </div>
    </section>

    <section className="mx-section mx-section--panel">
      <div className="mx-wrap">
        <SectionHead index="02" label="Programs" title="What we do">
          <p className="mx-lead" data-reveal="up">
            {ABOUT.body}
          </p>
        </SectionHead>
        <ProgramsList items={PILLARS} />
      </div>
    </section>

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="03" label="Field log" title="Recent operations">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'end' }}>
            <p className="mx-lead" data-reveal="up" style={{ maxWidth: '52ch' }}>
              Workshops and meetings from this spring. Open one to see the photos.
            </p>
            <Button to="/gallery" icon="arrowRight">Full gallery</Button>
          </div>
        </SectionHead>
        <FieldLog albums={EVENT_ALBUMS} />
      </div>
    </section>

    <section className="mx-section mx-section--panel">
      <div className="mx-wrap">
        <SectionHead index="04" label="Command" title="LeaderSHPE">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'end' }}>
            <p className="mx-lead" data-reveal="up" style={{ maxWidth: '52ch' }}>
              The Executive Cabinet runs chapter operations, events and member growth. Move your cursor across the grid.
            </p>
            <Button to="/leadershpe" icon="arrowRight">Full roster</Button>
          </div>
        </SectionHead>
        <div data-reveal="fade">
          <ChromaGrid
            items={EXECUTIVE_CABINET.map((m) => ({ image: m.img, title: m.name, subtitle: m.title, alt: m.name, accent: '#fd652f' }))}
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

    <section className="mx-section">
      <div className="mx-wrap">
        <SectionHead index="05" label="Trajectory" title="Where alumni go">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'end' }}>
            <p className="mx-lead" data-reveal="up" style={{ maxWidth: '52ch' }}>
              Universities our alumni transferred to, counted from the alumni roster.
            </p>
            <Button to="/alumni" icon="arrowRight">Alumni</Button>
          </div>
        </SectionHead>
        <DestinationBars />
      </div>
    </section>

    <section className="mx-cta" aria-labelledby="mx-cta-title">
      <div className="mx-cta__radar" aria-hidden="true">
        <Radar color="#fd652f" ringCount={7} spokeCount={12} targets={5} speed={0.6} trail={0.45} glow={0.6} grain={0} clutter={0} centerX={0.72} />
      </div>
      <div className="mx-wrap">
        <Label index="06">Enlist</Label>
        <h2 id="mx-cta-title" className="mx-display mx-cta__title">
          <Scramble text="Join the chapter" />
        </h2>
        <p className="mx-lead" data-reveal="up" style={{ marginBottom: 36 }}>
          {JOIN.intro}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }} data-reveal="up" data-reveal-delay="0.1">
          <Magnet padding={80} magnetStrength={4}>
            <Button href={FORMS.interest} variant="solid" icon="arrowUpRight">Interest form</Button>
          </Magnet>
          <Button to="/join" icon="arrowRight">How to join</Button>
        </div>
      </div>
    </section>
  </Page>
);

export default MissionHome;
