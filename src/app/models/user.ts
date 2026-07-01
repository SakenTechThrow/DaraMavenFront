export interface User {
    id: number;
    email: string;
    role: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    blockedReason: string | null;
    blockedAt: string | null;
}
