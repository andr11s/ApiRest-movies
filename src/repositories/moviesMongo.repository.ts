import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Movies } from 'src/entities/movies.entity';
import { CreateMoviesDto } from 'src/modules/movies/dto/createMovieDto';
import { UpdateMovieDto } from 'src/modules/movies/dto/updateMovieDto';

export class MoviesMongoRepository {
  constructor(
    @InjectModel(Movies.name) private readonly movieModel: Model<Movies>,
  ) {}

  async createMovie(createMovie: CreateMoviesDto) {
    const { movie_id, userId, description } = createMovie;

    const newMovie = new this.movieModel({
      movie_id,
      userId,
      description,
    });

    try {
      const movie = await newMovie.save();
      return movie;
    } catch (error) {
      return {
        message: 'Ocurrio un error al momento de guardar',
        error,
      };
    }
  }

  async updateMovie(movie: UpdateMovieDto) {
    const movieUpdate = {
      description: movie.description,
    };

    try {
      const newmovie = await this.movieModel.findByIdAndUpdate(
        { movie_id: movie.movie_id },
        movieUpdate,
        { new: true },
      );
      return newmovie;
    } catch (error) {
      return {
        message: 'Ocurrio un error al momento de actualizar',
        error,
      };
    }
  }

  async getMovieAll() {
    try {
      const movies = await this.movieModel.find();

      if (movies.length > 0) {
        return {
          ok: true,
          data: movies,
          message: 'Listado de peliculas registradas',
        };
      } else {
        return {
          ok: true,
          data: [],
          message: 'No se encontro registro de peliculas',
        };
      }
    } catch (error) {
      return {
        message: 'Ocurrio un error al momento de buscar peliculas',
        error,
      };
    }
  }
  async getMoviesByUser(id: MongooseSchema.Types.ObjectId) {
    try {
      let MoviesUser: CreateMoviesDto[];
      MoviesUser = await this.movieModel
        .find({ userId: id })
        .populate('movies')
        .exec();
      return MoviesUser;
    } catch (error) {
      return {
        message: 'Ocurrio un error al momento de buscar peliculas',
        error,
      };
    }
  }
  async getMovieById(id: string) {
    try {
      const movie = await this.movieModel.findById({ movie_id: id });
      return movie;
    } catch (error) {
      return {
        message: 'La pelicula no existe en la base de datos',
        error,
      };
    }
  }
}
