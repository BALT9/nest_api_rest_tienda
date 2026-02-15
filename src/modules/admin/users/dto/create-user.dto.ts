import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Nombre del Usuario'
    })
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @ApiProperty({
        description: 'Correo Electronico'
    })
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;

    @IsOptional()
    @IsArray({message: 'Los roles deben ser un array'})
    @IsUUID('4', {each:true, message: 'Cada ID de rol debe ser un UUID'})
    rolesIds?: string[];
}
