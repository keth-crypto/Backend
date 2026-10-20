
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { SuppliersService } from './suppliers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private suppliersService: SuppliersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.suppliersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.suppliersService.findById(+id);
  }

  @Post()
  async create(
    @Body()
    body: {
      supplier_name: string;
      contact_number?: string;
    },
  ) {
    return this.suppliersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.suppliersService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.suppliersService.delete(+id);
  }
}
