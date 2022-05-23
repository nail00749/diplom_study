import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateUserSubscriptionDto {
    @ApiProperty()
    readonly student: string;

    @ApiProperty()
    readonly course: string;

    @ApiProperty()
    readonly start_date: Date;

    @ApiProperty()
    readonly end_date: Date;
}
