import { useEffect, useRef, useState } from 'react';
import { HERO_SLIDES, HERO_VIDEO } from '../../data/media';
import { usePrefersReducedMotion } from './hooks';
import './HeroMedia.css';

// Full-bleed hero background. Plays HERO_VIDEO when it has a src, otherwise
// a slow Ken Burns slideshow of HERO_SLIDES. Decorative, so hidden from
// screen readers; the parent supplies a pause button.
const HeroMedia = ({ slides = HERO_SLIDES, video = HERO_VIDEO, interval = 6500, paused = false, onChange, className = '' }) => {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef(null);
  const hasVideo = Boolean(video?.src);
  const still = paused || reduced;

  useEffect(() => {
    if (hasVideo || still || slides.length < 2) return undefined;
    const timer = window.setTimeout(() => {
      setPrevious(index);
      setIndex((index + 1) % slides.length);
    }, interval);
    return () => window.clearTimeout(timer);
  }, [index, still, hasVideo, slides.length, interval]);

  useEffect(() => {
    onChange?.(index);
  }, [index, onChange]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (still) el.pause();
    else el.play().catch(() => {});
  }, [still]);

  if (hasVideo) {
    return (
      <div className={`hero-media ${className}`} aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-media__video"
          src={video.src}
          poster={video.poster ?? undefined}
          autoPlay={!still}
          muted
          loop
          playsInline
        />
      </div>
    );
  }

  return (
    <div className={`hero-media ${className}`} data-still={still ? '' : undefined} aria-hidden="true">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          className="hero-media__slide"
          data-active={i === index ? '' : undefined}
          data-previous={i === previous ? '' : undefined}
          style={{ '--hero-media-duration': `${interval + 1600}ms`, objectPosition: slide.position }}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : undefined}
          decoding="async"
        />
      ))}
    </div>
  );
};

export default HeroMedia;
