# ai-infra.fyi

AI Infrastructure Economics Calculator and Market Map

## Overview

This is a TypeScript-based React application that provides tools for analyzing AI datacenter economics using the **GW-Month framework** - a standardized unit for comparing AI infrastructure investments.

The site currently includes:
- **GW-Month Calculator**: Interactive tool for modeling datacenter economics, training capacity, and environmental impact
- **Market Map**: (Coming soon) Kumu-based network visualization of the AI infrastructure ecosystem

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
ai-infra-site/
├── src/
│   ├── pages/                  # Page components
│   │   ├── CalculatorPage.tsx  # Main calculator interface
│   │   └── MapPage.tsx         # Market map (placeholder)
│   │
│   ├── components/             # Reusable components (future)
│   │   └── calculator/
│   │
│   ├── lib/                    # Business logic
│   │   ├── calculations/       # Pure calculation functions
│   │   │   ├── physical.ts     # Physical capacity calculations
│   │   │   ├── training.ts     # Training workload calculations
│   │   │   ├── inference.ts    # Inference workload calculations
│   │   │   ├── economics.ts    # TCO and revenue calculations
│   │   │   ├── environmental.ts # Carbon and water calculations
│   │   │   └── index.ts        # Central export
│   │   │
│   │   └── utils/              # Utility functions
│   │       └── formatting.ts   # Number/currency formatting
│   │
│   ├── constants/              # Data constants
│   │   ├── gpuSpecs.ts        # GPU specifications (EpochAI data)
│   │   ├── regions.ts         # Regional power/carbon data
│   │   ├── models.ts          # Training/inference model specs
│   │   └── economics.ts       # CapEx models and rates
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts           # All type definitions
│   │
│   ├── styles/                 # CSS stylesheets
│   │   └── global.css         # Global styles with theme support
│   │
│   ├── App.tsx                # Main app with routing
│   └── main.tsx               # Application entry point
│
├── public/                     # Static assets
├── dist/                      # Production build output
└── package.json               # Dependencies and scripts
```

## Key Features

### Auditable Calculation Logic

All calculations are implemented as **pure functions** with no side effects:
- Clear input/output types
- Comprehensive JSDoc comments
- Easy to test and verify
- Transparent methodology

Example:
```typescript
// src/lib/calculations/physical.ts
export function calculatePhysicalCapacity(params: PhysicalParams): PhysicalCapacity {
  // Pure function - same inputs always produce same outputs
  // No side effects, no external dependencies
  // Easy to audit and test
}
```

### Type Safety

Full TypeScript coverage:
- All data types defined in `src/types/index.ts`
- Strict type checking enabled
- IntelliSense support throughout

### Theme Support

Dark/Light theme with CSS variables:
- Purple accent color (`#a855f7`)
- Smooth transitions
- Persistent theme preference (future)

### Two-Tier Interface

**Simple Mode** (default):
- 3 inputs: Facility Size, Training/Inference Split, GPU Type
- 9 outputs: Physical capacity, training/inference metrics, environmental impact
- Focused on key metrics

**Advanced Mode**:
- 12+ additional parameters (PUE, MFU, R&D overhead, CapEx models, etc.)
- Financial analysis (TCO, Revenue, Margin)
- Transparent methodology notes
- Detailed breakdowns

## Data Sources

All data is sourced from authoritative references:

- **GPU Specs**: EpochAI ml_hardware.csv
- **Training FLOPs**: EpochAI database + company announcements
- **Power Costs**: Regional utility data (2024-2025)
- **Carbon Intensity**: Grid operator reports (2024)
- **Spot Pricing**: Ornn Index ($2.19/H100-hour, December 2025)

## Calculation Methodology

### Physical Capacity
```
IT Power = Facility Power / PUE
Server Power = IT Power / IT Overhead
GPU Count = Server Power / GPU TDP
Monthly Capacity = GPU Count × 730 hours
```

### Training
- FLOPs-based calculation
- Accounts for Model FLOPs Utilization (MFU): 35-38%
- Includes R&D overhead multiplier (11.25× default)
- Scales by GPU performance relative to H100 (989 TFLOPs)

### Inference
- Memory-bandwidth limited (not compute limited)
- H100 bandwidth: 3.35 TB/s
- Separate standard and reasoning workloads
- Reasoning multipliers: 3× (Low) to 1000× (Extreme)

### Economics
- **CapEx Amortization**: 70% compute @ 4yr, 30% infrastructure @ 15yr
- **OpEx**: Power cost + Operations (20% of power)
- **Revenue**: Training ($/H100-hour) + Inference ($/1M tokens)

### Environmental
- **Carbon**: Regional grid intensity (80-384 gCO2/kWh)
- **Water**: Modern closed-loop cooling (1.5 L/kWh)

## Example Calculation

**1 GW H100 datacenter, 80/20 training/inference split, 12 months:**

```
Physical:
- GPUs: 1,044,277 H100s
- Capacity: 762.3M H100-hours/month

Training (with 11.25× R&D overhead):
- GPT-4.5: 4.2 models/month
- Claude Sonnet 4: 5.2 models/month

Economics:
- Monthly TCO: $610M
- Total (12mo): $7.3B
- Revenue: $18.0B
- Margin: 59%
```

## Development

### Adding New Features

1. **New calculation**: Add to `src/lib/calculations/`
2. **New constant**: Add to `src/constants/`
3. **New type**: Add to `src/types/index.ts`
4. **New component**: Add to `src/components/`

### Code Style

- Use TypeScript for all new code (.ts, .tsx)
- Follow existing naming conventions
- Add JSDoc comments to public functions
- Keep calculations as pure functions
- Update types when adding new features

## Roadmap

### Phase 1: Current (✅ Complete)
- Core calculator functionality
- Simple/Advanced mode toggle
- Physical, training, inference, economics, environmental calculations
- TypeScript project structure
- Dark/Light theme support

### Phase 2: Enhancement
- [ ] Component extraction (split CalculatorPage into smaller components)
- [ ] URL state persistence (shareable links)
- [ ] Comparison mode (side-by-side scenarios)
- [ ] Chart visualizations (Recharts)

### Phase 3: Market Map
- [ ] Embed Kumu network analysis
- [ ] Interactive filtering
- [ ] Company profiles

### Phase 4: Content
- [ ] Blog integration
- [ ] Research papers
- [ ] Case studies

## Technologies

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **React Router**: Client-side routing
- **CSS Variables**: Theming

## License

See project license file

## Contact

For questions or feedback about the calculator methodology, please refer to the research documentation in the `/project` folder.
