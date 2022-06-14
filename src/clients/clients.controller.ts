import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsDto } from './dto/clients.dto';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @Post('/create')
    async createClients(@Body() dto: ClientsDto) {
        return await this.clientsService.createClient(dto);
    }

    @Get('/get-all')
    async getAllClients() {
        return await this.clientsService.getAll();
    }
}
