import { lazy } from 'react';

// The site designs you can switch between. Each one is loaded only when picked.
// To ship a single design later: point App.jsx at it and remove the switcher.

export const DESIGNS = [
  {
    id: 'mission',
    index: '01',
    name: 'Mission',
    blurb: 'Dark and technical. Inspired by Anduril and Mach Industries.',
    Component: lazy(() => import('./mission/MissionApp')),
  },
  {
    id: 'aerospace',
    index: '02',
    name: 'Aerospace',
    blurb: 'Cinematic and corporate. Inspired by Northrop Grumman.',
    Component: lazy(() => import('./aerospace/AerospaceApp')),
  },
  {
    id: 'familia',
    index: '03',
    name: 'Familia',
    blurb: 'Bright and community-first. Inspired by SHPE LMU.',
    Component: lazy(() => import('./familia/FamiliaApp')),
  },
  {
    id: 'classic',
    index: '00',
    name: 'Current',
    blurb: 'The site as it is today, for comparison.',
    Component: lazy(() => import('./classic/ClassicApp')),
  },
];

export const DEFAULT_DESIGN = 'mission';

// Set to false to hide the floating design switcher.
export const SHOW_DESIGN_SWITCHER = true;

export const findDesign = (id) => DESIGNS.find((d) => d.id === id);
