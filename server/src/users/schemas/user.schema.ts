import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true, unique: true })
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true, default: 'user'})
  role: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  telegram: string;

  @Prop()
  avatar_path: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
