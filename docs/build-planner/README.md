# Build Planner Documentation

## Overview

The Build Planner is the flagship tool of Nipperlug, providing character optimization for Cabal Online. It integrates 16+ game systems into a unified interface where players can experiment with different configurations and see real-time stat calculations and damage output.

## Current State

**Status**: Fully implemented and production-ready

### Implemented Systems
1. **Character System** - Base stats and class selection
2. **Equipment System** - Weapons, armor, accessories (25+ slots)
3. **Pet System** - 30 pet slots across 3 categories
4. **Stellar Link System** - 40 nodes across 5 constellations
5. **Honor Medal System** - 5 ranks with progression
6. **Costumes System** - Cosmetic items with stat bonuses
7. **Gold Merit System** - Point allocation for stats
8. **Platinum Merit System** - Premium point allocation
9. **Force Wing System** - Wing-based enhancements
10. **Essence Runes System** - 55 rune slots with levels
11. **Karma Runes System** - 55 alternative rune slots
12. **Overlord Mastery System** - High-level progression
13. **Achievement System** - Achievement-based stat bonuses
14. **Collection System** - Collection completion bonuses
15. **Buffs and Potions** - Temporary stat enhancements
16. **Mythical Level System** - Myth level progression

### Key Features
- **Real-time Stat Calculation** - All systems contribute to unified stat display
- **Combat Power (CP)** - Overall character strength indicator
- **Damage Calculations** - Sword and magic damage with critical hits
- **Build Sharing** - Export/import via JSON files or compressed URLs
- **Stat Registry System** - Centralized stat aggregation from all systems
- **Modular Architecture** - Each system is independent and maintainable

## Architecture

### State Management Flow
```
Individual System Stores → Stat Registry Store → Build Planner Store → UI Components
```

Each system has its own Zustand store that calculates stats and registers them with the central Stat Registry. The Build Planner Store consumes aggregated stats to calculate combat metrics.

### Build Sharing System
Universal serialization system using a registry pattern. Systems register their extract/restore functions, enabling automatic inclusion in export/import functionality. Supports:
- JSON file export/import
- URL-based sharing with LZ-String compression
- localStorage persistence
- Version tracking for compatibility

### System Integration Pattern
All systems follow a consistent pattern:
- Dedicated Zustand store with subscribeWithSelector middleware
- `calculateTotalStats()` method returning stat contributions
- `restoreFromImport()` method for build sharing
- Automatic stat registry integration
- Consistent UI patterns

## Development Guidelines

### Adding a New System
1. Create system directory in `/src/tools/build-planner/systems/`
2. Implement Zustand store with required methods
3. Create UI components following existing patterns
4. Register with Stat Registry
5. Register with Build Sharing system
6. Add to Build Planner page routing
7. Test stat calculations and sharing

### Modifying Existing Systems
1. Update system store and recalculate stats
2. Ensure stat registry integration still works
3. Test build sharing compatibility
4. Update documentation if needed
5. Verify no breaking changes to other systems

### Testing Checklist
- [ ] Stats calculate correctly
- [ ] Stats register with Stat Registry
- [ ] Build export includes system data
- [ ] Build import restores system state
- [ ] No console errors or warnings
- [ ] UI responsive on mobile
- [ ] Performance acceptable with full build

## Technical Considerations

### Performance
- Each system calculates stats independently
- Stat Registry aggregates efficiently
- Subscriptions prevent unnecessary recalculations
- Large datasets use virtualization
- Build sharing uses compression

### Data Size
- Full build: ~250-350KB uncompressed JSON
- Compressed: ~25-35KB (90% reduction)
- URL sharing: Limited by browser URL length
- File sharing: No size restrictions

### Compatibility
- Version tracking in exported builds
- Graceful handling of missing data
- Forward/backward compatibility considerations
- Optional fields for new features

## Future Enhancements

### Planned Features
- Meta builds (pre-configured optimal builds)
- Build comparison tool
- Stat optimization suggestions
- Build templates by class
- Community build sharing platform

### Technical Improvements
- Enhanced compression for URL sharing
- Database integration for saved builds
- Real-time collaboration features
- Advanced stat analysis and recommendations
- Performance optimizations for mobile

## Common Issues

### Stats Not Updating
- Check if system is registered with Stat Registry
- Verify `calculateTotalStats()` is called after changes
- Ensure subscriptions are set up correctly

### Build Sharing Not Working
- Verify system has `restoreFromImport()` method
- Check if system is registered with serializer
- Ensure data structure is serializable

### Performance Issues
- Review calculation complexity
- Check for unnecessary re-renders
- Optimize large data structures
- Use memoization where appropriate

## Contributing

Contributions to the Build Planner are welcome! Please follow the guides in this directory and the main [CONTRIBUTING.md](../CONTRIBUTING.md) document.

### Areas for Contribution
- New system implementations
- Bug fixes and optimizations
- UI/UX improvements
- Documentation enhancements
- Test coverage
- Performance improvements

## Support

For questions or issues related to the Build Planner:
- Review the documentation in this directory
- Check existing GitHub issues
- Create a new issue with detailed information
- Reference specific systems or features in your report