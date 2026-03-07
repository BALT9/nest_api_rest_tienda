import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateClienteProveedorDto {

    @ApiProperty()
    @IsString()
    tipo: "cliente" | "proveedor";

    @ApiProperty()
    @IsString()
    razon_social: string;

    @ApiProperty()
    @IsString()
    identificacion: string;

    @ApiProperty()
    @IsString()
    telefono: string;

    @ApiProperty()
    @IsString()
    direccion: string;

    @ApiProperty()
    @IsString()
    correo: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    estado: boolean;
}
