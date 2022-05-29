import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";

@Injectable()
export class JsonToObject implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        try {
            return JSON.parse(value)
        } catch (e) {
            return null
        }

    }
}
