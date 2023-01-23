import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.com', description: 'EMail'})
    @IsString({message: 'Принимаются только строки'})
    @IsEmail({}, {message: 'Некоррекнтый EMail'})
    readonly email: string;

    @ApiProperty({example: '******', description: 'Пароль'})
    @IsString({message: 'Принимаются только строки'})
    @Length(4, 16, {message: 'Введите пароль от 4 до 16 символов'})
    readonly password: string;
}