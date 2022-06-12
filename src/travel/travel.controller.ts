import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    async getSellerById(@Param('id') id: number) {
        return await this.travelService.getSellerById(id)
    }

    @Get('/get-all')
    async getAllSellerExpense() {
        return await this.travelService.getAllSellerExpense()
    }
}
