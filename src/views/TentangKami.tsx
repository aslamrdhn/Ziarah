import React from 'react';
import { SITES } from '../data/sites';
import { KebijakanKurasi } from './KebijakanKurasi';

export const TOTAL_SITES_COUNT = SITES.length;
export const TOTAL_PROVINCES_COUNT = new Set(SITES.map((s) => s.province)).size;
export const OPERATIONAL_INFAQ_TERM = 'Infaq Operasional & Pemeliharaan Digital';

export const TentangKami: React.FC = () => {
  return <KebijakanKurasi />;
};

export default TentangKami;
