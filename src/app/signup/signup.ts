import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';

interface SignupForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  photo: FormControl<File | null>;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signupForm: FormGroup<SignupForm>;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  error: string | null = null;
  private authService = inject(AuthService);

  constructor() {
    this.signupForm = new FormGroup<SignupForm>({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      photo: new FormControl(null)
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.signupForm.patchValue({ photo: this.selectedFile });
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
      this.signupForm.patchValue({ photo: null });
    }
  }

  onSubmit() {
    console.log('Signup Form valid:', this.signupForm.valid);
    console.log('Signup Form errors:', this.signupForm.errors);
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      console.log(`Control ${key}:`, {
        value: control?.value,
        valid: control?.valid,
        errors: control?.errors
      });
    });

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.error = 'Please fill all required fields correctly';
      return;
    }

    const formValue = this.signupForm.value;
    const fd = new FormData();
    fd.append('name', formValue.name || '');
    fd.append('email', formValue.email || '');
    fd.append('password', formValue.password || '');
    if (this.selectedFile) {
      fd.append('photo', this.selectedFile);
    }

    console.log('Sending Signup FormData:');
    for (const pair of fd.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    this.authService.signup(fd).subscribe({
      next: (user) => {
        console.log('Signup successful:', user);
        this.signupForm.reset();
        this.selectedFile = null;
        this.selectedFileName = '';
        this.error = null;
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.error = err.error?.message || 'An error occurred during signup';
      }
    });
  }

  setForm() {
    this.signupForm.setValue({
      name: 'Jane',
      email: 'jane@example.com',
      password: '12345678',
      confirmPassword: '12345678',
      photo: null
    });
    this.selectedFile = null;
    this.selectedFileName = '';
  }

  patchForm() {
    this.signupForm.patchValue({
      name: 'Jane',
      email: 'jane@example.com'
    });
  }
}