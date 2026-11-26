import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  getCurrentFridayNightSessionKey,
  formatHonestParticipantLabel,
  maskParticipantInitials,
  buildLingkarDoaPublicPayload,
} from '../lingkarDoa';

describe('Lingkar Doa Jumat Malam helpers & firestore.rules validation (F7)', () => {
  it('generates consistent YYYY-Www session key in WIB timezone', () => {
    const sampleDate = new Date('2026-11-26T14:00:00.000Z'); // Kamis 21:00 WIB
    const key = getCurrentFridayNightSessionKey(sampleDate);
    expect(key).toMatch(/^\d{4}-W\d{2}$/);
    expect(key).toBe('2026-W48');
  });

  it('formats honest participant label for 0 and positive numbers without fake multipliers', () => {
    expect(formatHonestParticipantLabel(0)).toBe(
      'Mulai lingkaran doa malam ini — Anda bisa menjadi pembaca pertama.'
    );
    expect(formatHonestParticipantLabel(-3)).toBe(
      'Mulai lingkaran doa malam ini — Anda bisa menjadi pembaca pertama.'
    );
    expect(formatHonestParticipantLabel(1)).toBe(
      '1 jamaah telah ikut melantunkan doa pada sesi pekan ini.'
    );
    expect(formatHonestParticipantLabel(128)).toBe(
      '128 jamaah telah ikut melantunkan doa pada sesi pekan ini.'
    );
  });

  it('masks public participant names into polite initials and strips free-text notes from public payload (F7)', () => {
    expect(maskParticipantInitials('')).toBe('Hamba Allah');
    expect(maskParticipantInitials('Hamba Allah')).toBe('Hamba Allah');
    expect(maskParticipantInitials('Ahmad Saleh')).toBe('Hamba Allah (A.S.)');

    const payload = buildLingkarDoaPublicPayload({
      weekKey: '2026-W48',
      displayName: 'Ahmad Saleh',
      createdAt: 'NOW',
    });
    expect(Object.keys(payload).sort()).toEqual(
      ['createdAt', 'displayName', 'weekKey'].sort()
    );
    expect('note' in payload).toBe(false);
  });

  it('declares strict lingkar_doa_entries rules in firestore.rules forbidding unmoderated free-text note writes (F7)', () => {
    const rulesPath = resolve(process.cwd(), 'firestore.rules');
    const rulesText = readFileSync(rulesPath, 'utf-8');

    expect(rulesText).toContain('match /lingkar_doa_entries/{entryId}');
    expect(rulesText).toContain(
      "incoming().keys().hasAll(['weekKey', 'displayName', 'createdAt'])"
    );
    expect(rulesText).toContain(
      "incoming().keys().hasOnly(['weekKey', 'displayName', 'createdAt'])"
    );
    expect(rulesText).not.toContain(
      "incoming().keys().hasOnly(['weekKey', 'displayName', 'note', 'createdAt'])"
    );
    expect(rulesText).toContain('incoming().createdAt == request.time');

    // Ensure existing core collection rules remain intact
    expect(rulesText).toContain('match /sites/{siteId}');
    expect(rulesText).toContain('match /settings/{settingId}');
    expect(rulesText).toContain('match /donations/{donationId}');
    expect(rulesText).toContain('match /stories/{storyId}');
  });
});

