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
    const newMovie = new this.movieModel({
      ...createMovie,
    });

    try {
      const movie = await newMovie.save();
      return {
        message: `La pelicula ${movie.movie_id} se creo con exito,`,
        error: false,
      };
    } catch (error) {
      return {
        message: 'Ocurrio un error al momento de guardar',
        error: true,
      };
    }
  }

  async updateMovie(movie: UpdateMovieDto) {
    const movieUpdate = {
      description: movie.description,
    };

    try {
      const newmovie = await this.movieModel.findByIdAndUpdate(
        { _id: movie._id },
        movieUpdate,
        { new: true },
      );
      return {
        message: `La pelicula ${newmovie.movie_id} se actualizo con exito,`,
        error: false,
      };
    } catch (error) {
      return {
        message: 'Ocurrio un error al momento de actualizar',
        error: true,
      };
    }
  }

  async deleteMovie(_id: MongooseSchema.Types.ObjectId) {
    const movieDelete: any = await this.getMovieById(_id);

    if (!movieDelete.ok) {
      try {
        const Dmovie = await this.movieModel.findByIdAndDelete({
          _id: _id,
        });
        return {
          message: 'Pelicula eliminada',
          error: false,
        };
      } catch (error) {
        return {
          message: 'Ocurrio un error al eliminar pelicula',
          error: true,
        };
      }
    } else {
      return {
        message: 'Error, la pelicula no existe en la base de datos',
        error: true,
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
        error: true,
      };
    }
  }
  async getMoviesByUser(id: MongooseSchema.Types.ObjectId) {
    try {
      let MoviesUser: CreateMoviesDto[];
      MoviesUser = await this.movieModel.find({ userId: id }).exec();
      return MoviesUser;
    } catch (error) {
      return {
        message: 'Ocurrio un error al momento de buscar peliculas',
        error: true,
      };
    }
  }
  async getMovieById(id: MongooseSchema.Types.ObjectId) {
    try {
      const movie = await this.movieModel.findById({ _id: id });
      return movie;
    } catch (error) {
      return {
        message: 'La pelicula no existe en la base de datos',
        error: true,
      };
    }
  }
}
