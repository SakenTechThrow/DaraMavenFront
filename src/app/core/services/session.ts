import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../models/session';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = 'http://localhost:8080/api/users/me/sessions';

  constructor(private http: HttpClient) {}

  getMySessions(): Observable<Session[]>{
    return this.http.get<Session[]>(this.apiUrl);
  }
  deleteSession(sessionId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${sessionId}`);
  }
}
