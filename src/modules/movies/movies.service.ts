import { Injectable } from '@nestjs/common';
import { MoviesRepository } from 'src/repositories/movies.repository';
import { MoviesMongoRepository } from 'src/repositories/moviesMongo.repository';
import { CreateMoviesDto } from './dto/createMovieDto';
import { GetApiMoviesDto } from './dto/getMoviesdto';
import { UpdateMovieDto } from './dto/updateMovieDto';
import { Schema as MongooseSchema } from 'mongoose';
@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MoviesRepository,
    private readonly movieMongoRepositoy: MoviesMongoRepository,
  ) {}

  async getGenderList() {
    return await this.movieRepository.getGenderList();
  }

  async getGenre(params: GetApiMoviesDto) {
    return await this.movieRepository.getMoviesGenre(params);
  }

  async getSearchName(params: GetApiMoviesDto) {
    return await this.movieRepository.getMoviesName(params);
  }

  async getMovieDetailed(movie_id: string) {
    return await this.movieRepository.getMovieDetailed(movie_id);
  }

  // endpoint base de datos mongodb

  async getMovieAll() {
    return await this.movieMongoRepositoy.getMovieAll();
  }

  async getMoviesByUserId(id: MongooseSchema.Types.ObjectId) {
    return await this.movieMongoRepositoy.getMoviesByUser(id);
  }

  async getMovieById(id: string) {
    return await this.movieMongoRepositoy.getMovieById(id);
  }

  async createMovie(createmovie: CreateMoviesDto) {
    return await this.movieMongoRepositoy.createMovie(createmovie);
  }

  async updateMovie(updatemovie: UpdateMovieDto) {
    return await this.movieMongoRepositoy.updateMovie(updatemovie);
  }
}
