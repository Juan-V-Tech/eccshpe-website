import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Team from './pages/team';
import Events from './pages/events';
import Join from './pages/join';
import StaggeredMenu from './components/StaggeredMenu';
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Team', ariaLabel: 'View our team', link: '/team' },
    { label: 'Events', ariaLabel: 'See our upcoming events', link: '/events' },
    { label: 'Join', ariaLabel: 'Join the chapter', link: '/join' },
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/shpe_elco/' },
    { label: 'GitHub', link: 'https://github.com/ECCSHPE' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  const handleNavigate = (href) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <div className="app-shell">
      {/* Overlay menu */}
      <StaggeredMenu
        position="right"
        items={menuItems.map(i => ({ ...i, onClick: () => handleNavigate(i.link) }))}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#0a2540"
        openMenuButtonColor="#0a2540"
        changeMenuColorOnOpen={false}
        colors={["#0070C0", "#001F5B", "#72A9BE"]}
        logoUrl="/SHPE_Rlogo_horiz_RGB_FC.png"
        accentColor="#D33A02"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />

      {/* Page content area */}
      <main className="page-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} SHPE @ El Camino College (Torrance, CA)</p>
      </footer>
    </div>
  );
}

export default App;
