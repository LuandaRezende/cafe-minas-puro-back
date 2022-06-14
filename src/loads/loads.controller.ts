import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LoadsDto } from './dto/loads.dto';
import { LoadsService } from './loads.service';

@Controller('loads')
export class LoadsController {
    constructor(private readonly loadsService: LoadsService) { }

    @Post('/create')
    async createProduct(@Body() dto: LoadsDto) {
        return await this.loadsService.createLoad(dto);
    }

    @Get('/get-seller/:id')
    async getSellerById(@Param('id') id: number) {
        return await this.loadsService.getSellerById(id)
    }

    @Get('/get-all')
    async getAllSellerExpense() {
        return await this.loadsService.getAllSellerLoad()
    }

}
