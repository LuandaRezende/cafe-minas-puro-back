import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleRepository } from 'src/sale/sale.repository';
import { PaymentDto } from './dto/payment.dto';
import { PaymentEntity } from './payment.entity';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private paymentRepository: PaymentRepository,
        private saleRepository: SaleRepository
    ) { }

    async create(dto: PaymentDto): Promise<any> {
        const idClient = dto.id_client;
        const dateSale = dto.date_sale;

        const idSale = await this.saleRepository.query(`select s.id_sale as id from sale s where id_client = ${idClient} and date = '${dateSale}'`)

        const data = {
           amount_paid: dto.amount_paid,
           form_payment: dto.form_payment,
            created_at: dto.created_at,
            id_client: dto.id_client,
            id_seller: dto.id_seller,
            date: dto.date,
            date_sale: dto.date_sale,
            id_sale: idSale[0].id
        }

        const payment = this.paymentRepository.create(data);

        await this.paymentRepository.save(payment)

        return idSale;
    }
}
