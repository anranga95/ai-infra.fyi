import type { TrainingResults } from '../../types';
import { TRAINING_MODELS } from '../../constants/models';

/**
 * Calculate training capacity across different model classes
 *
 * This calculation is FLOPs-based and accounts for:
 * - Model FLOPs Utilization (MFU) - typically 35-38%
 * - R&D overhead multiplier - accounts for failed runs, experiments, etc.
 * - GPU performance scaling - scales capacity by GPU TFLOPs relative to H100
 *
 * @param h100Hours - Monthly H100-hours available
 * @param trainingPct - Percentage allocated to training (0-100)
 * @param mfu - Model FLOPs Utilization (0-1)
 * @param rdMultiplier - R&D overhead multiplier (typically 11.25×)
 * @param gpuTFLOPs - GPU TFLOPs (for scaling relative to H100's 989 TFLOPs)
 * @returns Training results for each model class
 */
export function calculateTraining(
  h100Hours: number,
  trainingPct: number,
  _mfu: number, // Reserved for future use - currently using model-specific MFU
  rdMultiplier: number,
  gpuTFLOPs: number
): TrainingResults {
  // Calculate training hours allocation
  const trainingHours = h100Hours * (trainingPct / 100);

  // Scale by GPU performance relative to H100 (989 TFLOPs)
  const gpuFlopsPerSec = gpuTFLOPs * 1e12;

  const results: TrainingResults = {};

  for (const [name, modelData] of Object.entries(TRAINING_MODELS)) {
    // Calculate hours required for one training run
    const hoursRequired = modelData.flops / (gpuFlopsPerSec * 3600 * modelData.mfu);

    // Calculate models per month
    const modelsPerMonth = trainingHours / hoursRequired;

    results[name] = {
      parallel: modelsPerMonth, // If running continuously in parallel
      realistic: modelsPerMonth / rdMultiplier, // Accounting for R&D overhead
      mfu: modelData.mfu
    };
  }

  return results;
}
