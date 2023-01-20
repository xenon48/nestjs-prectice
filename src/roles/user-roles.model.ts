import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany } from "sequelize";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from 'src/roles/roles.model';


@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {

    @ApiProperty({example: '1', description: 'UUID'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey( () => Role)
    @Column({ type: DataType.INTEGER})
    roldeId: number;

    @ForeignKey( () => User)
    @Column({ type: DataType.INTEGER})
    userId: string;
}