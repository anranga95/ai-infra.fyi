import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ComputeMonthPage from './pages/ComputeMonthPage';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import EnergyPage from './pages/EnergyPage';
import SourcesPage from './pages/SourcesPage';
import './styles/global.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <nav className="main-nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
              AI-infra.fyi
            </Link>
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <Link to="/" onClick={closeMobileMenu}>About</Link>
              <Link to="/compute-month" onClick={closeMobileMenu}>Compute-Month</Link>
              <Link to="/map" onClick={closeMobileMenu}>Market Map</Link>
              <Link to="/energy" onClick={closeMobileMenu}>Load Growth</Link>
              <Link to="/sources" onClick={closeMobileMenu}>Sources</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/compute-month" element={<ComputeMonthPage />} />
          <Route path="/energy" element={<EnergyPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/sources" element={<SourcesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
