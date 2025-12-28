function EnergyPage() {
  // Data extracted from Epoch AI Frontier Data Centers visualization
  // Grouped by company and sorted by expected live date within each group
  // Power source data merged from CSV
  const datacenterGroups = [
    {
      company: "Amazon",
      datacenters: [
        { name: "Madison Mega Site", location: "Midwest/PJM", peakPower: "~550 MW", status: "Operational", expectedLive: "2024", powerSource: "Grid", type: "Grid (Mix)", notes: "" },
        { name: "Ridgeland", location: "Southeast", peakPower: "~1000 MW", status: "Planned", expectedLive: "2027", powerSource: "Grid", type: "Grid (Solar/Nuclear)", notes: "Partnered with Entergy Mississippi; funding grid upgrades and solar farms, but connected to the public utility." },
        { name: "New Carlisle", location: "Midwest/PJM", peakPower: "~1100 MW", status: "Planned", expectedLive: "2027", note: "(Anthropic)", powerSource: "Grid", type: "Grid (Mix)", notes: "Partnered with NIPSCO (utility); NIPSCO formed \"GenCo\" to bill Amazon for new gas plants, but it is technically a utility connection." },
      ]
    },
    {
      company: "Coreweave",
      datacenters: [
        { name: "Helios", location: "Texas (ERCOT)", peakPower: "~1200 MW", status: "Planned", expectedLive: "2026", powerSource: "Grid", type: "Grid (Wind/Solar)", notes: "Former crypto mining site; typically grid-connected in West Texas to take advantage of cheap renewable prices." },
      ]
    },
    {
      company: "Google",
      datacenters: [
        { name: "New Albany", location: "Midwest/PJM", peakPower: "~300 MW", status: "Operational", expectedLive: "2024", powerSource: "Grid", type: "Grid (Gas Backup)", notes: "Primarily grid; however, some new proposals (PowerConneX) suggest on-site gas generation might be used, but primarily listed as grid-fed for now." },
        { name: "Pryor", location: "Plains (SPP)", peakPower: "~1300 MW", status: "Operational", expectedLive: "2024", powerSource: "Grid", type: "Grid (Renewable PPA)", notes: "Powered by the grid, offset by a massive 724MW solar farm nearby (PPA)." },
        { name: "Omaha", location: "Midwest/PJM", peakPower: "~900 MW", status: "Planned", expectedLive: "2027", powerSource: "Grid", type: "Grid (Gas Expansion)", notes: "Omaha Public Power District is expanding gas plants to serve them, but it is a standard utility connection." },
      ]
    },
    {
      company: "Meta",
      datacenters: [
        { name: "Prometheus", location: "Midwest/PJM", peakPower: "~1100 MW", status: "Operational", expectedLive: "2025", powerSource: "Grid", type: "Grid", notes: "Using an existing substation originally built for Intel; utility connected (AEP Ohio)." },
        { name: "Hyperion", location: "Southeast", peakPower: "~1400 MW", status: "Planned", expectedLive: "2027", powerSource: "Grid", type: "Grid (Nuclear/Clean)", notes: "Entergy providing power; heavily touting nuclear mix from the grid." },
      ]
    },
    {
      company: "Microsoft",
      datacenters: [
        { name: "Fairwater Wisconsin", location: "Midwest/PJM", peakPower: "~3300 MW", status: "Planned", expectedLive: "2028", powerSource: "Grid", type: "Grid (Gas/Solar)", notes: "We Energies is building new gas and solar to serve them, but it is a utility grid connection." },
        { name: "Fairwater Atlanta", location: "Southeast", peakPower: "~1200 MW", status: "Planned", expectedLive: "2028", powerSource: "Grid", type: "Grid", notes: "Connected to the grid; emphasizing \"resilient utility power\" over on-site generation." },
      ]
    },
    {
      company: "OpenAI",
      datacenters: [
        { name: "Stargate Abilene", location: "Texas (ERCOT)", peakPower: "~2100 MW", status: "Planned", expectedLive: "2028", note: "(Microsoft)", powerSource: "BTM", type: "Gas Generators", notes: "Uses a massive on-site natural gas microgrid (700MW+ capacity) to bypass grid queues." },
      ]
    },
    {
      company: "xAI",
      datacenters: [
        { name: "Colossus 1", location: "Southeast", peakPower: "~800 MW", status: "Operational", expectedLive: "2024", powerSource: "BTM", type: "Gas Turbines", notes: "Currently using ~15-35 mobile gas turbines for ~150-421MW; aiming for grid connection later but started off-grid." },
        { name: "Colossus 2", location: "Southeast", peakPower: "~2300 MW", status: "Planned", expectedLive: "2025", powerSource: "BTM", type: "Gas Turbines", notes: "Currently using ~15-35 mobile gas turbines for ~150-421MW; aiming for grid connection later but started off-grid." },
      ]
    },
    {
      company: "Unknown",
      datacenters: [
        { name: "Goodnight", location: "Southeast", peakPower: "~500 MW", status: "Planned", expectedLive: "2026", powerSource: "BTM", type: "Flare Gas", notes: "Uses stranded flare gas directly on-site to power compute; grid-independent." },
      ]
    },
  ];

  return (
    <div className="calculator-container">
      <div className="header">
        <div>
          <h1>⚡ Load Growth Model</h1>
          <p>
            View regional and aggregate energy demand growth from the AI infrastructure expansion in the USA.
          </p>
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Note this analysis is not exhaustive and only includes large AI factories that have broken ground, as tracked by EpochAI through satellite imagery. It does not include announcements (eg. OpenAI Stargate Michigan) where the campus developments cannot be validated.
          </p>
        </div>
      </div>

      {/* Load Growth Charts - Stacked */}
      <div className="image-section">
        <h2>Aggregate Load Growth projected from AI Data Centers</h2>
        <img
          src="/images/load growth model.png"
          alt="Aggregate AI Data Center Load Growth"
          className="data-image"
          style={{ marginBottom: '2rem' }}
        />
        <img
          src="/images/load growth regional model.png"
          alt="Regional AI Data Center Load Growth"
          className="data-image"
        />
      </div>

      {/* Key Insights */}
      <div className="table-summary">
        <h3>Key Insights</h3>
        <ul>
          <li><strong>Total Planned Capacity:</strong> ~18.6 GW across 15 US facilities</li>
          <li><strong>Regional Distribution:</strong> Midwest/PJM leads with ~6.6 GW, followed by Southeast (~5.2 GW)</li>
          <li><strong>Major Players:</strong> Microsoft (4.5 GW), xAI (3.1 GW), Google (2.5 GW), Amazon/Anthropic (2.7 GW)</li>
          <li><strong>Timeline:</strong> Most capacity coming online 2026-2028</li>
        </ul>
      </div>

      {/* Second Image - Epoch AI Frontier Data Centers */}
      <div className="image-section">
        <h2>Individual Data Center Timelines from EpochAI</h2>
        <img
          src="/images/epochai plot.png"
          alt="Epoch AI Frontier Data Centers"
          className="data-image"
        />
        <p className="image-citation">
          Source: Epoch AI, 'Frontier Data Centers'. Published online at epoch.ai. Retrieved from{' '}
          <a href="https://epoch.ai/data/data-centers" target="_blank" rel="noopener noreferrer">
            https://epoch.ai/data/data-centers
          </a>{' '}
          [online resource]. Accessed 28 Dec 2025.
        </p>
      </div>

      {/* Summary Table */}
      <div className="table-section">
        <h2>US Frontier Data Centers Summary</h2>
        <p className="table-description">
          Sourced from EpochAI dataset, augmented with Power Source.
        </p>
        <div className="table-container">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Data Center</th>
                <th>Region</th>
                <th>Peak Power</th>
                <th>Expected Live</th>
                <th>Power Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {datacenterGroups.map((group, groupIndex) => (
                <>
                  <tr key={`group-${groupIndex}`} className="group-header">
                    <td colSpan={6} className="company-name">{group.company}</td>
                  </tr>
                  {group.datacenters.map((dc, dcIndex) => (
                    <tr key={`${groupIndex}-${dcIndex}`}>
                      <td>{dc.name} {dc.note && <span className="note">{dc.note}</span>}</td>
                      <td>{dc.location}</td>
                      <td>{dc.peakPower}</td>
                      <td>{dc.expectedLive}</td>
                      <td>
                        <span className={`power-source-badge ${dc.powerSource?.toLowerCase()}`}>
                          {dc.powerSource}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${dc.status.toLowerCase()}`}>
                          {dc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Power Source Pie Chart */}
        <div className="image-section">
          <h2>Power Source Distribution</h2>
          <img
            src="/images/power source pie chart.png"
            alt="Power Source Distribution - BTM vs Grid"
            className="data-image"
          />
        </div>

        <div className="table-summary">
          <h3>Key Insights</h3>
          <ul>
            <li><strong>Total Planned Capacity:</strong> ~18.6 GW across 15 US facilities</li>
            <li><strong>Regional Distribution:</strong> Midwest/PJM leads with ~6.6 GW, followed by Southeast (~5.2 GW)</li>
            <li><strong>Major Players:</strong> Microsoft (4.5 GW), xAI (3.1 GW), Google (2.5 GW), Amazon/Anthropic (2.7 GW)</li>
            <li><strong>Timeline:</strong> Most capacity coming online 2026-2028</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EnergyPage;
