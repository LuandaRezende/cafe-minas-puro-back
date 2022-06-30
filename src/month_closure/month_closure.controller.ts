import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { SaleDto } from 'src/sale/dto/sale.dto';
import { MonthClosureService } from './month_closure.service';

@Controller('closure')
export class MonthClosureController {
    constructor(private readonly monthClosureService: MonthClosureService) { }

    @Get(':id')
    async getMonthClosure(@Param('id', ParseIntPipe) id: number, @Query() query) {
        const dates = {
            start: query.startDate.concat('T00:00:00.000Z'),
            end: query.endDate.concat('T23:59:59.999Z')
        }
        return await this.monthClosureService.findMonthClosure(id, dates);
    }

    @Put('/update')
    async createClients(@Body() dto) {
        return await this.monthClosureService.updateSale(dto);
    }
}
