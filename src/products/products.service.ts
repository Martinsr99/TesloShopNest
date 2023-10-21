import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>

  ) {}

  async create(createProductDto: CreateProductDto) {

    try {
      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save(product)

      return product
    } catch (error) {
      this.handleDBExceptions(error)
    }

  }

  // TODO Paginar
  async findAll() {
    return await this.productRepository.find({})
  }

  async findOne(id: string) {
    const productDB = await this.productRepository.findOneBy({id})
    if(!productDB) throw new NotFoundException(`Product ${id} not found`)

    return productDB
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
    return
  }

  private handleDBExceptions(error: any) {

    if(error.code === '23505'){
      throw new BadRequestException(error.detail)
    }

    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check server logs')

  }

}
