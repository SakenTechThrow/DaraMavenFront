import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { getErrorMessage } from '../../core/utils/error-message';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private auth: Auth,
    private router: Router
  ){}

  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.auth.saveTokens(response);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error:(error)=>{
        this.loading = false;
        this.errorMessage = getErrorMessage(error, 'Email or password is wrong');
      }
    });
  }


}
