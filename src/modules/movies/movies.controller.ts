import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { GetApiMoviesDto } from './dto/getMoviesdto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly _movieService: MoviesService) {}

  @Get('/getGenrenList')
  async findAll() {
    return await this._movieService.getGenderList();
  }

  @Get('/getSearchGenren')
  async getSearchMovieGenre(@Body() params: GetApiMoviesDto) {
    return await this._movieService.getGenre(params);
  }

  @Get('/getSearchName')
  async getSearchMovieName(@Body() params: GetApiMoviesDto) {
    return await this._movieService.getSearchName(params);
  }

  @Get('/getMovieDetailed/:movie_id')
  async getMoviesDetailes(@Param('movie_id') movie_id: string) {
    return await this._movieService.getMovieDetailed(movie_id);
  }

  @Post()
  create() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}
