/**
 * Central export for all calculation functions
 * These are pure functions with no side effects, making them easy to test and audit
 */

export { calculatePhysicalCapacity } from './physical';
export { calculateTraining } from './training';
export { calculateInference } from './inference';
export { calculateEconomics, calculateRevenue } from './economics';
export { calculateEnvironmentalImpact } from './environmental';
