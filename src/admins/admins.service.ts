import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsEntity } from './admins.entity';
import { AdminRepository } from './admins.repository';
import { AdminDto } from './dto/admins.dto';

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(AdminsEntity)
        private adminsRepository: AdminRepository
    ) { }

    async getAll(): Promise<AdminsEntity[]> {
        const listAdmins = await this.adminsRepository.find();

        if (listAdmins.length === 0) {
            throw new NotFoundException({ message: 'Lista vazia' })
        }

        return listAdmins;
    }

    async findById(id: number): Promise<AdminsEntity> {
        const admin = await this.adminsRepository.findOne();

        if (!admin) {
            throw new NotFoundException({ message: 'Admin não encontrado' })
        }

        return admin;
    }

    async create(dto: AdminDto): Promise<any> {
        const admin = this.adminsRepository.create(dto);

        await this.adminsRepository.save(admin)

        return admin;
    }

    // async update(id: number, dto: AdminDto): Promise<any> {
    //     const producto = await this.findById(id);
    //     if (!producto)
    //         throw new NotFoundException({ message: 'no existe' });

    //     const exists = await this.findBy(dto.name);

    //     if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese producto ya existe'));
    //     dto.nombre ? producto.nombre = dto.nombre : producto.nombre = producto.nombre;
    //     dto.precio ? producto.precio = dto.precio : producto.precio = producto.precio;
    //     await this.productoRepository.save(producto);
    //     return new MessageDto(`producto ${producto.nombre} actualizado`);
    // }

    async delete(id: number): Promise<any> {
        const admin = await this.findById(id);
        await this.adminsRepository.delete(admin);
        return admin;
    }
}
