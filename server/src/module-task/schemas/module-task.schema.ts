import * as mongoose from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Module} from "../../module/schemas/module.schema";

export type ModuleTaskDocument = ModuleTask & mongoose.Document

@Schema()
export class ModuleTask {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Module'})
    module: Module

    @Prop({required: true})
    fullText: string

    @Prop({required: true})
    leftWordArr: string[]

    @Prop({required: true})
    arrWord: string[]
}


export const ModuleTaskSchema = SchemaFactory.createForClass(ModuleTask)
