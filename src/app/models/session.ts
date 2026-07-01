export interface Session {
    id: number;
    createdAt: string;
    expiresAt: string;
    userAgent: string | null;
    ipAddress: string | null;
    revoked: boolean;
}
