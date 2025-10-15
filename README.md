# Nipperlug - Cabal Online Guide & Optimizer

A web application providing tools, guides, and calculators for Cabal Online players.

## Disclaimer

Cabal Online and all related game assets, data, and intellectual property are owned by ESTsoft Corp. This is an unofficial fan-made tool. We are not affiliated with or endorsed by ESTsoft.

This project's code is open source under MIT License. Game-related content (names, stats, images) remains property of ESTsoft. Contributors must respect ESTsoft's intellectual property rights.

## Overview

Nipperlug is a  Next.js application that offers helpful tools like calculators and planners for Cabal Online.

### Core Tools
- **Build Planner** - Character optimization with 16+ game systems including equipment, pets, runes, achievements, and more
- **Damage Calculator** - damage analysis with monster selection and stat optimization
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
- **Stats Wiki** - wiki styled guide to stats and their effects
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

### Installation

```bash
# Clone the repository
git clone https://github.com/tookerjebs/nipperlug-nextjs.git

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

## License

This project is open source and available under the MIT License.

## To-Do List (of known issues)

### Build Planner
- Refine damage calculation formulas
- Add missing item icons and images
- Optimize image loading (implement spritesheets or similar performance improvements)
- Verify and correct stat point scaling for all classes
- Complete the class-specific passive skill implementations
- Extend Force Wing levels to 500
- Update achievement data for recent episodes
- Update collection system data for recent episodes
- Complete Platinum Merit system implementation
- Expand available potions and buffs
- Consider adding Battle Configuration system

### Calculators
- Verify Force Wing EXP calculator data (EXP requirements seem high)
- add missing Chloe Craft Recipes
- improve Chloe craft performance

### Resources
- Improve Stats Wiki content accuracy and clarity
- Validate Penetration Effectiveness formulas (defense reduction and penetration effects)

### Damage Calculator
- needs the same formula improvements as Build Planner

### General Improvements
- Enhance search functionality
- Address performance bottlenecks and code inefficiencies

## Credits

Built with data and insights from the Cabal Online community. Special thanks to all contributors and data sources.
