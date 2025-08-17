import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  selectedFileName: string = "";
  selectedFile: File | null = null;
  passwordMisMatch: boolean = false;
  error: string | null = null; 

  private authService = inject(AuthService);

  @ViewChild('signUpForm') signUpForm!: NgForm;

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
    this.selectedFileName = this.selectedFile?.name || "";
  }

  onSubmit() {
    if (!this.signUpForm) {
      console.error('signUpForm is undefined');
      return;
    }
    if (this.signUpForm.invalid) return;

    const { name, password, confirmPassword, email } = this.signUpForm.value;
    if (password !== confirmPassword) {
      this.passwordMisMatch = true;
      return;
    }

    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("password", password);
    if (this.selectedFile) fd.append("photo", this.selectedFile);

    this.authService.signup(fd).subscribe({
      next: (user) => {
        console.log(user);
        this.signUpForm.reset();
        this.selectedFile = null;
        this.selectedFileName = "";
        this.passwordMisMatch = false;
        
      },
      error: (err) => {
        console.log(err);
        this.error = err.message 
      }
    });
  }
}