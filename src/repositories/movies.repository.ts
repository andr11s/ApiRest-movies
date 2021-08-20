import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Movies } from 'src/entities/movies.entity';
import { CreateMoviesDto } from 'src/modules/movies/dto/createMovieDto';

export class MoviesRepository {
  constructor(
    @InjectModel(Movies.name) private readonly movieModel: Model<Movies>,
  ) {}

  async createMovie(movieDto: CreateMoviesDto) {}
}
