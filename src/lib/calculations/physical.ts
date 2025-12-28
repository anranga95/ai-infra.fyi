import type { PhysicalCapacity } from '../../types';

interface PhysicalParams {
  facilityMW: number;
  pue: number;
  itOverhead: number;
  gpuTDP: number;
}

/**
 * Calculate physical capacity of datacenter
 *
 * @param facilityMW - Total facility power in MW
 * @param pue - Power Usage Effectiveness
 * @param itOverhead - IT overhead factor (includes networking, storage, etc.)
 * @param gpuTDP - GPU thermal design power in kW
 * @returns Physical capacity metrics
 */
export function calculatePhysicalCapacity(params: PhysicalParams): PhysicalCapacity {
  const { facilityMW, pue, itOverhead, gpuTDP } = params;

  // Step 1: Calculate IT power (after PUE losses)
  const itPower = facilityMW / pue;

  // Step 2: Calculate server power (after IT overhead)
  const serverPower = itPower / itOverhead;

  // Step 3: Calculate GPU count
  const gpuCount = Math.floor((serverPower * 1000) / gpuTDP);

  // Step 4: Calculate monthly H100-hours (730 hours/month)
  const h100HoursMonth = gpuCount * 730;

  // Step 5: Calculate total FLOPs per month (using H100 baseline)
  const totalFlopsMonth = h100HoursMonth * 989e12 * 3600;

  return {
    itPower,
    serverPower,
    gpuCount,
    h100HoursMonth,
    totalFlopsMonth
  };
}
