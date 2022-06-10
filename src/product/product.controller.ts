import { Body, Controller, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('/create')
    async createProduct(@Body() dto: ProductDto) {
        return await this.productService.create(dto);
    }

}
