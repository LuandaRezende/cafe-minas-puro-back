import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
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
    async getSellerById(@Param('id') id: number, @Query() query) {
        const dates = {
            start: query.startDate.concat('T00:00:00.000Z'),
            end: query.endDate.concat('T23:59:59.999Z')
        }
        return await this.loadsService.getSellerById(id, dates)
    }

    @Get('/get-all')
    async getAllSellerExpense() {
        return await this.loadsService.getAllSellerLoad()
    }

}
