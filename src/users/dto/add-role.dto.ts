import { IsNumber, IsString } from "class-validator"

export class AddRoleDto {
    @IsString({ message: 'Принимаются строки' })
    readonly value: string
    @IsNumber({}, { message: 'Принимаются цифры' })
    readonly userId: number
}