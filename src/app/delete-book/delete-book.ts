import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-book',
  imports: [CommonModule],
  templateUrl: './delete-book.html',
  styleUrl: './delete-book.css'
})
export class DeleteBook implements OnInit {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  bookId: string = '';
  book: any = null;
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.loadBookData();
  }

  loadBookData(): void {
    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading book:', err);
        this.error = 'Failed to load book details';
        this.isLoading = false;
      }
    });
  }

  onDelete(): void {
    this.bookService.deleteBook(this.bookId).subscribe({
      next: () => {
        alert('Book deleted successfully!');
        this.router.navigate(['/books']);
      },
      error: (err) => {
        console.error('Error deleting book:', err);
        alert('Failed to delete book. Please try again.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/books']);
  }
}