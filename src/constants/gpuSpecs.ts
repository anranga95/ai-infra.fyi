import type { GPUSpec } from '../types';

/**
 * GPU specifications from EpochAI ml_hardware.csv
 * All specs are validated from manufacturer datasheets
 */
export const GPU_SPECS: Record<string, GPUSpec> = {
  'H100 SXM': {
    tdp: 0.7,
    tflops: 989,
    memory: 80,
    label: 'H100 SXM (989 TFLOPS, 0.7kW, 80GB)'
  },
  'H200 SXM': {
    tdp: 0.7,
    tflops: 989,
    memory: 141,
    label: 'H200 SXM (989 TFLOPS, 0.7kW, 141GB)'
  },
  'GB200': {
    tdp: 1.2,
    tflops: 2500,
    memory: 192,
    label: 'GB200 (2500 TFLOPS, 1.2kW, 192GB)'
  },
  'GB300': {
    tdp: 1.4,
    tflops: 2500,
    memory: 288,
    label: 'GB300 (2500 TFLOPS, 1.4kW, 288GB)'
  },
  'AMD MI300X': {
    tdp: 0.75,
    tflops: 1307,
    memory: 192,
    label: 'AMD MI300X (1307 TFLOPS, 0.75kW, 192GB)'
  },
  'AMD MI350X': {
    tdp: 1.0,
    tflops: 2310,
    memory: 288,
    label: 'AMD MI350X (2310 TFLOPS, 1.0kW, 288GB)'
  },
  'Google TPU v4': {
    tdp: 0.28,
    tflops: 1484,
    memory: null,
    label: 'Google TPU v4 (1484 TFLOPS, 0.28kW)'
  },
  'Google TPU v7': {
    tdp: 0.96,
    tflops: 2307,
    memory: 192,
    label: 'Google TPU v7 (2307 TFLOPS, 0.96kW, 192GB)'
  },
  'Amazon Trainium2': {
    tdp: 0.5,
    tflops: 667,
    memory: 96,
    label: 'Amazon Trainium2 (667 TFLOPS, 0.5kW, 96GB)'
  },
};
