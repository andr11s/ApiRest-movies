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
