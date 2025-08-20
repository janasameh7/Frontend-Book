import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book-service';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth-service';
import { Book } from '../models/book-model';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails implements OnInit {
  book: Book | null = null;
  isFavorite: boolean = false;
  isAuthenticated: boolean = false;
  loading: boolean = true; 
  error: string | null = null;
  
  private bookService = inject(BookService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user?.token;
    });

    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBookDetails(id);
    } else {
      this.error = 'Invalid book ID';
      this.loading = false;
    }
  }

  loadBookDetails(id: string): void {
    this.bookService.getBookById(id).subscribe({
      next: (book: Book) => {
        this.book = book;
        this.loading = false;
        this.error = null;
        
        
        if (this.isAuthenticated) {
          this.checkFavorite(id);
        }
      },
      error: (err: any) => {
        console.error('Error loading book:', err);
        this.error = 'Failed to load book details. Please try again later.';
        this.loading = false;
      }
    });
  }

  checkFavorite(bookId: string): void {
    this.userService.isBookInFavorites(bookId).subscribe({
      next: (isFavorite: boolean) => {
        this.isFavorite = isFavorite;
      },
      error: (err: any) => {
        console.error('Error checking favorite status:', err);
      }
    });
  }

  toggleFavorite(): void {
    if (!this.isAuthenticated) {
      this.error = 'Please log in to manage favorites.';
      return;
    }
    
    if (!this.book?._id) {
      this.error = 'Invalid book ID.';
      return;
    }
    
    if (this.isFavorite) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  }

  addToFavorites(): void {
    if (!this.book?._id) return;
    
    this.userService.addBookToFav(this.book._id).subscribe({
      next: () => {
        this.isFavorite = true;
        this.error = null;
      },
      error: (err: any) => {
        console.error('Error adding to favorites:', err);
        this.error = `Failed to add to favorites: ${err.message || 'Unknown error'}`;
      }
    });
  }

  removeFromFavorites(): void {
    if (!this.book?._id) return;
    
    this.userService.removeBookFromFav(this.book._id).subscribe({
      next: () => {
        this.isFavorite = false;
        this.error = null;
      },
      error: (err: any) => {
        console.error('Error removing from favorites:', err);
        this.error = `Failed to remove from favorites: ${err.message || 'Unknown error'}`;
      }
    });
  }

  deleteBook(): void {
    if (!this.isAuthenticated) {
      this.error = 'Please log in to delete books.';
      return;
    }
    
    if (this.book?._id && confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      this.bookService.deleteBook(this.book._id).subscribe({
        next: () => {
          this.error = null;
          this.router.navigate(['/books']);
        },
        error: (err: any) => {
          console.error('Error deleting book:', err);
          this.error = `Failed to delete book: ${err.message || 'Unknown error'}`;
        }
      });
    }
  }
}