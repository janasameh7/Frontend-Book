export interface Book {
  _id?: string;
  title: string;
  language: string;
  createdAt?: string;
  authors: string[];
  genre: string[];
  description?: string;
  pageCount: number;
  ratings?: number;
  totalRatings?: number;
  publicationYear: number;
  coverImage: string; 
}