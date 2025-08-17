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

  addMovieToFav(movieId: string): Observable<string[]>{
    return this.authService.user.pipe(take(1), exhaustMap((user)=>{
      const headers = new HttpHeaders({
        Authorization: `Bearer ${user?.token}`,
      });
      return this.http
      .post<any>(`${this.URL}/favoriteMovie`, {movieId}, {headers})
      .pipe(map((response)=>{
        return response.data.favMovies;
      }))
     })
    );
  }
}
