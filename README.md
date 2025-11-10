# Nipperlug - Cabal Online Guide & Optimizer

A web application providing tools, guides, and calculators for Cabal Online players.

## Disclaimer

Cabal Online and all related game assets, data, and intellectual property are owned by ESTsoft Corp. This is an unofficial fan-made tool. We are not affiliated with or endorsed by ESTsoft.

This project's code is open source under MIT License. Game-related content (names, stats, images) remains property of ESTsoft. Contributors must respect ESTsoft's intellectual property rights.

## Overview

### Core Tools
- **Build Planner** - Character optimization with 16+ game systems including equipment, pets, runes, and achievements
- **Damage Calculator** - Damage analysis with monster selection and stat optimization
- **Collection Tracker** - Track collection progress with stat bonus optimization
- **Monster Database** - Searchable database with 4000+ monsters and detailed stats

### Calculators
- **EXP Calculator** - Character experience planning and leveling projections
- **Force Wing Calculator** - Force Wing progression planning with stat bonuses
- **OXP Calculator** - Overlord experience calculations
- **Chloe Craft Profit Calculator** - Crafting profitability analysis with batch calculations
- **Devil's Shop Calculator** - Devil shop item profitability analysis
- **Chloe Amity Calculator** - Calculate optimal path for Chloe Craft Amity progression
- **Extreme Upgrade Calculator** - Equipment upgrade planning with success rates

### Resources
- **Tier Lists** - Class tier lists
- **Stats Wiki** - Guide to stats and their effects
- **BM3 Target Damage Boost** - Battle Mode 3 damage boost reference tables
- **Penetration Effectiveness Table** - Defense vs penetration analysis
- **Myth Level Data Viewer** - Myth mastery data, node costs, and success probabilities
- **Event Mobs Location** - Event mob spawn locations

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/tookerjebs/nipperlug-nextjs.git

# Navigate to project directory
cd nipperlug-nextjs

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

## To-Do List

### Build Planner
- Refine damage calculation formulas
- Add missing item icons and implement sprite sheets
- Verify and correct stat point scaling for all classes
- Complete class-specific passive skill implementations
- Extend Force Wing levels to 500
- Update achievement data for recent episodes
- Update collection system data for recent episodes
- Expand available potions and buffs
- Implement Battle Configuration system

### Calculators
- Add missing Chloe Craft Recipes
- Improve Chloe craft performance
- Implement market API integration for real-time prices

### Resources
- Improve Stats Wiki content accuracy
- Validate Penetration Effectiveness formulas

### Damage Calculator
- Implement same formula improvements as Build Planner

### General Improvements
- Enhance search functionality
- Address performance bottlenecks

## Credits

Built with data and insights from the Cabal Online community. Special thanks to all contributors and data sources.
