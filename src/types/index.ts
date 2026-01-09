export interface NGO {
    id: string;
    name: string;
    type: string;
    location: string;
    image_url: string;
    description: string;
    verified: boolean;
}

export interface Donation {
    id: string;
    ngo_id: string;
    ngo_name: string;
    donor_name: string;
    amount: number;
    date: string;
    status: 'pending' | 'completed' | 'failed';
    items?: string[]; // For item donations
}

export interface ProofOfPurchase {
    id: string;
    donation_id: string;
    ngo_id: string;
    ngo_name: string;
    image_url: string;
    description: string;
    uploaded_at: string;
    verified: boolean;
}

export interface Feedback {
    id: string;
    donation_id: string;
    ngo_id: string;
    ngo_name: string;
    donor_name: string;
    rating: number;
    comment: string;
    date: string;
    status: 'pending' | 'sent_to_ngo' | 'archived';
}
