'use client';

import { TierListData } from '../types';
import TierRow from './TierRow';

interface TierListSectionProps {
  tierListData: TierListData;
}

export default function TierListSection({ tierListData }: TierListSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">{tierListData.title}</h2>
        <p className="text-foreground/80 leading-relaxed max-w-4xl mx-auto">
          {tierListData.description}
        </p>
      </div>

      {/* Tier Rows */}
      <div className="space-y-3">
        {tierListData.tiers.map((tier) => (
          <TierRow
            key={tier.tier}
            tierData={tier}
          />
        ))}
      </div>
    </div>
  );
}