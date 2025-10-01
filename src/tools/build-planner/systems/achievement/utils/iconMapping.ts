// Icon mapping for achievement categories
export const getCategoryIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    'Dungeon': '/images/other icons/achievements/dungeon_achievement_icon.png',
    'PvP': '/images/other icons/achievements/pvp_achievement_icon.png',
    'Hunting': '/images/other icons/achievements/hunting_achievement_icon.png',
    'Items': '/images/other icons/achievements/items_achievement_icon.png',
    'Mission War': '/images/other icons/achievements/mission_war_achievement_icon.png',
    'Quests': '/images/other icons/achievements/quest_achievement_icon.png',
    'Shared': '/images/other icons/achievements/shared_achievement_icon.png',
    'Normal': '/images/other icons/achievements/normal_achievement_icon.png',
    'Community': '/images/other icons/achievements/community_achievement_icon.png',
    'Crafting': '/images/other icons/achievements/crafting_achievement_icon.png'
  };

  return iconMap[category] || '/images/other icons/achievements/normal_achievement_icon.png';
};

export const getCategoryIconAlt = (category: string): string => {
  return `${category} Achievement`;
};