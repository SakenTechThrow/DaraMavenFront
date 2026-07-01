import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { getErrorMessage } from '../../core/utils/error-message';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  email = '';
  password = ''
  confirmPassword = '';

  errorMessage = '';
  successMessage = '';
  loading = false;
  
  constructor(
    private auth: Auth,
    private router: Router
  ){}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    
    this.loading = true;

    this.auth.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Account created successfully.';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = getErrorMessage(error, 'Registration failed.');
      }
    });
  }
}
