import { Component, inject, OnInit } from '@angular/core';
import { Observable, of,from, filter,map } from 'rxjs';
import { MovieList } from './movie-list/movie-list';
import { Login } from './login/login';
import { AuthService } from './services/auth-service';
import { Signup } from './signup/signup';



@Component({
  selector: 'app-root',
  imports: [MovieList, Login, Signup],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private authService = inject(AuthService);

  ngOnInit(){
    this.authService.autoLogin();
  }

 }
