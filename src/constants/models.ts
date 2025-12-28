import type { TrainingModel } from '../types';

/**
 * Training model specifications
 * FLOPs: From company announcements and EpochAI database
 * MFU: Model FLOPs Utilization from published benchmarks
 */
export const TRAINING_MODELS: Record<string, TrainingModel> = {
  'GPT-4.5': { flops: 6.4e25, mfu: 0.35 },
  'GPT-4': { flops: 2.1e25, mfu: 0.35 },
  'GPT-4o': { flops: 3.8e25, mfu: 0.35 },
  'Claude Sonnet 4': { flops: 5.0e25, mfu: 0.35 },
  'Claude 3.5 Sonnet': { flops: 3.6e25, mfu: 0.35 },
  'Llama 3.1 405B': { flops: 3.8e25, mfu: 0.38 },
  'Gemini 2.0 Pro': { flops: 8.0e25, mfu: 0.35 },
  'DeepSeek-V3': { flops: 2.8e24, mfu: 0.35 },
  'Llama 3.1 70B': { flops: 7.9e24, mfu: 0.38 },
};

/**
 * Inference model classes for capacity estimation
 */
export const INFERENCE_MODELS = [
  { name: 'GPT-4 class (280B)', params: 280e9, tokensPerQuery: 550 },
  { name: 'Llama 70B class', params: 70e9, tokensPerQuery: 400 },
  { name: 'Llama 8B class', params: 8e9, tokensPerQuery: 280 }
];

/**
 * Reasoning overhead multipliers for different scenarios
 * Low: Simple multi-step (3× tokens)
 * Medium: Moderate reasoning (10× tokens)
 * High: Complex problems (100× tokens)
 * Extreme: Research-grade tasks (1000× tokens)
 */
export const REASONING_MULTIPLIERS = {
  'Low': 3,
  'Medium': 10,
  'High': 100,
  'Extreme': 1000
} as const;
