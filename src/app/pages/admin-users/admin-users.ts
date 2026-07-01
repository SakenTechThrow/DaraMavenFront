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
}
