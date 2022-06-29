import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SaleDto } from 'src/sale/dto/sale.dto';
import { MonthClosureService } from './month_closure.service';

@Controller('closure')
export class MonthClosureController {
    constructor(private readonly monthClosureService: MonthClosureService) { }

    @Get(':id')
    async getMonthClosure(@Param('id', ParseIntPipe) id: number) {
        return await this.monthClosureService.findMonthClosure(id);
    }

    @Put('/update')
    async createClients(@Body() dto) {
        return await this.monthClosureService.updateSale(dto);
    }
}
