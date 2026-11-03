export interface ContributionItem {
  id: string;
  type: 'baru' | 'karomah' | 'doa';
  contributorName: string;
  contributorContact?: string;
  targetName: string;
  category?: string;
  city?: string;
  province?: string;
  mapsUrl?: string;
  content: string;
  translation?: string;
  status: 'pending' | 'approved' | 'rejected';
  authorUid?: string;
  createdAtMs: number;
}

export interface DonationAdminItem {
  id: string;
  donorName: string;
  amount: number;
  programId?: string;
  programTitle?: string;
  siteId?: string;
  siteName?: string;
  paymentMethod?: string;
  senderAccount?: string;
  hasProof?: boolean;
  proofImageUrl?: string;
  referenceCode?: string;
  doaHajat?: string;
  status?: 'confirmed' | 'verified' | 'rejected' | string;
}
