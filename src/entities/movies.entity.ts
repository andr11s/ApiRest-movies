import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';

@Schema()
export class Movies extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: User.name,
  })
  userId: MongooseSchema.Types.ObjectId;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
