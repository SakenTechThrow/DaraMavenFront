import { Component, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../models/profile';
import { AdminUserService } from '../../core/services/admin-user';
import { getErrorMessage } from '../../core/utils/error-message';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-user-profile',
  imports: [
    DatePipe, 
    TranslatePipe,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './admin-user-profile.html',
  styleUrl: './admin-user-profile.scss',
})
export class AdminUserProfile implements OnInit{
  profile: Profile | null = null;

  userId: number | null = null;

  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminUserService: AdminUserService
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if(!id) {
      this.loading = false;
      this.errorMessage = 'Invalid user id';
      return;
    }

    this.userId = id;
    this.loadProfile(id);
  }

  loadProfile(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.adminUserService.getUserProfile(id).subscribe({
      next: (response) => {
        this.profile = response;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        const message = getErrorMessage(error, 'Could not load user profile');

        if(message.toLowerCase().includes('profile not found')){
          this.errorMessage = 'Profile not created yet.'
          return;
        }
        this.errorMessage = message;
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/admin/users']);
  }
}
