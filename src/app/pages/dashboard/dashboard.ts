import { Component, OnInit} from '@angular/core';
import { UserService } from '../../core/services/user';
import { User } from '../../models/user';
import { Auth } from '../../core/services/auth';
import { Router, RouterLink} from '@angular/router';
import { DatePipe } from '@angular/common';
import { getErrorMessage } from '../../core/utils/error-message';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '../../core/pipes/translate.pipe';


@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    TranslatePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  user: User | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMe();
  }
  
  loadMe(): void {
    this.userService.getMe().subscribe({
      next: (response) => {
        this.user = response;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = getErrorMessage(error, 'Could not load user data.');
      }
    });
  }
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
