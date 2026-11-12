import React from 'react';
import { SITES } from '../data/sites';
import { InfaqDigital, DEFAULT_INFAQ_PROGRAMS, type InfaqProgramItem } from './InfaqDigital';

export { DEFAULT_INFAQ_PROGRAMS, type InfaqProgramItem };
export const TOTAL_SITES_COUNT = SITES.length;
export const TOTAL_PROVINCES_COUNT = new Set(SITES.map((s) => s.province)).size;
export const OPERATIONAL_INFAQ_TERM = 'Infaq Operasional & Pemeliharaan Digital';

export const ProgramInfaq: React.FC = () => {
  return <InfaqDigital />;
};

export default ProgramInfaq;
