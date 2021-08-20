import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviesDto } from './createMovieDto';

export class UpdateMovieDto extends PartialType(CreateMoviesDto) {}
