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

  @Get()
  async findAll() {
    return await this._movieService.get();
  }

  @Get('/getGenren')
  async getGenre(@Body() params: GetApiMoviesDto) {
    const a = await this._movieService.getGenre(params);
  }

  @Post()
  create() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}
