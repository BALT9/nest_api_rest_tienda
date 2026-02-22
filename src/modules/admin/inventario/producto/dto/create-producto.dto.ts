import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProductoDto {

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    descripcion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    unidad_medida?: string;

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    marca?: string;

    @ApiProperty()
    @IsDecimal()
    precio_venta_actual: number;

    @ApiProperty()
    @IsString()
    @MaxLength(250)
    @IsOptional()
    imagen?: string;

    @ApiProperty()
    @IsBoolean()
    estado: boolean;

    @ApiProperty()
    @IsInt()
    categoria: number;
}
