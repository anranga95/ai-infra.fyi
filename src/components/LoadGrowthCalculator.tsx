import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Label
} from 'recharts';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: {
      marketShare: number;
      capacity: number;
      chips: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    // Get data from payload instead of relying on label which might be from wrong axis
    const dataPoint = payload[0].payload;
    const capacity = payload[0].value;
    const marketShare = dataPoint.marketShare;
    const chips = dataPoint.chips;

    return (
      <div style={{
        backgroundColor: 'white',
        padding: '12px',
        border: '2px solid #333',
        borderRadius: '6px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        filter: 'none',
        WebkitFilter: 'none'
      }}>
        <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: '0.95rem', color: '#111' }}>
          US Market Share: {marketShare}%
        </p>
        <p style={{ margin: '0 0 6px 0', fontSize: '0.9rem', color: '#333' }}>
          Load Growth: {capacity.toFixed(1)} GW
        </p>
        <p style={{ margin: '0', fontSize: '0.9rem', color: '#333' }}>
          GPU Chips: {chips.toFixed(1)}M
        </p>
      </div>
    );
  }
  return null;
};

function LoadGrowthCalculator() {
  const [growthRate, setGrowthRate] = useState(30); // Default to 30%
  const [hoveredBenchmark, setHoveredBenchmark] = useState<number | null>(null);

  // Business logic: matches the static graphs from LEI/EPRI reports
  const calculateGlobalCapacity = (ratePercent: number): number => {
    const rateDecimal = ratePercent / 100;
    return 48.6 + (130.5 * rateDecimal);
  };

  // Generate chart data
  const generateChartData = () => {
    const data = [];
    const totalGlobalCapacity = calculateGlobalCapacity(growthRate);

    for (let marketShare = 0; marketShare <= 100; marketShare += 5) {
      const chips = (totalGlobalCapacity * (marketShare / 100)) * 0.615; // Convert GW to Million chips
      data.push({
        marketShare,
        capacity: totalGlobalCapacity * (marketShare / 100),
        chips,
        // Red horizontal line segment (only left of 50%)
        redLine: marketShare <= 50 ? totalGlobalCapacity * 0.5 : null
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const totalGlobalCapacity = calculateGlobalCapacity(growthRate);
  const maxChips = totalGlobalCapacity * 0.615; // 1 GW ≈ 0.615 Million AI Chips

  // Calculate the load growth at 50% US market share
  const loadGrowthAt50 = totalGlobalCapacity * 0.5;

  // Key benchmark points for slider notches
  const benchmarks = [
    { value: 11, label: 'LEI Conservative', source: 'London Economics International (2024)' },
    { value: 40, label: 'Hyperscaler Trend', source: 'EPRI Analysis (2024)' },
    { value: 70, label: 'Aggressive Scale-up', source: 'EpochAI Projection (2024)' }
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Feasibility of US Data Center Load Growth Estimates (2025-2030)
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontStyle: 'italic' }}>
          Model of GPU Supply Chain Scenarios
        </p>
      </div>

      {/* Layout: Slider Left (20%) + Chart Right (80%) */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'stretch' }}>

        {/* Left Side - Vertical Slider (20%) */}
        <div style={{
          width: '20%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-secondary)',
          padding: '2rem 1.5rem',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: 'var(--primary)',
            textAlign: 'center',
            marginBottom: '0.5rem'
          }}>
            {growthRate}%
          </div>
          <label style={{
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '2rem',
            fontSize: '0.9rem',
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            GPU Global Supply CAGR<br />
            (Compound Annual Growth Rate)
          </label>

          {/* Vertical Slider Container */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            position: 'relative',
            width: '100%'
          }}>
            {/* Vertical Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              orient="vertical"
              style={{
                WebkitAppearance: 'slider-vertical',
                width: '8px',
                height: '400px',
                cursor: 'pointer'
              } as React.CSSProperties}
            />

            {/* Benchmark labels and notches (to the left of slider) */}
            <div style={{
              position: 'absolute',
              left: '0',
              right: '50%',
              height: '400px'
            }}>
              {benchmarks.map((benchmark) => {
                // Position from bottom: 0% at bottom (0), 100% at top (100% of slider)
                // So benchmark.value directly maps to position from bottom
                const position = (benchmark.value / 100) * 100;
                return (
                  <div
                    key={benchmark.value}
                    style={{
                      position: 'absolute',
                      bottom: `${position}%`,
                      transform: 'translateY(50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      right: '0',
                      paddingRight: '15px'
                    }}
                  >
                    {/* Info icon with tooltip (leftmost) */}
                    <div
                      onMouseEnter={() => setHoveredBenchmark(benchmark.value)}
                      onMouseLeave={() => setHoveredBenchmark(null)}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: '2px solid var(--primary)',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: 'var(--primary)',
                        cursor: 'help',
                        position: 'relative',
                        flexShrink: 0
                      }}
                    >
                      i
                      {/* Tooltip (appears to left of icon) */}
                      {hoveredBenchmark === benchmark.value && (
                        <div style={{
                          position: 'absolute',
                          right: '25px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: '#1f2937',
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          whiteSpace: 'nowrap',
                          zIndex: 1000,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}>
                          {benchmark.source}
                        </div>
                      )}
                    </div>
                    {/* Value label (middle) */}
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      fontWeight: growthRate === benchmark.value ? 'bold' : 'normal',
                      minWidth: '40px'
                    }}>
                      {benchmark.value}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Chart (80%) */}
        <div style={{
          width: '80%',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid var(--border)'
        }}>
          {/* Chart Title */}
          <h3 style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#374151'
          }}>
            Load Growth (GW) vs. % of Global Chip Supply Secured (US 2025-2030)
          </h3>
          <ResponsiveContainer width="100%" height={550}>
            <LineChart data={chartData} margin={{ top: 60, right: 30, left: 60, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              {/* Top X-Axis - GPU Chips */}
              <XAxis
                xAxisId="top"
                orientation="top"
                dataKey="chips"
                stroke="#6b7280"
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => value.toFixed(1)}
              >
                <Label
                  value="Cumulative GPU Chips (Millions)"
                  offset={15}
                  position="top"
                  style={{ fontSize: '13px', fontWeight: 'bold', fill: '#374151' }}
                />
              </XAxis>

              {/* Bottom X-Axis - Market Share */}
              <XAxis
                xAxisId="bottom"
                dataKey="marketShare"
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              >
                <Label
                  value="% of Global Chip Supply Secured by US"
                  offset={-60}
                  position="insideBottom"
                  style={{ fontSize: '14px', fontWeight: 'bold' }}
                />
              </XAxis>

              {/* Y-Axis */}
              <YAxis
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                domain={[0, 140]}
              >
                <Label
                  value="Load Growth from Data Centers (GW)"
                  angle={-90}
                  position="insideLeft"
                  style={{ fontSize: '14px', fontWeight: 'bold', textAnchor: 'middle' }}
                />
              </YAxis>

              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

              {/* Reference Lines */}
              {/* Vertical line at 50% market share */}
              <ReferenceLine
                x={50}
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                xAxisId="bottom"
              />

              {/* Main Line */}
              <Line
                xAxisId="bottom"
                type="monotone"
                dataKey="capacity"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                name="% of Supply Chain Capacity"
                activeDot={{ r: 6 }}
              />

              {/* Red horizontal line segment (only left of 50%) */}
              <Line
                xAxisId="bottom"
                type="monotone"
                dataKey="redLine"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                connectNulls={false}
              />

              {/* Red label on Y-axis at intersection (just the number) */}
              <ReferenceLine
                y={loadGrowthAt50}
                stroke="transparent"
                label={{
                  value: loadGrowthAt50.toFixed(1),
                  position: 'left',
                  fill: '#ef4444',
                  fontSize: 12,
                  fontWeight: 'bold',
                  offset: 5
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Label below chart, right below x-axis numbers */}
          <div style={{
            textAlign: 'center',
            marginTop: '-60px',
            marginBottom: '40px',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#3b82f6'
          }}>
            Current US Market Share (50%)
          </div>

          {/* Analysis Summary */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '4px',
            borderLeft: '4px solid var(--primary)'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              <strong>Current Scenario:</strong> At {growthRate}% annual growth (CAGR),
              the global production capacity reaches {totalGlobalCapacity.toFixed(1)} GW ({maxChips.toFixed(1)}M chips).
              With the US securing 50% market share, this results in {loadGrowthAt50.toFixed(1)} GW of US load growth.
            </p>
          </div>
        </div>
      </div>

      {/* Model Documentation - below the entire calculator */}
      <div style={{
        marginTop: '2rem',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Calculator Methodology</h3>

        <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Sources</h4>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          marginBottom: '0.5rem'
        }}>
          London Economics International LLC. (2025, July 7). Uncertainty and upward bias are inherent in data center electricity demand projections. Prepared for the Southern Environmental Law Center. <a href="https://www.londoneconomics.com/wp-content/uploads/2025/07/LEI-Data-Center-Final-Report-07072025.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>https://www.londoneconomics.com/wp-content/uploads/2025/07/LEI-Data-Center-Final-Report-07072025.pdf</a>
        </p>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          margin: 0
        }}>
          Electric Power Research Institute. (2025, August). Scaling intelligence: The exponential growth of AI's power needs (EPRI White Paper). Electric Power Research Institute. <a href="https://www.epri.com/research/products/000000003002033669" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>https://www.epri.com/research/products/000000003002033669</a>
        </p>

        <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Regression Logic</h4>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          marginBottom: '0.5rem'
        }}>
          The model derives <strong>Total Global 2030 Capacity (GW)</strong> directly from the <strong>Annual GPU Supply Growth Rate (CAGR)</strong> using a linear interpolation formula.
        </p>
        <ul style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          marginBottom: '1rem',
          listStyleType: 'disc'
        }}>
          <li><strong>Formula:</strong> Global_GW = 48.6 + (130.5 × Growth_Rate_Decimal)</li>
          <li><strong>Derivation:</strong> The slope (130.5) and intercept (48.6) are regression coefficients calibrated to fit three industry benchmarks:
            <ul style={{ marginTop: '0.5rem', listStyleType: 'circle', marginLeft: '1.5rem' }}>
              <li><strong>LEI Benchmark (11% Growth):</strong> Input 0.107 → Output <strong>62.6 GW</strong>. Matches LEI's projected ~63 GW global limit based on industrial silicon trends.</li>
              <li><strong>EPRI Low Benchmark (40% Growth):</strong> Input 0.40 → Output <strong>100.8 GW</strong>. Matches EPRI's "Hyperscaler CapEx" scenario.</li>
              <li><strong>EPRI High Benchmark (70% Growth):</strong> Input 0.70 → Output <strong>139.95 GW</strong>. Matches EPRI's "Aggressive Scale-up" scenario.</li>
            </ul>
          </li>
        </ul>

        <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Power Density Factor</h4>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          marginBottom: '0.5rem'
        }}>
          To display chip counts, the model applies a fixed conversion factor to the calculated GW capacity. This factor standardizes the conflicting power density methodologies of the two reports into a single "Net Load" metric.
        </p>
        <ul style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          marginBottom: '1rem',
          listStyleType: 'disc'
        }}>
          <li><strong>Conversion Factor:</strong> 1 GW ≈ 0.615 Million AI Accelerators</li>
          <li><strong>Implied Unit Power:</strong> <strong>1.626 kW per Chip</strong> (1,000 MW / 615,000 chips).</li>
          <li><strong>Methodological Alignment:</strong>
            <ul style={{ marginTop: '0.5rem', listStyleType: 'circle', marginLeft: '1.5rem' }}>
              <li><strong>Vs. LEI:</strong> LEI calculates a rise to <strong>~1.76 kW/chip</strong> by 2030 based on silicon thermal density (W/mm²).</li>
              <li><strong>Vs. EPRI:</strong> EPRI calculates <strong>~1.50 kW/chip</strong> based on server-level overhead (cooling/networking multipliers).</li>
              <li><strong>Synthesis:</strong> The model's <strong>1.63 kW</strong> blended value inherently accounts for the transition to higher-density hardware (e.g., NVIDIA B200) without requiring a separate user input for efficiency or power creep.</li>
            </ul>
          </li>
        </ul>

        
      </div>
    </div>
  );
}

export default LoadGrowthCalculator;
