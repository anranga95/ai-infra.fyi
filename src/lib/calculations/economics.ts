import type { Economics, Revenue, CapexModel } from '../../types';
import {
  CAPEX_PER_GW,
  WACC,
  COMPUTE_AMORTIZATION_YEARS,
  INFRASTRUCTURE_AMORTIZATION_YEARS,
  COMPUTE_CAPEX_PCT,
  INFRASTRUCTURE_CAPEX_PCT,
  OPERATIONS_PCT
} from '../../constants/economics';

interface EconomicsParams {
  facilityMW: number;
  h100Hours: number;
  capexModel: CapexModel;
  powerCost: number;
  months: number;
}

interface RevenueParams {
  trainingRate: number;
  inferenceRate: number;
}

/**
 * Calculate total cost of ownership (TCO) for datacenter
 *
 * TCO includes:
 * - CapEx amortization (70% compute @ 4yr, 30% infra @ 15yr)
 * - Power costs (facility MW × hours × rate)
 * - Operations (20% of power cost)
 *
 * @param params - Economics parameters
 * @returns Complete economics breakdown
 */
export function calculateEconomics(params: EconomicsParams): Economics {
  const { facilityMW, capexModel, powerCost, months } = params;

  // Step 1: Calculate total CapEx
  const capexPerGW = CAPEX_PER_GW[capexModel];
  const totalCapex = (facilityMW / 1000) * capexPerGW;

  // Step 2: Split CapEx (70% compute, 30% infrastructure)
  const computeCapex = totalCapex * COMPUTE_CAPEX_PCT;
  const infraCapex = totalCapex * INFRASTRUCTURE_CAPEX_PCT;

  // Step 3: Calculate monthly amortization payments
  const computeMonths = COMPUTE_AMORTIZATION_YEARS * 12;
  const infraMonths = INFRASTRUCTURE_AMORTIZATION_YEARS * 12;

  // Standard amortization formula: P * (r / (1 - (1 + r)^-n))
  const monthlyRate = WACC / 12;
  const computeAmort = computeCapex * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -computeMonths)));
  const infraAmort = infraCapex * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -infraMonths)));
  const monthlyAmort = computeAmort + infraAmort;

  // Step 4: Calculate operating costs
  const monthlyPower = facilityMW * 730 * powerCost * 1000; // 730 hours/month
  const monthlyOps = monthlyPower * OPERATIONS_PCT;

  // Step 5: Calculate total monthly TCO
  const monthlyTCO = monthlyAmort + monthlyPower + monthlyOps;

  // Step 6: Calculate total TCO over time period
  const totalTCO = monthlyTCO * months;

  return {
    totalCapex,
    monthlyAmort,
    monthlyPower,
    monthlyOps,
    monthlyTCO,
    totalTCO,
    breakdown: {
      'CapEx Amortization': monthlyAmort,
      'Power': monthlyPower,
      'Operations': monthlyOps
    }
  };
}

/**
 * Calculate revenue potential from training and inference
 *
 * @param trainingHours - Total training hours over time period
 * @param inferenceQueries - Total inference queries over time period
 * @param params - Revenue parameters (rates)
 * @returns Revenue breakdown
 */
export function calculateRevenue(
  trainingHours: number,
  inferenceQueries: number,
  params: RevenueParams
): Revenue {
  const { trainingRate, inferenceRate } = params;

  // Training revenue: hours × $/hour
  const trainingRevenue = trainingHours * trainingRate;

  // Inference revenue: queries × $/1M tokens
  const inferenceRevenue = (inferenceQueries / 1e6) * inferenceRate;

  return {
    training: trainingRevenue,
    inference: inferenceRevenue,
    total: trainingRevenue + inferenceRevenue
  };
}
