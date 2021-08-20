import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movies, MoviesSchema } from 'src/entities/movies.entity';
import { MoviesRepository } from 'src/repositories/movies.repository';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
  ],
  providers: [MoviesService, MoviesRepository],
  controllers: [MoviesController],
  exports: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
