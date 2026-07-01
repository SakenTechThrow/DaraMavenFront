import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminUser } from '../../models/admin-user';
import { AdminUserService } from '../../core/services/admin-user';

@Component({
  selector: 'app-admin-users',
  imports: [],
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
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

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
      error:() =>{
        this.loading = false;
        this.errorMessage = 'Could not load users. Maybe you are not ADMIN.';
      }
    });
  }
  makeAdmin(user: AdminUser): void{
    this.actionLoadingId = user.id;

    this.adminUserService.changeRole(user.id, {role: 'ADMIN'}).subscribe({
      next:() =>{
        this.actionLoadingId = null;
        this.successMessage = 'User role changed to ADMIN';
        this.loadUsers();
      },
      error: () =>{
        this.actionLoadingId = null;
        this.errorMessage = 'Could not change role';
      }
    });
  }
  makeUser(user: AdminUser): void {
    this.actionLoadingId = user.id;

    this.adminUserService.changeRole(user.id, {role: 'USER'}).subscribe({
      next: () => {
        this.actionLoadingId = null;
        this.successMessage = 'User role changed to USER';
        this.loadUsers();
      },
      error: () => {
        this.actionLoadingId = null;
        this.errorMessage = 'Could not change role';
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
        this.successMessage = 'User blocked successfully';
        this.loadUsers();
      },
      error: () =>{
        this.actionLoadingId = null;
        this.errorMessage = 'Could not block user';
      }
    });
  }
  unblockUser(user: AdminUser): void {
    this.actionLoadingId = user.id;

    this.adminUserService.unblockUser(user.id).subscribe({
      next:() => {
        this.actionLoadingId = null;
        this.successMessage = 'User unblocked successfully';
        this.loadUsers();
      },
      error: () => {
        this.actionLoadingId = null;
        this.errorMessage = 'Could not unblock user';
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
      this.successMessage = 'User deleted successfully';
      this.loadUsers();
      },
      error:() =>{
        this.actionLoadingId = null;
        this.errorMessage = 'Could not delete user';
      }
    });
  }
  restoreUser(user: AdminUser): void {
    this.actionLoadingId = user.id;

    this.adminUserService.restoreUser(user.id).subscribe({
      next: () =>{
        this.actionLoadingId = null;
        this.successMessage = 'User restored successfully';
        this.loadUsers();
      },
      error: () => {
        this.actionLoadingId = null;
        this.errorMessage = 'Could not restore user';
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
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
