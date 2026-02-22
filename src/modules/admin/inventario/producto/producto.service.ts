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
  findAll(page: number = 1, limit: number = 10, search: string = '', sortBy: string = 'id') {

  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
