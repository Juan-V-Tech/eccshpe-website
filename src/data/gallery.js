// Gallery albums, newest first. Each album's photos live in
// public/images/gallery/<folder>/ and are referenced by file name.
//
// To add an album: create the folder, add resized photos (~1600px long edge),
// then add an entry at the top of this list.
//
// kind    - shown as a label ("Workshop", "General Meeting", "Milestone")
// term    - when it happened
// summary - one line used on event cards
// cover   - file name of the photo used as the album's cover image

export const GALLERY_ALBUMS = [
  {
    title: 'SHPE Class of 2026',
    folder: '2026-class-of-2026',
    kind: 'Milestone',
    term: 'Class of 2026',
    summary: 'Celebrating our graduating officers and members.',
    cover: 'destiny-munguia-and-miguel-gonzalez.jpg',
    photos: [
      { file: 'juan-ventura-romero.jpg', alt: 'Juan Ventura-Romero in graduation regalia', caption: 'Juan Ventura-Romero | Co-President 2026' },
      { file: 'destiny-munguia-and-miguel-gonzalez.jpg', alt: 'Destiny Munguia and Miguel Gonzalez in graduation regalia', caption: 'Destiny Munguia | Secretary 2026 & Miguel Gonzalez | Treasurer 2026' },
      { file: 'nalupono-nagamine.jpg', alt: 'Nalupono Nagamine in graduation regalia', caption: 'Nalupono Nagamine | Class of 2026' },
    ],
  },
  {
    title: 'Jet Engine Design',
    folder: '2026-spring-jet-engine-design',
    kind: 'Workshop',
    term: 'Spring 2026',
    summary: 'A hands-on workshop modeling jet engine components in CAD.',
    cover: 'photo-04.jpg',
    photos: [
      { file: 'photo-01.jpg', alt: 'Jet Engine Design Workshop photo 1', caption: 'Jet Engine Design Workshop' },
      { file: 'photo-02.jpg', alt: 'Jet Engine Design Workshop photo 2', caption: 'Jet Engine Design In Action' },
      { file: 'photo-03.jpg', alt: 'Jet Engine Design Workshop photo 3', caption: 'Jet Engine Design Community' },
      { file: 'photo-04.jpg', alt: 'Jet Engine Design Workshop photo 4', caption: 'Jet Engine Design Guidance' },
      { file: 'photo-05.jpg', alt: 'Jet Engine Design Workshop photo 5', caption: 'Jet Engine Design Exploration' },
    ],
  },
  {
    title: 'UCLA SOLES X MATLAB',
    folder: '2026-spring-ucla-soles-matlab-workshop',
    kind: 'Workshop',
    term: 'Spring 2026',
    summary: 'A MATLAB workshop run with UCLA SOLES.',
    cover: 'photo-03.jpg',
    photos: [
      { file: 'photo-01.jpg', alt: 'UCLA SOLES X MATLAB Workshop group photo', caption: 'MATLAB Workshop Session 1 Group Photo' },
      { file: 'photo-03.jpg', alt: 'Students collaborating at the MATLAB workshop', caption: 'MATLAB Workshop Session 1 Group Collaboration' },
      { file: 'photo-05.jpg', alt: 'UCLA SOLES members guiding students at the MATLAB workshop', caption: 'MATLAB Workshop Session 1 UCLA SOLES Guidance' },
    ],
  },
  {
    title: 'Spring 2026 General Meeting 2',
    folder: '2026-spring-general-meeting-2',
    kind: 'General Meeting',
    term: 'Spring 2026',
    summary: 'A LinkedIn workshop presented by Steven Diaz.',
    cover: 'photo-02.jpg',
    photos: [
      { file: 'photo-01.jpg', alt: 'Steven Diaz presenting a LinkedIn workshop', caption: 'Steven Diaz Presents: LinkedIn Workshop' },
      { file: 'photo-02.jpg', alt: 'General Meeting 2 group photo', caption: 'General Meeting 2 Group Photo' },
    ],
  },
  {
    title: 'Spring 2026 General Meeting 1',
    folder: '2026-spring-general-meeting-1',
    kind: 'General Meeting',
    term: 'Spring 2026',
    summary: 'A paper tower building challenge.',
    cover: 'photo-02.jpg',
    photos: [
      { file: 'photo-01.jpg', alt: 'Paper tower building challenge, photo 1', caption: 'Paper Tower Building Challenge Photo 1' },
      { file: 'photo-02.jpg', alt: 'Paper tower building challenge, photo 2', caption: 'Paper Tower Building Challenge Photo 2' },
      { file: 'photo-03.jpg', alt: 'Paper tower building challenge, photo 3', caption: 'Paper Tower Building Challenge Photo 3' },
    ],
  },
];

export const photoSrc = (album, photo) => `/images/gallery/${album.folder}/${photo.file}`;

export const albumCover = (album) => {
  const photo = album.photos.find((p) => p.file === album.cover) ?? album.photos[0];
  return photoSrc(album, photo);
};

// Event albums (everything except milestones such as graduation).
export const EVENT_ALBUMS = GALLERY_ALBUMS.filter((album) => album.kind !== 'Milestone');

// Every photo with its album attached, newest album first.
export const ALL_PHOTOS = GALLERY_ALBUMS.flatMap((album) =>
  album.photos.map((photo) => ({ ...photo, album, src: photoSrc(album, photo) })),
);
