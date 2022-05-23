import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
}
