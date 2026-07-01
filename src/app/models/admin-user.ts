export interface AdminUser {
    id: number;
    email: string;
    role: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string | null;
    blockedReason: string | null;
    blockedAt: string | null;
}
export interface PageResponse<T>{
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
export interface ChangeRoleRequest{
    role: string;
}
export interface ChangeStatusRequest{
    active: boolean;
}
export interface BlockUserRequest{
    reason: string;
}
