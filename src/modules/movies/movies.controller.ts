import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  HttpStatus,
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

  @Post()
  create() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}
