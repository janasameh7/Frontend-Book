import { Injectable, inject } from '@angular/core';
import { Book } from '../models/book-model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:5000/books';

  getBooks(): Observable<Book[]> {
    return this.http
      .get<any>(this.URL)
      .pipe(map((response) => {
        return response.data.books;
      }));
  }

  addBook(books: Book): Observable<Book> {
    return this.http
      .post<any>(this.URL, books)
      .pipe(map((response) => {
        return response.data.books;
      }));
  }

  updateBook(id: string | undefined, updatedData: Partial<Book>): Observable<Book> {
    return this.http.patch<any>(`${this.URL}/${id}`, updatedData)
      .pipe(map((response) => {
        return response.data.books;
      }));
  }

  deleteBook(id: string | undefined): Observable<Book> {
    return this.http.delete<any>(`${this.URL}/${id}`)
      .pipe(map((response) => {
        return response.data.books;
      }));
  }
}