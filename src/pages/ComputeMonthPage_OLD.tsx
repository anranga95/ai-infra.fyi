import { useState, useEffect } from 'react';
import CalculatorPage from './CalculatorPage';

function ComputeMonthPage() {
  const [activeTab, setActiveTab] = useState<'framework' | 'calculator'>('framework');
  const [activeSection, setActiveSection] = useState<string>('definition');
  const [tocOpen, setTocOpen] = useState<boolean>(false);

  // Scroll spy to track active section
  useEffect(() => {
    if (activeTab !== 'framework') return;

    const handleScroll = () => {
      const sections = [
        'tldr',
        'rationale',
        'definition',
        'economic-value',
        'conclusion'
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
  }, [activeTab]);

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
            className={`tab ${activeTab === 'framework' ? 'active' : ''}`}
            onClick={() => setActiveTab('framework')}
          >
            Framework
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
      {activeTab === 'framework' && (
        <div className="calculator-container">
          <div className="header">
            <h1>📈 Compute-Month Framework</h1>
          </div>

          {/* Fixed left sidebar TOC */}
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
                      href="#rationale"
                      onClick={(e) => handleTocClick(e, 'rationale')}
                      className={activeSection === 'rationale' ? 'active' : ''}
                    >
                      Rationale
                    </a>
                  </li>
                  <li style={{ margin: '0.5rem 0' }}>
                    <a
                      href="#definition"
                      onClick={(e) => handleTocClick(e, 'definition')}
                      className={activeSection === 'definition' ? 'active' : ''}
                    >
                      Definition
                    </a>
                  </li>
                  <li style={{ margin: '0.5rem 0' }}>
                    <a
                      href="#economic-value"
                      onClick={(e) => handleTocClick(e, 'economic-value')}
                      className={activeSection === 'economic-value' ? 'active' : ''}
                    >
                      Economic Value
                    </a>
                  </li>
                  <li style={{ margin: '0.5rem 0' }}>
                    <a
                      href="#conclusion"
                      onClick={(e) => handleTocClick(e, 'conclusion')}
                      className={activeSection === 'conclusion' ? 'active' : ''}
                    >
                      Conclusion
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            <div className="framework-content">
            <h2 id="definition" style={{ marginTop: 0 }}>Definition</h2>
            <p>
              A <strong>Compute-Month</strong> (GW-H100-Month) measures the marginal value of one month of AI compute capacity.<br />
              Specifically: 30 days of continuous operation at 1 GW facility power using H100-equivalent GPUs.
            </p>

            <h3>Why "month"?</h3>
            <ul>
              <li>Data center construction takes 2-4 years from groundbreaking to operation.</li>
              <li>Supply chain lead times for key components like GPUs and gas turbines are also multiple years,</li>
              <li>Policymakers and grid infrastructure upgrades are multi-year projects</li>
            </ul>

            <h3>Base units:</h3>
            <ul>
              <li>1.04 million H100 GPUs running 730 hours</li>
              <li>762.3 million H100-hours</li>
              <li>2.71 × 10²⁷ FLOPs</li>
            </ul>

            <p style={{ fontStyle: 'italic', marginTop: '1.5rem' }}>
              → What is a compute-month worth, and how much does it cost?
            </p>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="summary">Summary: What One Compute-Month Produces</h2>

            <h3>Training (with 11× R&D overhead):</h3>
            <ul>
              <li>4 GPT-4.5 models</li>
              <li>5 Claude Sonnet 4 models</li>
              <li>6 Llama 3.1 405B models</li>
              <li>30 DeepSeek-V3 models</li>
            </ul>

            <h3>Inference:</h3>
            <ul>
              <li>276 billion queries (standard models)</li>
              <li>40 million reasoning queries (o1-level, 10× overhead)</li>
            </ul>

            <h3>Cost:</h3>
            <ul>
              <li>CapEx: $35.8B/GW from EpochAI <a href="https://epoch.ai/blog/estimating-ai-datacenter-costs" target="_blank" rel="noopener noreferrer">methodology</a></li>
              <li>Monthly cost: $550M (amortization + power + ops)</li>
              <li>Monthly revenue: $1.7B (at $2.19/H100-hr spot rate)</li>
              <li>Breakeven: 27 months (within 48-60 month GPU lifetime)</li>
            </ul>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="use-cases">🎯 Use Cases</h2>

            <h3>Quantify Impact of Delays:</h3>
            <p>
              The area shaded in grey represents lost compute-months from frontier AI data centers due to extended
              timelines for construction, hardware procurement, and interconnection.
            </p>
            <img
              src="/images/compute months plot.png"
              alt="Compute Months Lost to Delays"
              className="data-image"
              style={{ marginTop: '1rem' }}
            />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5rem', textAlign: 'center' }}>
              Prepared by author based on data from EpochAI
            </p>

            <h3>Datacenter Economics:</h3>
            <ul>
              <li>Compare projects on standardized capacity basis (not just MW)</li>
              <li>Evaluate build-vs-rent decisions with compute output metrics</li>
              <li>Model revenue potential and breakeven timelines</li>
            </ul>

            <h3>Policy & Grid Planning:</h3>
            <ul>
              <li>Translate MW announcements into actual compute impact</li>
              <li>Model grid load growth in standardized units</li>
              <li>Assess technology interventions (reduced PUE = increased capacity)</li>
            </ul>

            <h3>Technology Assessment:</h3>
            <ul>
              <li>Quantify efficiency gains (PUE improvements = more GPUs from same power)</li>
              <li>Measure impact of cooling innovations (liquid vs air)</li>
              <li>Calculate R&D ROI for optimization technologies</li>
            </ul>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="physical-capacity">⚡ Physical Capacity</h2>

            <h3>Formula:</h3>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              IT Power = Facility MW ÷ PUE{'\n'}
              Server Power = IT Power ÷ IT Overhead{'\n'}
              GPU Count = (Server Power × 1000) ÷ GPU TDP{'\n'}
              H100-Hours = GPU Count × 730 hours/month
            </pre>

            <h3>1 GW Baseline (PUE 1.2, IT overhead 1.14, H100 @ 0.7 kW):</h3>
            <table className="breakdown-table">
              <tbody>
                <tr><td><strong>IT Power</strong></td><td>833 MW</td></tr>
                <tr><td><strong>Server Power</strong></td><td>731 MW</td></tr>
                <tr><td><strong>GPU Count</strong></td><td>1,044,277 H100s</td></tr>
                <tr><td><strong>Monthly Capacity</strong></td><td>762.3M H100-hours</td></tr>
                <tr><td><strong>Total FLOPs</strong></td><td>2.71 × 10²⁷ FLOPs</td></tr>
              </tbody>
            </table>

            <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
              <strong>Key insight:</strong> Efficiency gains (lower PUE, better cooling) increase GPU density → more compute from same facility power.
            </p>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="training-capacity">🧠 Training Capacity</h2>

            <h3>Formula:</h3>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Training Hours = Total H100-Hours × Training %{'\n'}
              FLOPs Available = Training Hours × GPU TFLOPS × 3600 × MFU{'\n'}
              Models/Month = FLOPs Available ÷ Model Training FLOPs{'\n'}
              Realistic = Models/Month ÷ R&D Overhead Multiplier
            </pre>

            <h3>1 GW @ 80% Training Allocation:</h3>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>FLOPs Required</th>
                  <th>Parallel</th>
                  <th>Realistic (11× R&D)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>GPT-4.5</td><td>6.4 × 10²⁵</td><td>47/month</td><td>4/month</td></tr>
                <tr><td>Claude Sonnet 4</td><td>5.0 × 10²⁵</td><td>58/month</td><td>5/month</td></tr>
                <tr><td>Llama 3.1 405B</td><td>3.8 × 10²⁵</td><td>76/month</td><td>7/month</td></tr>
                <tr><td>GPT-4</td><td>2.1 × 10²⁵</td><td>138/month</td><td>13/month</td></tr>
                <tr><td>DeepSeek-V3</td><td>2.8 × 10²⁴</td><td>1,035/month</td><td>94/month</td></tr>
              </tbody>
            </table>

            <p style={{ marginTop: '1rem' }}>
              <strong>Token throughput:</strong> 1.9 trillion tokens/month (127 complete GPT-4 datasets)
            </p>

            <p style={{ fontStyle: 'italic' }}>
              <strong>R&D overhead:</strong> Based on OpenAI 2024 spend ($5B total / $400M GPT-4.5 final = 11.25×).
              Accounts for failed runs, experiments, ablations, data work.
            </p>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="inference-capacity">💬 Inference Capacity</h2>

            <h3>Formula (memory-bandwidth limited):</h3>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Tokens/sec = (GPU Bandwidth ÷ Model Size) × Utilization{'\n'}
              Queries/sec = Tokens/sec ÷ Tokens per Query{'\n'}
              Monthly Queries = Queries/sec × GPUs × 730 × 3600
            </pre>

            <h3>1 GW @ 20% Inference Allocation:</h3>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Workload Type</th>
                  <th>Model Class</th>
                  <th>Queries/Month</th>
                  <th>Tokens Generated</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Standard</td><td>GPT-4 (280B)</td><td>4.2B</td><td>2.3T tokens</td></tr>
                <tr><td>Standard</td><td>Llama 70B</td><td>23B</td><td>9.2T tokens</td></tr>
                <tr><td>Standard</td><td>Llama 8B</td><td>287B</td><td>80T tokens</td></tr>
                <tr><td>Reasoning (10×)</td><td>GPT-4 class</td><td>40M</td><td>220B tokens</td></tr>
              </tbody>
            </table>

            <p style={{ marginTop: '1rem' }}>
              <strong>Total:</strong> 314B standard queries + 40M reasoning queries = 92T tokens/month
            </p>

            <p style={{ fontStyle: 'italic' }}>
              <strong>Key insight:</strong> Reasoning workloads use 10-1000× more tokens per query (o1/o3-level test-time compute).
            </p>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="economics">💰 Economics</h2>

            <h3>Total Cost of Ownership:</h3>

            <h4>CapEx (per GW):</h4>
            <ul>
              <li>Average: $35.8B</li>
              <li>EpochAI: $44B</li>
              <li>Stargate: $50B</li>
            </ul>

            <h4>Monthly Amortization assumptions:</h4>
            <ul>
              <li>70% compute (4-year depreciation) @ 10% WACC</li>
              <li>30% infrastructure (15-year depreciation) @ 10% WACC</li>
            </ul>

            <p style={{ marginTop: '1rem' }}>
              Monthly Power: Facility MW × 730 hrs × $/kWh × 1,000<br />
              Monthly Operations: 20% of power cost<br />
              Monthly TCO: Amortization + Power + Operations
            </p>

            <h3>1 GW Example (Average $35.8B, $0.08/kWh):</h3>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Monthly</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>CapEx Amortization</td><td>$480M</td><td>70% compute @ 48mo + 30% infra @ 180mo</td></tr>
                <tr><td>Power</td><td>$58M</td><td>1,000 MW × 730 hrs × $0.08</td></tr>
                <tr><td>Operations</td><td>$12M</td><td>20% of power</td></tr>
                <tr><td><strong>Total TCO</strong></td><td><strong>$550M/month</strong></td><td></td></tr>
              </tbody>
            </table>

            <h3>Revenue Potential:</h3>
            <ul>
              <li>Training: 610M H100-hrs × $2.19 = $1.34B/month</li>
              <li>Inference: 314B queries × $0.60/M tokens = $0.19B/month</li>
              <li><strong>Total: $1.53B/month</strong></li>
            </ul>

            <h3>Investment Returns (48-month GPU lifetime):</h3>
            <ul>
              <li>Breakeven: 27 months</li>
              <li>Lifetime revenue: $73B (48 months × $1.53B)</li>
              <li>ROI: 104% over 4 years</li>
              <li>Annual return: 26%</li>
            </ul>

            <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>
              <strong>GPU Lifetime Context:</strong> AI accelerators useful for 48-60 months before performance/efficiency improvements
              make replacement economical. Projects breaking even in &lt;30 months capture substantial value in remaining lifetime.
            </p>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="conclusion">Conclusion</h2>

            <p>
              The Compute-Month framework provides a <strong>standardized economic unit</strong> for AI infrastructure analysis,
              translating facility power (MW) into measurable compute output (models trained, queries served, tokens processed)
              and economic value (revenue, breakeven, ROI).
            </p>

            <h3>Key takeaways:</h3>
            <ol>
              <li><strong>Scale of investment:</strong> $35-50B per GW is economically justified with 27-month breakeven and 100%+ ROI over GPU lifetime</li>
              <li><strong>Time value of compute:</strong> Each month of construction delay costs $1.5B in lost revenue - making speed-to-market critical</li>
              <li><strong>Efficiency = capacity:</strong> PUE improvements don't reduce power demand, they increase compute density (10% better PUE = 10% more GPUs from same facility)</li>
              <li><strong>R&D overhead dominates:</strong> Actual production model training represents &lt;10% of total compute spend; 90%+ goes to experiments and iterations</li>
              <li><strong>Inference is memory-bound:</strong> Query capacity limited by bandwidth, not FLOPs - making model size optimization crucial</li>
              <li><strong>Reasoning changes economics:</strong> o1/o3-level workloads use 10-1000× more tokens per query, shifting inference cost structure</li>
            </ol>

            <p>
              The compute-month bridges infrastructure planning (GW capacity) with business outcomes (models, queries, revenue),
              enabling apples-to-apples comparison across projects, efficiency interventions, and technology roadmaps.
            </p>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="appendix-a">Appendix A: Mathematical Derivations</h2>

            <h3>A.1 Model FLOPs Utilization (MFU)</h3>
            <p>
              MFU measures what fraction of theoretical peak FLOPs actually performs useful computation during training.
            </p>

            <h4>Formula:</h4>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              MFU = (Actual FLOPs/sec) / (Theoretical Peak FLOPs/sec)
            </pre>

            <p>Where:</p>
            <ul>
              <li>Actual FLOPs/sec = (Model Parameters × 6) × Tokens/sec</li>
              <li style={{ marginLeft: '2rem' }}>Factor of 6: Forward pass (2×), backward pass (4×)</li>
              <li>Theoretical Peak = GPU Count × GPU TFLOPS × 10^12</li>
            </ul>

            <h4>Typical values:</h4>
            <ul>
              <li>Research training: 20-30% MFU (small scale, inefficient)</li>
              <li>Production training: 35-45% MFU (optimized at scale)</li>
              <li>Meta Llama 3.1: 38-43% MFU at 16K H100s</li>
            </ul>

            <p style={{ fontStyle: 'italic' }}>
              <strong>Why not 100%?</strong> Communication overhead, memory bandwidth limits, batch loading, gradient synchronization.
            </p>

            <h3>A.2 Training Time Calculation</h3>
            <p>Hours required for one complete training run:</p>

            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Hours = Training FLOPs / (GPU FLOPs/sec × 3600 × MFU × GPU Count)
            </pre>

            <p><strong>Example (GPT-4):</strong></p>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Hours = 2.1×10^25 / (989×10^12 × 3600 × 0.35 × 10,000){'\n'}
              = 167,000 GPU-hours{'\n'}
              = 16.7 hours on 10K GPUs
            </pre>

            <h3>A.3 Inference Token Rate (Memory-Bandwidth Limited)</h3>
            <p>Generation speed (autoregressive decoding):</p>

            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Tokens/sec = (Memory Bandwidth / Model Size in Bytes) × Batch Efficiency
            </pre>

            <p><strong>For H100 (3.35 TB/s) serving GPT-4 (280B params, FP16):</strong></p>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Model Size = 280×10^9 params × 2 bytes = 560 GB{'\n'}
              Tokens/sec = (3.35×10^12 bytes/sec / 560×10^9 bytes) × 0.70{'\n'}
              = 4.2 tokens/sec per query stream
            </pre>

            <p>With 1000 concurrent users: 4,200 tokens/sec aggregate</p>

            <p style={{ fontStyle: 'italic' }}>
              <strong>Batch efficiency:</strong> Serving multiple users simultaneously shares memory access, achieving 60-80% of theoretical maximum.
            </p>

            <h3>A.4 CapEx Amortization (Annuity Method)</h3>
            <p>Monthly payment formula:</p>

            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Monthly Payment = Principal × (r / (1 - (1 + r)^-n))
            </pre>

            <p>Where:</p>
            <ul>
              <li>r = WACC / 12 (monthly rate)</li>
              <li>n = depreciation period in months</li>
            </ul>

            <p><strong>For 70% compute ($25B) over 48 months @ 10% WACC:</strong></p>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              r = 0.10 / 12 = 0.00833{'\n'}
              Payment = $25B × (0.00833 / (1 - 1.00833^-48)){'\n'}
              = $25B × 0.0254{'\n'}
              = $635M/month
            </pre>

            <p><strong>For 30% infrastructure ($10.7B) over 180 months:</strong></p>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Payment = $10.7B × 0.0121{'\n'}
              = $129M/month
            </pre>

            <p>Total amortization: $764M/month</p>

            <p style={{ fontStyle: 'italic' }}>
              Note: Simplified to $480M in main calculator using blended depreciation
            </p>

            <h3>A.5 Carbon Intensity Calculation</h3>
            <p>Monthly CO2 emissions:</p>

            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Emissions (tonnes CO2) = Power (MWh) × Carbon Intensity (gCO2/kWh) / 10^6
            </pre>

            <p><strong>For 1 GW facility:</strong></p>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              Monthly power = 1,000 MW × 730 hrs = 730,000 MWh
            </pre>

            <p><strong>Texas (ERCOT, 200 gCO2/kWh):</strong></p>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              730,000 MWh × 1,000 kWh/MWh × 200 gCO2/kWh / 10^6{'\n'}
              = 146,000 tonnes CO2/month
            </pre>

            <p><strong>California (CAISO, 80 gCO2/kWh):</strong></p>
            <pre style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
              = 58,400 tonnes CO2/month (60% less)
            </pre>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="appendix-b">Appendix B: Data Sources & Citations</h2>

            <h3>GPU Specifications</h3>
            <ul>
              <li>
                <strong>NVIDIA H100:</strong> NVIDIA H100 Datasheet
                <ul style={{ marginTop: '0.5rem' }}>
                  <li>989 TFLOPS (FP16 Tensor Core)</li>
                  <li>700W TDP</li>
                  <li>3.35 TB/s memory bandwidth</li>
                </ul>
              </li>
              <li><strong>EpochAI ml_hardware.csv:</strong> GPU specs across vendors (AMD, Google TPU, Amazon Trainium)</li>
            </ul>

            <h3>Training FLOPs by Model</h3>
            <ul>
              <li>GPT-4: 2.1 × 10²⁵ FLOPs - EpochAI Parameter Database</li>
              <li>Llama 3.1 405B: 3.8 × 10²⁵ FLOPs - Meta Llama 3.1 Report</li>
              <li>Claude 3.5 Sonnet: 3.6 × 10²⁵ FLOPs - EpochAI estimate</li>
              <li>DeepSeek-V3: 2.8 × 10²⁴ FLOPs - DeepSeek Technical Report</li>
              <li>GPT-4.5, Claude Sonnet 4, Gemini 2.0 Pro: Estimates based on company announcements and compute trends</li>
            </ul>

            <h3>Model FLOPs Utilization (MFU)</h3>
            <ul>
              <li>Meta Llama 3.1: 38-43% MFU - Meta Llama 3.1 Report, Fig. 5</li>
              <li>Default MFU (0.35): Conservative estimate for frontier model training at scale</li>
            </ul>

            <h3>Inference Throughput</h3>
            <ul>
              <li>vLLM benchmarks: vLLM Performance Data</li>
              <li>Token generation rates: Memory-bandwidth calculations validated against NVIDIA TensorRT-LLM benchmarks</li>
            </ul>

            <h3>Reasoning Overhead</h3>
            <ul>
              <li>OpenAI o1: "Uses chain-of-thought reasoning that can consume 10× or more tokens" - OpenAI o1 Blog</li>
              <li>OpenAI o3: High-complexity tasks showing 100-1000× token usage - OpenAI o3 Announcement</li>
            </ul>

            <h3>Economic Data</h3>
            <ul>
              <li>
                CapEx per GW:
                <ul style={{ marginTop: '0.5rem' }}>
                  <li>Validated ($35.8B): Bottom-up analysis from component costs</li>
                  <li>EpochAI ($44B): <a href="https://epoch.ai/blog/estimating-ai-datacenter-costs" target="_blank" rel="noopener noreferrer">EpochAI Datacenter Cost Model</a></li>
                  <li>Stargate ($50B): Derived from $500B / 10 GW announcement</li>
                </ul>
              </li>
              <li>Ornn Spot Pricing: $2.19/H100-hour - Ornn Index (December 2025)</li>
              <li>API Pricing: OpenAI, Anthropic, Google published rates (blended to $0.60/M tokens)</li>
            </ul>

            <h3>Regional Power & Carbon</h3>
            <ul>
              <li>Power costs: State utility commission filings, EIA commercial rates (2024-2025)</li>
              <li>
                Carbon intensity: Grid CO2 Intensity Details
                <ul style={{ marginTop: '0.5rem' }}>
                  <li>ERCOT, PJM, MISO, CAISO: Grid operator sustainability reports (2024)</li>
                  <li>National average (384 gCO2/kWh): EPA eGrid 2024</li>
                </ul>
              </li>
            </ul>

            <h3>Infrastructure Efficiency</h3>
            <ul>
              <li>
                PUE benchmarks:
                <ul style={{ marginTop: '0.5rem' }}>
                  <li>Google: 1.10 (2024 datacenter average)</li>
                  <li>Meta: 1.09 (2024 fleet average)</li>
                  <li>Microsoft: 1.18 (2024 Azure regions)</li>
                  <li>Industry standard: 1.2 (Uptime Institute 2024 survey)</li>
                </ul>
              </li>
              <li>IT overhead (1.14): NVIDIA DGX GB200 NVL72 specifications (networking, storage, management)</li>
            </ul>

            <h3>Water Usage</h3>
            <ul>
              <li>
                1.5 L/kWh: Modern closed-loop liquid cooling systems
                <ul style={{ marginTop: '0.5rem' }}>
                  <li>Crusoe datacenter specifications</li>
                  <li>FluidStack immersion cooling data</li>
                  <li>Industry average (traditional): 3-5 L/kWh</li>
                </ul>
              </li>
            </ul>

            <h3>GPU Lifetime</h3>
            <ul>
              <li>
                48-60 months: Industry standard for AI accelerator replacement cycles
                <ul style={{ marginTop: '0.5rem' }}>
                  <li>Economic obsolescence vs. physical failure</li>
                  <li>Validated through hyperscaler procurement cycles</li>
                </ul>
              </li>
            </ul>

            <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Author: Aditya Nirvaan Ranganathan<br />
              Framework version: 1.0 (December 2025)<br />
              Last updated: December 28, 2025<br />
              Contact: nirvaan.ranga@chicagobooth.edu
            </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'calculator' && <CalculatorPage />}
    </div>
  );
}

export default ComputeMonthPage;
