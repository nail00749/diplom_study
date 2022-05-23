import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type RegisterLinkDocument = RegisterLink & Document;

@Schema({timestamps: true})
export class RegisterLink {
    @Prop({required: true})
    link: string;

    createdAt: string;
}

export const RegisterLinkSchema = SchemaFactory.createForClass(RegisterLink);

