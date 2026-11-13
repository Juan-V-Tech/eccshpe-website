const headshot = (file) => `/images/headshots/${file}`;

export const EXECUTIVE_CABINET = [
  { title: 'Co-President', name: 'Steven Diaz', focus: 'Operations, planning, and chapter vision', img: headshot('steven-diaz.jpg') },
  { title: 'Co-President', name: 'Isaac Bhoorquez', focus: 'Member development and strategic leadership', img: headshot('isaac-bhoorquez.jpg') },
  { title: 'Internal Vice President', name: 'Sebastian Arteaga', focus: 'Internal operations and member support', img: headshot('sebastian-arteaga.jpg') },
  { title: 'External Vice President', name: 'Alejandro Villalta', focus: 'External partnerships and community engagement', img: headshot('alejandro-villalta.jpg') },
  { title: 'Treasurer', name: 'Andrew Garcia', focus: 'Budget stewardship and funding strategy', img: headshot('andrew-garcia.jpg') },
  { title: 'Secretary', name: 'Roselind Perez', focus: 'Documentation, records, and coordination', img: headshot('roselind-perez.jpg') },
  { title: 'ICC Representative', name: 'Roberto Gomez', focus: 'Campus representation and ICC partnerships', img: headshot('roberto-gomez.jpg') },
  { title: 'CAUSE Representative', name: 'Fernando Miranda', focus: 'CAUSE initiatives and community outreach', img: headshot('fernando-miranda.jpg') },
];

// LeaderSHPE at Large is not shown right now. Flip this to true to bring the
// section back on every design.
export const SHOW_AT_LARGE = false;

export const LEADERSHPE_AT_LARGE = [
  { title: 'LeaderSHPE at Large', name: 'Alejandro Villalta', focus: 'Chapter support and cross-team collaboration', img: headshot('alejandro-villalta.jpg') },
  { title: 'LeaderSHPE at Large', name: 'Isaac Bhoorquez', focus: 'Member engagement and program support', img: headshot('isaac-bhoorquez.jpg') },
  { title: 'LeaderSHPE at Large', name: 'Roberto Gomez', focus: 'Operations support and event execution', img: headshot('roberto-gomez.jpg') },
  { title: 'LeaderSHPE at Large', name: 'Sebastian Arteaga', focus: 'Community outreach and member experience', img: headshot('sebastian-arteaga.jpg') },
  { title: 'LeaderSHPE at Large', name: 'Viel Olaguera', focus: 'General chapter initiatives and support', img: headshot('viel-olaguera.jpg') },
];

export const SUPPORTING_ALUMNI = [
  { title: 'Alumni Web Development Lead & Mentor', name: 'Juan Ventura-Romero', focus: 'Guiding and mentoring the web development team', img: headshot('juan-ventura-romero.jpg') },
];
