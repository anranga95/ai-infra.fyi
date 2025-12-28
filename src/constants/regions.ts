/**
 * Regional electricity costs and carbon intensity data
 *
 * Power costs: Regional utility data (2024-2025)
 * Carbon intensity: Grid operator reports (2024)
 */

export const REGIONAL_POWER: Record<string, number> = {
  'Weighted Average': 0.080,
  'Texas (ERCOT)': 0.035,
  'Iowa': 0.087,
  'Virginia (NoVA)': 0.093,
  'Oregon': 0.106,
  'Washington': 0.040,
  'Illinois': 0.060,
  'Georgia': 0.080,
  'California': 0.176
};

export const CARBON_INTENSITY: Record<string, number> = {
  'Weighted Average': 384,
  'Texas (ERCOT)': 200,
  'Iowa': 240,
  'Virginia (NoVA)': 315,
  'Oregon': 150,
  'Washington': 150,
  'Illinois': 240,
  'Georgia': 300,
  'California': 80
};

export const REGIONS = Object.keys(REGIONAL_POWER);
