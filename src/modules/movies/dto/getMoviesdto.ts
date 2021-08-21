import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetApiMoviesDto {
  @IsString()
  @IsNotEmpty()
  movie_id: string;

  @IsString()
  @IsNotEmpty()
  query: string;

  @IsString()
  @IsNotEmpty()
  with_genres: string;

  @IsString()
  @IsNotEmpty()
  page: string;
}
