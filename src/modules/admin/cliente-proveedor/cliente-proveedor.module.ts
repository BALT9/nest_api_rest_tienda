import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteProveedorService } from './cliente-proveedor.service';
import { ClienteProveedorController } from './cliente-proveedor.controller';
import { ClienteProveedor } from './entities/cliente-proveedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClienteProveedor]), // <-- Esto habilita el Repository
  ],
  controllers: [ClienteProveedorController],
  providers: [ClienteProveedorService],
})
export class ClienteProveedorModule {}