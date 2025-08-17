
import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  isError: boolean = false;
  errorMessage: string = '';

  // onLogin(email: string= 'jana@gmail.com', password: string= "12345678"){
  //   this.authService.login(email,password).subscribe({
  //     next:(token)=>{
  //       console.log(token);
        
  //     },
  //     error:(error)=>{
  //       console.log(error);
  //       this.isError = true;
  //       this.errorMessage = error.Message
  //     },
  //   });
  // }

//   addMovieToFav(movieId:string='689a1a3a089e4ab654771d44' ){
//     this.userService.addMovieToFav(movieId).subscribe({
//       next:(data)=>{
//         console.log(data);
        
//       },
//       error:(err)=>{
//         console.error(err);
//       }
//     });
//   }

  @ViewChild('movieForm') movieForm!: NgForm;
  formData: any = {};

  onSubmit() {
    this.authService.login(this.movieForm.value.email, this.movieForm.value.password).subscribe({
      next: (token) => {
        console.log(token);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  setForm() {
    this.movieForm.form.setValue({
      email: 'jana@gmail.com',
      password: '12345678',
    });
  }

  patchForm() {
    this.movieForm.form.patchValue({
     
    });
  }
}
