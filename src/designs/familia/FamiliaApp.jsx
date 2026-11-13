import { Route, Routes } from 'react-router';
import { useGoogleFonts } from '../shared/hooks';
import SmoothScroll from '../shared/SmoothScroll';
import { FamiliaFooter, FamiliaHeader } from './FamiliaChrome';
import FamiliaHome from './FamiliaHome';
import {
  FamiliaAbout,
  FamiliaAlumni,
  FamiliaEvents,
  FamiliaGallery,
  FamiliaJoin,
  FamiliaLeadership,
  FamiliaNotFound,
  FamiliaTeam,
} from './FamiliaPages';
import './familia.css';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap';

// Design 03: Familia. Bright, warm, community-first.
const FamiliaApp = () => {
  useGoogleFonts(FONTS);
  return (
    <div className="fx">
      <SmoothScroll lerp={0.1} />
      <a href="#main" className="fx-skip">
        Skip to content
      </a>
      <FamiliaHeader />
      <main id="main" tabIndex={-1} className="fx-main">
        <Routes>
          <Route path="/" element={<FamiliaHome />} />
          <Route path="/about" element={<FamiliaAbout />} />
          <Route path="/leadershpe" element={<FamiliaLeadership />} />
          <Route path="/website-team" element={<FamiliaTeam />} />
          <Route path="/events" element={<FamiliaEvents />} />
          <Route path="/gallery" element={<FamiliaGallery />} />
          <Route path="/alumni" element={<FamiliaAlumni />} />
          <Route path="/join" element={<FamiliaJoin />} />
          <Route path="*" element={<FamiliaNotFound />} />
        </Routes>
      </main>
      <FamiliaFooter />
    </div>
  );
};

export default FamiliaApp;
