import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { languageValidator } from '../validators/language.validator';
import { BookService } from '../services/book-service';
import { CanComponentDeactivate } from '../models/can-component-deactivate.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-book.html',
  styleUrl: './update-book.css'
})
export class UpdateBook implements OnInit, CanComponentDeactivate {
  hasUnsavedChanges: boolean = true;
  updateBookForm!: FormGroup;
  selectedFile: File | null = null;
  bookId: string = '';
  error: string | null = null;
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  public router = inject(Router);

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.updateBookForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      language: new FormControl(null, [Validators.required, languageValidator]),
      publicationYear: new FormControl(null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]),
      description: new FormControl(null, Validators.required),
      authors: new FormControl(null, Validators.required),
      genres: new FormControl(null, Validators.required),
      coverImage: new FormControl(null, [Validators.pattern(/([^\\s]+(\.(jpg|png|gif|jpeg|webp))$)/i)]),
      pageCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10000)]),
      ratings: new FormControl(null),
      totalRatings: new FormControl(null),
      createdAt: new FormControl(null)
    });

    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.updateBookForm.patchValue({
          title: book.title,
          language: book.language,
          publicationYear: book.publicationYear,
          description: book.description,
          authors:Array.isArray(book.authors) ? book.authors : [],
          genres:  Array.isArray(book.genres) ? book.genres : [],
          pageCount: book.pageCount,
          ratings: book.ratings,
          totalRatings: book.totalRatings,
          createdAt: book.createdAt ? new Date(book.createdAt).toISOString().slice(0, 16) : null
        });
        this.hasUnsavedChanges = false;
      },
      error: (err) => {
        console.error('Error loading book:', err);
        this.error = `Failed to load book details: ${err.message || 'Unknown error'}`;
      }
    });
  }

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.hasUnsavedChanges = true;
    }
  }

  onSubmit() {
    if (this.updateBookForm.invalid) {
      this.updateBookForm.markAllAsTouched();
      this.error = 'Please fill all required fields correctly.';
      return;
    }
    
    const fd = new FormData();
    Object.entries(this.updateBookForm.value).forEach(([key, value]) => {
      if (key !== 'coverImage' && value !== null && value !== undefined) {
        if (key === 'authors' || key === 'genres') {
          
          if (typeof value === 'string') {
            const arrayValue = value.split(',').map((v: string) => v.trim()).filter(v => v);
            if (arrayValue.length > 0) {
              fd.append(key, JSON.stringify(arrayValue));
            }
          } else if (Array.isArray(value)) {
            
            fd.append(key, JSON.stringify(value));
          }
        } else if (key === 'publicationYear' || key === 'pageCount' || key === 'ratings' || key === 'totalRatings') {
          
          fd.append(key, value.toString());
        } else if (key === 'createdAt' && value) {
          
          const dateValue = new Date(value as string);
          if (!isNaN(dateValue.getTime())) {
            fd.append(key, dateValue.toISOString());
          }
        } else {
          
          fd.append(key, value as string);
        }
      }
    });
    
    if (this.selectedFile) {
      fd.append('coverImage', this.selectedFile);
    }
   
    
    this.bookService.updateBook(this.bookId, fd).subscribe({
      next: () => {
        this.hasUnsavedChanges = false;
        this.error = null;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error('Error updating book:', err);
        this.error = `Failed to update book: ${err.message || 'Unknown error'}`;
      }
    });
  }

  canDeactivate(): boolean {
    return !this.hasUnsavedChanges || confirm('You have unsaved changes. Are you sure you want to leave?');
  }
}