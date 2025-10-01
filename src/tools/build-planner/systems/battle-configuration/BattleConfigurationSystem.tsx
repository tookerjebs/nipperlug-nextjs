import React from 'react';
import AttackSkillSelector from './components/AttackSkillSelector';
import BattleModeDisplay from './components/BattleModeDisplay';
import { ActionButtons } from '../../components/systems/ActionButtons';
import { useBattleConfigurationStore } from './stores/battleConfigurationStore';

const BattleConfigurationSystem: React.FC = () => {
  const { resetSystem } = useBattleConfigurationStore();

  const handleReset = () => {
    resetSystem();
  };

  const handleQuickFill = () => {
    // For now, quick fill does nothing since we only have simple selections
    // Could be enhanced later to auto-select optimal skills
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-end">
        <ActionButtons
          onReset={handleReset}
          onQuickFill={handleQuickFill}
        />
      </div>

      {/* Battle Mode Display */}
      <div className="game-panel bg-component-card p-4 rounded">
        <BattleModeDisplay />
      </div>

      {/* Attack Skills Selector */}
      <div className="game-panel bg-component-card p-4 rounded">
        <AttackSkillSelector />
      </div>
    </div>
  );
};

export default BattleConfigurationSystem;