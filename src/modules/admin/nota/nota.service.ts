import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, QueryRunner, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ClienteProveedor } from '../cliente-proveedor/entities/cliente-proveedor.entity';
import { Nota } from './entities/nota.entity';
import { Movimiento } from './entities/movimiento.entity';
import { Producto } from '../inventario/producto/entities/producto.entity';
import { Almacen } from '../inventario/almacen/entities/almacen.entity';
import { AlmacenProducto } from '../inventario/almacen/entities/almacen_producto.entity';
import { FiltroNotaDto } from './dto/filtro-nota.dto';

@Injectable()
export class NotaService {

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,

    @InjectRepository(Nota)
    private notaRepo: Repository<Nota>
  ) { }

  async create(createNotaDto: CreateNotaDto) {
    // transacciones

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const userRepository = queryRunner.manager.getRepository(User)
      const clienteRepository = queryRunner.manager.getRepository(ClienteProveedor)
      const notaRepository = queryRunner.manager.getRepository(Nota)
      const productoRepository = queryRunner.manager.getRepository(Producto)
      const movimientoRepository = queryRunner.manager.getRepository(Movimiento)
      const almacenRepository = queryRunner.manager.getRepository(Almacen)

      // Buscar usuario en la BD (capturar con la sesion actual automaticamente)
      const user = await userRepository.findOneBy({ id: createNotaDto.user_id });
      if (!user) throw new NotFoundException('Usuario no encontrado');

      // Buscar usuario en la BD
      const cliente = await clienteRepository.findOneBy({ id: createNotaDto.cliente_id });
      if (!cliente) throw new NotFoundException('Cliente no encontrado');

      // Crear Nota
      const nota = await notaRepository.create({
        ...createNotaDto,
        cliente: cliente,
        user: user
      })

      // Guardar Nota

      await notaRepository.save(nota);

      const movimientosGuardados: Movimiento[] = []

      for (const m of createNotaDto.movimientos) {
        const producto = await productoRepository.findOneBy({ id: m.producto_id })
        if (!producto) throw new NotFoundException('Producto no encontrado');

        const almacen = await almacenRepository.findOneBy({ id: m.almacen_id })
        if (!almacen) throw new NotFoundException('Almacen no encontrado');

        const movimientos = movimientoRepository.create({
          ...m,
          nota,
          producto,
          almacen
        })

        // Actualizar stock de inventario
        await this.actualizarStockQueryRunner(queryRunner, almacen, producto, m.cantidad, m.tipo_movimiento);

        const movGuardado = await movimientoRepository.save(movimientos);

        movimientosGuardados.push(movGuardado)

      }

      nota.movimientos = movimientosGuardados;

      await queryRunner.commitTransaction();

      return nota;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    // return 'This action adds a new nota';
  }

  private async actualizarStockQueryRunner(queryRunner: QueryRunner, almacen: Almacen, producto: Producto, cantidad: number, tipo: 'ingreso' | 'salida' | 'devolucion') {
    const almacenProductoRepo = queryRunner.manager.getRepository(AlmacenProducto);

    let ap = await almacenProductoRepo.findOne({
      where: {
        almacen: { id: almacen.id },
        producto: { id: producto.id }
      },
      relations: ['almacen', 'producto']
    })

    if (!ap) {
      if (tipo == 'salida') {
        throw new BadRequestException('No hay stock registrado para este producto en este almacen')
      }

      ap = almacenProductoRepo.create({
        almacen, producto, cantidad_actual: cantidad, fecha_actualizacion: new Date()
      });

    } else {
      if (tipo === 'ingreso' || tipo === 'devolucion') {
        ap.cantidad_actual += cantidad;
      } else if (tipo === 'salida') {
        if (ap.cantidad_actual < cantidad) {
          throw new BadRequestException('Stock insuficiente para la salida');
        }
        ap.cantidad_actual -= cantidad
      }
      ap.fecha_actualizacion = new Date()
    }

    await almacenProductoRepo.save(ap);

  }

  async findAll(filtro: FiltroNotaDto) {

    const query = this.notaRepo.createQueryBuilder('nota')
      .leftJoinAndSelect('nota.user', 'user')
      .leftJoinAndSelect('nota.cliente', 'cliente')
      .leftJoinAndSelect('nota.movimientos', 'movimientos')
      .leftJoinAndSelect('movimientos.producto', 'producto')

    if(filtro.tipo_nota){
      query.andWhere('nota.tipo_nota = :tipo_nota', {tipo_nota: filtro.tipo_nota})
    }

    if(filtro.estado_nota){
      query.andWhere('nota.estado_nota = :estado_nota', {estado_nota: filtro.estado_nota})
    }

    if(filtro.desde){
      query.andWhere('nota.fecha = :desde', {desde: filtro.desde});
    }

    if(filtro.hasta){
      query.andWhere('nota.fecha = :hasta', {hasta: filtro.hasta});
    }

    if(filtro.user_id){
      query.andWhere('nota.userId = :user_id', {user_id: filtro.user_id});
    }

    if(filtro.cliente_id){
      query.andWhere('nota.clienteId = :cliente_id', {cliente_id: filtro.cliente_id});
    }

    query.orderBy('nota.fecha', 'DESC');

    // paginacion

    const limit = filtro.limit || 10;
    const page = filtro.page || 1;

    query.skip((page - 1)* limit).take(limit);
    

    const [data, total] = await query.getManyAndCount();

    return { data, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} nota`;
  }

  update(id: number, updateNotaDto: UpdateNotaDto) {
    return `This action updates a #${id} nota`;
  }

  remove(id: number) {
    return `This action removes a #${id} nota`;
  }
}
