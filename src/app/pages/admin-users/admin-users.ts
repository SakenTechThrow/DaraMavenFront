import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminUser } from '../../models/admin-user';
import { AdminUserService } from '../../core/services/admin-user';
import { DatePipe } from '@angular/common';
import { getErrorMessage } from '../../core/utils/error-message';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-users',
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    TranslatePipe,
    MatSnackBarModule
  ],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers implements OnInit{
  users: AdminUser[] = [];

  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  loading = true;
  actionLoadingId: number | null = null;

  errorMessage = '';
  successMessage = '';

  constructor(
    private adminUserService: AdminUserService,
    private router: Router,

    private snackBar: MatSnackBar
  ){}

  showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  displayedColumns: string[] = [
    'id',
    'email',
    'role',
    'active',
    'deleted',
    'createdAt',
    'actions'
  ];

  loadUsers(): void{
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.adminUserService.getUsers(this.page, this.size).subscribe({
      next: (response) =>{
        this.users = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error:(error) =>{
        this.loading = false;
        this.errorMessage = getErrorMessage(error, 'Could not load users. Maybe you are not ADMIN.');
        this.showError(this.errorMessage);
      }
    });
  }
  makeAdmin(user: AdminUser): void{
    this.actionLoadingId = user.id;

    this.adminUserService.changeRole(user.id, {role: 'ADMIN'}).subscribe({
      next:() =>{
        this.actionLoadingId = null;
        this.showSuccess('User role changed to ADMIN');
        this.loadUsers();
      },
      error: (error) =>{
        this.actionLoadingId = null;
        this.showError(getErrorMessage(error, 'Could not change role'));
      }
    });
  }
  makeUser(user: AdminUser): void {
    this.actionLoadingId = user.id;

    this.adminUserService.changeRole(user.id, {role: 'USER'}).subscribe({
      next: () => {
        this.actionLoadingId = null;
        this.showSuccess('User role changed to USER');
        this.loadUsers();
      },
      error: (error) => {
        this.actionLoadingId = null;
        this.showError(getErrorMessage(error, 'Could not change role'));
      }
    });
  }
  blockUser(user: AdminUser): void {
    const reason = prompt('Why do you want to block this user?');

    if(!reason) {
      return;
    }
    this.actionLoadingId = user.id;

    this.adminUserService.blockUser(user.id, {reason}).subscribe({
      next: () => {
        this.actionLoadingId = null;
        this.showSuccess('User blocked successfully');
        this.loadUsers();
      },
      error: (error) =>{
        this.actionLoadingId = null;
        this.showError(getErrorMessage(error, 'Could not block user'));
      }
    });
  }
  unblockUser(user: AdminUser): void {
    this.actionLoadingId = user.id;

    this.adminUserService.unblockUser(user.id).subscribe({
      next:() => {
        this.actionLoadingId = null;
        this.showSuccess ('User unblocked successfully');
        this.loadUsers();
      },
      error: (error) => {
        this.actionLoadingId = null;
        this.showError(getErrorMessage(error, 'Could not unblock user'));
      }
    });
  }
  deleteUser(user: AdminUser): void{
    const confirmed = confirm(`Delete user ${user.email}?`);

    if(!confirmed){
      return;
    }
    this.actionLoadingId = user.id;

    this.adminUserService.deleteUser(user.id).subscribe({
      next: ()=>{
        this.actionLoadingId = null;
      this.showSuccess('User deleted successfully');
      this.loadUsers();
      },
      error:(error) =>{
        this.actionLoadingId = null;
        this.showError(getErrorMessage(error, 'Could not delete user'));
      }
    });
  }
  restoreUser(user: AdminUser): void {
    this.actionLoadingId = user.id;

    this.adminUserService.restoreUser(user.id).subscribe({
      next: () =>{
        this.actionLoadingId = null;
        this.showSuccess('User restored successfully');
        this.loadUsers();
      },
      error: (error) => {
        this.actionLoadingId = null;
        this.showError(getErrorMessage(error, 'Could not restore user'));
      }
    });
  }
  nextPage(): void {
    if(this.page + 1 < this.totalPages){
      this.page++;
      this.loadUsers();
    }
  }
  previousPage(): void {
    if(this.page > 0){
      this.page--;
      this.loadUsers();
    }
  }
  viewProfile(user: AdminUser): void {
    this.router.navigate(['/admin/users', user.id, 'profile']);
  }
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
