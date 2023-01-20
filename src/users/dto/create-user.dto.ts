import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.com', description: 'EMail'})
    readonly email: string;

    @ApiProperty({example: '******', description: 'Пароль'})
    readonly password: string;
}