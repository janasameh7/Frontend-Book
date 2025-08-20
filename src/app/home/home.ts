import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { BookService } from '../services/book-service';
import { UserService } from '../services/user-service';
import { Book } from '../models/book-model';
import { UserModel } from '../models/user-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  books: Book[] = [];
  error: string | null = null;
  favoriteBookIds: Set<string> = new Set();
  isAuthenticated: boolean = false;
  userName: string | null = null;
  private authService = inject(AuthService);
  private bookService = inject(BookService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user?.token;
      this.userName = user?.email || null;
      if (this.isAuthenticated) {
        this.loadFavorites();
      }
    });
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: ({ books }) => {
        this.books = books;
        this.error = null;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.error = 'Failed to load books. Please try again later.';
      }
    });
  }

  loadFavorites() {
    this.userService.getFavoriteBooks().subscribe({
      next: (books: Book[]) => {
        this.favoriteBookIds = new Set(books.map(book => book._id!));
        this.error = null;
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.error = 'Failed to load favorites.';
      }
    });
  }

  isFavorite(bookId: string | undefined): boolean {
    return bookId ? this.favoriteBookIds.has(bookId) : false;
  }

  toggleFavorite(bookId: string | undefined) {
    if (!this.isAuthenticated) {
      this.error = 'Please log in to manage favorites.';
      return;
    }
    if (!bookId) {
      this.error = 'Invalid book ID.';
      return;
    }
    if (this.isFavorite(bookId)) {
      this.userService.removeBookFromFav(bookId).subscribe({
        next: (books: Book[]) => {
          this.favoriteBookIds = new Set(books.map(book => book._id!));
          this.error = null;
        },
        error: (err) => {
          console.error('Error removing from favorites:', err);
          this.error = 'Failed to remove book from favorites.';
        }
      });
    } else {
      this.userService.addBookToFav(bookId).subscribe({
        next: (books: Book[]) => {
          this.favoriteBookIds = new Set(books.map(book => book._id!));
          this.error = null;
        },
        error: (err) => {
          console.error('Error adding to favorites:', err);
          this.error = 'Failed to add book to favorites.';
        }
      });
    }
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}