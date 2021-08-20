import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateMoviesDto {
  @IsString()
  @IsNotEmpty()
  userId: MongooseSchema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  id: MongooseSchema.Types.ObjectId;

  @IsString()
  @IsOptional()
  description: string;
}
