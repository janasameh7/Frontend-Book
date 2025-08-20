import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { BookService } from '../services/book-service';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth-service';
import { Book } from '../models/book-model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = []; 
  isFavoritesView: boolean = false;
  isAuthenticated: boolean = false;
  loading: boolean = true;
  error: string | null = null;
  
  
  searchQuery: string = '';
  searchField: string = 'title'; 
  isSearching: boolean = false;
  
  private bookService = inject(BookService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user?.token;
    });

    
    this.route.queryParams.subscribe(params => {
      this.isFavoritesView = params['favorites'] === 'true';
      this.loadBooks();
    });
  }

  loadBooks(): void {
    this.loading = true;
    this.error = null;
    
    if (this.isFavoritesView) {
      this.loadFavoriteBooks();
    } else {
      this.loadAllBooks();
    }
  }

  loadAllBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response: { books: Book[], totalBooks: number }) => {
        this.books = response.books;
        this.filteredBooks = [...this.books]; 
        this.checkFavoritesStatus();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading books:', err);
        this.error = 'Failed to load books. Please try again later.';
        this.loading = false;
      }
    });
  }

  loadFavoriteBooks(): void {
    if (!this.isAuthenticated) {
      this.error = 'Please log in to view your favorite books.';
      this.loading = false;
      return;
    }
    
    this.userService.getFavoriteBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books.map(book => ({ ...book, isFavorite: true }));
        this.filteredBooks = [...this.books]; 
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading favorite books:', err);
        this.error = 'Failed to load favorite books. Please try again later.';
        this.loading = false;
      }
    });
  }

  
  searchBooks(): void {
    if (!this.searchQuery.trim()) {
      
      this.filteredBooks = [...this.books];
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    this.loading = true;
    
    this.bookService.searchBooks(this.searchQuery, this.searchField).subscribe({
      next: (response: { books: Book[], totalBooks: number }) => {
        this.filteredBooks = response.books;
        this.checkFavoritesStatus();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error searching books:', err);
        this.error = 'Failed to search books. Please try again later.';
        this.filteredBooks = [];
        this.loading = false;
      }
    });
  }

  
  clearSearch(): void {
    this.searchQuery = '';
    this.filteredBooks = [...this.books];
    this.isSearching = false;
  }

  checkFavoritesStatus(): void {
    if (!this.isAuthenticated) {
      this.filteredBooks.forEach(book => book.isFavorite = false);
      return;
    }
    
    this.filteredBooks.forEach(book => {
      if (book._id) {
        this.userService.isBookInFavorites(book._id).subscribe({
          next: (isFavorite: boolean) => {
            book.isFavorite = isFavorite;
          },
          error: (err: any) => {
            console.error('Error checking favorite status:', err);
            book.isFavorite = false;
          }
        });
      } else {
        book.isFavorite = false;
      }
    });
  }

  toggleFavorite(book: Book): void {
    if (!this.isAuthenticated) {
      this.error = 'Please log in to manage favorites.';
      return;
    }
    
    if (book.isFavorite) {
      this.removeFromFavorites(book);
    } else {
      this.addToFavorites(book);
    }
  }

  addToFavorites(book: Book): void {
    if (!book._id) {
      this.error = 'Invalid book ID.';
      return;
    }
    
    this.userService.addBookToFav(book._id).subscribe({
      next: () => {
        book.isFavorite = true;
        this.error = null;
      },
      error: (err: any) => {
        console.error('Error adding to favorites:', err);
        this.error = `Failed to add to favorites: ${err.message || 'Unknown error'}`;
      }
    });
  }

  removeFromFavorites(book: Book): void {
    if (!book._id) {
      this.error = 'Invalid book ID.';
      return;
    }
    
    this.userService.removeBookFromFav(book._id).subscribe({
      next: () => {
        book.isFavorite = false;
        
        if (this.isFavoritesView) {
          this.books = this.books.filter(b => b._id !== book._id);
          this.filteredBooks = this.filteredBooks.filter(b => b._id !== book._id);
        }
        
        this.error = null;
      },
      error: (err: any) => {
        console.error('Error removing from favorites:', err);
        this.error = `Failed to remove from favorites: ${err.message || 'Unknown error'}`;
      }
    });
  }
}