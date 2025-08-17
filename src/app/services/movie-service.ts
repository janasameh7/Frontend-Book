import { Injectable, inject } from '@angular/core';
import { Movie } from '../models/movie-model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:5000/movies';

 getMovies(): Observable<Movie[]>{
  return this.http
  .get<any>(this.URL)
  .pipe(map((response) => { 
    return response.data.movie
    }));
  }

  addMovie(movie: Movie): Observable<Movie>{
    return this.http
    .post<any>(this.URL, movie)
    .pipe(map((response) => { 
      return response.data.movie
    }));
  }
 
  updateMovie(id: string | undefined, updatedData: Partial<Movie>) : Observable<Movie>{
    return this.http.patch<any>(`${this.URL}/${id}`, updatedData)
    .pipe(map((response)=>{
      return response.data.movie;
    }));
  }

  deleteMovie(id: string | undefined) : Observable<Movie>{
    return this.http.delete<any>(`${this.URL}/${id}`)
    .pipe(map((response)=>{
      return response.data.movie;
    }));
 }
}

