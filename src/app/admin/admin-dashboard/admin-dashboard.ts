import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  totalBooks: number = 0;
  totalUsers: number = 0;
  recentBooks: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  private bookService = inject(BookService);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    
    this.bookService.getAllBooks().subscribe({
      next: (response: { books: any[], totalBooks: number }) => {
        this.totalBooks = response.totalBooks;
        this.recentBooks = response.books.slice(0, 5);
        
        
        this.loadUsersData();
      },
      error: (err: any) => {
        this.loading = false;
        this.error = 'Failed to load dashboard data.';
        console.error('Error loading books:', err);
      }
    });
  }

  loadUsersData(): void {
    
    this.totalUsers = 0; 
    this.loading = false;
  }

  getBookCountText(): string {
    if (this.totalBooks === 0) return 'No books';
    if (this.totalBooks === 1) return '1 book';
    return `${this.totalBooks} books`;
  }

  getUserCountText(): string {
    if (this.totalUsers === 0) return 'No users';
    if (this.totalUsers === 1) return '1 user';
    return `${this.totalUsers} users`;
  }
}