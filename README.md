# Nipperlug - Cabal Online Guide & Optimizer

A comprehensive web application providing tools, guides, and calculators for Cabal Online players.

## Overview

Nipperlug is a  Next.js application that serves as a resource hub for Cabal Online.

### Core Tools
- **Build Planner** - Character optimization with 16+ game systems including equipment, pets, runes, achievements, and more
- **Damage Calculator** - Comprehensive damage analysis with monster selection and stat optimization
- **Collection Tracker** - Track collection progress and optimize stat bonuses
- **Monster Database** - Searchable database with 4000+ monsters and detailed stats

### Calculators
- **EXP Calculator** 
- **Force Wing Calculator** 
- **OXP Calculator**
- **Chloe Craft Profit Calculator** - Crafting profitability analysis
- **Devil's Shop Calculator** - Devil shop profitability analysis
- **Chloe Amity Calculator** - Calculate optimal path for Chloe Craft Amity
- **Extreme Upgrade Calculator** - Equipment upgrade planning with success rates

### Resources
- **Tier Lists** - class tier list
- **Stats Wiki** - game stats reference guide
- **BM3 Target Damage Boost** - Battle Mode 3 damage boost table
- **Penetration Effectiveness Table** - Defense vs penetration analysis (accuracy of formulas not confirmed)
- **Myth Level Data Viewer** - Myth mastery data and node costs/chances

## Technology Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.3
- **State Management**: Zustand 5.0.5
- **Build Sharing**: github gists for storage

## Getting Started

### Prerequisites
- Node.js v18 or later
- npm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/tookerjebs/nextjs-nipperlug.git

# Navigate to project directory
cd nextjs-nipperlug

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```
## Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details on how to get started.

## License

This project is open source and available under the MIT License.

## Credits

Built with data and insights from the Cabal Online community. Special thanks to all contributors and data sources documented in the [Credits](src/app/credits/page.tsx) page.
