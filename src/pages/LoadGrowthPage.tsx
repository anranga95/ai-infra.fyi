import { useState, useEffect } from 'react';
import LoadGrowthCalculator from '../components/LoadGrowthCalculator';

// Image Carousel Component
function ImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div style={{ maxWidth: '65%', margin: '1rem auto' }}>
      <div style={{ position: 'relative', height: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', maxHeight: '100%', maxWidth: '100%', overflow: 'hidden', borderRadius: '8px' }}>
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="data-image"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Navigation buttons - positioned relative to fixed-height container */}
        <button
          onClick={goToPrevious}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          ›
        </button>
      </div>

      {/* Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: 'none',
              background: index === currentIndex ? 'var(--primary)' : 'var(--border)',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Caption */}
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5rem', textAlign: 'center' }}>
        {currentIndex === 0 && 'Source: BloombergNEF'}
        {currentIndex === 1 && 'Source: EPRI and EpochAI'}
        {currentIndex === 2 && 'Source: S&P Global'}
        {currentIndex === 3 && 'Source: London Economics'}
        {currentIndex === 4 && 'Source: GridStrategies'}
      </p>
    </div>
  );
}

function LoadGrowthPage() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'calculator'>('analysis');
  const [activeSection, setActiveSection] = useState<string>('tldr');
  const [tocOpen, setTocOpen] = useState<boolean>(false);

  // Scroll spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'tldr',
        'background',
        'industry-estimates',
        'gpu-ceiling',
        'data-constraints',
        'load-growth',
        'methodology',
        'aggregate',
        'by-region',
        'by-power-source',
        'by-tenant',
        'grid-capacity',
        'utilities-upgrades',
        'btm-capacity',
        'gas-turbines',
        'nuclear',
        'fuel-cells'
      ];

      // Find which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in the top half of the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            Analysis
          </button>
          <button
            className={`tab ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'analysis' && (
      <div className="calculator-container">
        <div className="header">
          <h1>⚡ Load Growth</h1>
        </div>
      <div className="framework-layout">
        <aside className="framework-toc-sidebar">
          <div className="toc-sticky">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Contents</h3>
              <button
                className="toc-toggle-btn"
                onClick={() => setTocOpen(!tocOpen)}
                aria-label="Toggle table of contents"
              >
                {tocOpen ? '−' : '+'}
              </button>
            </div>
            <ul className={`toc-list ${tocOpen ? 'toc-open' : ''}`} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ margin: '0.5rem 0' }}>
                <a
                  href="#tldr"
                  onClick={(e) => handleTocClick(e, 'tldr')}
                  className={activeSection === 'tldr' ? 'active' : ''}
                >
                  TLDR
                </a>
              </li>
              <li style={{ margin: '0.5rem 0' }}>
                <a
                  href="#background"
                  onClick={(e) => handleTocClick(e, 'background')}
                  className={activeSection === 'background' ? 'active' : ''}
                >
                  Background
                </a>
                <ul style={{ listStyle: 'none', paddingLeft: '1rem', margin: '0.25rem 0' }}>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#industry-estimates"
                      onClick={(e) => handleTocClick(e, 'industry-estimates')}
                      className={activeSection === 'industry-estimates' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      Industry Estimates
                    </a>
                  </li>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#gpu-ceiling"
                      onClick={(e) => handleTocClick(e, 'gpu-ceiling')}
                      className={activeSection === 'gpu-ceiling' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      GPU Ceiling
                    </a>
                  </li>
                </ul>
              </li>
              <li style={{ margin: '0.5rem 0' }}>
                <a
                  href="#load-growth"
                  onClick={(e) => handleTocClick(e, 'load-growth')}
                  className={activeSection === 'load-growth' ? 'active' : ''}
                >
                  Expected Load Growth
                </a>
                <ul style={{ listStyle: 'none', paddingLeft: '1rem', margin: '0.25rem 0' }}>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#methodology"
                      onClick={(e) => handleTocClick(e, 'methodology')}
                      className={activeSection === 'methodology' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      Methodology
                    </a>
                  </li>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#data-constraints"
                      onClick={(e) => handleTocClick(e, 'data-constraints')}
                      className={activeSection === 'data-constraints' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      Data Constraints
                    </a>
                  </li>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#aggregate"
                      onClick={(e) => handleTocClick(e, 'aggregate')}
                      className={activeSection === 'aggregate' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      Aggregate
                    </a>
                  </li>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#by-region"
                      onClick={(e) => handleTocClick(e, 'by-region')}
                      className={activeSection === 'by-region' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      By Region
                    </a>
                  </li>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#by-power-source"
                      onClick={(e) => handleTocClick(e, 'by-power-source')}
                      className={activeSection === 'by-power-source' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      By Power Source
                    </a>
                  </li>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#by-tenant"
                      onClick={(e) => handleTocClick(e, 'by-tenant')}
                      className={activeSection === 'by-tenant' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      By Tenant
                    </a>
                  </li>
                </ul>
              </li>
              <li style={{ margin: '0.5rem 0' }}>
                <a
                  href="#grid-capacity"
                  onClick={(e) => handleTocClick(e, 'grid-capacity')}
                  className={activeSection === 'grid-capacity' ? 'active' : ''}
                >
                  Grid Capacity
                </a>
                <ul style={{ listStyle: 'none', paddingLeft: '1rem', margin: '0.25rem 0' }}>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#utilities-upgrades"
                      onClick={(e) => handleTocClick(e, 'utilities-upgrades')}
                      className={activeSection === 'utilities-upgrades' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      Utilities Upgrades
                    </a>
                  </li>
                </ul>
              </li>
              <li style={{ margin: '0.5rem 0' }}>
                <a
                  href="#btm-capacity"
                  onClick={(e) => handleTocClick(e, 'btm-capacity')}
                  className={activeSection === 'btm-capacity' ? 'active' : ''}
                >
                  BTM Capacity
                </a>
                <ul style={{ listStyle: 'none', paddingLeft: '1rem', margin: '0.25rem 0' }}>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#gas-turbines"
                      onClick={(e) => handleTocClick(e, 'gas-turbines')}
                      className={activeSection === 'gas-turbines' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      Gas Turbines
                    </a>
                  </li>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#nuclear"
                      onClick={(e) => handleTocClick(e, 'nuclear')}
                      className={activeSection === 'nuclear' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      Nuclear
                    </a>
                  </li>
                  <li style={{ margin: '0.25rem 0' }}>
                    <a
                      href="#fuel-cells"
                      onClick={(e) => handleTocClick(e, 'fuel-cells')}
                      className={activeSection === 'fuel-cells' ? 'active' : ''}
                      style={{ fontSize: '0.9rem' }}
                    >
                      Fuel Cells
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>

        <div className="framework-content">
          <h2 id="tldr" style={{ marginTop: 0 }}>TLDR</h2>
          <p>
            Projections for the increase in power demand from data centers in the US vary widely: between <strong>31-134GW by 2030</strong>. Estimates on the higher end do not appear to account for limitations around the semiconductor supply chain. Load growth is linearly correlated with the % of global GPU supply secured by US companies.
          </p>
          <p>
            Assuming the US maintains a 50% market share of the global GPU supply through 2030, aggregate load growth depends on the % annual growth of semiconductor manufacturing. Use the calculator tab to model scenarios.
          </p>
          <p>Load growth by 2030 based on GPU global supply CAGR:</p>
          <ul>
            <li>Low (11%: London Economics): <strong>31.5GW</strong></li>
            <li>Medium (40%: EPRI/EpochAI): <strong>50GW</strong></li>
            <li>High (70%: EPRI/EpochAI): <strong>70GW</strong></li>
          </ul>
          <p>
            The aggregate load growth from data centers tracked in this analysis is <strong>28.29GW by early 2029</strong>.
          </p>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

          <h2 id="background">Background</h2>

          <h3 id="industry-estimates">Industry Estimates</h3>
          <p>
            Datacenter power demand projections for 2030 vary significantly across research firms, reflecting different methodologies and assumptions:
          </p>
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>2030 Projection (GW)</th>
                <th>Notes</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>London Economics</td>
                <td>31.5*</td>
                <td>Extrapolated using methodology provided in paper, assuming US secures 50% of global semiconductor chip supply</td>
                <td><a href="https://www.londoneconomics.com/wp-content/uploads/2025/07/LEI-Data-Center-Final-Report-07072025.pdf" target="_blank" rel="noopener noreferrer">Report</a></td>
              </tr>
              <tr>
                <td>RTO/ISO/BA</td>
                <td>57</td>
                <td>Based on estimates from London Economics from aggregated utilities data, extrapolating from 2029 to 2030</td>
                <td><a href="https://www.londoneconomics.com/wp-content/uploads/2025/07/LEI-Data-Center-Final-Report-07072025.pdf" target="_blank" rel="noopener noreferrer">Report</a></td>
              </tr>
              <tr>
                <td>EPRI/EpochAI</td>
                <td>62</td>
                <td>Based on hyperscaler CapEx, extrapolated for recent growth</td>
                <td><a href="https://www.epri.com/research/products/000000003002033669" target="_blank" rel="noopener noreferrer">Report</a></td>
              </tr>
              <tr>
                <td>TD Cowen</td>
                <td>65</td>
                <td>Based on anticipated shipments of processing chips for datacenters</td>
                <td><a href="https://www.tdsecurities.com/ca/en/data-centers-2-power-constraints" target="_blank" rel="noopener noreferrer">Report</a></td>
              </tr>
              <tr>
                <td>BloombergNEF</td>
                <td>78</td>
                <td></td>
                <td><a href="https://about.bnef.com/insights/clean-energy/ai-and-the-power-grid-where-the-rubber-meets-the-road/" target="_blank" rel="noopener noreferrer">Report</a></td>
              </tr>
              <tr>
                <td>Grid Strategies</td>
                <td>90</td>
                <td>Based on analysis of utility and regional load forecast publications</td>
                <td><a href="https://gridstrategiesllc.com/wp-content/uploads/Grid-Strategies-National-Load-Growth-Report-2025.pdf" target="_blank" rel="noopener noreferrer">Report</a></td>
              </tr>
              <tr>
                <td>S&P Global</td>
                <td>134.4</td>
                <td></td>
                <td><a href="https://www.spglobal.com/energy/en/news-research/latest-news/electric-power/101425-data-center-grid-power-demand-to-rise-22-in-2025-nearly-triple-by-2030" target="_blank" rel="noopener noreferrer">Report</a></td>
              </tr>
            </tbody>
          </table>
          <h3>Why do the estimates vary so widely?</h3>
          <p>
            The gap between forecasts stems from the opaque nature of data center development, which forces analysts to rely on different signals. Certain projections (BloombergNEF, S&P Global) extrapolate from financial announcements and hyperscaler CapEx, treating the massive capital allocated to AI as a direct proxy for future power demand. Other models (LEI, EPRI, TD Cowen) account for physical bottlenecks, such as chip manufacturing limits.
          </p>
          <ImageCarousel
            images={[
              { src: '/images/bloomberg nef plot.png', alt: 'BloombergNEF Projection' },
              { src: '/images/epri plot.png', alt: 'EPRI Projection' },
              { src: '/images/sp plot.png', alt: 'S&P Global Projection' },
              { src: '/images/le plot.png', alt: 'London Economics Projection' },
              { src: '/images/grid strategies plot.png', alt: 'Grid Strategies Projection' }
            ]}
          />

          <h3 id="gpu-ceiling">GPU Ceiling</h3>
          <p>
            A July 2025 <a href="https://www.londoneconomics.com/wp-content/uploads/2025/07/LEI-Data-Center-Final-Report-07072025.pdf" target="_blank" rel="noopener noreferrer">report</a> by London Economics International (LEI) suggests US utility forecasts projecting 57 GW of new data center load by 2030 are critically overstated because they fail to account for global hardware supply limitations. Assuming &lt;11% annual growth in GPU manufacturing capacity, the total global production of AI chips through 2030 can only support approximately 63 GW of capacity worldwide. Current forecasts imply the US would need to monopolize over 90% of this global supply, which is unrealistic given its current market share of less than 50%.
          </p>
          <p>
            Adjusting for a feasible 50% global GPU market share implies the US requires only 31.5 GW of new capacity, effectively halving the growth expected by grid operators. The authors point to a systemic bias where utilities validate "phantom" duplicate requests while ignoring upstream manufacturing bottlenecks that act as a hard speed limit on deployment.
          </p>
          <p>
            However, the &lt;11% annual growth assumed by LEI is conservative. Contrasting analysis from EPRI and EpochAI projects between 40-70% annual expansion in manufacturing capacity. The figure below applies LEI's market-share methodology to these more aggressive supply chain scenarios to test the feasibility of current load forecasts.
          </p>
          <div style={{ maxWidth: '70%', margin: '1rem auto 0' }}>
            <img
              src="/images/gpu supply vs load growth.png"
              alt="GPU Supply vs Load Growth"
              className="data-image"
              style={{ width: '100%', display: 'block' }}
            />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5rem', textAlign: 'center' }}>
              Load Growth (GW) vs. % of Global Chip Supply Secured (US 2025-2030):<br />
              Linear extrapolation of LEI market-share methodology with EPRI/EpochAI estimates for GPU supply growth; prepared by author
            </p>
          </div>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

          <h2 id="load-growth">Expected Load Growth</h2>
          <p>→ Forecasted <strong>28.29 GW</strong> by early <strong>2029</strong></p>

          <h3 id="methodology">Methodology</h3>
          <p>
            <strong>Data sources:</strong> <a href="https://epoch.ai/data/data-centers" target="_blank" rel="noopener noreferrer">EpochAI datacenter database</a> (Accessed 31 Dec 2025), supplemented with additional projects from Oracle and others with a high degree of confidence.
          </p>
          <p>
            This analysis only includes datacenter campuses (including multi-phase) that can be validated with satellite imagery.
          </p>
          <p>
            See complete <a href="https://docs.google.com/spreadsheets/d/19_33yM4cW-wz-qYEv0irZvpgOpRf3uatqThB8Z-0acc/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer">dataset</a>.
          </p>
          <div style={{ maxWidth: '70%', margin: '1rem auto 0' }}>
            <img
              src="/images/epochai plot.png"
              alt="EpochAI Historical Context"
              className="data-image"
              style={{ width: '100%', display: 'block' }}
            />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5rem', textAlign: 'center' }}>
              Frontier datacenter capacity tracked by EpochAI
            </p>
          </div>

          <h3 id="data-constraints">Data Constraints</h3>
          <p>Forecasting datacenter load growth faces significant challenges:</p>
          <ul>
            <li><strong>Shell Corp Obfuscation:</strong> Major hyperscalers file permits under anonymous LLCs, obscuring true tenant identity and intended capacity.</li>
            <li><strong>Construction vs. Energization Lag:</strong> Satellite imagery tracks exterior progress, but cannot confirm the delivery of power and cooling equipment required for "live" load.</li>
            <li><strong>Interconnection Attrition:</strong> Grid queue positions are unreliable indicators of energization; historically, ~20-45% of projects suspend or withdraw.</li>
          </ul>

          <h3 id="aggregate">Aggregate</h3>
          <div style={{ maxWidth: '70%', margin: '1rem auto 0' }}>
            <img
              src="/images/load growth cumulative.png"
              alt="Load Growth Cumulative"
              className="data-image"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <p><strong>Key insights:</strong></p>
          <ul>
            <li>Cumulative capacity shows sharp acceleration post-2024 as hyperscalers break ground on AI-specific facilities</li>
            <li>Growth is front-loaded: 2025-2027 capacity additions exceed previous decade combined</li>
            <li>Plateau expected 2028-2030 as interconnection queue constraints create natural ceiling</li>
          </ul>

          <h3 id="by-region">By Region</h3>
          <div style={{ maxWidth: '70%', margin: '1rem auto 0' }}>
            <img
              src="/images/load growth by region.png"
              alt="Load Growth by Region"
              className="data-image"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <p><strong>Regional concentration:</strong></p>
          <ul>
            <li><strong>ERCOT (Texas):</strong> Leading deployment due to abundant natural gas, renewables, and streamlined interconnection (4.2-year avg)</li>
            <li><strong>PJM (Mid-Atlantic):</strong> High existing capacity but longest queue times (7+ years) creating bottleneck</li>
            <li><strong>MISO (Midwest):</strong> Growing rapidly on renewable potential and improving interconnection process</li>
            <li><strong>CAISO (California):</strong> Limited growth due to stringent environmental review and grid congestion</li>
            <li><strong>Southeast (non-ISO):</strong> Emerging hotspot with vertically-integrated utilities offering bilateral deals</li>
          </ul>

          <h3 id="by-power-source">By Power Source</h3>
          <div style={{ maxWidth: '70%', margin: '1rem auto 0' }}>
            <img
              src="/images/load growth by power source.png"
              alt="Load Growth by Power Source"
              className="data-image"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <p><strong>Power source trends:</strong></p>
          <ul>
            <li><strong>Grid-connected (60%):</strong> Traditional model, dependent on regional generation mix</li>
            <li><strong>Behind-the-meter gas (30%):</strong> Fast-growing due to interconnection delays; uses CCGTs and aeroderivative turbines</li>
            <li><strong>Behind-the-meter nuclear (5%):</strong> SMR projects targeting late 2020s/early 2030s</li>
            <li><strong>Behind-the-meter renewables + storage (5%):</strong> Limited to specific use cases due to intermittency</li>
          </ul>

          <h3 id="by-tenant">By Tenant</h3>
          <div style={{ maxWidth: '70%', margin: '1rem auto 0' }}>
            <img
              src="/images/load growth by tenant.png"
              alt="Load Growth by Tenant"
              className="data-image"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <p><strong>Tenant distribution:</strong></p>
          <ul>
            <li><strong>Microsoft/OpenAI:</strong> Largest planned capacity (25-30% of total)</li>
            <li><strong>Amazon/AWS:</strong> Distributed strategy across multiple regions</li>
            <li><strong>Google/Alphabet:</strong> Focused on owned+operated facilities</li>
            <li><strong>Meta:</strong> Large-scale projects in ERCOT, Louisiana</li>
            <li><strong>xAI/Tesla:</strong> Concentrated deployments in Texas, Memphis</li>
            <li><strong>Oracle, Coreweave, Others:</strong> Fill remaining capacity</li>
          </ul>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

          <h2 id="grid-capacity">Grid Capacity</h2>
          <h3>Interconnection Queues</h3>
          <p>
            ISO/RTO interconnection processes determine how quickly new datacenter load can access the grid. Queue characteristics vary significantly by region:
          </p>
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Grid</th>
                <th>Study Duration</th>
                <th>Agreement to Operation</th>
                <th>Suspension Rate (%)</th>
                <th>Processing Approach</th>
                <th>Avg Total Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ERCOT</td>
                <td>12-18 months</td>
                <td>2-3 years</td>
                <td>20</td>
                <td>Connect-and-manage; cluster studies</td>
                <td>4.2 years (fastest)</td>
              </tr>
              <tr>
                <td>PJM</td>
                <td>24-36 months</td>
                <td>3-4 years</td>
                <td>46-79</td>
                <td>Traditional NRIS; RRI fast-track pilot</td>
                <td>7+ years (slowest)</td>
              </tr>
              <tr>
                <td>MISO</td>
                <td>18-24 months</td>
                <td>3-4 years</td>
                <td>20-30</td>
                <td>ERAS expedited + cluster studies</td>
                <td>6 years avg</td>
              </tr>
              <tr>
                <td>CAISO</td>
                <td>24-36 months</td>
                <td>3-5 years</td>
                <td>30-45</td>
                <td>Cluster-based (recent transition)</td>
                <td>8 years (longest)</td>
              </tr>
              <tr>
                <td>ISO-NE</td>
                <td>12-18 months</td>
                <td>2-3 years</td>
                <td>46-79</td>
                <td>Cluster studies; modernized queue</td>
                <td>3.6 years (fastest NE)</td>
              </tr>
              <tr>
                <td>SPP</td>
                <td>18-24 months</td>
                <td>2-3 years</td>
                <td>25-35</td>
                <td>Consolidated Planning; Surplus Cluster</td>
                <td>5 years avg</td>
              </tr>
              <tr>
                <td>NYISO</td>
                <td>20-28 months</td>
                <td>3-4 years</td>
                <td>46-79</td>
                <td>Evolving cluster process</td>
                <td>6 years avg</td>
              </tr>
            </tbody>
          </table>
          <p><strong>Analysis:</strong></p>
          <ul>
            <li><strong>ERCOT's advantage:</strong> Competitive wholesale market + connect-and-manage approach enables fastest deployment</li>
            <li><strong>PJM's bottleneck:</strong> Aging transmission infrastructure + strict reliability standards create longest delays; driving hyperscalers toward BTM generation</li>
            <li><strong>High suspension rates (46-79%):</strong> Northeast/Mid-Atlantic markets see speculative queue positions withdrawn as developers encounter unforeseen costs or delays</li>
            <li><strong>Cluster study adoption:</strong> Most ISOs shifting to cluster-based studies (batching projects) to improve efficiency, but initial implementation creating short-term slowdowns</li>
            <li><strong>Fast-track programs:</strong> PJM's RRI (Replacement Resource Interconnection) offers accelerated path for projects replacing retired generation</li>
          </ul>
          <p><strong>Impact on datacenter deployment:</strong></p>
          <ul>
            <li>Developers increasingly bypassing grid interconnection entirely via behind-the-meter generation</li>
            <li>Co-location with existing power plants (nuclear, gas) eliminates interconnection queue</li>
            <li>ERCOT and SPP emerging as preferred regions for grid-connected datacenters</li>
          </ul>

          <h3 id="utilities-upgrades">Utilities Upgrades</h3>
          <p>
            U.S. investor-owned utilities project <strong>$1.1 trillion in capital expenditures by 2030</strong> to accommodate load growth, according to the Edison Electric Institute (EEI). This investment aims to add <strong>579 GW of generation and transmission capacity</strong>, far exceeding historical annual averages.
          </p>
          <p><strong>Breakdown:</strong></p>
          <ul>
            <li><strong>Generation:</strong> $450B (new gas plants, renewable capacity, grid-scale storage)</li>
            <li><strong>Transmission:</strong> $400B (new lines, substation upgrades, interconnections)</li>
            <li><strong>Distribution:</strong> $250B (local grid reinforcement for datacenter clusters)</li>
          </ul>
          <p><strong>Key challenges:</strong></p>
          <ul>
            <li><strong>Permitting timelines:</strong> New transmission lines average 7-10 years from proposal to energization</li>
            <li><strong>Equipment shortages:</strong> Transformers, circuit breakers, and STATCOM devices face 24-36 month lead times</li>
            <li><strong>Skilled labor scarcity:</strong> Insufficient electrical workforce to execute projects at required pace</li>
            <li><strong>Cost recovery risk:</strong> Utilities concerned about stranded assets if datacenter demand doesn't materialize as projected</li>
          </ul>
          <p>
            <strong>Source:</strong> <a href="https://www.eei.org/-/media/Project/EEI/Documents/Issues-and-Policy/Finance-And-Tax/IndustryCapexReport.pdf" target="_blank" rel="noopener noreferrer">EEI 2024 Industry CapEx Report</a>
          </p>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

          <h2 id="btm-capacity">BTM Capacity</h2>

          <h3 id="gas-turbines">Gas Turbines</h3>
          <p>
            Behind-the-meter gas generation is the fastest-deployable solution for datacenter power, with combined-cycle gas turbines (CCGT) offering high efficiency and natural gas aeroderivative turbines providing rapid response. However, <strong>lead times now extend to 2029</strong> for new units from major manufacturers.
          </p>

          <h4>Major Manufacturers</h4>
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Key Models</th>
                <th>Capacity per Unit</th>
                <th>Current Lead Time</th>
                <th>Annual Production Capacity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GE Vernova</td>
                <td>9HA.01, 9HA.02</td>
                <td>448 MW, 571 MW</td>
                <td>2027-2029</td>
                <td>20-24 GW/year (expanding to 24 GW by mid-2028)</td>
              </tr>
              <tr>
                <td></td>
                <td>7HA.01, 7HA.02, 7HA.03</td>
                <td>290 MW, 384 MW, 430 MW</td>
                <td>2027-2029</td>
                <td>Backlog: 80 GW through 2029</td>
              </tr>
              <tr>
                <td></td>
                <td>LM6000 (aeroderivative)</td>
                <td>40-50 MW</td>
                <td>2027-2028</td>
                <td>Faster delivery for smaller units</td>
              </tr>
              <tr>
                <td>Siemens Energy</td>
                <td>SGT-800</td>
                <td>45-62 MW</td>
                <td>2026-2028</td>
                <td>14 GW orders in FY2025 (65% for datacenters)</td>
              </tr>
              <tr>
                <td></td>
                <td>H-class turbines</td>
                <td>Up to 593 MW</td>
                <td>2028-2029</td>
                <td>Expanding blade/vane facility in Florida</td>
              </tr>
              <tr>
                <td>Mitsubishi Heavy Industries</td>
                <td>M701F, M701JAC</td>
                <td>300+ MW</td>
                <td>2027-2029</td>
                <td>Doubling capacity over next 2 years</td>
              </tr>
            </tbody>
          </table>

          <p><strong>GE Vernova details:</strong></p>
          <ul>
            <li><strong>Backlog:</strong> 80 GW (sold out through 2029, targeting 2030 sell-out by end of 2026)</li>
            <li><strong>Manufacturing expansion:</strong> $300M investment across Greenville SC, Schenectady NY, Parsippany NJ facilities</li>
            <li><strong>Datacenter focus:</strong> 7 turbines reserved for Chevron/Engine No.1 datacenter "power foundries" (4 GW planned by 2027)</li>
            <li><strong>Hydrogen capability:</strong> 50% H₂ capable today, pathway to 100% for future decarbonization</li>
            <li><strong>Delivery acceleration:</strong> Modular packaging reduces installation time by 8 weeks vs. traditional</li>
          </ul>

          <p><strong>Siemens Energy details:</strong></p>
          <ul>
            <li><strong>Modular offerings:</strong> SGT-800 turbines packaged with Eaton electrical systems for turnkey datacenter deployment</li>
            <li><strong>Standard configuration:</strong> 500 MW plants with redundancy + battery storage</li>
            <li><strong>Time-to-market advantage:</strong> Concurrent datacenter + power plant construction reduces timeline by 2-4 years vs. grid interconnection</li>
            <li><strong>Flexibility:</strong> Scalable from 45 MW (single turbine) to 500+ MW (multi-turbine array)</li>
          </ul>

          <p><strong>Mitsubishi details:</strong></p>
          <ul>
            <li><strong>Capacity doubling:</strong> Responding to Asian and North American datacenter demand</li>
            <li><strong>Focus:</strong> Mid-range turbines (200-400 MW) for regional datacenter deployments</li>
          </ul>

          <h4>Alternative Sources</h4>
          <p><strong>Refurbished aeroderivative turbines:</strong></p>
          <ul>
            <li><strong>ProEnergy PE6000:</strong> Repurposed CF6-80C2 aircraft engines converted to natural gas turbines</li>
            <li><strong>Delivery:</strong> As early as 2027 (vs. 2029+ for new units)</li>
            <li><strong>Use case:</strong> "Bridging power" for 5-7 years until grid interconnection complete</li>
            <li><strong>Sales:</strong> 21 turbines sold for &gt;1 GW datacenter projects</li>
            <li><strong>Market growth:</strong> Refurbished turbine sector expanding rapidly due to OEM backlog</li>
          </ul>
          <p>
            <strong>Boom Supersonic:</strong> Leveraging supersonic aircraft engine technology for stationary power generation. Targeting fast deployment for AI datacenter loads where grid access is limited. (<a href="https://boomsupersonic.com/flyby/ai-needs-more-power-than-the-grid-can-deliver-supersonic-tech-can-fix-that" target="_blank" rel="noopener noreferrer">Source</a>)
          </p>

          <h3 id="nuclear">Nuclear</h3>
          <p>
            Small Modular Reactors (SMRs) represent the zero-carbon BTM option for datacenters, but deployment remains <strong>late 2020s/early 2030s</strong> due to regulatory approval timelines.
          </p>

          <h4>Leading SMR Technologies</h4>
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Developer</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Timeline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NuScale Power</td>
                <td>NuScale Power Module</td>
                <td>77 MWe per module (up to 924 MWe with 12 modules)</td>
                <td>First deployment 2030</td>
                <td>Only NRC-approved SMR design (June 2025 uprate approval)</td>
              </tr>
              <tr>
                <td>GE Hitachi (GE Vernova)</td>
                <td>BWRX-300</td>
                <td>300 MWe</td>
                <td>First unit 2028-2029 (Canada Darlington)</td>
                <td>60% lower capital cost vs. traditional nuclear</td>
              </tr>
              <tr>
                <td>X-energy</td>
                <td>Xe-100</td>
                <td>80 MWe per reactor</td>
                <td>First unit early 2030s</td>
                <td>$700M Series C funding (Amazon-backed); high-temperature gas-cooled</td>
              </tr>
              <tr>
                <td>Kairos Power</td>
                <td>KP-FHR</td>
                <td>140 MWe (modular to 560 MWe)</td>
                <td>First unit 2030</td>
                <td>Google PPA for 500 MW across 6-7 reactors</td>
              </tr>
              <tr>
                <td>TerraPower</td>
                <td>Natrium</td>
                <td>345 MWe</td>
                <td>Wyoming project 2030</td>
                <td>$650M Series C (Bill Gates, NVIDIA); sodium-cooled fast reactor</td>
              </tr>
            </tbody>
          </table>

          <h4>Major Datacenter SMR Commitments</h4>
          <p><strong>Amazon Web Services:</strong></p>
          <ul>
            <li><strong>5 GW total commitment</strong> by 2039</li>
            <li><strong>Energy Northwest (Washington):</strong> 4 Xe-100 reactors (320 MW initial, expandable to 960 MW)</li>
            <li><strong>Dominion Energy (Virginia):</strong> 300+ MW near North Anna nuclear station</li>
            <li><strong>X-energy investment:</strong> $500M to support 5+ GW manufacturing capacity</li>
          </ul>

          <p><strong>Google:</strong></p>
          <ul>
            <li><strong>World's first corporate SMR PPA</strong> (Oct 2024)</li>
            <li><strong>Kairos Power:</strong> 500 MW across 6-7 molten salt reactors</li>
            <li><strong>Timeline:</strong> First unit 2030, full deployment 2035</li>
          </ul>

          <p><strong>Microsoft:</strong></p>
          <ul>
            <li><strong>Partnerships under evaluation</strong> for SMR co-location</li>
            <li><strong>Focus:</strong> Zero-carbon baseload to complement renewables</li>
          </ul>

          <p><strong>TVA/ENTRA1:</strong></p>
          <ul>
            <li><strong>6 GW NuScale deployment</strong> across Tennessee Valley</li>
            <li><strong>Largest U.S. SMR program</strong> to support datacenter and regional load growth</li>
          </ul>

          <h4>Deployment Constraints</h4>
          <ul>
            <li><strong>Regulatory approval:</strong> Even NRC-certified designs face site-specific licensing (12-24 months)</li>
            <li><strong>Fuel supply chain:</strong> Specialized fuel fabrication capacity ramping up (e.g., HALEU for advanced designs)</li>
            <li><strong>Construction timeline:</strong> 24-36 months for modular SMRs (vs. 5-10 years traditional nuclear)</li>
            <li><strong>Capital costs:</strong> $5,000-8,000/kW (higher upfront than gas, but zero fuel cost and 60+ year lifespan)</li>
          </ul>
          <p>
            <strong>Early 2030s deployment is realistic</strong> for hyperscalers with capital and regulatory capacity; widespread adoption likely post-2035.
          </p>

          <h3 id="fuel-cells">Fuel Cells</h3>
          <p>
            Proton exchange membrane (PEM) fuel cells powered by hydrogen are emerging as <strong>ultra-high reliability</strong> backup/supplemental power for mission-critical datacenters.
          </p>
          <p><strong>Current applications:</strong></p>
          <ul>
            <li><strong>Backup power:</strong> 24+ hour runtime without diesel generators (zero emissions)</li>
            <li><strong>Peak shaving:</strong> Reducing grid demand during high-cost periods</li>
            <li><strong>Microgrid integration:</strong> Pairing with renewable generation + battery storage for islanded operation</li>
          </ul>
          <p><strong>Leading providers:</strong></p>
          <ul>
            <li><strong>Bloom Energy:</strong> Solid oxide fuel cells (SOFC) for baseload + backup</li>
            <li><strong>Ballard/Siemens Qstor:</strong> PEM fuel cells integrated with battery energy storage systems (BESS)</li>
          </ul>
          <p><strong>Deployment constraints:</strong></p>
          <ul>
            <li><strong>Hydrogen supply:</strong> Limited green hydrogen availability at scale; most fuel cells currently use natural gas reforming</li>
            <li><strong>Cost:</strong> $4,000-6,000/kW installed (higher than diesel gensets)</li>
            <li><strong>Efficiency:</strong> ~50-60% electrical efficiency (vs. 40-45% for gas turbines)</li>
          </ul>
          <p>
            <strong>Market trajectory:</strong> Fuel cells remain <strong>niche</strong> for datacenters (&lt; 2% of total BTM capacity) but growing in high-reliability/zero-emission jurisdictions (California, Northeast). Widespread adoption contingent on hydrogen infrastructure build-out.
          </p>

          <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            <strong>Sources:</strong> Industry Estimates (London Economics, EPRI, TD Cowen, BloombergNEF, Grid Strategies, S&P Global), Gas Turbines (GE Vernova investor updates, Siemens Energy press releases, Utility Dive, Power Engineering), SMRs (NuScale Power, GE Hitachi, X-energy, World Nuclear Association, NEA SMR Dashboard), Grid Interconnection (ERCOT, PJM, MISO, CAISO interconnection queue reports), Utility Spending (Edison Electric Institute 2024 CapEx Report)
          </p>
        </div>
      </div>
      </div>
      )}

      {/* Calculator Tab Content */}
      {activeTab === 'calculator' && (
        <LoadGrowthCalculator />
      )}
    </div>
  );
}

export default LoadGrowthPage;
