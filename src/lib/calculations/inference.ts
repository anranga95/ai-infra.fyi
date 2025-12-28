import type { InferenceResults, ReasoningScenario } from '../../types';
import { INFERENCE_MODELS, REASONING_MULTIPLIERS } from '../../constants/models';

interface InferenceParams {
  inferenceUtil: number;
  reasoningPct: number;
  reasoningScenario: ReasoningScenario;
}

/**
 * Calculate inference capacity for different model classes
 *
 * Inference is memory-bandwidth limited, not compute limited.
 * Uses H100's 3.35 TB/s bandwidth as baseline.
 *
 * @param h100Hours - Monthly H100-hours available
 * @param inferencePct - Percentage allocated to inference (0-100)
 * @param gpuCount - Total GPU count
 * @param params - Inference configuration parameters
 * @returns Inference capacity for standard and reasoning workloads
 */
export function calculateInference(
  _h100Hours: number, // Reserved for future use
  inferencePct: number,
  gpuCount: number,
  params: InferenceParams
): InferenceResults {
  const { inferenceUtil, reasoningPct, reasoningScenario } = params;

  const inferenceGPUs = gpuCount * (inferencePct / 100);

  // H100 memory bandwidth: 3.35 TB/s = 3.35e12 bytes/sec
  const bandwidth = 3.35e12;

  // Standard inference allocation
  const standardPct = 1 - (reasoningPct / 100);
  const standardGPUs = inferenceGPUs * standardPct;

  // Calculate queries per month for each model class
  const standardResults = INFERENCE_MODELS.map(model => {
    // Model size in bytes (FP16 = 2 bytes per parameter)
    const modelBytes = model.params * 2;

    // Tokens per second (bandwidth limited)
    const tokensPerSec = (bandwidth / modelBytes) * inferenceUtil;

    // Queries per second
    const queriesPerSec = tokensPerSec / model.tokensPerQuery;

    // Queries per month (730 hours = 2,628,000 seconds)
    const queriesPerMonth = queriesPerSec * standardGPUs * 730 * 3600;

    return {
      ...model,
      queriesPerMonth
    };
  });

  // Reasoning inference allocation
  const reasoningGPUs = inferenceGPUs * (reasoningPct / 100);
  const multiplier = REASONING_MULTIPLIERS[reasoningScenario];

  // Base on 70B model class
  const baseParams = 70e9;
  const baseTokens = 400;
  const effectiveTokens = baseTokens * multiplier;

  const modelBytes = baseParams * 2;
  const tokensPerSec = (bandwidth / modelBytes) * inferenceUtil;
  const queriesPerSec = tokensPerSec / effectiveTokens;
  const reasoningQueries = queriesPerSec * reasoningGPUs * 730 * 3600;

  return {
    standard: standardResults,
    reasoning: {
      scenario: reasoningScenario,
      multiplier,
      queriesPerMonth: reasoningQueries
    }
  };
}
