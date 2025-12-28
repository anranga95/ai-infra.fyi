import type { EnvironmentalImpact } from '../../types';
import { CARBON_INTENSITY } from '../../constants/regions';

/**
 * Calculate environmental impact (carbon emissions and water usage)
 *
 * Carbon: Based on regional grid intensity (gCO2/kWh)
 * Water: Based on modern closed-loop liquid cooling (1.5 L/kWh)
 *
 * @param facilityGW - Facility power in GW
 * @param region - Regional identifier for carbon intensity
 * @returns Environmental impact metrics
 */
export function calculateEnvironmentalImpact(
  facilityGW: number,
  region: string
): EnvironmentalImpact {
  // Get carbon intensity for region
  const carbonIntensity = CARBON_INTENSITY[region];

  // Calculate monthly power consumption (730 hours/month)
  const monthlyPowerMWh = facilityGW * 1000 * 730;

  // Calculate CO2 emissions (tonnes/month)
  // MWh × 1000 kWh/MWh × gCO2/kWh / 1,000,000 = tonnes CO2
  const monthlyCO2Tonnes = (monthlyPowerMWh * 1000 * carbonIntensity) / 1e6;

  // Calculate water usage
  // Modern closed-loop liquid cooling: 1.5 L/kWh
  const monthlyWaterLiters = monthlyPowerMWh * 1000 * 1.5;
  const monthlyWaterGallons = monthlyWaterLiters * 0.264172; // Convert to gallons

  return {
    carbonIntensity,
    monthlyCO2Tonnes,
    monthlyWaterGallons
  };
}
