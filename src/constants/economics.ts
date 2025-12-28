import type { CapexModel } from '../types';

/**
 * CapEx models per GW of facility power
 * Sources:
 * - EpochAI: Industry analysis
 * - Validated: Our research ($35.8B)
 * - Stargate: Microsoft/OpenAI project estimates
 */
export const CAPEX_PER_GW: Record<CapexModel, number> = {
  'EpochAI ($44B)': 44e9,
  'Validated ($35.8B)': 35.8e9,
  'Stargate ($50B)': 50e9
};

/**
 * Default financial parameters
 */
export const WACC = 0.10; // Weighted Average Cost of Capital
export const COMPUTE_AMORTIZATION_YEARS = 4;
export const INFRASTRUCTURE_AMORTIZATION_YEARS = 15;
export const COMPUTE_CAPEX_PCT = 0.7; // 70% of CapEx is compute
export const INFRASTRUCTURE_CAPEX_PCT = 0.3; // 30% of CapEx is infrastructure
export const OPERATIONS_PCT = 0.2; // 20% of power cost for operations

/**
 * Default pricing (December 2025)
 */
export const DEFAULT_TRAINING_RATE = 2.19; // $/H100-hour (Ornn Index spot price)
export const DEFAULT_INFERENCE_RATE = 0.60; // $/1M tokens (blended API rates)
