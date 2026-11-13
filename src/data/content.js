// Page copy shared by every design. Edit text here and all designs update.
// Numbers in STATS are counted from the other data files, so they stay true.

import { ALUMNI_LEADERSHIP, ALUMNI_MEMBERS } from './alumni';
import { EVENT_ALBUMS } from './gallery';
import { EXECUTIVE_CABINET } from './leadership';

export const CHAPTER = {
  name: 'Society of Hispanic Professional Engineers',
  short: 'SHPE',
  chapter: 'El Camino College Chapter',
  campus: 'El Camino College',
  city: 'Torrance, CA',
  coordinates: '33.88° N, 118.33° W',
  nationalFounded: 1974,
  tagline: 'Empowering Hispanic engineers at El Camino College.',
};

export const HOME = {
  lead:
    'Building community, advancing leadership, and opening pathways in STEM for Hispanic and underrepresented students. Join us for workshops, mentorship, industry connections, and collaborative engineering projects.',
};

export const ABOUT = {
  title: 'About Our Chapter',
  intro:
    'We are the El Camino College student chapter of the Society of Hispanic Professional Engineers, dedicated to empowering Hispanic and other underrepresented students in STEM. Our community is built on fostering academic success and creating pathways to thriving STEM careers for our members.',
  body:
    'Through national conferences, engineering workshops, local competitions, and volunteer opportunities, we launch our members into becoming the next generation of engineers. With the support of industry partners, campus connections, and our national network, we provide high-quality opportunities for our members to grow academically, professionally, and personally.',
  national:
    'SHPE was founded in Los Angeles in 1974 and has grown into the largest association in the nation for Hispanics in STEM. As a chapter, our members connect to that national network of students and professionals.',
};

// What the chapter does. Images are chapter photos from public/images/gallery.
export const PILLARS = [
  {
    id: 'community',
    title: 'Community',
    text: 'A supportive network of Hispanic and underrepresented students in STEM, from your first semester to transfer and beyond.',
    image: '/images/gallery/2026-spring-general-meeting-2/photo-02.jpg',
  },
  {
    id: 'academics',
    title: 'Academics',
    text: 'Peer support and MESA|STEM Center resources to help you succeed in your courses and stay on track to transfer.',
    image: '/images/gallery/2026-spring-general-meeting-1/photo-02.jpg',
  },
  {
    id: 'professional',
    title: 'Professional Development',
    text: 'Workshops, mentorship and industry connections, from LinkedIn sessions to national conferences.',
    image: '/images/gallery/2026-spring-general-meeting-2/photo-01.jpg',
  },
  {
    id: 'engineering',
    title: 'Hands-on Engineering',
    text: 'Technical workshops, projects and competitions, like our Jet Engine Design and MATLAB workshops.',
    image: '/images/gallery/2026-spring-jet-engine-design/photo-04.jpg',
  },
];

export const LEADERSHIP_PAGE = {
  title: 'LeaderSHPE',
  intro: 'Our Executive Cabinet and LeaderSHPE members drive chapter operations, events, and member growth.',
  applyPrompt: 'Interested in helping lead SHPE at El Camino?',
  applyLabel: 'Officer applications are open.',
};

export const TEAM_PAGE = {
  title: 'Website Team',
  intro:
    'Meet the developers and contributors behind the SHPE at El Camino website. This team handles design, development, testing, and content delivery so members can find events, opportunities, and resources quickly.',
};

export const EVENTS = {
  title: 'Upcoming Events',
  intro: 'Workshops, networking nights, outreach and more.',
  venue: 'MESA|STEM Center',
  room: 'Nats 4',
  venueNote: 'Meetings are held in the MESA|STEM Center (Nats 4) unless otherwise stated.',
  upcoming: [
    {
      name: 'General Meeting',
      date: 'TBA',
      status: 'To be announced',
      note: 'Follow us on Instagram or Discord for the latest dates.',
    },
  ],
  formats: ['General Meetings', 'Technical Workshops', 'Networking Nights', 'Outreach'],
  collab: 'Have an event idea? Want to collab? Reach out via email.',
};

export const GALLERY_PAGE = {
  title: 'Gallery',
  intro: 'Photos from our general meetings, workshops and milestones.',
};

export const ALUMNI_PAGE = {
  title: 'Alumni',
  intro:
    'Our alumni continue to make an impact in industry and academia. They led our chapter, built our community, and are now paving the way for future SHPE members.',
  submitPrompt: 'Interested in being added to our Alumni page?',
};

export const JOIN = {
  title: 'Join SHPE @ El Camino College',
  intro:
    'Empowering Hispanic engineers through community, leadership, and professional growth. Becoming a member connects you to peers, mentors, projects, conferences and national SHPE resources.',
  steps: [
    { title: 'Be an active MESA|ASEM student at El Camino College.' },
    { title: 'Fill out the interest form.' },
    { title: 'Attend a general meeting or event.' },
    {
      title: 'Get your SHPE national membership.',
      note: 'Ask us how to get one provided to you, or purchase your own. Limited free memberships available.',
    },
  ],
};

export const NOT_FOUND = {
  title: 'Page not found',
  intro: "We couldn't find the page you were looking for. It may have moved, or the link may be out of date.",
};

export const CREDITS = [
  "Made with ❤ by Juan Ventura-Romero '26",
  'Maintained with ❤ by El Camino College SHPE Website Team Students',
];

// ---------------------------------------------------------------------------
// Derived from the data files.

export const ALL_ALUMNI = [...ALUMNI_LEADERSHIP, ...ALUMNI_MEMBERS];

// "Structural Engineering at UCSD" -> "UCSD"
export const UNIVERSITIES = [...new Set(ALL_ALUMNI.map((a) => a.currentPosition.split(' at ').pop()))];

export const STATS = [
  { value: EXECUTIVE_CABINET.length, label: 'Student officers' },
  { value: ALL_ALUMNI.length, label: 'Alumni transfers' },
  { value: UNIVERSITIES.length, label: 'Transfer universities' },
  { value: EVENT_ALBUMS.length, label: 'Events this spring' },
];
