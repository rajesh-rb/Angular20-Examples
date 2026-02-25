export type KycStatus = 'Pending' | 'Verified' | 'Rejected';

export interface KycApplication {
    id: number;
    fullName: string;
    mobile: string;
    pan: string;
    email: string;
    status: KycStatus;
    createdAt: Date;
}
