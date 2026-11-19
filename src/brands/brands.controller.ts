import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { BrandsService } from './brands.service';

// TANDAAN: Tinanggal muna ang JwtAuthGuard para sa testing.
// Ibalik ito kapag may login page na ang frontend:
//   import { UseGuards } from '@nestjs/common';
//   import { JwtAuthGuard } from '../auth/jwt-auth.guard';
//   @UseGuards(JwtAuthGuard)  (sa ibabaw ng bawat route o ng buong class)

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  async getAll() {
    return this.brandsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.brandsService.findById(+id);
  }

  @Post()
  async create(@Body() body: { brand_name: string }) {
    return this.brandsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.brandsService.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.brandsService.delete(+id);
  }
}