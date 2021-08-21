import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';

@Schema()
export class Movies extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
    message: 'El id de la pelicula debe ser unico',
  })
  movie_id: string;

  @Prop()
  movies: [
    {
      adult: boolean;
      backdrop_path: string;
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    },
  ];

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  userId: MongooseSchema.Types.ObjectId;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
