import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Movies } from 'src/entities/movies.entity';

export class MoviesRepository {
  constructor(
    @InjectModel(Movies.name) private readonly movieModel: Model<Movies>,
  ) {}
}
