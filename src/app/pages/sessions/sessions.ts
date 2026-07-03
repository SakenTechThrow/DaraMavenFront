import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../models/session';
import { SessionService } from '../../core/services/session';
import { DatePipe } from '@angular/common';
import { getErrorMessage } from '../../core/utils/error-message';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-sessions',
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './sessions.html',
  styleUrl: './sessions.scss',
})
export class Sessions implements OnInit{
  sessions: Session[] = [];

  loading = true;
  deletingId: number | null = null;

  errorMessage = '';
  successMessage = '';

  constructor(
    private sessionService: SessionService,
    private router: Router
  ){}

  displayedColumns: string[] = [
    'id',
    'ipAddress',
    'userAgent',
    'createdAt',
    'expiresAt',
    'revoked',
    'actions'
  ];

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void{
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.sessionService.getMySessions().subscribe({
      next: (response) =>{
        this.sessions = response;
        this.loading = false;
      },
      error:(error) =>{
        this.loading = false;
        this.errorMessage = getErrorMessage(error, 'Could not load sessions');
      }
    });
  }
  deleteSession(sessionId: number): void{
    const confirmed = confirm('Are you sure you want to delete this session?');

    if(!confirmed){
      return;
    }

    this.deletingId = sessionId;
    this.errorMessage = '';
    this.successMessage = '';

    this.sessionService.deleteSession(sessionId).subscribe({
      next: ()=>{
        this.sessions = this.sessions.filter(session => session.id !== sessionId);
        this.deletingId = null;
        this.successMessage = 'Session deleted successfully';
      },
      error: (error)=>{
        this.deletingId = null;
        this.errorMessage = getErrorMessage(error, 'Could not delete session');
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
