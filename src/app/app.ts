import { Component, inject, OnInit } from '@angular/core';
import { Observable, of,from, filter,map } from 'rxjs';
import { BookList } from './book-list/book-list';
import { Login } from './login/login';
import { AuthService } from './services/auth-service';
import { Signup } from './signup/signup';
import { Home } from './homepage/homepage';



@Component({
  selector: 'app-root',
  imports: [BookList, Login, Signup, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private authService = inject(AuthService);

  ngOnInit(){
    this.authService.autoLogin();
  }

 }
