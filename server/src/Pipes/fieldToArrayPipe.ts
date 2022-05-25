import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";

@Injectable()
export class FieldToArrayPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        return JSON.parse(value)
    }
}
