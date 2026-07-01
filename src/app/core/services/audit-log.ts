import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLogPageResponse } from '../../models/audit-log';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private apiUrl = 'http://localhost:8080/api/admin/audit-logs';

  constructor(private http: HttpClient) {}

  getAuditLogs(
    page: number = 0,
    size: number = 10,
    action: string = '',
    actorEmail: string = ''
  ): Observable<AuditLogPageResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (action.trim()) {
      params = params.set('action', action);
    }

    if (actorEmail.trim()) {
      params = params.set('actorEmail', actorEmail);
    }

    return this.http.get<AuditLogPageResponse>(this.apiUrl, { params });
  }
}