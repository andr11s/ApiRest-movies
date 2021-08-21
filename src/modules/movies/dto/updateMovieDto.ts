import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviesDto } from './createMovieDto';
import { Schema as MongooseSchema } from 'mongoose';
import { IsOptional } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMoviesDto) {
  @IsOptional()
  _id: MongooseSchema.Types.ObjectId;
}
