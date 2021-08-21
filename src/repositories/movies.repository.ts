import { HttpService } from '@nestjs/axios';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ConfigService } from '../config/config/config.service';
import { Movies } from 'src/entities/movies.entity';
import { CreateMoviesDto } from 'src/modules/movies/dto/createMovieDto';
import { GetApiMoviesDto } from 'src/modules/movies/dto/getMoviesdto';
import { map } from 'rxjs';

export class MoviesRepository {
  private config = new ConfigService();
  getHeader = {};
  getApi = {};

  constructor(
    @InjectModel(Movies.name) private readonly movieModel: Model<Movies>,
    private readonly axios: HttpService,
  ) {
    this.GetAccesApi();
    this.getapi();
  }

  async GetAccesApi() {
    this.getHeader = await this.config.getKeyApiMovie();
  }

  async getapi() {
    this.getApi = this.config.get('API');
  }

  async getGenderList() {
    return this.axios
      .get(`${this.getApi}/genre/movie/list`, {
        headers: { ...this.getHeader },
      })
      .pipe(map((response) => response.data));
  }

  async getMoviesGenre(params: GetApiMoviesDto) {
    const { with_genres, page } = params;
    return this.axios
      .get(`${this.getApi}/discover/movie`, {
        params: { with_genres, page },
        headers: { ...this.getHeader },
      })
      .pipe(map((response) => response.data));
  }

  async getMoviesName(params: GetApiMoviesDto) {
    const { query, page } = params;
    return this.axios
      .get(`${this.getApi}/search/movie`, {
        params: { query, page },
        headers: { ...this.getHeader },
      })
      .pipe(map((response) => response.data));
  }
}
