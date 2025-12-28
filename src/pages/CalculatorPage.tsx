import { useState } from 'react';
import { GPU_SPECS } from '../constants/gpuSpecs';
import { REGIONAL_POWER } from '../constants/regions';
import {
  calculatePhysicalCapacity,
  calculateTraining,
  calculateInference,
  calculateEconomics,
  calculateRevenue,
  calculateEnvironmentalImpact
} from '../lib/calculations';
import { calculateTrainingTokens, calculateInferenceTokens, formatTokens } from '../lib/calculations/tokens';
import { TOKEN_DATA } from '../constants/tokens';
import type { TrainingModel, InferenceModel, ReasoningLevel } from '../constants/tokens';
import { formatNumber, formatCurrency } from '../lib/utils/formatting';
import type { ReasoningScenario, CapexModel } from '../types';

function CalculatorPage() {
  const [advancedMode, setAdvancedMode] = useState(false);

  // Simple inputs
  const [facilityGW, setFacilityGW] = useState(1);
  const [trainingPct, setTrainingPct] = useState(80);
  const [gpuType, setGpuType] = useState('H100 SXM');

  // Advanced inputs
  const [months, setMonths] = useState(12);
  const [pue, setPue] = useState(1.2);
  const [itOverhead, setItOverhead] = useState(1.14);
  const [trainingMFU, setTrainingMFU] = useState(0.35);
  const [rdMultiplier, setRdMultiplier] = useState(11.25);
  const [inferenceUtil, setInferenceUtil] = useState(0.70);
  const [reasoningPct] = useState(20);
  const [reasoningScenario] = useState<ReasoningScenario>('Medium');
  const [capexModel, setCapexModel] = useState<CapexModel>('Validated ($35.8B)');
  const [region, setRegion] = useState('Weighted Average');
  const [trainingRate, setTrainingRate] = useState(2.19);
  const [inferenceRate, setInferenceRate] = useState(0.60);

  const [showRDOverhead, setShowRDOverhead] = useState(true);

  // Token economics
  const [trainingTokenModel, setTrainingTokenModel] = useState<TrainingModel>('GPT-4.5');
  const [inferenceTokenModel, setInferenceTokenModel] = useState<InferenceModel>('GPT-4 class (280B)');
  const [tokenReasoningLevel, setTokenReasoningLevel] = useState<ReasoningLevel>('Medium');

  // Get specs for current GPU
  const gpuTDP = GPU_SPECS[gpuType].tdp;
  const gpuTFLOPs = GPU_SPECS[gpuType].tflops;
  const powerCost = REGIONAL_POWER[region];

  // Run all calculations
  const physical = calculatePhysicalCapacity({
    facilityMW: facilityGW * 1000,
    pue,
    itOverhead,
    gpuTDP
  });

  const training = calculateTraining(
    physical.h100HoursMonth,
    trainingPct,
    trainingMFU,
    rdMultiplier,
    gpuTFLOPs
  );

  const inferencePct = 100 - trainingPct;
  const inference = calculateInference(
    physical.h100HoursMonth,
    inferencePct,
    physical.gpuCount,
    { inferenceUtil, reasoningPct, reasoningScenario }
  );

  const economics = calculateEconomics({
    facilityMW: facilityGW * 1000,
    h100Hours: physical.h100HoursMonth,
    capexModel,
    powerCost,
    months
  });

  const environmental = calculateEnvironmentalImpact(facilityGW, region);

  const trainingHours = physical.h100HoursMonth * (trainingPct / 100) * months;
  const totalInferenceQueries = (
    inference.standard.reduce((sum, m) => sum + (m.queriesPerMonth || 0), 0) +
    inference.reasoning.queriesPerMonth
  ) * months;

  const revenue = calculateRevenue(trainingHours, totalInferenceQueries, {
    trainingRate,
    inferenceRate
  });

  const margin = ((revenue.total - economics.totalTCO) / revenue.total) * 100;

  // Token economics calculations
  const trainingTokens = calculateTrainingTokens(
    physical.gpuCount,
    trainingPct,
    trainingTokenModel,
    revenue.training / months
  );

  const inferenceTokens = calculateInferenceTokens(
    inference.standard[0].queriesPerMonth || 0,
    inferenceTokenModel,
    tokenReasoningLevel,
    reasoningPct,
    revenue.inference / months
  );

  return (
    <div className="calculator-container">
      <div className="header">
        <div>
          <h1>🧮 Compute-Month Calculator</h1>
          <p>
            Use this calculator to understand the cost and value of AI data center capacity.
          </p>
        </div>
      </div>

      <div className="calculator-grid">
        {/* LEFT COLUMN - INPUTS */}
        <div>
          <div className="section-header" style={{ margin: '0 0 1rem 0' }}>
            <h3>🎛️ Inputs</h3>
          </div>

          <div className="card">
          <div className="input-group">
            <label>
              <span>Facility Size</span>
              <span className="value">{facilityGW.toFixed(1)} GW</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={facilityGW}
              onChange={(e) => setFacilityGW(parseFloat(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>
              <span>Training / Inference Split</span>
              <span className="value">{trainingPct}% / {100 - trainingPct}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={trainingPct}
              onChange={(e) => setTrainingPct(parseInt(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>GPU Type</label>
            <select value={gpuType} onChange={(e) => setGpuType(e.target.value)}>
              {Object.entries(GPU_SPECS).map(([key, spec]) => (
                <option key={key} value={key}>{spec.label}</option>
              ))}
            </select>
            <div className="input-note">
              Specs from EpochAI ml_hardware.csv
            </div>
          </div>

          <button
            className="mode-toggle"
            style={{ width: '100%', marginTop: '1rem' }}
            onClick={() => setAdvancedMode(!advancedMode)}
          >
            {advancedMode ? 'Switch to Simple Mode' : 'Switch to Advanced Mode'}
          </button>

          {/* ADVANCED MODE CONTROLS */}
          {advancedMode && (
            <>
              <div className="section-header" style={{ marginTop: '1.5rem' }}>
                <h3>🔧 Physical Infrastructure</h3>
              </div>

              <div className="input-group">
                <label>
                  <span>PUE (Power Usage Effectiveness)</span>
                  <span className="value">{pue.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="1.1"
                  max="1.5"
                  step="0.01"
                  value={pue}
                  onChange={(e) => setPue(parseFloat(e.target.value))}
                />
                <div className="input-note">
                  Google: 1.10, Meta: 1.09, Microsoft: 1.18 (Industry data)
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>IT Overhead Factor</span>
                  <span className="value">{itOverhead.toFixed(2)}×</span>
                </label>
                <input
                  type="range"
                  min="1.05"
                  max="1.3"
                  step="0.01"
                  value={itOverhead}
                  onChange={(e) => setItOverhead(parseFloat(e.target.value))}
                />
                <div className="input-note">
                  Based on NVIDIA DGX GB200 specifications
                </div>
              </div>

              <div className="input-group">
                <label>Regional Power Cost</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                  {Object.keys(REGIONAL_POWER).map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <div className="input-note">
                  ${powerCost.toFixed(3)}/kWh - Regional electricity rates
                </div>
              </div>

              <div className="section-header">
                <h3>⚡ Workload Parameters</h3>
              </div>

              <div className="input-group">
                <label>
                  <span>Training MFU</span>
                  <span className="value">{(trainingMFU * 100).toFixed(0)}%</span>
                </label>
                <input
                  type="range"
                  min="0.20"
                  max="0.50"
                  step="0.01"
                  value={trainingMFU}
                  onChange={(e) => setTrainingMFU(parseFloat(e.target.value))}
                />
                <div className="input-note">
                  Meta Llama 3.1: 38-43% at 16K GPU scale
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>R&D Overhead Multiplier</span>
                  <span className="value">{rdMultiplier.toFixed(2)}×</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.25"
                  value={rdMultiplier}
                  onChange={(e) => setRdMultiplier(parseFloat(e.target.value))}
                />
                <div className="input-note">
                  11.25× = OpenAI 2024 ($5B total / $400M GPT-4.5 final)
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>Inference Utilization</span>
                  <span className="value">{(inferenceUtil * 100).toFixed(0)}%</span>
                </label>
                <input
                  type="range"
                  min="0.50"
                  max="0.90"
                  step="0.01"
                  value={inferenceUtil}
                  onChange={(e) => setInferenceUtil(parseFloat(e.target.value))}
                />
                <div className="input-note">
                  TensorRT-LLM / vLLM benchmarks
                </div>
              </div>

              <div className="section-header">
                <h3>💰 Economics</h3>
              </div>

              <div className="input-group">
                <label>
                  <span>Time Period</span>
                  <span className="value">{months} months</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={months}
                  onChange={(e) => setMonths(parseInt(e.target.value))}
                />
                <div className="input-note">
                  For CapEx amortization and total cost calculations
                </div>
              </div>

              <div className="input-group">
                <label>CapEx Model</label>
                <select value={capexModel} onChange={(e) => setCapexModel(e.target.value as CapexModel)}>
                  <option value="EpochAI ($44B)">EpochAI ($44B)</option>
                  <option value="Validated ($35.8B)">Validated ($35.8B)</option>
                  <option value="Stargate ($50B)">Stargate ($50B)</option>
                </select>
                <div className="input-note">
                  Per GW of facility power
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>Training Rate</span>
                  <span className="value">${trainingRate.toFixed(2)}/H100-hour</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.01"
                  value={trainingRate}
                  onChange={(e) => setTrainingRate(parseFloat(e.target.value))}
                />
                <div className="input-note">
                  Ornn spot market pricing (December 2025)
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>Inference Rate</span>
                  <span className="value">${inferenceRate.toFixed(2)}/1M tokens</span>
                </label>
                <input
                  type="range"
                  min="0.10"
                  max="2"
                  step="0.01"
                  value={inferenceRate}
                  onChange={(e) => setInferenceRate(parseFloat(e.target.value))}
                />
                <div className="input-note">
                  Blended API rates (input + output tokens)
                </div>
              </div>
            </>
          )}
          </div>
        </div>

        {/* RIGHT COLUMN - OUTPUTS */}
        <div>
          <div className="section-header" style={{ margin: '0 0 1rem 0' }}>
            <h3>📊 Results</h3>
          </div>

          {/* 1. Capacity */}
          <div style={{ marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            Capacity
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <div className="result-card">
              <div className="result-label">GPU Count</div>
              <div className="result-value">{formatNumber(physical.gpuCount)}</div>
              <div className="result-context">{gpuType} chips</div>
            </div>

            <div className="result-card">
              <div className="result-label">Monthly Capacity</div>
              <div className="result-value">{formatNumber(physical.h100HoursMonth)}</div>
              <div className="result-context">H100-hours/month</div>
            </div>

            <div className="result-card">
              <div className="result-label">FLOPs</div>
              <div className="result-value">
                {(() => {
                  const exp = Math.floor(Math.log10(physical.totalFlopsMonth));
                  const mantissa = physical.totalFlopsMonth / Math.pow(10, exp);
                  return `${mantissa.toFixed(2)}e${exp}`;
                })()}
              </div>
              <div className="result-context">FLOPs/month</div>
            </div>
          </div>

          {/* 2. Training */}
          <div style={{ marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            Training
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <div className="result-card">
              <div className="result-label">Tokens</div>
              <div className="result-value">{formatTokens(trainingTokens.monthlyThroughput)}</div>
              <div className="result-context">{trainingTokenModel}/month</div>
            </div>

            <div className="result-card">
              <div className="result-label">GPT-4.5</div>
              <div className="result-value">
                {(showRDOverhead ? training['GPT-4.5'].realistic : training['GPT-4.5'].parallel).toFixed(2)}
              </div>
              <div className="result-context">
                {showRDOverhead ? `With ${rdMultiplier.toFixed(1)}× R&D` : 'Parallel capacity'}
              </div>
            </div>

            <div className="result-card">
              <div className="result-label">Claude Sonnet 4</div>
              <div className="result-value">
                {(showRDOverhead ? training['Claude Sonnet 4'].realistic : training['Claude Sonnet 4'].parallel).toFixed(2)}
              </div>
              <div className="result-context">Models/month</div>
            </div>
          </div>

          <div style={{ marginBottom: '0.6rem', marginLeft: '0.5rem' }}>
            <label style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={showRDOverhead}
                onChange={(e) => setShowRDOverhead(e.target.checked)}
              />
              Include R&D overhead ({rdMultiplier.toFixed(1)}×)
            </label>
          </div>

          {/* 3. Inference */}
          <div style={{ marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            Inference
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <div className="result-card">
              <div className="result-label">Tokens</div>
              <div className="result-value">{formatTokens(inferenceTokens.totalTokens)}</div>
              <div className="result-context">{inferenceTokenModel}/month</div>
            </div>

            <div className="result-card">
              <div className="result-label">Standard Queries</div>
              <div className="result-value">{formatNumber(inference.standard[0].queriesPerMonth || 0)}</div>
              <div className="result-context">GPT-4 class/month</div>
            </div>

            <div className="result-card">
              <div className="result-label">Reasoning Queries</div>
              <div className="result-value">{formatNumber(inference.reasoning.queriesPerMonth)}</div>
              <div className="result-context">{reasoningScenario} ({inference.reasoning.multiplier}×)</div>
            </div>
          </div>

          {/* 4. Society */}
          <div style={{ marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            Society
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <div className="result-card">
              <div className="result-label">Market Value</div>
              <div className="result-value">{formatCurrency(physical.h100HoursMonth * trainingRate)}</div>
              <div className="result-context">Ornn spot (${trainingRate}/hr)</div>
            </div>

            <div className="result-card">
              <div className="result-label">CO₂ Emissions</div>
              <div className="result-value">{formatNumber(environmental.monthlyCO2Tonnes)}</div>
              <div className="result-context">tonnes/month</div>
            </div>

            <div className="result-card">
              <div className="result-label">Water Usage</div>
              <div className="result-value">{formatNumber(environmental.monthlyWaterGallons)}</div>
              <div className="result-context">gallons/month</div>
            </div>
          </div>

          {/* Financial Analysis (Advanced Only) */}
          {advancedMode && (
            <>
              <div className="section-header" style={{ marginTop: '1.5rem' }}>
                <h3>💵 Financial Analysis ({months} months)</h3>
              </div>

              <div className="results-grid">
                <div className="result-card">
                  <div className="result-label">Total Cost (TCO)</div>
                  <div className="result-value">{formatCurrency(economics.totalTCO)}</div>
                  <div className="result-context">{formatCurrency(economics.monthlyTCO)}/month</div>
                </div>

                <div className="result-card">
                  <div className="result-label">Revenue Potential</div>
                  <div className="result-value">{formatCurrency(revenue.total)}</div>
                  <div className="result-context">Training + Inference</div>
                </div>
              </div>

              <div className="result-card" style={{ marginTop: '0.75rem' }}>
                <div className="result-label">Gross Margin</div>
                <div className="result-value" style={{ color: margin > 0 ? 'var(--success)' : 'var(--warning)' }}>
                  {margin.toFixed(1)}%
                </div>
                <div className="result-context">
                  Net {formatCurrency(revenue.total - economics.totalTCO)} over {months} months
                </div>
              </div>

              <div className="methodology-note">
                <strong>TCO Methodology:</strong> CapEx amortization (70% compute @ 4yr, 30% infra @ 15yr,
                {formatCurrency(economics.totalCapex)} total) + Monthly power ({formatCurrency(economics.monthlyPower)}) +
                Operations (20% of power) × {months} months = {formatCurrency(economics.monthlyTCO)}/month
              </div>

              <div className="methodology-note">
                <strong>Revenue Methodology:</strong> Training revenue ({formatNumber(trainingHours)} H100-hrs ×
                ${trainingRate.toFixed(2)}/hr = {formatCurrency(revenue.training)}) + Inference revenue
                ({formatNumber(totalInferenceQueries)} queries × ${inferenceRate.toFixed(2)}/1M tokens =
                {formatCurrency(revenue.inference)})
              </div>

              {/* Token Economics Detailed Table */}
              <div className="section-header" style={{ marginTop: '1.5rem' }}>
                <h3>🔤 Token Economics</h3>
              </div>

              <div className="card" style={{ marginTop: '1rem' }}>
                <h3>Training Tokens</h3>
                <table className="breakdown-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Model</td>
                      <td>
                        <select
                          value={trainingTokenModel}
                          onChange={(e) => setTrainingTokenModel(e.target.value as TrainingModel)}
                          style={{ width: '100%', padding: '0.5rem' }}
                        >
                          {Object.keys(TOKEN_DATA.training).map(model => (
                            <option key={model} value={model}>{model}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Monthly Throughput</td>
                      <td>{formatTokens(trainingTokens.monthlyThroughput)} tokens</td>
                    </tr>
                    <tr>
                      <td>Dataset Completions</td>
                      <td>{trainingTokens.datasetCompletions.toFixed(2)} datasets/month</td>
                    </tr>
                    <tr>
                      <td>Revenue per 1M Tokens</td>
                      <td>{formatCurrency(trainingTokens.revenuePerMillion)}</td>
                    </tr>
                    <tr>
                      <td>Tokens per Sec per GPU</td>
                      <td>{TOKEN_DATA.training[trainingTokenModel].tokensPerSecPerGPU.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="card" style={{ marginTop: '1rem' }}>
                <h3>Inference Tokens</h3>
                <table className="breakdown-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Model</td>
                      <td>
                        <select
                          value={inferenceTokenModel}
                          onChange={(e) => setInferenceTokenModel(e.target.value as InferenceModel)}
                          style={{ width: '100%', padding: '0.5rem' }}
                        >
                          {Object.keys(TOKEN_DATA.inference).map(model => (
                            <option key={model} value={model}>{model}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Standard Tokens</td>
                      <td>{formatTokens(inferenceTokens.standardTokens)} tokens/month</td>
                    </tr>
                    <tr>
                      <td>Reasoning Level</td>
                      <td>
                        <select
                          value={tokenReasoningLevel}
                          onChange={(e) => setTokenReasoningLevel(e.target.value as ReasoningLevel)}
                          style={{ width: '100%', padding: '0.5rem' }}
                        >
                          {Object.keys(TOKEN_DATA.reasoning).map(level => (
                            <option key={level} value={level}>
                              {level} ({TOKEN_DATA.reasoning[level as ReasoningLevel].multiplier}×)
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Reasoning Tokens</td>
                      <td>{formatTokens(inferenceTokens.reasoningTokens)} tokens/month</td>
                    </tr>
                    <tr>
                      <td>Total Tokens</td>
                      <td><strong>{formatTokens(inferenceTokens.totalTokens)} tokens/month</strong></td>
                    </tr>
                    <tr>
                      <td>Avg Tokens per Query</td>
                      <td>{inferenceTokens.avgTokensPerQuery.toFixed(0)} tokens</td>
                    </tr>
                    <tr>
                      <td>Revenue per 1M Tokens</td>
                      <td>{formatCurrency(inferenceTokens.revenuePerMillion)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="methodology-note">
                <strong>Token Economics Methodology:</strong> Training throughput = GPUs × training% × tokens/sec/GPU × 730 hours × 3600 sec.
                Inference tokens = (standard queries × tokens/query) + (reasoning queries × tokens/query × reasoning multiplier).
                Sources: {TOKEN_DATA.training[trainingTokenModel].source}; {TOKEN_DATA.inference[inferenceTokenModel].source}; {TOKEN_DATA.reasoning[tokenReasoningLevel].source}.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalculatorPage;
