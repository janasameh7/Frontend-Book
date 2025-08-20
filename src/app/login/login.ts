import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loading = false;
  serverError = '';
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  @ViewChild('loginForm') loginForm!: NgForm;
  formData: any = {};

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.form.markAllAsTouched();
      this.serverError = 'Please fill all required fields correctly';
      return;
    }

    this.loading = true;
    this.serverError = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        this.loginForm.reset();
        console.log('Login successful, token:', this.authService.user.value?.token);
        this.router.navigate(['admin']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.loading = false;
        this.serverError = err.error?.message || 'An error occurred during login';
      },
    });
  }

  // addBookToFav(bookId: string = 'sampleBookId') {
  //   this.userService.addBookToFav(bookId).subscribe({
  //     next: (favBooks) => {
  //       console.log('Favorite books updated:', favBooks);
  //     },
  //     error: (err) => {
  //       console.error('Error adding book to favorites:', err);
  //     },
  //   });
  // }
}