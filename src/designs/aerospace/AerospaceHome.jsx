import { useLayoutEffect, useRef, useState } from 'react';
import MaskedHeading from '../../components/reactbits/MaskedHeading/MaskedHeading';
import ScrollReveal from '../../components/reactbits/ScrollReveal/ScrollReveal';
import ScrollStack, { ScrollStackItem } from '../../components/reactbits/ScrollStack/ScrollStack';
import { ABOUT, CHAPTER, HOME, JOIN, PILLARS, STATS } from '../../data/content';
import { EVENT_ALBUMS } from '../../data/gallery';
import { EXECUTIVE_CABINET } from '../../data/leadership';
import { HERO_SLIDES } from '../../data/media';
import { FORMS } from '../../data/site';
import HeroMedia from '../shared/HeroMedia';
import Icon from '../shared/Icon';
import { gsap, prefersReducedMotion } from '../shared/motion';
import Page from '../shared/Page';
import {
  Button,
  Eyebrow,
  Person,
  RiseText,
  SectionHead,
  StatsBand,
  StoryScroller,
  TextLink,
  UniversityLoop,
} from './AerospaceParts';

const Hero = () => {
  const [paused, setPaused] = useState(false);
  const [slide, setSlide] = useState(0);

  return (
    <section className="ax-hero" aria-labelledby="ax-hero-title">
      <HeroMedia className="ax-hero__media" paused={paused} onChange={setSlide} />
      <div className="ax-hero__shade" aria-hidden="true" />

      <div className="ax-wrap ax-hero__content">
        <div data-reveal="fade" data-reveal-start="top bottom">
          <Eyebrow light>{CHAPTER.name}</Eyebrow>
        </div>
        <h1 id="ax-hero-title" className="ax-caps ax-hero__title">
          <RiseText text="Opening" trigger="load" />{' '}
          <RiseText text="Pathways" trigger="load" delay={40} />{' '}
          <RiseText text="in STEM" trigger="load" delay={46} />
        </h1>
        <p className="ax-hero__sub" data-reveal="up" data-reveal-delay="0.6" data-reveal-start="top bottom">
          {CHAPTER.chapter}
        </p>
        <div className="ax-hero__actions" data-reveal="up" data-reveal-delay="0.75" data-reveal-start="top bottom">
          <Button to="/join">Become a member</Button>
          <Button to="/events" variant="ghost" icon="calendar">
            See events
          </Button>
        </div>
      </div>

      <div className="ax-hero__foot">
        <div className="ax-wrap">
          <p className="ax-scrollcue" aria-hidden="true">
            <i /> Scroll for more
          </p>
          <div className="ax-slides" data-paused={paused ? '' : undefined}>
            <div className="ax-slides__row">
              <span className="ax-slides__caption">
                {String(slide + 1).padStart(2, '0')} — {HERO_SLIDES[slide].caption}
              </span>
              <button
                type="button"
                className="ax-round-btn"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Play background slideshow' : 'Pause background slideshow'}
              >
                <Icon name={paused ? 'play' : 'pause'} size={14} />
              </button>
            </div>
            <div className="ax-slides__bars" aria-hidden="true">
              {HERO_SLIDES.map((s, i) => (
                <span
                  key={s.src}
                  className="ax-slides__bar"
                  data-active={i === slide ? '' : undefined}
                  data-done={i < slide ? '' : undefined}
                >
                  <i key={i === slide ? `on-${slide}` : 'off'} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Image that moves slower than the page while it's on screen.
const ParallaxImage = ({ src }) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const tween = gsap.fromTo(
      ref.current.querySelector('img'),
      { yPercent: -8 },
      { yPercent: 8, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  return (
    <div ref={ref} className="ax-cta__img">
      <img src={src} alt="" loading="lazy" decoding="async" />
    </div>
  );
};

const AerospaceHome = () => (
  <Page title={null}>
    <Hero />

    <section className="ax-section">
      <div className="ax-wrap ax-statement">
        <div data-reveal="fade">
          <Eyebrow>Who we are</Eyebrow>
        </div>
        <div style={{ display: 'grid', gap: 40 }}>
          <ScrollReveal as="p" baseOpacity={0.12} enableBlur blurStrength={6} baseRotation={0} stagger={0.04}>
            {ABOUT.intro}
          </ScrollReveal>
          <div data-reveal="up">
            <TextLink to="/about">More about the chapter</TextLink>
          </div>
        </div>
      </div>
    </section>

    <StatsBand items={STATS} />

    <section className="ax-section ax-section--paper">
      <div className="ax-wrap">
        <SectionHead eyebrow="What we do" title="Four ways we build engineers">
          <p className="ax-lead" style={{ maxWidth: 440 }}>
            {HOME.lead}
          </p>
        </SectionHead>
        <ScrollStack useWindowScroll smoothScroll={false} itemDistance={120} itemStackDistance={28} stackPosition="14%" baseScale={0.88} dimAmount={0.25}>
          {PILLARS.map((pillar, i) => (
            <ScrollStackItem key={pillar.id}>
              <div className="ax-pillar">
                <div className="ax-pillar__img">
                  <img src={pillar.image} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="ax-pillar__body">
                  <span className="ax-pillar__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="ax-caps ax-pillar__title">{pillar.title}</h3>
                    <p className="ax-pillar__text">{pillar.text}</p>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>

    <StoryScroller albums={EVENT_ALBUMS} eyebrow="Featured" title="Recent events" />

    <section className="ax-masked" aria-hidden="true">
      <MaskedHeading
        text="LeaderSHPE"
        tag="p"
        src="/images/gallery/2026-spring-general-meeting-2/photo-02.jpg"
        fillScale={1.3}
        parallax={30}
        drift={14}
        weight={600}
        tracking={0.06}
        textScale={0.15}
        reveal="rise"
      />
    </section>

    <section className="ax-section" style={{ paddingTop: 48 }}>
      <div className="ax-wrap">
        <SectionHead eyebrow="Leadership" title="Meet the cabinet">
          <TextLink to="/leadershpe">All LeaderSHPE</TextLink>
        </SectionHead>
        <div className="ax-people" data-reveal-group="up" data-reveal-stagger="0.1">
          {EXECUTIVE_CABINET.slice(0, 4).map((m) => (
            <Person key={m.name} img={m.img} name={m.name} role={m.title} focus={m.focus} />
          ))}
        </div>
      </div>
    </section>

    <section className="ax-section ax-section--paper" style={{ paddingBlock: 'clamp(72px, 8vw, 120px)' }}>
      <div className="ax-wrap">
        <SectionHead eyebrow="Alumni" title="Where our alumni go">
          <TextLink to="/alumni">Meet our alumni</TextLink>
        </SectionHead>
      </div>
      <UniversityLoop />
    </section>

    <section className="ax-cta" aria-labelledby="ax-cta-title">
      <ParallaxImage src="/images/gallery/2026-spring-ucla-soles-matlab-workshop/photo-01.jpg" />
      <div className="ax-cta__body">
        <div data-reveal="fade">
          <Eyebrow light>Join us</Eyebrow>
        </div>
        <h2 id="ax-cta-title" className="ax-caps ax-cta__title">
          <RiseText text="Join SHPE @ ECC" />
        </h2>
        <p className="ax-lead" style={{ color: 'rgba(255,255,255,0.78)' }} data-reveal="up">
          {JOIN.intro}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }} data-reveal="up" data-reveal-delay="0.1">
          <Button href={FORMS.interest} variant="white" icon="arrowUpRight">
            Interest form
          </Button>
          <Button to="/join" variant="ghost">
            How to join
          </Button>
        </div>
      </div>
    </section>
  </Page>
);

export default AerospaceHome;
