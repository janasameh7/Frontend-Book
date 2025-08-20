import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth-service';
import { Book } from '../models/book-model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private URL = 'http://localhost:5000/users';

  addBookToFav(bookId: string): Observable<Book[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user.value?.token}`,
      'Content-Type': 'application/json'
    });
    return this.http
      .post<any>(`${this.URL}/favoriteBook`, { bookId }, { headers })
      .pipe(map((response) => response.data.books));
  }

  removeBookFromFav(bookId: string): Observable<Book[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user.value?.token}`
    });
    return this.http
      .delete<any>(`${this.URL}/favorites/${bookId}`, { headers })
      .pipe(map((response) => response.data.books));
  }

  getFavoriteBooks(): Observable<Book[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user.value?.token}`
    });
    return this.http
      .get<any>(`${this.URL}/favorites`, { headers })
      .pipe(map((response) => response.data.books));
  }

  isBookInFavorites(bookId: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user.value?.token}`
    });
    return this.http
      .get<any>(`${this.URL}/favorites/${bookId}/check`, { headers })
      .pipe(map((response) => response.data.isFavorite));
  }
}