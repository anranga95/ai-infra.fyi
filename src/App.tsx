import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ComputeMonthPage from './pages/ComputeMonthPage';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import EnergyPage from './pages/EnergyPage';
import SourcesPage from './pages/SourcesPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="main-nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              AI-infra.fyi
            </Link>
            <div className="nav-links">
              <Link to="/">About</Link>
              <Link to="/compute-month">Compute-Month</Link>
              <Link to="/map">Market Map</Link>
              <Link to="/energy">Load Growth</Link>
              <Link to="/sources">Sources</Link>
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
