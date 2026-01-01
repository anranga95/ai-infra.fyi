import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>AI Infrastructure Economics &<br />Energy Market Intelligence</h1>
        <p className="description">
          Open-source set of tools and models for the nexus of AI infrastructure and energy.<br />
          Intended for researchers, policymakers, investors, operators, and decision-makers.
        </p>
        <p className="author">
          Created by Aditya Nirvaan Ranganathan: <a href="https://www.linkedin.com/in/anranga95/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="mailto:nirvaan.ranga@chicagobooth.edu">nirvaan.ranga@chicagobooth.edu</a>
        </p>

        <div className="modules-grid">
          <div className="module-card">
            <h2>🗺️ Market Map</h2>
            <p>
              Interactive network visualization of the AI infrastructure ecosystem. Explore relationships between data centers, hyperscalers, energy providers, hardware manufacturers, investors, and other stakeholders.
            </p>
            <Link to="/map" className="module-link">View Map →</Link>
          </div>

          <div className="module-card">
            <h2>⚡ Load Growth Model</h2>
            <p>
              View regional and aggregate energy demand growth from the AI infrastructure expansion in the USA. Compare Front-of-the-Meter and Behind-the-Meter capacity.
            </p>
            <Link to="/energy" className="module-link">View Model →</Link>
          </div>

          <div className="module-card">
            <h2>📈 Compute-Month Framework</h2>
            <p>
              Methodology and calculator to model AI datacenter economics using the 1GW-H100-Month standardized unit. Analyze training capacity, inference workloads, and financial metrics.
            </p>
            <Link to="/compute-month" className="module-link">Explore Framework →</Link>
          </div>
        </div>

        <p className="coming-soon-text">
          <strong>More Coming Soon:</strong> Additional research content and analysis tools will be added here. Stay tuned for updates.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
