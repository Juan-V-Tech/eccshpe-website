import { useCallback, useRef, useState } from 'react';
import { Route, Routes } from 'react-router';
import Noise from '../../components/reactbits/Noise/Noise';
import { useGoogleFonts } from '../shared/hooks';
import SmoothScroll from '../shared/SmoothScroll';
import { MissionFooter, MissionHeader, MissionMenu, RouteCurtain } from './MissionChrome';
import MissionHome from './MissionHome';
import {
  MissionAbout,
  MissionAlumni,
  MissionEvents,
  MissionGallery,
  MissionJoin,
  MissionLeadership,
  MissionNotFound,
  MissionTeam,
} from './MissionPages';
import './mission.css';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap';

// Design 01: Mission. Dark, technical, HUD-like.
const MissionApp = () => {
  useGoogleFonts(FONTS);
  const [menu, setMenu] = useState({ open: false, count: 0 });
  const toggleRef = useRef(null);
  const skipCurtainRef = useRef(false);

  const openMenu = useCallback(() => setMenu((m) => ({ open: true, count: m.count + 1 })), []);
  const closeMenu = useCallback(() => setMenu((m) => ({ ...m, open: false })), []);

  return (
    <div className="mx">
      <SmoothScroll />
      <a href="#main" className="mx-skip">Skip to content</a>

      <div className="mx-shell" inert={menu.open}>
        <MissionHeader menuOpen={menu.open} onMenu={openMenu} toggleRef={toggleRef} />
        <main id="main" tabIndex={-1} className="mx-main">
          <Routes>
            <Route path="/" element={<MissionHome />} />
            <Route path="/about" element={<MissionAbout />} />
            <Route path="/leadershpe" element={<MissionLeadership />} />
            <Route path="/website-team" element={<MissionTeam />} />
            <Route path="/events" element={<MissionEvents />} />
            <Route path="/gallery" element={<MissionGallery />} />
            <Route path="/alumni" element={<MissionAlumni />} />
            <Route path="/join" element={<MissionJoin />} />
            <Route path="*" element={<MissionNotFound />} />
          </Routes>
        </main>
        <MissionFooter />
      </div>

      <MissionMenu
        open={menu.open}
        openCount={menu.count}
        onClose={closeMenu}
        toggleRef={toggleRef}
        skipCurtainRef={skipCurtainRef}
      />
      <RouteCurtain skipRef={skipCurtainRef} />
      <Noise fixed opacity={0.07} fps={18} zIndex={95} />
    </div>
  );
};

export default MissionApp;
