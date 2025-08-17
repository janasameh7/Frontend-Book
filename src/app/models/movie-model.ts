

export interface Movie{
     _id?: string ;
    name: string;
    language: string;
    description: string;
    duration: number;
    ratings: number;
    totalRatings: number;
    releaseYear: number;
    releaseDate: string;
    createdAt: string;
    genres: string[];
    directors: string[];
    coverImage: string;
    trailerUrl?:string;
    actors:string[];
    price: number;
    isAvailable: boolean;
}