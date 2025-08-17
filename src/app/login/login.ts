import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  @ViewChild('loginForm') loginForm!: NgForm;
  email: string = '';
  password: string = '';
  isError: boolean = false;
  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.email, this.password).subscribe({
        next: (user) => {
          console.log('Login successful:', user);
          this.isError = false;
          this.errorMessage = '';
           
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isError = true;
          this.errorMessage = error.message || 'An error occurred during login';
        },
      });
    } else {
      this.loginForm.form.markAllAsTouched();
      this.isError = true;
      this.errorMessage = 'Please fill all required fields correctly';
    }
  }

  setForm() {
    this.loginForm.form.setValue({
      email: 'jana@gmail.com',
      password: '12345678',
    });
  }

  patchForm() {
    this.loginForm.form.patchValue({
      
    });
  }

  
  addBookToFav(bookId: string = 'sampleBookId') {
    this.userService.addBookToFav(bookId).subscribe({
      next: (favBooks) => {
        console.log('Favorite books updated:', favBooks);
      },
      error: (err) => {
        console.error('Error adding book to favorites:', err);
      },
    });
  }
}