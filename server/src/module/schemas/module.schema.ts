import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Lesson} from "../../lesson/schemas/lesson.schema";
import {Type} from "class-transformer";
import {ModuleTask} from "../../module-task/schemas/module-task.schema";


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

    @Type()
    task: ModuleTask

}

export const ModuleSchema = SchemaFactory.createForClass(Module)

ModuleSchema.virtual('task', {
    ref: 'ModuleTask',
    localField: '_id',
    foreignField: 'module',
    justOne: true
})

ModuleSchema.set('toObject', {virtuals: true})
ModuleSchema.set('toJSON', {virtuals: true})


