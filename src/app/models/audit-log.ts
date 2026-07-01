export interface AuditLog {
  id: number;
  actorEmail: string | null;
  action: string;
  targetType: string;
  targetId: number | null;
  description: string | null;
  ipAddress: string | null;
  createdAt: string;
}

export interface AuditLogPageResponse {
  content: AuditLog[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}