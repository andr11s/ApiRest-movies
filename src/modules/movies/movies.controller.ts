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
import { CreateMoviesDto } from './dto/createMovieDto';
import { GetApiMoviesDto } from './dto/getMoviesdto';
import { MoviesService } from './movies.service';
import { Schema as MongooseSchema } from 'mongoose';
import { UpdateMovieDto } from './dto/updateMovieDto';

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

  // endpoint base de datos monogdb
  @Get('/getMovies')
  async getMovieAll(@Res() res: any) {
    const movies = await this._movieService.getMovieAll();
    return res.status(HttpStatus.OK).send(movies);
  }

  @Get('/MoviesByUser/:id')
  async getMovieByUser(
    @Param('id') id: MongooseSchema.Types.ObjectId,
    @Res() res: any,
  ) {
    const movies = await this._movieService.getMoviesByUserId(id);
    return res.status(HttpStatus.OK).send(movies);
  }

  @Post('/createMovie')
  async createMovie(
    @Body() createMovie: CreateMoviesDto,
    @Res() res: any,
  ): Promise<CreateMoviesDto> {
    const newMovie = await this._movieService.createMovie(createMovie);
    return res.status(HttpStatus.CREATED).send(newMovie);
  }

  @Put('/updateDescription')
  async update(@Body() params: UpdateMovieDto, @Res() res: any) {
    const updateMovie = await this._movieService.updateMovie(params);
    return res.status(HttpStatus.OK).send(updateMovie);
  }

  @Delete('/deleteMovie/:id')
  async delete(
    @Param('id') id: MongooseSchema.Types.ObjectId,
    @Res() res: any,
  ) {
    const deleteMovie = await this._movieService.deleteMovie(id);
    return res.status(HttpStatus.OK).send(deleteMovie);
  }
}
