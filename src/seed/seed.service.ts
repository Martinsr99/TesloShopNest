import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class SeedService {


  constructor(private productService: ProductsService){}

  async runSeed() {
    this.insertNewProducts()
    return `seed executed`;
  }

  private async insertNewProducts() {
    
    await this.productService.deleteAllProducts()

    return true
  }
}
