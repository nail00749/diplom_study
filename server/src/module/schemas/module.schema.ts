import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Lesson} from "../../lesson/schemas/lesson.schema";


export type ModuleDocument = Module & mongoose.Document

@Schema()
export class Module {
    @Prop({required: true})
    title: string

    @Prop({required: true})
    description: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}]})
    lessons: Lesson[]

    @Prop()
    image_path: string

}

export const ModuleSchema = SchemaFactory.createForClass(Module)




