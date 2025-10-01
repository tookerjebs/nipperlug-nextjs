export interface ClassInfo {
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface TierData {
  tier: string;
  label: string;
  classes: ClassInfo[];
}

export interface TierListData {
  id: string;
  title: string;
  description: string;
  tiers: TierData[];
}

export type TierListType = 'single-target' | 'aoe' | 'nation-war' | 'bm3-only' | 'bm2-only';