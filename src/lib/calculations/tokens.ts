import { TOKEN_DATA } from '../../constants/tokens';
import type { TrainingModel, InferenceModel, ReasoningLevel } from '../../constants/tokens';

export interface TrainingTokenResults {
  monthlyThroughput: number; // tokens per month
  datasetCompletions: number; // complete datasets per month
  revenuePerMillion: number; // $ per 1M tokens
}

export interface InferenceTokenResults {
  standardTokens: number;
  reasoningTokens: number;
  totalTokens: number;
  avgTokensPerQuery: number;
  revenuePerMillion: number; // $ per 1M tokens
}

/**
 * Calculate training token throughput
 * @param gpuCount - Total number of GPUs
 * @param trainingPct - Percentage allocated to training (0-100)
 * @param model - Training model type
 * @param trainingRevenue - Total training revenue per month
 * @returns Training token metrics
 */
export function calculateTrainingTokens(
  gpuCount: number,
  trainingPct: number,
  model: TrainingModel,
  trainingRevenue: number
): TrainingTokenResults {
  const modelData = TOKEN_DATA.training[model];

  // Monthly throughput = GPUs × training% × tokensPerSecPerGPU × 730hr × 3600sec/hr
  const trainingGPUs = gpuCount * (trainingPct / 100);
  const hoursPerMonth = 730; // ~30.4 days
  const secondsPerHour = 3600;

  const monthlyThroughput = trainingGPUs * modelData.tokensPerSecPerGPU * hoursPerMonth * secondsPerHour;

  // Dataset completions = monthly throughput / dataset size
  const datasetCompletions = monthlyThroughput / modelData.datasetTokens;

  // Revenue per 1M tokens
  const revenuePerMillion = monthlyThroughput > 0
    ? (trainingRevenue / monthlyThroughput) * 1e6
    : 0;

  return {
    monthlyThroughput,
    datasetCompletions,
    revenuePerMillion
  };
}

/**
 * Calculate inference token generation
 * @param queriesPerMonth - Total queries per month
 * @param model - Inference model type
 * @param reasoningLevel - Reasoning multiplier level
 * @param reasoningPct - Percentage of queries using reasoning (0-100)
 * @param inferenceRevenue - Total inference revenue per month
 * @returns Inference token metrics
 */
export function calculateInferenceTokens(
  queriesPerMonth: number,
  model: InferenceModel,
  reasoningLevel: ReasoningLevel,
  reasoningPct: number,
  inferenceRevenue: number
): InferenceTokenResults {
  const modelData = TOKEN_DATA.inference[model];
  const reasoningData = TOKEN_DATA.reasoning[reasoningLevel];

  // Standard queries (no reasoning)
  const standardQueries = queriesPerMonth * (1 - reasoningPct / 100);
  const standardTokens = standardQueries * modelData.tokensPerQuery;

  // Reasoning queries
  const reasoningQueries = queriesPerMonth * (reasoningPct / 100);
  const reasoningTokens = reasoningQueries * modelData.tokensPerQuery * reasoningData.multiplier;

  const totalTokens = standardTokens + reasoningTokens;

  // Average tokens per query (weighted)
  const avgTokensPerQuery = queriesPerMonth > 0
    ? totalTokens / queriesPerMonth
    : 0;

  // Revenue per 1M tokens
  const revenuePerMillion = totalTokens > 0
    ? (inferenceRevenue / totalTokens) * 1e6
    : 0;

  return {
    standardTokens,
    reasoningTokens,
    totalTokens,
    avgTokensPerQuery,
    revenuePerMillion
  };
}

/**
 * Format token count to human-readable string
 */
export function formatTokens(tokens: number): string {
  if (tokens >= 1e12) {
    return `${(tokens / 1e12).toFixed(1)}T`;
  } else if (tokens >= 1e9) {
    return `${(tokens / 1e9).toFixed(1)}B`;
  } else if (tokens >= 1e6) {
    return `${(tokens / 1e6).toFixed(1)}M`;
  } else if (tokens >= 1e3) {
    return `${(tokens / 1e3).toFixed(1)}K`;
  }
  return tokens.toFixed(0);
}
