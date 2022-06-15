import { Body, Controller, Post } from '@nestjs/common';
import { PaymentDto } from './dto/paymeny.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('/create')
    async create(@Body() dto: PaymentDto) {
        return await this.paymentService.create(dto);
    }
}
