import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SellerDto } from './dto/seller.dto';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) { }

    @Post('/create')
    async createSeller(@Body() dto: SellerDto) {
        return await this.sellerService.create(dto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number){
        return await this.sellerService.delete(id)
    }

    @Get('/get-all')
    async getAllSellers() {
        return await this.sellerService.getAllSellers();
    }

}
