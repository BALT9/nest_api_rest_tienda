import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class FiltroNotaDto {

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    tipo_nota?: string; // compra | venta

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    estado_nota?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    desde?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    hasta?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    user_id?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    cliente_id?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;
}