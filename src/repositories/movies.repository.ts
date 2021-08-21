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

export class MoviesRepository {
  private config = new ConfigService();
  GET_GENRE = 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list';

  constructor(
    @InjectModel(Movies.name) private readonly movieModel: Model<Movies>,
    private readonly axios: HttpService,
  ) {}

  async GetAccesApi() {
    return await this.config.getKeyApiMovie();
  }

  async getapi() {
    return await this.config.get('API');
  }

  async get() {
    const getHeader = await this.GetAccesApi();
    const getApi = await this.getapi();

    this.axios
      .get(`${getApi}/genre/movie/list`, {
        headers: { ...getHeader },
      })
      .subscribe((x) => console.log(x));
  }

  async getMoviesGenre(params: GetApiMoviesDto) {
    const getHeader = await this.GetAccesApi();
    const getApi = await this.getapi();
    const { with_genres, page } = params;
    this.axios
      .get(`${getApi}/discover/movie`, {
        params: { with_genres, page },
        headers: { ...getHeader },
      })
      .subscribe((c) => console.log(c));
  }
}
