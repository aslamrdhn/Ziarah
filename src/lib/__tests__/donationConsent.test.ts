import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { submitDonationWithPrivateProof } from '../transferProof';

describe('Donation Consent, Bukan Wakaf Compliance & SaveData Guard Audit', () => {
  const infaqDigitalPath = path.resolve(process.cwd(), 'src/views/InfaqDigital.tsx');
  const transactionModalPath = path.resolve(process.cwd(), 'src/components/TransactionModal.tsx');
  const rubrikKisahPath = path.resolve(process.cwd(), 'src/views/RubrikKisah.tsx');
  const uploadFieldPath = path.resolve(process.cwd(), 'src/components/TransferProofUploadField.tsx');
  const firestoreRulesPath = path.resolve(process.cwd(), 'firestore.rules');
  const siteContextPath = path.resolve(process.cwd(), 'src/context/SiteContext.tsx');
  const articlesPath = path.resolve(process.cwd(), 'src/data/articles.ts');

  it('ensures initial consent state (agreedToAkad) is false across InfaqDigital, TransactionModal, and RubrikKisah and resets to false', () => {
    const infaqSrc = fs.readFileSync(infaqDigitalPath, 'utf-8');
    const modalSrc = fs.readFileSync(transactionModalPath, 'utf-8');
    const rubrikSrc = fs.readFileSync(rubrikKisahPath, 'utf-8');

    expect(infaqSrc).toContain('useState<boolean>(false)');
    expect(infaqSrc).not.toMatch(/agreedToAkad,\s*setAgreedToAkad\]\s*=\s*useState(?:<boolean>)?\(true\)/);
    expect(infaqSrc).toContain('setAgreedToAkad(false)');

    expect(modalSrc).toMatch(/agreedToAkad,\s*setAgreedToAkad\]\s*=\s*useState(?:<boolean>)?\(false\)/);
    expect(modalSrc).not.toContain('setAgreedToAkad(true)');

    expect(rubrikSrc).toMatch(/agreedToAkad,\s*setAgreedToAkad\]\s*=\s*useState(?:<boolean>)?\(false\)/);
    expect(rubrikSrc).not.toContain('setAgreedToAkad(true)');
  });

  it('blocks donation submission when agreedToAkad / consentAkad is false and requires consent proof fields in Firestore & rules', async () => {
    const fakeReceipt = {
      dataUrl: 'data:image/jpeg;base64,' + 'A'.repeat(600),
      width: 400,
      height: 600,
      fileName: 'bukti.jpg',
      sizeKb: 15,
      referenceCode: 'ZN-TEST01',
    };

    await expect(
      submitDonationWithPrivateProof({
        programId: 'riset-web',
        programTitle: 'Infaq Operasional & Pemeliharaan Digital',
        siteId: 'web-riset',
        siteName: 'Infaq Operasional',
        amount: 25000,
        donorName: 'Hamba Allah',
        paymentMethod: 'QRIS',
        senderAccount: 'Hamba Allah',
        receipt: fakeReceipt,
        doaHajat: 'Semoga berkah',
        agreedToAkad: false,
      })
    ).rejects.toThrow(/Mohon centang persetujuan akad Infaq Operasional/i);

    await expect(
      submitDonationWithPrivateProof({
        programId: 'riset-web',
        programTitle: 'Infaq Operasional & Pemeliharaan Digital',
        siteId: 'web-riset',
        siteName: 'Infaq Operasional',
        amount: 25000,
        donorName: 'Hamba Allah',
        paymentMethod: 'QRIS',
        senderAccount: 'Hamba Allah',
        receipt: fakeReceipt,
        doaHajat: 'Semoga berkah',
        consentAkad: false,
      })
    ).rejects.toThrow(/Mohon centang persetujuan akad Infaq Operasional/i);

    const rulesSrc = fs.readFileSync(firestoreRulesPath, 'utf-8');
    expect(rulesSrc).toContain("'consentAkad'");
    expect(rulesSrc).toContain("'consentVersion'");
    expect(rulesSrc).toContain("'consentAt'");
    expect(rulesSrc).toContain("data.consentAkad == true &&");
    expect(rulesSrc).not.toContain("!('consentAkad' in data)");

    const infaqSrc = fs.readFileSync(infaqDigitalPath, 'utf-8');
    expect(infaqSrc).toContain("consentAkad: true");
    expect(infaqSrc).toContain("consentVersion: '2026-11-23'");
    expect(infaqSrc).toContain("consentAt: new Date().toISOString()");
    expect(infaqSrc).toContain("recordSubmissionCooldown('donation')");
  });

  it('verifies Bukan Wakaf (UU No. 41 Tahun 2004) & UU PDP clause in TransferProofUploadField and non-contradictory local Munajat description in InfaqDigital', () => {
    const uploadFieldSrc = fs.readFileSync(uploadFieldPath, 'utf-8');
    expect(uploadFieldSrc).toContain(
      'bukan penghimpunan dana pokok wakaf (UU No. 41 Tahun 2004)'
    );
    expect(uploadFieldSrc).toContain('UU Perlindungan Data Pribadi (UU PDP)');

    const infaqSrc = fs.readFileSync(infaqDigitalPath, 'utf-8');
    expect(infaqSrc).toContain(
      'Catat doa atau hajat keluarga Anda sebagai pengingat munajat pribadi di perangkat ini (tersimpan lokal di browser Anda, tidak dikirim ke server).'
    );
    expect(infaqSrc).not.toContain(
      'Tuliskan doa atau hajat keluarga Anda agar diaminkan bersama oleh ribuan peziarah Nusantara.'
    );
  });

  it('verifies saveData guard in SiteContext.tsx and standardized haul schedule text in Artikel 7 of articles.ts', () => {
    const siteContextSrc = fs.readFileSync(siteContextPath, 'utf-8');
    expect(siteContextSrc).toContain('if (conn?.saveData)');

    const articlesSrc = fs.readFileSync(articlesPath, 'utf-8');
    expect(articlesSrc).toContain(
      'Haul Syekh Maulana Malik Ibrahim (Sunan Gresik), Kabupaten Gresik, Jawa Timur — jadwal tahunan mengikuti penetapan resmi panitia/pengurus makam setempat.'
    );
    expect(articlesSrc).not.toContain('12 Rabiul Awal: Haul Syekh Maulana Malik Ibrahim');
    expect(articlesSrc).toContain(
      '1–15 Muharram: Rangkaian Buka Luwur & Haul Sunan Muria (Raden Umar Said), Colo, Kabupaten Kudus, Jawa Tengah (dimulai 1 Muharram; jadwal puncak mengikuti penetapan resmi panitia setempat).'
    );
    expect(articlesSrc).not.toContain('1–15 Muharram (Puncak 15 Muharram)');
  });
});
