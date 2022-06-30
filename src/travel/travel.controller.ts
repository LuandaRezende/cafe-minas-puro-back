import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TravelDto } from './dto/travel.dto';
import { TravelService } from './travel.service';

@Controller('travel')
export class TravelController {
    constructor(private readonly travelService: TravelService) { }

    @Post('/create')
    async createSeller(@Body() dto: TravelDto) {
        return await this.travelService.createTravelExpense(dto);
    }

    @Get('/get-seller/:id')
    async getSellerById(@Param('id') id: number, @Query() query) {

        const dates = {
            start: query.startDate.concat('T00:00:00.000Z'),
            end: query.endDate.concat('T23:59:59.999Z')
        }

        return await this.travelService.getSellerById(id, dates)
    }

    @Get('/get-all')
    async getAllSellerExpense() {
        return await this.travelService.getAllSellerExpense()
    }
}
