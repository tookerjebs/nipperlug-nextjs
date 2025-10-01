import React from 'react';
import { Achievement } from './types/achievement';
import { AchievementCard } from './AchievementCard';

interface AchievementContentProps {
  achievements: Achievement[];
  onAchievementToggle: (achievementId: string, milestone?: number) => void;
}

export const AchievementContent: React.FC<AchievementContentProps> = ({
  achievements,
  onAchievementToggle
}) => {
  if (achievements.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-foreground/60">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-lg font-medium mb-2">No Achievements</h3>
          <p className="text-sm">No achievements found in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden dark-scrollbar">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onToggle={onAchievementToggle}
          />
        ))}
      </div>
    </div>
  );
};