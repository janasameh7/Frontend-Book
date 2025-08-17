import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { BookService } from '../services/book-service';
import { UserService } from '../services/user-service';
import { Book } from '../models/book-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private bookService = inject(BookService);
  private userService = inject(UserService);
  books: Book[] = [];
  error: string | null = null;

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.error = 'Failed to load books. Please try again later.';
      },
    });
  }

  logout() {
    this.authService.logOut();
    window.location.reload(); // Simple reload, replace with router navigation if needed
  }

  isLoggedIn(): boolean {
    return !!this.authService.user.value?.token;
  }

  addToFavorites(bookId: string | undefined) {
    if (!this.isLoggedIn()) {
      this.error = 'Please log in to add favorites.';
      return;
    }

    if (!bookId) {
      this.error = 'Invalid book ID. Cannot add to favorites.';
      return;
    }

    this.userService.addBookToFav(bookId).subscribe({
      next: (favBooks) => {
        console.log('Added to favorites:', favBooks);
        this.error = null;
      },
      error: (err) => {
        console.error('Error adding to favorites:', err);
        this.error = 'Failed to add book to favorites. Please try again.';
      },
    });
  }
}