import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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

    @Get('/get-history')
    async getHistorySale() {
        return await this.saleService.getHistorySale();
    }

    @Get('/all/sale-made')
    async getSalesMade() {
        return await this.saleService.getAllSalesMade();
    }

    @Get('/sale-made/:id')
    async listSalesMadeBySeller(@Param('id', ParseIntPipe) id: number) {
        return await this.saleService.getSalesMadeBySeller(id);
    }

    @Get('/products/sale-made/:idClient/:idSeller')
    async listProductsSaleModal(@Param('idClient', ParseIntPipe) idClient: number, @Param('idSeller', ParseIntPipe) idSeller: number) {
        return await this.saleService.getProductsSaleModal(idClient, idSeller);
    }

    @Get('/data/dashboard/:idSeller')
    async getDataDashboard(@Param('idSeller') idSeller: number) {
        return await this.saleService.getDataDashboard(idSeller);
    }

    @Delete('delete/:id')
    async deleteSale(@Param('id') id: number){
        return await this.saleService.deleteSale(id)
    }
}
