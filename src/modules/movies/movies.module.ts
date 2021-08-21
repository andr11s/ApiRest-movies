import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movies, MoviesSchema } from 'src/entities/movies.entity';
import { MoviesRepository } from 'src/repositories/movies.repository';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';
import { MoviesMongoRepository } from 'src/repositories/moviesMongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
    HttpModule,
  ],
  providers: [MoviesService, MoviesRepository, MoviesMongoRepository],
  controllers: [MoviesController],
  exports: [MoviesService, MoviesRepository, MoviesMongoRepository],
})
export class MoviesModule {}
