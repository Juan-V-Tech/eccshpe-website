import { useCallback, useRef, useState } from 'react';
import { Route, Routes } from 'react-router';
import { useGoogleFonts } from '../shared/hooks';
import SmoothScroll from '../shared/SmoothScroll';
import { AerospaceDrawer, AerospaceFooter, AerospaceHeader } from './AerospaceChrome';
import AerospaceHome from './AerospaceHome';
import {
  AerospaceAbout,
  AerospaceAlumni,
  AerospaceEvents,
  AerospaceGallery,
  AerospaceJoin,
  AerospaceLeadership,
  AerospaceNotFound,
  AerospaceTeam,
} from './AerospacePages';
import './aerospace.css';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap';

// Design 02: Aerospace. Cinematic, corporate, wide-tracked caps.
const AerospaceApp = () => {
  useGoogleFonts(FONTS);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef(null);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="ax">
      <SmoothScroll lerp={0.09} />
      <a href="#main" className="ax-skip">
        Skip to content
      </a>
      <div inert={menuOpen}>
        <AerospaceHeader onMenu={openMenu} menuOpen={menuOpen} burgerRef={burgerRef} />
        <main id="main" tabIndex={-1} className="ax-main">
          <Routes>
            <Route path="/" element={<AerospaceHome />} />
            <Route path="/about" element={<AerospaceAbout />} />
            <Route path="/leadershpe" element={<AerospaceLeadership />} />
            <Route path="/website-team" element={<AerospaceTeam />} />
            <Route path="/events" element={<AerospaceEvents />} />
            <Route path="/gallery" element={<AerospaceGallery />} />
            <Route path="/alumni" element={<AerospaceAlumni />} />
            <Route path="/join" element={<AerospaceJoin />} />
            <Route path="*" element={<AerospaceNotFound />} />
          </Routes>
        </main>
        <AerospaceFooter />
      </div>
      <AerospaceDrawer open={menuOpen} onClose={closeMenu} burgerRef={burgerRef} />
    </div>
  );
};

export default AerospaceApp;
