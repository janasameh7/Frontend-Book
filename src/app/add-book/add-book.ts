import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { languageValidator } from '../validators/language.validator';
import { BookService } from '../services/book-service';
import { CanComponentDeactivate } from '../models/can-component-deactivate.model';

@Component({
  selector: 'app-add-book',
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook implements OnInit , CanComponentDeactivate {

  hasUnsavedChanges: boolean = true;
  addBookForm!: FormGroup;
  selectedFile: File | null = null;
  private bookService = inject(BookService);

  ngOnInit(): void {
    this.addBookForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      language: new FormControl(null, [Validators.required, languageValidator]),
      publicationYear: new FormControl(null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]),
      description: new FormControl(null, Validators.required),
      authors: new FormControl(null, Validators.required),
      genres: new FormControl(null, Validators.required),
      coverImage: new FormControl(null, [Validators.required, Validators.pattern(/([^\\s]+(\.(jpg|png|gif|jpeg|webp))$)/i)]),
      pageCount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10000)]),
      ratings: new FormControl(null),
      totalRatings: new FormControl(null),
      createdAt: new FormControl(null)
    });
  }
   
  setBook(){
    this.addBookForm.setValue({
    title: 'Parasite',
    language: "korean",
    description: "A poor family schemes to become employed by a wealthy household.",
    pageCount: 132,
    ratings: 4.6,
    totalRatings: 1500000,
    publicationYear: 2019,
    releaseDate: "2019-05-30T00:00:00Z",
    genres: ["Drama", "Thriller"],
    authors: ["Bong Joon-ho"],
    coverImage: "Parasite.jpeg"
  
    })
  }
    
  

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    console.log(this.addBookForm);
    if (this.addBookForm.invalid) {
      this.addBookForm.markAllAsTouched();
      return;
    }
    console.log(this.addBookForm.value);
    
    const fd = new FormData();

    Object.keys(this.addBookForm.value).forEach((key) => {
      if (key !== 'coverImage') {
        fd.append(key, this.addBookForm.value[key]);
      }
    });
    if (this.selectedFile) {
      fd.append('coverImage', this.selectedFile);
    }
    this.bookService.addBook(fd).subscribe({
      next: (book) => {
        console.log('Book added', book);
        this.addBookForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.log('Error in adding book', err);
      }
    });
  }
}
