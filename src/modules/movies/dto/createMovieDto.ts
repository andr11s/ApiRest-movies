import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateMoviesDto {
  @IsString()
  @IsNotEmpty()
  userId: MongooseSchema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  movie_id: string;

  @IsString()
  @IsNotEmpty()
  movies: [
    {
      adult: boolean;
      backdrop_path: string;
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    },
  ];

  @IsString()
  @IsOptional()
  description: string;
}
