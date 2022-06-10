import { Body, Controller, Post } from '@nestjs/common';
import { SellerDto } from './dto/seller.dto';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) { }

    @Post('/create')
    async createSeller(@Body() dto: SellerDto) {
        return await this.sellerService.create(dto);
    }

}
