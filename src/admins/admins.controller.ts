import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminDto } from './dto/admins.dto';

@Controller('admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) { }

    @Get()
    async getAll() {
        return await this.adminsService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.adminsService.findById(id);
    }

    @Post()
    async create(@Body() dto: AdminDto) {
        return await this.adminsService.create(dto);
    }

    // @Put(':id')
    // async update(@Param('id', ParseIntPipe) id: number, @Body() dto: AdminDto) {
    //     return await this.adminsService.updateAdmin(id, dto);
    // }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.adminsService.delete(id)
    }

}
