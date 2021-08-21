import { Injectable } from '@nestjs/common';
import { MoviesRepository } from 'src/repositories/movies.repository';
import { GetApiMoviesDto } from './dto/getMoviesdto';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MoviesRepository) {}

  async getGenderList() {
    return await this.movieRepository.getGenderList();
  }

  async getGenre(params: GetApiMoviesDto) {
    return await this.movieRepository.getMoviesGenre(params);
  }

  async getSearchName(params: GetApiMoviesDto) {
    return await this.movieRepository.getMoviesName(params);
  }
}
