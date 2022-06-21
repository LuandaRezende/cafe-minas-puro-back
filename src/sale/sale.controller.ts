import { Body, Controller, Post } from '@nestjs/common';
import { SaleProductDto } from 'src/sale_product/dto/sale_product.dto';
import { SaleDto } from './dto/sale.dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
    constructor(private readonly saleService: SaleService) { }

    @Post('/create')
    async createSale(@Body() dtoSale: SaleDto) {
        return await this.saleService.createSale(dtoSale);
    }
}
