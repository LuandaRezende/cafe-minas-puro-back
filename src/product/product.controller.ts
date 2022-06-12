import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('/create')
    async createProduct(@Body() dto: ProductDto) {
        return await this.productService.create(dto);
    }

    @Get('/get-all')
    async getAllProducts() {
        return await this.productService.getAllProducts();
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number){
        return await this.productService.delete(id)
    }

}
