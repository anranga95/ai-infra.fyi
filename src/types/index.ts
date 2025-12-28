/**
 * Core types for the GW-Month Calculator
 */

export interface GPUSpec {
  tdp: number; // kW
  tflops: number;
  memory: number | null; // GB
  label: string; // Full spec string for display
}

export interface PhysicalCapacity {
  itPower: number;
  serverPower: number;
  gpuCount: number;
  h100HoursMonth: number;
  totalFlopsMonth: number;
}

export interface TrainingModel {
  flops: number;
  mfu: number;
}

export interface TrainingResult {
  parallel: number;
  realistic: number;
  mfu: number;
}

export interface TrainingResults {
  [modelName: string]: TrainingResult;
}

export interface InferenceModel {
  name: string;
  params: number;
  tokensPerQuery: number;
  queriesPerMonth?: number;
}

export interface ReasoningResult {
  scenario: string;
  multiplier: number;
  queriesPerMonth: number;
}

export interface InferenceResults {
  standard: InferenceModel[];
  reasoning: ReasoningResult;
}

export interface EconomicsBreakdown {
  'CapEx Amortization': number;
  'Power': number;
  'Operations': number;
}

export interface Economics {
  totalCapex: number;
  monthlyAmort: number;
  monthlyPower: number;
  monthlyOps: number;
  monthlyTCO: number;
  totalTCO: number;
  breakdown: EconomicsBreakdown;
}

export interface Revenue {
  training: number;
  inference: number;
  total: number;
}

export interface CalculatorParams {
  // Simple inputs
  facilityGW: number;
  trainingPct: number;

  // Advanced inputs
  months: number;
  pue: number;
  itOverhead: number;
  gpuType: string;
  trainingMFU: number;
  rdMultiplier: number;
  inferenceUtil: number;
  reasoningPct: number;
  reasoningScenario: ReasoningScenario;
  capexModel: CapexModel;
  region: string;
  trainingRate: number;
  inferenceRate: number;
}

export type ReasoningScenario = 'Low' | 'Medium' | 'High' | 'Extreme';
export type CapexModel = 'EpochAI ($44B)' | 'Validated ($35.8B)' | 'Stargate ($50B)';

export interface EnvironmentalImpact {
  carbonIntensity: number; // gCO2/kWh
  monthlyCO2Tonnes: number;
  monthlyWaterGallons: number;
}
