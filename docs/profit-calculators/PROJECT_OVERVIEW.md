# Profit Calculators Overview

## Purpose
Calculate profit/loss for in-game crafting and upgrade systems using real-time market prices.

## Calculators

### Chloe Craft Calculator
**Location**: `/src/app/chloe-craft-profit-calculator/page.tsx`

**Function**: Calculate profit from crafting items via Chloe NPC.

**Key Features**:
- Select craft type (Chaos, Force, Upgrade cores)
- Input material costs and result prices
- Calculate profit per craft and per stack
- Success rate consideration
- Global price store integration

**Data Flow**:
1. User selects craft type
2. Inputs material prices (from global price store)
3. Inputs result item price
4. Calculator computes: `profit = (result_price × success_rate) - material_costs`

### Devil Shop Calculator
**Location**: `/src/app/devils-shop-calculator/page.tsx`

**Function**: Calculate profit from Devil Shop exchanges.

**Key Features**:
- Select exchange type (cores, materials, items)
- Input cost of required items
- Input value of received items
- Calculate net profit/loss
- Bulk calculation support

**Data Flow**:
1. User selects exchange option
2. Inputs cost of items to trade
3. Inputs market value of received items
4. Calculator computes: `profit = received_value - trade_cost`

## Shared Architecture

### Global Price Store
**Location**: `/src/stores/priceStore.ts`

**Purpose**: Centralized price management across all calculators.

**Features**:
- Persistent storage (localStorage)
- Import/export functionality
- Shared across all profit calculators
- Real-time price updates

### Common Components
- Price input fields with store integration
- Profit display with color coding (green/red)
- Export/import price data
- Responsive layout

## Technical Stack
- **Framework**: Next.js 15 + React 19
- **State**: Zustand (price store)
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript

## Contributing

### Adding New Profit Calculator
1. Create new page in `/src/app/[calculator-name]/page.tsx`
2. Import and use `usePriceStore` for price management
3. Follow existing calculator structure
4. Add route to navigation
5. Update sitemap

### Updating Calculations
1. Locate calculator file
2. Modify profit calculation logic
3. Test with various inputs
4. Update success rates if needed

### Adding New Items/Crafts
1. Update relevant data in `/src/lib/game-data/`
2. Add to calculator dropdown options
3. Test calculations

## File Structure
```
src/
├── app/
│   ├── chloe-craft-profit-calculator/
│   │   └── page.tsx
│   └── devils-shop-calculator/
│       └── page.tsx
├── stores/
│   └── priceStore.ts
└── lib/
    └── game-data/
        └── [craft/exchange data]
```

## Key Formulas

**Chloe Craft**:
```
profit_per_craft = (result_price × success_rate) - Σ(material_costs)
profit_per_stack = profit_per_craft × stack_size
```

**Devil Shop**:
```
net_profit = Σ(received_item_values) - Σ(traded_item_costs)
```

## Testing Checklist
- [ ] Price store persistence works
- [ ] Calculations are accurate
- [ ] Import/export functions correctly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Build succeeds