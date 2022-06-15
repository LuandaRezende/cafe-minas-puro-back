import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDto } from './dto/paymeny.dto';
import { PaymentEntity } from './payment.entity';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private paymentRepository: PaymentRepository
    ) { }

    async create(dto: PaymentDto): Promise<any> {
        const admin = this.paymentRepository.create(dto);

        await this.paymentRepository.save(admin)

        return admin;
    }
}
