import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Book } from '../models/book-model';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private URL = 'http://localhost:5000/books';

  getAllBooks(page: number = 1, limit: number = 10): Observable<{ books: Book[], totalBooks: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.URL}`, { params })
      .pipe(map(response => ({
        books: response.data.books,
        totalBooks: response.totalBooks || response.data.totalBooks
      })));
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<any>(`${this.URL}/${id}`)
      .pipe(map(response => response.data.book));
  }

  searchBooks(query: string, field: string, page: number = 1, limit: number = 10): Observable<{ books: Book[], totalBooks: number }> {
    let searchUrl: string;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (field === 'author') {
      searchUrl = `${this.URL}/search/author`;
      params = params.set('author', query);
    } else if (field === 'title') {
      searchUrl = `${this.URL}/search/title`;
      params = params.set('title', query);
    } else {
      
      return of({ books: [], totalBooks: 0 });
    }

    return this.http.get<any>(searchUrl, { params })
      .pipe(map(response => ({
        books: response.data.books,
        totalBooks: response.totalBooks || response.data.totalBooks
      })));
  }

  deleteBook(id: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user.value?.token}`
    });
    return this.http.delete<void>(`${this.URL}/${id}`, { headers });
  }

  updateBook(id: string, data: FormData): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user.value?.token}`
    });
    return this.http.patch<void>(`${this.URL}/${id}`, data, { headers });
  }

  addBook(data: FormData): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user.value?.token}`
    });
    return this.http.post<void>(`${this.URL}`, data, { headers });
  }
}