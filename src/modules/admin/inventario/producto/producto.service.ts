import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';

@Injectable()
export class ProductoService {

  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) { }

  async create(createProductoDto: CreateProductoDto) {
    const categoria = await this.categoriaRepository.findOne({ where: { id: createProductoDto.categoria } })
    if (!categoria) throw new NotFoundException('Categoria no encontrada');

    const producto = this.productoRepository.create({ ...createProductoDto, categoria })
    return this.productoRepository.save(producto);
  }

  // Paginacion
  async findAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    sortBy: string = 'id',
    order: 'ASC' | 'DESC' = 'DESC',
    almacen: number = 0,
    activo: boolean = true
  ) {
    const queryBuilder = this.productoRepository
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.almacenes', 'productoAlmacen')
      .leftJoinAndSelect('productoAlmacen.almacen', 'almacen')
      .where('producto.estado = :activo', { activo });

    // 🔎 Búsqueda (compatible con MariaDB)
    if (search) {
      queryBuilder.andWhere(
        '(producto.nombre LIKE :search OR producto.marca LIKE :search)',
        { search: `%${search}%` }
      );
    }

    // 📦 Filtro por almacén
    if (almacen && almacen > 0) {
      queryBuilder.andWhere('almacen.id = :almacen', { almacen });
    }

    // 📊 Ordenación (⚠ validar para evitar SQL injection)
    const allowedSortFields = ['id', 'nombre', 'marca', 'precio_venta_actual'];
    if (!allowedSortFields.includes(sortBy)) {
      sortBy = 'id';
    }

    queryBuilder.orderBy(`producto.${sortBy}`, order);

    // 📄 Paginación
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [productos, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data: productos,
      total,
      limit,
      page,
      totalPages,
      activo,
      almacen,
      order,
      search,
      sortBy
    };
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({ where: { id } })
    if (!producto) throw new NotFoundException('Categoria no encontrado');
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    if (updateProductoDto.categoria) {
      const categoria = await this.categoriaRepository.findOne({ where: { id: updateProductoDto.categoria } });
      if (!categoria) {
        throw new NotFoundException('Categoria no encontrada')
      }
      producto.categoria = categoria;
    }

    Object.assign(producto, updateProductoDto);

    return this.productoRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    producto.estado = false;
    await this.productoRepository.save(producto);

    return {message: 'Producto Inactivo'}
  }
}
