import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../models/movie-model';
import { MovieService } from '../services/movie-service';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit {
  movies: Movie[]=[];

  private movieService = inject(MovieService);

  ngOnInit(){
    this.loadMovies();
  }

  loadMovies(){
    this.movieService.getMovies().subscribe({
      next:(data)=>{
        this.movies = data;
        console.log(this.movies);
        
      },
    });
  }

  addMovie(){
    
      const newMovie: Movie = {
      
      name: 'Edge of Tomorrow2',
      language: 'English',
      description:
        'A soldier fighting aliens gets to relive the same day over and over again.',
      duration: 113,
      ratings: 4.2,
      totalRatings: 4823,
      releaseYear: 2014,
      releaseDate: '2014-06-06T00:00:00Z',
      genres: ['Action', 'Sci-Fi'],
      directors: ['Doug Liman'],
      coverImage: 'The Inception.jpeg',
      trailerUrl: 'https://youtube.com/example-trailer',
      actors: ['Tom Cruise', 'Emily Blunt'],
      price: 7.99,
      isAvailable: true,
      createdAt: new Date().toISOString(),
    };

    this.movieService.addMovie(newMovie).subscribe({
      next:(data)=>{
        console.log(data);
        this.movies.push(data);
        },
      });
    }

    updateMovie(id:string | undefined, index:number){
      this.movieService.updateMovie( id, {name:'Updated Name'}).subscribe ({
        next:(data)=>{
          console.log(data);
          this.movies[index]= data;
        }
      })
    }

    deleteMovie(id:string | undefined, index:number){
      this.movieService.deleteMovie( id).subscribe ({
        next:(data)=>{
          console.log(data);
          this.movies.splice(index, 1);
        }
      })
    }
  }

