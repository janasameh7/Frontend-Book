import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { exhaustMap, Observable, take,map } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private URL ="http://localhost:5000/users";

  addBookToFav(bookId: string): Observable<string[]>{
    return this.authService.user.pipe(take(1), exhaustMap((user)=>{
      const headers = new HttpHeaders({
        Authorization: `Bearer ${user?.token}`,
      });
      return this.http
      .post<any>(`${this.URL}/favoriteBook`, {bookId}, {headers})
      .pipe(map((response)=>{
        return response.data.favBooks;
      }))
     })
    );
  }
}
