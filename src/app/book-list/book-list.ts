import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../models/book-model';
import { BookService } from '../services/book-service';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  books: Book[] = [];

  private bookService = inject(BookService);

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        console.log(this.books);
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.books = []; 
      },
    });
  }

  addBook() {
    const newBook: Book = {
      title: 'Dune2',
      language: 'English',
      authors: ['Frank Herbert'],
      description: 'A science fiction novel about a young noble navigating a desert planet.',
      publicationYear: 1965,
      genre: ['Science Fiction', 'Adventure'],
      coverImage: 'Dune.jpeg',
      createdAt: new Date().toISOString(),
      pageCount: 412,
      ratings: 4.5,
      totalRatings: 5000,
    };

    this.bookService.addBook(newBook).subscribe({
      next: (data) => {
        console.log(data);
        this.books.push(data);
      },
    });
  }

  updateBook(id: string | undefined, index: number) {
    this.bookService.updateBook(id, { title: 'Updated Title' }).subscribe({
      next: (data) => {
        console.log(data);
        this.books[index] = data;
      },
    });
  }

  deleteBook(id: string | undefined, index: number) {
    this.bookService.deleteBook(id).subscribe({
      next: (data) => {
        console.log(data);
        this.books.splice(index, 1);
      },
    });
  }
}