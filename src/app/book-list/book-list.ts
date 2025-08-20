// import { Component, inject, OnInit } from '@angular/core';
// import { Book } from '../models/book-model';
// import { BookService } from '../services/book-service';

// @Component({
//   selector: 'app-book-list',
//   imports: [],
//   templateUrl: './book-list.html',
//   styleUrl: './book-list.css'
// })
// export class BookList implements OnInit {
//   books: Book[] = [];

//   private bookService = inject(BookService);

//   ngOnInit() {
//     this.loadBooks();
//   }

//   loadBooks() {
//     this.bookService.getBooks().subscribe({
//       next: (data) => {
//         this.books = data;
//         console.log(this.books);
//       },
//       error: (err) => {
//         console.error('Error loading books:', err);
//         this.books = []; 
//       },
//     });
//   }

//   addBook() {
//     const newBook: Book = {
//       title: 'Done',
//       language: 'english',
//       authors: ['Frank Herbert'],
//       description: 'A science fiction novel about a young noble navigating a desert planet.',
//       publicationYear: 1965,
//       genre: ['Science Fiction'],
//       coverImage: 'Dune.jpeg',
//       createdAt: new Date().toISOString(),
//       pageCount: 412,
//       ratings: 4.5,
//       totalRatings: 5000,
//     };

//     this.bookService.addBook(newBook).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.books.push(data);
//       },
//     });
//   }

//   updateBook(id: string | undefined, index: number) {
//     this.bookService.updateBook(id, { title: 'Updated Title' }).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.books[index] = data;
//       },
//     });
//   }

//   deleteBook(id: string | undefined, index: number) {
//     this.bookService.deleteBook(id).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.books.splice(index, 1);
//       },
//     });
//   }
// }


// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BookService } from '../services/book-service';
// import { Book } from '../models/book-model';
// import { UserService } from '../services/user-service'; // Assume UserService exists

// @Component({
//   selector: 'app-book-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './book-list.html',
//   styleUrl: './book-list.css'
// })
// export class BookList implements OnInit {
//   books: Book[] = [];
//   error: string | null = null;

//   private bookService = inject(BookService);
//   private userService = inject(UserService); // Inject UserService for favorites

//   ngOnInit() {
//     this.loadBooks();
//   }

//   loadBooks() {
//     this.bookService.getBooks().subscribe({
//       next: (data) => {
//         this.books = data;
//         console.log(this.books);
//       },
//       error: (err) => {
//         console.error('Error loading books:', err);
//         this.error = 'Failed to load books. Please try again.';
//       },
//     });
//   }

//   addBook() {
//     const newBook: Book = {
//       title: 'New Book Title',
//       language: 'English',
//       authors: ['Author1'],
//       genre: ['Fiction'],
//       pageCount: 200,
//       publicationYear: 2025,
//       coverImage: 'default-image.jpg',
//     };

//     this.bookService.addBook(newBook).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.books.push(data);
//       },
//       error: (err) => {
//         console.error('Error adding book:', err);
//         this.error = 'Failed to add book. Please try again.';
//       },
//     });
//   }

//   updateBook(id: string | undefined, index: number) {
//     if (!id) return;
//     this.bookService.updateBook(id, { title: 'Updated Book Title' }).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.books[index] = data;
//       },
//       error: (err) => {
//         console.error('Error updating book:', err);
//         this.error = 'Failed to update book. Please try again.';
//       },
//     });
//   }

//   deleteBook(id: string | undefined, index: number) {
//     if (!id) return;
//     this.bookService.deleteBook(id).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.books.splice(index, 1);
//       },
//       error: (err) => {
//         console.error('Error deleting book:', err);
//         this.error = 'Failed to delete book. Please try again.';
//       },
//     });
//   }

//   addToFavorites(id: string | undefined, index: number) {
//     if (!id || !this.isLoggedIn()) return;
//     this.userService.addBookToFav(id).subscribe({
//       next: (data) => {
//         console.log('Added to favorites:', data);
//         this.error = null;
//         // Optionally update UI to indicate the book is favorited
//       },
//       error: (err) => {
//         console.error('Error adding to favorites:', err);
//         this.error = 'Failed to add book to favorites. Please try again.';
//       },
//     });
//   }

//   isLoggedIn(): boolean {
//     // Simplified check; replace with actual auth logic (e.g., from AuthService)
//     return !!localStorage.getItem('token'); // Assume token is stored on login
//   }
// }