import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  selectedFileName: string = '';
  selectedFile: File | null = null;
  passwordMisMatch: boolean = false;
  error: string | null = null;

  private authService = inject(AuthService);

  @ViewChild('signUpForm') signUpForm!: NgForm;

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
    this.selectedFileName = this.selectedFile?.name || '';
  }

  onSubmit() {
    if (!this.signUpForm) {
      console.error('signUpForm is undefined');
      this.error = 'Form initialization failed';
      return;
    }
    if (this.signUpForm.invalid) {
      this.signUpForm.form.markAllAsTouched();
      this.error = 'Please fill all required fields correctly';
      return;
    }

    const { name, password, confirmPassword, email } = this.signUpForm.value;
    if (password !== confirmPassword) {
      this.passwordMisMatch = true;
      this.error = 'Passwords do not match';
      return;
    }

    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('password', password);
    if (this.selectedFile) fd.append('photo', this.selectedFile);

    this.authService.signup(fd).subscribe({
      next: (user) => {
        console.log('Signup successful:', user);
        this.signUpForm.reset();
        this.selectedFile = null;
        this.selectedFileName = '';
        this.passwordMisMatch = false;
        this.error = null;
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.error = err.message || 'An error occurred during signup';
      },
    });
  }

  setForm() {
    this.signUpForm.form.setValue({
      name: 'Jane',
      email: 'jane@example.com',
      password: '12345678',
      confirmPassword: '12345678',
    });
  }

  patchForm() {
    this.signUpForm.form.patchValue({
      // Add partial updates if needed
    });
  }
}