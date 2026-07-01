import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuditLog } from '../../models/audit-log';
import { AuditLogService } from '../../core/services/audit-log';
import { DatePipe } from '@angular/common';
import { getErrorMessage } from '../../core/utils/error-message';

@Component({
  selector: 'app-admin-audit-logs',
  imports: [FormsModule, DatePipe],
  templateUrl: './admin-audit-logs.html',
  styleUrl: './admin-audit-logs.scss',
})
export class AdminAuditLogs implements OnInit{
  logs: AuditLog[] = [];

  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  action = '';
  actorEmail = '';

  loading = true;
  errorMessage = '';

  constructor(
    private auditLogService: AuditLogService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.loading = true;
    this.errorMessage = '';

    this.auditLogService
    .getAuditLogs(this.page, this.size, this.action, this.actorEmail)
    .subscribe({
      next:(response) =>{
        this.logs = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = getErrorMessage(error, 'Could not load audit logs. Maybe you are not ADMIN.');
      } 
    });
  }
  applyFilters(): void{
    this.page = 0;
    this.loadLogs();
  }
  clearFilters(): void{
    this.action = '';
    this.actorEmail = '';
    this.page = 0;
    this.loadLogs();
  }

  nextPage(): void {
    if(this.page + 1 < this.totalPages){
      this.page++;
      this.loadLogs();
    }
  }

  previousPage(): void {
    if (this.page > 0){
      this.page--;
      this.loadLogs();
    }
  }
  goBack(): void{
    this.router.navigate(['/dashboard']);
  }
}
