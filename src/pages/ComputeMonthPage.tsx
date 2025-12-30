import { useState, useEffect } from 'react';
import CalculatorPage from './CalculatorPage';

function ComputeMonthPage() {
  const [activeTab, setActiveTab] = useState<'framework' | 'calculator'>('framework');
  const [activeSection, setActiveSection] = useState<string>('tldr');
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
        'training-capacity',
        'inference-capacity',
        'market-value',
        'cost-estimation',
        'environmental-impact',
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
                      Motivation
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
                    <ul style={{ listStyle: 'none', paddingLeft: '1rem', margin: '0.25rem 0' }}>
                      <li style={{ margin: '0.25rem 0' }}>
                        <a
                          href="#training-capacity"
                          onClick={(e) => handleTocClick(e, 'training-capacity')}
                          className={activeSection === 'training-capacity' ? 'active' : ''}
                          style={{ fontSize: '0.9rem' }}
                        >
                          Training Capacity
                        </a>
                      </li>
                      <li style={{ margin: '0.25rem 0' }}>
                        <a
                          href="#inference-capacity"
                          onClick={(e) => handleTocClick(e, 'inference-capacity')}
                          className={activeSection === 'inference-capacity' ? 'active' : ''}
                          style={{ fontSize: '0.9rem' }}
                        >
                          Inference Capacity
                        </a>
                      </li>
                      <li style={{ margin: '0.25rem 0' }}>
                        <a
                          href="#market-value"
                          onClick={(e) => handleTocClick(e, 'market-value')}
                          className={activeSection === 'market-value' ? 'active' : ''}
                          style={{ fontSize: '0.9rem' }}
                        >
                          Market Value from Spot Prices
                        </a>
                      </li>
                      <li style={{ margin: '0.25rem 0' }}>
                        <a
                          href="#cost-estimation"
                          onClick={(e) => handleTocClick(e, 'cost-estimation')}
                          className={activeSection === 'cost-estimation' ? 'active' : ''}
                          style={{ fontSize: '0.9rem' }}
                        >
                          Cost Estimation
                        </a>
                      </li>
                      <li style={{ margin: '0.25rem 0' }}>
                        <a
                          href="#environmental-impact"
                          onClick={(e) => handleTocClick(e, 'environmental-impact')}
                          className={activeSection === 'environmental-impact' ? 'active' : ''}
                          style={{ fontSize: '0.9rem' }}
                        >
                          Environmental Impact
                        </a>
                      </li>
                    </ul>
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
            <h2 id="tldr" style={{ marginTop: 0 }}>TLDR</h2>
            <p style={{ fontStyle: 'italic', fontWeight: 600 }}>
              What can a month of compute capacity at an AI data center achieve, and how much does it cost?
            </p>
            <p>
              A "Compute-Month" is a convenient unit in which to measure the value of AI data center capacity. For example, one compute-month can:
            </p>
            <ul>
              <li>Train <strong>0.9 GPT-5 models</strong></li>
              <li>Train <strong>1.2 Claude Sonnet 4 models</strong></li>
              <li>Train <strong>1.6 Llama 3.1 models</strong></li>
              <li>Handle <strong>986 billion standard inference queries</strong> across model sizes</li>
              <li>Process <strong>288 trillion tokens</strong> during standard inference workloads</li>
              <li>Generate <strong>$1.05 billion revenue</strong> from compute rentals (based on $2.19/H100-hour spot price)</li>
              <li>Produce <strong>200,500 tonnes of CO₂e emissions</strong> from operations</li>
              <li>Consume <strong>6.8 million m³ of water</strong> (direct + indirect usage)</li>
            </ul>
            <p>
              A compute-month, or GW-H100-Month, represents the expected output of the maximum number of Nvidia H100-equivalent GPUs that can be powered by 1GW of energy, based on the efficiency of a standard AI data center. The default value is roughly 478M H100-hours, which is generally allocated across different workloads in practice.
            </p>
            <p>
              The compute-month bridges energy infrastructure planning (MW/GW) with business outcomes (models, queries, market value), enabling meaningful comparisons across projects, efficiency interventions, and technology roadmaps. It provides a common language for developers, investors, policymakers, and energy providers to evaluate AI datacenter economics.
            </p>
            <p>
              This framework demonstrates how to derive and utilize the compute-month. Adjust assumptions and model scenarios using the 'Calculator' tab.
            </p>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="rationale">Motivation</h2>
            <p>
              Data centers are not easy to operationalize. Hyperscaler construction takes <a href="https://epoch.ai/data-insights/data-centers-buildout-speeds" target="_blank" rel="noopener noreferrer">1-3.6 years</a> from groundbreaking to operation; supply chain lead times for key components like GPUs and gas turbines can extend months or years; and grid infrastructure upgrades are multi-year projects. For <a href="https://www.datacenterdynamics.com/en/news/silicon-valley-data-centers-stand-empty-awaiting-power-connections-report/" target="_blank" rel="noopener noreferrer">example</a>, several data centers in Nvidia's hometown of Santa Clara, California have finished construction but can't go live until Silicon Valley Power finishes a system upgrade, expected in 2028.
            </p>
            <p>
              Additional factors like land acquisition, permitting, municipal disputes, or extreme weather events could add several additional months to project timelines.
            </p>
            <p>
              The compute-month helps quantify the <strong>"opportunity cost"</strong> - the economic impact of project delays or accelerations.
            </p>
            <p>
              This is illustrated in the following plot, where the area shaded in gray represents unutilized compute-months from frontier AI data centers due to the current timelines for construction, hardware procurement, grid interconnection, and other factors.
            </p>
            <img
              src="/images/compute months plot.png"
              alt="Frontier AI Datacenter Load Growth"
              className="data-image"
              style={{ marginTop: '1rem' }}
            />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5rem', textAlign: 'center' }}>
              Figure 1: Announced capacity growth for frontier AI datacenters showing the ramp-up period (gray area) representing unutilized compute-months (data from EpochAI, aggregation prepared by author)
            </p>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="definition">Definition</h2>
            <p>
              A <strong>"GW-H100-Month"</strong> is a standardized economic unit representing the marginal value of 30 days continuous utilization of 1 GW of power in a 2025 standard AI data center with Nvidia H100-equivalent GPU chips. It is calculated in H100-hours or FLOPs.
            </p>

            <h3>Assumptions</h3>
            <p>
              Most large-scale data centers use identical or equivalent equipment, such as that specified in Nvidia's reference architectures, so it is reasonable to generalize assumptions about efficiency as measured by the following parameters:
            </p>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Assumed Value</th>
                  <th>Reference Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Power Usage Effectiveness (PUE)</strong></td>
                  <td>Ratio of total facility power to IT equipment power; measures cooling and infrastructure overhead</td>
                  <td>1.2</td>
                  <td>Google: 1.10 (2024 fleet avg)<br />Meta: 1.09 (2024 fleet avg)<br />Microsoft: 1.18 (2024 Azure avg)<br />Industry standard: 1.2 (<a href="https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-2024" target="_blank" rel="noopener noreferrer">Uptime Institute 2024</a>)</td>
                </tr>
                <tr>
                  <td><strong>IT Overhead</strong></td>
                  <td>Ratio of total IT equipment power to GPU power; accounts for CPUs, networking, storage, and management infrastructure</td>
                  <td>1.82</td>
                  <td>Based on NVIDIA DGX H100 specifications: 10.2 kW total system power with 5.6 kW GPU power (8 × 700W H100 GPUs) = 1.82× multiplier (<a href="https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html" target="_blank" rel="noopener noreferrer">NVIDIA DGX H100 User Guide</a>, <a href="https://www.sunbirddcim.com/blog/can-your-racks-support-nvidia-dgx-h100-systems" target="_blank" rel="noopener noreferrer">Sunbird DCIM</a>)</td>
                </tr>
                <tr>
                  <td><strong>GPU "Thermal Design Power" (TDP)</strong></td>
                  <td>Maximum heat a graphics card's cooling system is designed to dissipate under heavy load, measured in kilowatts</td>
                  <td>0.7 kW</td>
                  <td>NVIDIA H100 SXM5: 700W TDP (<a href="https://www.nvidia.com/en-us/data-center/h100/" target="_blank" rel="noopener noreferrer">NVIDIA H100 Datasheet</a>)</td>
                </tr>
                <tr>
                  <td><strong>H100 FP16 Performance</strong></td>
                  <td>Floating-point operations per second using 16-bit precision with Tensor Core acceleration</td>
                  <td>989 TFLOPS*</td>
                  <td>NVIDIA H100 SXM5: 1,979 TFLOPS FP16 with sparsity (<a href="https://www.nvidia.com/en-us/data-center/h100/" target="_blank" rel="noopener noreferrer">NVIDIA H100 Datasheet</a>)<br />*We use 989 TFLOPS (dense, without sparsity) for training calculations as most current models use dense architectures</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
              *Adhering to EpochAI methodology for FLOPs calculations: <a href="https://epoch.ai/data/ai-models-documentation#estimating-compute" target="_blank" rel="noopener noreferrer">https://epoch.ai/data/ai-models-documentation#estimating-compute</a>
            </p>

            <h3>Methodology</h3>
            <p>
              From these values we can estimate that <strong>1 GW can power 654,762 H100 GPUs</strong>.
            </p>
            <p>
              Assuming a 30-day month, this results in <strong>478.0 million H100-hours</strong>.
            </p>
            <p><strong>Formula:</strong></p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontFamily: 'inherit' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ marginBottom: '0.5rem' }}><em>Server Power (MW)</em> = <em>Facility Power (GW)</em> × 1000 ÷ <em>PUE</em> ÷ <em>IT Overhead</em></div>
                <div style={{ marginBottom: '0.5rem' }}><em>GPU Count</em> = (<em>Server Power</em> × 1000 kW/MW) ÷ <em>GPU TDP (kW)</em></div>
                <div><em>H100-Hours</em> = <em>GPU Count</em> × 730 hours/month</div>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example (1 GW):</div>
                <div style={{ marginBottom: '0.25rem' }}>Server Power = 1 GW × 1000 ÷ 1.2 ÷ 1.82 = 458.3 MW</div>
                <div style={{ marginBottom: '0.25rem' }}>GPU Count = (458.3 MW × 1000) ÷ 0.7 kW = 654,762 GPUs</div>
                <div>H100-Hours = 654,762 × 730 = 477,976,260 H100-hours</div>
              </div>
            </div>
            <p>
              AI relies heavily on matrix multiplication, which requires a high volume of Floating Point Operations, called <strong>FLOPs</strong>. This is a standard unit used to quantify a computer's raw computational speed, especially for complex math with decimals.
            </p>
            <p>
              Using Nvidia's specifications on H100 performance, one compute-month produces <strong>1.70 × 10²⁷ FLOPs</strong>.
            </p>
            <p><strong>Formula:</strong></p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontFamily: 'inherit' }}>
              <div style={{ marginBottom: '1rem' }}>
                <em>Total FLOPs</em> = <em>H100-hours</em> × <em>TFLOPS/GPU</em> × <em>seconds/hour</em>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ marginBottom: '0.25rem' }}>477,976,260 H100-hours</div>
                <div style={{ marginBottom: '0.25rem' }}>× 989 TFLOPS (989 × 10¹² FLOP/s)</div>
                <div style={{ marginBottom: '0.25rem' }}>× 3,600 seconds/hour</div>
                <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>= 1.70 × 10²⁷ FLOPs</div>
              </div>
            </div>
            <p><strong>In summary, a standard "Compute-Month" produces:</strong></p>
            <ul>
              <li><strong>478.0 million H100-hours</strong></li>
              <li><strong>1.70 × 10²⁷ FLOPs</strong></li>
            </ul>
            <p>
              <strong>Key insight:</strong> Efficiency gains due to technology improvements translate to lower PUE and/or lower IT overhead → results in more compute extracted from the same GW of power provided to the facility (not less energy used). For example, improving PUE from 1.2 to 1.08 (10% improvement) yields 10% more GPU capacity from the same 1 GW facility.
            </p>

            <h3>Variation between GPUs</h3>
            <p>
              H100 is currently the most popular semiconductor for AI, hence is used as the benchmark.
            </p>
            <p>
              But there are several other GPUs on the market. To account for this variation, we factor in performance gains from these chips as conversion factors to H100 performance using data from EpochAI. For example, considering Google's TPU v7:
            </p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontFamily: 'inherit' }}>
              <div style={{ marginBottom: '0.25rem' }}>477,976,260 H100-hours <span style={{ color: 'var(--text-secondary)' }}>[standard compute-month]</span></div>
              <div style={{ marginBottom: '0.25rem' }}>× 2.33 <span style={{ color: 'var(--text-secondary)' }}>[TPU v7 multiplier: 2307 TFLOPS ÷ 989 TFLOPS]</span></div>
              <div style={{ marginBottom: '0.25rem' }}>= 1,113,684,286 H100-equivalent hours</div>
              <div style={{ marginBottom: '0.25rem' }}>× 989 TFLOPS</div>
              <div style={{ marginBottom: '0.25rem' }}>× 3,600 seconds/hour</div>
              <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>= 3.96 × 10²⁷ FLOPs</div>
            </div>
            <p><strong>GPU Performance Comparison Table</strong> (based on EpochAI ml_hardware.csv):</p>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>GPU</th>
                  <th>Release Date</th>
                  <th>FP16 TFLOPS</th>
                  <th>TDP (kW)</th>
                  <th>Memory (GB)</th>
                  <th>H100 Multiplier*</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>NVIDIA H100 SXM</td><td>2023-03</td><td>989</td><td>0.70</td><td>80</td><td>1.00×</td></tr>
                <tr><td>NVIDIA H200 SXM</td><td>2024-11</td><td>990</td><td>0.70</td><td>141</td><td>1.00×</td></tr>
                <tr><td>NVIDIA GB200</td><td>2025-02</td><td>2,500</td><td>1.20</td><td>192</td><td>2.53×</td></tr>
                <tr><td>NVIDIA GB300</td><td>2025-08</td><td>2,500</td><td>1.40</td><td>288</td><td>2.53×</td></tr>
                <tr><td>NVIDIA B100</td><td>2024-11</td><td>1,750</td><td>0.70</td><td>192</td><td>1.77×</td></tr>
                <tr><td>AMD MI300X</td><td>2023-12</td><td>1,307</td><td>0.75</td><td>192</td><td>1.32×</td></tr>
                <tr><td>AMD MI350X</td><td>2025-06</td><td>2,310</td><td>1.00</td><td>288</td><td>2.34×</td></tr>
                <tr><td>Google TPU v4</td><td>2021-05</td><td>1,484</td><td>0.28</td><td>N/A</td><td>1.50×</td></tr>
                <tr><td>Google TPU v7</td><td>2025-11</td><td>2,307</td><td>0.96</td><td>192</td><td>2.33×</td></tr>
                <tr><td>Amazon Trainium2</td><td>2024-12</td><td>667</td><td>0.50</td><td>96</td><td>0.67×</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
              *Multiplier = GPU TFLOPS ÷ 989 (H100 baseline). This assumes linear scaling with FLOPs, which is approximate - actual performance depends on workload characteristics, memory bandwidth, and software optimization.
            </p>
            <p>
              The efficiency of a GPU in a given facility is measured in <strong>Model FLOPs Utilization (MFU)</strong>, which can differ significantly between training and inference:
            </p>
            <ul>
              <li><strong>Training MFU:</strong> 30-40% typical (limited by communication overhead, gradient synchronization)</li>
              <li><strong>Inference MFU:</strong> 25-35% typical (limited by memory bandwidth, not FLOPs)</li>
            </ul>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="economic-value">Economic Value</h2>
            <p>
              The following sections detail the different economic valuation methodologies for a compute-month based on the following data about each model. Note that data is not always published for each model and there is uncertainty about exact values.
            </p>
            <p><strong>Frontier AI Model Training Data</strong> (source: EpochAI):</p>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Model Name</th>
                  <th>Release Date</th>
                  <th>Training FLOPs</th>
                  <th># Parameters</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>GPT-4</td><td>2023-03</td><td>2.1 × 10²⁵</td><td>~1.76T</td><td>Likely</td></tr>
                <tr><td><strong>GPT-5</strong></td><td><strong>2025-08</strong></td><td><strong>6.6 × 10²⁵</strong></td><td><strong>Unknown</strong></td><td><strong>Speculative</strong></td></tr>
                <tr><td>Claude 3 Opus</td><td>2024-03</td><td>1.6 × 10²⁵</td><td>Unknown</td><td>Low-precision</td></tr>
                <tr><td>Claude 3.5 Sonnet</td><td>2024-06</td><td>3.6 × 10²⁵</td><td>Unknown</td><td>Low-precision</td></tr>
                <tr><td><strong>Claude Sonnet 4</strong></td><td><strong>2024-11</strong></td><td><strong>5.0 × 10²⁵</strong></td><td><strong>Unknown</strong></td><td><strong>Speculative</strong></td></tr>
                <tr><td><strong>Llama 3.1-405B</strong></td><td><strong>2024-07</strong></td><td><strong>3.8 × 10²⁵</strong></td><td><strong>405B</strong></td><td><strong>High-precision</strong></td></tr>
                <tr><td>Gemini 1.5 Pro</td><td>2024-02</td><td>1.6 × 10²⁵</td><td>Unknown</td><td>Low-precision</td></tr>
                <tr><td>Grok-2</td><td>2024-08</td><td>3.0 × 10²⁵</td><td>Unknown</td><td>High-precision</td></tr>
                <tr><td>DeepSeek-V3</td><td>2024-12</td><td>2.8 × 10²⁴</td><td>671B</td><td>Confident</td></tr>
              </tbody>
            </table>
            <p>
              Considering that in 2024, <strong>OpenAI spent approximately 11.25× on R&D compared to the final training run for GPT-4.5</strong> (total compute spend ~$5B vs. ~$400M for final run), we assume an <strong>"R&D Overhead Multiplier"</strong> variable to capture this dynamic when calculating training capacity.
            </p>
            <p>
              Given the competitive nature of the AI market and reprioritization towards production-ready deployments (e.g., OpenAI's "Code Red" protocol emphasizing shipping over research), we assume an <strong>R&D multiplier of 10× averaged across all companies</strong> for our base calculations. This accounts for failed training runs, hyperparameter experimentation, dataset quality iterations, debugging and validation runs, etc.
            </p>
            <img
              src="/images/openai compute spend.png"
              alt="OpenAI R&D Compute Breakdown"
              className="data-image"
              style={{ marginTop: '1rem' }}
            />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.5rem', textAlign: 'center' }}>
              Figure 2: OpenAI's 2024 compute allocation showing R&D overhead (EpochAI analysis)
            </p>

            <h3 id="training-capacity">Training Capacity</h3>
            <p>
              <strong>AI model training</strong> is the process of teaching an AI system to perform tasks by exposing it to large datasets. During training, the model iteratively adjusts billions of parameters through matrix multiplication operations (measured in FLOPs) until it learns patterns that enable it to generate accurate predictions or outputs.
            </p>

            <h4>Assumptions</h4>
            <p>
              Model FLOPs Utilization (MFU) ranges between <strong>30-40% for training</strong> at state-of-the-art data centers like Nebius and Meta's Grand Teton clusters. Combined with infrastructure overhead, this results in overall utilization rates of <strong>80-90%</strong>.
            </p>
            <p>The compute-month calculations assume:</p>
            <ul>
              <li><strong>MFU: 35%</strong> (conservative estimate for frontier model training)</li>
              <li><strong>Utilization: 85%</strong> (accounting for maintenance windows, failures)</li>
              <li><strong>R&D Overhead: 10×</strong> (as discussed above)</li>
            </ul>

            <h4>Methodology</h4>
            <p>Training capacity is calculated based on available FLOPs divided by the FLOPs required to train each model:</p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontFamily: 'inherit' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ marginBottom: '0.5rem' }}><em>FLOPs Available</em> = <em>H100-Hours</em> × <em>MFU</em> × <em>GPU TFLOPS</em> × <em>seconds/hour</em></div>
                <div style={{ marginBottom: '0.5rem' }}><em>Models Trained / Month</em> = <em>FLOPs Available</em> ÷ <em>Model Training FLOPs</em></div>
                <div><em>Realistic Models / Month</em> = <em>Models Trained / Month</em> ÷ <em>R&D Overhead Multiplier</em></div>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example for GPT-5 (6.6 × 10²⁵ FLOPs):</div>
                <div style={{ marginBottom: '0.25rem' }}>FLOPs Available = 477,976,260 hours × 0.35 × 989 × 10¹² × 3,600</div>
                <div style={{ marginBottom: '1rem', marginLeft: '2rem' }}>= 5.95 × 10²⁶ FLOPs/month</div>
                <div style={{ marginBottom: '0.25rem' }}>Models Trained / Month = 5.95 × 10²⁶ ÷ 6.6 × 10²⁵ = 9.0 models/month</div>
                <div style={{ fontWeight: 600 }}>Realistic Models / Month = 9.0 ÷ 10 = 0.9 models/month</div>
              </div>
            </div>
            <p><strong>Training Capacity Results:</strong></p>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Training FLOPs</th>
                  <th>Models Trained / Month</th>
                  <th>Realistic Models / Month</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>GPT-5</td><td>6.6 × 10²⁵</td><td>9.0</td><td><strong>0.9</strong></td></tr>
                <tr><td>Claude Sonnet 4</td><td>5.0 × 10²⁵</td><td>11.9</td><td><strong>1.2</strong></td></tr>
                <tr><td>Llama 3.1 405B</td><td>3.8 × 10²⁵</td><td>15.7</td><td><strong>1.6</strong></td></tr>
                <tr><td>Claude 3.5 Sonnet</td><td>3.6 × 10²⁵</td><td>16.5</td><td><strong>1.7</strong></td></tr>
                <tr><td>Grok-2</td><td>3.0 × 10²⁵</td><td>19.8</td><td><strong>2.0</strong></td></tr>
                <tr><td>GPT-4</td><td>2.1 × 10²⁵</td><td>28.3</td><td><strong>2.8</strong></td></tr>
                <tr><td>Gemini 1.5 Pro</td><td>1.6 × 10²⁵</td><td>37.2</td><td><strong>3.7</strong></td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
              <strong>Note on token calculations:</strong> The relationship between FLOPs and tokens depends on model parameters: `Training FLOPs = 6 × Parameters × Tokens`. Without parameter counts for most recent models (companies no longer publicly disclose architecture details), we cannot reliably calculate training tokens. For models where parameters are known (like Llama 3.1 405B), training one model processes approximately 15 trillion tokens.
            </p>

            <h3 id="inference-capacity">Inference Capacity</h3>
            <p>
              <strong>AI model inference</strong> is the process of using a trained model to generate outputs (predictions, text, images) based on new inputs. Unlike training, inference focuses on serving user queries in real-time. <strong>Reasoning</strong> is a specialized form of inference where models perform extended "thinking" through techniques like chain-of-thought, using significantly more compute per query to solve complex problems.
            </p>

            <h4>Assumptions</h4>
            <p>
              Model FLOPs Utilization (MFU) ranges between <strong>25-35% for inference</strong> at state-of-the-art data centers. User traffic patterns determine utilization rates of <strong>50-70%</strong>. The compute-month calculations assume:
            </p>
            <ul>
              <li><strong>MFU: 30%</strong> (inference is memory-bandwidth limited, not compute limited)</li>
              <li><strong>Utilization: 75%</strong> (varying with demand patterns)</li>
            </ul>
            <p>
              <strong>Reasoning workloads can take between 10-100× more capacity than standard inference.</strong> Therefore there is no meaningful average, so we include low (10×), medium (50×), and high (100×) cases corresponding to different reasoning depths (e.g., o1-mini, o1, o3 levels).
            </p>

            <h4>Methodology</h4>
            <p>
              <strong>Inference is memory-bandwidth limited, not FLOPs limited.</strong> The bottleneck is loading model weights from GPU memory (HBM) for each token generation step.
            </p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontFamily: 'inherit' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ marginBottom: '0.5rem' }}><em>Tokens/sec per GPU</em> = (<em>GPU Memory Bandwidth</em> / <em>Model Size in bytes</em>) × <em>Batch Efficiency</em></div>
                <div style={{ marginBottom: '0.5rem' }}><em>Queries/sec</em> = <em>Tokens/sec</em> / <em>Tokens per Query</em></div>
                <div><em>Monthly Queries</em> = <em>Queries/sec</em> × <em>GPUs</em> × 730 hours × 3,600 sec/hour</div>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example for GPT-4 class (280B parameters, FP16):</div>
                <div style={{ marginBottom: '0.25rem' }}>Model Size = 280 × 10⁹ params × 2 bytes/param = 560 GB</div>
                <div style={{ marginBottom: '1rem' }}>GPU Bandwidth (H100) = 3.35 TB/s = 3,350 GB/s</div>

                <div style={{ marginBottom: '0.25rem' }}>Tokens/sec per GPU = (3,350 GB/s / 560 GB) × 0.70 batch efficiency</div>
                <div style={{ marginBottom: '1rem', marginLeft: '2rem' }}>= 4.2 tokens/sec per query stream</div>

                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>For 654,762 GPUs serving inference:</div>
                <div style={{ marginBottom: '0.25rem' }}>Concurrent users = 654,762 GPUs</div>
                <div style={{ marginBottom: '1rem' }}>Aggregate tokens/sec = 654,762 × 4.2 = 2,750,000 tokens/sec</div>

                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>At 550 tokens/query average:</div>
                <div style={{ marginBottom: '0.25rem' }}>Queries/sec = 2,750,000 / 550 = 5,000 queries/sec</div>
                <div style={{ fontWeight: 600 }}>Monthly queries = 5,000 × 730 × 3,600 = 13.1 billion queries/month</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
              <strong>Note on H200 and higher memory GPUs:</strong> GPUs with larger memory capacity can serve inference more efficiently. The H200 with 141 GB HBM3e (vs H100's 80 GB) has 1.76× the memory and 1.16× the bandwidth (3.9 TB/s vs 3.35 TB/s). Using the memory-to-bandwidth ratio, H200 achieves approximately 1.16× higher inference throughput than H100 for the same model size.
            </p>
            <p><strong>Inference Capacity Results:</strong></p>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Workload Type</th>
                  <th>Model Class</th>
                  <th>Tokens/Query</th>
                  <th>Monthly Queries</th>
                  <th>Tokens Generated</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Standard</td><td>GPT-4</td><td>550</td><td>13.1B</td><td>7.2T</td></tr>
                <tr><td>Standard</td><td>Llama (large)</td><td>400</td><td>72.5B</td><td>29.0T</td></tr>
                <tr><td>Standard</td><td>Llama (small)</td><td>280</td><td>900.0B</td><td>252.0T</td></tr>
                <tr><td><strong>Total Standard</strong></td><td>-</td><td>-</td><td><strong>985.6B</strong></td><td><strong>288.2T</strong></td></tr>
                <tr><td>Reasoning (10×)</td><td>GPT-4</td><td>5,500</td><td>1.3B</td><td>7.2T</td></tr>
                <tr><td>Reasoning (50×)</td><td>GPT-4</td><td>27,500</td><td>262M</td><td>7.2T</td></tr>
                <tr><td>Reasoning (100×)</td><td>GPT-4</td><td>55,000</td><td>131M</td><td>7.2T</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
              <strong>Note:</strong> These results assume 100% of compute-month capacity allocated to inference. In practice, datacenters split capacity between training and inference (e.g., 80% training / 20% inference). Users can adjust allocation in the calculator based on their workload mix.
            </p>

            <h3 id="market-value">Market Value from Spot Prices</h3>
            <p>Simple calculation based on index prices from:</p>
            <ul>
              <li><strong>Compute.Exchange:</strong> $0.74/H100-hour (<a href="https://compute.exchange/" target="_blank" rel="noopener noreferrer">compute.exchange</a>)</li>
              <li><strong>Ornn Exchange</strong> (GPU derivatives market): $2.19/H100-hour (<a href="https://www.ornn.io/" target="_blank" rel="noopener noreferrer">ornn.io</a>)</li>
            </ul>
            <p><strong>Calculation:</strong></p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontFamily: 'inherit' }}>
              <div style={{ marginBottom: '1rem', fontWeight: 600 }}>1 Compute-Month = 477,976,260 H100-hours</div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>At Compute.Exchange rate ($0.74/hr):</div>
                <div>477,976,260 × $0.74 = <strong>$354 million/month</strong></div>
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>At Ornn Exchange rate ($2.19/hr):</div>
                <div>477,976,260 × $2.19 = <strong>$1,047 million/month</strong></div>
              </div>
            </div>
            <p>Assuming 33% variance, market value ranges:</p>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Exchange</th>
                  <th>-33%</th>
                  <th>Spot Price</th>
                  <th>+33%</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Compute.Exchange</td><td>$236M</td><td>$354M</td><td>$472M</td></tr>
                <tr><td>Ornn</td><td>$698M</td><td>$1.05B</td><td>$1.40B</td></tr>
              </tbody>
            </table>
            <p>
              The significant spread reflects market segmentation (spot vs. reserved, different service levels) and price volatility in GPU compute markets.
            </p>

            <h3 id="cost-estimation">Cost Estimation</h3>
            <p><strong>Capital Expenditure Estimates:</strong></p>
            <ul>
              <li><strong>EpochAI estimate:</strong> $44B per GW (<a href="https://epoch.ai/data/data-centers-documentation#analysis" target="_blank" rel="noopener noreferrer">EpochAI datacenter documentation</a>)</li>
              <li><strong>Market-derived estimate:</strong> $50B per GW (based on OpenAI's announced ~$1T spending for 20 GW Stargate project, includes requisite energy infrastructure buildout)</li>
            </ul>

            <h4>Assumptions</h4>
            <p>
              <strong>GPUs have a finite useful lifespan of 4-5 years</strong> before replacement becomes necessary. This is primarily due to:
            </p>
            <ol>
              <li><strong>Physical degradation:</strong> Continuous high-temperature operation causes thermal cycling stress, electromigration in circuits, and gradual performance degradation</li>
              <li><strong>Economic obsolescence:</strong> Newer GPU architectures offer significantly better performance-per-watt and performance-per-dollar, making replacement economically rational even if original chips still function</li>
            </ol>
            <p>
              Based on market rates, 654,762 H100 GPUs (1 GW worth) cost approximately <strong>$25,000-$30,000 per unit</strong>:
            </p>
            <p><strong>NVIDIA H100 Pricing (2025):</strong></p>
            <ul>
              <li><strong>PCIe 80GB:</strong> $25,000-$30,000 per unit (<a href="https://www.gmicloud.ai/blog/how-much-does-the-nvidia-h100-gpu-cost-in-2025-buy-vs-rent-analysis" target="_blank" rel="noopener noreferrer">Multiple sources</a>)</li>
              <li><strong>SXM5 80GB:</strong> $30,000-$35,000 per unit (premium for NVLink connectivity)</li>
              <li><strong>Enterprise volume pricing:</strong> $22,000-$24,000 per unit (bulk orders, 100+ GPUs)</li>
            </ul>
            <p>Total GPU cost for 1 GW capacity:</p>
            <ul>
              <li><strong>Low estimate:</strong> 654,762 × $25,000 = $16.4B</li>
              <li><strong>Mid estimate:</strong> 654,762 × $28,000 = $18.3B</li>
              <li><strong>High estimate:</strong> 654,762 × $30,000 = $19.6B</li>
            </ul>
            <p>
              Though <strong>energy is the most critical part</strong> of this equation and is the hardest to secure - it doesn't contribute much to the cost model since it only contributes about <strong>10-15% to total monthly costs</strong>. The following table contains assumed power prices per region:
            </p>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Power Cost</th>
                  <th>Grid Operator</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Texas (ERCOT)</td><td>$0.035-0.050/kWh</td><td>ERCOT</td><td>Low due to wind/solar, but peak demand risk</td></tr>
                <tr><td>Iowa</td><td>$0.050-0.070/kWh</td><td>MISO</td><td>Wind-heavy, stable rates</td></tr>
                <tr><td>Virginia (NoVA)</td><td>$0.093/kWh</td><td>PJM</td><td>Data center hub, competitive rates</td></tr>
                <tr><td>Oregon</td><td>$0.060-0.080/kWh</td><td>BPA</td><td>Hydroelectric, very reliable</td></tr>
                <tr><td>Washington</td><td>$0.040/kWh</td><td>BPA</td><td>Lowest in US, hydro-dominated</td></tr>
                <tr><td>Illinois</td><td>$0.060/kWh</td><td>MISO</td><td>Industrial rates</td></tr>
                <tr><td>California</td><td>$0.150-0.180/kWh</td><td>CAISO</td><td>Highest, but renewable-heavy</td></tr>
                <tr><td><strong>Weighted Average</strong></td><td><strong>$0.080/kWh</strong></td><td>-</td><td>Used for base calculations</td></tr>
              </tbody>
            </table>

            <h4>Methodology</h4>
            <p><strong>Monthly GW-H100 Cost</strong> = GPU amortization + Energy costs + Operations</p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontFamily: 'inherit' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>GPU Amortization:</div>
                <div style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>• 654,762 GPUs @ $28,000 average = $18.3B total</div>
                <div style={{ marginLeft: '1rem' }}>• Amortized over 54 months (4.5 years): $18.3B ÷ 54 = <strong>$339M/month</strong></div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Energy Costs:</div>
                <div style={{ marginLeft: '1rem' }}>• 1 GW × 730 hours × $0.080/kWh × 1,000 = <strong>$58.4M/month</strong></div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Operations (20% of energy):</div>
                <div style={{ marginLeft: '1rem' }}>• $58.4M × 0.20 = <strong>$11.7M/month</strong></div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem', fontWeight: 600, fontSize: '1.1rem' }}>
                Total Monthly GW-H100 Cost: $339M + $58.4M + $11.7M = <strong>$409M/month</strong>
              </div>
            </div>
            <p><strong>Cost scenarios (monthly):</strong></p>
            <ul>
              <li><strong>Low:</strong> $360M/month (low GPU cost @ $25K, cheap power @ $0.05/kWh)</li>
              <li><strong>Mid:</strong> $409M/month (baseline assumptions)</li>
              <li><strong>High:</strong> $530M/month (premium GPUs @ $30K, expensive power @ $0.15/kWh)</li>
            </ul>

            <h3 id="environmental-impact">Environmental Impact</h3>
            <p>
              AI datacenter operations carry significant environmental costs beyond energy consumption. A 1 GW compute-month generates substantial carbon emissions and water consumption that must be understood in context of global sustainability goals.
            </p>

            <h4>Carbon Emissions</h4>
            <p><strong>Calculation:</strong></p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontFamily: 'inherit' }}>
              <div style={{ marginBottom: '0.25rem' }}>DGX H100 servers: 654,762 GPUs ÷ 8 GPUs/server = 81,845 servers</div>
              <div style={{ marginBottom: '1rem' }}>CO₂ emissions per server: 2,450 kg CO₂e/month <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>(Source: <a href="https://newsletter.semianalysis.com/p/ai-datacenter-energy-dilemma-race" target="_blank" rel="noopener noreferrer">SemiAnalysis, 2024</a>)</span></div>

              <div style={{ marginBottom: '1rem' }}>Total monthly emissions: 81,845 servers × 2,450 kg CO₂e = <strong>200,520 tonnes CO₂e/month</strong></div>

              <div style={{ fontWeight: 600 }}>Annual emissions: 200,520 × 12 = 2.41 million tonnes CO₂e/year</div>
            </div>

            <p><strong>Context:</strong></p>
            <p>
              A single GW-scale AI datacenter produces approximately <strong>200,500 tonnes of CO₂e per month</strong> from operations (Scope 2 emissions), equivalent to:
            </p>
            <ul>
              <li>Annual emissions from ~43,500 passenger vehicles</li>
              <li>Annual energy use of ~23,000 U.S. homes</li>
              <li>Carbon sequestered by ~3.3 million tree seedlings grown for 10 years</li>
            </ul>
            <p>
              These emissions are driven primarily by electricity generation from fossil fuels. The actual carbon footprint varies significantly by grid carbon intensity - facilities in regions with high renewable penetration (Pacific Northwest, Texas wind corridor) can achieve 50-70% lower emissions than those in coal-heavy grids.
            </p>

            <h4>Water Consumption</h4>
            <p><strong>Calculation:</strong></p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontFamily: 'inherit' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Monthly energy consumption:</div>
                <div style={{ marginLeft: '1rem' }}>1 GW × 730 hours × 1,000 kW/MW = 730,000 MWh/month</div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Direct water use (on-site cooling):</div>
                <div style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>Average WUE: 1.8 L/kWh (industry standard)</div>
                <div style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>Direct water: 730,000,000 kWh × 1.8 L/kWh = 1,314 million liters/month</div>
                <div style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>= 1.31 million m³/month</div>
                <div style={{ marginLeft: '1rem' }}>= 347 million gallons/month</div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Indirect water use (electricity generation):</div>
                <div style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>Thermoelectric generation: ~2 gallons per kWh (U.S. average)</div>
                <div style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>Indirect water: 730,000,000 kWh × 2 gal/kWh × 3.785 L/gal = 5,525 million liters/month</div>
                <div style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>= 5.53 million m³/month</div>
                <div style={{ marginLeft: '1rem' }}>= 1,460 million gallons/month</div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Total water footprint:</div>
                <div style={{ marginBottom: '0.25rem' }}><strong>6.84 million m³/month = 1.81 billion gallons/month</strong></div>
                <div><strong>Annual water footprint: 82 million m³/year = 21.7 billion gallons/year</strong></div>
              </div>
            </div>

            <p><strong>Context:</strong></p>
            <p>
              A 1 GW compute-month requires approximately <strong>6.8 million cubic meters of water monthly</strong> (direct + indirect), equivalent to:
            </p>
            <ul>
              <li>Daily water use of 1.5 million people</li>
              <li>Annual water consumption of ~130,000 U.S. households</li>
              <li>Enough to fill ~2,700 Olympic-sized swimming pools</li>
            </ul>
            <p>This water footprint is split between:</p>
            <ul>
              <li><strong>19% direct use:</strong> On-site evaporative cooling (1.31 million m³/month)</li>
              <li><strong>81% indirect use:</strong> Water consumed in electricity generation (5.53 million m³/month)</li>
            </ul>
            <p>The indirect component varies dramatically by energy source:</p>
            <ul>
              <li><strong>Coal/natural gas plants:</strong> 2-3 gallons per kWh</li>
              <li><strong>Hydroelectric:</strong> Up to 18 gallons per kWh (reservoir evaporation)</li>
              <li><strong>Wind/solar:</strong> Effectively zero water consumption</li>
            </ul>

            <h4>Regional Considerations</h4>
            <p>
              Water stress amplifies the environmental impact of AI datacenter deployment. States like Arizona, California, and Nevada face severe water scarcity, yet host significant datacenter capacity. A 1 GW facility in these regions can consume:
            </p>
            <ul>
              <li>3-5% of a medium-sized city's annual water allocation</li>
              <li>Equivalent water to irrigate 5,000-8,000 acres of farmland</li>
            </ul>
            <p>Optimal siting strategies prioritize:</p>
            <ol>
              <li><strong>Low carbon grids:</strong> Pacific Northwest (hydro), Texas (wind), Midwest (wind + solar)</li>
              <li><strong>Low water stress:</strong> Avoiding Southwest and California</li>
              <li><strong>Renewable potential:</strong> Regions with abundant wind/solar for future expansion</li>
            </ol>
            <p>
              Best-case deployment (Midwest wind/solar regions) can reduce both carbon emissions by 60-70% and water consumption by 85% compared to worst-case deployment (coal-heavy, water-stressed regions).
            </p>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <h2 id="conclusion">Conclusion</h2>
            <p>
              The Compute-Month framework provides a <strong>standardized economic unit</strong> for AI infrastructure analysis, translating facility power (GW) to GPU capacity (H100-equivalent) into measurable compute output (models trained, queries served, tokens processed) and economic value (market rate, cost).
            </p>
            <p><strong>Key takeaways:</strong></p>
            <ul>
              <li><strong>Scale & standardization:</strong> One GW-H100-Month = 478M H100-hours = 1.70 × 10²⁷ FLOPs provides a common unit for comparing diverse datacenter projects</li>
              <li><strong>Training economics:</strong> Can train 1-4 frontier models/month (with 10× R&D overhead)</li>
              <li><strong>Inference capacity:</strong> Can serve 986 billion standard queries or 131 million-1.3 billion reasoning queries monthly</li>
              <li><strong>Market value:</strong> $698M - $1.40B/month in compute rental value (based on spot markets)</li>
              <li><strong>Monthly costs:</strong> $360M - $530M/month for GPU amortization, energy, and operations</li>
              <li><strong>Efficiency = capacity:</strong> PUE improvements don't reduce power demand - they increase compute density (10% better PUE = 10% more GPUs)</li>
              <li><strong>Energy is critical but not dominant:</strong> While securing power is the hardest challenge, energy represents only 10-15% of monthly costs</li>
            </ul>
            <p>
              The compute-month bridges infrastructure planning (MW/GW) with business outcomes (models, queries, revenue), enabling meaningful comparisons across projects, efficiency interventions, and technology roadmaps. It provides a common language for developers, investors, policymakers, and energy providers to evaluate AI datacenter economics.
            </p>

            <h3>Future Work</h3>
            <p>
              The framework can be extended to account for more nuances of AI infrastructure and frontier models. Specifically:
            </p>
            <ul>
              <li><strong>Algorithmic efficiency gains:</strong> Models are achieving the same benchmark scores with less training compute over time. For example, achieving GPT-3 level performance now requires ~40× less compute than in 2020. Incorporating these trends would allow the compute-month to be adjusted for "effective capability" rather than raw FLOPs.</li>
              <li><strong>Benchmark-specific valuations:</strong> Different applications value different capabilities (code generation vs. reasoning vs. creative writing). A compute-month could be denominated in "benchmark units" - e.g., "MMLU-months" or "HumanEval-months" - to reflect actual capability delivered rather than hardware utilization.</li>
              <li><strong>Inference efficiency trends:</strong> As quantization, speculative decoding, and other inference optimizations improve, the same hardware can serve more queries. Tracking these improvements would allow compute-month valuations to reflect growing inference capacity over time.</li>
              <li><strong>Sparse model architectures:</strong> The framework currently assumes dense models (989 TFLOPS). Future models using Mixture-of-Experts (MoE) or other sparse architectures could leverage the H100's full 1,979 TFLOPS with sparsity. This parameter can be adjusted to reflect evolving architectural trends and their impact on effective compute capacity.</li>
            </ul>

            <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              <strong>Framework Version:</strong> 1.0<br />
              <strong>Last Updated:</strong> December 30, 2025<br />
              <strong>Data Sources:</strong> EpochAI, NVIDIA specifications, industry reports<br />
              <strong>Interactive Calculator:</strong> <a href="https://ai-infra.fyi/compute-month" target="_blank" rel="noopener noreferrer">ai-infra.fyi/compute-month</a>
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
