// Hero media used by the redesigned home pages.
//
// HERO_VIDEO: to use a video, put an MP4 in public/media/ and set `src`
// (for example '/media/hero.mp4'). Ideal: a 20-40 second silent loop of chapter
// b-roll (workshops, CAD screens, group shots), 1920x1080, H.264, under ~8 MB,
// plus a still frame saved as a JPG for `poster`.
// While `src` is null, the hero plays a slideshow of HERO_SLIDES instead.

export const HERO_VIDEO = {
  src: null,
  poster: null,
};

export const HERO_SLIDES = [
  { src: '/images/gallery/2026-spring-jet-engine-design/photo-04.jpg', caption: 'Jet Engine Design Workshop' },
  { src: '/images/gallery/2026-spring-ucla-soles-matlab-workshop/photo-03.jpg', caption: 'UCLA SOLES X MATLAB Workshop' },
  { src: '/images/gallery/2026-spring-general-meeting-2/photo-02.jpg', caption: 'Spring 2026 General Meeting 2' },
  { src: '/images/gallery/2026-spring-jet-engine-design/photo-05.jpg', caption: 'Jet Engine Design Workshop' },
  { src: '/images/gallery/2026-spring-ucla-soles-matlab-workshop/photo-01.jpg', caption: 'UCLA SOLES X MATLAB Workshop' },
];
