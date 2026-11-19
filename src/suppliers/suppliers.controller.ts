import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { SuppliersService } from './suppliers.service';

// TANDAAN: Tinanggal muna ang JwtAuthGuard para sa testing.
// Ibalik ito kapag may login page na ang frontend.

@Controller('suppliers')
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get()
  async getAll() {
    return this.suppliersService.getAll();
  }

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
      address?: string;
    },
  ) {
    return this.suppliersService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.suppliersService.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.suppliersService.delete(+id);
  }
}