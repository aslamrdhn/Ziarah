import React from 'react';
import { SITES } from '../data/sites';
import { useSiteCopy } from '../lib/siteCopy';

export const TOTAL_SITES_COUNT = SITES.length;
export const TOTAL_PROVINCES_COUNT = new Set(SITES.map((s) => s.province)).size;

export const HeroSection: React.FC = () => {
  const { copy } = useSiteCopy();
  const totalSites = SITES.length;
  const totalProvinces = new Set(SITES.map((s) => s.province)).size;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-emerald-900 mb-3">
        <span>{copy.heroBadge}</span>
        <span>·</span>
        <span>
          {totalSites} Makam di {totalProvinces} Provinsi
        </span>
      </div>
      <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-2">
        {copy.heroTitle}
      </h1>
      <p className="text-xs sm:text-base text-stone-600 max-w-3xl leading-relaxed">
        {copy.heroSubtitle}
      </p>
    </section>
  );
};

export default HeroSection;
